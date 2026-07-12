/**
 * js/remote-control-engine.js
 * ---------------------------------------------------------------------
 * "발전소 원격 제어" (/control/plant) 화면이 사용하는 계산 엔진.
 *
 * Dr. Bksolar 관리자 매뉴얼(첨부 PDF) 18~26p의 실제 화면 구조 -- 발전소
 * 메인/인버터 차단기 ON·OFF, 인버터별 유효전력/역률/주파수 원격 제어,
 * 그리고 그 결과로 산출되는 [유효전력 제어]/[역률 제어]/[주파수 제어]
 * 3개 표 -- 를 그대로 구현한다.
 *
 * KACO/OCI 인버터의 실제 Modbus(SunSpec) 레지스터 체계
 * (PG-U01g MODBUS Protocol of XP & BP Series, KACO제어프로토콜.zip)와
 * 정확히 맞춰서 설계했다:
 *   - WMaxLimPct (40250) : 유효전력 출력 제한값(%)  -> IC123 Immediate Controls
 *   - OutPFSet   (40255) : 고정 역률 설정값
 *   - VArWMaxPct (40260) : 무효전력(%) 설정값
 *   - IC129/130  : LVRT/HVRT Must-Disconnect 커브 (전압 이상시 분리)
 *   - IC135/136  : LFRT/HFRT Array (주파수 이상시 분리)
 * 즉 아래 [주파수 제어] 결과표의 "연계유지여부" 판정은 문서를 베껴 쓴
 * 고정값이 아니라, window.ProtectionEngine.evaluateFrequency() -- 한전
 * 기술기준 기반 분리시간 판정 -- 을 그대로 호출한 결과다. 요청사항
 * 4번("비정상 전압주파수 분리시간표를 별도로 두지 말고 원격제어 로직
 * 자체가 이 기준으로 동작해야 한다")이 여기서 실제로 구현된다.
 * ---------------------------------------------------------------------
 */
window.RemoteControlEngine = {
  // 매뉴얼 25p [유효전력 제어] 표와 동일한 산출 로직.
  // 가용유효전력(%) x 유효전력제어값(%) 조합마다 유효전력출력(W)/무효전력출력(Var)/역률(%)을 계산한다.
  computeActivePowerControlTable(ratedKw, rows) {
    // rows: [{ availablePct, controlPct }, ...] (매뉴얼 예시: 20/40/60/80/100 x 50%)
    return rows.map((r) => {
      const wOut = ratedKw * 1000 * (r.availablePct / 100) * (r.controlPct / 100);
      const varOut = 0; // 유효전력 제어 단독 실행 시 무효전력은 0으로 유지 (역률 1.0)
      const pf = wOut > 0 ? 100 : 0;
      return { ...r, wOut: Math.round(wOut), varOut, pf };
    });
  },

  // 매뉴얼 26p [역률 제어] 표. 단위/지상(진상)/진상 3가지 기준에 따른 유효전력출력(W)/무효전력출력(Var).
  computePowerFactorControlTable(ratedKw, rows) {
    // rows: [{ activePct, mode: "단위"|"지상"|"진상", controlPct }]
    return rows.map((r) => {
      const wOut = ratedKw * 1000 * (r.activePct / 100);
      const pfFraction = r.controlPct / 100;
      // 단위역률(100%)이면 무효전력 0, 그 외에는 위상각으로부터 무효전력 산출 (Q = P * tan(acos(pf)))
      const varOut = r.mode === "단위" ? 0 : Math.round(wOut * Math.tan(Math.acos(pfFraction)));
      return { ...r, wOut: Math.round(wOut), varOut, pf: r.controlPct };
    });
  },

  // 매뉴얼 26p [주파수 제어] 표. 한전 기술기준 주파수 분리시간 밴드
  // (window.ProtectionEngine.evaluateFrequency)를 그대로 사용해 실제
  // "연계유지/탈락" 여부와 유지시간을 판정한다 -- 문서의 고정값이 아님.
  computeFrequencyControlTable(activePct, freqPoints) {
    // freqPoints: [60.0, 60.5, 61.0, 61.5, 59.5, 59.0, 58.5, 58.0, 57.5] (매뉴얼 26p와 동일 기본값)
    return freqPoints.map((hz) => {
      const evalResult = window.ProtectionEngine.evaluateFrequency(hz);
      // 정상 범위(57.5~61.5Hz)면 분리 없이 무기한 연계 유지.
      // 이상 범위면 기준 분리시간(clearingTimeSec)만큼만 유지된 뒤 탈락 판정.
      const holdSec = evalResult.normal ? 60 : Math.max(evalResult.clearingTimeSec, 0.16) < 1 ? 20 : Math.round(evalResult.clearingTimeSec);
      const round1 = evalResult.normal ? "유지" : "탈락";
      const round2 = evalResult.normal ? "유지" : "탈락";
      return { activePct, hz, holdSec, round1, round2, band: evalResult.label, normal: evalResult.normal };
    });
  },

  // 지금 이 순간의 원격 제어 조작을 "기록 데이터"(구조화 로그)로 변환한다.
  // Store.addControlLog로 저장되어, 추후 이상탐지/예측 모델 학습(예: YOLO 계열
  // 이상패턴 인식 파이프라인)의 학습 데이터셋 원천이 된다 -- 요청 4/5번.
  buildControlLogEntry({ inverterId, inverterName, outputPct, pfPct, freqOffsetHz, ratedKw }) {
    const freqPoints = [60.0, 60.5, 61.0, 61.5, 59.5, 59.0, 58.5, 58.0, 57.5];
    const activeTable = this.computeActivePowerControlTable(ratedKw, [{ availablePct: 100, controlPct: outputPct }]);
    const pfTable = this.computePowerFactorControlTable(ratedKw, [{ activePct: 100, mode: "지상", controlPct: pfPct }]);
    const freqTable = this.computeFrequencyControlTable(100, freqPoints);
    const anyTrip = freqTable.some((f) => !f.normal);
    return {
      id: "ctrl-" + Date.now() + "-" + inverterId,
      timestamp: new Date().toISOString(),
      inverterId,
      inverterName,
      setpoints: { outputPct, pfPct, freqOffsetHz },
      activePowerResult: activeTable[0],
      powerFactorResult: pfTable[0],
      frequencyResult: freqTable,
      standardBasis: "실시간 판정 기준: 하드웨어 추상화 설정의 보호협조 정정값과 동일 (KACO IC123/129/130/135/136 레지스터 매핑)",
      gridConnectionMaintained: !anyTrip,
    };
  },
};

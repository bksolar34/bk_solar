/**
 * js/forecast-engine.js
 * ---------------------------------------------------------------------
 * "실시간 예측 보정 엔진" (AdaptivePage, /forecasting/adaptive) 의 순수
 * 계산 로직만 분리한 엔진 파일. 화면(index.html)은 fetch로 받아온 원시
 * 기상 데이터를 이 엔진에 넘기고, 계산된 결과만 그린다.
 *
 * 이렇게 분리해두면 "화면이 안 뜬다" 같은 문제가 생겼을 때 데이터
 * 로딩(useEffect의 fetch)과 계산(이 엔진) 중 어디가 문제인지 바로
 * 구분할 수 있다 -- 실제로 이번 수정에서도 원인은 fetch 쪽
 * (Promise.all 하나 실패 시 전체 중단)이었고 이 계산 로직 자체는
 * 문제가 없었다.
 * ---------------------------------------------------------------------
 */
window.ForecastEngine = {
  /**
   * Open-Meteo hourly 응답 + PV 설비용량으로 이론발전량/실측(시뮬레이션)
   * 발전량 행렬을 만든다. weather는 fetchWeather()의 원시 응답.
   */
  buildRows(weather, capacityKw) {
    const hourly = weather.hourly;
    const now = new Date();
    const nowIdx = hourly.time.findIndex((t) => new Date(t) >= now);
    const startIdx = Math.max(0, nowIdx - 6);
    const rows = [];
    for (let i = startIdx; i < Math.min(hourly.time.length, startIdx + 18); i++) {
      const radiation = hourly.shortwave_radiation[i];
      const theoreticalKw = Math.min(capacityKw, capacityKw * (radiation / 1000));
      const seed = i % 7 === 3 ? 0.55 : 0.9 + Math.sin(i) * 0.08;
      const actualKw = Math.max(0, theoreticalKw * seed);
      rows.push({ time: new Date(hourly.time[i]), radiation, theoreticalKw, actualKw, isPast: i < nowIdx });
    }
    return rows;
  },

  /**
   * 간헐성 판정: 실측/이론 비율이 낮은데 일사량 변동성(표준편차)이 낮으면
   * 패널/인버터 자체 문제, 변동성이 크면 구름에 의한 간헐성으로 분류.
   */
  classifyIntermittency(rows) {
    return rows.map((r, i) => {
      if (r.theoreticalKw < 50) return { ...r, cause: null };
      const ratio = r.actualKw / r.theoreticalKw;
      const windowRows = rows.slice(Math.max(0, i - 1), i + 2).map((x) => x.radiation);
      const mean = windowRows.reduce((a, b) => a + b, 0) / windowRows.length;
      const variance = windowRows.reduce((a, b) => a + (b - mean) ** 2, 0) / windowRows.length;
      const stdev = Math.sqrt(variance);
      let cause = null;
      if (ratio < 0.75 && stdev < 60) cause = "모듈 오염 / 인버터 발열 의심";
      else if (stdev > 120) cause = "구름으로 인한 간헐성";
      return { ...r, ratio, cause };
    });
  },

  /** 과거(이미 지난) 구간의 실측/이론 평균 비율 = 편향 보정계수 */
  computeBiasFactor(rows) {
    const pastRows = rows.filter((r) => r.isPast && r.theoreticalKw > 50);
    if (!pastRows.length) return 1;
    return pastRows.reduce((a, r) => a + r.actualKw / r.theoreticalKw, 0) / pastRows.length;
  },

  /** 15분/1시간/24시간 후 예측 포인트 (시간당 데이터이므로 1시간 후는
   *  다음 인덱스, 15분 후는 가장 가까운 미래 행을 사용) */
  buildHorizonPoints(rows) {
    const futureRows = rows.filter((r) => !r.isPast);
    return [
      { label: "15분 후", row: futureRows[0] },
      { label: "1시간 후", row: futureRows[Math.min(1, futureRows.length - 1)] },
      { label: "24시간 후", row: futureRows[futureRows.length - 1] },
    ].filter((p) => p.row);
  },

  /** buildRows -> classifyIntermittency -> bias/horizon 계산까지 한 번에 */
  analyze(weather, capacityKw) {
    const rows = this.classifyIntermittency(this.buildRows(weather, capacityKw));
    return {
      rows,
      biasFactor: this.computeBiasFactor(rows),
      horizonPoints: this.buildHorizonPoints(rows),
    };
  },
};

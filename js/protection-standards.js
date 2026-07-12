/**
 * js/protection-standards.js
 * ---------------------------------------------------------------------
 * 첨부파일 "분산형전원_배전계통_연계_기술기준.pdf"
 * (한전 업무표준번호 H0-배전-기준-0015, 14차 개정 2021.6.1) 의
 * 제2장 연계 기술기준(제10조~제18조) 수치 기준을, 참고용 문서가 아니라
 * "실제로 통신·제어 로직이 판정에 사용하는 값"으로 구축한 엔진이다.
 *
 * - window.PROTECTION_STANDARDS : 사람이 읽는 기준표 + 정정값 기본값
 * - window.ProtectionEngine     : 위 기준으로 전압/주파수/역률/직류유입을
 *   실시간 판정하는 함수 모음
 *
 * 이 엔진은 index.html의 GridProtectionPanel(공용 컴포넌트)이 태양광/
 * ESS 모니터링 화면(SolarPage/EssPage)과 하드웨어 추상화 설정
 * (DriverPage)에서 직접 호출한다. 즉 별도의 "보호협조 기준" 전용
 * 메뉴를 두지 않고, 실제 감시·제어 화면 안에서 살아있는 판정 로직으로
 * 동작한다.
 * ---------------------------------------------------------------------
 */
window.PROTECTION_STANDARDS = {
  // 제13조 ③ <표 2.4> 비정상 전압에 대한 분산형전원 분리시간
  voltageTripTable: [
    { range: "V < 50%", time: "0.5 s" },
    { range: "50% ≦ V < 70%", time: "2.00 s" },
    { range: "70% ≦ V < 90%", time: "2.00 s" },
    { range: "110% < V < 120%", time: "1.00 s" },
    { range: "V ≧ 120%", time: "0.16 s" },
  ],
  // 제13조 ④ <표 2.5> 비정상 주파수에 대한 분산형전원 분리시간
  frequencyTripTable: [
    { range: "f > 61.5 Hz", time: "0.16 s" },
    { range: "f < 57.5 Hz", time: "300 s" },
    { range: "f < 57.0 Hz", time: "0.16 s" },
  ],
  // 제16조 ① <표 2.6> 순시전압변동률 허용기준
  voltageFluctuationTable: [
    { frequency: "1시간에 2회 초과 10회 이하", limit: "3%" },
    { frequency: "1일 4회 초과 1시간에 2회 이하", limit: "4%" },
    { frequency: "1일에 4회 이하", limit: "5%" },
  ],
  // 제17조 ① 단독운전 발생 후 분리 시간
  islandingClearingTimeSec: 0.5,
  // 제13조 ⑤-2 재병입 지연시간 (정상 범위 복귀 후 유지되어야 하는 시간)
  reconnectionDelayMin: 5,
  // 제15조 ② 역률 하한 (원칙)
  powerFactorMinPct: 90,
  // 제15조 ① 직류 유입 제한 (정격 출력전류 대비)
  dcInjectionLimitPct: 0.5,
  // 제16조 ② 저압계통 병입시 순시전압변동률 상한
  lowVoltageSwitchingLimitPct: 6,
  source: "한전 「분산형전원 배전계통 연계 기술기준」 H0-배전-기준-0015 (14차 개정, 2021.6.1)",
};
// ---------------------------------------------------------------------
// 아래부터는 위 표를 "표시"만 하는 게 아니라 실제로 판정에 쓰기 위한
// 구조화된 버전. voltageTripTable/frequencyTripTable은 사람이 읽는 표
// 문자열이고, voltageBands/frequencyBands는 그 표와 동일한 값을
// 코드에서 바로 비교 연산할 수 있게 옮긴 것이다 (한쪽만 고치고 다른
// 쪽을 안 고치는 실수를 막기 위해, 아래 두 표는 항상 위 표와 1:1로
// 맞춰서 관리한다).
// ---------------------------------------------------------------------
window.PROTECTION_STANDARDS.voltageBands = [
  { max: 50, timeSec: 0.5, label: "V < 50%" },
  { min: 50, max: 70, timeSec: 2.0, label: "50% ≤ V < 70%" },
  { min: 70, max: 90, timeSec: 2.0, label: "70% ≤ V < 90%" },
  { min: 90, max: 110, timeSec: null, label: "정상 범위 (90~110%)" },
  { min: 110, max: 120, timeSec: 1.0, label: "110% < V < 120%" },
  { min: 120, timeSec: 0.16, label: "V ≥ 120%" },
];
window.PROTECTION_STANDARDS.frequencyBands = [
  { max: 57.0, timeSec: 0.16, label: "f < 57.0 Hz" },
  { min: 57.0, max: 57.5, timeSec: 300, label: "57.0 ≤ f < 57.5 Hz" },
  { min: 57.5, max: 61.5, timeSec: null, label: "정상 범위 (57.5~61.5 Hz)" },
  { min: 61.5, timeSec: 0.16, label: "f > 61.5 Hz" },
];

// 현장에서 조정 가능한 보호계전기 정정값의 "기준(한전 기술기준)" 기본값.
// Store.getRelaySetpoints()가 최초 1회 이 값을 시드로 사용하고, 이후에는
// 하드웨어 추상화 설정(/control/driver) 화면에서 담당자가 직접 수정한
// 값을 쓴다 -- 즉 이 파일은 "출고 시 기본값"이고 실제 정정값은 Store에
// 저장된다.
window.PROTECTION_STANDARDS.defaultRelaySetpoints = {
  islandingClearingTimeSec: 0.5, // 제17조
  reconnectionDelayMin: 5, // 제13조 ⑤ 재병입 지연
  powerFactorMinPct: 90, // 제15조 ②
  dcInjectionLimitPct: 0.5, // 제15조 ①
  lowVoltageSwitchingLimitPct: 6, // 제16조 ②
};

/**
 * window.ProtectionEngine
 * -----------------------------------------------------------------
 * 실제 판정 로직. GridProtectionPanel(공용 컴포넌트, index.html) 이
 * 태양광/ESS 모니터링 화면에서 이 엔진을 호출해 "지금 이 순간" 전압/
 * 주파수/역률/직류유입이 기준 이내인지 판정하고, 위반 시 분리시간을
 * 함께 반환한다. 이 값이 그대로 알람(Store.addAlarm) 생성 조건이 된다.
 * -----------------------------------------------------------------
 */
window.ProtectionEngine = {
  _findBand(value, bands) {
    return bands.find((b) => (b.min === undefined || value >= b.min) && (b.max === undefined || value < b.max)) ?? null;
  },
  evaluateVoltage(pctOfNominal) {
    const band = this._findBand(pctOfNominal, window.PROTECTION_STANDARDS.voltageBands);
    return { normal: !band || band.timeSec === null, clearingTimeSec: band?.timeSec ?? null, label: band?.label ?? "-" };
  },
  evaluateFrequency(hz) {
    const band = this._findBand(hz, window.PROTECTION_STANDARDS.frequencyBands);
    return { normal: !band || band.timeSec === null, clearingTimeSec: band?.timeSec ?? null, label: band?.label ?? "-" };
  },
  evaluatePowerFactor(pf, setpoints) {
    const minPct = setpoints?.powerFactorMinPct ?? window.PROTECTION_STANDARDS.defaultRelaySetpoints.powerFactorMinPct;
    return { normal: pf * 100 >= minPct, minPct };
  },
  evaluateDcInjection(pctOfRatedCurrent, setpoints) {
    const limitPct = setpoints?.dcInjectionLimitPct ?? window.PROTECTION_STANDARDS.defaultRelaySetpoints.dcInjectionLimitPct;
    return { normal: pctOfRatedCurrent <= limitPct, limitPct };
  },
  getDefaultSetpoints() {
    return { ...window.PROTECTION_STANDARDS.defaultRelaySetpoints };
  },
};

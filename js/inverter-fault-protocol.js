/**
 * js/inverter-fault-protocol.js
 * ---------------------------------------------------------------------
 * 표준 인버터 고장코드 프로토콜 (요청: "모든 인버터들의 공통된 내용...
 * 표준화해서 다른 인버터들도 하나의 표준에 이름만 다른 각 제조사의
 * 고장코드 번호를 통합").
 *
 * 구조:
 *   1) STANDARD_FAULT_CATALOG -- 제조사와 무관한 "표준 고장 범주".
 *      IEPVT-22-G2 매뉴얼(이노일렉트릭) 3.9절 응답데이터 형태의 "고장
 *      여부" 비트 테이블(p.21)과 4.5절 FAULT 표(p.29)를 근거로, KS
 *      기준 계통연계 인버터가 공통으로 갖는 보호 범주(과전류/과전압/
 *      저전압/과주파수/저주파수/누설전류/절연저항/온도/릴레이 등)를
 *      표준코드(STD-xx)로 정리했다.
 *   2) VENDOR_FAULT_MAP -- 제조사별 실제 코드 표기(P1, G7, S9 ...)를
 *      표준코드에 매핑. 여기 매핑을 추가하는 것만으로 새 제조사를
 *      통합할 수 있다.
 *
 * 현재 상태: 이노일렉트릭(INO, IEPVT-22-G2) 매핑은 매뉴얼 원문 그대로
 * 완성되어 있다. KACO 매핑은 "KACO제어프로토콜.zip" 파일이 실제로
 * 전달되지 않아 자리(placeholder)만 만들어 두었다 -- 해당 파일을
 * 올려주면 VENDOR_FAULT_MAP.KACO 자리에 실제 코드/명칭만 채우면 되고,
 * 화면(발전소 제어)이나 다른 로직은 전혀 손댈 필요가 없다.
 * ---------------------------------------------------------------------
 */
window.STANDARD_FAULT_CATALOG = {
  PV_OVERCURRENT: { label: "태양광 어레이 과전류", severity: "WARN",
    standardAction: "태양광 어레이(배선/스트링) 점검 후 재기동. 반복 시 서비스센터 문의.",
    controlHint: "인버터 개별 차단기 OFF 후 어레이 점검" },
  PV_OVERVOLTAGE: { label: "태양광 어레이 과전압", severity: "CRITICAL",
    standardAction: "입력 전압이 정격 상한 이하인지 확인 후 재기동. 반복 시 서비스센터 문의.",
    controlHint: "인버터 개별 차단기 OFF, Vmax 초과 여부 확인 후 재기동" },
  PV_INSULATION_LOW: { label: "태양광 어레이 절연저항 부족", severity: "CRITICAL",
    standardAction: "지락 여부 및 전선 피복 상태 점검 후 재기동. 반복 시 서비스센터 문의.",
    controlHint: "인버터 개별 차단기 OFF, 지락/피복 점검 완료 전 재기동 금지" },
  DCLINK_OVERVOLTAGE: { label: "DC LINK 과전압", severity: "WARN",
    standardAction: "일시적 현상일 수 있음. 자동 재기동 대기, 반복 시 서비스센터 문의.",
    controlHint: "자동 재기동 대기 - 반복 시 차단기 OFF" },
  DCLINK_UNDERVOLTAGE: { label: "DC LINK 저전압", severity: "WARN",
    standardAction: "어레이 입력(일사량/배선) 확인 후 재기동. 반복 시 서비스센터 문의.",
    controlHint: "어레이 입력 확인, 자동 재기동 대기" },
  INV_OVERCURRENT: { label: "인버터 과전류", severity: "CRITICAL",
    standardAction: "재기동 후 반복 시 서비스센터 문의.",
    controlHint: "인버터 개별 차단기 OFF, 출력제어(%) 하향 조정 후 재기동" },
  GRID_OVERVOLTAGE: { label: "계통전압 과전압", severity: "WARN",
    standardAction: "계통 상전압이 허용 상한 이하인지 확인, 반복 시 서비스센터 문의.",
    controlHint: "계통 전압 정상화 대기 (자동 재연결)" },
  GRID_UNDERVOLTAGE: { label: "계통전압 저전압", severity: "WARN",
    standardAction: "메인 차단기 상태 확인, 반복 시 서비스센터 문의.",
    controlHint: "발전소 메인 차단기 상태 확인, 계통 정상화 대기" },
  INV_OVERTEMP: { label: "인버터 내부 과열", severity: "WARN",
    standardAction: "냉각/통풍 상태 점검, 반복 시 서비스센터 문의.",
    controlHint: "출력제어(%) 하향, 냉각/통풍 상태 점검" },
  GRID_OVERFREQ: { label: "계통전압 과주파수", severity: "CRITICAL",
    standardAction: "계통 주파수가 허용 상한 이하인지 확인, 반복 시 서비스센터 문의.",
    controlHint: "주파수 제어 판정 참조(HFRT) - 자동 재연결 대기" },
  GRID_UNDERFREQ: { label: "계통전압 저주파수", severity: "CRITICAL",
    standardAction: "계통 주파수가 허용 하한 이상인지 확인, 반복 시 서비스센터 문의.",
    controlHint: "주파수 제어 판정 참조(LFRT) - 자동 재연결 대기" },
  LEAKAGE_OVERCURRENT: { label: "누설전류(RCMU) 이상", severity: "CRITICAL",
    standardAction: "지락 여부 확인, 반복 시 서비스센터 문의.",
    controlHint: "인버터 개별 차단기 OFF, 지락 점검 완료 전 재기동 금지" },
  RELAY_FAULT: { label: "릴레이 고장", severity: "FATAL",
    standardAction: "재기동 불가 시 서비스센터 점검 요청.",
    controlHint: "인버터 개별 차단기 OFF, 서비스센터 점검 요청" },
  RCMU_FAULT: { label: "RCMU 고장", severity: "FATAL",
    standardAction: "재기동 불가 시 서비스센터 점검 요청.",
    controlHint: "인버터 개별 차단기 OFF, 서비스센터 점검 요청" },
  FUSE_FAULT: { label: "퓨즈(스트링) 이상", severity: "WARN",
    standardAction: "결선상태 화면에서 연결 유무 확인 후 단선 시 교체.",
    controlHint: "인버터 개별 차단기 OFF, 결선상태 화면에서 스트링별 퓨즈 확인" },
  SPD_FAULT: { label: "SPD(서지보호기) 이상", severity: "WARN",
    standardAction: "낙뢰/과전압 유입 이력 확인, 필요 시 SPD 교체 요청.",
    controlHint: "SPD 상태 점검, 필요 시 교체 요청" },
};

// 제조사별 실제 코드 표기 -> 표준 범주 매핑.
window.VENDOR_FAULT_MAP = {
  // 이노일렉트릭 IEPVT-22-G2 (KS C 8565/8567) 사용설명서 4.5절 원문 그대로.
  INO: {
    P1: { std: "PV_OVERCURRENT", cause: "태양광 어레이 입력 전류가 상승" },
    P2: { std: "PV_OVERVOLTAGE", cause: "태양광 어레이의 입력 전압이 상승" },
    P14: { std: "PV_INSULATION_LOW", cause: "태양광 어레이의 절연저항이 부족" },
    P4: { std: "DCLINK_OVERVOLTAGE", cause: "DC_LINK 허용전압 초과" },
    P5: { std: "DCLINK_UNDERVOLTAGE", cause: "DC LINK의 허용 전압 미달" },
    G6: { std: "INV_OVERCURRENT", cause: "인버터 허용 전류 초과" },
    G7: { std: "GRID_OVERVOLTAGE", cause: "한전 허용 전압 초과" },
    G8: { std: "GRID_UNDERVOLTAGE", cause: "한전 허용 전압 미달" },
    S9: { std: "INV_OVERTEMP", cause: "인버터 내부 온도 상승 (허용온도 105\u2103)" },
    G10: { std: "GRID_OVERFREQ", cause: "계통 주파수 초과" },
    G11: { std: "GRID_UNDERFREQ", cause: "계통 주파수 미달" },
    G13: { std: "LEAKAGE_OVERCURRENT", cause: "누설 전류 이상" },
    G18: { std: "INV_OVERCURRENT", cause: "인버터 과전류 (순시값) - 제한 전류 초과 시 정지" },
    P19: { std: "DCLINK_OVERVOLTAGE", cause: "DC LINK 과전압 (순시값) - 허용 전압 초과 시 정지" },
    P20: { std: "DCLINK_UNDERVOLTAGE", cause: "DC LINK 저전압 (순시값) - 허용 전압 미만 시 즉시 차단" },
    S21: { std: "RELAY_FAULT", cause: "릴레이 고장" },
    S22: { std: "RCMU_FAULT", cause: "RCMU 고장" },
    FUSE: { std: "FUSE_FAULT", cause: "과전류 발생 (결선상태 페이지에서 확인)" },
    A4: { std: "SPD_FAULT", cause: "낙뢰 또는 과전압 유입" },
  },
  // TODO: "KACO제어프로토콜.zip" 파일을 전달받으면 이 자리에 KACO 실제
  // 코드(예: F001, E12 등 실제 표기)와 표준 범주 매핑만 채워 넣으면
  // 된다. 예시 형태:
  //   KACO: {
  //     "F01": { std: "PV_OVERCURRENT", cause: "<KACO 매뉴얼 원문 발생 원인>" },
  //     ...
  //   }
  KACO: {},
};

window.FAULT_SEVERITY_COLOR = { FATAL: "var(--alert)", CRITICAL: "var(--alert)", WARN: "var(--warn)" };

window.FaultProtocol = {
  // 특정 제조사의 원본 코드를 표준 고장 정보로 변환한다.
  resolve(vendor, rawCode) {
    const vendorMap = window.VENDOR_FAULT_MAP[vendor];
    if (!vendorMap) return null;
    const entry = vendorMap[rawCode];
    if (!entry) return null;
    const std = window.STANDARD_FAULT_CATALOG[entry.std];
    if (!std) return null;
    return {
      vendor, rawCode, standardCode: entry.std,
      label: std.label, cause: entry.cause,
      standardAction: std.standardAction, controlHint: std.controlHint,
      severity: std.severity,
    };
  },
  vendors() { return Object.keys(window.VENDOR_FAULT_MAP); },
  rawCodesFor(vendor) { return Object.keys(window.VENDOR_FAULT_MAP[vendor] ?? {}); },
};

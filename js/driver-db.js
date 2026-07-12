/**
 * js/driver-db.js
 * ---------------------------------------------------------------------
 * "제조사 / 모델 데이터베이스 폴더" 엔진.
 *
 * DriverPage(하드웨어 추상화 설정, /control/driver)가 이 파일을 읽어
 * 제조사 -> 모델 -> 통신 프로토콜 매핑 선택창을 구성한다.
 *
 * 새 장비를 추가하고 싶다면:
 *   1) 아래 DRIVER_DB 객체에 제조사 키가 없으면 새로 추가
 *   2) 그 제조사의 models 안에 모델명 키를 추가하고
 *      { protocol, system, defaultParams } 를 채운다
 *   3) 저장 후 새로고침하면 하드웨어 추상화 설정 화면의
 *      제조사/모델 선택창에 즉시 반영된다 (빌드 불필요).
 *
 * system: "SOLAR" | "ESS" | "COMMON" -- 상계용 시스템 통신 상태 화면의
 * 태양광/ESS 선택창 필터링(js 파일 comm 로직)과 동일한 값 체계를 쓴다.
 * ---------------------------------------------------------------------
 */
window.DRIVER_DB = {
  // 첨부 "KACO제어프로토콜.zip" 실 제조사 자료 기반 (OCI Power Co., Ltd.
  // 제작 PG-U01g MODBUS Protocol of XP & BP Series, PG-U02c SOAP Protocol,
  // APL_RS485protocol_KACO_Reactive-Power-Control 문서 근거).
  // registerMap의 주소는 실제 SunSpec Modbus 레지스터 번지이며,
  // js/remote-control-engine.js가 발전소 원격 제어(/control/plant) 결과
  // 산출 시 그대로 참조한다.
  "KACO(OCI Power)": {
    models: {
      "XP Series (중앙집중형, SunSpec Modbus TCP)": {
        protocol: "SUNSPEC_MODBUS", system: "SOLAR",
        defaultParams: { port: 502, unitId: 1, sunspecModel: "C103/C113 3-Phase Inverter" },
        registerMap: {
          WMaxLimPct: 40250, // 유효전력 출력 제한(%) - IC123 Immediate Controls
          OutPFSet: 40255,   // 고정 역률 설정값 - IC123
          VArWMaxPct: 40260, // 무효전력(%) 설정값 - IC123
          LVRT_MustDisconnect: "IC129 (addr 40287~)", // 저전압 이상시 분리 커브
          HVRT_MustDisconnect: "IC130 (addr 40325~)", // 고전압 이상시 분리 커브
          LFRT_Array: "IC135", // 저주파수 이상시 분리 커브
          HFRT_Array: "IC136", // 고주파수 이상시 분리 커브
        },
      },
      "BP Series (중앙집중형, SunSpec Modbus TCP)": {
        protocol: "SUNSPEC_MODBUS", system: "SOLAR",
        defaultParams: { port: 502, unitId: 1, sunspecModel: "C103/C113 3-Phase Inverter" },
        registerMap: { WMaxLimPct: 40250, OutPFSet: 40255, VArWMaxPct: 40260 },
      },
      "XP/BP Series (SOAP 원격제어)": {
        protocol: "SOAP_HTTP", system: "SOLAR",
        defaultParams: { port: 80, endpoint: "/soap/InverterControl" },
      },
      "XP/BP Series (RS485 Ripple-Control 리시버)": {
        protocol: "RS485", system: "SOLAR",
        defaultParams: { baud: 9600, note: "독일 EEG 지침 기반 4단계(100/60/30/0%) 유효전력 저감 리플컨트롤 수신기" },
      },
    },
  },
  "Sungrow": {
    models: {
      "SG3125HV": { protocol: "SUNSPEC_MODBUS", system: "SOLAR", defaultParams: { unitId: 1, baud: 9600 } },
      "SG250HX": { protocol: "SUNSPEC_MODBUS", system: "SOLAR", defaultParams: { unitId: 1, baud: 9600 } },
      "SG33CX": { protocol: "MODBUS_TCP", system: "SOLAR", defaultParams: { port: 502 } },
    },
  },
  "Huawei": {
    models: {
      "SUN2000-100KTL-M1": { protocol: "MODBUS_TCP", system: "SOLAR", defaultParams: { port: 502, unitId: 1 } },
      "SUN2000-215KTL-H1": { protocol: "MODBUS_TCP", system: "SOLAR", defaultParams: { port: 502, unitId: 1 } },
    },
  },
  "SMA": {
    models: {
      "Sunny Central 2500-EV": { protocol: "SUNSPEC_MODBUS", system: "SOLAR", defaultParams: { unitId: 3, baud: 9600 } },
      "Sunny Tripower CORE1": { protocol: "MODBUS_TCP", system: "SOLAR", defaultParams: { port: 502 } },
    },
  },
  "Delta": {
    models: {
      "M125HV": { protocol: "MODBUS_TCP", system: "SOLAR", defaultParams: { port: 502 } },
      "M70A": { protocol: "MODBUS_RTU", system: "SOLAR", defaultParams: { baud: 19200 } },
    },
  },
  "Hyosung": {
    models: {
      "HS-500K": { protocol: "IEC61850", system: "SOLAR", defaultParams: { iedName: "PV1" } },
    },
  },
  "Tesla": {
    models: {
      "Megapack BMS": { protocol: "CAN", system: "ESS", defaultParams: { bitrate: 250000 } },
      "Powerpack BMS": { protocol: "CAN", system: "ESS", defaultParams: { bitrate: 250000 } },
    },
  },
  "삼성SDI": {
    models: {
      "E3 BMS": { protocol: "CAN", system: "ESS", defaultParams: { bitrate: 500000 } },
      "SBB BMS": { protocol: "MODBUS_TCP", system: "ESS", defaultParams: { port: 502 } },
    },
  },
  "LG에너지솔루션": {
    models: {
      "RESU BMS": { protocol: "CAN", system: "ESS", defaultParams: { bitrate: 500000 } },
    },
  },
  "BYD": {
    models: {
      "Battery-Box Premium BMS": { protocol: "MODBUS_TCP", system: "ESS", defaultParams: { port: 502 } },
    },
  },
  "Schneider": {
    models: {
      "PM8000": { protocol: "MODBUS_TCP", system: "COMMON", defaultParams: { port: 502, unitId: 10 } },
      "ION9000": { protocol: "MODBUS_TCP", system: "COMMON", defaultParams: { port: 502 } },
    },
  },
  "LS ELECTRIC": {
    models: {
      "GIM1000": { protocol: "MODBUS_RTU", system: "COMMON", defaultParams: { baud: 9600 } },
      "DNP-100": { protocol: "DNP3", system: "COMMON", defaultParams: { port: 20000 } },
    },
  },
};

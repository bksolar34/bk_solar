/**
 * js/comm-topology-engine.js
 * ---------------------------------------------------------------------
 * "1. 상계용에서 시스템통신상태에 태양광/ESS가 혼용되어 있다" 요청에 대한
 * 엔진. 상계용(NET_METERING) 사이트는 구조상 태양광 · ESS 중 하나만
 * 물리적으로 구성 가능하므로, 저장된 선택값(Store.netMeteringEquipment)
 * 기준으로 "시스템 통신 상태" 화면의 통신 링크/장치 목록만 걸러낸다.
 *
 * 주의: 좌측 메뉴(1. 모니터링 및 자산 관리의 태양광/ESS 시스템, 3D 트윈)는
 * 설비유형 선택과 무관하게 항상 그대로 노출된다 -- 실제로 설치되지
 * 않은 계통이라도 화면 자체는 볼 수 있어야 하며, "한 공간에 둘 다
 * 구성할 수 없다"는 제약은 오직 통신 링크 목록에만 적용된다.
 *
 * index.html 의 CommPage는 이 엔진의 함수를 호출하기만 하고, 필터링
 * 규칙 자체는 이 파일에서만 바뀐다.
 * ---------------------------------------------------------------------
 */
window.CommEngine = {
  /**
   * 통신 링크 목록 중, 현재 usage/선택된 설비유형에 맞는 것만 남긴다.
   * - NET_METERING이 아니면(발전용/ESS전용) 그 계통은 원래 하나만
   *   존재하므로 전체를 그대로 보여준다.
   * - NET_METERING이면 COMMON(공통설비: 계량기 등) + 선택된 설비유형만.
   */
  filterCommLinks(links, usage, equipment) {
    if (usage !== "NET_METERING") return links;
    return links.filter((l) => l.system === "COMMON" || l.system === equipment);
  },

  /** 동일한 규칙을 장치(디바이스) 목록에도 적용 */
  filterDevices(devices, usage, equipment) {
    if (usage !== "NET_METERING") return devices;
    return devices.filter((d) => d.system === "COMMON" || d.system === equipment);
  },
};

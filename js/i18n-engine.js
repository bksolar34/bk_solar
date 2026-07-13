// js/i18n-engine.js
// 완전 오프라인 다국어 번역 엔진 -- 외부 API/네트워크에 전혀 의존하지 않는다.
// 사내망, 폐쇄망(Air-gap), 사내 포털 iframe, 구형 브라우저 등 어떤 환경에서도
// 동일하게 동작한다 (Google 번역/Chrome 내장 번역 아이콘이 막히거나 사라져도 영향 없음).
// 구조: 한국어 원문 문자열을 key로 하는 사전(LANG_DICT)을 그대로 코드에 내장하고,
// 화면에 렌더링될 때 <T> 컴포넌트가 현재 선택된 언어로 그 자리에서 치환한다.

window.SUPPORTED_LANGS = [
  { code: "ko", label: "한국어" },
  { code: "en", label: "English" },
  { code: "vi", label: "Tiếng Việt" },
  { code: "zh", label: "中文" },
  { code: "ja", label: "日本語" },
  { code: "ru", label: "Русский" },
];

window.LANG_DICT = {
  "1. 모니터링 및 자산 관리 (상세창)": {
    "en": "1. Monitoring & Asset Management (Detail)",
    "vi": "1. Giám sát & Quản lý tài sản (Chi tiết)",
    "zh": "1. 监控与资产管理（详情）",
    "ja": "1. 監視・資産管理（詳細画面）",
    "ru": "1. Мониторинг и управление активами (детали)"
  },
  "100kW 캐비닛": {
    "en": "100kW Cabinet",
    "vi": "Tủ 100kW",
    "zh": "100kW 机柜",
    "ja": "100kWキャビネット",
    "ru": "Шкаф 100кВт"
  },
  "150kW 캐비닛": {
    "en": "150kW Cabinet",
    "vi": "Tủ 150kW",
    "zh": "150kW 机柜",
    "ja": "150kWキャビネット",
    "ru": "Шкаф 150кВт"
  },
  "15분 후": {
    "en": "In 15 min",
    "vi": "Sau 15 phút",
    "zh": "15分钟后",
    "ja": "15分後",
    "ru": "Через 15 мин"
  },
  "1시간 후": {
    "en": "In 1 hour",
    "vi": "Sau 1 giờ",
    "zh": "1小时后",
    "ja": "1時間後",
    "ru": "Через 1 час"
  },
  "2. 공간 정보 및 적응형 예측 분석": {
    "en": "2. Geospatial Data & Adaptive Forecast Analysis",
    "vi": "2. Dữ liệu không gian & Phân tích dự báo thích ứng",
    "zh": "2. 空间信息与自适应预测分析",
    "ja": "2. 空間情報・適応型予測分析",
    "ru": "2. Геопространственные данные и адаптивный прогноз"
  },
  "200kW 캐비닛": {
    "en": "200kW Cabinet",
    "vi": "Tủ 200kW",
    "zh": "200kW 机柜",
    "ja": "200kWキャビネット",
    "ru": "Шкаф 200кВт"
  },
  "20ft 컨테이너": {
    "en": "20ft Container",
    "vi": "Container 20ft",
    "zh": "20英尺集装箱",
    "ja": "20フィートコンテナ",
    "ru": "Контейнер 20 футов"
  },
  "24시간 후": {
    "en": "In 24 hours",
    "vi": "Sau 24 giờ",
    "zh": "24小时后",
    "ja": "24時間後",
    "ru": "Через 24 часа"
  },
  "250kW 캐비닛": {
    "en": "250kW Cabinet",
    "vi": "Tủ 250kW",
    "zh": "250kW 机柜",
    "ja": "250kWキャビネット",
    "ru": "Шкаф 250кВт"
  },
  "3. 원격 제어 및 드라이버 설정": {
    "en": "3. Remote Control & Driver Settings",
    "vi": "3. Điều khiển từ xa & Cài đặt driver",
    "zh": "3. 远程控制与驱动设置",
    "ja": "3. 遠隔制御・ドライバー設定",
    "ru": "3. Дистанционное управление и настройка драйверов"
  },
  "3D 건물 · 지형 뷰 (OpenFreeMap)": {
    "en": "3D Building & Terrain View (OpenFreeMap)",
    "vi": "Xem 3D tòa nhà & địa hình (OpenFreeMap)",
    "zh": "3D建筑·地形视图（OpenFreeMap）",
    "ja": "3D建物・地形ビュー（OpenFreeMap）",
    "ru": "3D вид зданий и рельефа (OpenFreeMap)"
  },
  "3D 디지털 트윈 열화상 맵": {
    "en": "3D Digital Twin Thermal Map",
    "vi": "Bản đồ nhiệt Digital Twin 3D",
    "zh": "3D数字孪生热成像图",
    "ja": "3Dデジタルツイン熱画像マップ",
    "ru": "3D цифровой двойник — тепловая карта"
  },
  "4. 보안 및 운영 이력 관리": {
    "en": "4. Security & Operation History Management",
    "vi": "4. Quản lý bảo mật & lịch sử vận hành",
    "zh": "4. 安全与运行履历管理",
    "ja": "4. セキュリティ・運用履歴管理",
    "ru": "4. Безопасность и управление историей эксплуатации"
  },
  "404": {
    "en": "404",
    "vi": "404",
    "zh": "404",
    "ja": "404",
    "ru": "404"
  },
  "40ft 컨테이너": {
    "en": "40ft Container",
    "vi": "Container 40ft",
    "zh": "40英尺集装箱",
    "ja": "40フィートコンテナ",
    "ru": "Контейнер 40 футов"
  },
  "A상전류(Ia)": {
    "en": "Phase A Current (Ia)",
    "vi": "Dòng điện pha A (Ia)",
    "zh": "A相电流(Ia)",
    "ja": "A相電流(Ia)",
    "ru": "Ток фазы A (Ia)"
  },
  "A상전압(Va)": {
    "en": "Phase A Voltage (Va)",
    "vi": "Điện áp pha A (Va)",
    "zh": "A相电压(Va)",
    "ja": "A相電圧(Va)",
    "ru": "Напряжение фазы A (Va)"
  },
  "B상전류(Ib)": {
    "en": "Phase B Current (Ib)",
    "vi": "Dòng điện pha B (Ib)",
    "zh": "B相电流(Ib)",
    "ja": "B相電流(Ib)",
    "ru": "Ток фазы B (Ib)"
  },
  "B상전압(Vb)": {
    "en": "Phase B Voltage (Vb)",
    "vi": "Điện áp pha B (Vb)",
    "zh": "B相电压(Vb)",
    "ja": "B相電圧(Vb)",
    "ru": "Напряжение фазы B (Vb)"
  },
  "CELL DETAIL": {
    "en": "CELL DETAIL",
    "vi": "CHI TIẾT CELL",
    "zh": "电芯详情",
    "ja": "セル詳細",
    "ru": "ДЕТАЛИ ЯЧЕЙКИ"
  },
  "COMM STATUS": {
    "en": "COMM STATUS",
    "vi": "TRẠNG THÁI TRUYỀN THÔNG",
    "zh": "通信状态",
    "ja": "通信ステータス",
    "ru": "СТАТУС СВЯЗИ"
  },
  "CRIT": {
    "en": "CRIT",
    "vi": "NGHIÊM TRỌNG",
    "zh": "严重",
    "ja": "重大",
    "ru": "КРИТ"
  },
  "Cell ": {
    "en": "Cell ",
    "vi": "Cell ",
    "zh": "电芯 ",
    "ja": "セル ",
    "ru": "Ячейка "
  },
  "CyclOSM (지형 강조, 2D)": {
    "en": "CyclOSM (Terrain Emphasis, 2D)",
    "vi": "CyclOSM (nhấn mạnh địa hình, 2D)",
    "zh": "CyclOSM（地形强调，2D）",
    "ja": "CyclOSM（地形強調、2D）",
    "ru": "CyclOSM (акцент на рельеф, 2D)"
  },
  "C상전류(Ic)": {
    "en": "Phase C Current (Ic)",
    "vi": "Dòng điện pha C (Ic)",
    "zh": "C相电流(Ic)",
    "ja": "C相電流(Ic)",
    "ru": "Ток фазы C (Ic)"
  },
  "C상전압(Vc)": {
    "en": "Phase C Voltage (Vc)",
    "vi": "Điện áp pha C (Vc)",
    "zh": "C相电压(Vc)",
    "ja": "C相電圧(Vc)",
    "ru": "Напряжение фазы C (Vc)"
  },
  "D/L": {
    "en": "D/L (Distribution Line)",
    "vi": "Đường dây phân phối (D/L)",
    "zh": "配电线(D/L)",
    "ja": "配電線(D/L)",
    "ru": "Линия распределения (D/L)"
  },
  "DC 전압": {
    "en": "DC Voltage",
    "vi": "Điện áp DC",
    "zh": "DC电压",
    "ja": "DC電圧",
    "ru": "Напряжение DC"
  },
  "DEVICE DRIVERS": {
    "en": "DEVICE DRIVERS",
    "vi": "DRIVER THIẾT BỊ",
    "zh": "设备驱动",
    "ja": "デバイスドライバー",
    "ru": "ДРАЙВЕРЫ УСТРОЙСТВ"
  },
  "Droop (분산 제어)": {
    "en": "Droop (Distributed Control)",
    "vi": "Droop (điều khiển phân tán)",
    "zh": "下垂控制（分布式控制）",
    "ja": "ドループ（分散制御）",
    "ru": "Droop (распределённое управление)"
  },
  "ENCRYPTED LOG": {
    "en": "ENCRYPTED LOG",
    "vi": "NHẬT KÝ MÃ HÓA",
    "zh": "加密日志",
    "ja": "暗号化ログ",
    "ru": "ЗАШИФРОВАННЫЙ ЖУРНАЛ"
  },
  "ESS": {
    "en": "ESS",
    "vi": "ESS",
    "zh": "储能系统(ESS)",
    "ja": "ESS",
    "ru": "СНЭ (ESS)"
  },
  "ESS PACK": {
    "en": "ESS PACK",
    "vi": "ESS PACK",
    "zh": "ESS电池组(PACK)",
    "ja": "ESSパック",
    "ru": "Батарейный блок СНЭ (ESS PACK)"
  },
  "ESS 시스템": {
    "en": "ESS System",
    "vi": "Hệ thống ESS",
    "zh": "储能系统(ESS)",
    "ja": "ESSシステム",
    "ru": "Система СНЭ (ESS)"
  },
  "ESS 시스템 구성도": {
    "en": "ESS System Configuration Diagram",
    "vi": "Sơ đồ cấu hình hệ thống ESS",
    "zh": "ESS系统构成图",
    "ja": "ESSシステム構成図",
    "ru": "Схема системы СНЭ (ESS)"
  },
  "ESS 용량 설정": {
    "en": "ESS Capacity Settings",
    "vi": "Cài đặt dung lượng ESS",
    "zh": "ESS容量设置",
    "ja": "ESS容量設定",
    "ru": "Настройка ёмкости СНЭ"
  },
  "ESS전용": {
    "en": "ESS-Only",
    "vi": "Chỉ dùng ESS",
    "zh": "仅限ESS",
    "ja": "ESS専用",
    "ru": "Только СНЭ"
  },
  "FATAL": {
    "en": "FATAL",
    "vi": "NGHIÊM TRỌNG",
    "zh": "致命",
    "ja": "致命的",
    "ru": "АВАРИЯ"
  },
  "GEOSPATIAL SETUP": {
    "en": "GEOSPATIAL SETUP",
    "vi": "THIẾT LẬP KHÔNG GIAN",
    "zh": "空间设置",
    "ja": "空間設定",
    "ru": "НАСТРОЙКА ГЕОДАННЫХ"
  },
  "GFL ⇄ GFM": {
    "en": "GFL ⇄ GFM",
    "vi": "GFL ⇄ GFM",
    "zh": "GFL ⇄ GFM",
    "ja": "GFL ⇄ GFM",
    "ru": "GFL ⇄ GFM"
  },
  "HARDWARE ABSTRACTION · DEVICE DRIVER DB": {
    "en": "HARDWARE ABSTRACTION · DEVICE DRIVER DB",
    "vi": "TRỪU TƯỢNG PHẦN CỨNG · CSDL DRIVER",
    "zh": "硬件抽象·设备驱动数据库",
    "ja": "ハードウェア抽象化・デバイスドライバーDB",
    "ru": "АБСТРАГИРОВАНИЕ ОБОРУДОВАНИЯ · БД ДРАЙВЕРОВ"
  },
  "KPX SMP (시뮬레이션)": {
    "en": "KPX SMP (Simulation)",
    "vi": "KPX SMP (Mô phỏng)",
    "zh": "KPX SMP（模拟）",
    "ja": "KPX SMP（シミュレーション）",
    "ru": "KPX SMP (симуляция)"
  },
  "LEGEND": {
    "en": "LEGEND",
    "vi": "CHÚ GIẢI",
    "zh": "图例",
    "ja": "凡例",
    "ru": "ЛЕГЕНДА"
  },
  "MFA": {
    "en": "MFA",
    "vi": "MFA (Xác thực đa yếu tố)",
    "zh": "多因素认证(MFA)",
    "ja": "MFA（多要素認証）",
    "ru": "MFA (многофакторная аутентификация)"
  },
  "Master-Slave": {
    "en": "Master-Slave",
    "vi": "Master-Slave",
    "zh": "主从",
    "ja": "マスター・スレーブ",
    "ru": "Master-Slave"
  },
  "NET METERING · 태양광 ⇄ ESS (택 1)": {
    "en": "Net Metering · Solar ⇄ ESS (Choose 1)",
    "vi": "Net Metering · Điện mặt trời ⇄ ESS (chọn 1)",
    "zh": "净计量·光伏⇄储能（二选一）",
    "ja": "ネットメータリング・太陽光⇄ESS（択一）",
    "ru": "Нетто-учёт · Солнце ⇄ СНЭ (выбрать один)"
  },
  "OpenStreetMap 3D 부지 뷰 (건물 + 지형)": {
    "en": "OpenStreetMap 3D Site View (Buildings + Terrain)",
    "vi": "Xem 3D mặt bằng OpenStreetMap (Tòa nhà + Địa hình)",
    "zh": "OpenStreetMap 3D场地视图（建筑+地形）",
    "ja": "OpenStreetMap 3D敷地ビュー（建物+地形）",
    "ru": "3D вид объекта OpenStreetMap (здания + рельеф)"
  },
  "PCS": {
    "en": "PCS",
    "vi": "PCS",
    "zh": "PCS（功率转换系统）",
    "ja": "PCS",
    "ru": "PCS (силовой преобразователь)"
  },
  "PV 출력 (DC)": {
    "en": "PV Output (DC)",
    "vi": "Công suất ra PV (DC)",
    "zh": "光伏输出（DC）",
    "ja": "PV出力（DC）",
    "ru": "Выход PV (DC)"
  },
  "Pack ": {
    "en": "Pack ",
    "vi": "Pack ",
    "zh": "电池组 ",
    "ja": "パック ",
    "ru": "Блок "
  },
  "Pack 추가": {
    "en": "Add Pack",
    "vi": "Thêm Pack",
    "zh": "添加电池组",
    "ja": "パック追加",
    "ru": "Добавить блок"
  },
  "Power Plant Control · 클릭 시 ON/OFF 스위치 및 제어 창 오픈": {
    "en": "Power Plant Control · Click to open ON/OFF switch and control panel",
    "vi": "Điều khiển nhà máy · Nhấp để mở công tắc ON/OFF và cửa sổ điều khiển",
    "zh": "电站控制·点击打开开关及控制窗口",
    "ja": "発電所制御・クリックでON/OFFスイッチと制御ウィンドウを開く",
    "ru": "Управление электростанцией · Нажмите для открытия переключателя ВКЛ/ВЫКЛ и окна управления"
  },
  "Rp / Rq": {
    "en": "Rp / Rq",
    "vi": "Rp / Rq",
    "zh": "Rp / Rq",
    "ja": "Rp / Rq",
    "ru": "Rp / Rq"
  },
  "SCOPE": {
    "en": "SCOPE",
    "vi": "PHẠM VI",
    "zh": "范围",
    "ja": "スコープ",
    "ru": "ОБЛАСТЬ"
  },
  "SOC (충전 상태)": {
    "en": "SOC (State of Charge)",
    "vi": "SOC (Trạng thái sạc)",
    "zh": "SOC（荷电状态）",
    "ja": "SOC（充電状態）",
    "ru": "SOC (уровень заряда)"
  },
  "SOC/SOH · 충방전 제어 중심": {
    "en": "SOC/SOH · Charge/Discharge Control Focus",
    "vi": "SOC/SOH · Trọng tâm điều khiển sạc/xả",
    "zh": "SOC/SOH·以充放电控制为中心",
    "ja": "SOC/SOH・充放電制御中心",
    "ru": "SOC/SOH · Фокус на управлении заряд/разряд"
  },
  "SOH (건강도)": {
    "en": "SOH (State of Health)",
    "vi": "SOH (Trạng thái sức khỏe)",
    "zh": "SOH（健康状态）",
    "ja": "SOH（健康状態）",
    "ru": "SOH (состояние здоровья батареи)"
  },
  "STEP 1 / 3": {
    "en": "STEP 1 / 3",
    "vi": "BƯỚC 1 / 3",
    "zh": "步骤 1 / 3",
    "ja": "ステップ 1 / 3",
    "ru": "ШАГ 1 / 3"
  },
  "STEP 2 / 3": {
    "en": "STEP 2 / 3",
    "vi": "BƯỚC 2 / 3",
    "zh": "步骤 2 / 3",
    "ja": "ステップ 2 / 3",
    "ru": "ШАГ 2 / 3"
  },
  "WARN": {
    "en": "WARN",
    "vi": "CẢNH BÁO",
    "zh": "警告",
    "ja": "警告",
    "ru": "ПРЕДУПРЕЖДЕНИЕ"
  },
  "WIRING": {
    "en": "WIRING",
    "vi": "SƠ ĐỒ ĐẤU DÂY",
    "zh": "接线",
    "ja": "配線",
    "ru": "СХЕМА ПОДКЛЮЧЕНИЯ"
  },
  "컨테이너 ": {
    "en": "Container ",
    "vi": "Container ",
    "zh": "集装箱 ",
    "ja": "コンテナ ",
    "ru": "Контейнер "
  },
  "패널 → 인버터 → 양방향계량기/배전반 → D/L": {
    "en": "Panel → Inverter → Bidirectional Meter/Switchgear → D/L",
    "vi": "Tấm pin → Inverter → Đồng hồ hai chiều/Tủ điện → D/L",
    "zh": "光伏板 → 逆变器 → 双向电表/配电盘 → D/L",
    "ja": "パネル → インバーター → 双方向計器/配電盤 → D/L",
    "ru": "Панель → Инвертор → Двунаправленный счётчик/распредщит → D/L"
  },
  "찾을 수 없는 화면": {
    "en": "Page Not Found",
    "vi": "Không tìm thấy trang",
    "zh": "找不到页面",
    "ja": "見つからないページ",
    "ru": "Страница не найдена"
  },
  "가동 / 운영 통계": {
    "en": "Operation / Runtime Statistics",
    "vi": "Thống kê vận hành",
    "zh": "运行/运营统计",
    "ja": "稼働・運用統計",
    "ru": "Статистика работы / эксплуатации"
  },
  "가동 / 운영 통계 기록": {
    "en": "Operation / Runtime Statistics Log",
    "vi": "Nhật ký thống kê vận hành",
    "zh": "运行/运营统计记录",
    "ja": "稼働・運用統計記録",
    "ru": "Журнал статистики работы / эксплуатации"
  },
  "감사 이력 (Audit Trail)": {
    "en": "Audit Trail",
    "vi": "Nhật ký kiểm toán (Audit Trail)",
    "zh": "审计记录（Audit Trail）",
    "ja": "監査履歴（Audit Trail）",
    "ru": "Журнал аудита (Audit Trail)"
  },
  "값 수정 후 반드시 [적용]을 눌러야 실제로 반영됩니다 (기능 지원 장비 탑재 발전소만 가능)": {
    "en": "After changing a value, you must press [Apply] for it to take effect (only available at plants with supporting equipment)",
    "vi": "Sau khi thay đổi giá trị, phải nhấn [Áp dụng] để có hiệu lực (chỉ khả dụng tại nhà máy có thiết bị hỗ trợ)",
    "zh": "修改数值后必须点击【应用】才能实际生效（仅限配备相应功能设备的电站）",
    "ja": "値を変更した後は必ず［適用］を押さないと反映されません（対応機器を搭載した発電所のみ可能）",
    "ru": "После изменения значения обязательно нажмите [Применить], чтобы оно вступило в силу (доступно только на станциях с поддерживающим оборудованием)"
  },
  "경도": {
    "en": "Longitude",
    "vi": "Kinh độ",
    "zh": "经度",
    "ja": "経度",
    "ru": "Долгота"
  },
  "계량 방향": {
    "en": "Metering Direction",
    "vi": "Hướng đo đếm",
    "zh": "计量方向",
    "ja": "計量方向",
    "ru": "Направление учёта"
  },
  "계량기/배전반": {
    "en": "Meter / Switchgear",
    "vi": "Đồng hồ đo / Tủ điện",
    "zh": "电表/配电盘",
    "ja": "計器/配電盤",
    "ru": "Счётчик / распределительный щит"
  },
  "계통 순유출입 상계 거래 중심": {
    "en": "Grid Net Export/Import Offset Focus",
    "vi": "Trọng tâm bù trừ xuất/nhập lưới ròng",
    "zh": "以电网净输出入抵消交易为中心",
    "ja": "系統純流出入相殺取引中心",
    "ru": "Фокус на взаимозачёте чистого перетока сети"
  },
  "고도": {
    "en": "Elevation",
    "vi": "Độ cao",
    "zh": "海拔",
    "ja": "標高",
    "ru": "Высота над уровнем моря"
  },
  "공간 정보 연동 및 부지 생성": {
    "en": "Geospatial Data Integration & Site Creation",
    "vi": "Tích hợp dữ liệu không gian & tạo mặt bằng",
    "zh": "空间信息联动与场地创建",
    "ja": "空間情報連携・敷地作成",
    "ru": "Интеграция геоданных и создание объекта"
  },
  "공통": {
    "en": "Common",
    "vi": "Chung",
    "zh": "通用",
    "ja": "共通",
    "ru": "Общее"
  },
  "기온": {
    "en": "Temperature",
    "vi": "Nhiệt độ",
    "zh": "气温",
    "ja": "気温",
    "ru": "Температура воздуха"
  },
  "단선": {
    "en": "Line Break",
    "vi": "Đứt dây",
    "zh": "断线",
    "ja": "断線",
    "ru": "Обрыв линии"
  },
  "대상 부지": {
    "en": "Target Site",
    "vi": "Mặt bằng mục tiêu",
    "zh": "目标场地",
    "ja": "対象敷地",
    "ru": "Целевой объект"
  },
  "드룹 파라미터": {
    "en": "Droop Parameters",
    "vi": "Tham số Droop",
    "zh": "下垂参数",
    "ja": "ドループパラメーター",
    "ru": "Параметры Droop"
  },
  "리포트 생성": {
    "en": "Generate Report",
    "vi": "Tạo báo cáo",
    "zh": "生成报告",
    "ja": "レポート生成",
    "ru": "Создать отчёт"
  },
  "리포트 이력": {
    "en": "Report History",
    "vi": "Lịch sử báo cáo",
    "zh": "报告历史",
    "ja": "レポート履歴",
    "ru": "История отчётов"
  },
  "마스터 ESS 1대가 GFM, 나머지는 GFL로 추종 (소규모 사이트)": {
    "en": "One master ESS runs GFM while the rest follow as GFL (small sites)",
    "vi": "1 ESS chủ chạy GFM, các ESS còn lại theo GFL (địa điểm nhỏ)",
    "zh": "1台主ESS运行GFM，其余以GFL跟随（小型场地）",
    "ja": "マスターESS1台がGFM、残りはGFLで追従（小規模サイト）",
    "ru": "Один master СНЭ работает в GFM, остальные следуют в GFL (малые объекты)"
  },
  "마이크로그리드 토폴로지 설정": {
    "en": "Microgrid Topology Settings",
    "vi": "Cài đặt cấu trúc liên kết microgrid",
    "zh": "微电网拓扑设置",
    "ja": "マイクログリッドトポロジー設定",
    "ru": "Настройка топологии микросети"
  },
  "마지막 Pack 삭제": {
    "en": "Delete Last Pack",
    "vi": "Xóa Pack cuối cùng",
    "zh": "删除最后一个电池组",
    "ja": "最後のパックを削除",
    "ru": "Удалить последний блок"
  },
  "마지막 갱신": {
    "en": "Last Updated",
    "vi": "Cập nhật lần cuối",
    "zh": "最后更新",
    "ja": "最終更新",
    "ru": "Последнее обновление"
  },
  "마지막 인버터 삭제": {
    "en": "Delete Last Inverter",
    "vi": "Xóa inverter cuối cùng",
    "zh": "删除最后一个逆变器",
    "ja": "最後のインバーターを削除",
    "ru": "Удалить последний инвертор"
  },
  "마지막 컨테이너 삭제": {
    "en": "Delete Last Container",
    "vi": "Xóa container cuối cùng",
    "zh": "删除最后一个集装箱",
    "ja": "最後のコンテナを削除",
    "ru": "Удалить последний контейнер"
  },
  "메뉴": {
    "en": "Menu",
    "vi": "Menu",
    "zh": "菜单",
    "ja": "メニュー",
    "ru": "Меню"
  },
  "메인 화면으로 이동": {
    "en": "Go to Home",
    "vi": "Về màn hình chính",
    "zh": "返回主页",
    "ja": "メイン画面へ移動",
    "ru": "Перейти на главный экран"
  },
  "메인화면": {
    "en": "Home",
    "vi": "Màn hình chính",
    "zh": "主页",
    "ja": "メイン画面",
    "ru": "Главный экран"
  },
  "모듈 전류": {
    "en": "Module Current",
    "vi": "Dòng điện module",
    "zh": "组件电流",
    "ja": "モジュール電流",
    "ru": "Ток модуля"
  },
  "발전 출력": {
    "en": "Generation Output",
    "vi": "Công suất phát điện",
    "zh": "发电输出",
    "ja": "発電出力",
    "ru": "Выработка энергии"
  },
  "발전량 · 시장거래 중심": {
    "en": "Generation · Market Trading Focus",
    "vi": "Trọng tâm sản lượng · giao dịch thị trường",
    "zh": "以发电量·市场交易为中心",
    "ja": "発電量・市場取引中心",
    "ru": "Фокус на выработке · рыночной торговле"
  },
  "발전량 손실률 계산 (지형·이격거리·기상 종합)": {
    "en": "Generation Loss Rate Calculation (Terrain, Spacing, Weather Combined)",
    "vi": "Tính tỷ lệ tổn thất sản lượng (địa hình, khoảng cách, thời tiết)",
    "zh": "发电量损失率计算（地形·间距·气象综合）",
    "ja": "発電量損失率計算（地形・離隔距離・気象総合）",
    "ru": "Расчёт потерь выработки (рельеф · расстояние · погода)"
  },
  "발전소 원격 제어": {
    "en": "Plant Remote Control",
    "vi": "Điều khiển từ xa nhà máy",
    "zh": "电站远程控制",
    "ja": "発電所遠隔制御",
    "ru": "Дистанционное управление станцией"
  },
  "발전소 제어": {
    "en": "Plant Control",
    "vi": "Điều khiển nhà máy",
    "zh": "电站控制",
    "ja": "発電所制御",
    "ru": "Управление станцией"
  },
  "발전용": {
    "en": "Generation-Only",
    "vi": "Chỉ phát điện",
    "zh": "仅限发电",
    "ja": "発電用",
    "ru": "Только генерация"
  },
  "방문 없이 데이터로 현장 상태 판단 -- 2초마다 갱신": {
    "en": "Assess site status from data without a visit -- refreshes every 2 seconds",
    "vi": "Đánh giá tình trạng hiện trường qua dữ liệu mà không cần đến tận nơi -- cập nhật mỗi 2 giây",
    "zh": "无需到场，通过数据判断现场状态——每2秒刷新一次",
    "ja": "現地訪問なしでデータから現場状態を判断 -- 2秒ごとに更新",
    "ru": "Оценка состояния объекта по данным без посещения — обновление каждые 2 сек"
  },
  "방전측 상태": {
    "en": "Discharge-Side Status",
    "vi": "Trạng thái phía xả",
    "zh": "放电侧状态",
    "ja": "放電側状態",
    "ru": "Статус стороны разряда"
  },
  "배전반 상태": {
    "en": "Switchgear Status",
    "vi": "Trạng thái tủ điện",
    "zh": "配电盘状态",
    "ja": "配電盤状態",
    "ru": "Статус распределительного щита"
  },
  "보호협조 연동": {
    "en": "Protection Coordination Linkage",
    "vi": "Liên kết phối hợp bảo vệ",
    "zh": "保护协调联动",
    "ja": "保護協調連携",
    "ru": "Связь координации защиты"
  },
  "보호협조 정정값 (현장 조정 가능)": {
    "en": "Protection Coordination Setpoints (Field-Adjustable)",
    "vi": "Giá trị cài đặt phối hợp bảo vệ (có thể điều chỉnh tại hiện trường)",
    "zh": "保护协调整定值（现场可调）",
    "ja": "保護協調整定値（現場調整可能）",
    "ru": "Уставки координации защиты (настраиваются на объекте)"
  },
  "부지 공간 정보 설정": {
    "en": "Site Geospatial Settings",
    "vi": "Cài đặt thông tin không gian mặt bằng",
    "zh": "场地空间信息设置",
    "ja": "敷地空間情報設定",
    "ru": "Настройка геоданных объекта"
  },
  "삭제": {
    "en": "Delete",
    "vi": "Xóa",
    "zh": "删除",
    "ja": "削除",
    "ru": "Удалить"
  },
  "상계용": {
    "en": "Net-Metering-Use",
    "vi": "Dùng cho Net Metering",
    "zh": "净计量用",
    "ja": "相殺用",
    "ru": "Для нетто-учёта"
  },
  "상계용 설비 유형 선택": {
    "en": "Select Net-Metering Equipment Type",
    "vi": "Chọn loại thiết bị dùng cho Net Metering",
    "zh": "选择净计量设备类型",
    "ja": "相殺用設備種類の選択",
    "ru": "Выбор типа оборудования для нетто-учёта"
  },
  "선로 상태": {
    "en": "Line Status",
    "vi": "Trạng thái đường dây",
    "zh": "线路状态",
    "ja": "線路状態",
    "ru": "Состояние линии"
  },
  "세트포인트 조작 이력 (최근 200건 보관) · 아래 [내보내기]로 로컬 data 폴더에 JSON으로 저장할 수 있습니다": {
    "en": "Setpoint operation log (last 200 records kept) · Use [Export] below to save as JSON to your local data folder",
    "vi": "Lịch sử thao tác setpoint (lưu 200 bản ghi gần nhất) · Dùng [Xuất] bên dưới để lưu dưới dạng JSON vào thư mục data cục bộ",
    "zh": "设定值操作记录（保留最近200条）·可通过下方【导出】以JSON格式保存到本地data文件夹",
    "ja": "セットポイント操作履歴（直近200件保管）・下部の［エクスポート］でローカルdataフォルダにJSONで保存できます",
    "ru": "Журнал операций с уставками (хранится последние 200 записей) · Кнопкой [Экспорт] ниже можно сохранить в формате JSON в локальную папку data"
  },
  "셀 상세": {
    "en": "Cell Detail",
    "vi": "Chi tiết Cell",
    "zh": "电芯详情",
    "ja": "セル詳細",
    "ru": "Детали ячейки"
  },
  "시스템 통신 상태": {
    "en": "System Communication Status",
    "vi": "Trạng thái truyền thông hệ thống",
    "zh": "系统通信状态",
    "ja": "システム通信状態",
    "ru": "Статус связи системы"
  },
  "시장 연동형 최적화": {
    "en": "Market-Linked Optimization",
    "vi": "Tối ưu hóa liên kết thị trường",
    "zh": "市场联动型优化",
    "ja": "市場連動型最適化",
    "ru": "Оптимизация с привязкой к рынку"
  },
  "실시간 예측 보정 엔진": {
    "en": "Real-Time Forecast Correction Engine",
    "vi": "Bộ máy hiệu chỉnh dự báo thời gian thực",
    "zh": "实时预测校正引擎",
    "ja": "リアルタイム予測補正エンジン",
    "ru": "Движок коррекции прогноза в реальном времени"
  },
  "실시간 판정 · 정정값은 하드웨어 추상화 설정에서 조정": {
    "en": "Real-time evaluation · Setpoints adjustable in Hardware Abstraction Settings",
    "vi": "Đánh giá thời gian thực · Giá trị cài đặt điều chỉnh tại Cài đặt trừu tượng phần cứng",
    "zh": "实时判定·整定值可在硬件抽象设置中调整",
    "ja": "リアルタイム判定・整定値はハードウェア抽象化設定で調整",
    "ru": "Оценка в реальном времени · Уставки настраиваются в разделе абстрагирования оборудования"
  },
  "실시간 현장 상황판": {
    "en": "Real-Time Site Status Board",
    "vi": "Bảng trạng thái hiện trường thời gian thực",
    "zh": "实时现场状况板",
    "ja": "リアルタイム現場状況板",
    "ru": "Панель состояния объекта в реальном времени"
  },
  "실제 건물 높이 + 지형 고도(DEM)가 함께 반영된 3D 뷰 (드래그로 회전/기울기 조정)": {
    "en": "3D view reflecting actual building height + terrain elevation (DEM) together (drag to rotate/tilt)",
    "vi": "Chế độ xem 3D phản ánh chiều cao tòa nhà thực tế + độ cao địa hình (DEM) (kéo để xoay/nghiêng)",
    "zh": "同时反映实际建筑高度+地形高程(DEM)的3D视图（拖动可旋转/倾斜）",
    "ja": "実際の建物の高さ＋地形標高(DEM)を反映した3Dビュー（ドラッグで回転・傾斜調整）",
    "ru": "3D вид с учётом реальной высоты зданий и рельефа (DEM) (перетаскивание для поворота/наклона)"
  },
  "아래 값을 바꾸면 상황판/모니터링 화면의 정상·이상 판정 기준이 즉시 바뀝니다": {
    "en": "Changing the values below immediately updates the normal/abnormal criteria used on the status board and monitoring screens",
    "vi": "Thay đổi giá trị bên dưới sẽ ngay lập tức cập nhật tiêu chí bình thường/bất thường trên bảng trạng thái và màn hình giám sát",
    "zh": "更改以下数值将立即改变状况板/监控画面的正常·异常判定标准",
    "ja": "以下の値を変更すると状況板・監視画面の正常・異常判定基準が即座に変わります",
    "ru": "Изменение значений ниже сразу меняет критерии нормы/аномалии на панели состояния и мониторинге"
  },
  "알람 / 에러 로그": {
    "en": "Alarm / Error Log",
    "vi": "Nhật ký cảnh báo / lỗi",
    "zh": "报警/错误日志",
    "ja": "アラーム・エラーログ",
    "ru": "Журнал тревог / ошибок"
  },
  "양방향계량기/배전반": {
    "en": "Bidirectional Meter / Switchgear",
    "vi": "Đồng hồ đo hai chiều / Tủ điện",
    "zh": "双向电表/配电盘",
    "ja": "双方向計器/配電盤",
    "ru": "Двунаправленный счётчик / распределительный щит"
  },
  "엔진 상태": {
    "en": "Engine Status",
    "vi": "Trạng thái bộ máy",
    "zh": "引擎状态",
    "ja": "エンジン状態",
    "ru": "Состояние движка"
  },
  "영업비밀 · CONFIDENTIAL": {
    "en": "Trade Secret · CONFIDENTIAL",
    "vi": "Bí mật kinh doanh · BẢO MẬT",
    "zh": "商业秘密·机密",
    "ja": "営業秘密・機密",
    "ru": "Коммерческая тайна · КОНФИДЕНЦИАЛЬНО"
  },
  "영업비밀 · CONFIDENTIAL — AI 학습 기반 모델": {
    "en": "Trade Secret · CONFIDENTIAL — AI Learning-Based Model",
    "vi": "Bí mật kinh doanh · BẢO MẬT — Mô hình dựa trên học máy AI",
    "zh": "商业秘密·机密 — 基于AI学习的模型",
    "ja": "営業秘密・機密 — AI学習ベースモデル",
    "ru": "Коммерческая тайна · КОНФИДЕНЦИАЛЬНО — модель на основе ИИ"
  },
  "오늘 기준 · 실제 위도/경도로 계산한 태양 고도": {
    "en": "Based on today · Solar altitude calculated from actual latitude/longitude",
    "vi": "Theo hôm nay · Độ cao mặt trời tính theo vĩ độ/kinh độ thực tế",
    "zh": "以今日为准·根据实际经纬度计算的太阳高度角",
    "ja": "本日基準・実際の緯度/経度で計算した太陽高度",
    "ru": "На основе сегодняшнего дня · высота солнца по реальным широте/долготе"
  },
  "온도 범례": {
    "en": "Temperature Legend",
    "vi": "Chú giải nhiệt độ",
    "zh": "温度图例",
    "ja": "温度凡例",
    "ru": "Легенда температуры"
  },
  "운영 모드 제어": {
    "en": "Operation Mode Control",
    "vi": "Điều khiển chế độ vận hành",
    "zh": "运行模式控制",
    "ja": "運転モード制御",
    "ru": "Управление режимом работы"
  },
  "운영 모드 제어 (GFL⇄GFM)": {
    "en": "Operation Mode Control (GFL⇄GFM)",
    "vi": "Điều khiển chế độ vận hành (GFL⇄GFM)",
    "zh": "运行模式控制（GFL⇄GFM）",
    "ja": "運転モード制御（GFL⇄GFM）",
    "ru": "Управление режимом работы (GFL⇄GFM)"
  },
  "위도": {
    "en": "Latitude",
    "vi": "Vĩ độ",
    "zh": "纬度",
    "ja": "緯度",
    "ru": "Широта"
  },
  "위험 — 열폭주 가능성": {
    "en": "Danger — Possible Thermal Runaway",
    "vi": "Nguy hiểm — Có thể xảy ra thoát nhiệt",
    "zh": "危险 — 可能发生热失控",
    "ja": "危険 — 熱暴走の可能性",
    "ru": "Опасность — возможен тепловой разгон"
  },
  "인버터": {
    "en": "Inverter",
    "vi": "Inverter",
    "zh": "逆变器",
    "ja": "インバーター",
    "ru": "Инвертор"
  },
  "인버터 개별 제어": {
    "en": "Individual Inverter Control",
    "vi": "Điều khiển từng inverter",
    "zh": "逆变器单独控制",
    "ja": "インバーター個別制御",
    "ru": "Индивидуальное управление инвертором"
  },
  "인버터 고장(FAULT) 이벤트": {
    "en": "Inverter Fault Events",
    "vi": "Sự kiện lỗi (FAULT) inverter",
    "zh": "逆变器故障（FAULT）事件",
    "ja": "インバーター故障（FAULT）イベント",
    "ru": "События неисправности (FAULT) инвертора"
  },
  "인버터 추가": {
    "en": "Add Inverter",
    "vi": "Thêm inverter",
    "zh": "添加逆变器",
    "ja": "インバーター追加",
    "ru": "Добавить инвертор"
  },
  "일사량": {
    "en": "Solar Irradiance",
    "vi": "Bức xạ mặt trời",
    "zh": "辐照度",
    "ja": "日射量",
    "ru": "Солнечная радиация"
  },
  "일조 시간 및 음영 영향 분석": {
    "en": "Sunlight Hours & Shading Impact Analysis",
    "vi": "Phân tích giờ nắng & ảnh hưởng bóng che",
    "zh": "日照时长与阴影影响分析",
    "ja": "日照時間・陰影影響分析",
    "ru": "Анализ часов солнечного света и влияния затенения"
  },
  "저하": {
    "en": "Degraded",
    "vi": "Suy giảm",
    "zh": "下降",
    "ja": "低下",
    "ru": "Снижение"
  },
  "전류(Ia)": {
    "en": "Current (Ia)",
    "vi": "Dòng điện (Ia)",
    "zh": "电流(Ia)",
    "ja": "電流(Ia)",
    "ru": "Ток (Ia)"
  },
  "전압(Va)": {
    "en": "Voltage (Va)",
    "vi": "Điện áp (Va)",
    "zh": "电压(Va)",
    "ja": "電圧(Va)",
    "ru": "Напряжение (Va)"
  },
  "정상": {
    "en": "Normal",
    "vi": "Bình thường",
    "zh": "正常",
    "ja": "正常",
    "ru": "Норма"
  },
  "정상 범위": {
    "en": "Normal Range",
    "vi": "Phạm vi bình thường",
    "zh": "正常范围",
    "ja": "正常範囲",
    "ru": "Нормальный диапазон"
  },
  "제로 트러스트 보안 관리": {
    "en": "Zero-Trust Security Management",
    "vi": "Quản lý bảo mật Zero Trust",
    "zh": "零信任安全管理",
    "ja": "ゼロトラストセキュリティ管理",
    "ru": "Управление безопасностью Zero Trust"
  },
  "제어 기록": {
    "en": "Control Log",
    "vi": "Nhật ký điều khiển",
    "zh": "控制记录",
    "ja": "制御記録",
    "ru": "Журнал управления"
  },
  "제조사 / 모델 → 프로토콜 매핑": {
    "en": "Manufacturer / Model → Protocol Mapping",
    "vi": "Nhà sản xuất / Model → Ánh xạ giao thức",
    "zh": "制造商/型号 → 协议映射",
    "ja": "メーカー/モデル → プロトコルマッピング",
    "ru": "Сопоставление производитель / модель → протокол"
  },
  "종단/횡단 자기 그림자 + 지형 경사 + 구름(6시간 단위) + 영농형 구성을 종합한 추정 프레임워크": {
    "en": "An estimation framework combining longitudinal/transverse self-shading, terrain slope, clouds (6-hour intervals), and agrivoltaic configuration",
    "vi": "Khung ước tính kết hợp tự che bóng dọc/ngang, độ dốc địa hình, mây (theo 6 giờ) và cấu hình nông điện",
    "zh": "综合纵向/横向自遮阴、地形坡度、云量（6小时单位）及农光互补构成的估算框架",
    "ja": "縦断・横断方向の自己影＋地形勾配＋雲（6時間単位）＋営農型構成を総合した推定フレームワーク",
    "ru": "Framework оценки, объединяющий продольную/поперечную самотень, уклон рельефа, облачность (интервал 6ч) и агровольтаическую конфигурацию"
  },
  "주의": {
    "en": "Caution",
    "vi": "Chú ý",
    "zh": "注意",
    "ja": "注意",
    "ru": "Внимание"
  },
  "최대 셀 온도": {
    "en": "Max Cell Temperature",
    "vi": "Nhiệt độ cell tối đa",
    "zh": "最高电芯温度",
    "ja": "最大セル温度",
    "ru": "Макс. температура ячейки"
  },
  "충전측 상태": {
    "en": "Charge-Side Status",
    "vi": "Trạng thái phía sạc",
    "zh": "充电侧状态",
    "ja": "充電側状態",
    "ru": "Статус стороны заряда"
  },
  "컨테이너 추가": {
    "en": "Add Container",
    "vi": "Thêm container",
    "zh": "添加集装箱",
    "ja": "コンテナ追加",
    "ru": "Добавить контейнер"
  },
  "컨테이너/캐비닛 선택": {
    "en": "Select Container / Cabinet",
    "vi": "Chọn container / tủ",
    "zh": "选择集装箱/机柜",
    "ja": "コンテナ/キャビネット選択",
    "ru": "Выбор контейнера / шкафа"
  },
  "태양광": {
    "en": "Solar",
    "vi": "Điện mặt trời",
    "zh": "光伏",
    "ja": "太陽光",
    "ru": "Солнечная энергия"
  },
  "태양광 시스템": {
    "en": "Solar System",
    "vi": "Hệ thống điện mặt trời",
    "zh": "光伏系统",
    "ja": "太陽光システム",
    "ru": "Солнечная система"
  },
  "태양광 시스템 구성도": {
    "en": "Solar System Configuration Diagram",
    "vi": "Sơ đồ cấu hình hệ thống điện mặt trời",
    "zh": "光伏系统构成图",
    "ja": "太陽光システム構成図",
    "ru": "Схема солнечной системы"
  },
  "태양광 패널": {
    "en": "Solar Panel",
    "vi": "Tấm pin mặt trời",
    "zh": "光伏板",
    "ja": "太陽光パネル",
    "ru": "Солнечная панель"
  },
  "태양광 패널 → PCS(충전) → ESS PACK → PCS(방전) → 계량기/배전반 → D/L": {
    "en": "Solar Panel → PCS (Charge) → ESS PACK → PCS (Discharge) → Meter/Switchgear → D/L",
    "vi": "Tấm pin mặt trời → PCS (sạc) → ESS PACK → PCS (xả) → Đồng hồ đo/Tủ điện → D/L",
    "zh": "光伏板 → PCS（充电）→ ESS电池组 → PCS（放电）→ 电表/配电盘 → D/L",
    "ja": "太陽光パネル → PCS（充電）→ ESSパック → PCS（放電）→ 計器/配電盤 → D/L",
    "ru": "Солнечная панель → PCS (заряд) → блок СНЭ → PCS (разряд) → счётчик/распредщит → D/L"
  },
  "통신 없이 각 인버터가 전압/주파수만 보고 자율 분담 (대규모 사이트)": {
    "en": "Each inverter shares load autonomously based only on voltage/frequency, without communication (large sites)",
    "vi": "Mỗi inverter tự phân chia dựa trên điện áp/tần số mà không cần truyền thông (địa điểm lớn)",
    "zh": "各逆变器无需通信，仅根据电压/频率自主分担（大型场地）",
    "ja": "通信なしで各インバーターが電圧・周波数のみを見て自律分担（大規模サイト）",
    "ru": "Каждый инвертор самостоятельно распределяет нагрузку только по напряжению/частоте, без связи (крупные объекты)"
  },
  "표준 OSM (2D)": {
    "en": "Standard OSM (2D)",
    "vi": "OSM tiêu chuẩn (2D)",
    "zh": "标准OSM（2D）",
    "ja": "標準OSM（2D）",
    "ru": "Стандарт OSM (2D)"
  },
  "표준 프로토콜(js/inverter-fault-protocol.js) 기반 · 고장이 실제로 발생한 인버터만 카드로 표시됩니다": {
    "en": "Based on the standard protocol (js/inverter-fault-protocol.js) · Only inverters with an actual fault are shown as cards",
    "vi": "Dựa trên giao thức tiêu chuẩn (js/inverter-fault-protocol.js) · Chỉ hiển thị dạng thẻ cho inverter thực sự có lỗi",
    "zh": "基于标准协议（js/inverter-fault-protocol.js）·仅显示实际发生故障的逆变器卡片",
    "ja": "標準プロトコル（js/inverter-fault-protocol.js）に基づく・実際に故障が発生したインバーターのみカード表示されます",
    "ru": "На основе стандартного протокола (js/inverter-fault-protocol.js) · Карточками отображаются только инверторы с реальной неисправностью"
  },
  "풍속": {
    "en": "Wind Speed",
    "vi": "Tốc độ gió",
    "zh": "风速",
    "ja": "風速",
    "ru": "Скорость ветра"
  },
  "하드웨어 추상화 설정": {
    "en": "Hardware Abstraction Settings",
    "vi": "Cài đặt trừu tượng phần cứng",
    "zh": "硬件抽象设置",
    "ja": "ハードウェア抽象化設定",
    "ru": "Настройка абстрагирования оборудования"
  },
  "하드웨어 추상화 설정의 실시간 현장 상황판과 정정값을 그대로 공유": {
    "en": "Shares the real-time site status board and setpoints directly with Hardware Abstraction Settings",
    "vi": "Chia sẻ trực tiếp bảng trạng thái hiện trường thời gian thực và giá trị cài đặt với Cài đặt trừu tượng phần cứng",
    "zh": "与硬件抽象设置的实时现场状况板及整定值完全共享",
    "ja": "ハードウェア抽象化設定のリアルタイム現場状況板と整定値をそのまま共有",
    "ru": "Напрямую использует панель состояния объекта в реальном времени и уставки из настройки абстрагирования оборудования"
  },
  "현재 · 1시간 전 비교 -- 원격 제어 실행 전 계통 상태 확인용": {
    "en": "Current vs. 1 hour ago -- for checking grid status before executing remote control",
    "vi": "So sánh hiện tại · 1 giờ trước -- để kiểm tra trạng thái lưới trước khi thực hiện điều khiển từ xa",
    "zh": "当前与1小时前对比——用于远程控制执行前确认系统状态",
    "ja": "現在・1時間前比較 -- 遠隔制御実行前の系統状態確認用",
    "ru": "Сравнение текущего состояния с состоянием час назад — для проверки состояния сети перед дистанционным управлением"
  },
  "화면 우측 상단 크롬 주소창의 번역 아이콘(또는 우클릭 -> 번역)을 누르면 이 화면 전체가 번역됩니다.": {
    "en": "Use the language selector above to translate the entire screen.",
    "vi": "Sử dụng bộ chọn ngôn ngữ phía trên để dịch toàn bộ màn hình.",
    "zh": "使用上方的语言选择器可翻译整个屏幕。",
    "ja": "上部の言語選択メニューで画面全体を翻訳できます。",
    "ru": "Используйте селектор языка выше, чтобы перевести весь экран."
  },
  "사용 모드 선택": {
    "en": "Select Usage Mode",
    "vi": "Chọn chế độ sử dụng",
    "zh": "选择使用模式",
    "ja": "使用モード選択",
    "ru": "Выбор режима использования"
  },
  "아래 슬라이더로 \"주변에 태양을 가리는 것이 얼마나 높이 있는지\"를 설정하면,\n            오늘 하루 중 언제 햇빛을 온전히 받고 언제 가려지는지를 타임라인으로 보여줍니다.": {
    "en": "Use the slider below to set \"how high the obstructions blocking the sun around you are,\" and a timeline will show when today gets full sunlight and when it is shaded.",
    "vi": "Dùng thanh trượt bên dưới để đặt \"vật cản quanh khu vực che nắng cao đến mức nào\", một dòng thời gian sẽ hiển thị khi nào hôm nay nhận đủ nắng và khi nào bị che.",
    "zh": "通过下方滑块设置\"周围遮挡阳光的物体有多高\"，即可以时间线形式显示今天何时能被阳光完全照射、何时被遮挡。",
    "ja": "下のスライダーで「周囲で太陽を遮るものがどれくらいの高さにあるか」を設定すると、本日いつ日光を十分に受け、いつ遮られるかをタイムラインで表示します。",
    "ru": "Ползунком ниже задайте \"насколько высоко расположены объекты, закрывающие солнце вокруг\", и появится временная шкала того, когда сегодня солнце светит полностью, а когда затенено."
  },
  "지평선 장애물뿐 아니라, 어레이 간 이격거리로 인한 자기 그림자(종단/횡단), 부지 경사도,\n            기상자료의 구름량(6시간 단위), 하단부 영농형 구성 여부까지 반영해 손실률을 추정합니다.\n            아래 값을 바꾸면 즉시 다시 계산됩니다.": {
    "en": "In addition to horizon obstructions, this estimates the loss rate by factoring in self-shading between arrays (longitudinal/transverse) from row spacing, site slope, cloud cover from weather data (6-hour intervals), and whether the site is used for agrivoltaics. Changing the values below recalculates instantly.",
    "vi": "Ngoài vật cản đường chân trời, ước tính tỷ lệ tổn thất còn tính đến tự che bóng dọc/ngang giữa các dãy do khoảng cách hàng, độ dốc mặt bằng, lượng mây theo dữ liệu thời tiết (mỗi 6 giờ), và cấu hình nông điện ở phần dưới. Thay đổi giá trị bên dưới sẽ tính lại ngay lập tức.",
    "zh": "除地平线障碍物外，还综合考虑阵列间距造成的纵向/横向自遮阴、场地坡度、气象数据中的云量（6小时单位）以及是否采用农光互补配置来估算损失率。更改下方数值将立即重新计算。",
    "ja": "地平線障害物だけでなく、アレイ間の離隔距離による自己影（縦断・横断）、敷地勾配、気象データの雲量（6時間単位）、下部の営農型構成の有無まで反映して損失率を推定します。以下の値を変更すると即座に再計算されます。",
    "ru": "Помимо препятствий на горизонте, оценка потерь учитывает самотень между рядами (продольную/поперечную) из-за расстояния между рядами, уклон участка, облачность по погодным данным (интервалы 6ч) и наличие агровольтаической конфигурации внизу. Изменение значений ниже приводит к мгновенному пересчёту."
  },
  "발전량 예측·보정에 사용되는 알고리즘, 학습 데이터 구성, 세부 파라미터는\n            회사의 영업비밀에 해당하여 화면에 상세 내용을 노출하지 않습니다.\n            아래는 엔진의 가동 상태만 표시합니다.": {
    "en": "The algorithm, training data composition, and detailed parameters used for generation forecast and correction are company trade secrets and are not shown in detail on screen. Only the engine's operating status is shown below.",
    "vi": "Thuật toán, thành phần dữ liệu huấn luyện và tham số chi tiết dùng để dự báo và hiệu chỉnh sản lượng là bí mật kinh doanh của công ty nên không hiển thị chi tiết trên màn hình. Bên dưới chỉ hiển thị trạng thái hoạt động của bộ máy.",
    "zh": "用于发电量预测·校正的算法、训练数据构成及详细参数属于公司商业秘密，故不在画面上公开详情。以下仅显示引擎的运行状态。",
    "ja": "発電量予測・補正に使用されるアルゴリズム、学習データ構成、詳細パラメーターは会社の営業秘密に該当するため画面に詳細を表示しません。以下はエンジンの稼働状態のみ表示します。",
    "ru": "Алгоритм, состав обучающих данных и детальные параметры, используемые для прогноза и коррекции выработки, являются коммерческой тайной компании и не отображаются на экране подробно. Ниже показан только статус работы движка."
  }
};


// ---- 언어 상태 저장소 (localStorage 사용, 서버/네트워크 불필요) ----
window.I18N_LANG_KEY = "ems_lang_v1";

window.I18N = window.I18N || (function () {
  let listeners = new Set();
  let current = "ko";
  try {
    const saved = localStorage.getItem(window.I18N_LANG_KEY);
    if (saved && window.SUPPORTED_LANGS.some((l) => l.code === saved)) current = saved;
  } catch (e) { /* localStorage 접근 불가 환경(일부 폐쇄망 브라우저) 대비 */ }

  function translate(text, lang) {
    if (typeof text !== "string") return text;
    const targetLang = lang || current;
    if (targetLang === "ko") return text;
    const entry = window.LANG_DICT[text];
    if (!entry) return text; // 사전에 없으면 원문(한국어) 그대로 -- 절대 화면이 비거나 깨지지 않음
    return entry[targetLang] || text;
  }

  function getLang() { return current; }

  function setLang(lang) {
    if (!window.SUPPORTED_LANGS.some((l) => l.code === lang)) return;
    current = lang;
    try { localStorage.setItem(window.I18N_LANG_KEY, lang); } catch (e) {}
    document.documentElement.lang = lang;
    listeners.forEach((fn) => { try { fn(lang); } catch (e) {} });
  }

  function subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }

  return { translate, getLang, setLang, subscribe };
})();

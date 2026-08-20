import type { Achievement } from "@/lib/content/types";

/**
 * 실적 원천 데이터.
 * ⚠️ SAMPLE: 회사 소개서(2026-08-20)에는 실적 목록이 없어, UI 검증용 예시 데이터로 채웠다.
 * 실제 고객사·발주처를 특정하지 않는 일반화된 가상의 프로젝트다.
 * TODO: 실제 실적 자료를 받으면 이 배열을 교체한다 (record 1건 = 프로젝트 1건).
 * 컴포넌트는 이 배열을 직접 import 하지 말고 @/lib/content/achievements accessor 를 경유한다.
 */
export const achievements: Achievement[] = [
  {
    slug: "2024-semiconductor-fa-line",
    title: "반도체 부품 공장 FA 자동화 라인 구축",
    year: 2024,
    date: "2024-11",
    category: "산업 자동화",
    image: "/images/business-industry.jpg",
    client: "○○ 반도체 부품 제조사",
    orderer: "설비기술팀",
    location: "경기 화성",
    period: "2024.05 ~ 2024.11",
    summary:
      "수작업 공정을 로봇·PLC 기반 자동화 라인으로 전환하여 생산성과 품질을 개선한 프로젝트. (SAMPLE)",
    body: "설비 설계부터 제어 소프트웨어, 시운전까지 턴키로 수행한 예시 프로젝트입니다. (SAMPLE)",
  },
  {
    slug: "2024-logistics-conveyor-control",
    title: "물류센터 컨베이어 통합 제어 시스템",
    year: 2024,
    date: "2024-07",
    category: "산업 자동화",
    image: "/images/ach-machine.jpg",
    client: "국내 대형 물류센터",
    orderer: "물류운영본부",
    location: "충북 청주",
    period: "2024.02 ~ 2024.07",
    summary:
      "반입·분류·출고 컨베이어를 SCADA로 통합 감시·제어하여 물류 리드타임을 단축한 프로젝트. (SAMPLE)",
    body: "현장 설비와 상위 시스템을 연동해 데이터 기반 운영 체계를 마련했습니다. (SAMPLE)",
  },
  {
    slug: "2023-datacenter-epms",
    title: "데이터센터 전력설비 감시 EPMS 구축",
    year: 2023,
    date: "2023-09",
    category: "데이터센터",
    image: "/images/business-datacenter.jpg",
    client: "IDC 운영사",
    orderer: "인프라운영팀",
    location: "경기 안양",
    period: "2023.03 ~ 2023.09",
    summary:
      "전력 품질·상면·냉각 설비를 통합 감시하는 EPMS/DCIM을 구축해 무중단 운영을 지원. (SAMPLE)",
    body: "실시간 전력 품질 감시와 예방 정비 체계를 구성한 예시 프로젝트입니다. (SAMPLE)",
  },
  {
    slug: "2023-building-bas-energy",
    title: "업무용 빌딩 BAS·에너지 관리 시스템",
    year: 2023,
    date: "2023-05",
    category: "빌딩 자동화",
    image: "/images/business-building.jpg",
    client: "오피스 빌딩 시설관리사",
    orderer: "시설관리팀",
    location: "서울 강서",
    period: "2023.01 ~ 2023.05",
    summary:
      "설비·조명·전력 자동제어와 에너지 관리(EMS)를 통합해 건물 에너지 비용을 절감. (SAMPLE)",
    body: "설비 자동제어와 에너지 사용량 가시화를 구현한 예시 프로젝트입니다. (SAMPLE)",
  },
  {
    slug: "2023-water-treatment-scada",
    title: "정수처리장 SCADA 원격 감시제어",
    year: 2023,
    date: "2023-03",
    category: "산업 자동화",
    image: "/images/ach-plant.jpg",
    client: "지자체 상수도사업소",
    orderer: "운영관리과",
    location: "강원 원주",
    period: "2022.10 ~ 2023.03",
    summary:
      "용수 처리·공급 공정을 원격 감시제어로 통합해 무인 운영 안정성을 확보. (SAMPLE)",
    body: "펌프·밸브·계측 설비를 SCADA로 통합한 예시 프로젝트입니다. (SAMPLE)",
  },
  {
    slug: "2022-mcc-switchboard-supply",
    title: "제조 공장 스마트 MCC반·분전반 공급",
    year: 2022,
    date: "2022-11",
    category: "산업 자동화",
    image: "/images/ach-electrical.jpg",
    client: "화학 제조사",
    orderer: "생산기술팀",
    location: "울산 남구",
    period: "2022.06 ~ 2022.11",
    summary:
      "스마트 MCC반·분전반을 설계·제작·설치하여 설비 전력 감시 체계를 고도화. (SAMPLE)",
    body: "동력 제어반과 스마트 분전반을 턴키로 공급한 예시 프로젝트입니다. (SAMPLE)",
  },
  {
    slug: "2022-hvac-automation",
    title: "냉동·공조(HVAC) 자동화 시스템",
    year: 2022,
    date: "2022-06",
    category: "빌딩 자동화",
    image: "/images/business-building.jpg",
    client: "식품 물류 냉동창고",
    orderer: "설비팀",
    location: "경기 이천",
    period: "2022.02 ~ 2022.06",
    summary:
      "냉동·공조 설비를 자동제어해 온습도 안정성과 에너지 효율을 동시에 확보. (SAMPLE)",
    body: "HVAC 자동제어 로직과 감시 콘솔을 구성한 예시 프로젝트입니다. (SAMPLE)",
  },
  {
    slug: "2021-smart-factory-mes",
    title: "스마트팩토리 공정 자동화·데이터 수집",
    year: 2021,
    date: "2021-10",
    category: "산업 자동화",
    image: "/images/hero-automation.jpg",
    client: "자동차 부품 제조사",
    orderer: "스마트공장추진팀",
    location: "경남 창원",
    period: "2021.04 ~ 2021.10",
    summary:
      "공정 설비의 실적을 실시간 수집·가시화하고 자동제어를 연동한 스마트팩토리 프로젝트. (SAMPLE)",
    body: "PLC·PAC·RTU 기반 데이터 수집과 공정 자동제어를 구현한 예시 프로젝트입니다. (SAMPLE)",
  },
];

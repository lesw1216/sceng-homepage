import type { TechPhase } from "@/lib/content/types";

/**
 * 보유기술 (출처: 회사 소개서 2026-08-20, "회사 보유기술").
 * 자동화시스템을 분석·설계부터 개발·제작, 설치·시운전까지 종합 제공.
 */
export const techPhases: TechPhase[] = [
  {
    title: "분석 및 설계",
    titleEn: "Analysis & Design",
    accent: "orange",
    groups: [
      {
        label: "전기 설계",
        items: [
          "Smart 분전반·모터제어반",
          "모터제어반(MCC·INVERTER·Softstarter)",
          "데이터센터 인프라 솔루션(EPMS·DCIM)",
        ],
      },
      {
        label: "계장 설계",
        items: [
          "자동제어반(PLC·SERVO)",
          "감시제어/데이터 수집반(PAC·RTU)",
          "공정·물류 자동화 감시제어 시스템 구축",
        ],
      },
      {
        label: "시공 설계",
        items: [
          "Cable·Tray·Conduit·Hookup Design",
          "원격감시제어시스템",
          "데이터센터 인프라 감시제어시스템",
          "공정·물류 자동제어시스템",
        ],
      },
    ],
  },
  {
    title: "개발 및 제작",
    titleEn: "Development & Manufacturing",
    accent: "navy",
    groups: [
      {
        label: "시스템 개발",
        items: [
          "감시제어/데이터 시스템",
          "공정·물류 자동화 제어 시스템",
          "데이터센터 인프라 솔루션",
        ],
      },
      {
        label: "개발툴",
        items: [
          "PLC(Mitsubishi·Schneider·Siemens·LSE)",
          "HMI(Proface·GOT·CIMON)",
          "SCADA(Intouch·CIMON·Wincc·VU:CON)",
          "EPMS/DCIM(Schneider EPO)",
        ],
      },
      {
        label: "제어반 제작",
        items: [
          "모터제어반(MCC·INVERTER·Softstarter)",
          "감시제어/데이터 수집반(PAC·RTU)",
          "공정·물류 자동제어반(PLC·SERVO)",
          "Smart 분전반·모터제어반",
          "시스템 감시·제어 콘솔",
        ],
      },
    ],
  },
  {
    title: "설치 및 시운전",
    titleEn: "Installation & Commissioning",
    accent: "navy-700",
    groups: [
      {
        label: "설치",
        items: [
          "감시제어 Cable·Tray·Conduit·Hookup",
          "데이터센터 Cable·Tray·Conduit·Hookup",
          "공정·물류 Cable·Tray·Conduit·Hookup",
        ],
      },
      {
        label: "시운전",
        items: [
          "Calibration",
          "Cold Test",
          "Hot Test",
          "Integrated Acceptance",
          "Commissioning Test",
        ],
      },
      {
        label: "커미셔닝 단계",
        items: [
          "Level 0 : Planning / Design",
          "Level 1 : Factory Witness Tests (FWT)",
          "Level 2 : Installation & QA/QC inspections",
          "Level 3 : Startup & Site Acceptance Tests (SAT)",
          "Level 4 : Functional Performance Tests (FPT)",
          "Level 5 : Integrated Systems Test (IST)",
          "Level 6 : Turn Over & Operation",
          "Level 7 : Training",
        ],
      },
    ],
  },
];

import type { BusinessArea } from "@/lib/content/types";

/**
 * 사업영역 (출처: .claude/docs/requirements/second-draft/03-business.md).
 */
export const businessAreas: BusinessArea[] = [
  {
    key: "industry-automation",
    title: "산업 자동화",
    titleEn: "Industry Automation",
    accent: "orange",
    businessFields: [
      "공장 자동화시스템(FA)",
      "물류 자동화시스템(LA)",
      "공정 자동화시스템(PA)",
      "유틸리티 자동화시스템(UA)",
      "수직형 스마트팜(VSF)",
      "용수 처리 및 공급 시스템",
    ],
    productItems: [
      "주 제어반(PLC Panel)",
      "동력 제어반(MCC Panel)",
      "조작반(OP Box)",
      "원격 I/O 판넬(Remote I/O Panel)",
      "안전 제어반(Safety PLC Panel)",
      "수처리제어반",
      "원격영상감시제어반",
    ],
    solutions: [
      "자동창고제어시스템(AS/RS Control)",
      "스마트공장 자동화(PLC/SCADA)",
      "수직형 스마트팜(VSFS)",
      "용수 처리 및 공급 시스템",
    ],
  },
  {
    key: "building-automation",
    title: "빌딩 자동화",
    titleEn: "Building Energy & Control System",
    accent: "navy",
    businessFields: [
      "통합시스템(SI)",
      "시설관리 시스템(FMS)",
      "전력자동제어(PMS)",
      "설비자동제어(HVAC)",
      "조명자동제어(LCS)",
      "에너지 관리시스템(EMS)",
    ],
    productItems: [
      "데이터수집처리반(DAS)",
      "감시제어반(DDC)",
      "조명제어반(LCP)",
      "동력제어반",
      "스마트 분전반/동력반",
      "펌프 제어반",
    ],
    solutions: [
      "통합시스템(SI)",
      "시설관리 시스템(FMS)",
      "전력자동제어(PEAS)",
      "설비자동제어(BAS)",
      "조명자동제어(LCS)",
      "에너지 관리시스템(EMS)",
    ],
  },
  {
    key: "datacenter-infra",
    title: "데이터센터 인프라 솔루션",
    titleEn: "EPMS/DCIM",
    accent: "graphite",
    businessFields: ["전력설비감시제어(EPMS)", "IT자산 통합관리(DCIM)"],
    productItems: [
      "DCP(Data Collection & Control PLC)",
      "PDU(Power Distribution Unit)",
      "Plug-in Box",
      "RPP(Remote Power Panel)",
    ],
    solutions: ["전력설비감시제어(EPMS)", "IT자산 통합관리(DCIM)"],
  },
];

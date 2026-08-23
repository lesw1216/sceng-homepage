import {
  ceoMessage,
  ceoSignature,
  companyInfo,
  coreValues,
  productGroups,
} from "@/content/company";
import type { CompanyInfo, CompanyInfoSource, CompanyProfile } from "./types";

/** 원천 레코드 → 화면용 레코드 (headline 파생) */
function toCompanyInfo(source: CompanyInfoSource): CompanyInfo {
  return { ...source, headline: source.headlineLines.join(" ") };
}

/**
 * 회사 정보 접근 계층.
 * 시그니처는 async(API 모양)로 고정 — 향후 백엔드 전환 시 본문만 fetch로 교체.
 */
export async function getCompanyInfo(): Promise<CompanyInfo> {
  return toCompanyInfo(companyInfo);
}

export async function getCompanyProfile(): Promise<CompanyProfile> {
  return {
    info: toCompanyInfo(companyInfo),
    ceoMessage,
    ceoSignature,
    coreValues,
    productGroups,
  };
}

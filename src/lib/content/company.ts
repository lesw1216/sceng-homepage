import {
  ceoMessage,
  companyInfo,
  coreValues,
  productGroups,
} from "@/content/company";
import type { CompanyInfo, CompanyProfile } from "./types";

/**
 * 회사 정보 접근 계층.
 * 시그니처는 async(API 모양)로 고정 — 향후 백엔드 전환 시 본문만 fetch로 교체.
 */
export async function getCompanyInfo(): Promise<CompanyInfo> {
  return companyInfo;
}

export async function getCompanyProfile(): Promise<CompanyProfile> {
  return {
    info: companyInfo,
    ceoMessage,
    coreValues,
    productGroups,
  };
}

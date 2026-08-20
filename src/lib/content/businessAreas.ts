import { businessAreas } from "@/content/businessAreas";
import type { BusinessArea } from "./types";

export async function getBusinessAreas(): Promise<BusinessArea[]> {
  return businessAreas;
}

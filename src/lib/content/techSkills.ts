import { techPhases } from "@/content/techSkills";
import type { TechPhase } from "./types";

export async function getTechPhases(): Promise<TechPhase[]> {
  return techPhases;
}

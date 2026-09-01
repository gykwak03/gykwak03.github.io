import type { ComponentType } from "react";
import type { L } from "@/lib/i18n";
import DeliriumEn from "./mdx/research/delirium-llm.en.mdx";
import DeliriumKo from "./mdx/research/delirium-llm.ko.mdx";

export type ResearchItem = {
  slug: string;
  title: L;
  venue: L;
  status: L;
  period: L;
  role: L;
  collaborators?: L;
  summary: L;
  tags: string[];
  body: { en: ComponentType; ko: ComponentType };
};

export const research: ResearchItem[] = [
  {
    slug: "delirium-llm",
    title: {
      en: "LLM-Based Identification of Critical Features for Delirium Prediction",
      ko: "LLM 기반 섬망 예측 핵심 변수 식별",
    },
    venue: {
      en: "Cardio-Cerebrovascular Center, Severance Hospital",
      ko: "세브란스병원 심뇌혈관센터",
    },
    status: { en: "Manuscript under submission", ko: "논문 투고 중" },
    period: { en: "Jul 2024 – Feb 2025", ko: "2024.07 – 2025.02" },
    role: { en: "First Author & Lead Researcher", ko: "제1저자 · 주도 연구자" },
    collaborators: {
      en: "Rim Yu · Eun-Jung Park (Corresponding Author)",
      ko: "유림(Rim Yu) · 박은정(교신저자)",
    },
    summary: {
      en: "An evaluation of whether LLMs can prioritize clinical variables for incident ICU delirium without access to patient outcomes, tested on 32,574 MIMIC-IV patients.",
      ko: "환자 결과값을 사용하지 않고도 LLM이 중환자실 섬망 예측에 중요한 임상 변수의 우선순위를 제안할 수 있는지, MIMIC-IV 환자 32,574명을 대상으로 평가한 연구입니다.",
    },
    tags: [
      "LLM",
      "Delirium",
      "ICU",
      "MIMIC-IV",
      "Feature Selection",
      "GPT-4.1",
      "Claude Sonnet 4.5",
      "Gemini 2.5 Pro",
      "BigQuery",
      "XGBoost",
      "Python",
    ],
    body: { en: DeliriumEn, ko: DeliriumKo },
  },
];

export function getResearch(slug: string) {
  return research.find((r) => r.slug === slug);
}

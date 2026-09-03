import type { ComponentType } from "react";
import type { DetailMedia } from "@/lib/detail";
import type { L } from "@/lib/i18n";
import SsTiEn from "./mdx/projects/ss-ti.en.mdx";
import SsTiKo from "./mdx/projects/ss-ti.ko.mdx";
import RobotEn from "./mdx/projects/book-delivery-robot.en.mdx";
import RobotKo from "./mdx/projects/book-delivery-robot.ko.mdx";
import FpbEn from "./mdx/projects/food-poisoning-battle.en.mdx";
import FpbKo from "./mdx/projects/food-poisoning-battle.ko.mdx";
import SanggwonEn from "./mdx/projects/sanggwon.en.mdx";
import SanggwonKo from "./mdx/projects/sanggwon.ko.mdx";
import DentiscanEn from "./mdx/projects/dentiscan.en.mdx";
import DentiscanKo from "./mdx/projects/dentiscan.ko.mdx";

export type ProjectLink = { label: string; href: string };

export type Project = {
  slug: string;
  title: L;
  subtitle: L;
  context: L;
  period: L;
  role: L;
  collaborators?: L;
  summary: L;
  badge?: L;
  tags: string[];
  links: ProjectLink[];
  media: DetailMedia[];
  body: { en: ComponentType; ko: ComponentType };
};

export const projects: Project[] = [
  {
    slug: "sanggwon",
    title: { en: "Seoul Foodservice Site Intelligence", ko: "상권을 부탁해" },
    subtitle: {
      en: "Three-year survival scoring for prospective food-service business locations",
      ko: "서울 요식업 창업 입지 생존율 예측 AI",
    },
    context: {
      en: "2026 Seoul Metropolitan Government Big Data Competition · Startup Division, Product & Service Development · Grand Prize",
      ko: "2026 서울시 빅데이터 활용 경진대회 · 창업부문 제품·서비스 개발 분야 대상",
    },
    period: { en: "2026", ko: "2026" },
    role: { en: "Data & ML Lead", ko: "데이터·ML 개발 총괄" },
    collaborators: {
      en: "Minseo Ryu · Theo Kim · Jiho Park · Seonghwan Jang",
      ko: "류민서 · 김태오 · 박지호 · 장성환",
    },
    badge: { en: "Grand Prize · Mayor of Seoul Award", ko: "대상 · 서울특별시장상" },
    summary: {
      en: "A decision-support service that estimates the three-year survival likelihood of prospective food-service business locations in Seoul. It received the Mayor of Seoul Award after winning the Grand Prize in the competition’s Startup Division. The data and ML pipeline combines 16 public datasets, 139 candidate features, leakage-aware temporal validation (AUROC 0.71), probability calibration, and SHAP explanations.",
      ko: "서울의 요식업 창업 후보지별 3년 생존 가능성을 예측하는 서비스로, 2026 서울시 빅데이터 활용 경진대회 창업부문 제품·서비스 개발 분야에서 대상을 수상해 서울특별시장상을 받았습니다. 데이터·ML 파이프라인은 공공데이터 16종, 후보 변수 139개, 데이터 누수를 차단한 시점 분할 검증(AUROC 0.71), 확률 보정, SHAP 해석으로 구성됩니다.",
    },
    tags: [
      "Product & Service Development",
      "XGBoost",
      "Python",
      "Feature Engineering",
      "Geospatial",
      "SHAP",
      "TargetEncoder",
      "BallTree",
      "scikit-learn",
    ],
    links: [
      { label: "Live Demo", href: "https://showmethesanggwon.com" },
    ],
    media: [
      {
        src: "/images/show-me-the-sanggwon-overview.png",
        width: 2160,
        height: 1215,
        alt: {
          en: "Seoul Foodservice Site Intelligence service overview and interface",
          ko: "상권을 부탁해 서비스 개요와 화면",
        },
        caption: {
          en: "Service overview — site search, three-year survival score, and location report.",
          ko: "서비스 개요 — 공실 탐색, 3년 생존 점수, 입지 분석 리포트.",
        },
      },
      {
        src: "/images/show-me-the-sanggwon-demo.png",
        width: 2160,
        height: 1215,
        alt: {
          en: "Four-step demonstration of the Seoul Foodservice Site Intelligence service",
          ko: "상권을 부탁해 4단계 서비스 시연 화면",
        },
        caption: {
          en: "End-to-end demonstration from entering a site to reviewing the AI report.",
          ko: "입지 입력부터 AI 분석 리포트 확인까지의 전체 사용 흐름.",
        },
      },
    ],
    body: { en: SanggwonEn, ko: SanggwonKo },
  },
  {
    slug: "dentiscan",
    title: { en: "DentiScan", ko: "DentiScan" },
    subtitle: {
      en: "Two-stage deep learning for dental lesion screening",
      ko: "구강 이미지 병변 스크리닝 2단계 딥러닝",
    },
    context: {
      en: "Data Analysis Capstone Design",
      ko: "데이터분석 캡스톤디자인",
    },
    period: { en: "2026", ko: "2026" },
    role: {
      en: "Model Development, Backend & Deployment",
      ko: "모델 개발·백엔드·배포",
    },
    collaborators: {
      en: "Soyoung Choi · Jaewon Yoo · Seoyeon Kwon",
      ko: "최소영 · 유재원 · 권서연",
    },
    summary: {
      en: "A two-stage dental screening prototype in which RF-DETR locates suspected caries and tooth wear and a Swin Transformer verifies each crop. Copy-Paste augmentation increased caries recall from 0.32 to 0.54, and the final pipeline was deployed on AWS EC2.",
      ko: "RF-DETR로 충치와 치아 마모 의심 부위를 찾고 Swin Transformer로 각 영역을 검증하는 2단계 치과 스크리닝 프로토타입입니다. Copy-Paste 증강으로 충치 재현율을 0.32에서 0.54로 높였으며, 최종 파이프라인을 AWS EC2에 배포했습니다.",
    },
    tags: [
      "PyTorch",
      "Deep Learning",
      "Computer Vision",
      "RF-DETR",
      "Swin Transformer",
      "Streamlit",
      "AWS EC2",
      "Python",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/DataAnalysisCapstoneDesign-2026/code",
      },
    ],
    media: [
      {
        src: "/images/dentiscan-demo.png",
        width: 2118,
        height: 1381,
        alt: {
          en: "DentiScan screening result with detected dental lesions",
          ko: "치아 병변 탐지 결과를 표시한 DentiScan 화면",
        },
        caption: {
          en: "Prototype output showing candidate regions, confidence scores, and lesion counts.",
          ko: "후보 병변 영역, 신뢰도, 병변 수를 함께 보여주는 시연 결과.",
        },
        trimTop: 2,
      },
    ],
    body: { en: DentiscanEn, ko: DentiscanKo },
  },
  {
    slug: "ss-ti",
    title: { en: "SS-TI", ko: "SS-TI" },
    subtitle: {
      en: "Sweet & Salty Taste Identifier",
      ko: "단맛·짠맛 취향 분석기",
    },
    context: {
      en: "Food & Nutrition Capstone Design",
      ko: "식품영양학과 캡스톤디자인",
    },
    period: { en: "Mar – Jul 2024", ko: "2024.03 – 2024.07" },
    role: { en: "Sole Developer", ko: "단독 개발" },
    summary: {
      en: "A browser-based assessment built from 40 literature-derived items on sugar and sodium intake and eating behavior. KMO and Cronbach’s α were used to evaluate the questionnaire before classifying taste-preference patterns and returning a personalized eating guide.",
      ko: "당류·나트륨 섭취 빈도와 식행동을 측정하는 선행 연구 기반 40문항으로 만든 웹 설문입니다. KMO와 Cronbach’s α로 설문을 점검한 뒤 단맛·짠맛 선호 유형을 분류하고 개인별 식생활 가이드를 제공합니다.",
    },
    tags: ["JavaScript", "Statistics", "KMO", "Cronbach’s α", "Nutrition", "Python", "HTML/CSS"],
    links: [
      { label: "GitHub", href: "https://github.com/gykwak03/SS-BTI" },
      { label: "Blog", href: "https://ganuyaa.tistory.com/91" },
    ],
    media: [],
    body: { en: SsTiEn, ko: SsTiKo },
  },
  {
    slug: "food-poisoning-battle",
    title: { en: "Food Poisoning Battle", ko: "식중독을 부탁해" },
    subtitle: {
      en: "An educational strategy game about foodborne pathogens",
      ko: "식중독균 생육 조건을 활용한 교육형 전략 게임",
    },
    context: {
      en: "2023 Kyung Hee University Hackathon (KHUthon)",
      ko: "2023 경희대학교 해커톤 KHUthon",
    },
    period: { en: "Sep – Oct 2023", ko: "2023.09 – 2023.10" },
    role: { en: "Product Planning & UI Design", ko: "기획·UI 디자인" },
    collaborators: { en: "Hongsong Choi", ko: "최홍송" },
    summary: {
      en: "A Unity strategy game that turns the growth conditions of four foodborne pathogens into resource and environment mechanics. Different environments change which pathogen units can grow and compete effectively.",
      ko: "네 종류 식중독균의 생육 조건을 자원과 환경 조절 규칙으로 구현한 Unity 전략 게임입니다. 환경에 따라 효과적으로 증식하고 경쟁할 수 있는 식중독균이 달라집니다.",
    },
    tags: ["Food Poisoning", "Unity", "Game Design", "UI Design", "Planning", "Food Safety"],
    links: [{ label: "Blog", href: "https://ganuyaa.tistory.com/54" }],
    media: [
      {
        src: "/images/food-poisoning-start-screen.png",
        width: 1280,
        height: 720,
        alt: { en: "Food Poisoning Battle title screen", ko: "식중독을 부탁해 시작 화면" },
        caption: { en: "Title screen of the KHUthon prototype.", ko: "KHUthon에서 제작한 프로토타입의 시작 화면." },
      },
      {
        src: "/images/food-poisoning-gameplay-vibrio.png",
        width: 1280,
        height: 720,
        alt: { en: "Food Poisoning Battle gameplay interface", ko: "식중독을 부탁해 게임 플레이 화면" },
        caption: { en: "Pathogen units, colonies, resources, and environmental controls.", ko: "식중독균 유닛, 콜로니, 자원, 환경변수 조절 UI." },
      },
      {
        src: "/images/food-poisoning-gameplay-staphylococcus.png",
        width: 1280,
        height: 720,
        alt: { en: "Food Poisoning Battle combat scene", ko: "식중독을 부탁해 전투 화면" },
        caption: { en: "A match in progress after adjusting growth conditions.", ko: "생육 조건을 조절하며 진행하는 전투 장면." },
      },
    ],
    body: { en: FpbEn, ko: FpbKo },
  },
  {
    slug: "book-delivery-robot",
    title: {
      en: "Book-Delivery Robot Hubs",
      ko: "도서배달로봇 거점·경로 설계",
    },
    subtitle: {
      en: "Hub & route optimization for public libraries",
      ko: "공공도서관 접근성 개선 데이터 분석",
    },
    context: {
      en: "Seoul Gwanak District Youth Data Science Program",
      ko: "서울 관악구 청년 Data Science 과정",
    },
    period: { en: "Jul – Aug 2023", ko: "2023.07 – 2023.08" },
    role: { en: "Data Preprocessing & Model Development", ko: "데이터 전처리·모델 개발" },
    collaborators: {
      en: "Youngeun Ko · Jiwon Shin · Yeeun Kwon",
      ko: "고영은 · 신지원 · 권예은",
    },
    summary: {
      en: "A public-data study that combined nine datasets and OLS regression to identify practical stops and routes for book-delivery robots in Gwanak District, Seoul.",
      ko: "공공데이터 9종과 OLS 회귀분석을 활용해 서울 관악구 도서 배달 로봇의 우선 거점과 운행 경로를 제안한 프로젝트입니다.",
    },
    tags: ["Python", "pandas", "statsmodels", "OLS", "geopy", "folium"],
    links: [{ label: "Blog", href: "https://ganuyaa.tistory.com/34" }],
    media: [
      {
        src: "/images/book-delivery-robot-regression.png",
        width: 960,
        height: 540,
        alt: { en: "OLS model used to weight book-delivery hub criteria", ko: "도서배달 거점 지표의 가중치를 산출한 OLS 모델" },
        caption: { en: "OLS regression used to derive weights for the hub-scoring model.", ko: "거점 평가 모델의 지표별 가중치를 산출한 OLS 회귀분석." },
      },
      {
        src: "/images/book-delivery-robot-clustering.png",
        width: 960,
        height: 540,
        alt: { en: "Map of candidate clusters for the book-delivery robot", ko: "도서배달로봇 후보 권역 군집 지도" },
        caption: { en: "Candidate clusters and the selected service area based on accessibility.", ko: "접근성을 기준으로 비교한 후보 군집과 최종 서비스 권역." },
      },
    ],
    body: { en: RobotEn, ko: RobotKo },
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

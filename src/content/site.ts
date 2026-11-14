import type { L, LList } from "@/lib/i18n";

export const contact = {
  email: "gykwak03@khu.ac.kr",
  github: "https://github.com/gykwak03",
  githubHandle: "gykwak03",
  linkedin: "https://www.linkedin.com/in/gayoungkwak",
  linkedinHandle: "in/gayoungkwak",
  blog: "https://ganuyaa.tistory.com",
  blogHandle: "ganuyaa.tistory.com",
  cvEn: "/resume-gayoung-kwak-en.pdf",
  cvKo: "/resume-gayoung-kwak-ko.pdf",
} as const;

export type EducationItem = {
  degree: L;
  school: L;
  period: L;
  note?: L;
};

export const education: EducationItem[] = [
  {
    degree: { en: "B.S. in Food Science & Nutrition", ko: "식품영양학 학사" },
    school: { en: "Kyung Hee University, Seoul Campus", ko: "경희대학교 서울캠퍼스" },
    period: { en: "2022 – Present", ko: "2022 – 현재" },
  },
  {
    degree: { en: "B.S. in Software Convergence (Data Science Track)", ko: "소프트웨어융합학 학사 (데이터사이언스 트랙)" },
    school: { en: "Kyung Hee University, Global Campus", ko: "경희대학교 국제캠퍼스" },
    period: { en: "2024 – Present", ko: "2024 – 현재" },
  },
  {
    degree: {
      en: "Exchange Student — Data Science & Engineering",
      ko: "교환학생 — Data Science & Engineering 과정",
    },
    school: { en: "Instituto Superior Técnico, University of Lisbon", ko: "리스본대학교 Instituto Superior Técnico (IST)" },
    period: { en: "Sep 2025 – Jan 2026", ko: "2025.09 – 2026.01" },
    note: {
      en: "Coursework: Parallel & Heterogeneous Computing Systems · Natural Language · Deep Learning · Information Systems and Databases",
      ko: "수강: Parallel & Heterogeneous Computing Systems · Natural Language · Deep Learning · Information Systems and Databases",
    },
  },
];

export type ExperienceItem = {
  role: L;
  org: L;
  period: L;
  location: L;
  bullets: LList;
};

export const experience: ExperienceItem[] = [
  {
    role: { en: "Research Intern", ko: "연구인턴" },
    org: {
      en: "Integrative Research Center for Cerebrovascular and Cardiovascular Diseases, Yonsei University College of Medicine",
      ko: "연세대학교 의과대학 뇌심혈관질환연구센터",
    },
    period: { en: "Jul 2024 – Jul 2025", ko: "2024.07 – 2025.07" },
    location: { en: "Seoul", ko: "서울" },
    bullets: {
      en: [
        "Led “LLM-Based Identification of Critical Features for Delirium Prediction” (manuscript under submission), evaluating whether LLMs can prioritize clinical variables without access to patient outcomes.",
        "Consolidated 107 clinical features from 11 delirium-prediction studies and operationalized them as 151 analysis columns in MIMIC-IV.",
        "Compared four feature-selection procedures: Scoring, Ranking, Sequencing, and log-prior across GPT-4.1, Claude Sonnet 4.5, and Gemini 2.5 Pro, with five independent runs per setting.",
        "Analyzed 32,574 first ICU stays and quantified stability with Kendall’s τ-b, top-k overlap, and downstream predictive performance.",
        "Showed that 30 selected features recovered 93.0% of the full-pool XGBoost AUROC.",
      ],
      ko: [
        "「LLM-Based Identification of Critical Features for Delirium Prediction」(투고 중) 연구를 주도하며, 환자 결과값 없이도 LLM이 중요한 임상 변수의 우선순위를 제안할 수 있는지 평가했습니다.",
        "섬망 예측 연구 11편에서 임상 특성 107개를 정리하고, MIMIC-IV에서 분석 가능한 변수 151개로 변환했습니다.",
        "GPT-4.1·Claude Sonnet 4.5·Gemini 2.5 Pro에서 Scoring·Ranking·Sequencing·log-prior의 네 가지 변수 선택 절차를 조건별 5회씩 비교했습니다.",
        "첫 중환자실 입원 환자 32,574명을 분석하고 Kendall’s τ-b, 상위 변수의 일치도, 예측 성능을 기준으로 결과의 안정성을 측정했습니다.",
        "LLM이 고른 변수 30개로 전체 변수 모델 AUROC의 93.0%를 확보했습니다.",
      ],
    },
  },
];

export type SkillGroup = {
  name: L;
  detail: L;
};

export const skills: SkillGroup[] = [
  {
    name: { en: "Python", ko: "Python" },
    detail: {
      en: "Primary language for data processing, model development, and evaluation with NumPy, pandas, Dask, scikit-learn, PyTorch, and TensorFlow. Built large-scale MIMIC-IV and eICU pipelines and LLM feature-selection experiments.",
      ko: "NumPy, pandas, Dask, scikit-learn, PyTorch, TensorFlow를 활용해 데이터를 처리하고 모델을 개발·평가합니다. 대규모 MIMIC-IV·eICU 파이프라인과 LLM 변수 선택 실험을 구현했습니다.",
    },
  },
  {
    name: { en: "SQL", ko: "SQL" },
    detail: {
      en: "Used Google BigQuery to extract, join, and prepare large MIMIC-IV clinical datasets.",
      ko: "Google BigQuery로 대규모 MIMIC-IV 임상 데이터를 추출·결합·정제했습니다.",
    },
  },
  {
    name: { en: "R", ko: "R" },
    detail: {
      en: "Used R and ggplot2 for statistical analysis, regression, exploratory data analysis, and visualization.",
      ko: "R과 ggplot2를 활용해 통계 분석, 회귀분석, 탐색적 데이터 분석, 시각화를 수행했습니다.",
    },
  },
  {
    name: { en: "JavaScript / React", ko: "JavaScript / React" },
    detail: {
      en: "Built browser interfaces and client-side response processing for SS-TI and studied web development through the KHU club LINKHU.",
      ko: "SS-TI의 웹 인터페이스와 클라이언트 응답 처리 기능을 개발했으며, 경희대학교 웹 개발 동아리 LINKHU에서 활동했습니다.",
    },
  },
  {
    name: { en: "C++", ko: "C++" },
    detail: {
      en: "Implemented object-oriented programs using class design, pointers, and data structures including queues and stacks.",
      ko: "클래스 설계, 포인터, 큐·스택 자료구조를 활용한 객체지향 프로그램을 구현했습니다.",
    },
  },
];

export const languages: { name: L; level: L }[] = [
  {
    name: { en: "Korean", ko: "한국어" },
    level: { en: "Native", ko: "원어민" },
  },
  {
    name: { en: "English", ko: "영어" },
    level: {
      en: "IELTS Academic 7.0 (C1) · Oct 31, 2026",
      ko: "IELTS Academic 7.0 (C1) · 2026.10.31",
    },
  },
];

from __future__ import annotations

import shutil
from pathlib import Path
from xml.sax.saxutils import escape

from pypdf import PdfReader
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "output" / "pdf"
PUBLIC_DIR = ROOT / "public"

PAGE_W, PAGE_H = A4
MARGIN = 34
BLUE = colors.HexColor("#1769c2")
NAVY = colors.HexColor("#132c45")
TEXT = colors.HexColor("#253244")
MUTED = colors.HexColor("#66778f")
RULE = colors.HexColor("#cddbeb")


def register_fonts() -> None:
    pdfmetrics.registerFont(TTFont("SegoeUI", r"C:\Windows\Fonts\segoeui.ttf"))
    pdfmetrics.registerFont(TTFont("SegoeUI-Bold", r"C:\Windows\Fonts\segoeuib.ttf"))
    pdfmetrics.registerFont(TTFont("Malgun", r"C:\Windows\Fonts\malgun.ttf"))
    pdfmetrics.registerFont(TTFont("Malgun-Bold", r"C:\Windows\Fonts\malgunbd.ttf"))


def styles_for(lang: str) -> dict[str, ParagraphStyle]:
    regular = "SegoeUI" if lang == "en" else "Malgun"
    bold = "SegoeUI-Bold" if lang == "en" else "Malgun-Bold"
    is_korean = lang == "ko"
    return {
        "body": ParagraphStyle(
            "body",
            fontName=regular,
            fontSize=9.55 if is_korean else 9.2,
            leading=13.4 if is_korean else 12.8,
            textColor=TEXT,
            spaceAfter=0,
        ),
        "small": ParagraphStyle(
            "small",
            fontName=regular,
            fontSize=8.2 if is_korean else 8.0,
            leading=11.2 if is_korean else 10.8,
            textColor=MUTED,
            spaceAfter=0,
        ),
        "entry": ParagraphStyle(
            "entry",
            fontName=regular,
            fontSize=9.55 if is_korean else 9.2,
            leading=13.2 if is_korean else 12.6,
            textColor=TEXT,
            spaceAfter=0,
        ),
        "bullet": ParagraphStyle(
            "bullet",
            fontName=regular,
            fontSize=9.15 if is_korean else 8.8,
            leading=12.8 if is_korean else 12.0,
            leftIndent=8,
            firstLineIndent=-8,
            textColor=TEXT,
            spaceAfter=0,
        ),
        "bold_name": ParagraphStyle(
            "bold_name",
            fontName=bold,
            fontSize=9.6 if is_korean else 9.3,
            leading=13.2 if is_korean else 12.6,
            textColor=TEXT,
            spaceAfter=0,
        ),
    }


def draw_paragraph(
    c: canvas.Canvas,
    html: str,
    x: float,
    y: float,
    width: float,
    style: ParagraphStyle,
    gap: float = 0,
) -> float:
    p = Paragraph(html, style)
    _, height = p.wrap(width, PAGE_H)
    p.drawOn(c, x, y - height)
    return y - height - gap


def draw_section(
    c: canvas.Canvas,
    title: str,
    x: float,
    y: float,
    width: float,
    lang: str,
) -> float:
    font = "SegoeUI-Bold" if lang == "en" else "Malgun-Bold"
    label = title.upper() if lang == "en" else title
    c.setFillColor(BLUE)
    c.setFont(font, 9.2)
    c.drawString(x, y, label)
    label_width = pdfmetrics.stringWidth(label, font, 9.2)
    c.setStrokeColor(RULE)
    c.setLineWidth(0.6)
    c.line(x + label_width + 8, y + 2.5, x + width, y + 2.5)
    return y - 14


def draw_entry(
    c: canvas.Canvas,
    title: str,
    meta: str,
    description: str,
    x: float,
    y: float,
    width: float,
    styles: dict[str, ParagraphStyle],
    gap: float = 7,
) -> float:
    heading = f"<b>{escape(title)}</b>"
    if meta:
        heading += f"<br/><font color='#66778f' size='7.8'>{escape(meta)}</font>"
    y = draw_paragraph(c, heading, x, y, width, styles["entry"], 2)
    if description:
        y = draw_paragraph(c, escape(description), x, y, width, styles["body"], gap)
    return y


def draw_bullet(
    c: canvas.Canvas,
    text: str,
    x: float,
    y: float,
    width: float,
    styles: dict[str, ParagraphStyle],
) -> float:
    return draw_paragraph(
        c,
        f"<font color='#1769c2'>-</font> {escape(text)}",
        x,
        y,
        width,
        styles["bullet"],
        2.8,
    )


EN = {
    "name": "Gayoung Kwak",
    "tagline": "AI & Data Science for Healthcare",
    "contact": "gykwak03@khu.ac.kr  |  github.com/gykwak03  |  linkedin.com/in/gayoungkwak  |  ganuyaa.tistory.com",
    "summary_title": "Profile",
    "summary": (
        "Healthcare AI and applied machine-learning researcher combining food and nutrition "
        "domain knowledge with software and data science. Experience with clinical records, "
        "public data, and medical images, with an emphasis on reproducible evaluation and practical limitations."
    ),
    "experience_title": "Experience",
    "experience_heading": "Research Intern",
    "experience_meta": "Integrative Research Center for Cerebrovascular and Cardiovascular Diseases, Yonsei University College of Medicine  |  Jul 2024 - Jul 2025",
    "experience_bullets": [
        "Led an end-to-end study of LLM-based clinical feature selection for ICU delirium prediction.",
        "Constructed a retrospective MIMIC-IV cohort of 32,574 first ICU stays, including 2,728 incident delirium cases, and mapped 107 features from 11 studies to 151 analysis variables.",
        "Compared four procedures: Scoring, Ranking, Sequencing, and log-prior across GPT-4.1, Claude Sonnet 4.5, and Gemini 2.5 Pro, with five independent runs per setting.",
        "The best 30-feature LLM subset retained 93.0% of the full-feature XGBoost AUROC, supporting the potential of LLMs as assistive tools for feature prioritisation in clinical prediction research.",
    ],
    "research_title": "Research",
    "research_heading": "LLM-Based Feature Prioritisation for ICU Delirium Prediction: Reproducibility and Predictive Utility",
    "research_meta": "First author  |  Under Review at Smart Health (Journal Impact Factor 3.4)",
    "research_desc": "Evaluated LLMs as literature-informed priors for clinical feature selection using MIMIC-IV and downstream XGBoost benchmarking.",
    "work_title": "Selected Work",
    "work": [
        (
            "DentiScan",
            "Data Analysis Capstone Design  |  2026",
            "Two-stage RF-DETR and Swin Transformer screening pipeline focused on precision. RF-DETR achieved 81.28% precision versus 63.78% for D-FINE; contributed to model experiments, backend integration, and AWS deployment.",
        ),
        (
            "SS-TI",
            "Food and Nutrition Capstone Design  |  2024",
            "Built a web assessment from 40 literature-derived sugar and sodium items, evaluated with KMO and Cronbach's alpha, with personalized dietary guidance.",
        ),
        (
            "Book-Delivery Robot Hubs",
            "Seoul Gwanak-gu Youth Data Science Program  |  2023",
            "Combined nine public datasets and OLS regression to prioritize library robot hubs and routes.",
        ),
        (
            "Food Poisoning Battle",
            "Kyung Hee University KHUthon  |  2023",
            "Designed the concept, rules, progression, and UI for a Unity strategy game based on pathogen growth conditions.",
        ),
    ],
    "education_title": "Education",
    "education": [
        ("B.S. Food Science and Nutrition", "Kyung Hee University, Seoul Campus  |  2022 - Present"),
        ("B.S. Software Convergence (Data Science Track)", "Kyung Hee University, Global Campus  |  2024 - Present"),
        ("Exchange - Data Science and Engineering", "Instituto Superior Tecnico, University of Lisbon  |  Sep 2025 - Jan 2026"),
    ],
    "coursework": "Coursework: Deep Learning, Natural Language, Information Systems and Databases, Parallel and Heterogeneous Computing Systems",
    "skills_title": "Skills",
    "skills": [
        ("Programming", "Python, SQL, R, C++, JavaScript"),
        ("Web", "HTML/CSS, JavaScript, React"),
        ("Cloud", "AWS, GCP, Git"),
        ("ML / Data", "PyTorch, scikit-learn, Hugging Face, LangChain, NumPy, pandas"),
    ],
    "languages_title": "Languages",
    "languages": [("Korean", "Native"), ("English", "IELTS Academic 7.0 (C1) | Oct 31, 2026")],
    "honors_title": "Honors",
    "honors_heading": "Grand Prize and Mayor of Seoul Award",
    "honors_meta": "2026 Seoul Metropolitan Government Big Data Competition | Startup Division, Product & Service Development",
    "honors_desc": "Awarded for Seoul Foodservice Site Intelligence, a service predicting three-year survival for prospective foodservice business locations in Seoul. Role: Data & ML Lead.",
}


KO = {
    "name": "곽가영",
    "tagline": "헬스케어 AI / 데이터사이언스",
    "contact": "gykwak03@khu.ac.kr  |  github.com/gykwak03  |  linkedin.com/in/gayoungkwak  |  ganuyaa.tistory.com",
    "summary_title": "소개",
    "summary": (
        "식품영양학 분야 지식과 소프트웨어, 데이터사이언스를 연결해 헬스케어와 응용 문제를 연구합니다. "
        "임상 기록, 공공데이터, 의료 영상을 다루며 재현 가능한 평가와 적용 한계를 함께 검토합니다."
    ),
    "experience_title": "경력",
    "experience_heading": "연구인턴",
    "experience_meta": "연세대학교 의과대학 뇌심혈관질환연구센터  |  2024.07 - 2025.07",
    "experience_bullets": [
        "중환자실 섬망 예측을 위한 LLM 기반 임상 변수 선택 연구를 주도했습니다.",
        "첫 중환자실 입원 32,574건과 입실 24시간 이후 발생한 섬망 2,728건의 코호트를 구축하고, 연구 11편의 임상 특성 107개를 MIMIC-IV 변수 151개로 구현했습니다.",
        "GPT-4.1, Claude Sonnet 4.5, Gemini 2.5 Pro에서 Scoring, Ranking, Sequencing, log-prior의 네 가지 방식을 조건별 5회씩 비교했습니다.",
        "가장 우수한 LLM 변수 30개 조합은 전체 변수 XGBoost 모델 AUROC의 93.0%를 유지해, 임상 예측 연구에서 LLM을 변수 우선순위 선정 보조 도구로 활용할 가능성을 뒷받침했습니다.",
    ],
    "research_title": "연구",
    "research_heading": "LLM-Based Feature Prioritisation for ICU Delirium Prediction: Reproducibility and Predictive Utility",
    "research_meta": "제1저자  |  Smart Health 심사 중 (Journal Impact Factor 3.4)",
    "research_desc": "문헌 지식을 활용한 LLM 변수 선택의 재현성과 MIMIC-IV 기반 XGBoost 예측 성능을 평가했습니다.",
    "work_title": "주요 작업",
    "work": [
        (
            "DentiScan",
            "데이터분석 캡스톤디자인  |  2026",
            "정밀도 향상에 초점을 맞춘 RF-DETR과 Swin Transformer 기반 2단계 스크리닝 파이프라인입니다. RF-DETR 정밀도는 81.28%로 D-FINE의 63.78%보다 높았으며, 모델 실험과 백엔드 통합, AWS 배포에 참여했습니다.",
        ),
        (
            "SS-TI",
            "식품영양학과 캡스톤디자인  |  2024",
            "당류와 나트륨 관련 선행 연구 기반 40문항을 KMO와 Cronbach's alpha로 평가하고, 맞춤형 식생활 가이드를 제공하는 웹 설문을 구현했습니다.",
        ),
        (
            "도서배달로봇 거점·경로 설계",
            "서울 관악구 청년 Data Science 과정  |  2023",
            "공공데이터 9종과 OLS 회귀분석으로 도서 배달 로봇의 우선 거점과 경로를 제안했습니다.",
        ),
        (
            "식중독을 부탁해",
            "경희대학교 KHUthon  |  2023",
            "식중독균 생육 조건을 전략 규칙으로 구현한 Unity 게임의 콘셉트, 규칙, 진행 구조, UI를 설계했습니다.",
        ),
    ],
    "education_title": "학력",
    "education": [
        ("식품영양학 학사", "경희대학교 서울캠퍼스  |  2022 - 현재"),
        ("소프트웨어융합학 학사 (데이터사이언스 트랙)", "경희대학교 국제캠퍼스  |  2024 - 현재"),
        ("교환학생 - Data Science and Engineering", "리스본대학교 Instituto Superior Tecnico  |  2025.09 - 2026.01"),
    ],
    "coursework": "수강: Deep Learning, Natural Language, Information Systems and Databases, Parallel and Heterogeneous Computing Systems",
    "skills_title": "기술",
    "skills": [
        ("프로그래밍", "Python, SQL, R, C++, JavaScript"),
        ("웹", "HTML/CSS, JavaScript, React"),
        ("클라우드", "AWS, GCP, Git"),
        ("ML / 데이터", "PyTorch, scikit-learn, Hugging Face, LangChain, NumPy, pandas"),
    ],
    "languages_title": "언어",
    "languages": [("한국어", "원어민"), ("영어", "IELTS Academic 7.0 (C1) | 2026.10.31")],
    "honors_title": "수상",
    "honors_heading": "대상 및 서울특별시장상",
    "honors_meta": "2026 서울시 빅데이터 활용 경진대회 | 창업부문 제품·서비스 개발 분야",
    "honors_desc": "서울 요식업 창업 입지의 3년 생존 가능성을 예측하는 서비스 ‘상권을 부탁해’로 수상했습니다. 데이터·ML 개발을 총괄했습니다.",
}


def build_resume(data: dict, lang: str, output_path: Path) -> None:
    styles = styles_for(lang)
    regular = "SegoeUI" if lang == "en" else "Malgun"
    bold = "SegoeUI-Bold" if lang == "en" else "Malgun-Bold"
    c = canvas.Canvas(str(output_path), pagesize=A4)
    c.setTitle(f"{data['name']} - Resume")
    c.setAuthor("Gayoung Kwak")

    y = PAGE_H - 38
    c.setFillColor(NAVY)
    c.setFont(bold, 27)
    c.drawString(MARGIN, y, data["name"])
    y -= 25
    c.setFillColor(BLUE)
    c.setFont(bold, 10.5)
    c.drawString(MARGIN, y, data["tagline"])
    y -= 16
    c.setFillColor(MUTED)
    c.setFont(regular, 8.1)
    c.drawString(MARGIN, y, data["contact"])
    y -= 12
    c.setStrokeColor(BLUE)
    c.setLineWidth(1.15)
    c.line(MARGIN, y, PAGE_W - MARGIN, y)
    y -= 17

    y = draw_section(c, data["summary_title"], MARGIN, y, PAGE_W - 2 * MARGIN, lang)
    y = draw_paragraph(c, escape(data["summary"]), MARGIN, y, PAGE_W - 2 * MARGIN, styles["body"], 12)

    left_x = MARGIN
    gap = 20
    left_w = 325
    right_x = left_x + left_w + gap
    right_w = PAGE_W - MARGIN - right_x
    left_y = y
    right_y = y

    left_y = draw_section(c, data["experience_title"], left_x, left_y, left_w, lang)
    left_y = draw_entry(
        c,
        data["experience_heading"],
        data["experience_meta"],
        "",
        left_x,
        left_y,
        left_w,
        styles,
        4,
    )
    for item in data["experience_bullets"]:
        left_y = draw_bullet(c, item, left_x, left_y, left_w, styles)
    left_y -= 7

    left_y = draw_section(c, data["research_title"], left_x, left_y, left_w, lang)
    left_y = draw_entry(
        c,
        data["research_heading"],
        data["research_meta"],
        data["research_desc"],
        left_x,
        left_y,
        left_w,
        styles,
        9,
    )

    right_y = draw_section(c, data["education_title"], right_x, right_y, right_w, lang)
    for title, meta in data["education"]:
        right_y = draw_entry(c, title, meta, "", right_x, right_y, right_w, styles, 8)
    right_y = draw_paragraph(c, escape(data["coursework"]), right_x, right_y, right_w, styles["small"], 9)

    right_y = draw_section(c, data["honors_title"], right_x, right_y - 6, right_w, lang)
    right_y = draw_entry(
        c, data["honors_heading"], data["honors_meta"], data["honors_desc"],
        right_x, right_y, right_w, styles, 9,
    )

    details_y = min(left_y, right_y) - 8
    skills_y = draw_section(c, data["skills_title"], MARGIN, details_y, PAGE_W - 2 * MARGIN, lang)
    details_gap = 20
    details_col_w = (PAGE_W - 2 * MARGIN - details_gap) / 2
    skills_left_y = skills_y
    skills_right_y = skills_y
    for label, detail in data["skills"][:2]:
        skills_left_y = draw_paragraph(
            c,
            f"<b>{escape(label)}</b>  <font color='#66778f'>{escape(detail)}</font>",
            MARGIN,
            skills_left_y,
            details_col_w,
            styles["entry"],
            6,
        )
    for label, detail in data["skills"][2:]:
        skills_right_y = draw_paragraph(
            c,
            f"<b>{escape(label)}</b>  <font color='#66778f'>{escape(detail)}</font>",
            MARGIN + details_col_w + details_gap,
            skills_right_y,
            details_col_w,
            styles["entry"],
            6,
        )

    languages_y = draw_section(
        c,
        data["languages_title"],
        MARGIN,
        min(skills_left_y, skills_right_y) - 3,
        PAGE_W - 2 * MARGIN,
        lang,
    )
    language_bottoms = []
    for index, (name, level) in enumerate(data["languages"]):
        language_bottoms.append(draw_paragraph(
            c,
            f"<b>{escape(name)}</b>  <font color='#66778f'>{escape(level)}</font>",
            MARGIN + index * (details_col_w + details_gap),
            languages_y,
            details_col_w,
            styles["entry"],
            6,
        ))

    work_y = min(language_bottoms) - 5
    work_y = draw_section(c, data["work_title"], MARGIN, work_y, PAGE_W - 2 * MARGIN, lang)

    work_gap = 20
    work_col_w = (PAGE_W - 2 * MARGIN - work_gap) / 2
    work_left_x = MARGIN
    work_right_x = MARGIN + work_col_w + work_gap
    work_left_y = work_y
    work_right_y = work_y
    work_entry_gap = 14

    for title, meta, description in data["work"][:2]:
        work_left_y = draw_entry(
            c,
            title,
            meta,
            description,
            work_left_x,
            work_left_y,
            work_col_w,
            styles,
            work_entry_gap,
        )
    for title, meta, description in data["work"][2:]:
        work_right_y = draw_entry(
            c,
            title,
            meta,
            description,
            work_right_x,
            work_right_y,
            work_col_w,
            styles,
            work_entry_gap,
        )

    if min(work_left_y, work_right_y) < 34:
        raise RuntimeError(
            "Resume overflowed the page: "
            f"work-left={work_left_y:.1f}, work-right={work_right_y:.1f}"
        )

    c.save()


def main() -> None:
    register_fonts()
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    outputs = [
        (EN, "en", "resume-gayoung-kwak-en.pdf"),
        (KO, "ko", "resume-gayoung-kwak-ko.pdf"),
    ]
    for data, lang, filename in outputs:
        output_path = OUTPUT_DIR / filename
        build_resume(data, lang, output_path)
        if len(PdfReader(output_path).pages) != 1:
            raise RuntimeError(f"{filename} is not exactly one page")
        public_path = PUBLIC_DIR / filename
        shutil.copy2(output_path, public_path)
        print(f"{filename}: 1 page, {public_path.stat().st_size} bytes")


if __name__ == "__main__":
    main()

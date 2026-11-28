# Auto AX — AI 자동화 진단 키트 (AI Automation Audit Kit)

비즈니스 컨설턴트가 고객사 인터뷰 현장에서 반복 수작업과 시스템 간 수동 인계(Manual Handoff) 병목을 정량화하고, 투자수익률(ROI)이 검증된 **30·60·90일 AI 자동화 로드맵 및 경영진 보고서**를 즉시 산출할 수 있는 4단계 진단 웹 애플리케이션입니다.

- **디자인 컨셉**: META BIOMED 정밀 메드테크 디자인 시스템 (`#01B2A9` 틸 액센트, `#111722` 딥 네이비, `#F5F8F8` 클리니컬 캔버스)
- **아키텍처**: 별도 번들러나 빌드 과정이 없는 **Zero-build Vanilla ES Modules** + 브라우저 `localStorage`(`auto_ax_state_v1`) 자동 저장

---

## 라이브 데모

- **GitHub Pages**: https://songyoungsim.github.io/Auto-AX-consulting/

---

## 핵심 기능 4단계

1. **`1. 현황 입력`** ([`src/modules/intake.js`](src/modules/intake.js))
   - **고객사 프로필**, **팀별 수작업 시간**, **도구 스택(SaaS 비용 및 API 연동 여부)**을 3단계 마법사로 입력하며, 우측 실시간 진단 요약 사이드바에서 연간 수작업 인건비 추정액을 즉시 확인합니다.
2. **`2. 프로세스 맵`** ([`src/modules/process-map.js`](src/modules/process-map.js))
   - 업무 단계별 주간 소요 시간과 **수동 인계(Manual Handoff)** 병목 구간을 수평 흐름도로 시각화하고, 인계 위험도(`낮음`/`보통`/`높음`) 플래깅 및 단계 추가·수정을 지원합니다.
3. **`3. 스코어카드`** ([`src/modules/scorecard.js`](src/modules/scorecard.js))
   - **2×2 Impact vs. Effort 매트릭스**(SVG)와 우선순위 점수(`영향도 ÷ 난이도`) 테이블을 연동해 **Top 3 자동화 과제**를 수동 선택 또는 자동 선정(`★ Top 3 자동 선정`)합니다.
4. **`4. 고객 보고서`** ([`src/modules/report.js`](src/modules/report.js))
   - 경영진 요약 내러티브, 5개 핵심 ROI KPI, Top 3 추천 과제 근거, 수동 핸드오프 위험 요약, **30-60-90일 실행 로드맵**을 생성하며 **`PDF로 인쇄`** 및 **`요약 복사`** 기능을 제공합니다.

---

## 기본 가상 데모 데이터 및 사용 가이드

- **가상 데모 데이터 (`에이펙스 산업유통(주)`)**: 초기 접속 시 B2B 산업자재 유통·제조 기업 시나리오(4개 팀·주간 140시간, 6개 도구 스택, 7개 프로세스 단계, 6개 자동화 후보 및 Top 3 예시)가 자동 로드되어 바로 시연할 수 있습니다.
- **`사용 가이드` 모달 & 초기화**: 상단 헤더의 **`사용 가이드`** 버튼에서 4단계 워크플로우 요약과 컨설턴트 실무 팁을 확인할 수 있으며, **`데모 데이터 초기화`** 버튼으로 언제든 기본 데모 상태로 복원할 수 있습니다.

---

## 로컬 실행 방법

ES Modules(`type="module"`)를 사용하므로 `file://` 직접 열기 대신 로컬 HTTP 서버로 실행해야 합니다.

```powershell
python -m http.server 4173
```

실행 후 브라우저에서 `http://localhost:4173` 으로 접속하세요.

---

## 관련 문서

- [서비스 기획서 (`PLAN.md`)](PLAN.md) — 기획 배경, 타겟 페르소나, 4단계 IA 및 ROI 산출 기획
- [사용자 매뉴얼 (`USER_MANUAL.md`)](USER_MANUAL.md) — 컨설턴트용 탭별 상세 사용법 및 실무 팁
- [기술 명세서 (`TECH_SPEC.md`)](TECH_SPEC.md) — 상태 관리, Mermaid ERD, 모듈 인터페이스 및 ROI 계산 공식
- [무료 배포 가이드 (`DEPLOY.md`)](DEPLOY.md) — GitHub Pages, Cloudflare Pages, Vercel, Netlify 배포 방법

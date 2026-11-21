import { getState, setState, subscribe, resetState } from './state.js';
import { renderIntake } from './modules/intake.js';
import { renderProcessMap } from './modules/process-map.js';
import { renderScorecard } from './modules/scorecard.js';
import { renderReport } from './modules/report.js';

const TABS = [
  { id: 'intake', label: '1. 현황 입력', render: renderIntake },
  { id: 'process-map', label: '2. 프로세스 맵', render: renderProcessMap },
  { id: 'scorecard', label: '3. 스코어카드', render: renderScorecard },
  { id: 'report', label: '4. 고객 보고서', render: renderReport },
];

let activeTabId = resolveInitialTab();

function resolveInitialTab() {
  const hash = window.location.hash.replace('#', '').trim();
  const match = TABS.find((t) => t.id === hash);
  return match ? match.id : 'intake';
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isEditingInsideMain() {
  const active = document.activeElement;
  const main = document.getElementById('main-content');
  if (!active || !main || !main.contains(active)) return false;
  const tag = active.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || active.isContentEditable;
}

function buildShell() {
  const root = document.getElementById('app');
  if (!root) return;

  root.innerHTML = `
    <div class="app-shell">
      <header class="app-header no-print">
        <div class="app-header-inner">
          <div class="brand">
            <div class="brand-mark">AUTO AX<span class="brand-dot" aria-hidden="true"></span></div>
            <span class="brand-divider" aria-hidden="true">|</span>
            <div class="brand-subtitle">AI Automation Platform</div>
          </div>

          <nav class="app-nav" aria-label="진단 워크플로우">
            ${TABS.map(
              (tab) => `
              <button
                type="button"
                class="nav-tab${tab.id === activeTabId ? ' is-active' : ''}"
                data-tab="${tab.id}"
                aria-current="${tab.id === activeTabId ? 'page' : 'false'}"
              >
                ${escapeHtml(tab.label)}
              </button>`
            ).join('')}
          </nav>

          <div class="header-actions">
            <div class="client-pill" id="header-client-pill" title="진단 대상 고객사"></div>
            <button type="button" class="btn btn-secondary btn-sm" id="btn-user-guide">
              사용 가이드
            </button>
            <button type="button" class="btn btn-secondary btn-sm" id="btn-reset-demo">
              데모 데이터 초기화
            </button>
          </div>
        </div>
      </header>

      <section class="platform-hero no-print" data-enter aria-label="플랫폼 진단 텔레메트리">
        <div class="platform-hero-inner">
          <div class="hero-lead">
            <div class="hero-kicker">
              <span class="hero-kicker-dot" aria-hidden="true"></span>
              AI AUTOMATION PLATFORM
            </div>
            <h1 class="hero-title">
              정밀 프로세스 계측 기반 <span>AX</span> 자동화 진단
            </h1>
            <p class="hero-deck">
              조직별 반복 수작업과 시스템 단절 구간을 정량화하고, 가장 높은 투자수익률(ROI)이
              검증된 30·60·90일 자동화 아키텍처를 설계합니다.
            </p>
          </div>
          <aside class="hero-telemetry" id="hero-telemetry"></aside>
        </div>
      </section>

      <main id="main-content" class="app-main" data-enter></main>

      <div
        id="user-guide-modal"
        class="guide-modal-backdrop no-print"
        role="dialog"
        aria-modal="true"
        aria-labelledby="guide-modal-title"
        hidden
      >
        <div class="guide-modal">
          <div class="guide-modal-header">
            <div>
              <div class="guide-modal-kicker">AUTO AX · CONSULTANT GUIDE</div>
              <h2 class="guide-modal-title" id="guide-modal-title">Auto AX 사용 가이드 및 데모 데이터 안내</h2>
            </div>
            <button type="button" class="guide-modal-close" id="btn-close-guide-x" aria-label="닫기">
              ×
            </button>
          </div>

          <div class="guide-modal-body">
            <section class="guide-section">
              <h3 class="guide-section-title">
                <span class="guide-step-num">01</span>
                4단계 AI 자동화 진단 워크플로우
              </h3>
              <div class="guide-flow-grid">
                <div class="guide-flow-item">
                  <strong>1. 현황 입력 (Intake)</strong>
                  <span>고객사 프로필, 팀별 주간 수작업 시간, 보유 도구 스택(API 연동 여부 포함)을 계측합니다.</span>
                </div>
                <div class="guide-flow-item">
                  <strong>2. 프로세스 맵 (Process Map)</strong>
                  <span>업무 단계별 소요 시간과 부서·시스템 간 수동 인계(Manual Handoff) 위험 구간을 시각화합니다.</span>
                </div>
                <div class="guide-flow-item">
                  <strong>3. 스코어카드 (Scorecard)</strong>
                  <span>2×2 영향도-난이도 매트릭스와 우선순위 점수(Impact/Effort)로 핵심 과제 Top 3를 선정합니다.</span>
                </div>
                <div class="guide-flow-item">
                  <strong>4. 고객 보고서 (Client Report)</strong>
                  <span>ROI 지표, Top 3 추천 자동화, 30·60·90일 실행 로드맵이 포함된 경영진 보고서를 발행합니다.</span>
                </div>
              </div>
            </section>

            <section class="guide-section guide-section-accent">
              <h3 class="guide-section-title">
                <span class="guide-step-num">02</span>
                가상 데모 데이터 안내 (에이펙스 산업유통(주))
              </h3>
              <ul class="guide-list">
                <li><strong>기본 샘플 기업:</strong> <code>에이펙스 산업유통(주)</code> (B2B 산업자재 유통·제조, 임직원 48명, 기준 시급 $65)</li>
                <li><strong>4개 팀 · 주 140시간 수작업:</strong> 영업 및 견적팀(38h), 수주 운영팀(44h), 재무·정산팀(26h), 고객지원팀(32h)</li>
                <li><strong>6개 도구 스택:</strong> HubSpot CRM, NetSuite ERP, Zendesk, Excel / Google Sheets, Slack, 레거시 물류 포털(API 미지원)</li>
                <li><strong>7개 프로세스 &amp; 6개 자동화 후보:</strong> 수동 인계 위험이 높은 RFQ 파싱·수주 동기화·3자 정산 대사 등 실제 B2B 시나리오가 사전 탑재되어 있습니다.</li>
                <li><strong>초기화 활용:</strong> 고객사 시연 중 데이터를 자유롭게 수정한 뒤, 상단 <strong>데모 데이터 초기화</strong> 버튼으로 언제든 기본 상태로 복원할 수 있습니다.</li>
              </ul>
            </section>

            <section class="guide-section">
              <h3 class="guide-section-title">
                <span class="guide-step-num">03</span>
                컨설턴트 실무 팁
              </h3>
              <ul class="guide-list">
                <li><strong>Top 3 자동 선정:</strong> 스코어카드 상단의 <code>Top 3 자동 선정</code> 버튼을 누르면 우선순위 점수가 가장 높은 3개 과제가 자동 선택됩니다.</li>
                <li><strong>PDF로 인쇄 &amp; 요약 복사:</strong> 고객 보고서 탭의 <code>PDF로 인쇄</code>는 내비게이션과 버튼을 자동 숨김 처리하여 깔끔한 보고서로 출력되며, <code>요약 복사</code>로 경영진 요약 텍스트를 클립보드에 복사할 수 있습니다.</li>
                <li><strong>브라우저 자동 저장:</strong> 모든 입력·수정 사항은 브라우저 <code>localStorage</code>(<code>auto_ax_state_v1</code>)에 실시간 자동 저장됩니다.</li>
              </ul>
            </section>
          </div>

          <div class="guide-modal-footer">
            <span class="guide-modal-hint">ESC 키 또는 바깥 영역을 클릭해 닫을 수 있습니다.</span>
            <button type="button" class="btn btn-dark btn-sm" id="btn-close-guide">
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  root.querySelectorAll('.nav-tab').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      if (targetTab) navigateTo(targetTab);
    });
  });

  const guideBtn = document.getElementById('btn-user-guide');
  const guideModal = document.getElementById('user-guide-modal');
  const closeGuideX = document.getElementById('btn-close-guide-x');
  const closeGuideBtn = document.getElementById('btn-close-guide');

  const openGuideModal = () => {
    if (!guideModal) return;
    guideModal.hidden = false;
    closeGuideBtn?.focus();
  };

  const closeGuideModal = () => {
    if (!guideModal || guideModal.hidden) return;
    guideModal.hidden = true;
    guideBtn?.focus();
  };

  guideBtn?.addEventListener('click', openGuideModal);
  closeGuideX?.addEventListener('click', closeGuideModal);
  closeGuideBtn?.addEventListener('click', closeGuideModal);
  guideModal?.addEventListener('click', (e) => {
    if (e.target === guideModal) closeGuideModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && guideModal && !guideModal.hidden) {
      closeGuideModal();
    }
  });

  const resetBtn = document.getElementById('btn-reset-demo');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (window.confirm('현재 입력된 진단 데이터를 기본 데모 데이터로 초기화하시겠습니까?')) {
        resetState();
        renderActiveTab(true);
      }
    });
  }
}

function updateHeaderMeta(state) {
  const pill = document.getElementById('header-client-pill');
  const company = state?.client?.companyName || '고객사 미지정';
  if (pill) {
    pill.textContent = company;
  }

  const telemetry = document.getElementById('hero-telemetry');
  if (telemetry) {
    const industry = state?.client?.industry || '업종 미지정';
    const consultant = state?.client?.consultantName || '담당 컨설턴트';
    const totalHours = (state?.teams || []).reduce(
      (sum, t) => sum + (Number(t.weeklyManualHours) || 0),
      0
    );
    const manualHandoffs = (state?.processSteps || []).filter((s) => s.isManualHandoff).length;

    telemetry.innerHTML = `
      <div class="telemetry-item">
        <div class="telemetry-label">Client Target</div>
        <div class="telemetry-value">${escapeHtml(company)}</div>
      </div>
      <div class="telemetry-item">
        <div class="telemetry-label">Sector</div>
        <div class="telemetry-value">${escapeHtml(industry)}</div>
      </div>
      <div class="telemetry-item">
        <div class="telemetry-label">Weekly Manual Load</div>
        <div class="telemetry-value is-teal">${totalHours.toLocaleString('ko-KR')} hrs / wk</div>
      </div>
      <div class="telemetry-item">
        <div class="telemetry-label">Lead &amp; Handoffs</div>
        <div class="telemetry-value is-gold">${escapeHtml(consultant)} · ${manualHandoffs}건</div>
      </div>
    `;
  }

  document.querySelectorAll('.nav-tab').forEach((btn) => {
    const isActive = btn.getAttribute('data-tab') === activeTabId;
    btn.classList.toggle('is-active', isActive);
    btn.setAttribute('aria-current', isActive ? 'page' : 'false');
  });
}

function navigateTo(tabId) {
  const tab = TABS.find((t) => t.id === tabId);
  if (!tab) return;
  activeTabId = tab.id;
  if (window.location.hash !== `#${tab.id}`) {
    history.replaceState(null, '', `#${tab.id}`);
  }
  renderActiveTab(true);
  window.scrollTo({ top: 0, behavior: 'auto' });
}

const actions = {
  getState,
  setState,
  resetState,
  navigateTo,
};

function renderActiveTab(force = false) {
  const state = getState();
  updateHeaderMeta(state);

  if (!force && isEditingInsideMain()) {
    return;
  }

  const main = document.getElementById('main-content');
  if (!main) return;

  const tab = TABS.find((t) => t.id === activeTabId) || TABS[0];
  try {
    main.innerHTML = '';
    tab.render(main, state, actions);
  } catch (err) {
    console.error(`탭 "${tab.id}" 렌더링 실패:`, err);
    main.innerHTML = `
      <div class="card">
        <h2 class="section-title">${escapeHtml(tab.label)} 화면을 불러올 수 없습니다</h2>
        <p class="text-muted">${escapeHtml(err?.message || String(err))}</p>
      </div>
    `;
  }
}

function init() {
  buildShell();
  renderActiveTab(true);

  subscribe(() => {
    renderActiveTab(false);
  });

  window.addEventListener('hashchange', () => {
    const nextTab = resolveInitialTab();
    if (nextTab !== activeTabId) {
      activeTabId = nextTab;
      renderActiveTab(true);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

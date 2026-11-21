// Auto AX - 모듈 1: 팀 / 도구 / 수작업 시간 가이드 입력 폼 (메타바이오메드 정밀 플랫폼 에디션)

const STYLE_ID = 'ax-intake-styles';

let currentStep = 1; // 1 = 01. 기업 프로필, 2 = 02. 팀별 수작업, 3 = 03. 도구 스택
let isInternalStateUpdate = false;

const INDUSTRY_OPTIONS = [
  'B2B SaaS / IT',
  '제조 / 산업재 유통',
  '전문 서비스 / 컨설팅',
  '헬스케어 / 바이오',
  '금융 / 보험',
  '이커머스 / 리테일',
  '물류 / 공급망',
  '건설 / 부동산',
  '미디어 / 마케팅 에이전시',
  '기타'
];

const TOOL_CATEGORIES = [
  'CRM',
  '프로젝트 관리',
  '커뮤니케이션',
  '회계 / ERP',
  '스프레드시트 / BI',
  '고객지원 / 헬프데스크',
  '인사 / 급여',
  '마케팅 자동화',
  '전자문서 / 전자서명',
  '사내 자체 시스템',
  '기타'
];

function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    .ax-intake-root {
      box-sizing: border-box;
      width: 100%;
      max-width: 1220px;
      margin: 0 auto;
      color: var(--ink, #262E33);
      font-family: var(--font-sans, 'Noto Sans KR', 'Open Sans', 'Malgun Gothic', sans-serif);
    }
    .ax-intake-root *,
    .ax-intake-root *::before,
    .ax-intake-root *::after {
      box-sizing: border-box;
    }
    .ax-intake-layout {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 336px;
      gap: 22px;
      align-items: start;
    }
    @media (max-width: 960px) {
      .ax-intake-layout {
        grid-template-columns: 1fr;
      }
    }
    .ax-intake-main {
      background: var(--bg-surface, #FFFFFF);
      border: 1px solid var(--line, #C3DAD9);
      border-radius: 10px;
      box-shadow: 0 4px 20px rgba(17, 23, 34, 0.04);
      overflow: hidden;
    }
    /* Precision Stepper Header */
    .ax-intake-stepper {
      background: #F5F8F8;
      border-bottom: 1px solid var(--line, #C3DAD9);
      padding: 16px 22px 14px;
    }
    .ax-intake-steps {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 10px;
    }
    .ax-intake-step-btn {
      display: flex;
      align-items: center;
      gap: 11px;
      padding: 10px 13px;
      border: 1px solid var(--line, #C3DAD9);
      border-radius: 8px;
      background: #FFFFFF;
      color: var(--ink-muted, #768B99);
      cursor: pointer;
      text-align: left;
      transition: border-color 0.16s ease, background-color 0.16s ease, box-shadow 0.16s ease, transform 0.16s ease;
      font-family: inherit;
    }
    .ax-intake-step-btn:hover {
      border-color: var(--accent, #01B2A9);
      transform: translateY(-1px);
    }
    .ax-intake-step-btn.is-active {
      border-color: var(--accent, #01B2A9);
      background: var(--accent-soft, #E3EDEC);
      color: var(--ink-strong, #111722);
      box-shadow: 0 0 0 1px rgba(1, 178, 169, 0.2);
    }
    .ax-intake-step-num {
      width: 28px;
      height: 28px;
      border-radius: 6px;
      border: 1px solid var(--line, #C3DAD9);
      background: #F5F8F8;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: 'Montserrat', 'Noto Sans KR', sans-serif;
      font-size: 12px;
      font-weight: 800;
      color: var(--ink-muted, #768B99);
      flex-shrink: 0;
    }
    .ax-intake-step-btn.is-active .ax-intake-step-num {
      background: var(--accent, #01B2A9);
      border-color: var(--accent, #01B2A9);
      color: #FFFFFF;
    }
    .ax-intake-step-btn.is-complete:not(.is-active) .ax-intake-step-num {
      background: var(--accent-dark, #009B93);
      border-color: var(--accent-dark, #009B93);
      color: #FFFFFF;
    }
    .ax-intake-step-meta {
      min-width: 0;
    }
    .ax-intake-step-title {
      font-size: 13px;
      font-weight: 700;
      line-height: 1.3;
      color: var(--ink-strong, #111722);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .ax-intake-step-sub {
      font-size: 11px;
      color: var(--ink-muted, #768B99);
      margin-top: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .ax-intake-progress-track {
      height: 3px;
      background: var(--line, #C3DAD9);
      border-radius: 999px;
      margin-top: 13px;
      overflow: hidden;
    }
    .ax-intake-progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #01B2A9, #009B93);
      border-radius: 999px;
      transition: width 0.25s ease;
    }
    /* Body */
    .ax-intake-body {
      padding: 22px;
    }
    .ax-intake-section-head {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 16px;
      padding-bottom: 14px;
      margin-bottom: 18px;
      border-bottom: 1px solid var(--line, #C3DAD9);
    }
    .ax-intake-chapter-kicker {
      font-family: 'Montserrat', 'Open Sans', sans-serif;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--accent-dark, #009B93);
      margin-bottom: 4px;
    }
    .ax-intake-section-head h2 {
      margin: 0;
      font-size: 19px;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: var(--ink-strong, #111722);
    }
    .ax-intake-section-head p {
      margin: 4px 0 0;
      font-size: 13px;
      color: var(--ink-muted, #768B99);
    }
    /* Form Controls */
    .ax-intake-grid-2 {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px 20px;
    }
    .ax-intake-grid-3 {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px 16px;
    }
    @media (max-width: 720px) {
      .ax-intake-grid-2,
      .ax-intake-grid-3 {
        grid-template-columns: 1fr;
      }
    }
    .ax-intake-field {
      display: flex;
      flex-direction: column;
      gap: 5px;
      min-width: 0;
    }
    .ax-intake-field label {
      font-size: 12px;
      font-weight: 600;
      color: var(--slate, #3B454D);
    }
    .ax-intake-input,
    .ax-intake-select,
    .ax-intake-textarea {
      width: 100%;
      padding: 9px 11px;
      font-size: 13.5px;
      line-height: 1.45;
      color: var(--ink-strong, #111722);
      background: #FFFFFF;
      border: 1px solid var(--line, #C3DAD9);
      border-radius: 6px;
      font-family: inherit;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }
    .ax-intake-input:focus,
    .ax-intake-select:focus,
    .ax-intake-textarea:focus {
      outline: none;
      border-color: var(--accent, #01B2A9);
      box-shadow: 0 0 0 3px rgba(1, 178, 169, 0.14);
    }
    .ax-intake-textarea {
      resize: vertical;
      min-height: 58px;
    }
    .ax-intake-hint {
      font-size: 11px;
      color: var(--ink-muted, #768B99);
    }
    /* Item Cards */
    .ax-intake-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .ax-intake-item-card {
      border: 1px solid var(--line, #C3DAD9);
      border-radius: 8px;
      padding: 15px 16px;
      background: #F5F8F8;
      transition: border-color 0.16s ease, box-shadow 0.16s ease;
    }
    .ax-intake-item-card:hover {
      border-color: var(--accent, #01B2A9);
      box-shadow: 0 2px 10px rgba(1, 178, 169, 0.08);
    }
    .ax-intake-item-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      padding-bottom: 10px;
      margin-bottom: 12px;
      border-bottom: 1px solid var(--line, #C3DAD9);
    }
    .ax-intake-item-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: 'Montserrat', 'Noto Sans KR', sans-serif;
      font-size: 13px;
      font-weight: 800;
      color: var(--ink-strong, #111722);
    }
    .ax-intake-pill {
      display: inline-block;
      padding: 2px 9px;
      border-radius: 999px;
      font-family: 'Montserrat', 'Noto Sans KR', sans-serif;
      font-size: 11px;
      font-weight: 700;
      border: 1px solid var(--line, #C3DAD9);
      background: #FFFFFF;
      color: var(--ink-strong, #111722);
      font-variant-numeric: tabular-nums;
    }
    .ax-intake-pill.is-green {
      background: var(--accent-soft, #E3EDEC);
      border-color: #9DD2CF;
      color: var(--accent-dark, #009B93);
    }
    .ax-intake-pill.is-slate {
      background: #EEF2F3;
      border-color: var(--line, #C3DAD9);
      color: var(--ink-muted, #768B99);
    }
    /* Toggle Switch */
    .ax-intake-toggle {
      display: inline-flex;
      align-items: center;
      gap: 9px;
      cursor: pointer;
      user-select: none;
      padding-top: 2px;
    }
    .ax-intake-toggle input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }
    .ax-intake-toggle-track {
      width: 38px;
      height: 20px;
      background: #C3DAD9;
      border-radius: 999px;
      position: relative;
      transition: background-color 0.18s;
      flex-shrink: 0;
    }
    .ax-intake-toggle-track::after {
      content: '';
      position: absolute;
      top: 2px;
      left: 2px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #FFFFFF;
      box-shadow: 0 1px 2px rgba(17, 23, 34, 0.22);
      transition: transform 0.18s;
    }
    .ax-intake-toggle input:checked + .ax-intake-toggle-track {
      background: var(--accent, #01B2A9);
    }
    .ax-intake-toggle input:checked + .ax-intake-toggle-track::after {
      transform: translateX(18px);
    }
    .ax-intake-toggle input:focus-visible + .ax-intake-toggle-track {
      box-shadow: 0 0 0 3px rgba(1, 178, 169, 0.28);
    }
    .ax-intake-toggle-label {
      font-size: 12.5px;
      font-weight: 500;
      color: var(--ink, #262E33);
    }
    /* Buttons */
    .ax-intake-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 8px 15px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      border: 1px solid transparent;
      font-family: inherit;
      transition: background-color 0.15s, border-color 0.15s, color 0.15s, transform 0.1s;
      white-space: nowrap;
    }
    .ax-intake-btn:active {
      transform: translateY(1px);
    }
    .ax-intake-btn-primary {
      background: var(--accent, #01B2A9);
      color: #FFFFFF;
      border-color: var(--accent, #01B2A9);
    }
    .ax-intake-btn-primary:hover {
      background: var(--accent-dark, #009B93);
      border-color: var(--accent-dark, #009B93);
    }
    .ax-intake-btn-secondary {
      background: #FFFFFF;
      color: var(--ink-strong, #111722);
      border-color: var(--line, #C3DAD9);
    }
    .ax-intake-btn-secondary:hover {
      border-color: var(--accent, #01B2A9);
      color: var(--accent-dark, #009B93);
    }
    .ax-intake-btn-add {
      background: var(--accent-soft, #E3EDEC);
      color: var(--accent-dark, #009B93);
      border-color: #9DD2CF;
    }
    .ax-intake-btn-add:hover {
      background: var(--accent, #01B2A9);
      border-color: var(--accent, #01B2A9);
      color: #FFFFFF;
    }
    .ax-intake-btn-danger {
      background: transparent;
      color: var(--danger, #D94848);
      border-color: #F2BDBD;
      padding: 4px 10px;
      font-size: 11.5px;
    }
    .ax-intake-btn-danger:hover {
      background: #FDF2F2;
      border-color: var(--danger, #D94848);
    }
    /* Footer Navigation */
    .ax-intake-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 22px;
      border-top: 1px solid var(--line, #C3DAD9);
      background: #F5F8F8;
    }
    /* Sidebar: Deep Midnight Navy Precision Telemetry Card */
    .ax-intake-sidebar {
      background: linear-gradient(155deg, #111722 0%, #161E2C 100%);
      color: #F5F8F8;
      border: 1px solid #243144;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 12px 32px rgba(17, 23, 34, 0.16);
      position: sticky;
      top: 16px;
      overflow: hidden;
    }
    .ax-intake-sidebar::before {
      content: '';
      position: absolute;
      top: -40px;
      right: -40px;
      width: 140px;
      height: 140px;
      background: radial-gradient(circle, rgba(1, 178, 169, 0.22) 0%, transparent 70%);
      pointer-events: none;
    }
    .ax-intake-sidebar-kicker {
      font-family: 'Montserrat', 'Open Sans', sans-serif;
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #01B2A9;
      margin-bottom: 4px;
    }
    .ax-intake-sidebar-title {
      font-size: 17px;
      font-weight: 800;
      margin: 0 0 4px;
      color: #FFFFFF;
    }
    .ax-intake-sidebar-client {
      font-size: 12px;
      color: #9FB0BD;
      padding-bottom: 14px;
      margin-bottom: 14px;
      border-bottom: 1px solid rgba(195, 218, 217, 0.16);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .ax-intake-kpi-stack {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 16px;
    }
    .ax-intake-kpi-card {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(195, 218, 217, 0.14);
      border-radius: 8px;
      padding: 11px 13px;
    }
    .ax-intake-kpi-label {
      font-size: 11px;
      color: #9FB0BD;
      font-weight: 500;
    }
    .ax-intake-kpi-value {
      font-family: 'Montserrat', 'Noto Sans KR', sans-serif;
      font-size: 21px;
      font-weight: 800;
      color: #FFFFFF;
      margin-top: 2px;
      font-variant-numeric: tabular-nums;
    }
    .ax-intake-kpi-value.is-accent {
      color: #01B2A9;
    }
    .ax-intake-kpi-sub {
      font-size: 11px;
      color: #C3DAD9;
      margin-top: 2px;
    }
    .ax-intake-mini-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      padding: 11px 0;
      border-top: 1px solid rgba(195, 218, 217, 0.16);
      border-bottom: 1px solid rgba(195, 218, 217, 0.16);
      margin-bottom: 16px;
      text-align: center;
    }
    .ax-intake-mini-num {
      font-family: 'Montserrat', 'Noto Sans KR', sans-serif;
      font-size: 16px;
      font-weight: 800;
      color: #FFFFFF;
      font-variant-numeric: tabular-nums;
    }
    .ax-intake-mini-lbl {
      font-size: 10.5px;
      color: #9FB0BD;
      margin-top: 2px;
    }
    .ax-intake-cta {
      width: 100%;
      padding: 11px 16px;
      font-size: 13.5px;
      font-weight: 700;
      background: var(--accent, #01B2A9);
      color: #FFFFFF;
      border: 1px solid var(--accent, #01B2A9);
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.15s, border-color 0.15s, transform 0.1s;
      font-family: inherit;
    }
    .ax-intake-cta:hover {
      background: var(--accent-dark, #009B93);
      border-color: var(--accent-dark, #009B93);
    }
    .ax-intake-cta:active {
      transform: translateY(1px);
    }
    .ax-intake-empty {
      text-align: center;
      padding: 28px 16px;
      border: 1px dashed var(--line, #C3DAD9);
      border-radius: 8px;
      color: var(--ink-muted, #768B99);
      font-size: 13px;
      background: #F5F8F8;
    }
  `;
  document.head.appendChild(style);
}

function escapeHtml(val) {
  return String(val ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatCurrency(amount) {
  const num = Number(amount) || 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(num);
}

function formatNumber(val) {
  const num = Number(val) || 0;
  return new Intl.NumberFormat('ko-KR', {
    maximumFractionDigits: 1
  }).format(num);
}

function computeSummary(state) {
  const client = state?.client || {};
  const teams = Array.isArray(state?.teams) ? state.teams : [];
  const tools = Array.isArray(state?.tools) ? state.tools : [];

  const hourlyRate = Math.max(0, Number(client.hourlyRate) || 0);
  const totalWeeklyManualHours = teams.reduce(
    (sum, t) => sum + Math.max(0, Number(t.weeklyManualHours) || 0),
    0
  );
  const estimatedAnnualLaborCost = totalWeeklyManualHours * 52 * hourlyRate;
  const totalMonthlyToolSpend = tools.reduce(
    (sum, t) => sum + Math.max(0, Number(t.monthlyCost) || 0),
    0
  );
  const totalAnnualToolSpend = totalMonthlyToolSpend * 12;
  const apiReadyCount = tools.filter((t) => Boolean(t.hasApi)).length;
  const totalHeadcount = teams.reduce(
    (sum, t) => sum + Math.max(0, Number(t.headcount) || 0),
    0
  );

  return {
    companyName: client.companyName || '고객사 미입력',
    industry: client.industry || '업종 미선택',
    hourlyRate,
    totalWeeklyManualHours,
    estimatedAnnualLaborCost,
    totalMonthlyToolSpend,
    totalAnnualToolSpend,
    teamsCount: teams.length,
    toolsCount: tools.length,
    apiReadyCount,
    totalHeadcount
  };
}

function updateSummaryDOM(root, state) {
  if (!root) return;
  const s = computeSummary(state);
  const setTxt = (sel, text) => {
    const el = root.querySelector(sel);
    if (el) el.textContent = text;
  };
  setTxt('[data-ax-sum="client"]', `${s.companyName} · ${s.industry}`);
  setTxt('[data-ax-sum="weekly-hours"]', `${formatNumber(s.totalWeeklyManualHours)}시간/주`);
  setTxt('[data-ax-sum="weekly-sub"]', `${s.teamsCount}개 팀 기준 연간 ${formatNumber(s.totalWeeklyManualHours * 52)}시간`);
  setTxt('[data-ax-sum="annual-labor"]', formatCurrency(s.estimatedAnnualLaborCost));
  setTxt('[data-ax-sum="rate-sub"]', `평균 시간당 인건비 ${formatCurrency(s.hourlyRate)}/시간 기준`);
  setTxt('[data-ax-sum="tool-spend"]', `${formatCurrency(s.totalMonthlyToolSpend)}/월`);
  setTxt('[data-ax-sum="tool-annual"]', `연간 ${formatCurrency(s.totalAnnualToolSpend)} SaaS 지출`);
  setTxt('[data-ax-sum="teams-count"]', String(s.teamsCount));
  setTxt('[data-ax-sum="tools-count"]', String(s.toolsCount));
  setTxt('[data-ax-sum="api-count"]', `${s.apiReadyCount}/${s.toolsCount}`);
}

function renderStep1(client) {
  const c = client || {};
  const industryVal = c.industry || '';
  const hasPreset = INDUSTRY_OPTIONS.includes(industryVal);
  const optionsHtml = [
    `<option value="" ${!industryVal ? 'selected' : ''}>업종을 선택하세요...</option>`,
    ...INDUSTRY_OPTIONS.map(
      (ind) => `<option value="${escapeHtml(ind)}" ${industryVal === ind ? 'selected' : ''}>${escapeHtml(ind)}</option>`
    ),
    !hasPreset && industryVal
      ? `<option value="${escapeHtml(industryVal)}" selected>${escapeHtml(industryVal)}</option>`
      : ''
  ].join('');

  return `
    <div class="ax-intake-section-head">
      <div>
        <div class="ax-intake-chapter-kicker">STEP 01 · CLIENT DOSSIER</div>
        <h2>01. 기업 프로필</h2>
        <p>고객사의 규모, 평균 시간당 인건비 및 진단 프로젝트 기본 정보를 입력하세요.</p>
      </div>
    </div>
    <div class="ax-intake-grid-2">
      <div class="ax-intake-field">
        <label for="ax-client-company">기업명</label>
        <input id="ax-client-company" class="ax-intake-input" type="text" data-client-field="companyName" value="${escapeHtml(c.companyName)}" placeholder="예: 에이펙스 산업유통(주)" />
      </div>
      <div class="ax-intake-field">
        <label for="ax-client-industry">업종</label>
        <select id="ax-client-industry" class="ax-intake-select" data-client-field="industry">
          ${optionsHtml}
        </select>
      </div>
      <div class="ax-intake-field">
        <label for="ax-client-teamsize">전체 임직원 수 (명)</label>
        <input id="ax-client-teamsize" class="ax-intake-input" type="number" min="1" step="1" data-client-field="teamSize" value="${escapeHtml(c.teamSize ?? '')}" placeholder="예: 48" />
      </div>
      <div class="ax-intake-field">
        <label for="ax-client-rate">평균 시간당 인건비 ($/시간)</label>
        <input id="ax-client-rate" class="ax-intake-input" type="number" min="0" step="1" data-client-field="hourlyRate" value="${escapeHtml(c.hourlyRate ?? '')}" placeholder="예: 65" />
        <span class="ax-intake-hint">연간 수작업 인건비 및 자동화 ROI 산정에 사용됩니다.</span>
      </div>
      <div class="ax-intake-field">
        <label for="ax-client-date">진단 일자</label>
        <input id="ax-client-date" class="ax-intake-input" type="date" data-client-field="auditDate" value="${escapeHtml(c.auditDate)}" />
      </div>
      <div class="ax-intake-field">
        <label for="ax-client-consultant">담당 컨설턴트</label>
        <input id="ax-client-consultant" class="ax-intake-input" type="text" data-client-field="consultantName" value="${escapeHtml(c.consultantName)}" placeholder="예: 김도현 수석 컨설턴트" />
      </div>
    </div>
  `;
}

function renderStep2(teams) {
  const list = Array.isArray(teams) ? teams : [];
  const cardsHtml = list.length
    ? list
        .map((team, idx) => {
          const toolsText = Array.isArray(team.primaryTools)
            ? team.primaryTools.join(', ')
            : team.primaryTools || '';
          return `
            <div class="ax-intake-item-card" data-team-id="${escapeHtml(team.id)}">
              <div class="ax-intake-item-head">
                <div class="ax-intake-item-badge">
                  <span>TEAM ${String(idx + 1).padStart(2, '0')}</span>
                  <span class="ax-intake-pill" data-team-hours-pill="${escapeHtml(team.id)}">${formatNumber(team.weeklyManualHours)}시간/주</span>
                </div>
                <button type="button" class="ax-intake-btn ax-intake-btn-danger" data-action="remove-team" data-id="${escapeHtml(team.id)}">삭제</button>
              </div>
              <div class="ax-intake-grid-3">
                <div class="ax-intake-field">
                  <label>팀 / 부서명</label>
                  <input class="ax-intake-input" type="text" data-team-id="${escapeHtml(team.id)}" data-team-field="name" value="${escapeHtml(team.name)}" placeholder="예: 영업 및 견적팀" />
                </div>
                <div class="ax-intake-field">
                  <label>인원 수 (명)</label>
                  <input class="ax-intake-input" type="number" min="0" step="1" data-team-id="${escapeHtml(team.id)}" data-team-field="headcount" value="${escapeHtml(team.headcount ?? '')}" placeholder="예: 10" />
                </div>
                <div class="ax-intake-field">
                  <label>주간 수작업 시간 (시간)</label>
                  <input class="ax-intake-input" type="number" min="0" step="0.5" data-team-id="${escapeHtml(team.id)}" data-team-field="weeklyManualHours" value="${escapeHtml(team.weeklyManualHours ?? '')}" placeholder="예: 24" />
                </div>
              </div>
              <div class="ax-intake-grid-2" style="margin-top: 12px;">
                <div class="ax-intake-field">
                  <label>주요 사용 도구 (쉼표로 구분)</label>
                  <input class="ax-intake-input" type="text" data-team-id="${escapeHtml(team.id)}" data-team-field="primaryTools" value="${escapeHtml(toolsText)}" placeholder="예: HubSpot, Excel, Slack" />
                </div>
                <div class="ax-intake-field">
                  <label>주요 수작업 병목 및 고충</label>
                  <textarea class="ax-intake-textarea" data-team-id="${escapeHtml(team.id)}" data-team-field="painPoints" placeholder="반복적인 복사·붙여넣기, 수동 대사, 승인 지연 등을 입력하세요...">${escapeHtml(team.painPoints)}</textarea>
                </div>
              </div>
            </div>
          `;
        })
        .join('')
    : `<div class="ax-intake-empty">등록된 팀이 없습니다. <strong>+ 팀 추가</strong> 버튼을 눌러 부서별 수작업 시간을 입력하세요.</div>`;

  return `
    <div class="ax-intake-section-head">
      <div>
        <div class="ax-intake-chapter-kicker">STEP 02 · MANUAL WORKLOAD</div>
        <h2>02. 팀별 수작업</h2>
        <p>진단 대상 부서별 인원 수, 주요 사용 도구, 주간 수작업 시간을 입력하세요.</p>
      </div>
      <button type="button" class="ax-intake-btn ax-intake-btn-add" data-action="add-team">+ 팀 추가</button>
    </div>
    <div class="ax-intake-list">
      ${cardsHtml}
    </div>
  `;
}

function renderStep3(tools) {
  const list = Array.isArray(tools) ? tools : [];
  const cardsHtml = list.length
    ? list
        .map((tool, idx) => {
          const catOptions = TOOL_CATEGORIES.map(
            (cat) => `<option value="${escapeHtml(cat)}" ${tool.category === cat ? 'selected' : ''}>${escapeHtml(cat)}</option>`
          ).join('');
          const hasCustomCat = tool.category && !TOOL_CATEGORIES.includes(tool.category);
          return `
            <div class="ax-intake-item-card" data-tool-id="${escapeHtml(tool.id)}">
              <div class="ax-intake-item-head">
                <div class="ax-intake-item-badge">
                  <span>TOOL ${String(idx + 1).padStart(2, '0')}</span>
                  <span class="ax-intake-pill ${tool.hasApi ? 'is-green' : 'is-slate'}" data-tool-api-pill="${escapeHtml(tool.id)}">${tool.hasApi ? 'API 연동 가능' : 'API 미지원/제한'}</span>
                </div>
                <button type="button" class="ax-intake-btn ax-intake-btn-danger" data-action="remove-tool" data-id="${escapeHtml(tool.id)}">삭제</button>
              </div>
              <div class="ax-intake-grid-3" style="align-items: end;">
                <div class="ax-intake-field">
                  <label>도구 / 소프트웨어명</label>
                  <input class="ax-intake-input" type="text" data-tool-id="${escapeHtml(tool.id)}" data-tool-field="name" value="${escapeHtml(tool.name)}" placeholder="예: Salesforce" />
                </div>
                <div class="ax-intake-field">
                  <label>카테고리</label>
                  <select class="ax-intake-select" data-tool-id="${escapeHtml(tool.id)}" data-tool-field="category">
                    ${catOptions}
                    ${hasCustomCat ? `<option value="${escapeHtml(tool.category)}" selected>${escapeHtml(tool.category)}</option>` : ''}
                  </select>
                </div>
                <div class="ax-intake-field">
                  <label>월간 구독 비용 ($/월)</label>
                  <input class="ax-intake-input" type="number" min="0" step="1" data-tool-id="${escapeHtml(tool.id)}" data-tool-field="monthlyCost" value="${escapeHtml(tool.monthlyCost ?? '')}" placeholder="예: 450" />
                </div>
              </div>
              <div style="margin-top: 12px;">
                <label class="ax-intake-toggle">
                  <input type="checkbox" data-tool-id="${escapeHtml(tool.id)}" data-tool-field="hasApi" ${tool.hasApi ? 'checked' : ''} />
                  <span class="ax-intake-toggle-track"></span>
                  <span class="ax-intake-toggle-label">자동화 연동을 위한 REST API / Webhook 지원</span>
                </label>
              </div>
            </div>
          `;
        })
        .join('')
    : `<div class="ax-intake-empty">등록된 도구가 없습니다. <strong>+ 도구 추가</strong> 버튼을 눌러 고객사의 SaaS 스택을 등록하세요.</div>`;

  return `
    <div class="ax-intake-section-head">
      <div>
        <div class="ax-intake-chapter-kicker">STEP 03 · SOFTWARE STACK</div>
        <h2>03. 도구 스택</h2>
        <p>현재 사용 중인 SaaS 도구, 월간 비용 및 API 연동 가능 여부를 정리하세요.</p>
      </div>
      <button type="button" class="ax-intake-btn ax-intake-btn-add" data-action="add-tool">+ 도구 추가</button>
    </div>
    <div class="ax-intake-list">
      ${cardsHtml}
    </div>
  `;
}

function buildMarkup(state) {
  const client = state?.client || {};
  const teams = Array.isArray(state?.teams) ? state.teams : [];
  const tools = Array.isArray(state?.tools) ? state.tools : [];
  const summary = computeSummary(state);

  const step1Done = Boolean(client.companyName && Number(client.hourlyRate) > 0);
  const step2Done = teams.length > 0;
  const step3Done = tools.length > 0;
  const progressPct = currentStep === 1 ? 33 : currentStep === 2 ? 66 : 100;

  let stepContentHtml = '';
  if (currentStep === 1) stepContentHtml = renderStep1(client);
  else if (currentStep === 2) stepContentHtml = renderStep2(teams);
  else stepContentHtml = renderStep3(tools);

  return `
    <div class="ax-intake-root" data-ax-mounted="intake">
      <div class="ax-intake-layout">
        <section class="ax-intake-main" aria-label="고객사 현황 입력 마법사">
          <div class="ax-intake-stepper">
            <div class="ax-intake-steps" role="tablist" aria-label="입력 단계">
              <button type="button" role="tab" aria-selected="${currentStep === 1}" class="ax-intake-step-btn ${currentStep === 1 ? 'is-active' : ''} ${step1Done ? 'is-complete' : ''}" data-step="1">
                <span class="ax-intake-step-num">${step1Done && currentStep !== 1 ? '✓' : '01'}</span>
                <span class="ax-intake-step-meta">
                  <div class="ax-intake-step-title">01. 기업 프로필</div>
                  <div class="ax-intake-step-sub">${escapeHtml(client.companyName || '기업 정보 및 단가')}</div>
                </span>
              </button>
              <button type="button" role="tab" aria-selected="${currentStep === 2}" class="ax-intake-step-btn ${currentStep === 2 ? 'is-active' : ''} ${step2Done ? 'is-complete' : ''}" data-step="2">
                <span class="ax-intake-step-num">${step2Done && currentStep !== 2 ? '✓' : '02'}</span>
                <span class="ax-intake-step-meta">
                  <div class="ax-intake-step-title">02. 팀별 수작업</div>
                  <div class="ax-intake-step-sub">${teams.length}개 팀 · ${formatNumber(summary.totalWeeklyManualHours)}시간/주</div>
                </span>
              </button>
              <button type="button" role="tab" aria-selected="${currentStep === 3}" class="ax-intake-step-btn ${currentStep === 3 ? 'is-active' : ''} ${step3Done ? 'is-complete' : ''}" data-step="3">
                <span class="ax-intake-step-num">${step3Done && currentStep !== 3 ? '✓' : '03'}</span>
                <span class="ax-intake-step-meta">
                  <div class="ax-intake-step-title">03. 도구 스택</div>
                  <div class="ax-intake-step-sub">${tools.length}개 도구 · ${formatCurrency(summary.totalMonthlyToolSpend)}/월</div>
                </span>
              </button>
            </div>
            <div class="ax-intake-progress-track" aria-hidden="true">
              <div class="ax-intake-progress-fill" style="width: ${progressPct}%"></div>
            </div>
          </div>

          <div class="ax-intake-body">
            ${stepContentHtml}
          </div>

          <div class="ax-intake-footer">
            <div>
              ${currentStep > 1
                ? `<button type="button" class="ax-intake-btn ax-intake-btn-secondary" data-action="prev-step">&larr; 이전 단계</button>`
                : `<span class="ax-intake-hint">STEP 0${currentStep} / 03 · 변경사항 자동 저장됨</span>`}
            </div>
            <div style="display: flex; gap: 10px; align-items: center;">
              ${currentStep < 3
                ? `<button type="button" class="ax-intake-btn ax-intake-btn-primary" data-action="next-step">다음 단계 &rarr;</button>`
                : `<button type="button" class="ax-intake-btn ax-intake-btn-primary" data-action="go-process-map">프로세스 맵으로 이동 &rarr;</button>`}
            </div>
          </div>
        </section>

        <aside class="ax-intake-sidebar" aria-label="실시간 진단 요약">
          <div class="ax-intake-sidebar-kicker">LIVE TELEMETRY</div>
          <h3 class="ax-intake-sidebar-title">실시간 진단 요약</h3>
          <div class="ax-intake-sidebar-client" data-ax-sum="client">${escapeHtml(summary.companyName)} · ${escapeHtml(summary.industry)}</div>

          <div class="ax-intake-kpi-stack">
            <div class="ax-intake-kpi-card">
              <div class="ax-intake-kpi-label">총 주간 수작업 시간</div>
              <div class="ax-intake-kpi-value" data-ax-sum="weekly-hours">${formatNumber(summary.totalWeeklyManualHours)}시간/주</div>
              <div class="ax-intake-kpi-sub" data-ax-sum="weekly-sub">${summary.teamsCount}개 팀 기준 연간 ${formatNumber(summary.totalWeeklyManualHours * 52)}시간</div>
            </div>
            <div class="ax-intake-kpi-card">
              <div class="ax-intake-kpi-label">연간 수작업 인건비 추정</div>
              <div class="ax-intake-kpi-value is-accent" data-ax-sum="annual-labor">${formatCurrency(summary.estimatedAnnualLaborCost)}</div>
              <div class="ax-intake-kpi-sub" data-ax-sum="rate-sub">평균 시간당 인건비 ${formatCurrency(summary.hourlyRate)}/시간 기준</div>
            </div>
            <div class="ax-intake-kpi-card">
              <div class="ax-intake-kpi-label">총 SaaS 도구 지출</div>
              <div class="ax-intake-kpi-value" data-ax-sum="tool-spend">${formatCurrency(summary.totalMonthlyToolSpend)}/월</div>
              <div class="ax-intake-kpi-sub" data-ax-sum="tool-annual">연간 ${formatCurrency(summary.totalAnnualToolSpend)} SaaS 지출</div>
            </div>
          </div>

          <div class="ax-intake-mini-stats">
            <div>
              <div class="ax-intake-mini-num" data-ax-sum="teams-count">${summary.teamsCount}</div>
              <div class="ax-intake-mini-lbl">진단 팀</div>
            </div>
            <div>
              <div class="ax-intake-mini-num" data-ax-sum="tools-count">${summary.toolsCount}</div>
              <div class="ax-intake-mini-lbl">보유 도구</div>
            </div>
            <div>
              <div class="ax-intake-mini-num" data-ax-sum="api-count">${summary.apiReadyCount}/${summary.toolsCount}</div>
              <div class="ax-intake-mini-lbl">API 지원</div>
            </div>
          </div>

          <button type="button" class="ax-intake-cta" data-action="go-process-map">
            프로세스 맵으로 이동 &rarr;
          </button>
        </aside>
      </div>
    </div>
  `;
}

function attachListeners(container, actions) {
  const root = container.querySelector('.ax-intake-root');
  if (!root) return;

  const commitState = (updater) => {
    isInternalStateUpdate = true;
    try {
      actions.setState(updater);
    } finally {
      isInternalStateUpdate = false;
    }
    const latest = typeof actions.getState === 'function' ? actions.getState() : null;
    if (latest) updateSummaryDOM(root, latest);
  };

  root.addEventListener('click', (e) => {
    const stepBtn = e.target.closest('[data-step]');
    if (stepBtn) {
      const next = Number(stepBtn.getAttribute('data-step'));
      if (next >= 1 && next <= 3 && next !== currentStep) {
        currentStep = next;
        const latest = typeof actions.getState === 'function' ? actions.getState() : {};
        renderFull(container, latest, actions);
      }
      return;
    }

    const actionEl = e.target.closest('[data-action]');
    if (!actionEl) return;
    const action = actionEl.getAttribute('data-action');

    if (action === 'prev-step') {
      currentStep = Math.max(1, currentStep - 1);
      renderFull(container, actions.getState(), actions);
    } else if (action === 'next-step') {
      currentStep = Math.min(3, currentStep + 1);
      renderFull(container, actions.getState(), actions);
    } else if (action === 'go-process-map') {
      if (typeof actions?.navigateTo === 'function') {
        actions.navigateTo('process-map');
      }
    } else if (action === 'add-team') {
      const newId = 'team_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 6);
      commitState((prev) => ({
        ...prev,
        teams: [
          ...(Array.isArray(prev.teams) ? prev.teams : []),
          {
            id: newId,
            name: '',
            headcount: 1,
            primaryTools: [],
            weeklyManualHours: 0,
            painPoints: ''
          }
        ]
      }));
      renderFull(container, actions.getState(), actions);
    } else if (action === 'remove-team') {
      const id = actionEl.getAttribute('data-id');
      commitState((prev) => ({
        ...prev,
        teams: (Array.isArray(prev.teams) ? prev.teams : []).filter((t) => t.id !== id)
      }));
      renderFull(container, actions.getState(), actions);
    } else if (action === 'add-tool') {
      const newId = 'tool_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 6);
      commitState((prev) => ({
        ...prev,
        tools: [
          ...(Array.isArray(prev.tools) ? prev.tools : []),
          {
            id: newId,
            name: '',
            category: 'CRM',
            monthlyCost: 0,
            hasApi: true
          }
        ]
      }));
      renderFull(container, actions.getState(), actions);
    } else if (action === 'remove-tool') {
      const id = actionEl.getAttribute('data-id');
      commitState((prev) => ({
        ...prev,
        tools: (Array.isArray(prev.tools) ? prev.tools : []).filter((t) => t.id !== id)
      }));
      renderFull(container, actions.getState(), actions);
    }
  });

  const handleFieldChange = (e) => {
    const target = e.target;
    if (!target) return;

    const clientField = target.getAttribute('data-client-field');
    if (clientField) {
      const isNum = target.type === 'number';
      const val = isNum ? (target.value === '' ? 0 : Number(target.value)) : target.value;
      commitState((prev) => ({
        ...prev,
        client: {
          ...(prev.client || {}),
          [clientField]: val
        }
      }));
      return;
    }

    const teamField = target.getAttribute('data-team-field');
    if (teamField) {
      const teamId = target.getAttribute('data-team-id');
      let val;
      if (teamField === 'primaryTools') {
        val = target.value
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);
      } else if (target.type === 'number') {
        val = target.value === '' ? 0 : Number(target.value);
      } else {
        val = target.value;
      }

      commitState((prev) => ({
        ...prev,
        teams: (Array.isArray(prev.teams) ? prev.teams : []).map((t) =>
          t.id === teamId ? { ...t, [teamField]: val } : t
        )
      }));

      if (teamField === 'weeklyManualHours') {
        const pill = root.querySelector(`[data-team-hours-pill="${CSS.escape(teamId)}"]`);
        if (pill) pill.textContent = `${formatNumber(val)}시간/주`;
      }
      return;
    }

    const toolField = target.getAttribute('data-tool-field');
    if (toolField) {
      const toolId = target.getAttribute('data-tool-id');
      let val;
      if (target.type === 'checkbox') {
        val = Boolean(target.checked);
      } else if (target.type === 'number') {
        val = target.value === '' ? 0 : Number(target.value);
      } else {
        val = target.value;
      }

      commitState((prev) => ({
        ...prev,
        tools: (Array.isArray(prev.tools) ? prev.tools : []).map((t) =>
          t.id === toolId ? { ...t, [toolField]: val } : t
        )
      }));

      if (toolField === 'hasApi') {
        const pill = root.querySelector(`[data-tool-api-pill="${CSS.escape(toolId)}"]`);
        if (pill) {
          pill.textContent = val ? 'API 연동 가능' : 'API 미지원/제한';
          pill.className = `ax-intake-pill ${val ? 'is-green' : 'is-slate'}`;
        }
      }
    }
  };

  root.addEventListener('input', handleFieldChange);
  root.addEventListener('change', (e) => {
    if (e.target && (e.target.tagName === 'SELECT' || e.target.type === 'checkbox' || e.target.type === 'date')) {
      handleFieldChange(e);
    }
  });
}

function renderFull(container, state, actions) {
  container.innerHTML = buildMarkup(state);
  attachListeners(container, actions);
}

export function renderIntake(container, state, actions) {
  if (!container) return;
  injectStyles();

  const existingRoot = container.querySelector('.ax-intake-root[data-ax-mounted="intake"]');
  const activeInside = existingRoot && container.contains(document.activeElement);

  if (existingRoot && (isInternalStateUpdate || activeInside)) {
    updateSummaryDOM(existingRoot, state);
    return;
  }

  renderFull(container, state, actions);
}

// Auto AX — Visual Process Map & Manual Handoff Audit
// Owns ONLY src/modules/process-map.js

const STYLE_ID = 'auto-ax-process-map-styles';

// Module-level UI state so re-renders triggered by actions.setState preserve active filter/editor state
const uiState = {
  filter: 'all', // 'all' | 'manual'
  modalMode: null, // null | 'add' | 'edit'
  editingId: null,
};

function ensureStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    .pm-root {
      display: flex;
      flex-direction: column;
      gap: 18px;
      color: var(--ink, #262E33);
      font-family: 'Noto Sans KR', 'Open Sans', 'Malgun Gothic', sans-serif;
      width: 100%;
      min-width: 0;
      max-width: 100%;
      box-sizing: border-box;
    }
    .pm-root *, .pm-root *::before, .pm-root *::after {
      box-sizing: border-box;
    }

    /* Precision Med-Tech Header Bar */
    .pm-header {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;
      justify-content: space-between;
      gap: 14px;
      background: var(--bg-surface, #FFFFFF);
      border: 1px solid var(--line, #C3DAD9);
      border-top: 3px solid var(--accent, #01B2A9);
      border-radius: 6px;
      padding: 18px 20px;
      box-shadow: 0 2px 8px rgba(17, 23, 34, 0.04);
    }
    .pm-eyebrow {
      display: block;
      font-family: 'Montserrat', 'Noto Sans KR', sans-serif;
      font-size: 0.7rem;
      font-weight: 800;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--accent-dark, #009B93);
      margin-bottom: 4px;
    }
    .pm-title-group h2 {
      margin: 0;
      font-family: 'Noto Sans KR', 'Montserrat', sans-serif;
      font-size: 1.28rem;
      font-weight: 800;
      color: var(--ink-strong, #111722);
      letter-spacing: -0.02em;
      line-height: 1.3;
    }
    .pm-title-group p {
      margin: 4px 0 0;
      font-size: 0.83rem;
      color: var(--ink-muted, #768B99);
    }
    .pm-controls {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 10px;
    }

    /* Segmented Filter */
    .pm-segmented {
      display: inline-flex;
      background: var(--bg-paper, #F5F8F8);
      padding: 3px;
      border-radius: 6px;
      border: 1px solid var(--line, #C3DAD9);
    }
    .pm-seg-btn {
      border: none;
      background: transparent;
      color: var(--ink-muted, #768B99);
      font-size: 0.78rem;
      font-weight: 700;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.15s, color 0.15s;
    }
    .pm-seg-btn.active {
      background: var(--bg-surface, #FFFFFF);
      color: var(--ink-strong, #111722);
      box-shadow: 0 1px 3px rgba(17, 23, 34, 0.08);
    }

    /* Platform Buttons */
    .pm-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.81rem;
      font-weight: 700;
      padding: 8px 15px;
      border-radius: 6px;
      border: 1px solid transparent;
      cursor: pointer;
      transition: background 0.15s, border-color 0.15s, transform 0.12s;
      white-space: nowrap;
    }
    .pm-btn:active {
      transform: translateY(1px);
    }
    .pm-btn-secondary {
      background: var(--bg-surface, #FFFFFF);
      color: var(--ink-strong, #111722);
      border-color: var(--line, #C3DAD9);
    }
    .pm-btn-secondary:hover {
      background: var(--accent-soft, #E3EDEC);
      border-color: var(--accent, #01B2A9);
    }
    .pm-btn-primary {
      background: var(--accent, #01B2A9);
      color: #FFFFFF;
    }
    .pm-btn-primary:hover {
      background: var(--accent-dark, #009B93);
    }

    /* 4-Column Precision KPI Strip */
    .pm-kpi-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 12px;
    }
    @media (max-width: 900px) {
      .pm-kpi-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
    .pm-kpi-card {
      background: var(--bg-surface, #FFFFFF);
      border: 1px solid var(--line, #C3DAD9);
      border-radius: 6px;
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      box-shadow: 0 1px 4px rgba(17, 23, 34, 0.03);
    }
    .pm-kpi-card.is-warn {
      border-top: 3px solid #FFD171;
    }
    .pm-kpi-card.is-danger {
      border-top: 3px solid #D94848;
    }
    .pm-kpi-label {
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      color: var(--ink-muted, #768B99);
    }
    .pm-kpi-value {
      font-family: 'Montserrat', 'Noto Sans KR', sans-serif;
      font-size: 1.52rem;
      font-weight: 800;
      color: var(--ink-strong, #111722);
      line-height: 1.2;
      font-variant-numeric: tabular-nums;
    }
    .pm-kpi-card.is-danger .pm-kpi-value {
      color: #D94848;
    }
    .pm-kpi-sub {
      font-size: 0.74rem;
      color: var(--ink-muted, #768B99);
    }

    /* Clinical Precision Flow Canvas */
    .pm-flow-wrapper {
      background: var(--bg-paper, #F5F8F8);
      background-image: radial-gradient(rgba(1, 178, 169, 0.16) 1px, transparent 1px);
      background-size: 18px 18px;
      border: 1px solid var(--line, #C3DAD9);
      border-radius: 6px;
      padding: 22px 20px;
      overflow-x: auto;
      overflow-y: hidden;
      width: 100%;
      min-width: 0;
      max-width: 100%;
    }
    .pm-flow-track {
      display: flex;
      flex-direction: row;
      align-items: stretch;
      gap: 0;
      min-width: min-content;
      padding-bottom: 6px;
    }

    /* Process Node Card */
    .pm-node {
      width: 282px;
      flex: 0 0 282px;
      background: var(--bg-surface, #FFFFFF);
      border: 1px solid var(--line, #C3DAD9);
      border-top: 3px solid var(--accent, #01B2A9);
      border-radius: 6px;
      padding: 15px 15px 13px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      box-shadow: 0 2px 8px rgba(17, 23, 34, 0.04);
      position: relative;
      transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
    }
    .pm-node:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(17, 23, 34, 0.08);
    }
    .pm-node.handoff-medium,
    .pm-node.handoff-low {
      border-top-color: #FFD171;
      background: linear-gradient(180deg, #FFFDF5 0%, #FFFFFF 54px);
    }
    .pm-node.handoff-high {
      border-color: #F2B8B8;
      border-top: 3px solid #D94848;
      background: linear-gradient(180deg, #FDF2F2 0%, #FFFFFF 54px);
    }

    .pm-node-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
      padding-bottom: 8px;
      border-bottom: 1px solid #E3EDEC;
    }
    .pm-step-num {
      font-family: 'Montserrat', 'Noto Sans KR', sans-serif;
      font-size: 0.84rem;
      font-weight: 800;
      color: var(--ink-strong, #111722);
      letter-spacing: 0.03em;
    }
    .pm-flag-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.02em;
      padding: 3px 8px;
      border-radius: 4px;
    }
    .pm-flag-high {
      background: #FDF0F0;
      color: #D94848;
      border: 1px solid #F2B8B8;
    }
    .pm-flag-medium {
      background: #FFF8E1;
      color: #8A5E00;
      border: 1px solid #FFD171;
    }
    .pm-flag-low {
      background: #FFFBEB;
      color: #7D5A00;
      border: 1px solid #FFE29E;
    }
    .pm-flag-auto {
      background: #E3EDEC;
      color: #009B93;
      border: 1px solid #C3DAD9;
    }

    .pm-node-title {
      margin: 0;
      font-family: 'Noto Sans KR', sans-serif;
      font-size: 0.96rem;
      font-weight: 700;
      color: var(--ink-strong, #111722);
      line-height: 1.38;
    }

    .pm-meta-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .pm-chip {
      font-size: 0.72rem;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 4px;
      background: var(--bg-paper, #F5F8F8);
      color: var(--ink, #262E33);
      border: 1px solid var(--line, #C3DAD9);
    }
    .pm-chip-tool {
      background: #E3EDEC;
      color: #006B65;
      border-color: #C3DAD9;
    }

    .pm-time-box {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      background: var(--bg-paper, #F5F8F8);
      border: 1px solid var(--line, #C3DAD9);
      border-radius: 4px;
      padding: 7px 10px;
    }
    .pm-time-hrs {
      font-family: 'Montserrat', 'Noto Sans KR', sans-serif;
      font-size: 0.92rem;
      font-weight: 800;
      color: var(--ink-strong, #111722);
      font-variant-numeric: tabular-nums;
    }
    .pm-time-detail {
      font-size: 0.72rem;
      color: var(--ink-muted, #768B99);
    }

    .pm-handoff-box {
      font-size: 0.74rem;
      padding: 7px 9px;
      border-radius: 4px;
      background: #FFF8E1;
      border-left: 3px solid #FFD171;
      color: #7D5A00;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .pm-handoff-box.is-high {
      background: #FDF0F0;
      border-left-color: #D94848;
      color: #B42323;
    }
    .pm-handoff-route {
      font-weight: 700;
    }

    .pm-notes {
      margin: 0;
      font-size: 0.76rem;
      color: var(--ink-muted, #768B99);
      line-height: 1.45;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .pm-node-footer {
      margin-top: auto;
      padding-top: 9px;
      border-top: 1px solid #E3EDEC;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .pm-inline-controls {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
    }
    .pm-toggle-label {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.74rem;
      font-weight: 600;
      color: var(--ink, #262E33);
      cursor: pointer;
    }
    .pm-toggle-label input[type="checkbox"] {
      accent-color: #01B2A9;
    }
    .pm-risk-select {
      font-size: 0.72rem;
      font-weight: 600;
      padding: 3px 6px;
      border-radius: 4px;
      border: 1px solid var(--line, #C3DAD9);
      background: var(--bg-surface, #FFFFFF);
      color: var(--ink, #262E33);
      cursor: pointer;
    }
    .pm-card-actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 6px;
    }
    .pm-mini-btn {
      font-size: 0.72rem;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 4px;
      border: 1px solid var(--line, #C3DAD9);
      background: var(--bg-surface, #FFFFFF);
      color: var(--ink, #262E33);
      cursor: pointer;
      transition: background 0.12s, border-color 0.12s;
    }
    .pm-mini-btn:hover {
      background: var(--accent-soft, #E3EDEC);
      border-color: var(--accent, #01B2A9);
    }
    .pm-mini-btn.danger {
      color: #D94848;
      border-color: #F2B8B8;
    }
    .pm-mini-btn.danger:hover {
      background: #FDF0F0;
      border-color: #D94848;
    }

    /* Teal / Risk Connector Arrow between nodes */
    .pm-connector {
      flex: 0 0 64px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0 4px;
      position: relative;
    }
    .pm-connector-label {
      font-size: 0.64rem;
      font-weight: 700;
      letter-spacing: 0.03em;
      padding: 2px 6px;
      border-radius: 4px;
      margin-bottom: 4px;
      text-align: center;
      white-space: nowrap;
    }
    .pm-connector-label.manual {
      background: #FFF8E1;
      color: #8A5E00;
      border: 1px solid #FFD171;
    }
    .pm-connector-label.high {
      background: #FDF0F0;
      color: #D94848;
      border: 1px solid #F2B8B8;
    }
    .pm-connector-label.auto {
      background: #E3EDEC;
      color: #009B93;
      border: 1px solid #C3DAD9;
    }

    /* Empty State */
    .pm-empty {
      text-align: center;
      padding: 36px 20px;
      color: var(--ink-muted, #768B99);
      font-size: 0.9rem;
    }

    /* Modal */
    .pm-modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(17, 23, 34, 0.52);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 16px;
    }
    .pm-modal {
      background: var(--bg-surface, #FFFFFF);
      border: 1px solid var(--line, #C3DAD9);
      border-top: 3px solid var(--accent, #01B2A9);
      border-radius: 6px;
      width: 100%;
      max-width: 540px;
      max-height: 90vh;
      overflow-y: auto;
      padding: 22px;
      box-shadow: 0 24px 48px rgba(17, 23, 34, 0.25);
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .pm-modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 10px;
      border-bottom: 1px solid #E3EDEC;
    }
    .pm-modal-header h3 {
      margin: 0;
      font-family: 'Noto Sans KR', sans-serif;
      font-size: 1.08rem;
      font-weight: 800;
      color: var(--ink-strong, #111722);
    }
    .pm-form-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px 12px;
    }
    .pm-field {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .pm-field.full {
      grid-column: 1 / -1;
    }
    .pm-field label {
      font-size: 0.74rem;
      font-weight: 700;
      color: var(--ink-strong, #111722);
    }
    .pm-field input,
    .pm-field select,
    .pm-field textarea {
      font-family: inherit;
      font-size: 0.84rem;
      padding: 7px 10px;
      border: 1px solid var(--line, #C3DAD9);
      border-radius: 4px;
      color: var(--ink-strong, #111722);
      background: #FFFFFF;
    }
    .pm-field input:focus,
    .pm-field select:focus,
    .pm-field textarea:focus {
      outline: 2px solid var(--accent, #01B2A9);
      outline-offset: -1px;
    }
    .pm-field textarea {
      resize: vertical;
      min-height: 60px;
    }
    .pm-modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      padding-top: 10px;
      border-top: 1px solid #E3EDEC;
    }
  `;
  document.head.appendChild(style);
}

function escapeHtml(value) {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function calcWeeklyHours(step) {
  const mins = Number(step.minutesPerRun) || 0;
  const runs = Number(step.runsPerWeek) || 0;
  return (mins * runs) / 60;
}

function getSortedSteps(state) {
  const list = Array.isArray(state?.processSteps) ? [...state.processSteps] : [];
  return list.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
}

const RISK_LABELS = {
  low: '낮음',
  medium: '보통',
  high: '높음',
};

function renderConnector(nextStep) {
  const isManual = Boolean(nextStep?.isManualHandoff);
  const risk = nextStep?.handoffRisk || 'medium';
  const labelClass = isManual ? (risk === 'high' ? 'high' : 'manual') : 'auto';
  const labelText = isManual ? (risk === 'high' ? '고위험' : '수동 인계') : '다음';
  const strokeColor = isManual ? (risk === 'high' ? '#D94848' : '#E5A93C') : '#01B2A9';

  return `
    <div class="pm-connector" aria-hidden="true">
      <span class="pm-connector-label ${labelClass}">${labelText}</span>
      <svg width="46" height="18" viewBox="0 0 46 18" fill="none">
        <line x1="2" y1="9" x2="38" y2="9" stroke="${strokeColor}" stroke-width="2.2" ${isManual ? 'stroke-dasharray="4 3"' : ''} />
        <polyline points="32,3 40,9 32,15" fill="none" stroke="${strokeColor}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
  `;
}

function renderStepCard(step) {
  const weeklyHrs = calcWeeklyHours(step);
  const isManual = Boolean(step.isManualHandoff);
  const risk = ['low', 'medium', 'high'].includes(step.handoffRisk) ? step.handoffRisk : 'medium';
  const riskLabel = RISK_LABELS[risk] || '보통';

  const nodeClass = isManual ? `handoff-${risk}` : '';
  const flagBadge = isManual
    ? `<span class="pm-flag-badge pm-flag-${risk}">&#9888; 수동 인계 &middot; ${escapeHtml(riskLabel)}</span>`
    : `<span class="pm-flag-badge pm-flag-auto">&#10003; 자동화/연동</span>`;

  const handoffRoute = isManual
    ? `
      <div class="pm-handoff-box ${risk === 'high' ? 'is-high' : ''}">
        <span class="pm-handoff-route">${escapeHtml(step.handoffFrom || step.ownerTeam || '출발 팀')} &rarr; ${escapeHtml(step.handoffTo || '다음 팀')}</span>
        <span>수동 데이터 전달 및 재입력</span>
      </div>
    `
    : '';

  return `
    <article class="pm-node ${nodeClass}" data-step-id="${escapeHtml(step.id)}">
      <div class="pm-node-top">
        <span class="pm-step-num">${String(Number(step.order) || 0).padStart(2, '0')}</span>
        ${flagBadge}
      </div>

      <h3 class="pm-node-title">${escapeHtml(step.title || '제목 없는 단계')}</h3>

      <div class="pm-meta-row">
        <span class="pm-chip">${escapeHtml(step.ownerTeam || '미지정')}</span>
        <span class="pm-chip pm-chip-tool">${escapeHtml(step.toolUsed || '수동 / 이메일')}</span>
      </div>

      <div class="pm-time-box">
        <span class="pm-time-hrs">주 ${weeklyHrs.toFixed(1)}시간</span>
        <span class="pm-time-detail">${Number(step.minutesPerRun) || 0}분 &times; 주 ${Number(step.runsPerWeek) || 0}회</span>
      </div>

      ${handoffRoute}

      ${step.notes ? `<p class="pm-notes" title="${escapeHtml(step.notes)}">${escapeHtml(step.notes)}</p>` : ''}

      <div class="pm-node-footer">
        <div class="pm-inline-controls">
          <label class="pm-toggle-label">
            <input
              type="checkbox"
              data-action="toggle-handoff"
              data-step-id="${escapeHtml(step.id)}"
              ${isManual ? 'checked' : ''}
            />
            수동 인계
          </label>
          ${
            isManual
              ? `
            <select
              class="pm-risk-select"
              data-action="change-risk"
              data-step-id="${escapeHtml(step.id)}"
              aria-label="인계 위험도"
            >
              <option value="low" ${risk === 'low' ? 'selected' : ''}>위험도: 낮음</option>
              <option value="medium" ${risk === 'medium' ? 'selected' : ''}>위험도: 보통</option>
              <option value="high" ${risk === 'high' ? 'selected' : ''}>위험도: 높음</option>
            </select>
          `
              : ''
          }
        </div>
        <div class="pm-card-actions">
          <button type="button" class="pm-mini-btn" data-action="edit-step" data-step-id="${escapeHtml(step.id)}">수정</button>
          <button type="button" class="pm-mini-btn danger" data-action="delete-step" data-step-id="${escapeHtml(step.id)}">삭제</button>
        </div>
      </div>
    </article>
  `;
}

function renderModal(state, steps) {
  if (!uiState.modalMode) return '';
  const isEdit = uiState.modalMode === 'edit';
  const existing = isEdit ? steps.find((s) => s.id === uiState.editingId) : null;
  if (isEdit && !existing) {
    uiState.modalMode = null;
    uiState.editingId = null;
    return '';
  }

  const nextOrder = steps.length > 0 ? Math.max(...steps.map((s) => Number(s.order) || 0)) + 1 : 1;
  const draft = existing || {
    order: nextOrder,
    title: '',
    ownerTeam: state?.teams?.[0]?.name || '',
    toolUsed: state?.tools?.[0]?.name || '',
    minutesPerRun: 15,
    runsPerWeek: 10,
    isManualHandoff: true,
    handoffFrom: '',
    handoffTo: '',
    handoffRisk: 'medium',
    notes: '',
  };

  const teamOptions = (state?.teams || [])
    .map((t) => `<option value="${escapeHtml(t.name)}"></option>`)
    .join('');
  const toolOptions = (state?.tools || [])
    .map((t) => `<option value="${escapeHtml(t.name)}"></option>`)
    .join('');

  return `
    <div class="pm-modal-backdrop" data-action="close-modal-backdrop">
      <div class="pm-modal" role="dialog" aria-modal="true" aria-labelledby="pm-modal-title">
        <div class="pm-modal-header">
          <h3 id="pm-modal-title">${isEdit ? '프로세스 단계 수정' : '프로세스 단계 추가'}</h3>
          <button type="button" class="pm-mini-btn" data-action="close-modal">닫기</button>
        </div>
        <form id="pm-step-form">
          <div class="pm-form-grid">
            <div class="pm-field full">
              <label for="pm-f-title">단계명 *</label>
              <input id="pm-f-title" name="title" type="text" required value="${escapeHtml(draft.title)}" placeholder="예: 이메일 리드 정보를 CRM에 수동 입력" />
            </div>
            <div class="pm-field">
              <label for="pm-f-order">순서</label>
              <input id="pm-f-order" name="order" type="number" min="1" required value="${Number(draft.order) || 1}" />
            </div>
            <div class="pm-field">
              <label for="pm-f-team">담당 팀</label>
              <input id="pm-f-team" name="ownerTeam" type="text" list="pm-team-list" value="${escapeHtml(draft.ownerTeam)}" placeholder="예: 영업운영팀" />
              <datalist id="pm-team-list">${teamOptions}</datalist>
            </div>
            <div class="pm-field">
              <label for="pm-f-tool">주요 사용 도구</label>
              <input id="pm-f-tool" name="toolUsed" type="text" list="pm-tool-list" value="${escapeHtml(draft.toolUsed)}" placeholder="예: 더존 ERP / 엑셀" />
              <datalist id="pm-tool-list">${toolOptions}</datalist>
            </div>
            <div class="pm-field">
              <label for="pm-f-risk">인계 위험도</label>
              <select id="pm-f-risk" name="handoffRisk">
                <option value="low" ${draft.handoffRisk === 'low' ? 'selected' : ''}>낮음</option>
                <option value="medium" ${draft.handoffRisk === 'medium' ? 'selected' : ''}>보통</option>
                <option value="high" ${draft.handoffRisk === 'high' ? 'selected' : ''}>높음</option>
              </select>
            </div>
            <div class="pm-field">
              <label for="pm-f-mins">회당 소요 시간 (분)</label>
              <input id="pm-f-mins" name="minutesPerRun" type="number" min="0" step="1" required value="${Number(draft.minutesPerRun) || 0}" />
            </div>
            <div class="pm-field">
              <label for="pm-f-runs">주간 실행 횟수</label>
              <input id="pm-f-runs" name="runsPerWeek" type="number" min="0" step="1" required value="${Number(draft.runsPerWeek) || 0}" />
            </div>
            <div class="pm-field full">
              <label class="pm-toggle-label">
                <input id="pm-f-manual" name="isManualHandoff" type="checkbox" ${draft.isManualHandoff ? 'checked' : ''} />
                수동 인계 단계로 표시 (담당자의 복사/붙여넣기, 이메일 전달, 파일 수동 업로드 필요)
              </label>
            </div>
            <div class="pm-field">
              <label for="pm-f-from">인계 출발 (From)</label>
              <input id="pm-f-from" name="handoffFrom" type="text" value="${escapeHtml(draft.handoffFrom)}" placeholder="예: 접수 양식" />
            </div>
            <div class="pm-field">
              <label for="pm-f-to">인계 도착 (To)</label>
              <input id="pm-f-to" name="handoffTo" type="text" value="${escapeHtml(draft.handoffTo)}" placeholder="예: 정산 시트" />
            </div>
            <div class="pm-field full">
              <label for="pm-f-notes">진단 메모</label>
              <textarea id="pm-f-notes" name="notes" placeholder="병목 원인, 오류 발생 빈도, 자동화 기회 등을 기록하세요...">${escapeHtml(draft.notes)}</textarea>
            </div>
          </div>
          <div class="pm-modal-actions">
            <button type="button" class="pm-btn pm-btn-secondary" data-action="close-modal">취소</button>
            <button type="submit" class="pm-btn pm-btn-primary">${isEdit ? '변경사항 저장' : '단계 추가'}</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

export function renderProcessMap(container, state, actions) {
  if (!container) return;
  ensureStyles();

  const currentState = state || actions.getState();
  const allSteps = getSortedSteps(currentState);
  const manualSteps = allSteps.filter((s) => Boolean(s.isManualHandoff));
  const highRiskSteps = manualSteps.filter((s) => s.handoffRisk === 'high');

  const totalHandoffHours = manualSteps.reduce((sum, s) => sum + calcWeeklyHours(s), 0);
  const totalWorkflowHours = allSteps.reduce((sum, s) => sum + calcWeeklyHours(s), 0);

  const visibleSteps = uiState.filter === 'manual' ? manualSteps : allSteps;

  const flowHtml =
    visibleSteps.length === 0
      ? `<div class="pm-empty">조건에 맞는 프로세스 단계가 없습니다. <strong>+ 단계 추가</strong>를 클릭하거나 <strong>전체 단계</strong>로 전환하세요.</div>`
      : visibleSteps
          .map((step, idx) => {
            const card = renderStepCard(step);
            const nextStep = visibleSteps[idx + 1];
            return nextStep ? card + renderConnector(nextStep) : card;
          })
          .join('');

  container.innerHTML = `
    <section class="pm-root" aria-label="프로세스 맵">
      <header class="pm-header">
        <div class="pm-title-group">
          <span class="pm-eyebrow">02 &middot; WORKFLOW TOPOLOGY</span>
          <h2>프로세스 맵 &amp; 수동 인계(Handoff) 진단</h2>
          <p>업무 흐름의 각 단계와 주간 소요 시간, 병목을 유발하는 수동 인계 구간을 정밀하게 파악합니다.</p>
        </div>
        <div class="pm-controls">
          <div class="pm-segmented" role="group" aria-label="프로세스 단계 필터">
            <button
              type="button"
              class="pm-seg-btn ${uiState.filter === 'all' ? 'active' : ''}"
              data-action="set-filter"
              data-filter="all"
            >전체 단계 (${allSteps.length})</button>
            <button
              type="button"
              class="pm-seg-btn ${uiState.filter === 'manual' ? 'active' : ''}"
              data-action="set-filter"
              data-filter="manual"
            >수동 인계만 (${manualSteps.length})</button>
          </div>
          <button type="button" class="pm-btn pm-btn-secondary" data-action="open-add">+ 단계 추가</button>
          <button type="button" class="pm-btn pm-btn-primary" data-action="continue-scorecard">스코어카드로 이동 &rarr;</button>
        </div>
      </header>

      <div class="pm-kpi-grid">
        <div class="pm-kpi-card">
          <span class="pm-kpi-label">전체 프로세스 단계</span>
          <span class="pm-kpi-value">${allSteps.length}개</span>
          <span class="pm-kpi-sub">총 주 ${totalWorkflowHours.toFixed(1)}시간 매핑됨</span>
        </div>
        <div class="pm-kpi-card is-warn">
          <span class="pm-kpi-label">수동 인계 구간</span>
          <span class="pm-kpi-value">${manualSteps.length}건</span>
          <span class="pm-kpi-sub">전체 단계의 ${allSteps.length ? Math.round((manualSteps.length / allSteps.length) * 100) : 0}%</span>
        </div>
        <div class="pm-kpi-card is-danger">
          <span class="pm-kpi-label">고위험 수동 인계</span>
          <span class="pm-kpi-value">${highRiskSteps.length}건</span>
          <span class="pm-kpi-sub">우선 자동화 검토 대상</span>
        </div>
        <div class="pm-kpi-card is-warn">
          <span class="pm-kpi-label">주간 수동 인계 시간</span>
          <span class="pm-kpi-value">${totalHandoffHours.toFixed(1)}시간</span>
          <span class="pm-kpi-sub">연간 약 ${Math.round(totalHandoffHours * 52)}시간 수작업 소모</span>
        </div>
      </div>

      <div class="pm-flow-wrapper" aria-label="업무 흐름 다이어그램">
        <div class="pm-flow-track">
          ${flowHtml}
        </div>
      </div>

      ${renderModal(currentState, allSteps)}
    </section>
  `;

  // Event wiring (fresh per render since container.innerHTML was replaced)
  const root = container.querySelector('.pm-root');
  if (!root) return;

  root.addEventListener('click', (e) => {
    const target = e.target.closest('[data-action]');
    if (!target) return;
    const action = target.dataset.action;

    if (action === 'set-filter') {
      uiState.filter = target.dataset.filter === 'manual' ? 'manual' : 'all';
      renderProcessMap(container, actions.getState(), actions);
      return;
    }

    if (action === 'open-add') {
      uiState.modalMode = 'add';
      uiState.editingId = null;
      renderProcessMap(container, actions.getState(), actions);
      return;
    }

    if (action === 'edit-step') {
      uiState.modalMode = 'edit';
      uiState.editingId = target.dataset.stepId;
      renderProcessMap(container, actions.getState(), actions);
      return;
    }

    if (action === 'delete-step') {
      const stepId = target.dataset.stepId;
      actions.setState((prev) => ({
        ...prev,
        processSteps: (prev.processSteps || []).filter((s) => s.id !== stepId),
      }));
      renderProcessMap(container, actions.getState(), actions);
      return;
    }

    if (action === 'close-modal') {
      uiState.modalMode = null;
      uiState.editingId = null;
      renderProcessMap(container, actions.getState(), actions);
      return;
    }

    if (action === 'close-modal-backdrop' && e.target === target) {
      uiState.modalMode = null;
      uiState.editingId = null;
      renderProcessMap(container, actions.getState(), actions);
      return;
    }

    if (action === 'continue-scorecard') {
      actions.navigateTo('scorecard');
    }
  });

  root.addEventListener('change', (e) => {
    const target = e.target;
    const action = target?.dataset?.action;
    if (!action) return;
    const stepId = target.dataset.stepId;

    if (action === 'toggle-handoff') {
      const checked = Boolean(target.checked);
      actions.setState((prev) => ({
        ...prev,
        processSteps: (prev.processSteps || []).map((s) =>
          s.id === stepId ? { ...s, isManualHandoff: checked } : s
        ),
      }));
      renderProcessMap(container, actions.getState(), actions);
      return;
    }

    if (action === 'change-risk') {
      const risk = target.value;
      actions.setState((prev) => ({
        ...prev,
        processSteps: (prev.processSteps || []).map((s) =>
          s.id === stepId ? { ...s, handoffRisk: risk } : s
        ),
      }));
      renderProcessMap(container, actions.getState(), actions);
    }
  });

  const form = root.querySelector('#pm-step-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const stepPayload = {
        order: Math.max(1, Number(fd.get('order')) || 1),
        title: String(fd.get('title') || '').trim() || '제목 없는 단계',
        ownerTeam: String(fd.get('ownerTeam') || '').trim(),
        toolUsed: String(fd.get('toolUsed') || '').trim(),
        minutesPerRun: Math.max(0, Number(fd.get('minutesPerRun')) || 0),
        runsPerWeek: Math.max(0, Number(fd.get('runsPerWeek')) || 0),
        isManualHandoff: form.querySelector('#pm-f-manual')?.checked || false,
        handoffFrom: String(fd.get('handoffFrom') || '').trim(),
        handoffTo: String(fd.get('handoffTo') || '').trim(),
        handoffRisk: String(fd.get('handoffRisk') || 'medium'),
        notes: String(fd.get('notes') || '').trim(),
      };

      const isEdit = uiState.modalMode === 'edit' && uiState.editingId;
      const editId = uiState.editingId;
      uiState.modalMode = null;
      uiState.editingId = null;

      actions.setState((prev) => {
        const current = Array.isArray(prev.processSteps) ? prev.processSteps : [];
        if (isEdit) {
          return {
            ...prev,
            processSteps: current.map((s) => (s.id === editId ? { ...s, ...stepPayload } : s)),
          };
        }
        const newId = `step-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
        return {
          ...prev,
          processSteps: [...current, { id: newId, ...stepPayload }],
        };
      });
      renderProcessMap(container, actions.getState(), actions);
    });
  }
}

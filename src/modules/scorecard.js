const STYLE_ID = 'auto-ax-scorecard-styles';

function ensureStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    .sc-root {
      display: flex;
      flex-direction: column;
      gap: 16px;
      color: var(--ink, #262E33);
      font-family: var(--font-sans, 'Pretendard', 'Noto Sans KR', 'Malgun Gothic', -apple-system, BlinkMacSystemFont, sans-serif);
      max-width: 100%;
      box-sizing: border-box;
    }
    .sc-root *, .sc-root *::before, .sc-root *::after {
      box-sizing: border-box;
    }

    /* MedTech Platform Header & KPI Strip */
    .sc-header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      background: var(--bg-surface, #FFFFFF);
      border: 1px solid var(--line, #C3DAD9);
      border-top: 3px solid var(--accent, #01B2A9);
      border-radius: 8px;
      padding: 16px 20px;
      box-shadow: 0 2px 10px rgba(17, 23, 34, 0.04);
    }
    .sc-title-block h2 {
      margin: 0;
      font-family: var(--font-sans, 'Noto Sans KR', sans-serif);
      font-size: 19px;
      font-weight: 700;
      color: var(--ink-strong, #111722);
      letter-spacing: -0.02em;
    }
    .sc-title-block p {
      margin: 4px 0 0;
      font-size: 12.5px;
      color: var(--ink-muted, #768B99);
    }
    .sc-kpis {
      display: flex;
      align-items: stretch;
      gap: 10px;
      flex-wrap: wrap;
    }
    .sc-kpi {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 7px 14px;
      background: var(--accent-soft, #E3EDEC);
      border: 1px solid var(--line, #C3DAD9);
      border-radius: 6px;
    }
    .sc-kpi-label {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--slate, #3B454D);
    }
    .sc-kpi-value {
      font-family: 'Montserrat', var(--font-sans, sans-serif);
      font-size: 16px;
      font-weight: 700;
      color: var(--navy, #111722);
      font-variant-numeric: tabular-nums;
      margin-top: 2px;
    }
    .sc-kpi-value.accent {
      color: var(--accent-dark, #009B93);
    }
    .sc-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .sc-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 13px;
      font-size: 12px;
      font-weight: 600;
      border-radius: 6px;
      border: 1px solid var(--line, #C3DAD9);
      background: #FFFFFF;
      color: var(--ink-strong, #111722);
      cursor: pointer;
      transition: transform 0.15s ease, background-color 0.15s ease, border-color 0.15s ease;
      white-space: nowrap;
    }
    .sc-btn:hover {
      background: var(--accent-soft, #E3EDEC);
      border-color: var(--accent, #01B2A9);
      transform: translateY(-1px);
    }
    .sc-btn:active {
      transform: translateY(0);
    }
    .sc-btn-secondary {
      background: var(--navy, #111722);
      border-color: var(--navy, #111722);
      color: #FFD171;
    }
    .sc-btn-secondary:hover {
      background: var(--navy-2, #161E2C);
      border-color: var(--accent, #01B2A9);
      color: #FFD171;
    }
    .sc-btn-primary {
      background: var(--accent, #01B2A9);
      border-color: var(--accent, #01B2A9);
      color: #FFFFFF;
    }
    .sc-btn-primary:hover {
      background: var(--accent-dark, #009B93);
      border-color: var(--accent-dark, #009B93);
      color: #FFFFFF;
    }

    /* Notice Banner */
    .sc-notice {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 9px 14px;
      border-radius: 6px;
      font-size: 12.5px;
      font-weight: 500;
      background: #FFF9EB;
      border: 1px solid #FFD171;
      border-left: 4px solid #D94848;
      color: #111722;
    }
    .sc-notice.hidden {
      display: none;
    }
    .sc-notice-close {
      background: none;
      border: none;
      color: #111722;
      cursor: pointer;
      font-size: 15px;
      font-weight: 700;
      padding: 0 4px;
    }

    /* Add Candidate Form Drawer */
    .sc-add-panel {
      background: #FFFFFF;
      border: 1px solid var(--line, #C3DAD9);
      border-left: 4px solid var(--accent, #01B2A9);
      border-radius: 8px;
      padding: 16px 18px;
      box-shadow: 0 4px 14px rgba(17, 23, 34, 0.05);
    }
    .sc-add-panel.hidden {
      display: none;
    }
    .sc-add-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--line, #C3DAD9);
    }
    .sc-add-header h3 {
      margin: 0;
      font-size: 15px;
      font-weight: 700;
      color: var(--navy, #111722);
    }
    .sc-add-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 10px;
    }
    .sc-field {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .sc-field.span-2 {
      grid-column: span 2;
    }
    .sc-field label {
      font-size: 11px;
      font-weight: 600;
      color: var(--slate, #3B454D);
    }
    .sc-field input, .sc-field select {
      padding: 7px 9px;
      font-size: 12.5px;
      border: 1px solid var(--line, #C3DAD9);
      border-radius: 6px;
      background: #FFFFFF;
      color: var(--ink-strong, #111722);
      width: 100%;
    }
    .sc-field input:focus, .sc-field select:focus {
      outline: none;
      border-color: var(--accent, #01B2A9);
      box-shadow: 0 0 0 2px rgba(1, 178, 169, 0.15);
    }
    .sc-add-footer {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 14px;
    }

    /* Main Split Layout */
    .sc-main {
      display: grid;
      grid-template-columns: 390px minmax(0, 1fr);
      gap: 16px;
      align-items: start;
    }
    @media (max-width: 1080px) {
      .sc-main {
        grid-template-columns: 1fr;
      }
      .sc-add-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    .sc-card {
      background: #FFFFFF;
      border: 1px solid var(--line, #C3DAD9);
      border-radius: 8px;
      padding: 16px;
      min-width: 0;
      box-shadow: 0 2px 8px rgba(17, 23, 34, 0.03);
      transition: transform 0.18s ease, box-shadow 0.18s ease;
    }
    .sc-card-head {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--line, #C3DAD9);
      gap: 8px;
    }
    .sc-card-title {
      margin: 0;
      font-size: 15px;
      font-weight: 700;
      color: var(--navy, #111722);
    }
    .sc-card-sub {
      font-size: 11px;
      color: var(--ink-muted, #768B99);
    }

    /* 2x2 Matrix */
    .sc-matrix-wrap {
      position: relative;
      width: 100%;
    }
    .sc-matrix-svg {
      width: 100%;
      height: auto;
      display: block;
      user-select: none;
    }
    .sc-dot-group {
      cursor: pointer;
    }
    .sc-dot-circle {
      transition: r 0.15s ease, stroke-width 0.15s ease, fill-opacity 0.15s ease;
    }
    .sc-tooltip {
      position: absolute;
      pointer-events: none;
      background: var(--navy, #111722);
      color: #FFFFFF;
      padding: 9px 11px;
      border-radius: 6px;
      border: 1px solid var(--accent, #01B2A9);
      font-size: 11.5px;
      line-height: 1.45;
      box-shadow: 0 10px 24px rgba(17, 23, 34, 0.28);
      z-index: 20;
      max-width: 225px;
      opacity: 0;
      transition: opacity 0.12s ease;
    }
    .sc-tooltip.visible {
      opacity: 1;
    }
    .sc-matrix-legend {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 10px;
      padding-top: 9px;
      border-top: 1px solid var(--line, #C3DAD9);
      font-size: 11px;
      color: var(--slate, #3B454D);
    }
    .sc-legend-item {
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }
    .sc-legend-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      display: inline-block;
    }

    /* Selected Detail Strip under Matrix */
    .sc-detail-box {
      margin-top: 12px;
      padding: 12px 14px;
      border-radius: 6px;
      background: #F5F8F8;
      border: 1px solid var(--line, #C3DAD9);
      border-left: 4px solid var(--accent, #01B2A9);
      font-size: 12px;
    }
    .sc-detail-title {
      font-weight: 700;
      color: var(--navy, #111722);
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
    }
    .sc-detail-desc {
      color: var(--slate, #3B454D);
      margin: 0 0 8px;
      line-height: 1.4;
    }
    .sc-detail-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      font-size: 11px;
      color: var(--navy, #111722);
    }
    .sc-pill {
      display: inline-flex;
      align-items: center;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 10.5px;
      font-weight: 700;
      background: var(--accent-soft, #E3EDEC);
      color: var(--navy, #111722);
    }
    .sc-pill.top3 {
      background: #FFD171;
      color: #111722;
      border: 1px solid #E5B654;
    }
    .sc-pill.quad-qw { background: #E3EDEC; color: #009B93; }
    .sc-pill.quad-sb { background: #E6ECF5; color: #002C5C; }
    .sc-pill.quad-fi { background: #EEF2F5; color: #3B454D; }
    .sc-pill.quad-dp { background: #FCEAEA; color: #D94848; }

    /* Ranked Scorecard Table */
    .sc-table-wrap {
      width: 100%;
      overflow-x: auto;
    }
    .sc-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
      text-align: left;
    }
    .sc-table th {
      padding: 8px 6px;
      font-size: 10.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--slate, #3B454D);
      border-bottom: 2px solid var(--navy, #111722);
      white-space: nowrap;
    }
    .sc-table td {
      padding: 9px 6px;
      border-bottom: 1px solid var(--line, #C3DAD9);
      vertical-align: middle;
    }
    .sc-row {
      transition: background-color 0.15s ease;
    }
    .sc-row:hover, .sc-row.is-highlighted {
      background-color: #F5F8F8;
    }
    .sc-row.is-top3 {
      background-color: #E3EDEC;
    }
    .sc-row.is-top3:hover, .sc-row.is-top3.is-highlighted {
      background-color: #D6E7E5;
    }
    .sc-row.is-selected {
      box-shadow: inset 3px 0 0 var(--accent, #01B2A9);
    }

    .sc-pick-btn {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 4px 8px;
      border-radius: 4px;
      border: 1px solid var(--line, #C3DAD9);
      background: #FFFFFF;
      color: var(--ink-muted, #768B99);
      font-family: 'Montserrat', var(--font-sans, sans-serif);
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.15s ease;
    }
    .sc-pick-btn:hover {
      border-color: var(--accent, #01B2A9);
      color: var(--navy, #111722);
    }
    .sc-pick-btn.active {
      background: #FFD171;
      border-color: #E5B654;
      color: #111722;
    }

    .sc-auto-name {
      font-weight: 600;
      color: var(--navy, #111722);
      line-height: 1.3;
      margin-bottom: 2px;
    }
    .sc-auto-sub {
      font-size: 10.5px;
      color: var(--ink-muted, #768B99);
      line-height: 1.25;
    }

    .sc-score-badge {
      display: inline-block;
      min-width: 44px;
      text-align: center;
      padding: 3px 6px;
      border-radius: 4px;
      font-family: 'Montserrat', var(--font-sans, sans-serif);
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      background: #F5F8F8;
      border: 1px solid var(--line, #C3DAD9);
      color: var(--navy, #111722);
    }
    .sc-score-badge.high {
      background: var(--accent-soft, #E3EDEC);
      border-color: var(--accent, #01B2A9);
      color: var(--accent-dark, #009B93);
    }
    .sc-score-badge.mid {
      background: #E6ECF5;
      border-color: #B8C9E0;
      color: #002C5C;
    }

    .sc-slider-cell {
      display: flex;
      align-items: center;
      gap: 5px;
      white-space: nowrap;
    }
    .sc-range {
      width: 52px;
      accent-color: var(--accent, #01B2A9);
      cursor: pointer;
      margin: 0;
    }
    .sc-range-val {
      font-family: 'Montserrat', var(--font-sans, sans-serif);
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      min-width: 16px;
      text-align: right;
      font-size: 11.5px;
      color: var(--navy, #111722);
    }
    .sc-hrs-input {
      width: 46px;
      padding: 3px 4px;
      font-family: 'Montserrat', var(--font-sans, sans-serif);
      font-size: 11.5px;
      font-weight: 600;
      border: 1px solid var(--line, #C3DAD9);
      border-radius: 4px;
      background: #FFFFFF;
      color: var(--navy, #111722);
      text-align: right;
      font-variant-numeric: tabular-nums;
    }
    .sc-phase-select {
      padding: 3px 5px;
      font-size: 11.5px;
      font-weight: 600;
      border: 1px solid var(--line, #C3DAD9);
      border-radius: 4px;
      background: #FFFFFF;
      color: var(--navy, #111722);
      cursor: pointer;
    }
    .sc-num {
      font-family: 'Montserrat', var(--font-sans, sans-serif);
      font-variant-numeric: tabular-nums;
      font-weight: 600;
      white-space: nowrap;
    }
    .sc-savings {
      color: var(--accent-dark, #009B93);
    }
  `;
  document.head.appendChild(style);
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatCurrency(amount) {
  const num = Number(amount) || 0;
  return '$' + Math.round(num).toLocaleString('en-US');
}

function clampScore(val, fallback = 5) {
  const n = Number(val);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(1, Math.min(10, Math.round(n)));
}

function getPriorityScore(auto) {
  const impact = clampScore(auto.impactScore, 5);
  const effort = clampScore(auto.effortScore, 5);
  return impact / effort;
}

function getQuadrantInfo(impactScore, effortScore) {
  const highImpact = impactScore >= 5.5;
  const highEffort = effortScore >= 5.5;
  if (highImpact && !highEffort) {
    return { key: 'qw', label: '빠른 성과', badgeClass: 'quad-qw', color: '#01B2A9' };
  }
  if (highImpact && highEffort) {
    return { key: 'sb', label: '전략적 과제', badgeClass: 'quad-sb', color: '#002C5C' };
  }
  if (!highImpact && !highEffort) {
    return { key: 'fi', label: '보완 과제', badgeClass: 'quad-fi', color: '#768B99' };
  }
  return { key: 'dp', label: '후순위', badgeClass: 'quad-dp', color: '#D94848' };
}

function getPaybackText(annualSavings, implementationCost) {
  const cost = Number(implementationCost) || 0;
  if (cost <= 0) return '즉시';
  const monthly = annualSavings / 12;
  if (monthly <= 0) return '해당 없음';
  const months = cost / monthly;
  if (months < 1) return `${Math.max(1, Math.round(months * 30))}일`;
  return `${months.toFixed(1)}개월`;
}

function sortAutomations(list) {
  return [...list].sort((a, b) => {
    const scoreDiff = getPriorityScore(b) - getPriorityScore(a);
    if (Math.abs(scoreDiff) > 0.0001) return scoreDiff;
    const impDiff = clampScore(b.impactScore) - clampScore(a.impactScore);
    if (impDiff !== 0) return impDiff;
    return (Number(b.hoursSavedPerWeek) || 0) - (Number(a.hoursSavedPerWeek) || 0);
  });
}

// Module-level UI state so hover/selection/drawer state survives state-triggered re-renders cleanly
const uiState = {
  selectedId: null,
  hoveredId: null,
  showAddForm: false,
  notice: '',
};

export function renderScorecard(container, state, actions) {
  if (!container) return;
  ensureStyles();

  const safeState = state || {};
  const automations = Array.isArray(safeState.automations) ? safeState.automations : [];
  const hourlyRate =
    safeState.client && Number.isFinite(Number(safeState.client.hourlyRate))
      ? Number(safeState.client.hourlyRate)
      : 75;

  const sorted = sortAutomations(automations);
  const top3List = sorted.filter((a) => Boolean(a.selectedTop3));
  const top3Hours = top3List.reduce((sum, a) => sum + (Number(a.hoursSavedPerWeek) || 0), 0);
  const top3Savings = top3Hours * 52 * hourlyRate;

  if (!uiState.selectedId || !automations.some((a) => a.id === uiState.selectedId)) {
    uiState.selectedId = (top3List[0] || sorted[0] || {}).id || null;
  }

  const activeDetailItem =
    automations.find((a) => a.id === (uiState.hoveredId || uiState.selectedId)) || sorted[0] || null;

  // SVG Matrix geometry
  const svgW = 360;
  const svgH = 300;
  const pad = { top: 20, right: 16, bottom: 32, left: 36 };
  const plotW = svgW - pad.left - pad.right;
  const plotH = svgH - pad.top - pad.bottom;

  const toX = (effort) => pad.left + ((clampScore(effort) - 0.5) / 10) * plotW;
  const toY = (impact) => pad.top + ((10.5 - clampScore(impact)) / 10) * plotH;
  const midX = pad.left + plotW * 0.5;
  const midY = pad.top + plotH * 0.5;

  const dotsMarkup = sorted
    .map((item, idx) => {
      const imp = clampScore(item.impactScore);
      const eff = clampScore(item.effortScore);
      const cx = toX(eff).toFixed(1);
      const cy = toY(imp).toFixed(1);
      const isTop3 = Boolean(item.selectedTop3);
      const isActive = item.id === uiState.selectedId || item.id === uiState.hoveredId;
      const quad = getQuadrantInfo(imp, eff);
      const radius = isActive ? 13 : isTop3 ? 11 : 9;
      const fill = isTop3 ? '#01B2A9' : quad.color;
      const stroke = isActive ? '#111722' : isTop3 ? '#FFD171' : '#FFFFFF';
      const strokeWidth = isActive ? 2.5 : isTop3 ? 2.2 : 1.75;

      return `
        <g class="sc-dot-group" data-dot-id="${escapeHtml(item.id)}">
          <circle
            class="sc-dot-circle"
            cx="${cx}"
            cy="${cy}"
            r="${radius}"
            fill="${fill}"
            fill-opacity="${isTop3 || isActive ? '0.95' : '0.78'}"
            stroke="${stroke}"
            stroke-width="${strokeWidth}"
          />
          <text
            x="${cx}"
            y="${Number(cy) + 3.5}"
            text-anchor="middle"
            font-size="9.5"
            font-weight="700"
            fill="#ffffff"
            pointer-events="none"
          >${idx + 1}</text>
        </g>
      `;
    })
    .join('');

  const rowsMarkup = sorted.length
    ? sorted
        .map((item, idx) => {
          const imp = clampScore(item.impactScore);
          const eff = clampScore(item.effortScore);
          const hrs = Number(item.hoursSavedPerWeek) || 0;
          const cost = Number(item.implementationCost) || 0;
          const annualSavings = hrs * 52 * hourlyRate;
          const payback = getPaybackText(annualSavings, cost);
          const score = getPriorityScore(item);
          const isTop3 = Boolean(item.selectedTop3);
          const isSelected = item.id === uiState.selectedId;
          const isHovered = item.id === uiState.hoveredId;
          const scoreClass = score >= 1.8 ? 'high' : score >= 1.1 ? 'mid' : '';
          const toolsText = Array.isArray(item.toolsNeeded) && item.toolsNeeded.length
            ? item.toolsNeeded.join(', ')
            : '기존 도구 활용';

          return `
            <tr
              class="sc-row ${isTop3 ? 'is-top3' : ''} ${isSelected ? 'is-selected' : ''} ${isHovered ? 'is-highlighted' : ''}"
              data-row-id="${escapeHtml(item.id)}"
            >
              <td>
                <button
                  type="button"
                  class="sc-pick-btn ${isTop3 ? 'active' : ''}"
                  data-action="toggle-top3"
                  data-id="${escapeHtml(item.id)}"
                  title="${isTop3 ? 'Top 3 선정 해제' : 'Top 3 과제로 선정'}"
                >
                  <span>${isTop3 ? '★' : '☆'}</span>
                  <span>${String(idx + 1).padStart(2, '0')}</span>
                </button>
              </td>
              <td>
                <div class="sc-auto-name">${escapeHtml(item.title || '제목 없는 자동화')}</div>
                <div class="sc-auto-sub">${escapeHtml(toolsText)} · 구축비 ${formatCurrency(cost)}</div>
              </td>
              <td>
                <span class="sc-score-badge ${scoreClass}" data-score-for="${escapeHtml(item.id)}">${score.toFixed(2)}</span>
              </td>
              <td>
                <div class="sc-slider-cell">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value="${imp}"
                    class="sc-range"
                    data-field="impactScore"
                    data-id="${escapeHtml(item.id)}"
                    aria-label="${escapeHtml(item.title)} 영향도 점수"
                  />
                  <span class="sc-range-val" data-val-for="impact-${escapeHtml(item.id)}">${imp}</span>
                </div>
              </td>
              <td>
                <div class="sc-slider-cell">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value="${eff}"
                    class="sc-range"
                    data-field="effortScore"
                    data-id="${escapeHtml(item.id)}"
                    aria-label="${escapeHtml(item.title)} 투입 난이도 점수"
                  />
                  <span class="sc-range-val" data-val-for="effort-${escapeHtml(item.id)}">${eff}</span>
                </div>
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  max="200"
                  step="0.5"
                  value="${hrs}"
                  class="sc-hrs-input"
                  data-field="hoursSavedPerWeek"
                  data-id="${escapeHtml(item.id)}"
                  aria-label="${escapeHtml(item.title)} 주간 절감 시간"
                />
              </td>
              <td class="sc-num sc-savings" data-savings-for="${escapeHtml(item.id)}">
                ${formatCurrency(annualSavings)}
              </td>
              <td class="sc-num" data-payback-for="${escapeHtml(item.id)}">
                ${escapeHtml(payback)}
              </td>
              <td>
                <select
                  class="sc-phase-select"
                  data-field="phase"
                  data-id="${escapeHtml(item.id)}"
                  aria-label="${escapeHtml(item.title)} 추진 단계"
                >
                  <option value="30" ${String(item.phase) === '30' ? 'selected' : ''}>30일</option>
                  <option value="60" ${String(item.phase) === '60' ? 'selected' : ''}>60일</option>
                  <option value="90" ${String(item.phase) === '90' ? 'selected' : ''}>90일</option>
                </select>
              </td>
            </tr>
          `;
        })
        .join('')
    : `<tr><td colspan="9" style="text-align:center;padding:20px;color:#64748b;">등록된 자동화 후보가 없습니다. "+ 후보 추가" 버튼을 눌러 새 과제를 추가하세요.</td></tr>`;

  const detailMarkup = activeDetailItem
    ? (() => {
        const imp = clampScore(activeDetailItem.impactScore);
        const eff = clampScore(activeDetailItem.effortScore);
        const q = getQuadrantInfo(imp, eff);
        const hrs = Number(activeDetailItem.hoursSavedPerWeek) || 0;
        const annual = hrs * 52 * hourlyRate;
        return `
          <div class="sc-detail-box" id="sc-detail-box">
            <div class="sc-detail-title">
              <span>${escapeHtml(activeDetailItem.title)}</span>
              <span class="sc-pill ${q.badgeClass}">${q.label}</span>
            </div>
            <p class="sc-detail-desc">${escapeHtml(activeDetailItem.description || '설명이 입력되지 않았습니다.')}</p>
            <div class="sc-detail-meta">
              <span>영향도: <strong>${imp}/10</strong></span>
              <span>난이도: <strong>${eff}/10</strong></span>
              <span>연간 절감: <strong>${formatCurrency(annual)}/년</strong></span>
              ${activeDetailItem.selectedTop3 ? '<span class="sc-pill top3">★ Top 3 선정</span>' : ''}
            </div>
          </div>
        `;
      })()
    : '';

  container.innerHTML = `
    <div class="sc-root">
      <div class="sc-header">
        <div class="sc-title-block">
          <h2>영향도 vs. 난이도 스코어카드</h2>
          <p>${escapeHtml(safeState.client?.companyName || '고객사')}의 자동화 후보를 우선순위화하고 Top 3 과제를 선정하세요.</p>
        </div>

        <div class="sc-kpis">
          <div class="sc-kpi">
            <span class="sc-kpi-label">Top 3 선정</span>
            <span class="sc-kpi-value" id="sc-kpi-count">${top3List.length} / 3</span>
          </div>
          <div class="sc-kpi">
            <span class="sc-kpi-label">Top 3 주간 절감</span>
            <span class="sc-kpi-value" id="sc-kpi-hours">${top3Hours.toFixed(1)}시간</span>
          </div>
          <div class="sc-kpi">
            <span class="sc-kpi-label">예상 연간 절감액</span>
            <span class="sc-kpi-value accent" id="sc-kpi-savings">${formatCurrency(top3Savings)}</span>
          </div>
        </div>

        <div class="sc-actions">
          <button type="button" class="sc-btn" id="sc-toggle-add-btn">
            ${uiState.showAddForm ? '폼 닫기' : '+ 후보 추가'}
          </button>
          <button type="button" class="sc-btn sc-btn-secondary" id="sc-autopick-btn">
            ★ Top 3 자동 선정
          </button>
          <button type="button" class="sc-btn sc-btn-primary" id="sc-goto-report-btn">
            고객 보고서 생성 →
          </button>
        </div>
      </div>

      <div class="sc-notice ${uiState.notice ? '' : 'hidden'}" id="sc-notice">
        <span id="sc-notice-text">${escapeHtml(uiState.notice)}</span>
        <button type="button" class="sc-notice-close" id="sc-notice-close" aria-label="알림 닫기">×</button>
      </div>

      <form class="sc-add-panel ${uiState.showAddForm ? '' : 'hidden'}" id="sc-add-form">
        <div class="sc-add-header">
          <h3>맞춤 자동화 후보 추가</h3>
        </div>
        <div class="sc-add-grid">
          <div class="sc-field span-2">
            <label for="sc-new-title">자동화 과제명 *</label>
            <input id="sc-new-title" name="title" type="text" required placeholder="예: 세금계산서 자동 대사 및 ERP 전표 생성" />
          </div>
          <div class="sc-field span-2">
            <label for="sc-new-desc">설명</label>
            <input id="sc-new-desc" name="description" type="text" placeholder="대상 업무 흐름 및 기대 효과 요약" />
          </div>
          <div class="sc-field">
            <label for="sc-new-impact">영향도 (1–10)</label>
            <input id="sc-new-impact" name="impactScore" type="number" min="1" max="10" value="8" required />
          </div>
          <div class="sc-field">
            <label for="sc-new-effort">투입 난이도 (1–10)</label>
            <input id="sc-new-effort" name="effortScore" type="number" min="1" max="10" value="4" required />
          </div>
          <div class="sc-field">
            <label for="sc-new-hours">주간 절감 시간</label>
            <input id="sc-new-hours" name="hoursSavedPerWeek" type="number" min="0" step="0.5" value="6" required />
          </div>
          <div class="sc-field">
            <label for="sc-new-cost">구축 비용 ($)</label>
            <input id="sc-new-cost" name="implementationCost" type="number" min="0" step="100" value="2500" required />
          </div>
          <div class="sc-field span-2">
            <label for="sc-new-tools">필요 도구 (쉼표로 구분)</label>
            <input id="sc-new-tools" name="toolsNeeded" type="text" placeholder="예: Make.com, OpenAI API, Slack" />
          </div>
          <div class="sc-field">
            <label for="sc-new-phase">추진 단계</label>
            <select id="sc-new-phase" name="phase">
              <option value="30" selected>1~30일</option>
              <option value="60">31~60일</option>
              <option value="90">61~90일</option>
            </select>
          </div>
        </div>
        <div class="sc-add-footer">
          <button type="button" class="sc-btn" id="sc-cancel-add-btn">취소</button>
          <button type="submit" class="sc-btn sc-btn-primary">후보 추가</button>
        </div>
      </form>

      <div class="sc-main">
        <div class="sc-card">
          <div class="sc-card-head">
            <h3 class="sc-card-title">2×2 영향도 vs. 난이도 매트릭스</h3>
            <span class="sc-card-sub">점을 클릭하거나 마우스를 올려 확인</span>
          </div>
          <div class="sc-matrix-wrap" id="sc-matrix-wrap">
            <svg class="sc-matrix-svg" viewBox="0 0 ${svgW} ${svgH}" role="img" aria-label="영향도 대비 투입 난이도 2x2 매트릭스">
              <!-- MedTech Precision Quadrant backgrounds -->
              <rect x="${pad.left}" y="${pad.top}" width="${plotW / 2}" height="${plotH / 2}" fill="#E3EDEC" />
              <rect x="${midX}" y="${pad.top}" width="${plotW / 2}" height="${plotH / 2}" fill="#F0F4F8" />
              <rect x="${pad.left}" y="${midY}" width="${plotW / 2}" height="${plotH / 2}" fill="#F8FAFB" />
              <rect x="${midX}" y="${midY}" width="${plotW / 2}" height="${plotH / 2}" fill="#FDF2F2" />

              <!-- Outer border & center axes -->
              <rect x="${pad.left}" y="${pad.top}" width="${plotW}" height="${plotH}" fill="none" stroke="#C3DAD9" stroke-width="1" />
              <line x1="${midX}" y1="${pad.top}" x2="${midX}" y2="${pad.top + plotH}" stroke="#9BB7B6" stroke-width="1" stroke-dasharray="3 3" />
              <line x1="${pad.left}" y1="${midY}" x2="${pad.left + plotW}" y2="${midY}" stroke="#9BB7B6" stroke-width="1" stroke-dasharray="3 3" />

              <!-- Quadrant labels -->
              <text x="${pad.left + 9}" y="${pad.top + 16}" font-family="'Noto Sans KR', sans-serif" font-size="10.5" font-weight="700" fill="#009B93">빠른 성과</text>
              <text x="${pad.left + plotW - 9}" y="${pad.top + 16}" text-anchor="end" font-family="'Noto Sans KR', sans-serif" font-size="10.5" font-weight="700" fill="#002C5C">전략적 과제</text>
              <text x="${pad.left + 9}" y="${pad.top + plotH - 9}" font-family="'Noto Sans KR', sans-serif" font-size="10.5" font-weight="700" fill="#768B99">보완 과제</text>
              <text x="${pad.left + plotW - 9}" y="${pad.top + plotH - 9}" text-anchor="end" font-family="'Noto Sans KR', sans-serif" font-size="10.5" font-weight="700" fill="#D94848">후순위</text>

              <!-- Axis labels -->
              <text x="${pad.left + plotW / 2}" y="${svgH - 6}" text-anchor="middle" font-family="'Montserrat', 'Noto Sans KR', sans-serif" font-size="10.5" font-weight="600" fill="#3B454D">투입 난이도 (낮음 1 → 높음 10)</text>
              <text x="12" y="${pad.top + plotH / 2}" text-anchor="middle" font-family="'Montserrat', 'Noto Sans KR', sans-serif" font-size="10.5" font-weight="600" fill="#3B454D" transform="rotate(-90 12 ${pad.top + plotH / 2})">영향도 (낮음 1 → 높음 10)</text>

              <!-- Plotted Automation Dots -->
              ${dotsMarkup}
            </svg>
            <div class="sc-tooltip" id="sc-matrix-tooltip"></div>
          </div>
          <div class="sc-matrix-legend">
            <span class="sc-legend-item"><span class="sc-legend-dot" style="background:#01B2A9;border:2px solid #FFD171"></span>Top 3 / 빠른 성과</span>
            <span class="sc-legend-item"><span class="sc-legend-dot" style="background:#002C5C"></span>전략적 과제</span>
            <span class="sc-legend-item"><span class="sc-legend-dot" style="background:#768B99"></span>보완 과제</span>
            <span class="sc-legend-item"><span class="sc-legend-dot" style="background:#D94848"></span>후순위</span>
          </div>
          ${detailMarkup}
        </div>

        <div class="sc-card">
          <div class="sc-card-head">
            <h3 class="sc-card-title">자동화 우선순위 스코어카드</h3>
            <span class="sc-card-sub">우선순위 점수 = 영향도 ÷ 난이도 · 시간당 단가: ${formatCurrency(hourlyRate)}/시간</span>
          </div>
          <div class="sc-table-wrap">
            <table class="sc-table">
              <thead>
                <tr>
                  <th>Top 3</th>
                  <th>자동화 과제</th>
                  <th>점수</th>
                  <th>영향도</th>
                  <th>난이도</th>
                  <th>주간 절감</th>
                  <th>연간 절감액</th>
                  <th>회수 기간</th>
                  <th>단계</th>
                </tr>
              </thead>
              <tbody>
                ${rowsMarkup}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;

  // --- Wire up event listeners ---
  const showNotice = (msg) => {
    uiState.notice = msg;
    const noticeEl = container.querySelector('#sc-notice');
    const textEl = container.querySelector('#sc-notice-text');
    if (noticeEl && textEl) {
      textEl.textContent = msg;
      noticeEl.classList.remove('hidden');
    }
  };

  const clearNotice = () => {
    uiState.notice = '';
    const noticeEl = container.querySelector('#sc-notice');
    if (noticeEl) noticeEl.classList.add('hidden');
  };

  container.querySelector('#sc-notice-close')?.addEventListener('click', clearNotice);

  // Navigation to Report
  container.querySelector('#sc-goto-report-btn')?.addEventListener('click', () => {
    if (actions && typeof actions.navigateTo === 'function') {
      actions.navigateTo('report');
    }
  });

  // Toggle Add Candidate Form
  container.querySelector('#sc-toggle-add-btn')?.addEventListener('click', () => {
    uiState.showAddForm = !uiState.showAddForm;
    renderScorecard(container, actions?.getState ? actions.getState() : safeState, actions);
  });

  container.querySelector('#sc-cancel-add-btn')?.addEventListener('click', () => {
    uiState.showAddForm = false;
    renderScorecard(container, actions?.getState ? actions.getState() : safeState, actions);
  });

  // Submit Add Candidate Form
  container.querySelector('#sc-add-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const title = String(fd.get('title') || '').trim();
    if (!title) return;

    const toolsRaw = String(fd.get('toolsNeeded') || '');
    const toolsNeeded = toolsRaw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const newItem = {
      id: `auto-${Date.now()}`,
      title,
      description: String(fd.get('description') || '').trim(),
      targetStepIds: [],
      impactScore: clampScore(fd.get('impactScore'), 7),
      effortScore: clampScore(fd.get('effortScore'), 4),
      hoursSavedPerWeek: Math.max(0, Number(fd.get('hoursSavedPerWeek')) || 0),
      implementationCost: Math.max(0, Number(fd.get('implementationCost')) || 0),
      toolsNeeded,
      phase: ['30', '60', '90'].includes(String(fd.get('phase'))) ? String(fd.get('phase')) : '30',
      selectedTop3: false,
    };

    uiState.showAddForm = false;
    uiState.selectedId = newItem.id;
    clearNotice();

    if (actions && typeof actions.setState === 'function') {
      actions.setState((prev) => ({
        ...prev,
        automations: [...(Array.isArray(prev.automations) ? prev.automations : []), newItem],
      }));
    }
  });

  // Auto-Pick Top 3
  container.querySelector('#sc-autopick-btn')?.addEventListener('click', () => {
    clearNotice();
    if (!actions || typeof actions.setState !== 'function') return;
    actions.setState((prev) => {
      const list = Array.isArray(prev.automations) ? prev.automations : [];
      const topIds = new Set(
        sortAutomations(list)
          .slice(0, 3)
          .map((a) => a.id)
      );
      return {
        ...prev,
        automations: list.map((a) => ({
          ...a,
          selectedTop3: topIds.has(a.id),
        })),
      };
    });
  });

  // Toggle Top 3 Pick button
  container.querySelectorAll('[data-action="toggle-top3"]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      if (!id || !actions || typeof actions.setState !== 'function') return;

      const currentState = actions.getState ? actions.getState() : safeState;
      const list = Array.isArray(currentState.automations) ? currentState.automations : [];
      const target = list.find((a) => a.id === id);
      if (!target) return;

      const currentSelectedCount = list.filter((a) => a.selectedTop3).length;
      if (!target.selectedTop3 && currentSelectedCount >= 3) {
        showNotice('최대 3개까지만 선정할 수 있습니다 — 기존 항목을 해제하거나 "★ Top 3 자동 선정"을 클릭하세요.');
        return;
      }

      clearNotice();
      actions.setState((prev) => ({
        ...prev,
        automations: (prev.automations || []).map((a) =>
          a.id === id ? { ...a, selectedTop3: !a.selectedTop3 } : a
        ),
      }));
    });
  });

  // Sliders: live preview on 'input', commit to state on 'change' so dragging stays smooth
  container.querySelectorAll('.sc-range').forEach((input) => {
    input.addEventListener('input', (e) => {
      const id = input.getAttribute('data-id');
      const field = input.getAttribute('data-field');
      const val = clampScore(e.target.value, 5);
      const valEl = container.querySelector(
        `[data-val-for="${field === 'impactScore' ? 'impact' : 'effort'}-${id}"]`
      );
      if (valEl) valEl.textContent = String(val);

      const impactInput = container.querySelector(`.sc-range[data-id="${id}"][data-field="impactScore"]`);
      const effortInput = container.querySelector(`.sc-range[data-id="${id}"][data-field="effortScore"]`);
      const imp = clampScore(impactInput?.value, 5);
      const eff = clampScore(effortInput?.value, 5);
      const scoreEl = container.querySelector(`[data-score-for="${id}"]`);
      if (scoreEl) {
        const s = imp / eff;
        scoreEl.textContent = s.toFixed(2);
      }
    });

    input.addEventListener('change', (e) => {
      const id = input.getAttribute('data-id');
      const field = input.getAttribute('data-field');
      const val = clampScore(e.target.value, 5);
      if (!id || !field || !actions?.setState) return;
      actions.setState((prev) => ({
        ...prev,
        automations: (prev.automations || []).map((a) =>
          a.id === id ? { ...a, [field]: val } : a
        ),
      }));
      renderScorecard(container, actions.getState ? actions.getState() : safeState, actions);
      container.querySelector(`.sc-range[data-field="${field}"][data-id="${id}"]`)?.focus();
    });
  });

  // Hours Saved/Wk input: update on change
  container.querySelectorAll('.sc-hrs-input').forEach((input) => {
    input.addEventListener('change', (e) => {
      const id = input.getAttribute('data-id');
      const hrs = Math.max(0, Number(e.target.value) || 0);
      if (!id || !actions?.setState) return;
      actions.setState((prev) => ({
        ...prev,
        automations: (prev.automations || []).map((a) =>
          a.id === id ? { ...a, hoursSavedPerWeek: hrs } : a
        ),
      }));
      renderScorecard(container, actions.getState ? actions.getState() : safeState, actions);
      container.querySelector(`.sc-hrs-input[data-id="${id}"]`)?.focus();
    });
  });

  // Phase selector
  container.querySelectorAll('.sc-phase-select').forEach((select) => {
    select.addEventListener('change', (e) => {
      const id = select.getAttribute('data-id');
      const phase = String(e.target.value);
      if (!id || !actions?.setState) return;
      actions.setState((prev) => ({
        ...prev,
        automations: (prev.automations || []).map((a) =>
          a.id === id ? { ...a, phase } : a
        ),
      }));
      renderScorecard(container, actions.getState ? actions.getState() : safeState, actions);
      container.querySelector(`.sc-phase-select[data-id="${id}"]`)?.focus();
    });
  });

  // Matrix Dot & Table Row hover/click synchronization
  const tooltip = container.querySelector('#sc-matrix-tooltip');
  const matrixWrap = container.querySelector('#sc-matrix-wrap');

  const updateHighlight = (id) => {
    uiState.hoveredId = id;
    container.querySelectorAll('.sc-row').forEach((row) => {
      row.classList.toggle('is-highlighted', row.getAttribute('data-row-id') === id);
    });
    container.querySelectorAll('.sc-dot-circle').forEach((circle) => {
      const parentId = circle.parentElement?.getAttribute('data-dot-id');
      const item = automations.find((a) => a.id === parentId);
      const isTop3 = Boolean(item?.selectedTop3);
      const isSelected = parentId === uiState.selectedId;
      const isHovered = parentId === id;
      circle.setAttribute('r', isHovered || isSelected ? '13' : isTop3 ? '11' : '9');
      circle.setAttribute('stroke', isHovered || isSelected ? '#111722' : isTop3 ? '#FFD171' : '#FFFFFF');
      circle.setAttribute('stroke-width', isHovered || isSelected ? '2.5' : isTop3 ? '2.2' : '1.75');
    });
  };

  container.querySelectorAll('.sc-dot-group').forEach((dot) => {
    const id = dot.getAttribute('data-dot-id');
    dot.addEventListener('mouseenter', (e) => {
      updateHighlight(id);
      const item = automations.find((a) => a.id === id);
      if (!item || !tooltip || !matrixWrap) return;
      const imp = clampScore(item.impactScore);
      const eff = clampScore(item.effortScore);
      const quad = getQuadrantInfo(imp, eff);
      const hrs = Number(item.hoursSavedPerWeek) || 0;
      const annual = hrs * 52 * hourlyRate;
      tooltip.innerHTML = `
        <div style="font-weight:700;margin-bottom:2px;">${escapeHtml(item.title)}</div>
        <div>${escapeHtml(quad.label)} · 점수: <strong>${getPriorityScore(item).toFixed(2)}</strong></div>
        <div>영향도 ${imp}/10 · 난이도 ${eff}/10</div>
        <div>연 ${formatCurrency(annual)} 절감 (주 ${hrs}시간)</div>
      `;
      const rect = matrixWrap.getBoundingClientRect();
      const left = Math.min(Math.max(8, e.clientX - rect.left + 12), rect.width - 210);
      const top = Math.max(8, e.clientY - rect.top - 12);
      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
      tooltip.classList.add('visible');
    });

    dot.addEventListener('mouseleave', () => {
      updateHighlight(null);
      tooltip?.classList.remove('visible');
    });

    dot.addEventListener('click', () => {
      uiState.selectedId = id;
      renderScorecard(container, actions?.getState ? actions.getState() : safeState, actions);
    });
  });

  container.querySelectorAll('.sc-row').forEach((row) => {
    const id = row.getAttribute('data-row-id');
    row.addEventListener('mouseenter', () => updateHighlight(id));
    row.addEventListener('mouseleave', () => updateHighlight(null));
    row.addEventListener('click', (e) => {
      if (e.target.closest('input, select, button')) return;
      uiState.selectedId = id;
      container.querySelectorAll('.sc-row').forEach((r) => {
        r.classList.toggle('is-selected', r.getAttribute('data-row-id') === id);
      });
    });
  });
}

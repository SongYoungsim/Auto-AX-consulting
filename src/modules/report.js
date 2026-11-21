/**
 * Auto AX - 고객용 경영진 보고서 모듈 (Meta-Biomed 정밀 메드테크 플랫폼 룩앤필)
 * Exports renderReport(container, state, actions)
 */

const REPORT_STYLE_ID = 'auto-ax-report-styles';

function ensureReportStyles() {
  const existing = document.getElementById(REPORT_STYLE_ID);
  if (existing) existing.remove();
  const style = document.createElement('style');
  style.id = REPORT_STYLE_ID;
  style.textContent = `
    .ax-report {
      --ax-canvas: #F5F8F8;
      --ax-surface: #FFFFFF;
      --ax-mint: #E3EDEC;
      --ax-border: #C3DAD9;
      --ax-navy-900: #111722;
      --ax-navy-800: #161E2C;
      --ax-navy-mid: #002C5C;
      --ax-ink: #262E33;
      --ax-muted: #52636E;
      --ax-subtle: #768B99;
      --ax-teal: #01B2A9;
      --ax-teal-dark: #009B93;
      --ax-teal-soft: #E6F7F6;
      --ax-gold: #FFD171;
      --ax-gold-ink: #7A4F00;
      --ax-gold-soft: #FFF8E6;
      --ax-danger: #D94848;
      --ax-danger-soft: #FDF0F0;
      --ax-num: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
      --ax-sans: 'Noto Sans KR', 'Pretendard', 'Malgun Gothic', -apple-system, BlinkMacSystemFont, sans-serif;

      color: var(--ax-ink);
      font-family: var(--ax-sans);
      max-width: 1180px;
      margin: 0 auto;
      padding: 0 0 44px 0;
      box-sizing: border-box;
      word-break: keep-all;
      animation: axReportFadeUp 0.3s ease-out both;
    }

    @keyframes axReportFadeUp {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .ax-report *, .ax-report *::before, .ax-report *::after {
      box-sizing: border-box;
    }

    /* 상단 액션 바 */
    .ax-report-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      background: var(--ax-surface);
      border: 1px solid var(--ax-border);
      border-left: 4px solid var(--ax-teal);
      border-radius: 10px;
      padding: 12px 18px;
      margin-bottom: 20px;
      box-shadow: 0 2px 8px rgba(17, 23, 34, 0.04);
    }

    .ax-report-actions-left {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .ax-report-actions-kicker {
      font-family: var(--ax-num);
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--ax-teal-dark);
    }

    .ax-report-actions-title {
      font-size: 15px;
      font-weight: 700;
      color: var(--ax-navy-900);
    }

    .ax-report-actions-right {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    .ax-r-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 15px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      border: 1px solid var(--ax-border);
      background: var(--ax-surface);
      color: var(--ax-ink);
      font-family: var(--ax-sans);
      transition: transform 0.15s ease, border-color 0.15s ease, background 0.15s ease;
    }

    .ax-r-btn:hover {
      border-color: var(--ax-teal);
      background: var(--ax-teal-soft);
      transform: translateY(-1px);
    }

    .ax-r-btn:active {
      transform: translateY(0);
    }

    .ax-r-btn-primary {
      background: var(--ax-teal);
      border-color: var(--ax-teal);
      color: #FFFFFF;
    }

    .ax-r-btn-primary:hover {
      background: var(--ax-teal-dark);
      border-color: var(--ax-teal-dark);
    }

    .ax-r-copy-status {
      font-size: 12px;
      font-weight: 600;
      color: var(--ax-teal-dark);
      background: var(--ax-teal-soft);
      padding: 5px 10px;
      border-radius: 6px;
      border: 1px solid var(--ax-border);
    }

    /* 보고서 본문 */
    .ax-report-sheet {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    /* 딥 네이비 + 틸 바 비대칭 커버 헤더 */
    .ax-cover-spread {
      background: linear-gradient(135deg, var(--ax-navy-900) 0%, var(--ax-navy-800) 100%);
      color: #FFFFFF;
      border-radius: 12px;
      padding: 26px 28px;
      position: relative;
      overflow: hidden;
      display: grid;
      grid-template-columns: 7fr 5fr;
      gap: 26px;
      align-items: stretch;
      box-shadow: 0 10px 28px rgba(17, 23, 34, 0.14);
    }

    .ax-cover-spread::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, var(--ax-teal) 0%, #3ED6CE 60%, var(--ax-navy-mid) 100%);
    }

    .ax-cover-left {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-right: 10px;
    }

    .ax-cover-issue {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: var(--ax-num);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--ax-teal);
      margin-bottom: 10px;
    }

    .ax-cover-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--ax-teal);
      display: inline-block;
    }

    .ax-cover-company {
      font-size: 27px;
      font-weight: 700;
      color: #FFFFFF;
      line-height: 1.25;
      margin: 0 0 10px 0;
      letter-spacing: -0.02em;
    }

    .ax-cover-deck {
      font-size: 14px;
      line-height: 1.6;
      color: #B8C7D1;
      margin: 0;
    }

    .ax-cover-index {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(195, 218, 217, 0.22);
      border-radius: 10px;
      padding: 16px 18px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .ax-index-heading {
      font-family: var(--ax-num);
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--ax-teal);
      margin-bottom: 10px;
      padding-bottom: 6px;
      border-bottom: 1px solid rgba(195, 218, 217, 0.18);
    }

    .ax-index-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 12px;
      padding: 6px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      font-size: 13px;
    }

    .ax-index-row:last-child {
      border-bottom: none;
    }

    .ax-index-label {
      color: #8FA3B0;
      font-size: 12px;
    }

    .ax-index-val {
      color: #FFFFFF;
      font-weight: 600;
      text-align: right;
    }

    /* 2단 경영진 요약 */
    .ax-exec-spread {
      background: var(--ax-surface);
      border: 1px solid var(--ax-border);
      border-radius: 10px;
      padding: 20px 24px;
      display: grid;
      grid-template-columns: 4fr 8fr;
      gap: 24px;
      align-items: start;
      break-inside: avoid;
    }

    .ax-exec-pullquote {
      background: var(--ax-mint);
      border-left: 4px solid var(--ax-teal);
      border-radius: 0 8px 8px 0;
      padding: 14px 16px;
    }

    .ax-exec-pull-kicker {
      font-family: var(--ax-num);
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--ax-teal-dark);
      margin-bottom: 6px;
    }

    .ax-exec-pull-stat {
      font-family: var(--ax-num);
      font-size: 20px;
      font-weight: 700;
      line-height: 1.35;
      color: var(--ax-navy-900);
      margin: 0 0 6px 0;
    }

    .ax-exec-pull-sub {
      font-size: 12.5px;
      color: var(--ax-muted);
      line-height: 1.5;
      margin: 0;
    }

    .ax-exec-body-label {
      font-family: var(--ax-num);
      font-size: 10.5px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--ax-subtle);
      margin-bottom: 8px;
    }

    .ax-exec-narrative {
      font-size: 14px;
      line-height: 1.75;
      color: var(--ax-ink);
      margin: 0;
    }

    /* ROI KPI 스트립 */
    .ax-ledger-grid {
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: 12px;
    }

    .ax-ledger-cell {
      background: var(--ax-surface);
      border: 1px solid var(--ax-border);
      border-radius: 10px;
      padding: 16px 16px 18px;
      break-inside: avoid;
      transition: transform 0.15s ease, border-color 0.15s ease;
    }

    .ax-ledger-cell:hover {
      transform: translateY(-2px);
      border-color: var(--ax-teal);
    }

    .ax-ledger-cell.is-highlight {
      background: linear-gradient(180deg, #FFFFFF 0%, var(--ax-mint) 100%);
      border-top: 3px solid var(--ax-teal);
    }

    .ax-ledger-label {
      font-size: 11.5px;
      font-weight: 700;
      color: var(--ax-subtle);
      margin-bottom: 8px;
    }

    .ax-ledger-value {
      font-family: var(--ax-num);
      font-size: 21px;
      font-weight: 700;
      color: var(--ax-navy-900);
      line-height: 1.2;
      margin-bottom: 5px;
      font-variant-numeric: tabular-nums;
    }

    .ax-ledger-value.is-positive {
      color: var(--ax-teal-dark);
    }

    .ax-ledger-sub {
      font-size: 12px;
      color: var(--ax-muted);
    }

    /* 공통 섹션 */
    .ax-section {
      background: var(--ax-surface);
      border: 1px solid var(--ax-border);
      border-radius: 10px;
      padding: 20px 22px;
    }

    .ax-section-head {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 12px;
      margin-bottom: 16px;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--ax-border);
    }

    .ax-section-title-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .ax-section-num {
      font-family: var(--ax-num);
      font-size: 12px;
      font-weight: 700;
      color: #FFFFFF;
      background: var(--ax-navy-900);
      padding: 2px 8px;
      border-radius: 4px;
    }

    .ax-section-title {
      font-size: 17px;
      font-weight: 700;
      color: var(--ax-navy-900);
      margin: 0;
    }

    .ax-section-subtitle {
      font-size: 12px;
      color: var(--ax-subtle);
    }

    /* Top 3 추천 과제 카드 */
    .ax-top3-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 14px;
    }

    .ax-top3-card {
      border: 1px solid var(--ax-border);
      border-radius: 10px;
      padding: 18px;
      background: var(--ax-canvas);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 14px;
      break-inside: avoid;
      transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
    }

    .ax-top3-card:hover {
      transform: translateY(-2px);
      border-color: var(--ax-teal);
      box-shadow: 0 6px 18px rgba(17, 23, 34, 0.06);
    }

    .ax-top3-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      margin-bottom: 10px;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--ax-border);
    }

    .ax-rank-num {
      font-family: var(--ax-num);
      font-size: 18px;
      font-weight: 700;
      color: var(--ax-teal-dark);
      line-height: 1;
    }

    .ax-phase-pill {
      display: inline-flex;
      align-items: center;
      font-size: 11px;
      font-weight: 700;
      padding: 3px 9px;
      border-radius: 999px;
      background: var(--ax-gold-soft);
      color: var(--ax-gold-ink);
      border: 1px solid var(--ax-gold);
    }

    .ax-top3-title {
      font-size: 15.5px;
      font-weight: 700;
      color: var(--ax-navy-900);
      margin: 0 0 8px 0;
      line-height: 1.4;
    }

    .ax-top3-desc {
      font-size: 13px;
      color: var(--ax-muted);
      line-height: 1.55;
      margin: 0 0 10px 0;
    }

    .ax-tools-row {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      margin-bottom: 10px;
    }

    .ax-tool-tag {
      font-size: 11px;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 4px;
      background: var(--ax-surface);
      border: 1px solid var(--ax-border);
      color: var(--ax-muted);
    }

    .ax-top3-metrics {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
      padding: 10px 12px;
      background: var(--ax-surface);
      border: 1px solid var(--ax-border);
      border-radius: 8px;
    }

    .ax-metric-item-label {
      font-size: 11px;
      color: var(--ax-subtle);
      display: block;
      margin-bottom: 2px;
    }

    .ax-metric-item-val {
      font-family: var(--ax-num);
      font-size: 14px;
      font-weight: 700;
      color: var(--ax-navy-900);
      font-variant-numeric: tabular-nums;
    }

    .ax-metric-item-val.is-green {
      color: var(--ax-teal-dark);
    }

    .ax-rationale {
      font-size: 12px;
      line-height: 1.55;
      color: var(--ax-muted);
      background: var(--ax-surface);
      border-left: 3px solid var(--ax-teal);
      border-radius: 0 6px 6px 0;
      padding: 8px 10px;
    }

    /* 수동 핸드오프 위험 요약 */
    .ax-risk-badges {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .ax-risk-pill {
      font-size: 11px;
      font-weight: 700;
      padding: 3px 9px;
      border-radius: 999px;
    }

    .ax-risk-high {
      background: var(--ax-danger-soft);
      color: var(--ax-danger);
      border: 1px solid #F2B8B8;
    }

    .ax-risk-medium {
      background: var(--ax-gold-soft);
      color: var(--ax-gold-ink);
      border: 1px solid var(--ax-gold);
    }

    .ax-risk-low {
      background: var(--ax-teal-soft);
      color: var(--ax-teal-dark);
      border: 1px solid var(--ax-border);
    }

    .ax-handoff-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
    }

    .ax-handoff-table th {
      text-align: left;
      font-size: 11px;
      font-weight: 700;
      color: var(--ax-subtle);
      padding: 9px 10px;
      border-bottom: 2px solid var(--ax-border);
      background: var(--ax-canvas);
    }

    .ax-handoff-table td {
      padding: 11px 10px;
      border-bottom: 1px solid var(--ax-border);
      vertical-align: top;
      color: var(--ax-ink);
    }

    .ax-handoff-table tr:last-child td {
      border-bottom: none;
    }

    .ax-handoff-route {
      font-weight: 600;
      color: var(--ax-navy-900);
    }

    .ax-handoff-notes {
      font-size: 12px;
      color: var(--ax-muted);
      margin-top: 3px;
    }

    /* 30-60-90일 3단 로드맵 (상단 컬러 바: #01B2A9 / #002C5C / #111722) */
    .ax-roadmap-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 14px;
    }

    .ax-roadmap-col {
      border: 1px solid var(--ax-border);
      border-radius: 10px;
      background: var(--ax-canvas);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      break-inside: avoid;
    }

    .ax-roadmap-col.phase-30 {
      border-top: 4px solid var(--ax-teal);
    }

    .ax-roadmap-col.phase-60 {
      border-top: 4px solid var(--ax-navy-mid);
    }

    .ax-roadmap-col.phase-90 {
      border-top: 4px solid var(--ax-navy-900);
    }

    .ax-roadmap-col-head {
      padding: 14px 16px;
      border-bottom: 1px solid var(--ax-border);
      background: var(--ax-surface);
    }

    .ax-roadmap-phase-tag {
      font-family: var(--ax-num);
      font-size: 10.5px;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: var(--ax-teal-dark);
      margin-bottom: 4px;
    }

    .ax-roadmap-col.phase-60 .ax-roadmap-phase-tag {
      color: var(--ax-navy-mid);
    }

    .ax-roadmap-col.phase-90 .ax-roadmap-phase-tag {
      color: var(--ax-navy-900);
    }

    .ax-roadmap-col-title {
      font-size: 15px;
      font-weight: 700;
      color: var(--ax-navy-900);
      margin: 0;
    }

    .ax-roadmap-col-sub {
      font-size: 12px;
      color: var(--ax-subtle);
      margin-top: 4px;
    }

    .ax-roadmap-list {
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      flex: 1;
    }

    .ax-roadmap-item {
      background: var(--ax-surface);
      border: 1px solid var(--ax-border);
      border-radius: 8px;
      padding: 11px 13px;
      transition: transform 0.15s ease, border-color 0.15s ease;
    }

    .ax-roadmap-item:hover {
      transform: translateY(-1px);
      border-color: var(--ax-teal);
    }

    .ax-roadmap-item.is-top3 {
      border-left: 3px solid var(--ax-teal);
    }

    .ax-roadmap-item-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 8px;
      margin-bottom: 5px;
    }

    .ax-roadmap-item-title {
      font-size: 13px;
      font-weight: 700;
      color: var(--ax-navy-900);
      line-height: 1.4;
    }

    .ax-top3-star {
      font-family: var(--ax-num);
      font-size: 10px;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 4px;
      background: var(--ax-gold);
      color: var(--ax-navy-900);
      white-space: nowrap;
    }

    .ax-roadmap-item-meta {
      font-family: var(--ax-num);
      font-size: 12px;
      color: var(--ax-muted);
      display: flex;
      justify-content: space-between;
      gap: 8px;
      margin-top: 6px;
      font-variant-numeric: tabular-nums;
    }

    .ax-empty-box {
      padding: 18px;
      text-align: center;
      font-size: 13px;
      color: var(--ax-subtle);
      background: var(--ax-canvas);
      border: 1px dashed var(--ax-border);
      border-radius: 8px;
    }

    @media (max-width: 1024px) {
      .ax-cover-spread,
      .ax-exec-spread {
        grid-template-columns: 1fr;
      }
      .ax-ledger-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
      .ax-top3-grid,
      .ax-roadmap-grid {
        grid-template-columns: 1fr;
      }
    }

    @media print {
      .no-print,
      .ax-report-actions {
        display: none !important;
      }
      .ax-report {
        max-width: 100%;
        padding: 0;
        background: #ffffff;
      }
      .ax-cover-spread {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .ax-exec-spread,
      .ax-ledger-cell,
      .ax-section,
      .ax-top3-card,
      .ax-roadmap-col,
      .ax-roadmap-item {
        background: #ffffff !important;
        box-shadow: none !important;
        break-inside: avoid;
      }
      .ax-ledger-grid {
        grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
      }
      .ax-top3-grid,
      .ax-roadmap-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
      }
    }
  `;
  document.head.appendChild(style);
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatCurrency(amount, isKrw = false) {
  const num = Math.round(Number(amount) || 0);
  if (isKrw) {
    return `${num.toLocaleString('ko-KR')}원`;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(num);
}

function formatNumber(num, decimals = 1) {
  const val = Number(num) || 0;
  return Number.isInteger(val) ? String(val) : val.toFixed(decimals);
}

function getPriorityScore(auto) {
  const impact = Number(auto?.impactScore) || 0;
  const effort = Math.max(Number(auto?.effortScore) || 1, 1);
  return impact / effort;
}

function getPhaseLabel(phase) {
  if (phase === '30') return '1~30일';
  if (phase === '60') return '31~60일';
  if (phase === '90') return '61~90일';
  return `${phase || '30'}일 단계`;
}

function getRiskLabel(risk) {
  if (risk === 'high') return '높음';
  if (risk === 'medium') return '보통';
  return '낮음';
}

function computeReportMetrics(state) {
  const client = state?.client || {};
  const teams = Array.isArray(state?.teams) ? state.teams : [];
  const processSteps = Array.isArray(state?.processSteps) ? state.processSteps : [];
  const automations = Array.isArray(state?.automations) ? state.automations : [];

  const hourlyRate = Number(client.hourlyRate) || 65;
  const isKrw = hourlyRate >= 1000;

  const teamManualHours = teams.reduce(
    (sum, t) => sum + (Number(t?.weeklyManualHours) || 0),
    0
  );
  const stepManualHours = processSteps.reduce(
    (sum, s) => sum + (((Number(s?.minutesPerRun) || 0) * (Number(s?.runsPerWeek) || 0)) / 60),
    0
  );
  const totalManualHoursPerWeek = teamManualHours > 0 ? teamManualHours : stepManualHours;

  const sortedByScore = [...automations].sort((a, b) => {
    const scoreDiff = getPriorityScore(b) - getPriorityScore(a);
    if (Math.abs(scoreDiff) > 0.001) return scoreDiff;
    return (Number(b?.hoursSavedPerWeek) || 0) - (Number(a?.hoursSavedPerWeek) || 0);
  });

  const explicitTop3 = sortedByScore.filter((a) => Boolean(a?.selectedTop3));
  const top3 = (explicitTop3.length > 0 ? explicitTop3 : sortedByScore).slice(0, 3);
  const usedFallbackTop3 = explicitTop3.length === 0 && top3.length > 0;

  const top3HoursSavedPerWeek = top3.reduce(
    (sum, a) => sum + (Number(a?.hoursSavedPerWeek) || 0),
    0
  );
  const annualSavings = top3HoursSavedPerWeek * 52 * hourlyRate;
  const implementationCost = top3.reduce(
    (sum, a) => sum + (Number(a?.implementationCost) || 0),
    0
  );

  const netYear1Benefit = annualSavings - implementationCost;
  const netYear1RoiPct =
    implementationCost > 0
      ? (netYear1Benefit / implementationCost) * 100
      : annualSavings > 0
      ? 100
      : 0;
  const paybackMonths =
    annualSavings > 0 ? implementationCost / (annualSavings / 12) : 0;

  const flaggedHandoffs = [...processSteps]
    .filter((s) => Boolean(s?.isManualHandoff))
    .sort((a, b) => (Number(a?.order) || 0) - (Number(b?.order) || 0));

  const highRiskCount = flaggedHandoffs.filter((s) => s.handoffRisk === 'high').length;
  const mediumRiskCount = flaggedHandoffs.filter((s) => s.handoffRisk === 'medium').length;
  const lowRiskCount = flaggedHandoffs.filter(
    (s) => s.handoffRisk !== 'high' && s.handoffRisk !== 'medium'
  ).length;

  return {
    client,
    teams,
    processSteps,
    automations,
    hourlyRate,
    isKrw,
    totalManualHoursPerWeek,
    top3,
    usedFallbackTop3,
    top3HoursSavedPerWeek,
    annualSavings,
    implementationCost,
    netYear1Benefit,
    netYear1RoiPct,
    paybackMonths,
    flaggedHandoffs,
    highRiskCount,
    mediumRiskCount,
    lowRiskCount,
  };
}

function buildExecutiveNarrative(metrics) {
  const company = metrics.client.companyName || '고객사';
  const industry = metrics.client.industry || 'B2B';
  const teamSize = metrics.client.teamSize ? ` (임직원 ${metrics.client.teamSize}명 규모)` : '';
  const hoursStr = formatNumber(metrics.totalManualHoursPerWeek, 1);
  const handoffCount = metrics.flaggedHandoffs.length;
  const highRiskStr =
    metrics.highRiskCount > 0 ? ` (고위험 ${metrics.highRiskCount}건 포함)` : '';
  const top3Count = metrics.top3.length;
  const savedStr = formatNumber(metrics.top3HoursSavedPerWeek, 1);
  const pctReclaimed =
    metrics.totalManualHoursPerWeek > 0
      ? Math.min(100, Math.round((metrics.top3HoursSavedPerWeek / metrics.totalManualHoursPerWeek) * 100))
      : 0;

  if (top3Count === 0) {
    return `${company}${teamSize}의 ${industry} 운영 프로세스에 대한 AI·자동화 진단 결과, 주간 총 ${hoursStr}시간의 수작업 업무와 ${handoffCount}건의 수동 핸드오프 병목${highRiskStr}이 확인되었습니다. 스코어카드 탭에서 자동화 후보를 추가하면 예상 ROI와 30-60-90일 실행 로드맵이 자동으로 산출됩니다.`;
  }

  const paybackText =
    metrics.annualSavings > 0
      ? `약 ${formatNumber(metrics.paybackMonths, 1)}개월 내 투자금 회수`
      : '즉각적인 업무 여유 확보';

  return `${company}${teamSize}의 ${industry} 핵심 워크플로우를 진단한 결과, 주간 총 ${hoursStr}시간의 반복 수작업과 ${handoffCount}건의 수동 핸드오프 병목${highRiskStr}이 파악되었습니다. 우선순위가 가장 높은 Top ${top3Count} 자동화 과제를 도입할 경우 주당 ${savedStr}시간(전체 수작업의 ${pctReclaimed}%)을 절감할 수 있으며, ${formatCurrency(metrics.implementationCost, metrics.isKrw)}의 초기 구축 비용 대비 연간 ${formatCurrency(metrics.annualSavings, metrics.isKrw)}의 인건비 절감 효과를 거두어 1년차 순 ROI ${Math.round(metrics.netYear1RoiPct)}% 및 ${paybackText}가 기대됩니다.`;
}

function buildPlainTextSummary(metrics, narrative) {
  const lines = [
    `AUTO AX — AI 자동화 진단 경영진 보고서`,
    `고객사: ${metrics.client.companyName || '미입력'} (${metrics.client.industry || '미입력'})`,
    `진단일: ${metrics.client.auditDate || '미입력'} | 담당 컨설턴트: ${metrics.client.consultantName || '미입력'}`,
    ``,
    `[경영진 요약]`,
    narrative,
    ``,
    `[핵심 ROI 지표]`,
    `- 진단된 주간 수작업 시간: ${formatNumber(metrics.totalManualHoursPerWeek, 1)}시간/주`,
    `- Top 3 예상 절감 시간: ${formatNumber(metrics.top3HoursSavedPerWeek, 1)}시간/주`,
    `- 연간 예상 비용 절감액: ${formatCurrency(metrics.annualSavings, metrics.isKrw)}`,
    `- 초기 구축 투자 비용: ${formatCurrency(metrics.implementationCost, metrics.isKrw)}`,
    `- 1년차 순 ROI: ${Math.round(metrics.netYear1RoiPct)}% (투자 회수 기간: ${formatNumber(metrics.paybackMonths, 1)}개월)`,
    ``,
    `[Top ${metrics.top3.length} 추천 자동화 과제]`,
  ];

  metrics.top3.forEach((item, idx) => {
    const annualVal = (Number(item.hoursSavedPerWeek) || 0) * 52 * metrics.hourlyRate;
    lines.push(
      `${idx + 1}. ${item.title} [${getPhaseLabel(item.phase)}] — 주당 ${formatNumber(item.hoursSavedPerWeek, 1)}시간 절감 (연 ${formatCurrency(annualVal, metrics.isKrw)}), 구축비 ${formatCurrency(item.implementationCost, metrics.isKrw)}`
    );
  });

  if (metrics.flaggedHandoffs.length > 0) {
    lines.push(``, `[수동 핸드오프 위험 요약 (${metrics.flaggedHandoffs.length}건)]`);
    metrics.flaggedHandoffs.forEach((step) => {
      const hrs = (((Number(step.minutesPerRun) || 0) * (Number(step.runsPerWeek) || 0)) / 60).toFixed(1);
      lines.push(
        `- [위험도: ${getRiskLabel(step.handoffRisk)}] ${step.title}: ${step.handoffFrom || step.ownerTeam || '출발팀'} -> ${step.handoffTo || '전달팀'} (주 ${hrs}시간)`
      );
    });
  }

  return lines.join('\n');
}

function buildRationale(auto, processSteps, hourlyRate, isKrw) {
  const score = getPriorityScore(auto).toFixed(1);
  const annualVal = (Number(auto.hoursSavedPerWeek) || 0) * 52 * hourlyRate;
  const linkedSteps = (Array.isArray(auto.targetStepIds) ? auto.targetStepIds : [])
    .map((id) => processSteps.find((s) => s.id === id))
    .filter(Boolean);

  const targetText =
    linkedSteps.length > 0
      ? `연계 단계: ${linkedSteps.map((s) => `'${s.title}'`).join(', ')}.`
      : '반복적인 수작업 병목을 직접 해소합니다.';

  return `우선순위 지수 ${score} (기대효과 ${auto.impactScore || 0}/10 · 구현난이도 ${auto.effortScore || 1}/10). ${targetText} ${getPhaseLabel(auto.phase)} 단계 도입 시 연간 ${formatCurrency(annualVal, isKrw)}의 업무 가치가 창출됩니다.`;
}

async function copyTextToClipboard(text) {
  if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_) {
      // 클립보드 API 실패 시 fallback 사용
    }
  }
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  let ok = false;
  try {
    ok = document.execCommand('copy');
  } catch (_) {
    ok = false;
  }
  document.body.removeChild(textarea);
  return ok;
}

export function renderReport(container, state, actions) {
  if (!container) return;
  ensureReportStyles();

  const metrics = computeReportMetrics(state);
  const narrative = buildExecutiveNarrative(metrics);
  const plainTextSummary = buildPlainTextSummary(metrics, narrative);

  const phases = [
    { key: '30', code: 'PHASE 01 · 1~30일', title: '빠른 성과 및 기반 구축', subtitle: '즉각적인 ROI 및 저난이도 연동' },
    { key: '60', code: 'PHASE 02 · 31~60일', title: '핵심 워크플로우 자동화', subtitle: '부서 간 핸드오프 및 시스템 동기화' },
    { key: '90', code: 'PHASE 03 · 61~90일', title: '확장 및 AI 고도화', subtitle: '지능형 오케스트레이션 및 예측 자동화' },
  ];

  const top3Html =
    metrics.top3.length === 0
      ? `<div class="ax-empty-box">아직 등록된 자동화 과제가 없습니다. 스코어카드 탭에서 자동화 후보를 추가해 주세요.</div>`
      : `<div class="ax-top3-grid">
          ${metrics.top3
            .map((auto, index) => {
              const annualVal = (Number(auto.hoursSavedPerWeek) || 0) * 52 * metrics.hourlyRate;
              const tools = Array.isArray(auto.toolsNeeded) ? auto.toolsNeeded : [];
              const rationale = buildRationale(auto, metrics.processSteps, metrics.hourlyRate, metrics.isKrw);
              return `
                <article class="ax-top3-card">
                  <div>
                    <div class="ax-top3-head">
                      <span class="ax-rank-num">0${index + 1}</span>
                      <span class="ax-phase-pill">${escapeHtml(getPhaseLabel(auto.phase))}</span>
                    </div>
                    <h3 class="ax-top3-title">${escapeHtml(auto.title || '제목 없는 자동화 과제')}</h3>
                    <p class="ax-top3-desc">${escapeHtml(auto.description || '수작업 프로세스를 자동화하여 처리 속도와 정확도를 높입니다.')}</p>
                    ${
                      tools.length > 0
                        ? `<div class="ax-tools-row">${tools
                            .map((t) => `<span class="ax-tool-tag">${escapeHtml(t)}</span>`)
                            .join('')}</div>`
                        : ''
                    }
                  </div>
                  <div>
                    <div class="ax-top3-metrics">
                      <div>
                        <span class="ax-metric-item-label">주간 절감 시간</span>
                        <span class="ax-metric-item-val">${formatNumber(auto.hoursSavedPerWeek, 1)}시간/주</span>
                      </div>
                      <div>
                        <span class="ax-metric-item-label">연간 절감 가치</span>
                        <span class="ax-metric-item-val is-green">${formatCurrency(annualVal, metrics.isKrw)}</span>
                      </div>
                      <div>
                        <span class="ax-metric-item-label">구축 투자비</span>
                        <span class="ax-metric-item-val">${formatCurrency(auto.implementationCost, metrics.isKrw)}</span>
                      </div>
                      <div>
                        <span class="ax-metric-item-label">기대효과 / 난이도</span>
                        <span class="ax-metric-item-val">${auto.impactScore || 0} / ${auto.effortScore || 1}</span>
                      </div>
                    </div>
                    <div class="ax-rationale" style="margin-top: 10px;">
                      ${escapeHtml(rationale)}
                    </div>
                  </div>
                </article>
              `;
            })
            .join('')}
        </div>`;

  const handoffsHtml =
    metrics.flaggedHandoffs.length === 0
      ? `<div class="ax-empty-box">현재 프로세스 맵에 수동 핸드오프 위험으로 표시된 단계가 없습니다.</div>`
      : `<table class="ax-handoff-table">
          <thead>
            <tr>
              <th>단계</th>
              <th>수동 전달 경로</th>
              <th>담당 팀 및 도구</th>
              <th>주간 소요 시간</th>
              <th>위험도</th>
            </tr>
          </thead>
          <tbody>
            ${metrics.flaggedHandoffs
              .map((step) => {
                const weeklyHrs = (((Number(step.minutesPerRun) || 0) * (Number(step.runsPerWeek) || 0)) / 60).toFixed(1);
                const risk = ['high', 'medium', 'low'].includes(step.handoffRisk) ? step.handoffRisk : 'medium';
                return `
                  <tr>
                    <td>
                      <strong>#${escapeHtml(step.order ?? '')} ${escapeHtml(step.title || '프로세스 단계')}</strong>
                      ${step.notes ? `<div class="ax-handoff-notes">${escapeHtml(step.notes)}</div>` : ''}
                    </td>
                    <td>
                      <span class="ax-handoff-route">${escapeHtml(step.handoffFrom || step.ownerTeam || '출발팀')} &rarr; ${escapeHtml(step.handoffTo || '전달팀')}</span>
                    </td>
                    <td>
                      <div>${escapeHtml(step.ownerTeam || '미지정')}</div>
                      <div class="ax-handoff-notes">${escapeHtml(step.toolUsed || '수작업')}</div>
                    </td>
                    <td><strong>${weeklyHrs}시간/주</strong></td>
                    <td><span class="ax-risk-pill ax-risk-${risk}">${escapeHtml(getRiskLabel(risk))}</span></td>
                  </tr>
                `;
              })
              .join('')}
          </tbody>
        </table>`;

  const roadmapHtml = phases
    .map((phase) => {
      const items = metrics.automations.filter((a) => String(a?.phase || '30') === phase.key);
      const phaseHours = items.reduce((sum, a) => sum + (Number(a?.hoursSavedPerWeek) || 0), 0);
      return `
        <div class="ax-roadmap-col phase-${escapeHtml(phase.key)}">
          <div class="ax-roadmap-col-head">
            <div class="ax-roadmap-phase-tag">${escapeHtml(phase.code)}</div>
            <h3 class="ax-roadmap-col-title">${escapeHtml(phase.title)}</h3>
            <div class="ax-roadmap-col-sub">${escapeHtml(phase.subtitle)} &bull; 주 ${formatNumber(phaseHours, 1)}시간 절감</div>
          </div>
          <div class="ax-roadmap-list">
            ${
              items.length === 0
                ? `<div class="ax-empty-box">이 단계에 배정된 과제가 없습니다.</div>`
                : items
                    .map((item) => {
                      const isTop = metrics.top3.some((t) => t.id === item.id);
                      const tools = Array.isArray(item.toolsNeeded) ? item.toolsNeeded.slice(0, 3) : [];
                      return `
                        <div class="ax-roadmap-item ${isTop ? 'is-top3' : ''}">
                          <div class="ax-roadmap-item-top">
                            <span class="ax-roadmap-item-title">${escapeHtml(item.title || '자동화 과제')}</span>
                            ${isTop ? `<span class="ax-top3-star">TOP 3</span>` : ''}
                          </div>
                          ${
                            tools.length > 0
                              ? `<div class="ax-tools-row" style="margin-bottom: 4px;">${tools
                                  .map((t) => `<span class="ax-tool-tag">${escapeHtml(t)}</span>`)
                                  .join('')}</div>`
                              : ''
                          }
                          <div class="ax-roadmap-item-meta">
                            <span>주 ${formatNumber(item.hoursSavedPerWeek, 1)}시간 절감</span>
                            <span>${formatCurrency(item.implementationCost, metrics.isKrw)}</span>
                          </div>
                        </div>
                      `;
                    })
                    .join('')
            }
          </div>
        </div>
      `;
    })
    .join('');

  container.innerHTML = `
    <div class="ax-report">
      <div class="ax-report-actions no-print">
        <div class="ax-report-actions-left">
          <button type="button" class="ax-r-btn" data-action="back-scorecard">&larr; 스코어카드</button>
          <div>
            <div class="ax-report-actions-kicker">EXECUTIVE AUDIT REPORT · AUTO AX</div>
            <div class="ax-report-actions-title">고객용 경영진 진단 보고서</div>
          </div>
        </div>
        <div class="ax-report-actions-right">
          <span class="ax-r-copy-status" data-role="copy-status" hidden>클립보드에 복사되었습니다</span>
          <button type="button" class="ax-r-btn" data-action="copy-summary">요약 복사</button>
          <button type="button" class="ax-r-btn ax-r-btn-primary" data-action="print-pdf">PDF로 인쇄</button>
        </div>
      </div>

      <div class="ax-report-sheet">
        <header class="ax-cover-spread">
          <div class="ax-cover-left">
            <div>
              <div class="ax-cover-issue"><span class="ax-cover-dot"></span> AI &amp; AUTOMATION AUDIT DOSSIER</div>
              <h1 class="ax-cover-company">${escapeHtml(metrics.client.companyName || '고객사명 미입력')}</h1>
            </div>
            <p class="ax-cover-deck">${escapeHtml(metrics.client.industry || 'B2B 서비스')} 분야의 핵심 운영 워크플로우를 정밀 진단하고, 수작업 병목 해소 및 30-60-90일 자동화 실행 로드맵을 제안합니다.</p>
          </div>
          <aside class="ax-cover-index" aria-label="보고서 발행 정보">
            <div class="ax-index-heading">CLIENT TELEMETRY · 진단 메타데이터</div>
            <div class="ax-index-row">
              <span class="ax-index-label">진단 대상</span>
              <span class="ax-index-val">${escapeHtml(metrics.client.companyName || '미입력')} (${escapeHtml(metrics.client.teamSize || '—')}명)</span>
            </div>
            <div class="ax-index-row">
              <span class="ax-index-label">진단 일자</span>
              <span class="ax-index-val">${escapeHtml(metrics.client.auditDate || '오늘')}</span>
            </div>
            <div class="ax-index-row">
              <span class="ax-index-label">작성 컨설턴트</span>
              <span class="ax-index-val">${escapeHtml(metrics.client.consultantName || '수석 컨설턴트')}</span>
            </div>
            <div class="ax-index-row">
              <span class="ax-index-label">적용 인건비 단가</span>
              <span class="ax-index-val">${formatCurrency(metrics.hourlyRate, metrics.isKrw)} / 시간</span>
            </div>
          </aside>
        </header>

        <section class="ax-exec-spread" aria-label="경영진 요약">
          <div class="ax-exec-pullquote">
            <div class="ax-exec-pull-kicker">KEY TAKEAWAY</div>
            <p class="ax-exec-pull-stat">주당 ${formatNumber(metrics.top3HoursSavedPerWeek, 1)}시간 절감 · 순 ROI ${Math.round(metrics.netYear1RoiPct)}%</p>
            <p class="ax-exec-pull-sub">Top ${metrics.top3.length} 우선 자동화 도입 시 연간 ${formatCurrency(metrics.annualSavings, metrics.isKrw)}의 비용 절감 효과가 기대됩니다.</p>
          </div>
          <div>
            <div class="ax-exec-body-label">EXECUTIVE SUMMARY · 경영진 요약</div>
            <p class="ax-exec-narrative">${escapeHtml(narrative)}</p>
          </div>
        </section>

        <section class="ax-ledger-grid" aria-label="ROI 및 기대효과 지표">
          <div class="ax-ledger-cell">
            <div class="ax-ledger-label">진단된 주간 수작업</div>
            <div class="ax-ledger-value">${formatNumber(metrics.totalManualHoursPerWeek, 1)}시간/주</div>
            <div class="ax-ledger-sub">연 ${formatCurrency(metrics.totalManualHoursPerWeek * 52 * metrics.hourlyRate, metrics.isKrw)} 규모</div>
          </div>
          <div class="ax-ledger-cell is-highlight">
            <div class="ax-ledger-label">Top 3 예상 절감</div>
            <div class="ax-ledger-value">${formatNumber(metrics.top3HoursSavedPerWeek, 1)}시간/주</div>
            <div class="ax-ledger-sub">연간 ${formatNumber(metrics.top3HoursSavedPerWeek * 52, 0)}시간 확보</div>
          </div>
          <div class="ax-ledger-cell is-highlight">
            <div class="ax-ledger-label">연간 비용 절감액</div>
            <div class="ax-ledger-value is-positive">${formatCurrency(metrics.annualSavings, metrics.isKrw)}</div>
            <div class="ax-ledger-sub">시간당 ${formatCurrency(metrics.hourlyRate, metrics.isKrw)} 기준</div>
          </div>
          <div class="ax-ledger-cell">
            <div class="ax-ledger-label">구축 투자 비용</div>
            <div class="ax-ledger-value">${formatCurrency(metrics.implementationCost, metrics.isKrw)}</div>
            <div class="ax-ledger-sub">Top 3 일회성 구축비</div>
          </div>
          <div class="ax-ledger-cell is-highlight">
            <div class="ax-ledger-label">1년차 순 ROI</div>
            <div class="ax-ledger-value is-positive">${Math.round(metrics.netYear1RoiPct)}%</div>
            <div class="ax-ledger-sub">회수 기간: ${metrics.annualSavings > 0 ? `${formatNumber(metrics.paybackMonths, 1)}개월` : '산출 불가'}</div>
          </div>
        </section>

        <section class="ax-section">
          <div class="ax-section-head">
            <div class="ax-section-title-wrap">
              <span class="ax-section-num">01</span>
              <h2 class="ax-section-title">Top 3 추천 자동화 과제</h2>
            </div>
            <span class="ax-section-subtitle">${metrics.usedFallbackTop3 ? '기대효과/난이도 점수 기준 자동 선정' : '컨설턴트 선정 핵심 우선순위 3건'}</span>
          </div>
          ${top3Html}
        </section>

        <section class="ax-section">
          <div class="ax-section-head">
            <div class="ax-section-title-wrap">
              <span class="ax-section-num">02</span>
              <h2 class="ax-section-title">수동 핸드오프 위험 요약</h2>
            </div>
            <div class="ax-risk-badges">
              <span class="ax-risk-pill ax-risk-high">고위험 ${metrics.highRiskCount}건</span>
              <span class="ax-risk-pill ax-risk-medium">보통 ${metrics.mediumRiskCount}건</span>
              <span class="ax-risk-pill ax-risk-low">낮음 ${metrics.lowRiskCount}건</span>
            </div>
          </div>
          ${handoffsHtml}
        </section>

        <section class="ax-section">
          <div class="ax-section-head">
            <div class="ax-section-title-wrap">
              <span class="ax-section-num">03</span>
              <h2 class="ax-section-title">30-60-90일 실행 로드맵</h2>
            </div>
            <span class="ax-section-subtitle">총 ${metrics.automations.length}개 과제의 단계별 도입 일정</span>
          </div>
          <div class="ax-roadmap-grid">
            ${roadmapHtml}
          </div>
        </section>
      </div>
    </div>
  `;

  const printBtn = container.querySelector('[data-action="print-pdf"]');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  const copyBtn = container.querySelector('[data-action="copy-summary"]');
  const copyStatus = container.querySelector('[data-role="copy-status"]');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const ok = await copyTextToClipboard(plainTextSummary);
      if (copyStatus) {
        copyStatus.textContent = ok ? '클립보드에 복사되었습니다' : '요약이 준비되었습니다';
        copyStatus.hidden = false;
        setTimeout(() => {
          if (copyStatus.isConnected) copyStatus.hidden = true;
        }, 2500);
      }
    });
  }

  const backBtn = container.querySelector('[data-action="back-scorecard"]');
  if (backBtn && actions && typeof actions.navigateTo === 'function') {
    backBtn.addEventListener('click', () => {
      actions.navigateTo('scorecard');
    });
  }
}

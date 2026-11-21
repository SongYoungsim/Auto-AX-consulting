const STORAGE_KEY = 'auto_ax_state_v1';

export const DEFAULT_STATE = {
  client: {
    companyName: '에이펙스 산업유통(주)',
    industry: 'B2B 산업자재 유통·제조',
    teamSize: 48,
    hourlyRate: 65,
    auditDate: '2026-11-18',
    consultantName: '김서연 수석 컨설턴트',
  },
  teams: [
    {
      id: 'team-sales',
      name: '영업 및 견적팀',
      headcount: 10,
      primaryTools: ['HubSpot CRM', 'Excel / Google Sheets', 'Outlook / Gmail'],
      weeklyManualHours: 38,
      painPoints:
        'PDF 및 이메일 첨부파일로 접수되는 견적 요청(RFQ) 사양을 엑셀 단가표에 수작업으로 옮겨 적고 있음.',
    },
    {
      id: 'team-ops',
      name: '수주 운영팀',
      headcount: 8,
      primaryTools: ['NetSuite ERP', 'Excel / Google Sheets', 'Slack'],
      weeklyManualHours: 44,
      painPoints:
        '승인된 견적서를 NetSuite 수주 전표로 다시 입력하고 재고 확인을 수시로 추적해야 함.',
    },
    {
      id: 'team-finance',
      name: '재무·정산팀',
      headcount: 5,
      primaryTools: ['NetSuite ERP', 'Excel / Google Sheets'],
      weeklyManualHours: 26,
      painPoints:
        '발주서(PO)·납품명세서·세금계산서 3자 대사 및 미수금 독촉 이메일 발송을 수작업으로 처리함.',
    },
    {
      id: 'team-cs',
      name: '고객지원팀',
      headcount: 7,
      primaryTools: ['Zendesk', 'NetSuite ERP', 'Slack'],
      weeklyManualHours: 32,
      painPoints:
        '배송 현황(WISMO) 문의 응대를 위해 여러 화물사 포털에 일일이 로그인해 송장 상태를 조회함.',
    },
  ],
  tools: [
    {
      id: 'tool-hubspot',
      name: 'HubSpot CRM',
      category: 'CRM',
      monthlyCost: 1200,
      hasApi: true,
    },
    {
      id: 'tool-netsuite',
      name: 'NetSuite ERP',
      category: 'ERP',
      monthlyCost: 3400,
      hasApi: true,
    },
    {
      id: 'tool-zendesk',
      name: 'Zendesk',
      category: '고객지원',
      monthlyCost: 850,
      hasApi: true,
    },
    {
      id: 'tool-sheets',
      name: 'Excel / Google Sheets',
      category: '스프레드시트',
      monthlyCost: 320,
      hasApi: true,
    },
    {
      id: 'tool-slack',
      name: 'Slack',
      category: '커뮤니케이션',
      monthlyCost: 450,
      hasApi: true,
    },
    {
      id: 'tool-carrier',
      name: '레거시 물류 포털',
      category: '물류·배송',
      monthlyCost: 180,
      hasApi: false,
    },
  ],
  processSteps: [
    {
      id: 'step-1',
      order: 1,
      title: '인바운드 RFQ 접수 및 사양 추출',
      ownerTeam: '영업 및 견적팀',
      toolUsed: 'Outlook / Gmail',
      minutesPerRun: 25,
      runsPerWeek: 45,
      isManualHandoff: true,
      handoffFrom: '고객 이메일',
      handoffTo: '영업 및 견적팀',
      handoffRisk: 'high',
      notes: '비정형 PDF로 접수된 품목·규격을 담당자가 견적 시트에 수기로 복사함.',
    },
    {
      id: 'step-2',
      order: 2,
      title: '마진율 및 운임 견적 산출',
      ownerTeam: '영업 및 견적팀',
      toolUsed: 'Excel / Google Sheets',
      minutesPerRun: 30,
      runsPerWeek: 40,
      isManualHandoff: false,
      handoffFrom: '',
      handoffTo: '',
      handoffRisk: 'medium',
      notes: '공급사 구간별 할인율과 지역별 운임표를 수작업으로 조회해 계산함.',
    },
    {
      id: 'step-3',
      order: 3,
      title: '견적 승인 및 CRM 이력 등록',
      ownerTeam: '영업 및 견적팀',
      toolUsed: 'HubSpot CRM',
      minutesPerRun: 12,
      runsPerWeek: 40,
      isManualHandoff: true,
      handoffFrom: '영업 및 견적팀',
      handoffTo: '수주 운영팀',
      handoffRisk: 'high',
      notes: '수주 확정 견적을 PDF로 운영팀에 메일 전달하며 HubSpot-NetSuite 자동 연동이 없음.',
    },
    {
      id: 'step-4',
      order: 4,
      title: 'NetSuite 수주 전표 입력',
      ownerTeam: '수주 운영팀',
      toolUsed: 'NetSuite ERP',
      minutesPerRun: 22,
      runsPerWeek: 35,
      isManualHandoff: true,
      handoffFrom: '수주 운영팀',
      handoffTo: '물류창고 / 공급사',
      handoffRisk: 'high',
      notes: '품목 코드(SKU), 수량, 배송지 정보를 ERP에 중복 입력함.',
    },
    {
      id: 'step-5',
      order: 5,
      title: '배송 추적 및 WISMO 문의 응대',
      ownerTeam: '고객지원팀',
      toolUsed: 'Zendesk',
      minutesPerRun: 15,
      runsPerWeek: 65,
      isManualHandoff: true,
      handoffFrom: '레거시 물류 포털',
      handoffTo: '고객지원팀',
      handoffRisk: 'medium',
      notes: '상담원이 4개 화물사 포털에 각각 접속해 배송 상태를 복사·안내함.',
    },
    {
      id: 'step-6',
      order: 6,
      title: '발주·입고·계산서 3자 대사',
      ownerTeam: '재무·정산팀',
      toolUsed: 'NetSuite ERP',
      minutesPerRun: 20,
      runsPerWeek: 35,
      isManualHandoff: true,
      handoffFrom: '수주 운영팀',
      handoffTo: '재무·정산팀',
      handoffRisk: 'high',
      notes: '공급사 PDF 청구서와 NetSuite 발주서·입고 내역을 수기로 대조함.',
    },
    {
      id: 'step-7',
      order: 7,
      title: '주간 매출채권(AR) 현황 및 독촉',
      ownerTeam: '재무·정산팀',
      toolUsed: 'Excel / Google Sheets',
      minutesPerRun: 45,
      runsPerWeek: 6,
      isManualHandoff: false,
      handoffFrom: '',
      handoffTo: '',
      handoffRisk: 'low',
      notes: '연체 채권 리포트를 추출해 거래처별 결제 안내 메일을 개별 작성함.',
    },
  ],
  automations: [
    {
      id: 'auto-1',
      title: 'AI RFQ 파서 및 자동 견적 초안 생성',
      description:
        '이메일·PDF 견적 요청서에서 품목과 규격을 LLM으로 자동 추출해 HubSpot 견적 초안을 즉시 생성합니다.',
      targetStepIds: ['step-1', 'step-2'],
      impactScore: 9,
      effortScore: 4,
      hoursSavedPerWeek: 24,
      implementationCost: 8500,
      toolsNeeded: ['OpenAI / Claude API', 'n8n / Make', 'HubSpot CRM'],
      phase: '30',
      selectedTop3: true,
    },
    {
      id: 'auto-2',
      title: 'HubSpot-NetSuite 수주 자동 동기화',
      description:
        'HubSpot 거래가 수주 확정(Closed-Won)으로 전환되면 NetSuite 수주 전표와 공급사 발주를 자동 생성합니다.',
      targetStepIds: ['step-3', 'step-4'],
      impactScore: 10,
      effortScore: 5,
      hoursSavedPerWeek: 20,
      implementationCost: 11000,
      toolsNeeded: ['HubSpot CRM', 'NetSuite ERP', 'Workato / n8n'],
      phase: '30',
      selectedTop3: true,
    },
    {
      id: 'auto-3',
      title: 'AI OCR 기반 3자 정산 자동 대사',
      description:
        '공급사 청구서를 OCR로 자동 인식해 NetSuite 발주·입고 내역과 대조하고 예외 건만 재무팀에 라우팅합니다.',
      targetStepIds: ['step-6'],
      impactScore: 8,
      effortScore: 4,
      hoursSavedPerWeek: 11,
      implementationCost: 7500,
      toolsNeeded: ['Document AI / Rossum', 'NetSuite ERP'],
      phase: '60',
      selectedTop3: true,
    },
    {
      id: 'auto-4',
      title: 'Zendesk 배송 추적(WISMO) 자동 응답 봇',
      description:
        '화물사 추적 웹훅을 통합해 단순 배송 현황 문의 티켓에 Zendesk 내에서 실시간 자동 답변합니다.',
      targetStepIds: ['step-5'],
      impactScore: 8,
      effortScore: 6,
      hoursSavedPerWeek: 14,
      implementationCost: 9500,
      toolsNeeded: ['Zendesk', 'EasyPost / AfterShip'],
      phase: '60',
      selectedTop3: false,
    },
    {
      id: 'auto-5',
      title: '매출채권(AR) 연체 단계별 자동 알림',
      description:
        'NetSuite 미수금 데이터를 기반으로 연체 구간별 맞춤 결제 안내 메일을 자동 예약 발송합니다.',
      targetStepIds: ['step-7'],
      impactScore: 6,
      effortScore: 2,
      hoursSavedPerWeek: 4,
      implementationCost: 3000,
      toolsNeeded: ['NetSuite ERP', 'Outlook / Gmail'],
      phase: '30',
      selectedTop3: false,
    },
    {
      id: 'auto-6',
      title: '경영진 주간 마진·병목 현황 다이제스트',
      description:
        '견적 처리 리드타임, 수작업 인수인계 지연, 매출총이익 변동을 매주 Slack과 이메일로 요약 보고합니다.',
      targetStepIds: ['step-2', 'step-4'],
      impactScore: 7,
      effortScore: 3,
      hoursSavedPerWeek: 5,
      implementationCost: 4000,
      toolsNeeded: ['HubSpot CRM', 'NetSuite ERP', 'Slack'],
      phase: '90',
      selectedTop3: false,
    },
  ],
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadInitialState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return clone(DEFAULT_STATE);
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return clone(DEFAULT_STATE);
    return {
      client: { ...clone(DEFAULT_STATE.client), ...(parsed.client || {}) },
      teams: Array.isArray(parsed.teams) ? parsed.teams : clone(DEFAULT_STATE.teams),
      tools: Array.isArray(parsed.tools) ? parsed.tools : clone(DEFAULT_STATE.tools),
      processSteps: Array.isArray(parsed.processSteps)
        ? parsed.processSteps
        : clone(DEFAULT_STATE.processSteps),
      automations: Array.isArray(parsed.automations)
        ? parsed.automations
        : clone(DEFAULT_STATE.automations),
    };
  } catch {
    return clone(DEFAULT_STATE);
  }
}

function persistState(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota or privacy mode errors gracefully.
  }
}

let currentState = loadInitialState();
const listeners = new Set();

export function getState() {
  return currentState;
}

export function setState(updater) {
  const next =
    typeof updater === 'function'
      ? updater(clone(currentState))
      : { ...currentState, ...(updater || {}) };

  if (!next || typeof next !== 'object') return currentState;
  currentState = next;
  persistState(currentState);
  listeners.forEach((fn) => {
    try {
      fn(currentState);
    } catch (err) {
      console.error('Auto AX 구독자 처리 오류:', err);
    }
  });
  return currentState;
}

export function subscribe(fn) {
  if (typeof fn !== 'function') return () => {};
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function resetState() {
  currentState = clone(DEFAULT_STATE);
  persistState(currentState);
  listeners.forEach((fn) => {
    try {
      fn(currentState);
    } catch (err) {
      console.error('Auto AX 구독자 처리 오류:', err);
    }
  });
  return currentState;
}

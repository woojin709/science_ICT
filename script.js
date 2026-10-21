/**
 * 과학기술정보통신부 소개 웹 애플리케이션 JS
 * 프레임워크나 외부 종속성 없이 순수 Vanilla JS로 동작하며 로컬 파일(file://) 환경에서도 완벽 작동합니다.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initNewsFilter();
  initQuiz();
  initScrollEffects();
  initBenefitFinder();
});

/* -------------------------------------------------------------
 * 1. 주요 업무 탭 (Tabs) 기능
 * ------------------------------------------------------------- */
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-tab');

      // 탭 버튼 active 클래스 토글
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // 콘텐츠 패널 active 토글
      tabPanes.forEach(pane => {
        if (pane.id === targetId) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });
}

/* -------------------------------------------------------------
 * 2. 최신 뉴스 카테고리 필터링 기능
 * ------------------------------------------------------------- */
function initNewsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const newsCards = document.querySelectorAll('.news-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      newsCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* -------------------------------------------------------------
 * 3. 국민 소통 알기 쉬운 상식 퀴즈 (Interactive Quiz)
 * ------------------------------------------------------------- */
const QUIZ_DATA = [
  {
    category: "AI 정책",
    question: "대한민국이 글로벌 3대 강국(G3)으로 도약하기 위해 과기정통부가 집중 육성하는 핵심 디지털 기술은 무엇일까요?",
    options: [
      "인공지능(AI) 및 차세대 피지컬 AI",
      "초기 플로피 디스크 저장 기술",
      "단순 아날로그 전화 교환 기술",
      "흑백 브라운관 디스플레이 기술"
    ],
    answer: 0,
    desc: "정답입니다! 과기정통부는 세계 10위권 내 독자 AI 파운데이션 모델과 로봇·산업과 결합한 피지컬 AI(Physical AI)를 집중 육성해 대한민국을 글로벌 'AI 3대 강국(G3)'으로 이끌고 있습니다."
  },
  {
    category: "국가 R&D 혁신",
    question: "신속한 연구 착수와 연구자의 자율성을 위해 최근 폐지 및 개편된 절차는 무엇일까요?",
    options: [
      "국가 R&D 예비타당성조사 (예타)",
      "연구실 안전 점검",
      "연구원 월급 지급 절차",
      "특허 출원 등록"
    ],
    answer: 0,
    desc: "정답입니다! 빠르게 변하는 글로벌 기술 패권 경쟁에 발맞춰, 3년 이상 걸리던 경직된 R&D 예비타당성조사를 전면 폐지하여 신속하고 도전적인 연구 환경을 마련했습니다."
  },
  {
    category: "국민 생활 보안",
    question: "내 명의로 알지 못하는 휴대전화가 몰래 개통되는 것을 사전에 무료로 막아주는 과기정통부 지원 서비스는?",
    options: [
      "명의도용 방지서비스 (M-Safer, 엠세이퍼)",
      "온라인 게임 랭킹 확인 서비스",
      "고속도로 하이패스 정산",
      "중고 물품 무료 배송 서비스"
    ],
    answer: 0,
    desc: "정답입니다! M-Safer(엠세이퍼)는 새로운 통신 회선이 개통될 때 문자 안내를 받고, 사전에 무단 가입을 원천 차단할 수 있는 국민 무료 안전 서비스입니다."
  }
];

let currentQuizIndex = 0;

function initQuiz() {
  const quizCategory = document.getElementById('quiz-category');
  const quizCounter = document.getElementById('quiz-counter');
  const quizQuestion = document.getElementById('quiz-question');
  const quizOptionsContainer = document.getElementById('quiz-options');
  const quizFeedback = document.getElementById('quiz-feedback');
  const feedbackTitle = document.getElementById('feedback-title');
  const feedbackDesc = document.getElementById('feedback-desc');
  const quizProgress = document.getElementById('quiz-progress');
  const nextQuizBtn = document.getElementById('next-quiz-btn');

  function renderCurrentQuiz() {
    const q = QUIZ_DATA[currentQuizIndex];
    quizCategory.textContent = q.category;
    quizCounter.textContent = `문제 ${currentQuizIndex + 1} / ${QUIZ_DATA.length}`;
    quizQuestion.textContent = q.question;
    quizProgress.style.width = `${((currentQuizIndex + 1) / QUIZ_DATA.length) * 100}%`;

    quizFeedback.className = 'quiz-feedback hidden';
    quizOptionsContainer.innerHTML = '';

    q.options.forEach((optText, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `<span style="opacity: 0.6; margin-right: 6px;">${idx + 1}.</span> ${optText}`;
      btn.addEventListener('click', () => handleOptionClick(idx, btn));
      quizOptionsContainer.appendChild(btn);
    });
  }

  function handleOptionClick(selectedIdx, clickedBtn) {
    const q = QUIZ_DATA[currentQuizIndex];
    const allOptionBtns = quizOptionsContainer.querySelectorAll('.quiz-option-btn');
    
    // 버튼 비활성화
    allOptionBtns.forEach(btn => btn.disabled = true);

    if (selectedIdx === q.answer) {
      clickedBtn.classList.add('correct');
      quizFeedback.className = 'quiz-feedback correct-fb';
      feedbackTitle.innerHTML = '🎉 딩동댕! 정답입니다.';
      feedbackTitle.style.color = '#15803d';
    } else {
      clickedBtn.classList.add('wrong');
      allOptionBtns[q.answer].classList.add('correct');
      quizFeedback.className = 'quiz-feedback wrong-fb';
      feedbackTitle.innerHTML = '💡 아쉬워요! 정답을 확인해보세요.';
      feedbackTitle.style.color = '#b91c1c';
    }

    feedbackDesc.textContent = q.desc;
    quizFeedback.classList.remove('hidden');

    if (currentQuizIndex === QUIZ_DATA.length - 1) {
      nextQuizBtn.textContent = '처음부터 다시 풀기 🔄';
    } else {
      nextQuizBtn.textContent = '다음 문제 풀기 ➔';
    }
  }

  nextQuizBtn.addEventListener('click', () => {
    currentQuizIndex++;
    if (currentQuizIndex >= QUIZ_DATA.length) {
      currentQuizIndex = 0;
    }
    renderCurrentQuiz();
  });

  renderCurrentQuiz();
}

/* -------------------------------------------------------------
 * 4. 스크롤 효과 (맨 위로 가기 버튼 & 부드러운 이동)
 * ------------------------------------------------------------- */
function initScrollEffects() {
  const backToTopBtn = document.getElementById('btn-back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* -------------------------------------------------------------
 * 5. 국민 맞춤 혜택 진단기 (Citizen Benefit Finder)
 * ------------------------------------------------------------- */
const INTEREST_OPTIONS_MAP = {
  citizen: [
    { id: "comm_discount", title: "가계 통신비 절약 및 알뜰폰 비교", desc: "나에게 딱 맞는 요금제 찾기 및 선택약정 25% 할인 확인", default: true },
    { id: "security_phishing", title: "스미싱·보이스피싱 및 명의도용 차단", desc: "내 명의 휴대폰 무단개통 방지 및 악성 문자 실시간 필터링", default: true },
    { id: "digital_literacy", title: "일상 생활 속 무료 디지털 활용 교육", desc: "스마트폰 기본 사용법 및 생성형 AI 도구 활용 기초 배우기", default: false },
    { id: "public_ai", title: "민원·복지 행정 AI 서비스 이용", desc: "공공 서류 발급과 혜택을 알아서 찾아주는 맞춤형 공공 AI 활용", default: false }
  ],
  senior: [
    { id: "senior_welfare", title: "기초연금 수급자 통신요금 복지 감면", desc: "월 최대 12,100원 통신비 감면 혜택 및 신청 방법", default: true },
    { id: "digital_literacy", title: "어르신 맞춤형 키오스크·스마트폰 무료 교육", desc: "동네 복지관 및 주민센터 디지털배움터 강사 1:1 방문 교육", default: true },
    { id: "security_phishing", title: "가족 사칭 스미싱·보이스피싱 안심 방어", desc: "의심 문자 즉시 분석 및 피해 신고 지원 서비스", default: true },
    { id: "comm_discount", title: "어르신 전용 실버 안심 요금제 안내", desc: "소액 데이터와 안심 통화 위주의 실속형 요금제 비교", default: false }
  ],
  youth: [
    { id: "youth_sw_bootcamp", title: "AI·SW 청년 혁신인재 무료 부트캠프", desc: "이노베이션 아카데미(42서울), SW마에스트로 등 전액 국비 교육 및 장려금", default: true },
    { id: "youth_rnd_stipend", title: "이공계 대학(원)생 연구장려금 및 생활안정 지원", desc: "석·박사과정 안정적 연구비 지원 및 해외 연수 바우처", default: true },
    { id: "youth_military_it", title: "SW·IT 전문연구요원 및 군 복무 특례", desc: "산업체 및 국책연구기관에서 병역과 경력을 동시에 개발", default: false },
    { id: "comm_discount", title: "청년 전용 데이터 추가 제공 요금제", desc: "만 34세 이하 청년 대상 데이터 2배 적립 및 통신비 절감", default: false }
  ],
  researcher: [
    { id: "rnd_funding", title: "국가 R&D 기초연구 지원 및 과제 공모", desc: "신진·우수 연구자 대상 창의적 기초연구비 지원 및 예타 폐지 신속 착수", default: true },
    { id: "rnd_lab_setup", title: "최초 혁신실험실 구축 바우처", desc: "대학 신임 교원 및 신진 연구자를 위한 첨단 연구장비 구축 지원", default: true },
    { id: "global_rnd", title: "글로벌 톱 연구기관 국제공동연구", desc: "美·EU 선도 연구기관과의 인력 교류 및 양자·우주 원천기술 협력", default: false },
    { id: "rnd_reward", title: "직무발명 보상금 비과세 혜택 및 기술사업화", desc: "우수 특허 출원 및 기술 이전 시 파격적인 인센티브 보장", default: false }
  ],
  business: [
    { id: "ai_voucher", title: "AI 바우처 및 고성능 컴퓨팅(GPU) 지원", desc: "중소·벤처기업의 AI 솔루션 구매 및 대규모 연산 자원 국비 바우처", default: true },
    { id: "sandbox", title: "ICT 규제 샌드박스 (신산업 실증 특례)", desc: "기존 규제에 막힌 혁신 신기술·서비스의 신속한 시장 출시 허용", default: true },
    { id: "security_consulting", title: "중소기업 무료 정보보호 컨설팅 & SECaaS", desc: "랜섬웨어 예방 점검 및 보안 솔루션 도입 바우처 80% 지원", default: false },
    { id: "data_voucher", title: "데이터 가공·활용 바우처 지원", desc: "신제품 개발에 필요한 빅데이터 구매 및 AI 가공 비용 지원", default: false }
  ]
};

// 혜택 데이터베이스
const BENEFIT_CATALOG = {
  comm_discount: {
    category: "통신비 절약",
    tagColor: "tag-blue",
    title: "스마트초이스 통신비 진단 & 선택약정 25% 요금할인",
    desc: "약정이 만료된 휴대폰을 계속 사용할 때 통신 요금의 25%를 매달 할인받을 수 있으며, '스마트초이스' 사이트에서 나의 데이터 패턴에 맞는 가장 저렴한 요금제를 추천받을 수 있습니다.",
    conditions: "전 국민 누구나 이용 가능 (단말기 지원금을 받지 않은 사용자 대상)",
    linkUrl: "https://www.smartchoice.or.kr",
    linkLabel: "스마트초이스 바로가기 ↗"
  },
  senior_welfare: {
    category: "복지 감면",
    tagColor: "tag-green",
    title: "기초연금 수급자·취약계층 통신요금 복지감면 (월 최대 12,100원)",
    desc: "기초연금 수급 어르신 및 기초생활수급자, 장애인, 국가유공자를 대상으로 월 통신 기본료 최대 12,100원 및 통화료 50%를 자동으로 감면해 드립니다.",
    conditions: "기초연금 수급자 및 복지감면 자격 대상자",
    linkUrl: "https://www.msit.go.kr",
    linkLabel: "감면 안내(1335 / 114) ↗"
  },
  security_phishing: {
    category: "사이버 안전",
    tagColor: "tag-green",
    title: "M-Safer 명의도용 방지서비스 & 보이스피싱 3중 차단",
    desc: "내 명의로 알뜰폰이나 인터넷이 몰래 개통되지 않도록 원천 차단하고, 스팸·스미싱 악성 URL을 클릭하기 전 통신망 단계에서 즉시 차단합니다.",
    conditions: "대한민국 국민 누구나 무료",
    linkUrl: "https://www.msafer.or.kr",
    linkLabel: "엠세이퍼 무료 차단 신청 ↗"
  },
  digital_literacy: {
    category: "무료 교육",
    tagColor: "tag-orange",
    title: "전국민 디지털배움터 (스마트폰·키오스크·AI 무료 교육)",
    desc: "전국 1,000여 개 주민센터 및 도서관에서 어르신, 주부, 청소년을 대상으로 기초 스마트폰 조작, 무인 키오스크 주문, 챗봇 활용법을 전문 강사가 무료로 교육합니다.",
    conditions: "디지털 기기 활용에 어려움을 겪는 모든 국민",
    linkUrl: "https://www.디지털배움터.kr",
    linkLabel: "집 근처 배움터 신청 ↗"
  },
  public_ai: {
    category: "공공 혁신",
    tagColor: "tag-blue",
    title: "모두를 위한 공공 AI 민원·복지 안내 서비스",
    desc: "내가 받을 수 있는 정부 지원금을 복잡한 검색 없이 AI가 주민등록·소득 조건에 맞춰 선제적으로 안내해 주는 대국민 AI 비서 서비스가 순차 도입됩니다.",
    conditions: "전 국민 대상 공공 서비스",
    linkUrl: "https://www.korea.kr",
    linkLabel: "정책브리핑 공공AI 안내 ↗"
  },
  youth_sw_bootcamp: {
    category: "청년 인재",
    tagColor: "tag-purple",
    title: "이노베이션 아카데미(42서울) & SW마에스트로 청년 육성",
    desc: "교수·교재·학비가 없는 자기주도형 최고급 코딩 교육(42서울)과 월 100만 원 이상의 지원금과 멘토링을 제공하는 최고급 SW 인재 양성 과정을 전액 국비로 지원합니다.",
    conditions: "만 18세 이상 SW 개발에 열정이 있는 청년 누구나",
    linkUrl: "https://www.swmaestro.org",
    linkLabel: "SW마에스트로 공고 보기 ↗"
  },
  youth_rnd_stipend: {
    category: "이공계 장학",
    tagColor: "tag-purple",
    title: "이공계 석·박사 연구장려금 및 청년 연구원 생활안정",
    desc: "학업과 연구에 전념할 수 있도록 이공계 대학원생에게 매월 안정적인 연구생활장려금(한국형 스타이펜드)을 지원하고 해외 연수 기회를 대폭 확대합니다.",
    conditions: "국내 대학 이공계 석·박사 재학생 및 신진 청년 연구자",
    linkUrl: "https://www.nrf.re.kr",
    linkLabel: "한국연구재단 지원안내 ↗"
  },
  youth_military_it: {
    category: "병역 특례",
    tagColor: "tag-blue",
    title: "전문연구요원 및 SW·IT 산업기능요원 병역 대체복무",
    desc: "이공계 석·박사 학위 소지자가 군 복무 대신 우수 IT 기업 및 국책연구소에서 전문 연구 인력으로 복무하며 경력을 이어갈 수 있도록 지원합니다.",
    conditions: "이공계 석사 이상 학위 취득자 및 IT 특성화고 졸업자",
    linkUrl: "https://www.msit.go.kr",
    linkLabel: "과기정통부 병역특례 안내 ↗"
  },
  rnd_funding: {
    category: "연구 지원",
    tagColor: "tag-orange",
    title: "국가 R&D 기초연구비 지원 및 신속 기획 (예타 폐지)",
    desc: "연구자가 제안하는 창의적 기초연구를 역대 최대 규모로 지원하며, R&D 예비타당성조사 폐지로 신속한 연구비 착수 및 성실 실패 용인 제도를 운영합니다.",
    conditions: "대학·국공립연구기관 및 기업 부설 연구소 연구책임자",
    linkUrl: "https://www.nrf.re.kr",
    linkLabel: "한국연구재단 사업공고 ↗"
  },
  rnd_lab_setup: {
    category: "연구실 구축",
    tagColor: "tag-orange",
    title: "신진 연구자 '최초 혁신실험실' 구축 바우처 (최대 5억원)",
    desc: "신규 임용된 39세 이하 또는 박사학위 취득 7년 이내 젊은 과학기술인이 조기에 독자 연구 인프라를 구축할 수 있도록 실험실 장비 구축비를 지원합니다.",
    conditions: "국내 대학 이공분야 전임교원 및 비영리연구기관 신진연구자",
    linkUrl: "https://www.nrf.re.kr",
    linkLabel: "실험실 구축 바우처 신청 ↗"
  },
  global_rnd: {
    category: "글로벌 협력",
    tagColor: "tag-purple",
    title: "K-Horizon 글로벌 톱 전략연구단 국제공동연구",
    desc: "세계 최고 수준의 글로벌 연구기관(MIT, 하버드, 막스플랑크 등)과 양자·우주·첨단바이오 원천기술을 공동 연구하고 장기 파견 연구비를 지원합니다.",
    conditions: "국내외 산·학·연 글로벌 연구 컨소시엄",
    linkUrl: "https://www.msit.go.kr",
    linkLabel: "국제공동연구 공고 ↗"
  },
  rnd_reward: {
    category: "성과 보상",
    tagColor: "tag-green",
    title: "직무발명 보상금 비과세 한도 확대 및 기술이전 수수료 감면",
    desc: "국가 연구개발 성과물로 특허를 등록하거나 기술이전 계약을 체결한 과학기술인에 대해 직무발명 보상금 비과세 한도를 대폭 상향하여 보상합니다.",
    conditions: "국가 R&D 참여 연구원 및 대학·공공연 연구자",
    linkUrl: "https://www.msit.go.kr",
    linkLabel: "기술사업화 혜택 안내 ↗"
  },
  ai_voucher: {
    category: "기업 바우처",
    tagColor: "tag-blue",
    title: "AI 바우처 및 고성능 AI 반도체·컴퓨팅 자원 지원",
    desc: "AI 기술을 도입하려는 중소·벤처기업에 최대 2~3억 원 상당의 AI 솔루션 구매 바우처와 고성능 GPU 연산 인프라를 국비로 지원합니다.",
    conditions: "AI 솔루션 도입을 희망하는 중소·중견·벤처기업 및 소상공인",
    linkUrl: "https://www.nipa.kr",
    linkLabel: "정보통신산업진흥원(NIPA) ↗"
  },
  sandbox: {
    category: "규제 혁신",
    tagColor: "tag-orange",
    title: "ICT 규제 샌드박스 (신기술 신속 시장출시 제도)",
    desc: "현행 법령이 모호하거나 금지되어 출시가 막힌 혁신 IT 서비스에 대해 임시허가 및 실증특례를 부여하여 규제 유예와 사업화를 지원합니다.",
    conditions: "ICT 융합 신기술·서비스를 보유한 기업 및 예비창업자",
    linkUrl: "https://www.sandbox.or.kr",
    linkLabel: "규제 샌드박스 신청 ↗"
  },
  security_consulting: {
    category: "보안 지원",
    tagColor: "tag-green",
    title: "중소기업 무료 정보보호 컨설팅 및 보안 솔루션 바우처",
    desc: "해킹이나 랜섬웨어 위협에 취약한 중소기업을 위해 전문가가 직접 방문해 보안 취약점을 무료 점검하고, 클라우드 보안 서비스(SECaaS) 비용의 80%를 지원합니다.",
    conditions: "국내 중소기업 및 소기업",
    linkUrl: "https://www.kisa.or.kr",
    linkLabel: "KISA 보안지원 사업 ↗"
  },
  data_voucher: {
    category: "데이터 바우처",
    tagColor: "tag-blue",
    title: "데이터 바우처 지원사업 (최대 5,400만원)",
    desc: "비즈니스 혁신 및 신제품 개발에 필요한 빅데이터 구매 및 AI 가공 서비스를 바우처 형태로 지원하여 기업의 데이터 장벽을 낮춥니다.",
    conditions: "초기 스타트업, 중소기업, 소상공인, 예비창업자",
    linkUrl: "https://kdata.or.kr",
    linkLabel: "한국데이터산업진흥원 ↗"
  }
};

const USER_ROLE_NAMES = {
  citizen: "일반 국민 / 직장인",
  senior: "어르신 / 디지털 배려계층",
  youth: "청년 / 취업준비생 / 대학(원)생",
  researcher: "연구자 / 과학기술인",
  business: "스타트업 / 중소·벤처기업"
};

function initBenefitFinder() {
  const stage1 = document.getElementById('stage-identity');
  const stage2 = document.getElementById('stage-interests');
  const stage3 = document.getElementById('stage-result');

  const stepIndicator1 = document.getElementById('f-step-1');
  const stepIndicator2 = document.getElementById('f-step-2');
  const stepIndicator3 = document.getElementById('f-step-3');

  const btnToStage2 = document.getElementById('btn-to-stage2');
  const btnBackToStage1 = document.getElementById('btn-back-to-stage1');
  const btnSubmitFinder = document.getElementById('btn-submit-finder');
  const btnResetFinder = document.getElementById('btn-reset-finder');

  const interestChecklistContainer = document.getElementById('interest-checklist-container');
  const resultSummaryTitle = document.getElementById('result-user-summary');
  const resultsListContainer = document.getElementById('results-list-container');

  let currentSelectedRole = 'citizen';

  function setStage(stageNum) {
    [stage1, stage2, stage3].forEach((s, idx) => {
      if (idx + 1 === stageNum) {
        s.classList.add('active');
      } else {
        s.classList.remove('active');
      }
    });

    [stepIndicator1, stepIndicator2, stepIndicator3].forEach((ind, idx) => {
      if (idx + 1 === stageNum) {
        ind.classList.add('active');
      } else {
        ind.classList.remove('active');
      }
    });
  }

  // 1단계 -> 2단계
  btnToStage2.addEventListener('click', () => {
    const selectedRadio = document.querySelector('input[name="userRole"]:checked');
    currentSelectedRole = selectedRadio ? selectedRadio.value : 'citizen';
    
    renderInterestOptions(currentSelectedRole);
    setStage(2);
  });

  // 2단계 -> 1단계
  btnBackToStage1.addEventListener('click', () => {
    setStage(1);
  });

  // 2단계 -> 3단계 결과
  btnSubmitFinder.addEventListener('click', () => {
    const checkedBoxes = interestChecklistContainer.querySelectorAll('input[type="checkbox"]:checked');
    const selectedBenefitKeys = Array.from(checkedBoxes).map(cb => cb.value);

    // 최소 하나도 선택 안했을 경우 해당 역할의 기본 전체 선택
    if (selectedBenefitKeys.length === 0) {
      const allBoxes = interestChecklistContainer.querySelectorAll('input[type="checkbox"]');
      allBoxes.forEach(b => selectedBenefitKeys.push(b.value));
    }

    renderResults(currentSelectedRole, selectedBenefitKeys);
    setStage(3);
  });

  // 3단계 리셋
  btnResetFinder.addEventListener('click', () => {
    setStage(1);
  });

  function renderInterestOptions(role) {
    const list = INTEREST_OPTIONS_MAP[role] || INTEREST_OPTIONS_MAP.citizen;
    interestChecklistContainer.innerHTML = '';

    list.forEach(item => {
      const label = document.createElement('label');
      label.className = 'interest-item';
      label.innerHTML = `
        <input type="checkbox" value="${item.id}" ${item.default ? 'checked' : ''}>
        <div class="interest-box">
          <div class="custom-checkbox-ui">✓</div>
          <div class="interest-text">
            <strong>${item.title}</strong>
            <p>${item.desc}</p>
          </div>
        </div>
      `;
      interestChecklistContainer.appendChild(label);
    });
  }

  function renderResults(role, benefitKeys) {
    const roleName = USER_ROLE_NAMES[role] || "국민";
    resultSummaryTitle.innerHTML = `🌟 [${roleName}] 님을 위한 맞춤형 정책 혜택 <strong>${benefitKeys.length}가지</strong>`;
    resultsListContainer.innerHTML = '';

    benefitKeys.forEach(key => {
      const item = BENEFIT_CATALOG[key];
      if (!item) return;

      const card = document.createElement('div');
      card.className = 'result-benefit-card';
      card.innerHTML = `
        <div class="benefit-info">
          <div class="card-badge-row">
            <span class="benefit-tag ${item.tagColor}">${item.category}</span>
          </div>
          <h4>${item.title}</h4>
          <p class="benefit-desc">${item.desc}</p>
          <span class="benefit-conditions">💡 지원 대상: ${item.conditions}</span>
        </div>
        <div class="card-action-side">
          <a href="${item.linkUrl}" target="_blank" rel="noopener noreferrer" class="btn-apply-link">
            ${item.linkLabel}
          </a>
        </div>
      `;
      resultsListContainer.appendChild(card);
    });
  }
}


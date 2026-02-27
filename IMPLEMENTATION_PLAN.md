# Life in the UK Study App - 구현 계획

## 📋 프로젝트 개요
UK ILR 신청을 위한 Life in the UK 시험 준비 웹앱
- 플립 카드 학습 시스템
- PWA 지원 (오프라인 사용 가능)
- GitHub Pages 호스팅
- URL: https://jahwanoh.github.io/study-card

## ✅ 완료된 작업 (Phase 1)

### 1. 기본 앱 구조
- [x] React + TypeScript 프로젝트 생성
- [x] 플립 카드 컴포넌트 (Framer Motion 애니메이션)
- [x] Chapter 1.1 데이터 (10개 카드)
- [x] 홈/학습/완료 화면 구현
- [x] Know/Not Sure 분류 기능
- [x] LocalStorage 진도 저장
- [x] PWA 설정 (manifest.json, service worker)
- [x] GitHub Pages 배포

### 2. 현재 기능
- [x] 카드 학습 플로우
- [x] 진도 추적 (Progress Bar)
- [x] 복습 기능 (Unsure 카드만)
- [x] 세션 통계
- [x] 반응형 디자인

## 🚀 구현 예정 (Phase 2-5)

### Phase 2: 콘텐츠 확장 (우선순위: 높음)
- [ ] **Chapter 1.2-1.6 추가**
  - [ ] 각 챕터별 10-15개 카드
  - [ ] test1.txt에서 관련 문제 추출
  - [ ] Life in the UK.pdf에서 내용 보강
- [ ] **챕터 선택 화면**
  - [ ] 전체 챕터 목록 표시
  - [ ] 챕터별 진도 표시
  - [ ] 잠금/해제 시스템 (순차 학습)

### Phase 3: 테스트 모드 (우선순위: 높음)
- [ ] **실전 테스트 모드**
  - [ ] 24문제 랜덤 출제
  - [ ] 45분 타이머
  - [ ] 정답/오답 즉시 피드백
  - [ ] 테스트 결과 저장
- [ ] **챕터별 퀴즈**
  - [ ] 각 챕터 완료 후 미니 테스트
  - [ ] 오답 노트 기능

### Phase 4: 학습 강화 기능 (우선순위: 중간)
- [ ] **스페이스드 리피티션 (Spaced Repetition)**
  - [ ] 에빙하우스 망각 곡선 적용
  - [ ] 카드별 복습 주기 계산
  - [ ] 오늘의 복습 카드 추천
- [ ] **학습 통계 대시보드**
  - [ ] 일별/주별/월별 학습 시간
  - [ ] 카드별 정답률
  - [ ] 약점 분석 (자주 틀리는 주제)
- [ ] **노트 기능**
  - [ ] 카드별 개인 메모 추가
  - [ ] 중요 카드 북마크

### Phase 5: UX/UI 개선 (우선순위: 중간)
- [ ] **Tinder 스타일 스와이프**
  - [ ] 좌측 스와이프: Know
  - [ ] 우측 스와이프: Not Sure
  - [ ] 위로 스와이프: 북마크
- [ ] **다크 모드**
  - [ ] 시스템 설정 연동
  - [ ] 수동 토글 버튼
- [ ] **음성 지원**
  - [ ] TTS로 카드 읽기
  - [ ] 음성 명령 (다음/이전/뒤집기)
- [ ] **게임화 요소**
  - [ ] 연속 학습 스트릭
  - [ ] 레벨/포인트 시스템
  - [ ] 업적/배지

### Phase 6: 고급 기능 (우선순위: 낮음)
- [ ] **AI 학습 도우미**
  - [ ] 틀린 문제 추가 설명
  - [ ] 유사 문제 생성
  - [ ] 맞춤형 학습 계획
- [ ] **소셜 기능**
  - [ ] 학습 그룹 생성
  - [ ] 진도 공유
  - [ ] 리더보드
- [ ] **오프라인 완전 지원**
  - [ ] 모든 콘텐츠 캐싱
  - [ ] 오프라인 동기화

## 📊 기술 스택

### 현재 사용 중
- React 19.2
- TypeScript 4.9
- Framer Motion 12.34
- LocalStorage API
- GitHub Pages

### 추가 예정
- [ ] IndexedDB (대용량 데이터 저장)
- [ ] React Query (데이터 캐싱)
- [ ] Chart.js (통계 시각화)
- [ ] Web Speech API (음성 기능)
- [ ] Workbox (고급 PWA)

## 🗓️ 일정

### 2026년 2월 (현재)
- [x] Phase 1 완료
- [ ] Phase 2 시작: Chapter 1.2-1.3 추가

### 2026년 3월
- [ ] Phase 2 완료: 모든 챕터 추가
- [ ] Phase 3 시작: 테스트 모드

### 2026년 4월
- [ ] Phase 3 완료
- [ ] Phase 4 시작: 학습 강화 기능

### 2026년 5월
- [ ] Phase 4 완료
- [ ] Phase 5: UX/UI 개선

## 📝 다음 작업 (Next Steps)

1. **Chapter 1.2 데이터 생성**
   - test1.txt에서 관련 문제 찾기
   - 10-15개 카드 작성
   - chapter1_2.ts 파일 생성

2. **챕터 선택 화면 구현**
   - ChapterSelectScreen.tsx 생성
   - 홈 화면에서 연결
   - 챕터별 진도 표시

3. **데이터 구조 개선**
   - 모든 챕터 데이터 통합 관리
   - chapters/index.ts 생성
   - 동적 로딩 구현

## 🐛 버그 수정 목록
- [ ] 카드 뒤집기 후 바로 다음 카드로 넘어가는 문제
- [ ] 모바일에서 스크롤 시 카드 클릭되는 문제
- [ ] PWA 업데이트 알림 추가

## 💡 아이디어 백로그
- 시험 D-Day 카운터
- 일일 학습 목표 설정
- 카드 난이도 조절 (Easy/Medium/Hard)
- 이미지 카드 지원 (지도, 역사적 사진)
- 오디오 발음 지원
- PDF 학습 자료 뷰어
- 커뮤니티 생성 카드 공유

## 📚 참고 자료
- [Life in the UK 공식 가이드](https://www.gov.uk/life-in-the-uk-test)
- [React 공식 문서](https://react.dev)
- [PWA 가이드](https://web.dev/progressive-web-apps/)
- [GitHub Pages 문서](https://pages.github.com/)

---

*Last Updated: 2026-02-27*
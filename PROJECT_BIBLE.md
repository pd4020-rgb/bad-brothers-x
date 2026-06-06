# BAD BROTHERS X — PROJECT BIBLE
> ⚠️ 모든 AI 에이전트/모델은 작업 시작 전 이 파일을 반드시 읽을 것.
> 마지막 업데이트: 2026-06-06

---

## 1. 프로젝트 오너

**정킹 (JungKing)** — 한국 팝아트 작가, 수십 년간 아날로그 회화 작업.
- 개인 홈페이지: https://www.jungking.com (Wix 사이트, 작품 아카이브)
- 인스타그램: @xjungking (작업 + 일상 아카이브)
- 이 프로젝트의 유일한 의사결정자

---

## 2. BAD BROTHERS X가 뭔지

### 한 줄 정의
**40년 아날로그 팝아트 작가의 오리지널 캐릭터 세계관을 AI로 영화적으로 실현하는 엔터테인먼트 에이전시/레이블.**

### 비유
- **빅히트(HYBE) 같은 엔터테인먼트 회사의 AI 버전**
- 정킹의 개인 홈페이지가 **아님** — 회사/레이블임
- 정킹은 BBX에 "입점한 아티스트"로 포지셔닝

### 구조
```
BAD BROTHERS X (AI 엔터 에이전시)
├── JUNGKING — 원작자/Creative Director (40년 아날로그 팝아트)
├── CHARACTER X — 녹색 물고기 캐릭터 (가상 아티스트/퍼포머)
├── 88X — AI 음악 프로듀서 엔진
└── 결과물: MV, 음악, 브랜드 필름, 굿즈
```

### 핵심 철학 (절대 변경하지 말 것)
> "This is not AI replacing the artist. This is AI extending an original creative universe."
> "이건 AI가 만든 게 아니라, 40년 예술가의 오리지널 비전을 AI가 실현한 것이다."

- ❌ "딸깍이" (AI 자동 생성물) 취급 절대 금지
- ✅ "오리지널 비전 + AI 실현" 포지셔닝

---

## 3. 왜 만드는지 — 오너의 상황과 동기

1. 한국에서 수십 년간 팝아트 작업 → 인기도 없고 판매도 안 됨
2. 캐릭터X 세계관("LIFE IS FUN")을 꾸준히 발전시켜 왔음
3. AI를 만나서 드디어 시각화·영상화·사업화가 가능해짐
4. 한국 시장은 제한이 많고 수요가 적음 → **미국/글로벌 타겟**
5. 영어로 브랜딩, 글로벌 출시 중

### 오너의 고민
- "나(정킹)를 직접 보여주면 스케일이 줄어들지 않을까?"
- → 답: 숨기지 말되, "BBX의 Creative Director이자 원작자"로 포지셔닝

---

## 4. 기술 스택 & 인프라

| 항목 | 내용 |
|------|------|
| 사이트 | 정적 HTML/CSS/JS (프레임워크 없음) |
| 호스팅 | Vercel (vercel --prod로 배포) |
| 도메인 | badbrothersx.com + www.badbrothersx.com |
| 디자인 시스템 | "Borderless Blackout" — 블랙+녹색 다크 테마 |
| 프로젝트 경로 | /Users/jk/Documents/ACA8/bad_brothers_x/ |
| Node 경로 | /Users/jk/Documents/ACA8/node-local/bin |
| 배포 명령어 | `export PATH="/Users/jk/Documents/ACA8/node-local/bin:$PATH" && npx vercel --prod --yes` |

### 주요 파일
- `index.html` — 메인 페이지 (모든 섹션 포함)
- `styles.css` — 전체 CSS (디자인 시스템 + 반응형)
- `app.js` — 인터랙션 (음악 플레이어, 스크롤스파이, 햄버거 메뉴 등)
- `youtube_assets.md` — 유튜브 채널 브랜드 에셋 및 영어 철학 텍스트

### 이미지 파일 (jungking.com에서 다운로드)
- `jungking_work1.jpg` — 갤러리 전시 대형 팝아트 (캐릭터X 얼굴)
- `jungking_work2.jpg` — 벽돌벽 두 작품 (미키 + 녹색 CHARACTER X)
- `jungking_work3.jpg` — 갤러리 내부 조각/먹 드로잉
- `jungking_studio.jpg` — Space NAMU Gallery Aurora 외관

---

## 5. 현재 완료된 작업

### 사이트 기능
- [x] 히어로 섹션 + 루프 영상 (10MB 이하 물고기 캐릭터 영상)
- [x] 히어로 문구 → "AN ORIGINAL VISION // REALIZED THROUGH AI"
- [x] 아티스트 로스터 카드 3장 (JUNGKING, CHARACTER X, 88X) — 실제 갤러리 사진 적용
- [x] 음악 플레이어 UI (재생 기능은 음원 파일 필요)
- [x] 트랙리스트 테이블
- [x] 디지털 아카이브/갤러리 섹션 레이아웃
- [x] 숍 섹션 (COMING SOON 모달)
- [x] 문의 폼 (Studio 섹션)
- [x] 모바일 햄버거 메뉴 (풀스크린 오버레이)
- [x] Back-to-Top 프로그레스 버튼
- [x] 스크롤스파이 네비게이션 하이라이트
- [x] 카드 spotlight/glow 마우스 트래킹 효과
- [x] SEO 메타태그 (og:image, og:description, twitter card)
- [x] 푸터 SNS 링크 (YouTube, Instagram @xjungking, Email)
- [x] Vercel 배포 + 커스텀 도메인 연결

### 전략 문서
- [x] 사이트 분석 보고서 (site_analysis.md)
- [x] 수익화·성장 전략 보고서 (strategic_direction.md)
- [x] 브랜드 리뱀프 플랜 (bbx_brand_revamp_plan.md)
- [x] 인스타그램 전략 (bbx_instagram_strategy.md)
- [x] 글로벌 런칭 가이드 (bbx_global_launch_guide.md)

---

## 6. 아직 안 된 작업 (우선순위 순)

### 🔴 즉시 해야 할 것
1. YouTube MV를 MUSIC 섹션에 실제로 임베드 (https://youtu.be/42R7bbldoHo)
2. 갤러리 섹션에 실제 작품 이미지 삽입
3. sitemap.xml 생성 + Google Search Console 등록
4. Etsy/Redbubble 스토어 연동 (SHOP 섹션 링크 연결)

### 🟡 이번 달 내
5. CHARACTER X 전용 AI 생성 비주얼/영상
6. YouTube Shorts 주 2~3개 업로드 시작
7. DistroKid로 음악 배포 (Spotify, Apple Music)
8. "ORIGIN STORY" 섹션 추가 (원화 → AI 변환 과정을 시각적으로)

### 🟢 3개월 내
9. B2B AI 영상 제작 서비스 런칭 (Fiverr/직접)
10. CHARACTER X 인스타/틱톡 전용 계정
11. Patreon/Ko-fi 팬 후원 시스템
12. 이메일 구독(뉴스레터) 폼 추가

---

## 7. 수익화 로드맵

| 순서 | 채널 | 예상 수익 | 난이도 |
|------|------|-----------|--------|
| 1 | YouTube Shorts/MV | 광고수익 (구독 1K+시청 4K시간 후) | 중 |
| 2 | Etsy/Redbubble 디지털 굿즈 | $15~50/건, 재고 없음 | 하 |
| 3 | Fiverr B2B AI 영상 | $500~2000/건 | 중 |
| 4 | DistroKid 스트리밍 | 소액이지만 누적 | 하 |
| 5 | B2B 직접 영업 | $3K~$15K/프로젝트 | 상 |

---

## 8. 절대 규칙 (모든 AI 에이전트 준수)

1. **이 사이트는 정킹의 개인 홈페이지가 아니다** — BBX라는 AI 엔터 에이전시다
2. **"딸깍이" 취급 금지** — 40년 아날로그 원화의 AI 실현임
3. **영어가 기본** — 글로벌/미국 타겟, 사이트 텍스트는 영어
4. **코드 수정 시 반드시 이 파일의 "완료된 작업" 섹션 업데이트할 것**
5. **배포 전 반드시 모바일 반응형 확인**
6. **플레이스홀더(회색 박스) 사용 금지** — 실제 이미지를 쓸 것

---

## 9. 주요 외부 링크

- 라이브 사이트: https://www.badbrothersx.com
- 정킹 작품 아카이브: https://www.jungking.com
- 인스타그램: https://www.instagram.com/xjungking
- YouTube MV: https://youtu.be/42R7bbldoHo

---

> **이 파일을 읽었으면 바로 작업을 시작하라. 다시 설명을 요구하지 마라.**

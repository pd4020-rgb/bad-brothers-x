# HANDOFF — 마지막 작업 인수인계

> 마지막 업데이트: 2026-06-07 (현재 버전 v3.3)
> 마지막 작업자: Gemini 3.1 Pro (Antigravity)

---

## 🚨 가장 중요한 컨텍스트 (다음 AI가 절대 잊으면 안 되는 것)

**이 프로젝트는 단순한 "개인 작가 포트폴리오 웹사이트"가 절대 아닙니다.**

이곳은 **BAD BROTHERS X (BBX)** 라는 **글로벌 가상 AI 엔터테인먼트 레이블/에이전시**의 공식 사이트입니다.
빅히트(HYBE)나 Gorillaz처럼, 소속된 가상 AI 아티스트(CHARACTER X, 88X 등)들이 실제 얼굴, 나이, 직업, 세계관, 음악 장르를 가지고 활동하는 곳입니다.
정킹(JUNGKING) 작가 본인도 이 레이블의 창립자이자 소속 아티스트로 존재합니다.
에이전트는 이 사이트를 "엔터테인먼트 레이블의 공식 포털"로 대해야 하며, 매 시즌(상반기/하반기) 새로운 AI 아티스트가 배출될 생태계임을 인지해야 합니다.

---

## 직전에 완료한 것 (v2.8 ~ v3.3 업데이트 내역)

1. **로스터 이미지 전면 수정 (v3.3)**:
   - JUNGKING: 선글라스를 낀 정킹 본인 사진 (`jungking_portrait.png`)
   - CHARACTER X: 선인장 머리를 한 가상 아티스트 사진 (`character_x.png`)
   - 88X: 원숭이 머리를 한 AI 뮤직 프로듀서 사진 (`88x_character.png`)
2. **ORIGIN STORY 추가 (v3.1)**:
   - 2004년부터 2026년까지 정킹의 실제 영어 공식 약력(마이애미 페어, 전주국제영화제, 갤러리위 개인전 등)과 영문 작가 노트(Artist Statement)를 타임라인으로 완벽히 반영.
3. **MUSIC 섹션 연결**: YouTube 공식 뮤직비디오 임베드 완료.
4. **문의 폼 이메일 연결**: `formsubmit`을 활용해 `badbrothersx.official@gmail.com`으로 실제 메일 전송 연동.
5. **SEO 및 구글 검색 콘솔**: `sitemap.xml`, `robots.txt` 설정 및 Google Search Console 등록 완료.
6. **디바이스 대응**: 모바일 가로 모드(Landscape) 헤더 및 여백 최적화 완벽 적용.
7. Vercel 프로덕션 배포 완료 (`badbrothersx.com`)

---

## 다음 AI가 해야 할 작업 (우선순위 순)

### 🔴 1순위 — 즉시 (수익화 및 마케팅)
- [ ] **SHOP 연동**: 현재 사이트 내 SHOP 섹션이 비어있거나 단순 링크만 있습니다. Etsy, Redbubble 등의 실제 판매 플랫폼 링크를 받고 UI에 연결해야 합니다. (판매 링크가 당장 없다면 이메일 문의로 유도하는 디자인으로 임시 처리)
- [ ] **Instagram 첫 포스트/릴스 기획 작성**: `@xjungking` 계정에 사이트 오픈과 레이블 비전을 글로벌 타겟(영문 중심)으로 알리는 첫 콘텐츠(캡션 및 해시태그)를 작성하여 사용자에게 제안해야 합니다.

### 🟡 2순위 — 확장 계획
- [ ] **새 아티스트 티징**: 하반기에 추가될 새로운 AI 캐릭터 아티스트를 위한 "Trainee" 또는 "Coming Soon" 섹션을 ROSTER 하단에 추가.

---

## 주의사항

- `PROJECT_BIBLE.md`를 먼저 반드시 읽을 것. (레이블 비전 숙지)
- 작업 완료 후 이 파일(`HANDOFF.md`)을 반드시 업데이트할 것.
- 배포 명령어: `export PATH="/Users/jk/Documents/ACA8/node-local/bin:$PATH" && npx vercel --prod --yes`


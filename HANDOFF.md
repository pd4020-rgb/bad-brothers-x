# HANDOFF — 마지막 작업 인수인계

> 마지막 업데이트: 2026-06-06 17:14 KST
> 마지막 작업자: Claude Opus (Antigravity)
> Git 커밋: v2.1 (8eb29f6)

---

## 직전에 완료한 것

1. **로스터 카드 실제 이미지 삽입** — jungking.com에서 갤러리 전시 사진 4장 다운로드 후 적용
2. **히어로 문구 교체** → "AN ORIGINAL VISION // REALIZED THROUGH AI"
3. **모바일 햄버거 메뉴** 구현 (HTML + CSS + JS)
4. **SEO 메타태그 전체 추가** (og:image, og:description, twitter card)
5. **푸터 SNS 아이콘** (YouTube, Instagram @xjungking, Email)
6. **PROJECT_BIBLE.md** 생성
7. **Git 초기화** + 첫 커밋
8. **Vercel 배포 완료** — https://www.badbrothersx.com 라이브

---

## 다음 AI가 해야 할 작업 (우선순위 순)

### 🔴 1순위 — 즉시
- [ ] **YouTube MV 임베드**: MUSIC 섹션(#releases)에 https://youtu.be/42R7bbldoHo iframe 삽입
- [ ] **갤러리 섹션 이미지**: DIGITAL ARCHIVE 섹션의 플레이스홀더를 실제 이미지로 교체 (jungking_work*.jpg 활용)
- [ ] **sitemap.xml 생성**: Google Search Console 등록용

### 🟡 2순위 — 이번 주
- [ ] SHOP 섹션 → Etsy/Redbubble 외부 링크 연결 (스토어 개설 후)
- [ ] 음악 플레이어에 실제 mp3 연결 또는 YouTube iframe으로 대체

### 🟢 3순위 — 이번 달
- [ ] "ORIGIN STORY" 섹션 추가 (원화→AI 변환 과정 시각화)
- [ ] CHARACTER X 전용 AI 생성 비주얼

---

## 주의사항

- `PROJECT_BIBLE.md`를 먼저 읽을 것
- 작업 완료 후 이 파일(HANDOFF.md)을 반드시 업데이트할 것
- 배포 전 `git commit`으로 복구 지점을 만들 것
- 배포 명령어: `export PATH="/Users/jk/Documents/ACA8/node-local/bin:$PATH" && npx vercel --prod --yes`

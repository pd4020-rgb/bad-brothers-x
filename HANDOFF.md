# HANDOFF — 마지막 작업 인수인계

> 마지막 업데이트: 2026-06-16 (로스터/갤러리 그리드 정렬 QA 배포)
> 마지막 작업자: Codex

---

## 🚨 가장 중요한 컨텍스트 (다음 AI가 절대 잊으면 안 되는 것)

**이 프로젝트는 단순한 "개인 작가 포트폴리오 웹사이트"가 절대 아닙니다.**

이곳은 **BAD BROTHERS X (BBX)** 라는 **글로벌 가상 AI 엔터테인먼트 레이블/에이전시**의 공식 사이트입니다.

### 왜 이 프로젝트가 존재하는가 (창립자 JungKing의 말)
- 한국에서 **15년간 수십 점 전시 → 단 5점 판매**
- 갤러리 수익 **50% 수수료** 착취
- 전시 중 **3개월 이상 작품 묶임** — 작가 본인이 팔지도 못함
- 가수도 마찬가지 — 무대에 설 기회 자체가 없음
- 결국 **자본 있는 자(갤러리/기획사)가 아티스트를 통제**하는 구조
- **BBX는 그 구조를 깨기 위해 만들어졌다**

### 닌텐도 모델 = BBX 모델
```
닌텐도(플랫폼)      = BAD BROTHERS X (AI 엔터 레이블)
마리오/포켓몬       = CHARACTER X / 88X / 미래 캐릭터들
게임→굿즈→영화      = 음악→AI영상→프린트→오리지널원화
각 IP가 서로 홍보   = 선순환(Virtuous Cycle) 생태계
```
> "닌텐도가 마리오를 만들었을 때 마리오는 픽셀이었다. 세계관이 있었을 뿐. 정킹의 스케치가 그 픽셀이다. BBX가 닌텐도다."

### AI 민주화 원칙
> "이전에는 자본이 있는 자가 기술을 독점해서 시각화했다. 이제 인공지능으로 원천기술·상상력·아이디어가 있으면 누구나 기술을 커스텀화해서 세상에 나올 수 있다." — JUNGKING

### 수익 모델 (재고 없이, 갤러리 없이)
- **디지털**: Gumroad — 아트팩/음원 (마진 100%)
- **프린트 온 디맨드**: Printful — 에디션 프린트/굿즈 (마진 50–60%)
- **오리지널 원화**: 직접 문의 폼 — 갤러리 없이 100% 수익
- **IP 라이선스**: 브랜드 협업 — 직접 계약

**목표: 미국 시장 먼저 → 성공하면 한국도 따라온다**


---

## 직전에 완료한 것

### 2026-06-16 로스터/갤러리 그리드 정렬 QA

1. 사용자가 제공한 모바일 스크린샷 기준으로 아래 문제를 수정했습니다.
   - CHARACTER X / JUNGKING / 88X 인물 소개 텍스트가 이미지보다 좌우로 튀어나가는 문제
   - 갤러리 작품 이미지 위의 `#JK-LIF-00X` 시리얼 태그가 이미지와 겹치거나 프레임 밖으로 어긋나는 문제
   - 상단 메뉴 텍스트가 너무 두꺼워 보이는 문제
2. 로스터 영역에 최종 containment 규칙을 추가했습니다.
   - `.luxury-roster`, `.luxury-roster-row`, `.luxury-card-info`에 `min-width: 0`, `max-width: 100%`
   - `.luxury-artist-name`에 `overflow-wrap`, 모바일 font-size clamp 하향 조정
   - 모바일/태블릿에서 1컬럼 그리드가 부모 폭을 넘지 않도록 강제
3. 갤러리 카드 구조를 정리했습니다.
   - `.art-frame`을 grid로 정리하고 `grid-template-columns: minmax(0, 1fr)` 추가
   - `.art-num-tag`를 absolute overlay에서 static normal-flow 텍스트로 변경
   - `.gallery-img`를 `.art-frame .gallery-img`로 강하게 지정해 이미지가 프레임 내부 폭/높이에 맞도록 수정
   - 태그와 이미지가 위아래로 분리되어 겹치지 않도록 변경
4. 상단 모바일 메뉴를 조금 얇게 조정했습니다.
   - 모바일 nav link font를 `Inter`
   - `font-weight: 700`
5. 캐시 갱신을 위해 CSS 참조를 `styles.css?v=2.9`로 올렸습니다.
6. Vercel 프로덕션 배포 완료:
   - Deployment ID: `dpl_C4HghDZVdFSBE637LfB4nGazzozZ`
   - Production URL: `https://bad-brothers-qlgaraq2v-bbx-s-projects.vercel.app`
   - Inspector URL: `https://vercel.com/bbx-s-projects/bad-brothers-x/C4HghDZVdFSBE637LfB4nGazzozZ`
   - Alias: `https://badbrothersx.com`
7. 공개 검증:
   - `https://www.badbrothersx.com/styles.css?v=2.9` → HTTP/2 200
   - 배포된 HTML이 `styles.css?v=2.9`를 참조하는 것 확인
8. 브라우저 계산값 검증:
   - 모바일 390×844: 로스터 제목 좌우 overflow 없음, nav weight 700, art tag/image overlap false, image inside frame true
   - 태블릿 834×1112: frame inside true, image inside frame true, art tag overlap false
   - 데스크톱 1440×900: frame inside true, image inside frame true, art tag overlap false, roster title overflow false

### 2026-06-16 모바일 메뉴 우측 정렬

1. 사용자가 요청한 방향: 모바일 고정 메뉴의 텍스트를 우측에 배치.
2. 기존 텍스트-only 메뉴 스타일은 유지했습니다.
3. 992px 이하 모바일 메뉴 `.luxury-nav`를 `justify-content: flex-end`로 변경했습니다.
4. 480px 이하 세부 오버라이드에도 `justify-content: flex-end`를 명시했습니다.
5. 캐시 갱신을 위해 CSS 참조를 `styles.css?v=2.7`로 올렸습니다.
6. Vercel 프로덕션 배포 완료:
   - Deployment ID: `dpl_GUgy5WjX9gQkFAe5mVNpwMiCdCw9`
   - Production URL: `https://bad-brothers-p4v8y8cwh-bbx-s-projects.vercel.app`
   - Inspector URL: `https://vercel.com/bbx-s-projects/bad-brothers-x/GUgy5WjX9gQkFAe5mVNpwMiCdCw9`
   - Alias: `https://badbrothersx.com`
7. 공개 검증:
   - `https://www.badbrothersx.com` → HTTP/2 200, `server: Vercel`, SSL/HSTS 정상
   - `https://www.badbrothersx.com/styles.css?v=2.7` → HTTP/2 200
   - 배포된 HTML이 `styles.css?v=2.7`을 참조하는 것 확인

### 2026-06-16 모바일 메뉴 텍스트-only 스타일 조정

1. 사용자가 요청한 방향: KAWS / Murakami 계열 팝아트 토이 감성은 참고하되, 메뉴에 박스나 테두리를 넣지 않고 텍스트만 남길 것.
2. 모바일 고정 메뉴의 pill 버튼 느낌을 제거했습니다.
   - 메뉴 링크 border 제거
   - background 제거
   - border-radius 제거
   - header 하단 border 제거
   - 텍스트 shadow 제거
3. 메뉴 글자는 `"Arial Black", "Inter"` 기반의 굵은 uppercase 텍스트로 조정했습니다.
4. 기존 모바일 고정 헤더와 ROSTER 여백 최적화는 유지했습니다.
5. 캐시 갱신을 위해 CSS 참조를 `styles.css?v=2.6`으로 올렸습니다.
6. Vercel 프로덕션 배포 완료:
   - Deployment ID: `dpl_BzQ4xPwf8QWJmL7FsfFyiRAtJCrY`
   - Production URL: `https://bad-brothers-8txkt6fne-bbx-s-projects.vercel.app`
   - Inspector URL: `https://vercel.com/bbx-s-projects/bad-brothers-x/BzQ4xPwf8QWJmL7FsfFyiRAtJCrY`
   - Alias: `https://badbrothersx.com`
7. 공개 검증:
   - `https://www.badbrothersx.com` → HTTP/2 200, `server: Vercel`, SSL/HSTS 정상
   - `https://www.badbrothersx.com/styles.css?v=2.6` → HTTP/2 200
   - 배포된 HTML이 `styles.css?v=2.6`을 참조하는 것 확인
8. 참고: 인앱 브라우저의 현재 `file://` 탭은 Browser 보안 정책상 자동 새로고침/검증이 차단되었습니다. 코드와 공개 배포 URL 기준으로 검증했습니다.

### 2026-06-16 모바일 UX 패치 및 프로덕션 배포

1. 모바일에서 상단 메뉴 텍스트가 보이지 않아 긴 스크롤 중 원하는 섹션으로 이동하기 어려운 문제를 수정했습니다.
2. 992px 이하 화면에서 헤더를 `fixed`로 고정하고, `ROSTER / MUSIC / STORY / GALLERY / SHOP / CONTACT` 링크를 로고 아래 가로 스크롤 가능한 pill 메뉴로 항상 표시하도록 변경했습니다.
3. fixed 헤더가 본문과 앵커 이동을 가리지 않도록 `.luxury-hybrid-content` 상단 padding과 `section[id]`의 `scroll-margin-top`을 추가했습니다.
4. 모바일 ROSTER 섹션의 CHARACTER X / JUNGKING / 88X 소개가 너무 길어지는 문제를 줄였습니다.
   - ROSTER 전체 상하 padding 축소
   - 섹션 헤더와 인물 row 사이 여백 축소
   - 인물 row 간격 축소
   - 모바일 이미지 최대 높이 축소
   - 이름/역할/소개글 margin, font-size, line-height 최적화
5. 캐시 갱신을 위해 CSS 참조를 `styles.css?v=2.4`로 올렸습니다.
6. Vercel 프로덕션 배포 완료:
   - Deployment ID: `dpl_GwHDrCWeMrpkHqi9KUjMwCUSq65d`
   - Production URL: `https://bad-brothers-a87zirygb-bbx-s-projects.vercel.app`
   - Inspector URL: `https://vercel.com/bbx-s-projects/bad-brothers-x/GwHDrCWeMrpkHqi9KUjMwCUSq65d`
   - Alias: `https://badbrothersx.com`
7. 공개 검증:
   - `https://www.badbrothersx.com` → HTTP/2 200, `server: Vercel`, SSL/HSTS 정상
   - `https://www.badbrothersx.com/styles.css?v=2.4` → HTTP/2 200
   - 배포된 HTML이 `styles.css?v=2.4`를 참조하는 것 확인

### 2026-06-16 Vercel 프로덕션 배포 및 도메인 검증

1. 배포 대상 폴더 `/Users/jk/Documents/ACA8/bad_brothers_x` 기준으로 Vercel 프로덕션 배포를 완료했습니다.
2. Vercel 프로젝트 연결 정보:
   - projectName: `bad-brothers-x`
   - projectId: `prj_xPnalaQqwJikS1RdLvjY8lnPfler`
   - org/team: `bbx-s-projects`
3. 배포 결과:
   - Deployment ID: `dpl_4qJvH5opBYZUwjcapkqgYK2daPwj`
   - Production URL: `https://bad-brothers-ro45fn1pf-bbx-s-projects.vercel.app`
   - Inspector URL: `https://vercel.com/bbx-s-projects/bad-brothers-x/4qJvH5opBYZUwjcapkqgYK2daPwj`
4. Vercel alias 결과: `https://badbrothersx.com`
5. 공개 도메인 검증:
   - `https://badbrothersx.com` → HTTP/2 200, `server: Vercel`, `strict-transport-security` 확인
   - `https://www.badbrothersx.com` → HTTP/2 200, `server: Vercel`, `strict-transport-security` 확인
6. DNS 검증:
   - `badbrothersx.com` → `76.76.21.21`
   - `www.badbrothersx.com` → `cname.vercel-dns.com.` → Vercel IP 응답 확인
7. 핵심 리소스 검증:
   - `https://www.badbrothersx.com/styles.css?v=2.0` → HTTP/2 200
   - `https://www.badbrothersx.com/app.js?v=2.3` → HTTP/2 200
   - `https://www.badbrothersx.com/crazy_march_original.m4a` → HTTP/2 200, `content-type: audio/mp4`
8. 참고: `vercel domains add www.badbrothersx.com` 명령은 `alias_conflict`를 반환했지만, 실제 공개 접속과 DNS/SSL은 정상입니다. 현재 상태에서는 도메인 대시보드에서 `www`가 다른 프로젝트에 붙어 있는지 정리하면 더 깔끔하지만, 사용자-facing 접속은 정상 동작합니다.

### 블랙 버전 로컬 파일 호환 패치

1. `portrait.jpg`를 `portrait-data.js`의 Data URI로 생성해 `file:///`에서도 파티클 엔진이 캔버스 픽셀을 읽고 얼굴을 형성하도록 수정했습니다.
2. `tools/generate-portrait-data.mjs`를 추가했습니다. `portrait.jpg`를 바꾸면 이 스크립트를 다시 실행해야 합니다.
3. YouTube iframe은 HTTP(S)에서만 생성합니다. 로컬 더블클릭 실행에서는 오류 153 플레이어 대신 공식 썸네일과 YouTube 외부 재생 링크를 표시합니다.
4. 이번 수정은 사용자의 요청대로 블랙 버전 `index.html`, `app.js`, `styles.css`에만 적용했습니다.
5. 파티클 얼굴과 입자 크기를 축소하고, 파티클 위에 `ANALOG. CONCEPTUAL. ALIVE.` 영문 포지셔닝 문구를 추가했습니다.
6. 정킹 갤러리 원본의 26개 전시 이미지와 매니페스트를 `jungking-archive/`로 복구했습니다.
7. 아카이브는 글로벌 버전에 맞춰 화면상 한국어를 제거하고, 영문 필터·목록·전시 사진 모달·이전/다음 캐러셀을 구현했습니다.
8. 전시를 연속 탐색하기 쉽도록 팝업 모달을 제거했습니다. 전시 행을 클릭하면 바로 아래에 세부정보와 사진 갤러리가 펼쳐지며, 한 번에 하나의 전시만 열리고 사진은 가로 스크롤·스와이프로 탐색합니다.
9. 파티클 얼굴을 데스크톱 오른쪽으로 이동하고 문구 크기를 줄였습니다. 모바일에서는 문구를 위, 얼굴을 오른쪽 아래에 두어 겹침을 제거했습니다. 전체 UI는 `Inter` 중심으로 통일하고 아카이브·가격·본문의 네온 녹색을 무채색으로 정리했습니다.
10. 인라인 전시 갤러리 하단 오른쪽에 이전/다음 화살표와 현재 이미지 번호를 추가했습니다. 한 번 클릭할 때 한 장씩 이동하며 첫 장과 마지막 장에서는 해당 방향 버튼이 비활성화됩니다.

### v4.0 SHOP PILOT

1. 가짜 주문 완료처럼 보이던 FormSubmit SHOP 주문 모달을 제거했습니다.
2. `shop-config.js`에 실제 결제 URL이 있을 때만 `BUY NOW`가 열리는 출시 게이트를 추가했습니다.
3. 첫 테스트 상품을 `BBX Digital Art Pack — Vol. 01`로 정하고 USD 15 파일럿 구조를 만들었습니다.
4. 캔버스, 후디, 바이닐은 제작·배송 검증 전까지 `COMING SOON`으로 고정했습니다.
5. `SHOP_LAUNCH.md`에 디지털 파일 구성, 라이선스, 실물 상품 출시 조건과 테스트 순서를 기록했습니다.
6. `check-shop-images.js`를 추가해 장변 6000px 미만 이미지를 인쇄용으로 통과시키지 않도록 했습니다.
7. 현재 사이트 이미지들은 대체로 1200px 전후이므로 웹 미리보기용이며 판매용 인쇄 마스터가 아닙니다.
8. Downloads의 `logo1.png`를 `bbx-logo-mark.png`로 추가하고 헤더의 `BAD BROTHERS X` 아래에 반응형 심볼로 배치했습니다. PC, 모바일 세로, 모바일 가로에서 메뉴와 겹치지 않도록 각각 크기를 조정했습니다.
9. 2026-06-07 18:56 KST Vercel 프로덕션 배포 완료: `https://badbrothersx.com` (로고 로드, SHOP 파일럿 상태, 브라우저 콘솔 검수 완료)
10. 헤더의 반투명 배경과 전체 ambient glow를 제거해 헤더·본문 모두 순수 검정(`#000000`)으로 통일하고, BBX 심볼을 PC 72px / 모바일 52px로 확대했습니다.
11. 모바일에서 심볼 외곽선 끝이 얇아지는 PNG 축소 문제를 해결하기 위해 `bbx-logo-mark.svg`로 교체하고, PC 72px / 모바일 세로 64px / 모바일 가로 50px로 비율을 고정했습니다.
12. 992px 이하 히어로 텍스트·배지·버튼을 왼쪽 정렬하고 타이틀 크기를 `clamp()`로 제한했습니다. 메뉴도 992px 이하에서 햄버거로 전환해 834px·932px 구간의 가로 밀림과 중앙 압축 현상을 제거했습니다.
13. 2026-06-07 19:18 KST Vercel 프로덕션 배포 완료: `https://badbrothersx.com` (430·834·844·932·1200px 반응형 폭, SVG 로드, 메뉴 열기/닫기, 콘솔 오류 검수 완료)
14. 모바일 가로 화면에서 푸터 전체가 한 줄로 압축되던 규칙을 제거하고, 저작권·소셜 / IP 권리 문구 / 시스템 상태의 3단 구조로 분리했습니다. 844×390, 932×430, 430×932에서 가로 넘침 없이 검수했습니다.
15. 2026-06-07 19:28 KST Vercel 프로덕션 배포 완료: `https://badbrothersx.com` (모바일 가로 푸터 3단 정렬, 가로 넘침 없음, 콘솔 오류 0건 확인)

### v2.8 ~ v3.3

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

### 2026-06-16 모바일 로스터 폭 정렬 패치

1. 모바일/태블릿 로스터에서 `CHARACTER X`, `JUNGKING`, `88X`의 텍스트 영역을 각 이미지와 같은 폭으로 제한했습니다.
2. 제목, 역할, 본문이 이미지 좌우 라인을 벗어나지 않도록 `.luxury-image-box`와 `.luxury-card-info`를 동일 폭으로 중앙 정렬했습니다.
3. 모바일에서 `CHARACTER X` 제목이 화면 밖으로 밀리지 않도록 글자 크기와 자간을 추가 조정했습니다.
4. CSS 캐시 무효화를 위해 `index.html`의 스타일시트 버전을 `styles.css?v=3.0`으로 올렸습니다.
5. Vercel 프로덕션 배포 완료:
   - Deployment ID: `dpl_5KMEWVzaX3VFnyrreqMdAZFshpqq`
   - URL: `https://bad-brothers-otvy2o6zp-bbx-s-projects.vercel.app`
   - Alias: `https://badbrothersx.com`, `https://www.badbrothersx.com`
6. 검증 결과:
   - `https://www.badbrothersx.com/` → HTTP/2 200, `server: Vercel`, SSL/HSTS 확인
   - `https://www.badbrothersx.com/styles.css?v=3.0` → HTTP/2 200
   - 390px 모바일 뷰포트에서 세 로스터 카드 모두 `textInsideImage: true`, 가로 넘침 없음

### 2026-06-16 히어로 메인 영상 교체

1. 바탕화면의 `/Users/jk/Desktop/Timeline.mp4`를 프로젝트 배포 파일 `timeline.mp4`로 추가했습니다.
2. 메인 히어로 `<video>` 소스를 기존 `life_is_fun_loop.mp4`에서 `timeline.mp4`로 교체했습니다.
3. 새 영상 정보:
   - 해상도: 1920×1080
   - 길이: 8초
   - 용량: 약 9.7MB
   - 표시 방식: 기존과 동일하게 `object-fit: cover`
4. Vercel 프로덕션 배포 완료:
   - Deployment ID: `dpl_4r8PA8m9vDeNkNWbHJdiR7jmXzHq`
   - URL: `https://bad-brothers-rhdgjp3ci-bbx-s-projects.vercel.app`
   - Alias: `https://badbrothersx.com`, `https://www.badbrothersx.com`
5. 검증 결과:
   - `https://www.badbrothersx.com/timeline.mp4` → HTTP/2 200, `content-type: video/mp4`
   - `https://www.badbrothersx.com/#hero` 모바일 390px 렌더링에서 실제 영상 소스가 `timeline.mp4`로 확인됨

### 2026-06-17 홈 첫 흐름 재정렬 및 Spotify 공식 링크 연결

1. 메인 페이지 정보 구조를 사용자가 요청한 3초 진입 흐름에 맞춰 재배치했습니다.
   - 기존: `HERO → ROSTER → MUSIC → ORIGIN`
   - 변경: `HERO → MUSIC/YOUTUBE/SPOTIFY → ROSTER → ORIGIN/ARCHIVE`
2. 상단 메뉴 순서도 `MUSIC → ROSTER → STORY → GALLERY → SHOP → CONTACT`로 조정했습니다.
3. `MUSIC` 섹션 제목을 `01 // OFFICIAL RELEASE`로 변경하고, 공식 MV/음악/Spotify 이후 인물과 원천 아카이브로 이어지는 문구로 정리했습니다.
4. 기존 Spotify placeholder alert를 공식 Spotify 앨범 링크로 교체했습니다.
   - `https://open.spotify.com/album/76Bql9DOW9fOINHeLyqYqX`
5. Vercel 프로덕션 배포 완료:
   - Deployment ID: `dpl_EoFv9VM3V4fapXmBqihDCpMunv7v`
   - URL: `https://bad-brothers-bpq2sugx0-bbx-s-projects.vercel.app`
   - Alias: `https://badbrothersx.com`, `https://www.badbrothersx.com`
6. 검증 결과:
   - `https://www.badbrothersx.com/` → HTTP/2 200
   - 배포 HTML에서 `hero → releases → roster → origin` 순서와 Spotify 공식 링크 확인

### 2026-06-17 Apple Music 공식 링크 추가

1. `Life is Fun - Single`의 Apple Music 공식 링크를 MUSIC 섹션에 추가했습니다.
   - `https://music.apple.com/kr/album/life-is-fun-single/6780744474`
2. 각 트랙 오른쪽 스트리밍 버튼을 `Spotify` + `Apple Music` 두 개로 정리했습니다.
3. 모바일에서도 두 스트리밍 버튼이 깨지지 않도록 `.am-track-right`와 `.am-stream-link` 반응형 스타일을 추가했습니다.
4. Vercel 프로덕션 배포 완료:
   - Deployment ID: `dpl_FduLDMucM2cpLQ1Zdj41TQkFTnNF`
   - URL: `https://bad-brothers-atqfhsxqk-bbx-s-projects.vercel.app`
   - Alias: `https://badbrothersx.com`, `https://www.badbrothersx.com`
5. 검증 결과:
   - `https://www.badbrothersx.com/` → HTTP/2 200
   - 배포 HTML에서 Spotify 및 Apple Music 공식 링크 반영 확인

### 2026-06-17 주요 플랫폼 배지 및 CHARACTERX 검색 문구 추가

1. MUSIC 섹션 앨범 정보 아래에 `OFFICIALLY AVAILABLE ON MAJOR PLATFORMS` 스트립을 추가했습니다.
2. 표시 플랫폼은 글로벌/미국 기준 핵심 5개로 제한했습니다.
   - Spotify
   - Apple Music
   - YouTube Music
   - Instagram
   - TikTok
3. Spotify와 Apple Music은 공식 링크로 연결하고, YouTube Music/Instagram/TikTok은 등록 신뢰 배지로만 표시했습니다.
4. 앨범 검색명을 안내하기 위해 `Search "CHARACTERX" on your music platform.` 문구를 추가했습니다.
5. CSS 캐시 무효화를 위해 `styles.css?v=3.1`로 업데이트했습니다.
6. Vercel 프로덕션 배포 완료:
   - Deployment ID: `dpl_64v4tqZGbgo91t7NU4poZiHuaVfC`
   - URL: `https://bad-brothers-96r97t7b8-bbx-s-projects.vercel.app`
   - Alias: `https://badbrothersx.com`, `https://www.badbrothersx.com`
7. 검증 결과:
   - `https://www.badbrothersx.com/` → HTTP/2 200
   - `https://www.badbrothersx.com/styles.css?v=3.1` → HTTP/2 200
   - 배포 HTML에서 플랫폼 배지 5개와 `Search "CHARACTERX"` 문구 반영 확인

### 2026-06-17 플랫폼 배지 비클릭 처리

1. MUSIC 섹션 상단의 5개 플랫폼 배지를 모두 클릭되지 않는 텍스트/신뢰 배지로 변경했습니다.
2. Spotify와 Apple Music의 실제 클릭 링크는 아래 각 트랙 오른쪽 스트리밍 버튼에만 유지했습니다.
3. 사용자가 플랫폼 배지를 눌러보며 헷갈리는 동선을 제거했습니다.
4. Vercel 프로덕션 배포 완료:
   - Deployment ID: `dpl_7m6rNp6N1QHcZbqVnVPvBHyDRFay`
   - URL: `https://bad-brothers-ab94u5u2m-bbx-s-projects.vercel.app`
   - Alias: `https://badbrothersx.com`, `https://www.badbrothersx.com`
5. 검증 결과:
   - `https://www.badbrothersx.com/` → HTTP/2 200
   - 배포 HTML에서 플랫폼 배지는 `<span>`으로, 하단 Spotify/Apple Music 버튼은 `<a>` 링크로 분리 확인

### 2026-06-17 플랫폼 표시 텍스트-only 정리

1. MUSIC 섹션 상단 플랫폼 표시에서 가짜 로고/이니셜 원형 마크를 모두 제거했습니다.
2. 둥근 박스형 배지도 제거하고 `Spotify / Apple Music / YouTube Music / Instagram / TikTok` 텍스트 리스트만 남겼습니다.
3. 실제 클릭 가능한 공식 링크는 아래 트랙 오른쪽의 Spotify/Apple Music 버튼에만 유지했습니다.
4. Vercel 프로덕션 배포 완료:
   - Deployment ID: `dpl_TDp5boSCF88Hj8gsM9eJ56qLjZjU`
   - URL: `https://bad-brothers-72dm4zjpy-bbx-s-projects.vercel.app`
   - Alias: `https://badbrothersx.com`, `https://www.badbrothersx.com`
5. 검증 결과:
   - `https://www.badbrothersx.com/` → HTTP/2 200
   - `https://www.badbrothersx.com/styles.css?v=3.1` → HTTP/2 200
   - 배포 HTML에서 플랫폼 줄은 텍스트-only, 하단 스트리밍 버튼은 클릭 링크 유지 확인

### 2026-06-17 앨범 헤더 아티스트 표기 정리

1. MUSIC 섹션 앨범 헤더의 `CHARACTERX × 88X` 표기를 `CHARACTERX`로 변경했습니다.
2. 트랙별 `CHARACTER X (Prod. by 88X)` 표기는 유지해, 88X 역할은 트랙 정보에서만 보이도록 정리했습니다.
3. Vercel 프로덕션 배포 완료:
   - Deployment ID: `dpl_7XtXu31mgLQmPkd8H7Nscnv4S3Po`
   - URL: `https://bad-brothers-n2ui7zh62-bbx-s-projects.vercel.app`
   - Alias: `https://badbrothersx.com`, `https://www.badbrothersx.com`
4. 검증 결과:
   - `https://www.badbrothersx.com/` → HTTP/2 200
   - 배포 HTML에서 앨범 헤더 `CHARACTERX`, 트랙별 `Prod. by 88X` 유지 확인

---

## 다음 AI가 해야 할 작업 (우선순위 순)

### 🔴 1순위 — 디지털 상품 실제 결제 테스트
- [ ] Gumroad 판매자 계정의 신원·정산 설정 완료
- [ ] 판매할 원본 이미지 3~5개 확보 및 `check-shop-images.js` 검사
- [ ] 3840x2160 데스크톱 월페이퍼, 2160x3840 모바일 월페이퍼, `LICENSE.pdf`, `README.pdf`를 ZIP으로 제작
- [ ] Gumroad에 USD 15 테스트 상품 생성
- [ ] 다른 구매자 계정으로 실제 결제 → 영수증 → 다운로드 → 환불 → 정산 상태 확인
- [ ] 테스트 통과 후 `shop-config.js`의 상태를 `live`로 바꾸고 실제 URL 입력
- [ ] **Instagram 첫 포스트/릴스 기획 작성**: `@xjungking` 계정에 사이트 오픈과 레이블 비전을 글로벌 타겟(영문 중심)으로 알리는 첫 콘텐츠(캡션 및 해시태그)를 작성하여 사용자에게 제안해야 합니다.

### 🟡 2순위 — 확장 계획
- [ ] **새 아티스트 티징**: 하반기에 추가될 새로운 AI 캐릭터 아티스트를 위한 "Trainee" 또는 "Coming Soon" 섹션을 ROSTER 하단에 추가.

---

## 주의사항

- `PROJECT_BIBLE.md`를 먼저 반드시 읽을 것. (레이블 비전 숙지)
- 작업 완료 후 이 파일(`HANDOFF.md`)을 반드시 업데이트할 것.
- 배포 명령어: `export PATH="/Users/jk/Documents/ACA8/node-local/bin:$PATH" && npx vercel --prod --yes`

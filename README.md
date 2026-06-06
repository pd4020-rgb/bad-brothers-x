# ⚡ BAD BROTHERS X (BBX) 웹사이트 배포 & 운영 가이드

본 가이드는 대표님이 완성된 브라우저 스타일 웹사이트를 로컬에서 테스트하고, 실전 인터넷 웹으로 배포하는 전체 과정을 담고 있습니다.

---

## 1. 로컬 테스트 및 영상 확인

현재 웹사이트의 메인 비디오 플레이어는 대표님 맥의 **`/Users/jk/Downloads/M8-3.mov`** 파일을 다이렉트로 읽도록 설계되어 있습니다.

*   **실행**: `index.html` 파일을 더블 클릭하여 Chrome 또는 Safari 브라우저에서 엽니다.
*   **검증**: 영상이 버퍼링 없이 즉시 재생되는지 확인하고, 음악 플레이어 및 B2B 상담 폼이 부드럽게 작동하는지 테스트합니다.

---

## 2. 유튜브 영상 업로드 및 코드 수정

인터넷상에 웹사이트를 런칭하기 전에 대표님의 영상을 유튜브에 올리고, 웹사이트 비디오 링크를 업데이트해야 합니다.

1.  대표님의 공식 유튜브 채널에 `/Users/jk/Downloads/M8-3.mov` 영상을 업로드합니다.
2.  동영상 링크에서 고유 ID(예: `https://youtu.be/ABCDE12345` 라면 **`ABCDE12345`**)를 복사합니다.
3.  **[index.html](file:///Users/jk/Documents/ACA8/bad_brothers_x/index.html)** 파일을 텍스트 에디터로 엽니다.
4.  **`<!-- Local Video Player -->`** 영역을 아래와 같은 유튜브 iframe 코드로 변경합니다:

```html
<!-- 유튜브 비디오 플레이어 (인터넷 배포용) -->
<div class="video-container">
    <iframe 
        width="100%" 
        height="100%" 
        src="https://www.youtube.com/embed/유튜브ID값?autoplay=1&mute=1&loop=1&playlist=유튜브ID값" 
        title="BAD BROTHERS X Cinematic" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
        style="border: none; aspect-ratio: 16/9;">
    </iframe>
    <div class="video-overlay-info">
        <span class="status-indicator live"></span>
        <span class="video-title">DEBUT CINEMATIC: M8-3</span>
        <span class="badge">DIR. JUNGKING</span>
    </div>
</div>
```

---

## 3. 웹사이트 실전 배포 (Vercel 활용 - 1분 소요)

윅스를 사용하지 않고, 100% 무료이면서 전 세계에서 가장 빠른 속도로 사이트를 호스팅하는 방법입니다.

1.  맥의 **터미널(Terminal)** 앱을 실행합니다.
2.  아래 명령어를 실행하여 웹사이트 폴더로 이동합니다:
    ```bash
    cd /Users/jk/Documents/ACA8/bad_brothers_x
    ```
3.  아래 배포 명령어를 입력합니다 (로그인 및 배포가 터미널 안에서 즉시 실행됩니다):
    ```bash
    npx vercel --prod
    ```
4.  화면에 나오는 안내에 따라 엔터를 몇 번 누르면 배포가 완료되며, 실전 도메인 링크(예: `bad-brothers-x.vercel.app`)가 즉시 생성됩니다!

---

## 4. 대표님 개인 도메인 (`www.jungking.com`) 연결

만약 Wix 사이트를 이 힙한 브라우저형 사이트로 완전히 대체하고 싶다면:

1.  Vercel 대시보드(웹페이지)에 로그인하여 해당 프로젝트의 `Settings -> Domains`로 이동합니다.
2.  대표님의 도메인 `www.jungking.com`을 입력하고 추가합니다.
3.  화면에 나오는 Vercel의 네임서버 주소(혹은 A 레코드)를 대표님의 도메인 구매 사이트(가비아, Wix 등)에 입력해 주기만 하면 2~3시간 내로 도메인 연결이 완료됩니다.

---

## 5. Wix(윅스) 내부에 임베딩하는 방법

기존 Wix 홈페이지의 일부 페이지(예: 메인 화면)에만 이 브라우저 스타일 레이아웃을 통째로 얹고 싶을 때 사용하는 방법입니다.

1.  위 **3번 과정**을 완료하여 Vercel 호스팅 주소(예: `https://bad-brothers-x.vercel.app`)를 획득합니다.
2.  Wix 에디터에 접속한 뒤, 좌측 메뉴에서 **`플러스(+) 버튼 -> 임베드 코드 -> HTML 웹프레임`**을 추가합니다.
3.  설정 창에서 `웹 주소(URL)` 라디오 버튼을 클릭하고, Vercel 주소를 그대로 붙여넣습니다.
4.  HTML 컴포넌트의 크기를 100% 너비와 화면 높이에 맞춰 조절해 주면 Wix 사이트 내부에서 브라우저 UI가 완벽하게 작동합니다.

/* ==========================================================================
   BAD BROTHERS X — NATIVE INTERACTION LOGIC (app.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Feather Icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }

    // YouTube requires an HTTP(S) referrer. Avoid loading a broken iframe on file://.
    const officialMv = document.getElementById('official-mv');
    if (officialMv) {
        const videoId = officialMv.dataset.youtubeId;
        const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;

        if (window.location.protocol === 'file:') {
            officialMv.classList.add('mv-offline-fallback');
            officialMv.innerHTML = `
                <img src="video_poster.jpg"
                     alt="Bad Brothers X — Life is Fun official music video">
                <div class="mv-offline-overlay">
                    <span class="mv-offline-note">LOCAL PREVIEW</span>
                    <a href="${watchUrl}" target="_blank" rel="noopener noreferrer"
                       class="mv-watch-link" aria-label="Watch Life is Fun on YouTube">
                        WATCH ON YOUTUBE
                    </a>
                </div>
            `;
        } else {
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
            iframe.title = 'Bad Brothers X — Life is Fun (Official MV)';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
            iframe.allowFullscreen = true;
            iframe.referrerPolicy = 'strict-origin-when-cross-origin';
            iframe.loading = 'lazy';
            officialMv.appendChild(iframe);
        }
    }

    // ==========================================
    // 0. MOBILE HAMBURGER MENU
    // ==========================================
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            navMenu.classList.toggle('open');
        });

        // Close menu when a nav link is clicked
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('open');
            });
        });

        // Close menu when clicking outside (on the dim overlay)
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('open') &&
                !navMenu.contains(e.target) &&
                !hamburgerBtn.contains(e.target)) {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('open');
            }
        });
    }

    // ==========================================
    // A. CUSTOM MUSIC PLAYER LOGIC
    // ==========================================
    const playBtn = document.getElementById('btn-play-pause');
    const playIcon = document.getElementById('play-icon');
    const diskElement = document.getElementById('disk-element');
    const trackTitle = document.getElementById('player-track-title');
    const timeCurrent = document.getElementById('player-time-current');
    const timeDuration = document.getElementById('player-time-duration');
    const progressBar = document.getElementById('player-progress-bar');
    const progressFill = document.getElementById('player-progress-fill');
    const trackRows = document.querySelectorAll('.track-row');

    let isPlaying = false;
    let currentProgress = 0;
    let durationSeconds = 194; // 3:14
    let currentSeconds = 0;
    let playbackInterval = null;

    function formatTime(secs) {
        const minutes = Math.floor(secs / 60);
        const seconds = Math.floor(secs % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    const trackDurations = {
        "Life is Fun (AI Remix v1.0)": 194,
        "M8-3 Cyber Theme": 142,
        "Analog Fine Art Heritage": 285
    };

    function updateTrackInfo(title) {
        if (trackTitle) trackTitle.textContent = title;
        durationSeconds = trackDurations[title] || 180;
        if (timeDuration) timeDuration.textContent = formatTime(durationSeconds);
        resetPlayback();
    }

    function resetPlayback() {
        currentSeconds = 0;
        currentProgress = 0;
        if (timeCurrent) timeCurrent.textContent = "0:00";
        if (progressFill) progressFill.style.width = "0%";
        if (isPlaying) {
            startPlaybackTimer();
        }
    }

    function togglePlayPause() {
        if (!playBtn) return;
        isPlaying = !isPlaying;
        if (isPlaying) {
            playBtn.innerHTML = '<i id="play-icon" data-feather="pause"></i>';
            diskElement?.classList.add('playing');
            startPlaybackTimer();
        } else {
            playBtn.innerHTML = '<i id="play-icon" data-feather="play"></i>';
            diskElement?.classList.remove('playing');
            clearInterval(playbackInterval);
        }
        feather.replace();
    }

    function startPlaybackTimer() {
        clearInterval(playbackInterval);
        playbackInterval = setInterval(() => {
            if (currentSeconds < durationSeconds) {
                currentSeconds += 1;
                currentProgress = (currentSeconds / durationSeconds) * 100;
                if (timeCurrent) timeCurrent.textContent = formatTime(currentSeconds);
                if (progressFill) progressFill.style.width = `${currentProgress}%`;
            } else {
                resetPlayback();
                togglePlayPause();
            }
        }, 1000);
    }

    if (playBtn) {
        playBtn.addEventListener('click', togglePlayPause);
    }

    trackRows.forEach(row => {
        row.addEventListener('click', function() {
            trackRows.forEach(r => r.classList.remove('active'));
            this.classList.add('active');

            const title = this.getAttribute('data-title');
            updateTrackInfo(title);

            if (!isPlaying) {
                togglePlayPause();
            }
        });
    });

    if (progressBar) {
        progressBar.addEventListener('click', (e) => {
            const barWidth = progressBar.clientWidth;
            const clickX = e.offsetX;
            const percentage = clickX / barWidth;

            currentSeconds = Math.floor(percentage * durationSeconds);
            currentProgress = percentage * 100;
            if (timeCurrent) timeCurrent.textContent = formatTime(currentSeconds);
            if (progressFill) progressFill.style.width = `${currentProgress}%`;
        });
    }

    document.getElementById('btn-prev')?.addEventListener('click', () => {
        let activeIndex = Array.from(trackRows).findIndex(r => r.classList.contains('active'));
        let prevIndex = activeIndex - 1;
        if (prevIndex < 0) prevIndex = trackRows.length - 1;
        trackRows[prevIndex].click();
    });

    document.getElementById('btn-next')?.addEventListener('click', () => {
        let activeIndex = Array.from(trackRows).findIndex(r => r.classList.contains('active'));
        let nextIndex = activeIndex + 1;
        if (nextIndex >= trackRows.length) nextIndex = 0;
        trackRows[nextIndex].click();
    });

    // ==========================================
    // B. B2B CLIENT INQUIRY FORM SUBMISSION (Formspree)
    // ==========================================
    const projectForm = document.getElementById('project-form');
    const successMsg = document.getElementById('form-success-msg');

    if (projectForm && successMsg) {
        projectForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = projectForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'SENDING...';
            submitBtn.disabled = true;

            const formData = {
                name: document.getElementById('client-name')?.value,
                email: document.getElementById('client-email')?.value,
                projectType: document.getElementById('project-type')?.value,
                description: document.getElementById('project-desc')?.value,
            };

            try {
                // Formsubmit endpoint for direct email delivery
                const response = await fetch('https://formsubmit.co/ajax/badbrothersx.official@gmail.com', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    projectForm.style.transition = 'opacity 0.3s ease';
                    projectForm.style.opacity = '0';
                    setTimeout(() => {
                        projectForm.style.display = 'none';
                        successMsg.style.display = 'flex';
                        if (typeof feather !== 'undefined') feather.replace();
                    }, 300);
                } else {
                    submitBtn.innerHTML = 'ERROR — TRY AGAIN';
                    submitBtn.disabled = false;
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        if (typeof feather !== 'undefined') feather.replace();
                    }, 2000);
                }
            } catch (err) {
                // Fallback: open mailto if fetch fails
                const subject = encodeURIComponent(`BBX Project Brief — ${formData.projectType}`);
                const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.description}`);
                window.location.href = `mailto:info@badbrothersx.com?subject=${subject}&body=${body}`;
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                if (typeof feather !== 'undefined') feather.replace();
            }
        });
    }


    // ==========================================
    // C. SHOP RELEASE GATE
    // ==========================================
    const shopConfig = window.BBX_SHOP?.products || {};

    document.querySelectorAll('[data-product-id]').forEach(card => {
        const product = shopConfig[card.dataset.productId];
        const buyButton = card.querySelector('[data-buy-button]');
        const statusLabel = card.querySelector('[data-status]');

        if (!buyButton || !product) return;

        const hasLiveCheckout = product.status === 'live'
            && /^https:\/\//i.test(product.checkoutUrl);

        if (hasLiveCheckout) {
            buyButton.href = product.checkoutUrl;
            buyButton.removeAttribute('aria-disabled');
            buyButton.innerHTML = 'BUY NOW <i data-feather="shopping-cart"></i>';
            if (statusLabel) statusLabel.textContent = 'AVAILABLE NOW';
        } else if (product.status === 'inquire') {
            const subject = encodeURIComponent(`Inquiry: ${product.name || 'Digital Collector Edition'}`);
            buyButton.href = `mailto:badbrothersx.official@gmail.com?subject=${subject}`;
            buyButton.removeAttribute('aria-disabled');
            buyButton.innerHTML = 'INQUIRE NOW <i data-feather="mail"></i>';
            if (statusLabel) statusLabel.textContent = 'INQUIRE TO BUY';
        } else {
            buyButton.removeAttribute('href');
            buyButton.setAttribute('aria-disabled', 'true');
            buyButton.addEventListener('click', event => event.preventDefault());
        }
    });

    if (typeof feather !== 'undefined') feather.replace();

    // ==========================================
    // D. SCROLL TO TOP PROGRESS CIRCLE & SCROLLSPY
    // ==========================================
    const backToTopBtn = document.getElementById('back-to-top');
    const progressCircle = document.querySelector('.progress-ring__circle');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const circumference = 2 * Math.PI * 21; // 131.95

    function updateScrollProgress() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;

        // Show/hide back to top button
        if (scrollTop > 300) {
            backToTopBtn?.classList.add('visible');
        } else {
            backToTopBtn?.classList.remove('visible');
        }

        // Update circular progress ring
        if (progressCircle && docHeight > 0) {
            const scrollPercent = Math.min(Math.max(scrollTop / docHeight, 0), 1);
            const offset = circumference - (scrollPercent * circumference);
            progressCircle.style.strokeDashoffset = offset;
        }

        // Active Section Highlighting (Scrollspy)
        let currentSection = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const headerOffset = 120; // threshold for sticky header
            if (scrollTop >= sectionTop - headerOffset) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Scroll click handler for Back to Top
    backToTopBtn?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Run updates on scroll
    window.addEventListener('scroll', updateScrollProgress);

    // Run once initially to align on page load
    updateScrollProgress();

    // ==========================================
    // E. INTERACTIVE SPOTLIGHT CARD HOVER EFFECT
    // ==========================================
    const hoverCards = document.querySelectorAll('.roster-card, .product-card, .gallery-item, .contact-form-container');

    hoverCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // ==========================================
    // F. LIGHTBOX POPUP LOGIC
    // ==========================================
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    const lbTitle = document.getElementById('lightbox-title');
    const lbMedium = document.getElementById('lightbox-medium');
    const lbSize = document.getElementById('lightbox-size');
    const lbYear = document.getElementById('lightbox-year');
    const lbClose = document.getElementById('lightbox-close');

    if (lightbox && lbClose) {
        document.querySelectorAll('.gallery-item[data-src]').forEach(item => {
            item.addEventListener('click', () => {
                const src = item.getAttribute('data-src');
                const title = item.getAttribute('data-title');
                const medium = item.getAttribute('data-medium');
                const size = item.getAttribute('data-size');
                const year = item.getAttribute('data-year');

                if (lbImg) { lbImg.src = src; lbImg.alt = title; }
                if (lbTitle) lbTitle.textContent = title;
                if (lbMedium) lbMedium.textContent = medium;
                if (lbSize) lbSize.textContent = size;
                if (lbYear) lbYear.textContent = year;

                lightbox.classList.add('open');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('open');
            document.body.style.overflow = '';
            if (lbImg) lbImg.src = '';
        };

        lbClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
        });
    }

    // ==========================================
    // G. DYNAMIC EXHIBITION ARCHIVE LOGIC
    // ==========================================
    const toggleArchiveBtn = document.getElementById('toggle-archive-btn');
    const archiveContainer = document.getElementById('full-archive-container');
    const archiveGrid = archiveContainer ? archiveContainer.querySelector('.archive-list-wrapper') : null;
    const archiveFilterBtns = archiveContainer ? archiveContainer.querySelectorAll('.archive-filter-btn') : [];

    const JUNGKING_EXHIBITIONS = [
        {
            id: "exh_00",
            year: "2026",
            title_en: "2026 BAD BROTHERS X",
            title_ko: "2026 배드 브라더스 X",
            type_en: "Global IP & AI Production",
            type_ko: "글로벌 IP & AI 제작",
            desc_en: "JUNGKINGX Persona / badbrothersx.com",
            desc_ko: "정킹X 페르소나 / badbrothersx.com",
            category: "project"
        },
        {
            id: "exh_01",
            year: "2025",
            title_en: "JUNGKING X RENASON",
            title_ko: "정킹 X 레나선 2인전",
            type_en: "Two-Person Exhibition",
            type_ko: "2인전",
            desc_en: "Gallery Aurora, Seoul/Yangsan",
            desc_ko: "갤러리 오로라, 서울/양산",
            category: "major"
        },
        {
            id: "exh_02",
            year: "2024",
            title_en: "Incheon Art Show",
            title_ko: "인천아트쇼",
            type_en: "Art Fair",
            type_ko: "아트 페어",
            desc_en: "Gallery WE, Incheon",
            desc_ko: "갤러리 위, 인천",
            category: "major"
        },
        {
            id: "exh_03",
            year: "2024",
            title_en: "March on, LIFE IS FUN",
            title_ko: "개인 초대전 'March on, LIFE IS FUN'",
            type_en: "Solo Exhibition",
            type_ko: "개인 초대전",
            desc_en: "Gallery WE, Seoul. Character X represents the diverse personas of modern individuals.",
            desc_ko: "갤러리 위, 서울. 캐릭터 X는 인생의 우주 속 현대인의 다양한 페르소나를 대변합니다.",
            category: "major"
        },
        {
            id: "exh_04",
            year: "2024",
            title_en: "Galleries Art Fair in Suwon",
            title_ko: "수원 화랑미술제",
            type_en: "Art Fair",
            type_ko: "아트 페어",
            desc_en: "Gallery WE",
            desc_ko: "갤러리 위",
            category: "major"
        },
        {
            id: "exh_05",
            year: "2024",
            title_en: "Live Painting Special Booth",
            title_ko: "라이브 페인팅 특별 부스",
            type_en: "Performance",
            type_ko: "퍼포먼스",
            desc_en: "Galleries Art Fair in Suwon, Gallery WE",
            desc_ko: "수원 화랑미술제, 갤러리 위",
            category: "major"
        },
        {
            id: "exh_06",
            year: "2023",
            title_en: "Collage Gallery",
            title_ko: "꼴라주 갤러리 2인전",
            type_en: "Two-Person Exhibition",
            type_ko: "2인전",
            desc_en: "Ulsan, Korea",
            desc_ko: "울산, 한국",
            category: "project"
        },
        {
            id: "exh_07",
            year: "2021",
            title_en: "ARTJEJU",
            title_ko: "아트제주",
            type_en: "Art Fair",
            type_ko: "아트 페어",
            desc_en: "Gallery 4th Street, Jeju",
            desc_ko: "갤러리 4번가, 제주",
            category: "major"
        },
        {
            id: "exh_08",
            year: "2020",
            title_en: "URBAN BREAK Art Asia",
            title_ko: "어반 브레이크 아트 아시아",
            type_en: "Art Fair",
            type_ko: "아트 페어",
            desc_en: "N Art Gallery, COEX, Seoul",
            desc_ko: "앤 아트 갤러리, 코엑스, 서울",
            category: "major"
        },
        {
            id: "exh_09",
            year: "2020",
            title_en: "CARNIVAL Altamira",
            title_ko: "카니발 알타미라 단체전",
            type_en: "Group Exhibition",
            type_ko: "단체전",
            desc_en: "ahsh Gallery, Heyri",
            desc_ko: "아쉬 갤러리, 헤이리",
            category: "project"
        },
        {
            id: "exh_10",
            year: "2020",
            title_en: "VIP ROOM Exhibition",
            title_ko: "광교 갤러리아 백화점 VIP ROOM 전시",
            type_en: "Exhibition",
            type_ko: "전시",
            desc_en: "Gwanggyo Galleria Dept. Store x N Art Gallery",
            desc_ko: "광교 갤러리아 백화점 x 앤 아트 갤러리",
            category: "project"
        },
        {
            id: "exh_11",
            year: "2020",
            title_en: "N Art Gallery Exhibition",
            title_ko: "앤 아트 갤러리 전시",
            type_en: "Group Exhibition",
            type_ko: "단체전",
            desc_en: "N Art Gallery, Seoul",
            desc_ko: "앤 아트 갤러리, 서울",
            category: "project"
        },
        {
            id: "exh_12",
            year: "2020",
            title_en: "Heart Signal Season 3",
            title_ko: "하트시그널 시즌 3 작품 설치",
            type_en: "Art Installation",
            type_ko: "미술 전시 및 협찬",
            desc_en: "Channel A Reality Show — Signal House Art Installation, Seoul",
            desc_ko: "채널A 예능 — 시그널 하우스 미술 작품 설치, 서울",
            category: "project"
        },
        {
            id: "exh_13",
            year: "2019",
            title_en: "Apgujeong Collage",
            title_ko: "압구정 꼴라주 2인전",
            type_en: "Two-Person Exhibition",
            type_ko: "2인전",
            desc_en: "In&Out Art (ex-Johnnie Walker Building), Seoul",
            desc_ko: "인앤아웃 아트 (구 조니워커 빌딩), 서울",
            category: "major"
        },
        {
            id: "exh_14",
            year: "2019",
            title_en: "AQUA Art Miami",
            title_ko: "아쿠아 아트 마이애미",
            type_en: "Art Fair",
            type_ko: "아트 페어",
            desc_en: "Miami Beach, USA",
            desc_ko: "마이애미 비치, 미국",
            category: "major"
        },
        {
            id: "exh_15",
            year: "2019",
            title_en: "NAPAL Collaboration",
            title_ko: "나팔(NAPAL) 콜라보레이션",
            type_en: "Collaboration",
            type_ko: "콜라보레이션",
            desc_en: "Art Speaker Collaboration, Seoul",
            desc_ko: "아트 스피커 콜라보레이션, 서울",
            category: "project"
        },
        {
            id: "exh_16",
            year: "2019",
            title_en: "T FESTA Myeongdong",
            title_ko: "T 페스타 명동 프로젝트",
            type_en: "Project Exhibition",
            type_ko: "프로젝트 전시",
            desc_en: "Myeongdong, Seoul",
            desc_ko: "명동, 서울",
            category: "project"
        },
        {
            id: "exh_17",
            year: "2019",
            title_en: "Vino Flower Collaboration",
            title_ko: "비노플라워 콜라보레이션 전시",
            type_en: "Exhibition",
            type_ko: "전시",
            desc_en: "Hannam / Seorae, Seoul",
            desc_ko: "한남 / 서래, 서울",
            category: "project"
        },
        {
            id: "exh_18",
            year: "2019",
            title_en: "Kill It — OCN Drama",
            title_ko: "OCN 드라마 '킬잇(Kill It)' 작품 설치",
            type_en: "Art Installation",
            type_ko: "드라마 미술 스폰서",
            desc_en: "OCN Drama set art installation, Seoul",
            desc_ko: "OCN 드라마 미술 설치 및 연출, 서울",
            category: "project"
        },
        {
            id: "exh_19",
            year: "2019",
            title_en: "LIFE IS FUN",
            title_ko: "개인전 'LIFE IS FUN'",
            type_en: "Solo Exhibition",
            type_ko: "개인전",
            desc_en: "Gallery Insa Art, Seoul",
            desc_ko: "갤러리 인사아트, 서울",
            category: "major"
        },
        {
            id: "exh_20",
            year: "2017",
            title_en: "時差適應 Two-Person Exhibition",
            title_ko: "시차적응 2인전",
            type_en: "Exhibition",
            type_ko: "2인전",
            desc_en: "Gallery WE, Seoul",
            desc_ko: "갤러리 위, 서울",
            category: "major"
        },
        {
            id: "exh_21",
            year: "2016",
            title_en: "SCOPE Miami Beach",
            title_ko: "스코프 마이애미 비치",
            type_en: "Art Fair",
            type_ko: "아트 페어",
            desc_en: "Miami Beach, USA",
            desc_ko: "마이애미 비치, 미국",
            category: "major"
        },
        {
            id: "exh_22",
            year: "2015",
            title_en: "HOME EQUUS",
            title_ko: "HOME EQUUS 2인전",
            type_en: "Two-Person Exhibition",
            type_ko: "2인전",
            desc_en: "ahsh Gallery, Heyri",
            desc_ko: "아쉬 갤러리, 헤이리",
            category: "major"
        },
        {
            id: "exh_23",
            year: "2015",
            title_en: "Drawing Exhibition",
            title_ko: "춘점추선 드로잉 그룹전",
            type_en: "Group Exhibition",
            type_ko: "단체 드로잉전",
            desc_en: "ahsh Gallery, Heyri",
            desc_ko: "아쉬 갤러리, 헤이리",
            category: "project"
        },
        {
            id: "exh_24",
            year: "2004",
            title_en: "Jeonju International Film Festival",
            title_ko: "전주국제영화제 JIFF MIND",
            type_en: "Screening",
            type_ko: "영화제 상영",
            desc_en: "JIFF MIND Special Screening: 'WITH ME'",
            desc_ko: "JIFF MIND 섹션 특별상영작: 'WITH ME'",
            category: "project"
        },
        {
            id: "exh_25",
            year: "2004",
            title_en: "RESFEST Digital Film Festival",
            title_ko: "레스페스트 디지털 영화제",
            type_en: "Film Festival",
            type_ko: "영화제 출품",
            desc_en: "RESFEST Seoul, Korea",
            desc_ko: "서울, 한국",
            category: "project"
        }
    ];

    let currentFilter = 'all';

    function renderExhibitions() {
        if (!archiveGrid) return;
        archiveGrid.innerHTML = '';

        const filtered = JUNGKING_EXHIBITIONS.filter(exh => {
            if (currentFilter === 'all') return true;
            return exh.category === currentFilter;
        });

        if (filtered.length === 0) {
            archiveGrid.innerHTML = '<div class="archive-empty">No exhibitions found.</div>';
            return;
        }

        filtered.forEach(exh => {
            const row = document.createElement('div');
            row.className = 'archive-row';
            row.setAttribute('data-category', exh.category);

            const categoryLabel = exh.category === 'major' ? 'Solo & Fairs' : 'Projects & Collabs';

            row.innerHTML = `
                <div class="archive-row-year">${exh.year}</div>
                <div class="archive-row-type-badge">
                    <span class="archive-row-type">${exh.type_en}</span>
                    <span class="archive-row-category-tag ${exh.category}">${categoryLabel}</span>
                </div>
                <div class="archive-row-detail">
                    <div class="archive-row-title-en">${exh.title_en}</div>
                    <div class="archive-row-title-ko">${exh.title_ko}</div>
                    <div class="archive-row-desc">${exh.desc_en}</div>
                    <div class="archive-row-desc-ko">${exh.desc_ko}</div>
                </div>
            `;
            archiveGrid.appendChild(row);
        });
    }

    if (toggleArchiveBtn && archiveContainer) {
        toggleArchiveBtn.addEventListener('click', () => {
            const isOpen = archiveContainer.classList.contains('open');
            if (isOpen) {
                archiveContainer.classList.remove('open');
                toggleArchiveBtn.classList.remove('active');
                toggleArchiveBtn.querySelector('.btn-text').textContent = 'EXPLORE FULL ARCHIVE (26 EXHIBITIONS)';
                toggleArchiveBtn.querySelector('.btn-icon')?.setAttribute('data-feather', 'plus');
            } else {
                archiveContainer.classList.add('open');
                toggleArchiveBtn.classList.add('active');
                toggleArchiveBtn.querySelector('.btn-text').textContent = 'COLLAPSE ARCHIVE';
                toggleArchiveBtn.querySelector('.btn-icon')?.setAttribute('data-feather', 'minus');

                if (archiveGrid && archiveGrid.children.length === 0) {
                    renderExhibitions();
                }
            }
            if (typeof feather !== 'undefined') feather.replace();
        });
    }

    archiveFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            archiveFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter') || 'all';
            renderExhibitions();
        });
    });

    // ==========================================
    // H. JUNGKING ARCHIVE PARTICLE ANIMATION ENGINE
    // ==========================================
    const canvas = document.getElementById('digitalCanvas');
    if (canvas) {
        const ctx    = canvas.getContext('2d');
        const mask    = document.createElement('canvas');
        const maskCtx = mask.getContext('2d');

        let width, height;
        const NUM = 1600;
        let particles = [];
        let targets   = [];
        let blend     = 0;
        let mouse = { x: null, y: null };
        let portraitReady = false;
        const portrait = new Image();

        // Helper to parse CSS color variables (supports hex, rgb, rgba)
        function parseColor(colorStr) {
            colorStr = colorStr.trim();
            if (colorStr.startsWith('rgb')) {
                const matches = colorStr.match(/\d+/g);
                if (matches && matches.length >= 3) {
                    return {
                        r: parseInt(matches[0], 10),
                        g: parseInt(matches[1], 10),
                        b: parseInt(matches[2], 10)
                    };
                }
            }
            const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            const hex = colorStr.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            if (result) {
                return {
                    r: parseInt(result[1], 16),
                    g: parseInt(result[2], 16),
                    b: parseInt(result[3], 16)
                };
            }
            return null;
        }

        // Fetch dynamic text-white theme color
        function getThemeColor() {
            const textWhite = getComputedStyle(document.documentElement).getPropertyValue('--text-white').trim();
            return parseColor(textWhite) || { r: 255, g: 255, b: 255 };
        }

        // State machine
        const STATES = {
            HOLD:    { duration: 300, next: 'SCATTER' },
            SCATTER: { duration: 180, next: 'FORM'    },
            FORM:    { duration: 240, next: 'HOLD'    },
        };
        let state = 'HOLD';
        let stateTimer = 0;

        function updateBlend() {
            stateTimer++;
            const s = STATES[state];
            const dur = s.duration;

            if (state === 'HOLD') {
                blend = 1;
            } else if (state === 'SCATTER') {
                const t = stateTimer / dur;
                blend = (1 - t) * (1 - t) * (1 - t);
            } else if (state === 'FORM') {
                const t = stateTimer / dur;
                blend = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            }

            if (stateTimer >= dur) {
                state = s.next;
                stateTimer = 0;
            }
        }

        portrait.onload = () => {
            portraitReady = true;
            if (width && height && buildMask()) { sampleTargets(); }
        };
        portrait.onerror = () => {
            console.error('BBX portrait particle source could not be loaded.');
        };
        portrait.src = window.BBX_PORTRAIT_DATA_URI || 'portrait.jpg';

        function getPortraitLayout() {
            const compact = width < 992;
            const phone = width < 600;
            const cropH = portrait.naturalHeight * 0.80;
            const cropW = portrait.naturalWidth;
            const cropAspect = cropW / cropH;
            const targetW = Math.min(width * (phone ? 1.42 : compact ? 1.10 : 0.92), compact ? 860 : 900);
            const targetH = height * (phone ? 0.82 : compact ? 0.92 : 0.82);

            let dw, dh;
            if (cropAspect > targetW / targetH) {
                dw = targetW;
                dh = dw / cropAspect;
            } else {
                dh = targetH;
                dw = dh * cropAspect;
            }

            const centerX = width * (compact ? 0.50 : 0.75);
            return {
                cropW,
                cropH,
                dw,
                dh,
                dx: centerX - dw / 2,
                dy: compact ? height * (phone ? 0.25 : 0.18) : (height - dh) / 2 - height * 0.05
            };
        }

        function buildMask() {
            try {
                mask.width  = width;
                mask.height = height;
                maskCtx.clearRect(0, 0, width, height);
                maskCtx.fillStyle = '#000';
                maskCtx.fillRect(0, 0, width, height);

                const compact = width < 992;
                const { cropW, cropH, dw, dh, dx, dy } = getPortraitLayout();

                maskCtx.drawImage(portrait, 0, 0, cropW, cropH, dx, dy, dw, dh);

                const imageData = maskCtx.getImageData(0, 0, width, height);
                const d = imageData.data;
                for (let i = 0; i < d.length; i += 4) {
                    const pixel = i / 4;
                    const x = pixel % width;
                    const y = Math.floor(pixel / width);
                    const lum = d[i] * 0.299 + d[i+1] * 0.587 + d[i+2] * 0.114;
                    let maskedLum = lum;

                    if (compact && x >= dx && x <= dx + dw && y >= dy && y <= dy + dh) {
                        const nx = (x - dx) / dw;
                        const ny = (y - dy) / dh;
                        const edgeX = Math.min(nx, 1 - nx);
                        const edgeY = Math.min(ny, 1 - ny);
                        const featherX = Math.max(0, Math.min(1, edgeX / 0.13));
                        const featherTop = Math.max(0, Math.min(1, edgeY / 0.11));
                        const featherBottom = Math.max(0, Math.min(1, (1 - ny) / 0.18));
                        maskedLum *= featherX * featherTop * featherBottom;
                    }

                    d[i] = d[i+1] = d[i+2] = maskedLum;
                }
                maskCtx.putImageData(imageData, 0, 0);

                const edgeData = maskCtx.getImageData(0, 0, width, height);
                const src = imageData.data;
                const dst = edgeData.data;
                const w = width, h2 = height;

                for (let y = 1; y < h2 - 1; y++) {
                    for (let x = 1; x < w - 1; x++) {
                        const idx = (y * w + x) * 4;
                        const tl = src[((y-1)*w + (x-1))*4];
                        const t  = src[((y-1)*w + x)*4];
                        const tr = src[((y-1)*w + (x+1))*4];
                        const l  = src[(y*w + (x-1))*4];
                        const r  = src[(y*w + (x+1))*4];
                        const bl = src[((y+1)*w + (x-1))*4];
                        const b  = src[((y+1)*w + x)*4];
                        const br2 = src[((y+1)*w + (x+1))*4];

                        const gx = -tl - 2*l - bl + tr + 2*r + br2;
                        const gy = -tl - 2*t - tr + bl + 2*b + br2;
                        const edge = Math.sqrt(gx*gx + gy*gy);

                        const orig = src[idx];
                        const combined = Math.min(255, orig + edge * 0.7);
                        dst[idx] = dst[idx+1] = dst[idx+2] = combined;
                    }
                }
                maskCtx.putImageData(edgeData, 0, 0);
                return true;
            } catch (error) {
                portraitReady = false;
                console.error('BBX portrait particle mask failed:', error);
                return false;
            }
        }

        function sampleTargets() {
            const data = maskCtx.getImageData(0, 0, mask.width, mask.height).data;
            const brights = [];
            const step = 2;
            for (let y = 0; y < mask.height; y += step) {
                for (let x = 0; x < mask.width; x += step) {
                    const i = (y * mask.width + x) * 4;
                    if (data[i] > 20) {
                        brights.push({ x, y, brightness: data[i] / 255 });
                    }
                }
            }

            if (brights.length === 0) {
                brights.push({ x: width/2, y: height/2, brightness: 0.5 });
            }

            brights.sort((a, b) => b.brightness - a.brightness);
            const pool = brights.slice(0, Math.min(brights.length, NUM * 5));

            const mainCount = NUM - 60;
            targets = [];
            for (let k = 0; k < mainCount; k++) {
                const p = pool[Math.floor(Math.random() * pool.length)];
                targets.push({
                    x: p.x + (Math.random() - 0.5) * 2,
                    y: p.y + (Math.random() - 0.5) * 2,
                    brightness: p.brightness
                });
            }

            const { dw, dh, dx, dy } = getPortraitLayout();

            const glassY1 = dy + dh * 0.32;
            const glassY2 = dy + dh * 0.38;
            const leftX1  = dx + dw * 0.28;
            const leftX2  = dx + dw * 0.46;
            const rightX1 = dx + dw * 0.54;
            const rightX2 = dx + dw * 0.72;

            for (let k = 0; k < 30; k++) {
                targets.push({
                    x: leftX1 + Math.random() * (leftX2 - leftX1),
                    y: glassY1 + Math.random() * (glassY2 - glassY1),
                    brightness: 0.15 + Math.random() * 0.1
                });
                targets.push({
                    x: rightX1 + Math.random() * (rightX2 - rightX1),
                    y: glassY1 + Math.random() * (glassY2 - glassY1),
                    brightness: 0.15 + Math.random() * 0.1
                });
            }
        }

        class Particle {
            constructor(idx) {
                this.idx = idx;
                this.wx = Math.random() * (width  || 600);
                this.wy = Math.random() * (height || 400);
                const sp = Math.random() * 0.06 + 0.015;
                const an = Math.random() * Math.PI * 2;
                this.vx = Math.cos(an) * sp;
                this.vy = Math.sin(an) * sp;
                this.w1 = { p: Math.random() * Math.PI * 2, f: Math.random() * 0.005 + 0.002, a: Math.random() * 0.06 + 0.02 };
                this.w2 = { p: Math.random() * Math.PI * 2, f: Math.random() * 0.003 + 0.001, a: Math.random() * 0.04 + 0.01 };
                this.baseSize = Math.random() * 0.8 + 0.35;
                this.pp = Math.random() * Math.PI * 2;
                this.ps = Math.random() * 0.007 + 0.002;
            }

            wander() {
                this.w1.p += this.w1.f;
                this.w2.p += this.w2.f;
                this.wx += this.vx + Math.sin(this.w1.p) * this.w1.a + Math.cos(this.w2.p) * this.w2.a * 0.5;
                this.wy += this.vy + Math.cos(this.w1.p) * this.w1.a + Math.sin(this.w2.p) * this.w2.a * 0.5;
                if (this.wx < -10) this.wx = width + 10;
                if (this.wx > width + 10) this.wx = -10;
                if (this.wy < -10) this.wy = height + 10;
                if (this.wy > height + 10) this.wy = -10;

                if (mouse.x !== null) {
                    const dx = mouse.x - this.wx, dy = mouse.y - this.wy;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    if (d < 120 && d > 0) {
                        const f = (120 - d) / 120 * 0.002;
                        this.vx += (dx / d) * f; this.vy += (dy / d) * f;
                        this.vx *= 0.98; this.vy *= 0.98;
                    }
                }
            }

            pos() {
                const t = targets[this.idx] || { x: this.wx, y: this.wy };
                const jitterX = Math.sin(this.pp * 40 + this.idx) * 1.5 * blend;
                const jitterY = Math.cos(this.pp * 35 + this.idx) * 1.5 * blend;
                return {
                    x: this.wx + (t.x + jitterX - this.wx) * blend,
                    y: this.wy + (t.y + jitterY - this.wy) * blend
                };
            }

            draw(color) {
                this.pp += this.ps;
                const { x, y } = this.pos();
                const tgt = targets[this.idx];
                const br = tgt ? tgt.brightness : 0.5;
                const baseOpacity = 0.22 + blend * (0.15 + br * 0.5);
                const size = this.baseSize + Math.sin(this.pp) * 0.15;
                ctx.beginPath();
                ctx.arc(x, y, Math.max(0.3, size), 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},${Math.min(1, baseOpacity)})`;
                ctx.fill();
            }
        }

        canvas.addEventListener('mousemove', (e) => {
            const r = canvas.getBoundingClientRect();
            mouse.x = (e.clientX >= r.left && e.clientX <= r.right)  ? e.clientX - r.left : null;
            mouse.y = (e.clientY >= r.top  && e.clientY <= r.bottom) ? e.clientY - r.top  : null;
        });
        canvas.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

        const BG_NUM = 200;
        let bgParticles = [];

        class BgParticle {
            constructor() {
                this.x = Math.random() * (width || 800);
                this.y = Math.random() * (height || 500);
                const sp = Math.random() * 0.04 + 0.01;
                const an = Math.random() * Math.PI * 2;
                this.vx = Math.cos(an) * sp;
                this.vy = Math.sin(an) * sp;
                this.w1 = { p: Math.random() * Math.PI * 2, f: Math.random() * 0.003 + 0.001, a: Math.random() * 0.04 + 0.01 };
                this.size = Math.random() * 0.45 + 0.2;
                this.pp = Math.random() * Math.PI * 2;
                this.ps = Math.random() * 0.005 + 0.001;
            }

            update() {
                this.w1.p += this.w1.f;
                this.x += this.vx + Math.sin(this.w1.p) * this.w1.a;
                this.y += this.vy + Math.cos(this.w1.p) * this.w1.a;
                if (this.x < -10) this.x = width + 10;
                if (this.x > width + 10) this.x = -10;
                if (this.y < -10) this.y = height + 10;
                if (this.y > height + 10) this.y = -10;
            }

            draw(color) {
                this.pp += this.ps;
                const size = this.size + Math.sin(this.pp) * 0.1;
                ctx.beginPath();
                ctx.arc(this.x, this.y, Math.max(0.2, size), 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},0.18)`;
                ctx.fill();
            }
        }

        let lastWidth = 0, lastHeight = 0;
        function resize() {
            const parent = canvas.parentElement;
            const newWidth  = parent.clientWidth || window.innerWidth;
            let newHeight = parent.clientHeight || 750;

            if (Math.abs(newWidth - lastWidth) < 8 && Math.abs(newHeight - lastHeight) < 50) {
                return;
            }

            width = newWidth;
            height = newHeight;
            lastWidth = width;
            lastHeight = height;

            canvas.width  = width;
            canvas.height = height;
            if (portraitReady && buildMask()) { sampleTargets(); }

            if (particles.length === 0) {
                particles = Array.from({ length: NUM }, (_, i) => new Particle(i));
            } else {
                particles.forEach(p => {
                    if (p.wx > width) p.wx = Math.random() * width;
                    if (p.wy > height) p.wy = Math.random() * height;
                });
            }

            if (bgParticles.length === 0) {
                bgParticles = Array.from({ length: BG_NUM }, () => new BgParticle());
            } else {
                bgParticles.forEach(p => {
                    if (p.x > width) p.x = Math.random() * width;
                    if (p.y > height) p.y = Math.random() * height;
                });
            }
        }
        window.addEventListener('resize', resize);

        function animate() {
            ctx.clearRect(0, 0, width, height);
            updateBlend();

            const activeColor = getThemeColor();

            particles.forEach(p => p.wander());
            bgParticles.forEach(p => p.update());

            const bgLineDist = 60;
            for (let i = 0; i < BG_NUM; i++) {
                for (let j = i + 1; j < BG_NUM; j++) {
                    const dx = bgParticles[i].x - bgParticles[j].x;
                    const dy = bgParticles[i].y - bgParticles[j].y;
                    const d2 = dx * dx + dy * dy;
                    if (d2 < bgLineDist * bgLineDist) {
                        const d = Math.sqrt(d2);
                        const opacity = (1 - d / bgLineDist) * 0.06;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(${activeColor.r},${activeColor.g},${activeColor.b},${opacity})`;
                        ctx.lineWidth = 0.25;
                        ctx.moveTo(bgParticles[i].x, bgParticles[i].y);
                        ctx.lineTo(bgParticles[j].x, bgParticles[j].y);
                        ctx.stroke();
                    }
                }
            }

            bgParticles.forEach(p => p.draw(activeColor));

            if (blend < 0.5) {
                const lineDist = 50;
                const positions = particles.map(p => p.pos());
                for (let i = 0; i < NUM; i++) {
                    for (let j = i + 1; j < NUM; j++) {
                        const dx = positions[i].x - positions[j].x;
                        const dy = positions[i].y - positions[j].y;
                        const d2 = dx * dx + dy * dy;
                        if (d2 < lineDist * lineDist) {
                            const d = Math.sqrt(d2);
                            const opacity = (1 - d / lineDist) * 0.07 * (1 - blend * 2);
                            ctx.beginPath();
                            ctx.strokeStyle = `rgba(${activeColor.r},${activeColor.g},${activeColor.b},${opacity})`;
                            ctx.lineWidth = 0.3;
                            ctx.moveTo(positions[i].x, positions[i].y);
                            ctx.lineTo(positions[j].x, positions[j].y);
                            ctx.stroke();
                        }
                    }
                }
            }

            particles.forEach(p => p.draw(activeColor));
            requestAnimationFrame(animate);
        }

        function init() {
            resize();
            animate();
        }

        if (document.readyState === 'complete') {
            init();
        } else {
            window.addEventListener('load', init);
        }
    }

    // ==========================================================================
    // 5. OFFICIAL AUDIO PREVIEW PLAYER LOGIC
    // ==========================================================================
    const previewBtns = document.querySelectorAll('.am-track-number-play');
    const globalAudioPlayer = document.getElementById('global-preview-player');
    let currentPreviewPlaying = null;

    if (previewBtns.length > 0 && globalAudioPlayer) {
        previewBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const src = this.getAttribute('data-src');
                
                // If this is already playing, pause it
                if (this.classList.contains('playing')) {
                    globalAudioPlayer.pause();
                    this.classList.remove('playing');
                    currentPreviewPlaying = null;
                    return;
                }

                // Reset all buttons
                previewBtns.forEach(b => {
                    b.classList.remove('playing');
                });

                // Play the new track
                globalAudioPlayer.src = src;
                globalAudioPlayer.play().catch(err => {
                    console.warn("Audio playback issue (missing file):", err);
                    alert("Audio file is not yet available on the server. Please try again later.");
                });

                this.classList.add('playing');
                currentPreviewPlaying = this;
            });
        });

        // Limit preview to 40 seconds
        globalAudioPlayer.addEventListener('timeupdate', function() {
            if (this.currentTime >= 40) {
                this.pause();
                this.currentTime = 0;
                if (currentPreviewPlaying) {
                    currentPreviewPlaying.classList.remove('playing');
                    currentPreviewPlaying = null;
                }
            }
        });

        // Reset button when audio ends naturally
        globalAudioPlayer.addEventListener('ended', function() {
            if (currentPreviewPlaying) {
                currentPreviewPlaying.classList.remove('playing');
                currentPreviewPlaying = null;
            }
        });
    }
});

/* ==========================================================================
   BAD BROTHERS X — NATIVE INTERACTION LOGIC (app.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Feather Icons
    if (typeof feather !== 'undefined') {
        feather.replace();
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
                // Formspree endpoint — replace 'xpwzanpy' with your actual Formspree form ID
                const response = await fetch('https://formspree.io/f/xpwzanpy', {
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
    // C. CONCEPT SHOP SHOPPING MODAL ACTIVATE
    // ==========================================
    const shopModal = document.getElementById('shop-modal');
    const buyButtons = document.querySelectorAll('.shop-buy-btn');
    const closeModalBtn = document.getElementById('btn-close-modal');

    buyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (shopModal) {
                shopModal.style.display = 'flex';
            }
        });
    });

    closeModalBtn?.addEventListener('click', () => {
        if (shopModal) {
            shopModal.style.display = 'none';
        }
    });

    // Close modal on overlay click
    shopModal?.addEventListener('click', (e) => {
        if (e.target === shopModal) {
            shopModal.style.display = 'none';
        }
    });

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
});



document.addEventListener('DOMContentLoaded', () => {
    const manifest = window.archiveManifestData;
    const list = document.getElementById('jungking-archive-list');
    const filters = Array.from(document.querySelectorAll('.jk-archive-filter'));

    if (!manifest || !list) return;

    const metadata = {
        '00_2026 Bad Brothers X': ['2026', '2026 BAD BROTHERS X', 'Global IP & AI Production', 'JUNGKINGX persona and the independent BAD BROTHERS X virtual art universe.', 'project'],
        '01_2025 2인전, 갤러리오로라': ['2025', 'JUNGKING X RENASON', 'Two-Person Exhibition', 'Gallery Aurora, Seoul and Yangsan.', 'major'],
        '02_2024 인천아트쇼,갤러리 위': ['2024', 'Incheon Art Show', 'Art Fair', 'Gallery WE, Incheon.', 'major'],
        '03_2024 개인전(초대전), 갤러리 위': ['2024', 'March on, LIFE IS FUN', 'Solo Exhibition', 'Gallery WE, Seoul. Character X explores the infinite universe of life.', 'major'],
        '04_2024 화랑미술제 in 수원, 갤러리 위': ['2024', 'Galleries Art Fair in Suwon', 'Art Fair', 'Presented with Gallery WE.', 'major'],
        '05_2024 라이브페인팅 특별부스, 갤러리위': ['2024', 'Live Painting Special Booth', 'Performance', 'Live painting performance at Galleries Art Fair in Suwon.', 'project'],
        '06_2023 Collabo Collage Gallery,2인전,울산': ['2023', 'Collage Gallery', 'Two-Person Exhibition', 'Two-person exhibition in Ulsan, Korea.', 'project'],
        '07_2021 ARTJEJU , 갤러리 4번가, 제주': ['2021', 'ARTJEJU', 'Art Fair', 'Gallery 4th Street, Jeju.', 'major'],
        '08_2020 URBAN BREAK Art Asia, 코엑스': ['2020', 'URBAN BREAK Art Asia', 'Art Fair', 'N Art Gallery, COEX, Seoul.', 'major'],
        '09_2020 CARNIVAL, 아쉬갤러리': ['2020', 'CARNIVAL Altamira', 'Group Exhibition', 'ahsh Gallery, Heyri.', 'project'],
        '10_2020 광교 갤러리아백화점 VIP ROOM(앤아트갤러리)': ['2020', 'VIP ROOM Exhibition', 'Exhibition', 'Gwanggyo Galleria Department Store with N Art Gallery.', 'project'],
        '11_2020 앤아트갤러리': ['2020', 'N Art Gallery Solo Exhibition', 'Solo Exhibition', 'N Art Gallery, Seoul.', 'project'],
        '12_2020 하트시그널 채널A 작품설치': ['2020', 'Heart Signal Season 3 Installation', 'TV Collaboration', 'Artwork installation for Channel A television sets in Seoul.', 'project'],
        '13_2019압구정꼴라주 2인전 구)조니워커빌딩': ['2019', 'Apgujeong Collage', 'Two-Person Exhibition', 'Former Johnnie Walker House, Seoul.', 'major'],
        '14_2019 마이애미 AQUA , 미국': ['2019', 'AQUA Art Miami', 'Art Fair', 'Miami Beach, USA.', 'major'],
        '15_2019 Collabo NAPAL': ['2019', 'NAPAL Speaker Collaboration', 'Collaboration', 'Art and sound collaboration with NAPAL in Seoul.', 'project'],
        '16_2019 T festa 명동, project': ['2019', 'T-Festa Myeongdong', 'Public Art Festival', 'Myeongdong, Seoul.', 'project'],
        '17_2019 콜라보전시 X 비노플라워 한남.서래': ['2019', 'Vino Flower Collaboration', 'Collaboration Exhibition', 'Hannam and Seorae, Seoul.', 'project'],
        '18_2019 OCN Drama _Kill it_ 작품설치': ['2019', "OCN Drama 'Kill It' Installation", 'TV Collaboration', 'Artwork installation for the OCN drama production.', 'project'],
        '19_2019갤러리인사아트 개인전': ['2019', 'LIFE IS FUN', 'Solo Exhibition', 'Gallery Insa Art, Seoul.', 'major'],
        '20_2017 2인전 時差適應 갤러리 위': ['2017', 'Jet Lag', 'Two-Person Exhibition', 'Gallery WE, Seoul.', 'major'],
        '21_2016 SCOPE 마이애미': ['2016', 'SCOPE Miami Beach', 'Art Fair', 'Miami Beach, USA.', 'major'],
        '22_2015 2인전 HOME EQUUS ahsh 갤러리': ['2015', 'HOME EQUUS', 'Two-Person Exhibition', 'ahsh Gallery, Heyri.', 'major'],
        '23_2015 춘점추선 드로잉전 그룹 ahsh 갤러리': ['2015', 'Drawing Group Exhibition', 'Group Exhibition', 'ahsh Gallery, Heyri.', 'project'],
        '24_2004 전주국제영화제 지프마인드 ‘WITH ME“': ['2004', 'Jeonju International Film Festival', 'Special Screening', "JIFF MIND special screening of 'WITH ME'.", 'project'],
        '25_2004 RESFEST 영화제 서울': ['2004', 'RESFEST Digital Film Festival', 'Film Festival', 'RESFEST Seoul, Korea.', 'project']
    };

    const hasKorean = (text) => /[\u3131-\uD79D]/.test(text);
    const encodePath = (folder, file) =>
        `jungking-archive/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`;

    const exhibitions = manifest.exhibitions
        .filter((entry) => metadata[entry.folder])
        .map((entry, index) => {
            const [year, title, type, description, category] = metadata[entry.folder];
            const paragraphs = (entry.paragraphs || [])
                .filter((paragraph) => paragraph.trim().length > 2 && !hasKorean(paragraph));
            return {
                index,
                year,
                title,
                type,
                description,
                category,
                paragraphs,
                images: (entry.actualFiles || []).map((file) => encodePath(entry.folder, file))
            };
        });

    let activeFilter = 'all';

    const setToggleIcon = (row, iconName) => {
        const iconHolder = row.querySelector('.jk-archive-open');
        if (!iconHolder) return;
        iconHolder.innerHTML = `<i data-feather="${iconName}"></i>`;
    };

    const render = () => {
        const visible = exhibitions.filter((item) =>
            activeFilter === 'all' || item.category === activeFilter
        );

        list.innerHTML = '';
        visible.forEach((item) => {
            const wrapper = document.createElement('article');
            wrapper.className = 'jk-archive-item';
            wrapper.dataset.index = String(item.index);

            const row = document.createElement('button');
            row.type = 'button';
            row.className = 'jk-archive-row';
            row.setAttribute('aria-expanded', 'false');
            row.setAttribute('aria-controls', `archive-detail-${item.index}`);
            row.setAttribute('aria-label', `Show ${item.title} exhibition details`);
            row.innerHTML = `
                <span class="jk-archive-year">${item.year}</span>
                <span class="jk-archive-badges">
                    <span class="jk-archive-type">${item.type}</span>
                    <span class="jk-archive-category ${item.category}">
                        ${item.category === 'major' ? 'Solo & Fairs' : 'Projects & Collabs'}
                    </span>
                </span>
                <span class="jk-archive-content">
                    <span class="jk-archive-title">${item.title}</span>
                    <span class="jk-archive-description">${item.description}</span>
                </span>
                <span class="jk-archive-open" aria-hidden="true"><i data-feather="plus"></i></span>
            `;

            const detail = document.createElement('div');
            detail.id = `archive-detail-${item.index}`;
            detail.className = 'jk-archive-detail';
            detail.hidden = true;

            row.addEventListener('click', () => toggleItem(item, wrapper, row, detail));
            wrapper.append(row, detail);
            list.appendChild(wrapper);
        });

        if (typeof feather !== 'undefined') feather.replace();
    };

    const buildDetail = (item, detail) => {
        if (detail.dataset.ready === 'true') return;

        const copy = document.createElement('div');
        copy.className = 'jk-archive-detail-copy';

        const label = document.createElement('span');
        label.className = 'jk-archive-detail-label';
        label.textContent = 'EXHIBITION DETAILS';
        copy.appendChild(label);

        const location = document.createElement('p');
        location.className = 'jk-archive-detail-location';
        location.textContent = item.description;
        copy.appendChild(location);

        item.paragraphs.forEach((paragraph) => {
            const paragraphElement = document.createElement('p');
            paragraphElement.textContent = paragraph;
            copy.appendChild(paragraphElement);
        });

        detail.appendChild(copy);

        if (item.images.length > 0) {
            const galleryHeader = document.createElement('div');
            galleryHeader.className = 'jk-archive-gallery-header';
            galleryHeader.innerHTML = `
                <span>${String(item.images.length).padStart(2, '0')} EXHIBITION IMAGES</span>
                <span>USE ARROWS OR SWIPE</span>
            `;

            const gallery = document.createElement('div');
            gallery.className = 'jk-archive-gallery';
            gallery.setAttribute('aria-label', `${item.title} exhibition images`);
            gallery.setAttribute('tabindex', '0');
            item.images.forEach((src, imageIndex) => {
                const figure = document.createElement('figure');
                figure.className = 'jk-archive-image';
                figure.innerHTML = `
                    <img src="${src}" loading="lazy"
                         alt="${item.title} exhibition view ${imageIndex + 1}">
                    <figcaption>${String(imageIndex + 1).padStart(2, '0')} / ${String(item.images.length).padStart(2, '0')}</figcaption>
                `;
                gallery.appendChild(figure);
            });

            const controls = document.createElement('div');
            controls.className = 'jk-archive-gallery-controls';
            controls.innerHTML = `
                <span class="jk-archive-gallery-count" aria-live="polite">
                    <strong>01</strong> / ${String(item.images.length).padStart(2, '0')}
                </span>
                <button type="button" class="jk-archive-gallery-button previous"
                        aria-label="Previous exhibition image" disabled>
                    <i data-feather="arrow-left"></i>
                </button>
                <button type="button" class="jk-archive-gallery-button next"
                        aria-label="Next exhibition image">
                    <i data-feather="arrow-right"></i>
                </button>
            `;

            const figures = Array.from(gallery.children);
            const previousButton = controls.querySelector('.previous');
            const nextButton = controls.querySelector('.next');
            const currentCount = controls.querySelector('.jk-archive-gallery-count strong');
            let currentImage = 0;
            let scrollFrame = null;

            const updateControls = (index) => {
                currentImage = Math.max(0, Math.min(index, figures.length - 1));
                currentCount.textContent = String(currentImage + 1).padStart(2, '0');
                previousButton.disabled = currentImage === 0;
                nextButton.disabled = currentImage === figures.length - 1;
            };

            const showImage = (index) => {
                const targetIndex = Math.max(0, Math.min(index, figures.length - 1));
                const target = figures[targetIndex];
                gallery.scrollTo({
                    left: target.offsetLeft - gallery.offsetLeft,
                    behavior: 'smooth'
                });
                updateControls(targetIndex);
            };

            previousButton.addEventListener('click', () => showImage(currentImage - 1));
            nextButton.addEventListener('click', () => showImage(currentImage + 1));
            gallery.addEventListener('keydown', (event) => {
                if (event.key === 'ArrowLeft') {
                    event.preventDefault();
                    showImage(currentImage - 1);
                }
                if (event.key === 'ArrowRight') {
                    event.preventDefault();
                    showImage(currentImage + 1);
                }
            });
            gallery.addEventListener('scroll', () => {
                if (scrollFrame) cancelAnimationFrame(scrollFrame);
                scrollFrame = requestAnimationFrame(() => {
                    const galleryLeft = gallery.getBoundingClientRect().left;
                    const nearestIndex = figures.reduce((nearest, figure, index) => {
                        const distance = Math.abs(figure.getBoundingClientRect().left - galleryLeft);
                        return distance < nearest.distance ? { index, distance } : nearest;
                    }, { index: 0, distance: Infinity }).index;
                    updateControls(nearestIndex);
                });
            }, { passive: true });

            gallery.addEventListener('wheel', (event) => {
                if (Math.abs(event.deltaY) > Math.abs(event.deltaX) && gallery.scrollWidth > gallery.clientWidth) {
                    event.preventDefault();
                    gallery.scrollLeft += event.deltaY;
                }
            }, { passive: false });

            detail.append(galleryHeader, gallery, controls);
            if (typeof feather !== 'undefined') feather.replace();
        } else {
            const empty = document.createElement('p');
            empty.className = 'archive-empty';
            empty.textContent = 'No exhibition images available.';
            detail.appendChild(empty);
        }

        detail.dataset.ready = 'true';
    };

    const collapseItem = (wrapper) => {
        if (!wrapper) return;
        const row = wrapper.querySelector('.jk-archive-row');
        const detail = wrapper.querySelector('.jk-archive-detail');
        wrapper.classList.remove('expanded');
        row.setAttribute('aria-expanded', 'false');
        row.setAttribute('aria-label', row.getAttribute('aria-label').replace('Hide', 'Show'));
        detail.hidden = true;
        setToggleIcon(row, 'plus');
    };

    const toggleItem = (item, wrapper, row, detail) => {
        const isOpen = wrapper.classList.contains('expanded');
        const currentOpen = list.querySelector('.jk-archive-item.expanded');

        if (currentOpen && currentOpen !== wrapper) collapseItem(currentOpen);

        if (isOpen) {
            collapseItem(wrapper);
        } else {
            buildDetail(item, detail);
            wrapper.classList.add('expanded');
            row.setAttribute('aria-expanded', 'true');
            row.setAttribute('aria-label', `Hide ${item.title} exhibition details`);
            detail.hidden = false;
            setToggleIcon(row, 'minus');
        }

        if (typeof feather !== 'undefined') feather.replace();
    };

    filters.forEach((button) => {
        button.addEventListener('click', () => {
            filters.forEach((item) => item.classList.remove('active'));
            button.classList.add('active');
            activeFilter = button.dataset.filter || 'all';
            render();
        });
    });

    render();
});

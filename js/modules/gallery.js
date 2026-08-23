/**
 * Photography & Videography Dynamic Gallery Loader & Accessible Lightbox
 */

export async function initGallery() {
    const gallery = document.getElementById('visuals-gallery');
    if (!gallery) return;

    const owner = gallery.dataset.githubOwner || 'pramishpy';
    const repo = gallery.dataset.githubRepo || 'pramishpy.github.io';
    const path = gallery.dataset.githubPath || 'images/visuals';
    const ref = gallery.dataset.githubRef || 'main';

    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${encodeURIComponent(ref)}`;
    const imageExtensions = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif']);
    const videoExtensions = new Set(['mp4', 'webm', 'mov']);

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Gallery fetch status ${response.status}`);

        const files = await response.json();
        if (!Array.isArray(files)) throw new Error('Invalid gallery response payload');

        const mediaFiles = files
            .filter(f => f.type === 'file')
            .map(file => {
                const ext = (file.name.split('.').pop() || '').toLowerCase();
                if (imageExtensions.has(ext)) return { ...file, mediaType: 'image', ext };
                if (videoExtensions.has(ext)) return { ...file, mediaType: 'video', ext };
                return null;
            })
            .filter(Boolean)
            .sort((a, b) => b.name.localeCompare(a.name, undefined, { numeric: true }))
            .slice(0, 12); // Limit to top 12 featured visuals for optimal performance

        gallery.innerHTML = '';

        if (mediaFiles.length === 0) {
            gallery.innerHTML = '<p class="visuals-gallery-loading">No visuals found.</p>';
            return;
        }

        mediaFiles.forEach((file, index) => {
            const figure = document.createElement('figure');
            figure.className = 'media-item reveal';
            figure.dataset.index = index;

            if (file.mediaType === 'image') {
                const img = document.createElement('img');
                img.src = `images/visuals/${encodeURIComponent(file.name)}`;
                img.alt = `Pramish Visual Media sample ${index + 1}`;
                img.loading = 'lazy';
                figure.appendChild(img);
            } else {
                const video = document.createElement('video');
                video.controls = true;
                video.preload = 'metadata';
                const source = document.createElement('source');
                source.src = `images/visuals/${encodeURIComponent(file.name)}`;
                source.type = file.ext === 'mov' ? 'video/quicktime' : `video/${file.ext}`;
                video.appendChild(source);
                figure.appendChild(video);
            }

            gallery.appendChild(figure);
        });

        initLightbox();
    } catch (err) {
        // Fallback gracefully without breaking page layout
        gallery.innerHTML = `
            <p class="visuals-gallery-loading">
                <i class="fab fa-instagram"></i> Explore curated visual stories on Instagram: 
                <a href="https://instagram.com/ppy_stash" target="_blank" style="color:var(--accent-indigo); text-decoration:underline;">@ppy_stash</a>
            </p>
        `;
    }
}

function initLightbox() {
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    const images = Array.from(document.querySelectorAll('.visuals-gallery .media-item img'));

    if (!lightbox || !lightboxImg || images.length === 0) return;

    let currentIndex = 0;

    function showImage(index) {
        currentIndex = (index + images.length) % images.length;
        const targetImg = images[currentIndex];
        lightboxImg.src = targetImg.src;
        lightboxImg.alt = targetImg.alt;
    }

    function openLightbox(index) {
        showImage(index);
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.classList.add('drawer-open');
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('drawer-open');
        lightboxImg.src = '';
    }

    images.forEach((img, idx) => {
        img.addEventListener('click', () => openLightbox(idx));
    });

    closeBtn?.addEventListener('click', closeLightbox);
    prevBtn?.addEventListener('click', () => showImage(currentIndex - 1));
    nextBtn?.addEventListener('click', () => showImage(currentIndex + 1));

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
        if (e.key === 'ArrowRight') showImage(currentIndex + 1);
    });
}

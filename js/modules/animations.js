/**
 * Scroll Reveal Animations & Number Counter Hooks
 */

// Shared across initAnimations() and any later dynamically-injected content
// (e.g. the visuals gallery, which loads asynchronously after initAnimations runs).
let sharedRevealObserver = null;
let reducedMotionCached = false;

/**
 * Registers one or more elements with the shared scroll-reveal system.
 * Safe to call at any time, including after initAnimations() has already run,
 * so dynamically-added .reveal elements (e.g. gallery items) still animate in.
 */
export function observeReveal(elements) {
    const els = elements instanceof NodeList || Array.isArray(elements) ? elements : [elements];
    if (!els || els.length === 0) return;

    if (reducedMotionCached) {
        els.forEach(el => el.classList.add('active'));
        return;
    }

    if (!sharedRevealObserver) {
        sharedRevealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });
    }

    els.forEach(el => sharedRevealObserver.observe(el));
}

export function initAnimations() {
    reducedMotionCached = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // IntersectionObserver for elements with .reveal
    const revealElements = document.querySelectorAll('.reveal');
    observeReveal(revealElements);

    // Number Counter Animation for Metric Cards
    const counterElements = document.querySelectorAll('.metric-number[data-target]');

    if (counterElements.length > 0) {
        if (reducedMotionCached) {
            counterElements.forEach(el => {
                const target = el.getAttribute('data-target');
                const suffix = el.getAttribute('data-suffix') || '';
                const prefix = el.getAttribute('data-prefix') || '';
                el.textContent = `${prefix}${target}${suffix}`;
            });
        } else {
            const counterObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            counterElements.forEach(el => counterObserver.observe(el));
        }
    }

    function animateCounter(el) {
        const targetStr = el.getAttribute('data-target') || '0';
        const suffix = el.getAttribute('data-suffix') || '';
        const prefix = el.getAttribute('data-prefix') || '';
        const isFloat = targetStr.includes('.');
        const target = parseFloat(targetStr);
        
        const duration = 1400; // ms
        const startTime = performance.now();

        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = target * easeOutProgress;

            if (isFloat) {
                el.textContent = `${prefix}${currentVal.toFixed(1)}${suffix}`;
            } else {
                el.textContent = `${prefix}${Math.floor(currentVal).toLocaleString()}${suffix}`;
            }

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                if (isFloat) {
                    el.textContent = `${prefix}${target.toFixed(1)}${suffix}`;
                } else {
                    el.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
                }
            }
        }

        requestAnimationFrame(updateNumber);
    }
}

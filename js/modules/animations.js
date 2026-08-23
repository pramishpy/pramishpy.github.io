/**
 * Scroll Reveal Animations & Number Counter Hooks
 */

export function initAnimations() {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // IntersectionObserver for elements with .reveal
    const revealElements = document.querySelectorAll('.reveal');
    
    if (revealElements.length > 0) {
        if (isReducedMotion) {
            revealElements.forEach(el => el.classList.add('active'));
        } else {
            const revealObserver = new IntersectionObserver((entries, observer) => {
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

            revealElements.forEach(el => revealObserver.observe(el));
        }
    }

    // Number Counter Animation for Metric Cards
    const counterElements = document.querySelectorAll('.metric-number[data-target]');

    if (counterElements.length > 0) {
        if (isReducedMotion) {
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

/**
 * Zero-Flash Dark / Light Theme Switcher
 */

const STORAGE_KEY = 'portfolio-theme';

export function initTheme() {
    const toggleBtn = document.getElementById('theme-toggle');
    const mobileToggleBtn = document.getElementById('mobile-theme-toggle');
    const root = document.documentElement;

    function getCurrentTheme() {
        return root.getAttribute('data-theme') || 'dark';
    }

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        updateToggleIcons(theme);
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch (e) {
            // Defensive storage handling
        }
    }

    function updateToggleIcons(theme) {
        const icons = document.querySelectorAll('.theme-toggle-icon');
        icons.forEach(icon => {
            if (theme === 'light') {
                icon.className = 'fas fa-moon theme-toggle-icon';
            } else {
                icon.className = 'fas fa-sun theme-toggle-icon';
            }
        });

        const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
        if (toggleBtn) {
            toggleBtn.setAttribute('aria-label', label);
            toggleBtn.title = label;
        }
        if (mobileToggleBtn) {
            mobileToggleBtn.setAttribute('aria-label', label);
            mobileToggleBtn.title = label;
        }
    }

    // Set initial icon state
    updateToggleIcons(getCurrentTheme());

    function handleToggleClick() {
        const nextTheme = getCurrentTheme() === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', handleToggleClick);
    }
    if (mobileToggleBtn) {
        mobileToggleBtn.addEventListener('click', handleToggleClick);
    }

    // Optional OS preference synchronization if user hasn't set custom preference
    try {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
        mediaQuery.addEventListener('change', (e) => {
            const hasStoredPreference = localStorage.getItem(STORAGE_KEY);
            if (!hasStoredPreference) {
                applyTheme(e.matches ? 'light' : 'dark');
            }
        });
    } catch (e) {
        // Fallback for older browsers
    }
}

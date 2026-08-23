/**
 * Main Application Coordinator (ES6 Entry Point)
 * Pramish Pandey Portfolio
 */

import { initTheme } from './modules/theme.js';
import { initNavigation } from './modules/navigation.js';
import { initTerminal } from './modules/terminal.js';
import { initProjects } from './modules/projects.js';
import { initParticles } from './modules/particles.js';
import { initChatbot } from './modules/chatbot.js';
import { initAnimations } from './modules/animations.js';
import { initGallery } from './modules/gallery.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Theme Switcher
    initTheme();

    // 2. Initialize Navigation & Mobile Drawer
    initNavigation();

    // 3. Initialize Interactive Code Terminal Sandbox
    initTerminal();

    // 4. Initialize Dynamic Projects & Filters
    initProjects();

    // 5. Initialize Particles Canvas
    initParticles();

    // 6. Initialize Portfolio AI Chatbot
    initChatbot();

    // 7. Initialize Scroll Reveals & Metric Counters
    initAnimations();

    // 8. Initialize Visuals Gallery & Lightbox
    initGallery();

    // 9. Initialize Frictionless Copy Email & Formspree Form
    initContactFeatures();
});

function initContactFeatures() {
    // Copy Email Trigger
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const copyTooltip = document.getElementById('copy-tooltip');

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', async () => {
            const email = "pramish.pandey@usm.edu";
            try {
                await navigator.clipboard.writeText(email);
                if (copyTooltip) {
                    copyTooltip.classList.add('show');
                    setTimeout(() => copyTooltip.classList.remove('show'), 2500);
                }
                showToast("Email copied to clipboard!", "success");
            } catch (err) {
                showToast("Could not copy email automatically.", "error");
            }
        });
    }

    // Contact Form Validation & Submission
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('form-name');
        const emailInput = document.getElementById('form-email');
        const subjectInput = document.getElementById('form-subject');
        const messageInput = document.getElementById('form-message');
        const submitBtn = contactForm.querySelector('button[type="submit"]');

        let isValid = true;

        [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
            if (!input) return;
            if (!input.value.trim()) {
                input.classList.add('error');
                isValid = false;
            } else {
                input.classList.remove('error');
            }
        });

        // Email regex check
        if (emailInput && emailInput.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                emailInput.classList.add('error');
                isValid = false;
            }
        }

        if (!isValid) {
            showToast("Please fill out all required fields with a valid email.", "error");
            return;
        }

        const formData = new FormData(contactForm);
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) throw new Error(`Submission status: ${response.status}`);

            showToast("Message sent successfully! Pramish will respond soon.", "success");
            contactForm.reset();
        } catch (error) {
            showToast("Message could not be sent right now. Please email directly.", "error");
        } finally {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });

    // Clear error on input
    contactForm.querySelectorAll('.form-input, .form-textarea').forEach(field => {
        field.addEventListener('input', () => field.classList.remove('error'));
    });
}

function showToast(message, type = 'success') {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notification';
        toast.className = 'toast-notification';
        document.body.appendChild(toast);
    }

    const iconClass = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
    toast.className = `toast-notification ${type} show`;
    toast.innerHTML = `<i class="fas ${iconClass}"></i> <span>${message}</span>`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

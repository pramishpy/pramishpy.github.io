/**
 * Dynamic Projects Grid & Category Filter System
 */

import { projectsData } from '../data/projects.js';

export function initProjects() {
    const filterChips = document.querySelectorAll('.filter-chip');
    const projectsGrid = document.getElementById('projects-grid');

    if (!projectsGrid) return;

    function renderProjects(filter = 'all') {
        const filtered = filter === 'all' 
            ? projectsData 
            : projectsData.filter(p => p.category === filter);

        projectsGrid.innerHTML = filtered.map(project => {
            const tagsHtml = project.techStack
                .map(tag => `<span class="project-tag">${tag}</span>`)
                .join('');

            const liveBtn = project.liveUrl ? `
                <a href="${project.liveUrl}" class="project-link-btn primary" target="_blank" rel="noopener noreferrer">
                    <i class="fas fa-external-link-alt"></i> Live App
                </a>
            ` : '';

            const githubBtn = project.githubUrl ? `
                <a href="${project.githubUrl}" class="project-link-btn" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-github"></i> GitHub
                </a>
            ` : '';

            const caseStudyBtn = project.caseStudyUrl ? `
                <a href="${project.caseStudyUrl}" class="project-link-btn" style="border-color: var(--accent-indigo); color: var(--accent-indigo);">
                    <i class="fas fa-file-lines"></i> Case Study
                </a>
            ` : '';

            return `
                <article class="project-card reveal" data-category="${project.category}">
                    <div>
                        <div class="project-card-header">
                            <div class="project-icon-box">
                                <i class="fas ${project.icon}"></i>
                            </div>
                            <span class="project-category-badge">${project.categoryLabel}</span>
                        </div>
                        <h3 class="project-card-title">${project.title}</h3>
                        <p class="project-card-description">${project.summary}</p>
                        <div class="project-highlight-box">
                            <strong>Key Result:</strong> ${project.highlight}
                        </div>
                        <div class="project-tags">${tagsHtml}</div>
                    </div>
                    <div class="project-card-links">
                        ${liveBtn}
                        ${caseStudyBtn}
                        ${githubBtn}
                    </div>
                </article>
            `;
        }).join('');

        // Trigger reveal animations for newly rendered cards
        setTimeout(() => {
            const cards = projectsGrid.querySelectorAll('.project-card');
            cards.forEach(card => card.classList.add('active'));
        }, 50);
    }

    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const filter = chip.getAttribute('data-filter') || 'all';

            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            renderProjects(filter);
        });
    });

    // Initial render of all projects
    renderProjects('all');
}

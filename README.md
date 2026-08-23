# Pramish Pandey — Research Software Engineer Portfolio

A futuristic, high-performance developer portfolio engineered with a modular CSS architecture and native ES6 JavaScript modules. Designed with Linear, Vercel, and Apple design aesthetics.

## 🚀 Architecture & Directory Structure

```
portfolio/
├── index.html                      # Semantic HTML5 with SEO, OpenGraph, Twitter Cards & JSON-LD
├── polyvision-case-study.html      # PolyVision technical case study
├── 404.html                        # Custom branded 404 error page
├── css/
│   ├── main.css                    # Master CSS entry point importing modules
│   ├── tokens.css                  # Design tokens (colors, typography, spacing, shadows)
│   ├── reset.css                   # Modern CSS reset & base elements
│   ├── layout.css                  # Layout utilities, containers, grids, lightbox & footer
│   ├── animations.css              # Keyframes, glow effects, scroll reveals & reduced motion
│   └── components/
│       ├── navbar.css              # Floating glassmorphic header & responsive mobile drawer
│       ├── hero.css                # Hero layout, status pill, CTAs & interactive terminal
│       ├── cards.css               # Glass cards, metric counters, project cards
│       ├── timeline.css            # Connected vertical track for experience & education
│       ├── chatbot.css             # Floating AI Assistant widget, bubbles & prompt chips
│       ├── forms.css               # Accessible inputs, instant copy email tooltip, toast
│       └── badges.css              # Skill pills, filter chips, tech tags & category badges
├── js/
│   ├── main.js                     # Main coordinator (ES6 Modules)
│   ├── data/
│   │   └── projects.js             # Single source of truth for portfolio items
│   └── modules/
│       ├── theme.js                # Zero-flash dark/light switcher with localStorage
│       ├── navigation.js           # Scroll spy, smooth scrolling, mobile drawer
│       ├── terminal.js             # Interactive hero terminal with tab switching & execution
│       ├── projects.js             # Dynamic category filtering & grid rendering
│       ├── particles.js            # Lightweight canvas particle mesh
│       ├── chatbot.js              # Portfolio AI assistant with markdown parsing & chips
│       ├── animations.js           # IntersectionObserver scroll reveals & number counters
│       └── gallery.js              # GitHub API visuals gallery & accessible lightbox
├── resources/
│   └── resume.pdf                  # Curriculum Vitae
└── images/                         # Profile photos and visual media assets
```

## ✨ Key Features & Capabilities

- **Obsidian Dark-First & Clean Light Mode:** High-contrast, WCAG AA-compliant palette with zero-flash `<head>` execution.
- **Interactive Code Terminal Sandbox:** Real-time multi-file code preview (`pipeline.py`, `eval.sh`, `metrics.json`) with simulated execution and copy-to-clipboard actions.
- **Dynamic Projects Grid:** Fast category filtering (`All`, `AI & LLMs`, `Systems & Infrastructure`, `Computer Vision`, `Open Source`) powered by single-source JSON/ES6 data.
- **Interactive AI Assistant (Chatbot):** In-browser portfolio guide capable of answering questions regarding AI research, ETL systems, skills, and contact details with quick prompt suggestion chips.
- **Dynamic Visuals Gallery:** Automatically synchronizes photography and media from GitHub repository with accessible keyboard-navigable lightbox (`Escape`, `ArrowLeft`, `ArrowRight`).
- **Instant Email Action:** One-click email copy with animated tooltip and accessible toast feedback.
- **Zero-Build & Ultra-Fast:** Pure standards-compliant HTML5, CSS3, and ES6 modules requiring zero build steps or heavyweight dependencies.

## 🛠 Local Development

To run locally with any static web server:

```bash
# Using Python
python -m http.server 8000

# Using Node (npx)
npx -y serve ./
```

Open `http://localhost:8000` in any modern browser.

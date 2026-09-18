/**
 * Intelligent Portfolio AI Assistant Chatbot
 */

const knowledgeBase = [
    {
        keywords: ["hello", "hi", "hey", "greetings", "who are you", "what can you do"],
        response: "Hello! I am Pramish's portfolio AI assistant. I can answer questions about his **Applied AI research**, **full-stack engineering projects**, **technical skills**, **4.0 GPA academic background**, or **how to collaborate with him**."
    },
    {
        keywords: ["ai4all", "ignite", "cdc", "natality", "xgboost", "tabnet", "preterm", "bias", "fairness"],
        response: "As an **AI4ALL Ignite Fellow**, Pramish engineered an end-to-end ML pipeline processing **24.9 million CDC Natality records**, optimizing XGBoost and TabNet on a 3-million-row stratified sample to predict preterm births. He audited bias with SHAP and g-computation, and deployed a Streamlit dashboard for responsible AI auditing."
    },
    {
        keywords: ["ai", "langchain", "llm", "fellowship", "applied ai", "generative ai"],
        response: "Pramish is an **AI4ALL Ignite Fellow** and completed an **AI Innovation Hub Fellowship** with the Mississippi Dept. of Information Technology Services, working across applied machine learning, LLM-backed document pipelines, and responsible AI auditing."
    },
    {
        keywords: ["polyvision", "microscopy", "c++", "qt", "opencv", "computer vision", "desktop"],
        response: "<strong>PolyVision</strong> is a cross-platform C++20 / Qt 6 desktop application for polymer microscopy image analysis. It integrates OpenCV for automated morphological feature extraction and segmentation, achieving **10-15x faster processing** than manual methods with **95%+ detection accuracy**."
    },
    {
        keywords: ["polymer morphology", "django", "etl", "records", "database", "50000", "usm", "publication", "manuscript"],
        response: "At the **School of Polymer Science & Engineering (USM)**, Pramish designed a full-stack Django + React platform with PostgreSQL on GCP and Firebase Hosting, giving collaborators shared, sample-level access and cutting research data sorting and retrieval time by **90%**. Python pipelines ingested and synthesized **50,000+ raw files** across **20+ active studies**, forming the basis of a manuscript currently in preparation (<a href='https://polymermorphology.org' target='_blank' style='color:var(--accent-indigo); text-decoration:underline;'>polymermorphology.org</a>)."
    },
    {
        keywords: ["nursing", "transcript", "licensure", "textract", "board of nursing", "fraud", "bedrock", "step functions"],
        response: "For the **Mississippi State Board of Nursing**, Pramish architected a serverless **AWS Step Functions** pipeline orchestrating API Gateway and Lambda to automate transcript processing, extracting 16 structured fields via **Amazon Textract** and **Bedrock Nova Pro**. An 18-rule Python verification engine flags academic anomalies, backed by a React SPA with append-only audit logging."
    },
    {
        keywords: ["igor", "copilot", "gemini", "pywin32", "fastapi"],
        response: "<strong>Igor Copilot</strong> is a FastAPI bridge integrating the Gemini API with Windows COM (pywin32) to automate WaveMetrics Igor Pro experimental software. It's containerized with Docker and uses strict static typing plus async testing (pytest-asyncio) for thread-safe desktop operations."
    },
    {
        keywords: ["clean-slate", "expungement", "entrepreneurship", "hult prize", "co-founder", "treasurer", "leadership"],
        response: "Pramish **co-founded Clean-Slate**, an automated legal-document platform guiding eligible individuals through criminal record expungement — raising **$1,500** in non-dilutive funding including the Hult Prize Campus Final. He also serves as **Treasurer of the USM Entrepreneurship Society**."
    },
    {
        keywords: ["skills", "technologies", "languages", "stack", "tools", "python", "frameworks"],
        response: "Pramish's core technical stack includes:\n- **Languages:** Python, TypeScript, JavaScript, C++, SQL, Go\n- **AI/ML:** PyTorch, scikit-learn, XGBoost, Hugging Face, LangChain, SHAP, OpenCV, NLTK\n- **Backend & Cloud:** React, Next.js, Django, FastAPI, PostgreSQL, AWS (Lambda/Textract/Bedrock), GCP, Firebase, Docker\n- **Specializations:** Data Governance (PII/PHI), ETL Pipelines, Responsible AI Auditing."
    },
    {
        keywords: ["education", "gpa", "degree", "university", "usm", "coursework", "presidents list", "scholarship"],
        response: "Pramish is pursuing a **B.S. in Computer Science at The University of Southern Mississippi** (Expected May 2027). He maintains a perfect **4.0/4.0 GPA**, has earned the **President's List for 5 consecutive semesters**, and holds the **Academic Excellence Scholarship** (full tuition, merit-based)."
    },
    {
        keywords: ["contact", "email", "hire", "collaborate", "reach", "phone", "location", "message"],
        response: "You can reach Pramish directly at **pramish.pandey@usm.edu** or via the contact form on this page. You can also connect with him on <a href='https://linkedin.com/in/pramishpy' target='_blank' style='color:var(--accent-indigo); text-decoration:underline;'>LinkedIn</a> and explore his code on <a href='https://github.com/pramishpy' target='_blank' style='color:var(--accent-indigo); text-decoration:underline;'>GitHub</a>."
    }
];

export function initChatbot() {
    const launcher = document.getElementById('chatbot-launcher');
    const modal = document.getElementById('chatbot-modal');
    const closeBtn = document.getElementById('chatbot-close');
    const clearBtn = document.getElementById('chatbot-clear');
    const messagesContainer = document.getElementById('chatbot-messages');
    const inputField = document.getElementById('chatbot-input');
    const sendBtn = document.getElementById('chatbot-send');
    const chips = document.querySelectorAll('.chip-btn');

    if (!launcher || !modal || !messagesContainer) return;

    function openChat() {
        modal.classList.add('open');
        launcher.setAttribute('aria-expanded', 'true');
        inputField?.focus();
        
        if (messagesContainer.children.length === 0) {
            appendBotMessage("Hi! I'm Pramish's portfolio AI assistant. Ask me anything about his research, projects, skills, or experience!");
        }
    }

    function closeChat() {
        modal.classList.remove('open');
        launcher.setAttribute('aria-expanded', 'false');
    }

    launcher.addEventListener('click', () => {
        if (modal.classList.contains('open')) {
            closeChat();
        } else {
            openChat();
        }
    });

    closeBtn?.addEventListener('click', closeChat);

    clearBtn?.addEventListener('click', () => {
        messagesContainer.innerHTML = '';
        appendBotMessage("Conversation reset. How else can I assist you with Pramish's portfolio?");
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeChat();
        }
    });

    function appendUserMessage(text) {
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble user';
        bubble.textContent = text;
        messagesContainer.appendChild(bubble);
        scrollToBottom();
    }

    function formatMarkdown(text) {
        // Convert **bold** to <strong>
        let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Convert bullet lists
        if (formatted.includes('\n- ')) {
            const lines = formatted.split('\n');
            let inList = false;
            let listHtml = '';
            for (const line of lines) {
                if (line.startsWith('- ')) {
                    if (!inList) { listHtml += '<ul>'; inList = true; }
                    listHtml += `<li>${line.slice(2)}</li>`;
                } else {
                    if (inList) { listHtml += '</ul>'; inList = false; }
                    listHtml += (listHtml ? '<br>' : '') + line;
                }
            }
            if (inList) listHtml += '</ul>';
            formatted = listHtml;
        }
        return formatted;
    }

    function appendBotMessage(text) {
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble bot';
        bubble.innerHTML = formatMarkdown(text);
        messagesContainer.appendChild(bubble);
        scrollToBottom();
    }

    function showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        indicator.id = 'typing-indicator';
        indicator.innerHTML = `
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
        `;
        messagesContainer.appendChild(indicator);
        scrollToBottom();
    }

    function removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    }

    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function getResponse(query) {
        const normalized = query.toLowerCase().trim();

        for (const item of knowledgeBase) {
            if (item.keywords.some(k => normalized.includes(k))) {
                return item.response;
            }
        }

        return "I'm not completely certain about that specific topic, but I'd be happy to share details on Pramish's **Applied AI research**, **PolyVision desktop app**, **50k+ record ETL platforms**, **academic honors**, or **how to contact him directly**.";
    }

    function handleSend() {
        const text = inputField?.value.trim();
        if (!text) return;

        appendUserMessage(text);
        if (inputField) inputField.value = '';

        showTypingIndicator();

        setTimeout(() => {
            removeTypingIndicator();
            const response = getResponse(text);
            appendBotMessage(response);
        }, 450);
    }

    sendBtn?.addEventListener('click', handleSend);

    inputField?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
        }
    });

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            const prompt = chip.getAttribute('data-prompt') || chip.textContent.trim();
            if (prompt) {
                if (!modal.classList.contains('open')) openChat();
                appendUserMessage(prompt);
                showTypingIndicator();
                setTimeout(() => {
                    removeTypingIndicator();
                    const response = getResponse(prompt);
                    appendBotMessage(response);
                }, 400);
            }
        });
    });
}

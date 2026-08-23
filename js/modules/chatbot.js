/**
 * Intelligent Portfolio AI Assistant Chatbot
 */

const knowledgeBase = [
    {
        keywords: ["hello", "hi", "hey", "greetings", "who are you", "what can you do"],
        response: "Hello! I am Pramish's portfolio AI assistant. I can answer questions about his **Applied AI research**, **full-stack engineering projects**, **technical skills**, **4.0 GPA academic background**, or **how to collaborate with him**."
    },
    {
        keywords: ["ai", "langchain", "llm", "ignite", "fellowship", "applied ai", "generative ai"],
        response: "Pramish is an **AI4ALL Ignite Fellow** and **Mississippi AI Innovation Hub Fellow**. He prototypes generative AI pipelines and LLM agents using Python, LangChain, and AWS/Azure, focusing on enterprise prompt engineering, human-in-the-loop workflows, and ethical data governance."
    },
    {
        keywords: ["polyvision", "microscopy", "c++", "qt", "opencv", "computer vision", "desktop"],
        response: "<strong>PolyVision</strong> is a cross-platform C++20 / Qt 6 desktop application for polymer microscopy image analysis. It integrates OpenCV for automated morphological feature extraction and segmentation, achieving **10-15x faster processing** than manual methods with **95%+ detection accuracy**."
    },
    {
        keywords: ["polymer morphology", "django", "etl", "records", "database", "50000", "usm"],
        response: "At the **School of Polymer Science & Engineering (USM)**, Pramish designed a full-stack Django + React platform with PostgreSQL on GCP, managing automated ETL workflows for **50,000+ experimental records** and reducing manual upload time by **97%** (<a href='https://polymermorphology.org' target='_blank' style='color:var(--accent-indigo); text-decoration:underline;'>polymermorphology.org</a>)."
    },
    {
        keywords: ["nursing", "transcript", "licensure", "textract", "board of nursing", "fraud"],
        response: "For the **Mississippi Board of Nursing**, Pramish designed a human-in-the-loop AI verification system with AWS Lambda, Django, and Amazon Textract. It processes transcripts in 2-4 minutes using a Python engine with 13 licensure rules and strict PII isolation."
    },
    {
        keywords: ["skills", "technologies", "languages", "stack", "tools", "python", "frameworks"],
        response: "Pramish's core technical stack includes:\n- **Languages:** Python, C++, TypeScript, Go, C, SQL, JavaScript\n- **AI/ML & Vision:** LangChain, PyTorch, HuggingFace, OpenCV, Prompt Engineering\n- **Backend & Cloud:** Django, FastAPI, Next.js, PostgreSQL, Docker, AWS, GCP, Vercel\n- **Specializations:** Data Governance (PII/PHI), ETL Pipelines, High-Performance Systems."
    },
    {
        keywords: ["education", "gpa", "degree", "university", "usm", "coursework", "presidents list"],
        response: "Pramish is pursuing a **B.S. in Computer Science at The University of Southern Mississippi** (Jan 2024 - Present). He maintains a perfect **4.0/4.0 GPA** and has earned the **President's List for 4 consecutive semesters**."
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

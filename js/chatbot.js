document.addEventListener('DOMContentLoaded', () => {
    const chatbotToggler = document.querySelector('.chatbot-toggler');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const closeBtn = document.querySelector('.chatbot-close-btn');
    const messagesContainer = document.querySelector('.chatbot-messages');
    const sendBtn = document.getElementById('chatbot-send-btn');
    const userInput = document.getElementById('chatbot-user-input');

    const toggleChatbot = () => {
        chatbotContainer.classList.toggle('active');
        if (chatbotContainer.classList.contains('active') && messagesContainer.children.length === 0) {
            // Add initial greeting if chat is opened for the first time
            appendMessage("Hello! I'm a bot with information about Pramish. How can I help you? You can ask about his skills, projects, or education.", 'bot');
        }
    };

    chatbotToggler.addEventListener('click', toggleChatbot);
    closeBtn.addEventListener('click', toggleChatbot);

    const appendMessage = (message, sender) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', `${sender}-message`);
        messageElement.textContent = message;
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Auto-scroll to bottom
    };

    const handleUserMessage = () => {
        const message = userInput.value.trim();
        if (message === '') return;

        appendMessage(message, 'user');
        userInput.value = '';

        // Simulate bot thinking and then respond
        setTimeout(() => {
            const botResponse = getBotResponse(message);
            appendMessage(botResponse, 'bot');
        }, 500);
    };

    sendBtn.addEventListener('click', handleUserMessage);
    userInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            handleUserMessage();
        }
    });

    function getBotResponse(input) {
        const i = input.toLowerCase();

        // Greetings & Basic Info
        if (i.includes('hello') || i.includes('hi')) {
            return "Hello there! How can I help you today?";
        }
        if (i.includes('who are you') || i.includes('your name')) {
            return "I'm a chatbot designed to answer questions about Pramish Pandey.";
        }
        if (i.includes('pramish')) {
            return "Pramish Pandey is a Data Engineer and Full Stack Developer at USM, and a Computer Science student focused on AI, data systems, and scalable web applications. What would you like to know about him?";
        }

        // Education
        if (i.includes('education') || i.includes('school') || i.includes('college') || i.includes('university')) {
            return "Pramish is pursuing a Bachelor of Science in Computer Science at The University of Southern Mississippi (Jan 2024 - Present), holds a 4.0 GPA, and has earned President's List recognition for four consecutive semesters.";
        }

        // Skills
        if (i.includes('skill')) {
            return "Pramish's skills include: \n- Languages: Python, TypeScript, C++, SQL, JavaScript \n- Frameworks: React, Next.js, Django, Node.js, pandas, NumPy, OpenCV \n- Tools: LangChain, Docker, Kubernetes, Git, Postman, AWS, GCP, Supabase, Neon, PostgreSQL, Microsoft AI Studio (Azure). \nDo you want details for a specific area?";
        }

        // Projects
        if (i.includes('project')) {
            return "Pramish has worked on projects including CollabNet (Next.js + PostgreSQL with RLS), Polymer Morphology (Django + React research platform), Mentally (automated CI/CD + AR app), PolyVision (C++/Qt desktop app), and other web applications. Which one interests you?";
        }
        if (i.includes('collabnet')) {
            return "CollabNet is a platform connecting developers and researchers. It uses Next.js, React, and PostgreSQL, reaches a 98/100 Lighthouse score, and applies Row Level Security for strong data isolation.";
        }
        if (i.includes('mentally')) {
            return "Mentally includes an automated deployment and reporting pipeline using GitHub Actions and Docker, plus a Flask backend and AR experiences. It is engineered for reliability with strong validation and testing workflows.";
        }
        if (i.includes('license test')) {
            return "The Mississippi License Test app is a desktop tool to help users practice for their license exam, built with JavaScript, HTML, and CSS.";
        }
        if (i.includes('galatea')) {
            return "Digital Galatea 2025 is an AI chatbot that attempts to replicate human emotions, using the Gemini API, Python, and web technologies.";
        }
        if (i.includes('codebusters')) {
            return "CodeBusters is an interactive platform to learn programming with lessons and in-browser coding exercises. It's built with HTML, CSS, and JavaScript (using Skulpt for Python execution).";
        }

        // Contact
        if (i.includes('contact') || i.includes('email') || i.includes('phone')) {
            return "You can contact Pramish via email at pramish.pandey@usm.edu or by phone at +1 (601) 913-3119. You can also find his LinkedIn and GitHub profiles on this page.";
        }
        
        // Buy me a coffee
        if (i.includes('coffee') || i.includes('support')) {
            return "That's very kind! You can support Pramish by buying him a coffee here: https://buymeacoffee.com/pramishpang";
        }

        // Fallback
        return "I'm not sure how to answer that. You can ask about Pramish's skills, projects, education, or how to contact him.";
    }
});

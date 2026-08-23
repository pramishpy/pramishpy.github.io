/**
 * Interactive Hero Terminal & Live Code Sandbox
 */

const terminalSnippets = {
    "pipeline.py": [
        { num: 1, html: '<span class="syn-keyword">import</span> torch, torchvision' },
        { num: 2, html: '<span class="syn-keyword">from</span> pydantic <span class="syn-keyword">import</span> BaseModel' },
        { num: 3, html: '<span class="syn-keyword">from</span> langchain.chains <span class="syn-keyword">import</span> LLMChain' },
        { num: 4, html: '' },
        { num: 5, html: '<span class="syn-keyword">class</span> <span class="syn-class">ResearchPipeline</span>:' },
        { num: 6, html: '    <span class="syn-keyword">def</span> <span class="syn-func">__init__</span>(self, model_id: <span class="syn-class">str</span>):' },
        { num: 7, html: '        self.device = <span class="syn-str">"cuda"</span> <span class="syn-keyword">if</span> torch.cuda.is_available() <span class="syn-keyword">else</span> <span class="syn-str">"cpu"</span>' },
        { num: 8, html: '        self.records_processed = <span class="syn-num">50000</span>' },
        { num: 9, html: '        self.eval_score = <span class="syn-num">0.984</span>' },
        { num: 10, html: '' },
        { num: 11, html: '    <span class="syn-keyword">async def</span> <span class="syn-func">run_inference</span>(self, sample_tensor):' },
        { num: 12, html: '        <span class="syn-comment"># Optimized PyTorch ETL & morphological analysis</span>' },
        { num: 13, html: '        output = self.model(sample_tensor.to(self.device))' },
        { num: 14, html: '        <span class="syn-keyword">return</span> {<span class="syn-str">"status"</span>: <span class="syn-str">"optimal"</span>, <span class="syn-str">"latency_ms"</span>: <span class="syn-num">4.2</span>}' }
    ],
    "eval.sh": [
        { num: 1, html: '<span class="syn-comment">#!/usr/bin/env bash</span>' },
        { num: 2, html: '<span class="syn-keyword">set</span> -euo pipefail' },
        { num: 3, html: '' },
        { num: 4, html: '<span class="syn-func">echo</span> <span class="syn-str">"==> Starting Evaluation on 50,000 Polymer Microscopy Samples..."</span>' },
        { num: 5, html: 'python -m pytest tests/test_morphology.py --benchmark' },
        { num: 6, html: '<span class="syn-func">echo</span> <span class="syn-str">"==> Checking Row Level Security & PII boundaries: PASS"</span>' },
        { num: 7, html: '<span class="syn-func">echo</span> <span class="syn-str">"==> Latency: 2.1ms/sample | Accuracy: 98.6% | Zero Leaks"</span>' },
        { num: 8, html: '<span class="syn-func">echo</span> <span class="syn-str">"==> Build Status: READY FOR PRODUCTION"</span>' }
    ],
    "metrics.json": [
        { num: 1, html: '{' },
        { num: 2, html: '  <span class="syn-str">"system_health"</span>: <span class="syn-str">"nominal"</span>,' },
        { num: 3, html: '  <span class="syn-str">"records_synthesized"</span>: <span class="syn-num">50000</span>,' },
        { num: 4, html: '  <span class="syn-str">"upload_speedup"</span>: <span class="syn-str">"97%"</span>,' },
        { num: 5, html: '  <span class="syn-str">"gpa"</span>: <span class="syn-num">4.0</span>,' },
        { num: 6, html: '  <span class="syn-str">"fellowships"</span>: [<span class="syn-str">"AI4ALL Ignite"</span>, <span class="syn-str">"MS AI Hub"</span>],' },
        { num: 7, html: '  <span class="syn-str">"uptime"</span>: <span class="syn-str">"99.98%"</span>' },
        { num: 8, html: '}' }
    ]
};

export function initTerminal() {
    const tabButtons = document.querySelectorAll('.terminal-tab-btn');
    const terminalBody = document.getElementById('terminal-body');
    const runBtn = document.getElementById('terminal-run-btn');
    const copyBtn = document.getElementById('terminal-copy-btn');
    
    let activeTab = "pipeline.py";

    function renderSnippet(tabKey) {
        if (!terminalBody) return;
        activeTab = tabKey;

        const lines = terminalSnippets[tabKey] || [];
        const linesHtml = lines.map(line => `
            <div class="code-line">
                <span class="line-number">${line.num}</span>
                <span class="line-content">${line.html}</span>
            </div>
        `).join('');

        terminalBody.innerHTML = `
            <div class="terminal-code-view">${linesHtml}</div>
            <div id="terminal-exec-output"></div>
        `;
    }

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            if (!targetTab) return;

            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderSnippet(targetTab);
        });
    });

    // Run Code Simulation
    if (runBtn) {
        runBtn.addEventListener('click', () => {
            const outputContainer = document.getElementById('terminal-exec-output');
            if (!outputContainer) return;

            outputContainer.innerHTML = `
                <div class="terminal-output">
                    <span class="terminal-cursor"></span> <em>Executing ${activeTab}...</em>
                </div>
            `;

            setTimeout(() => {
                outputContainer.innerHTML = `
                    <div class="terminal-output terminal-output-success">
                        <span class="terminal-output-badge">DONE</span>
                        <strong>✓ Pipeline executed successfully:</strong> 0 errors, 4.2ms latency, memory: 312MB.
                    </div>
                `;
            }, 600);
        });
    }

    // Copy Snippet to Clipboard
    if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
            const lines = terminalSnippets[activeTab] || [];
            const plainText = lines.map(l => {
                const temp = document.createElement('div');
                temp.innerHTML = l.html;
                return temp.textContent || temp.innerText || "";
            }).join('\n');

            try {
                await navigator.clipboard.writeText(plainText);
                const originalHtml = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                copyBtn.style.color = 'var(--accent-emerald)';

                setTimeout(() => {
                    copyBtn.innerHTML = originalHtml;
                    copyBtn.style.color = '';
                }, 2000);
            } catch (err) {
                // Clipboard write failed fallback
            }
        });
    }

    // Initial render
    renderSnippet(activeTab);
}

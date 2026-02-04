/* =========================================================
   RESEARCH BLOG UTILITIES
   Purpose: Support research workflow, not automation
========================================================= */

/* -------------------------
   SEARCH HISTORY HANDLING
------------------------- */
const historyEl = document.getElementById("history");
let history = JSON.parse(localStorage.getItem("searchHistory")) || [];

/* Render recent search history */
function renderHistory() {
    if (!historyEl) return;
    historyEl.innerHTML = "";
    history.forEach(query => {
        const li = document.createElement("li");
        li.textContent = query;
        historyEl.appendChild(li);
    });
}
renderHistory();

/* Save unique search queries */
function saveHistory(query) {
    if (!history.includes(query)) {
        history.unshift(query);
        history = history.slice(0, 5);
        localStorage.setItem("searchHistory", JSON.stringify(history));
        renderHistory();
    }
}

/* Fetch and sanitize search query */
function getQuery() {
    if (!window.searchQuery) return null;
    const q = searchQuery.value.trim();
    if (!q) return null;
    saveHistory(q);
    return encodeURIComponent(q);
}

/* Handle ENTER key for search */
function handleEnter(e) {
    if (e.key === "Enter") {
        searchScholar();
    }
}

/* -------------------------
   EXTERNAL LITERATURE SEARCH
------------------------- */
function searchScholar() {
    const q = getQuery();
    if (q) window.open(`https://scholar.google.com/scholar?q=${q}`, "_blank");
}

function searchSemantic() {
    const q = getQuery();
    if (q) window.open(`https://www.semanticscholar.org/search?q=${q}`, "_blank");
}

function searchArxiv() {
    const q = getQuery();
    if (q) window.open(
        `https://arxiv.org/search/?query=${q}&searchtype=all`,
        "_blank"
    );
}

function searchIEEE() {
    const q = getQuery();
    if (q) window.open(
        `https://ieeexplore.ieee.org/search/searchresult.jsp?queryText=${q}`,
        "_blank"
    );
}

/* -------------------------
   INTERNAL BLOG SEARCH
   (Lightweight, Intentional)
------------------------- */
function internalSearch(text) {
    if (!window.internalResults) return;
    internalResults.innerHTML = "";

    if (!text) return;

    const query = text.toLowerCase();

    if (query.includes("adaptive")) {
        internalResults.innerHTML = `
            <li>
                <a href="posts/ai-adaptive-learning.html">
                    AI-Driven Adaptive Learning using Q-Learning
                </a>
            </li>`;
    }
}

/* -------------------------
   CITATION GENERATOR
   (Draft Support Only)
------------------------- */
function generateIEEE() {
    citationOutput.textContent =
        `${citeAuthor.value}, "${citeTitle.value}," ` +
        `${citeVenue.value}, ${citeYear.value}.`;
}

function generateAPA() {
    citationOutput.textContent =
        `${citeAuthor.value} (${citeYear.value}). ` +
        `${citeTitle.value}. ${citeVenue.value}.`;
}

/* =========================================================
   RESEARCH WORKFLOW ASSISTANT
   Purpose: Guide actions, not answer research questions
========================================================= */

function assistantEnter(e) {
    if (e.key !== "Enter") return;

    const input = assistantInput.value.trim();
    if (input.length < 3) {
        assistantResponse.textContent =
            "Please describe your research intent in a bit more detail.";
        return;
    }

    const text = input.toLowerCase();
    let response = "";
    let action = null;

    /* ---- Literature Discovery Intent ---- */
    if (
        text.includes("paper") ||
        text.includes("literature") ||
        text.includes("research") ||
        text.includes("survey") ||
        text.includes("find")
    ) {
        response =
            "It appears you want to explore existing research literature.\n" +
            "Use the Literature Search section below to access peer-reviewed papers " +
            "from Google Scholar, Semantic Scholar, arXiv, or IEEE Xplore.";
        action = "search";
    }

    /* ---- Citation Preparation Intent ---- */
    else if (
        text.includes("citation") ||
        text.includes("reference") ||
        text.includes("cite") ||
        text.includes("format")
    ) {
        response =
            "You are preparing or formatting references.\n" +
            "Use the Citation Generator section to draft IEEE or APA-style citations.";
        action = "citations";
    }

    /* ---- Personal Notes / Blog Search ---- */
    else if (
        text.includes("my blog") ||
        text.includes("my post") ||
        text.includes("my work") ||
        text.includes("notes")
    ) {
        response =
            "You are searching within your own research notes.\n" +
            "Use the internal search section to locate relevant posts you have written.";
        action = "internal-search";
    }

    /* ---- Direct Topic Shortcut ---- */
    else if (
        text.includes("adaptive learning") ||
        text.includes("q-learning") ||
        text.includes("reinforcement")
    ) {
        response =
            "You already have a research post related to this topic.\n" +
            "Redirecting you to your adaptive learning article.";
        assistantResponse.textContent = response;

        setTimeout(() => {
            window.location.href = "posts/ai-adaptive-learning.html";
        }, 1200);
        return;
    }

    /* ---- Conceptual Thinking Prompt ---- */
    else if (
        text.includes("how") ||
        text.includes("why") ||
        text.includes("method") ||
        text.includes("approach")
    ) {
        response =
            "This sounds like a methodological or conceptual inquiry.\n" +
            "A productive next step would be to review related literature " +
            "and document your insights as a research post or note.";
        action = "search";
    }

    /* ---- Fallback Guidance ---- */
    else {
        response =
            "I could not map this request to a specific research action yet.\n" +
            "Try rephrasing it as one of the following:\n" +
            "• Find papers on <topic>\n" +
            "• Generate citation for <paper>\n" +
            "• Search my blog for <keyword>";
    }

    assistantResponse.textContent = response;

    /* ---- Gentle Navigation ---- */
    if (action) {
        setTimeout(() => {
            const target = document.getElementById(action);
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        }, 800);
    }
}
/* ===============================
   VIBE CODE BOT (GUIDANCE ONLY)
================================ */
const vibeMessages = [
    "Explain intuition before equations.",
    "Clearly state assumptions and constraints.",
    "Negative results are still valuable.",
    "Compare with prior work honestly.",
    "Write so your future self can understand.",
    "Focus on method clarity, not performance hype."
];

let vibeIndex = 0;

function rotateVibe() {
    const el = document.getElementById("vibeText");
    if (!el) return;

    el.textContent = vibeMessages[vibeIndex];
    vibeIndex = (vibeIndex + 1) % vibeMessages.length;
}

/* ===============================
   VIBE CODE BOT (GUIDANCE ONLY)
================================ */
document.addEventListener("DOMContentLoaded", () => {
    const vibeMessages = [
        "Explain intuition before equations.",
        "Clearly state assumptions and constraints.",
        "Negative results are still valuable.",
        "Compare with prior work honestly.",
        "Write so your future self can understand.",
        "Focus on method clarity, not performance hype."
    ];

    let vibeIndex = 0;

    function rotateVibe() {
        const el = document.getElementById("vibeText");
        if (!el) return;

        el.textContent = vibeMessages[vibeIndex];
        vibeIndex = (vibeIndex + 1) % vibeMessages.length;
    }

    rotateVibe();
    setInterval(rotateVibe, 9000);
});


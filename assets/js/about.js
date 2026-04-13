/* =========================
   📜 祈福紙資料
   ========================= */
const paperData = [
    {
        id: "introduction",
        title: "介紹",
        desc: "認識 TWBC 的理念、活動主題，\n以及麒麟村的故事。"
    },
    {
        id: "coc",
        title: "行為守則",
        desc: "查看活動中的行為守則，\n一起維護溫暖友善的空間。"
    },
    {
        id: "mascot",
        title: "吉祥物",
        desc: "看看本次活動的專屬吉祥物，\n感受屬於麒麟村的象徵。"
    },
    {
        id: "thanks",
        title: "感謝名單",
        desc: "感謝每位工作人員、志工與支持者，\n一起成就這場活動。"
    }
];

/* =========================
   🎯 抓主要元素
   ========================= */
const boardView = document.getElementById("boardView");
const paperView = document.getElementById("paperView");
const wishPaperGrid = document.getElementById("wishPaperGrid");
const paperContent = document.getElementById("paperContent");

/* =========================
   🔍 檢查 section 是否存在
   ========================= */
function sectionExists(sectionId) {
    return !!document.querySelector(`.section-source .section#${sectionId}`);
}

/* =========================
   🌐 更新網址
   ========================= */
function updateURL(sectionId = "", replace = false) {
    const url = new URL(window.location.href);

    if (sectionId) {
        url.searchParams.set("id", sectionId);
    } else {
        url.searchParams.delete("id");
    }

    if (replace) {
        history.replaceState({ title: sectionId || null }, "", url.toString());
    } else {
        history.pushState({ title: sectionId || null }, "", url.toString());
    }
}

/* =========================
   🪵 生成祈福紙
   ========================= */
function renderWishPapers(data) {
    if (!wishPaperGrid) return;

    wishPaperGrid.innerHTML = "";

    data.forEach(item => {
        const btn = document.createElement("button");
        btn.className = "wish-paper";
        btn.type = "button";

        btn.innerHTML = `
            <span class="wish-paper-title">${item.title}</span>
            <span class="wish-paper-desc">${item.desc}</span>
        `;

        btn.addEventListener("click", () => openPaper(item.id));

        wishPaperGrid.appendChild(btn);
    });
}

/* =========================
   📜 開啟祈福紙
   ========================= */
function openPaper(sectionId, updateHistory = true, instant = false) {
    const targetSection = document.querySelector(`.section-source .section#${sectionId}`);
    if (!targetSection || !paperContent || !boardView || !paperView) return;

    paperContent.innerHTML = targetSection.innerHTML;

    if (updateHistory) {
        updateURL(sectionId);
    }

    if (instant) {
        boardView.style.display = "none";
        boardView.classList.remove("active", "hidden");

        paperView.style.display = "block";
        paperView.classList.remove("hidden");
        paperView.classList.add("active");
        return;
    }

    boardView.classList.remove("active");
    boardView.classList.add("hidden");

    setTimeout(() => {
        boardView.style.display = "none";
        paperView.style.display = "block";

        requestAnimationFrame(() => {
            paperView.classList.add("active");
            paperView.classList.remove("hidden");
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
    }, 350);
}

/* =========================
   🔙 回祈福板（給 topbar 用）
   ========================= */
function backToBoard(updateHistory = true, instant = false) {
    if (!boardView || !paperView) return;

    if (updateHistory) updateURL("");

    if (instant) {
        paperView.style.display = "none";
        paperView.classList.remove("active", "hidden");

        boardView.style.display = "block";
        boardView.classList.remove("hidden");
        boardView.classList.add("active");
        return;
    }

    paperView.classList.remove("active");
    paperView.classList.add("hidden");

    setTimeout(() => {
        paperView.style.display = "none";
        boardView.style.display = "block";

        requestAnimationFrame(() => {
            boardView.classList.add("active");
            boardView.classList.remove("hidden");
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
    }, 350);
}

/* =========================
   🔗 URL 控制
   ========================= */
function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (id && sectionExists(id)) {
        openPaper(id, false, true);
    } else {
        backToBoard(false, true);
    }
}

function handlePopState() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (id && sectionExists(id)) {
        openPaper(id, false, true);
    } else {
        backToBoard(false, true);
    }
}

/* =========================
   🚀 初始化
   ========================= */
function initAboutPage() {
    renderWishPapers(paperData);
    loadFromURL();
    window.addEventListener("popstate", handlePopState);
}

document.addEventListener("DOMContentLoaded", initAboutPage);

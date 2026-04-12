document.addEventListener("DOMContentLoaded", () => {
    const topbar = document.getElementById("paperTopbar");
    if (!topbar) return;

    let resetBtn, copyBtn, homeBtn;

    function isLocationPage() {
        const params = new URLSearchParams(window.location.search);
        return params.get("id") === "location";
    }

    async function copyCurrentLink() {
        if (!copyBtn) return;

        try {
            await navigator.clipboard.writeText(window.location.href);
            copyBtn.textContent = "✅ 複製成功";
            copyBtn.classList.add("success");
        } catch (error) {
            copyBtn.textContent = "❌ 複製失敗";
            copyBtn.classList.add("error");
        }

        setTimeout(() => {
            copyBtn.classList.remove("success", "error");
            updateTopbarText();
        }, 1500);
    }

    function resetMapView() {
        const map = window.currentMap;
        if (map && typeof map.resetView === "function") {
            map.resetView();
        }
    }

    function createTopbarButtons() {
        topbar.innerHTML = "";

        resetBtn = document.createElement("button");
        resetBtn.id = "resetMapView";
        resetBtn.className = "paper-action-btn reset-btn";
        resetBtn.type = "button";

        copyBtn = document.createElement("button");
        copyBtn.id = "copyLink";
        copyBtn.className = "paper-action-btn copy-btn";
        copyBtn.type = "button";

        homeBtn = document.createElement("button");
        homeBtn.id = "goHome";
        homeBtn.className = "paper-action-btn home-btn";
        homeBtn.type = "button";

        if (isLocationPage()) {
            topbar.appendChild(resetBtn);
            resetBtn.addEventListener("click", resetMapView);
        }

        topbar.appendChild(copyBtn);
        topbar.appendChild(homeBtn);

        copyBtn.addEventListener("click", copyCurrentLink);

        homeBtn.addEventListener("click", () => {
            window.location.href = "HomePage.html";
        });

        updateTopbarText();
    }

    function updateTopbarText() {
        if (!copyBtn || !homeBtn) return;

        const w = window.innerWidth;
        const isCopyBusy =
            copyBtn.classList.contains("success") ||
            copyBtn.classList.contains("error");

        if (w < 390) {
            if (resetBtn) resetBtn.textContent = "📍";
            if (!isCopyBusy) copyBtn.textContent = "🔗";
            homeBtn.textContent = "🏠";
        } else if (w < 475) {
            if (resetBtn) resetBtn.textContent = "重置";
            if (!isCopyBusy) copyBtn.textContent = "連結";
            homeBtn.textContent = "首頁";
        } else if (w < 600) {
            if (resetBtn) resetBtn.textContent = "📍 重置";
            if (!isCopyBusy) copyBtn.textContent = "🔗 連結";
            homeBtn.textContent = "🏠 首頁";
        } else {
            if (resetBtn) resetBtn.textContent = "📍 初始位置";
            if (!isCopyBusy) copyBtn.textContent = "🔗 複製連結";
            homeBtn.textContent = "🏠 返回首頁";
        }
    }

    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updateTopbarText, 100);
    });

    window.addEventListener("popstate", () => {
        createTopbarButtons();
    });

    createTopbarButtons();
    window.refreshTopbar = createTopbarButtons;
});
document.addEventListener("DOMContentLoaded", () => {
    const topbar = document.getElementById("paperTopbar");
    if (!topbar) return;

    let backBtn, copyBtn, homeBtn;

    /*  複製目前網址  */
    async function copyCurrentLink() {
        if (!copyBtn) return;

        const originalText = copyBtn.textContent;

        try {
            await navigator.clipboard.writeText(window.location.href);

            // 成功提示
            copyBtn.textContent = "✅ 複製成功";
            copyBtn.classList.add("success");
        } catch (error) {
            // 失敗提示
            copyBtn.textContent = "❌ 複製失敗";
            copyBtn.classList.add("error");
        }

        // 1.5 秒後恢復原本樣子
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.classList.remove("success", "error");

            // 因為 originalText 可能在 resize 後要變，
            // 所以恢復後再重新判斷一次當前寬度
            updateTopbarText();
        }, 1500);
    }

    /*  建立按鈕 */
    function createTopbarButtons() {
        topbar.innerHTML = "";

        // 返回
        backBtn = document.createElement("button");
        backBtn.id = "backToBoard";
        backBtn.className = "back-btn";

        // 複製
        copyBtn = document.createElement("button");
        copyBtn.id = "copyLink";
        copyBtn.className = "copy-btn";

        // 回首頁
        homeBtn = document.createElement("button");
        homeBtn.id = "goHome";
        homeBtn.className = "home-btn";

        topbar.appendChild(backBtn);
        topbar.appendChild(copyBtn);
        topbar.appendChild(homeBtn);

        /*  綁事件 */

        // 回祈福板
        if (typeof backToBoard === "function") {
            backBtn.addEventListener("click", () => backToBoard());
        }

        // 複製連結
        copyBtn.addEventListener("click", copyCurrentLink);

        // 回首頁
        homeBtn.addEventListener("click", () => {
            window.location.href = "index.html";
        });

        updateTopbarText();
    }

    /* RWD 文字 */
    function updateTopbarText() {
        // 如果目前正在顯示成功/失敗提示，就先不要覆蓋文字
        if (
            copyBtn &&
            (copyBtn.classList.contains("success") || copyBtn.classList.contains("error"))
        ) {
            return;
        }

        const w = window.innerWidth;

        if (w < 390) {
            backBtn.textContent = "🖋";
            copyBtn.textContent = "🔗";
            homeBtn.textContent = "🏠";
        } else if (w < 475) {
            backBtn.textContent = "返回";
            copyBtn.textContent = "連結";
            homeBtn.textContent = "首頁";
        } else if (w < 600) {
            backBtn.textContent = "🖋 返回";
            copyBtn.textContent = "🔗 連結";
            homeBtn.textContent = "🏠 首頁";
        } else {
            backBtn.textContent = "🖋 回祈福板";
            copyBtn.textContent = "🔗 複製連結";
            homeBtn.textContent = "🏠 返回首頁";
        }
    }

    /*  resize debounce  */
    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updateTopbarText, 100);
    });

    /*  初始化  */
    createTopbarButtons();
});

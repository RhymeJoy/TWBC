// 📦 資料來源（之後只要改這裡就好）
const papersData = [
    {
        title: "網站啟用",
        content: "敬請期待！"
    },
    {
        title: "地點選定",
        content: "活動時間與地點將於近期公布，敬請關注！"
    },
    {
        title: "活動時間",
        content: "活動時間將於2026年8月15號舉辦！"
    }
];

// 🎯 抓放紙張的容器
const container = document.querySelector(".paper-container");

// 有抓到才執行（避免報錯）
if (container) {
    renderPapers(papersData);
}

/**
 * 🎨 生成所有紙張
 */
function renderPapers(data) {
    const placed = []; // 📍 已放置位置（用來避免重疊）

    data.forEach((item) => {
    const paper = document.createElement("div");
    paper.className = "paper";

    paper.innerHTML = `
        <div class="paper-hover">
            <div class="paper-float">
                <h1>${escapeHtml(item.title)}</h1>
                <p>${escapeHtml(item.content)}</p>
            </div>
        </div>
    `;

    const pos = getSafePosition(placed);

    const baseRotate = randomBetween(-8, 8);
    const floatRotate = randomBetween(1.5, 3.5);
    const floatDuration = randomBetween(3.5, 6.5);

    paper.style.left = `${pos.x}%`;
    paper.style.top = `${pos.y}%`;
    paper.style.setProperty("--base-rotate", `${baseRotate}deg`);
    paper.style.setProperty("--float-rotate", `${floatRotate}deg`);
    paper.style.setProperty("--float-duration", `${floatDuration}s`);

    // ⭐ 每次 hover 都重新隨機
    paper.addEventListener("mouseenter", () => {
        const hoverRotate = Math.random() < 0.5 ? "-10deg" : "10deg";
        paper.style.setProperty("--hover-rotate", hoverRotate);
    });

    container.appendChild(paper);
});
}

/**
 * 📏 取得不重疊的位置
 */
function getSafePosition(placed) {
    const minX = 25; // 左邊界
    const maxX = 75; // 右邊界
    const minY = 25; // 上邊界
    const maxY = 75; // 下邊界

    const minDistance = 25; // 紙與紙之間最小距離
    const maxTries = 50;   // 最多嘗試次數

    for (let i = 0; i < maxTries; i++) {
        const x = randomBetween(minX, maxX);
        const y = randomBetween(minY, maxY);

        let valid = true;

        // 🧠 檢查與已存在紙張的距離
        for (const p of placed) {
            const dx = p.x - x;
            const dy = p.y - y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < minDistance) {
                valid = false;
                break;
            }
        }

        // ✅ 合格就用這個位置
        if (valid) {
            const point = { x, y };
            placed.push(point);
            return point;
        }
    }

    // ❗ 如果都找不到，就放中間附近
    const fallback = {
        x: randomBetween(35, 65),
        y: randomBetween(35, 65)
    };
    placed.push(fallback);
    return fallback;
}

/**
 * 🎲 產生隨機數（min ~ max）
 */
function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * 🔒 防止 XSS（避免 HTML 注入）
 */
function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}
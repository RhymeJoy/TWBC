const papersData = [
    {
        title: "商販申請",
        content: "敬請期待！"
    },
    {
        title: "志工申請",
        content: "敬請期待！"
    },
    {
        title: "活動申請",
        content: "敬請期待！"
    },
    {
        title: "門票購買",
        content: "我會帶你去門票說明頁面！",
        link: "Ticket.html"
    }
];

const container = document.querySelector(".paper-container");
const board = document.querySelector(".board");

if (container) {
    renderPapers(papersData);
}

function renderPapers(data) {
    container.innerHTML = "";

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

        const baseRotate = randomBetween(-8, 8);
        const floatRotate = randomBetween(1.5, 3.5);
        const floatDuration = randomBetween(3.5, 6.5);

        paper.style.setProperty("--base-rotate", `${baseRotate}deg`);
        paper.style.setProperty("--float-rotate", `${floatRotate}deg`);
        paper.style.setProperty("--float-duration", `${floatDuration}s`);

        paper.addEventListener("mouseenter", () => {
            const hoverRotate = Math.random() < 0.5 ? "-10deg" : "10deg";
            paper.style.setProperty("--hover-rotate", hoverRotate);
        });

        if (item.link) {
            paper.classList.add("clickable");
            paper.addEventListener("click", () => {
                window.location.href = item.link;
            });
        }

        container.appendChild(paper);
    });

    requestAnimationFrame(() => {
        layoutPapers();
    });
}

function layoutPapers() {
    const papers = [...container.querySelectorAll(".paper")];
    const placed = [];

    papers.forEach((paper) => {
        const pos = getSafePosition(placed, paper, container);

        paper.style.left = `${pos.x}px`;
        paper.style.top = `${pos.y}px`;

        placed.push({
            x: pos.x,
            y: pos.y,
            width: pos.width,
            height: pos.height
        });
    });
}

function getSafePosition(placed, paper, container) {
    const containerRect = container.getBoundingClientRect();
    const paperRect = paper.getBoundingClientRect();

    const paperWidth = paperRect.width;
    const paperHeight = paperRect.height;

    const gap = Math.max(12, Math.min(30, containerRect.width * 0.02));
    const edgeGap = Math.max(10, Math.min(20, containerRect.width * 0.02));
    const maxTries = 300;

    const minX = edgeGap + paperWidth / 2;
    const maxX = containerRect.width - edgeGap - paperWidth / 2;
    const minY = edgeGap + paperHeight / 2;
    const maxY = containerRect.height - edgeGap - paperHeight / 2;

    if (minX > maxX || minY > maxY) {
        return {
            x: containerRect.width / 2,
            y: containerRect.height / 2,
            width: paperWidth,
            height: paperHeight
        };
    }

    for (let i = 0; i < maxTries; i++) {
        const x = randomBetween(minX, maxX);
        const y = randomBetween(minY, maxY);

        let valid = true;

        for (const p of placed) {
            const overlapX = Math.abs(p.x - x) < (p.width / 2 + paperWidth / 2 + gap);
            const overlapY = Math.abs(p.y - y) < (p.height / 2 + paperHeight / 2 + gap);

            if (overlapX && overlapY) {
                valid = false;
                break;
            }
        }

        if (valid) {
            return {
                x,
                y,
                width: paperWidth,
                height: paperHeight
            };
        }
    }

    let bestPoint = null;
    let bestScore = -Infinity;

    for (let i = 0; i < 150; i++) {
        const x = randomBetween(minX, maxX);
        const y = randomBetween(minY, maxY);

        let minDistScore = Infinity;

        for (const p of placed) {
            const dx = Math.abs(p.x - x) - (p.width / 2 + paperWidth / 2);
            const dy = Math.abs(p.y - y) - (p.height / 2 + paperHeight / 2);
            const score = Math.min(dx, dy);

            if (score < minDistScore) {
                minDistScore = score;
            }
        }

        if (minDistScore > bestScore) {
            bestScore = minDistScore;
            bestPoint = { x, y };
        }
    }

    return {
        x: bestPoint?.x ?? containerRect.width / 2,
        y: bestPoint?.y ?? containerRect.height / 2,
        width: paperWidth,
        height: paperHeight
    };
}

function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

let resizeTimer;

window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        layoutPapers();
    }, 120);
});

if (board) {
    const observer = new ResizeObserver(() => {
        layoutPapers();
    });

    observer.observe(board);
}
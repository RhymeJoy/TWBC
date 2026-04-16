const quotes = [
    "「不管你做什麼，永遠都不會有萬事俱備的時候。」- Applejack",
    "「壞事就是會發生，但這並不代表你要放棄！」- Applejack",
    "「不要忘記你是誰。」- Fluttershy",
    "「不只是鞭策自己，而是朝著正確的方向鞭策自己。」- Rainbow Dash",
    "「恐懼並不可怕，放棄才是。」- Princess Luna",
    "「每個人都值得被原諒一次。」- Princess Celestia",
    "「你不需要完美，只需要做你自己。」- Starlight Glimmer",
    "「即使改變很難，也值得去嘗試。」- Sunset Shimmer",
    "「忠於自己，別讓別人定義你。」- Rainbow Dash",
    "「笑一笑，事情就會變好一點！」- Pinkie Pie",
    "「真正的美，來自你自己的內心。」- Rarity",
    "「誠實，才是最重要、最好的原則。」- Applejack",
    "「善良比任何力量都強大。」- Fluttershy",
    "「友情不總是簡單，但值得去守護。」- Twilight Sparkle",
    "「派對是交朋友最棒的方法！」- Pinkie Pie"
];

const QUOTE_HIDE_WIDTH = 900;

let remainingQuotes = [...quotes];
let quoteInterval = null;

function getRandomQuote() {
    if (remainingQuotes.length === 0) {
        remainingQuotes = [...quotes];
    }

    const index = Math.floor(Math.random() * remainingQuotes.length);
    const quote = remainingQuotes[index];
    remainingQuotes.splice(index, 1);
    return quote;
}

function fitQuoteSingleLine(el, options = {}) {
    if (!el) return;

    const parent = el.parentElement;
    if (!parent) return;

    const {
        stepEm = 0.125,
        safetyPadding = 2
    } = options;

    // 先回到 CSS 預設值
    el.style.fontSize = "";
    el.style.whiteSpace = "nowrap";
    el.style.display = "block";
    el.style.overflow = "hidden";
    el.style.textOverflow = "clip";

    const parentWidth = parent.getBoundingClientRect().width;
    const availableWidth = parentWidth - safetyPadding;

    // 如果寬度還沒算出來，就不要縮
    if (availableWidth <= 0) return;

    const initialPx = parseFloat(window.getComputedStyle(el).fontSize);
    const rootPx = parseFloat(window.getComputedStyle(document.documentElement).fontSize);
    const stepPx = stepEm * rootPx;

    let currentPx = initialPx;
    let lastGoodPx = initialPx;

    // 原本就放得下，直接保持 CSS 大小
    if (Math.ceil(el.scrollWidth) <= Math.floor(availableWidth)) {
        return;
    }

    // 每次往下縮，直到剛好放得下
    while (currentPx > stepPx) {
        currentPx -= stepPx;
        el.style.fontSize = `${currentPx}px`;

        if (Math.ceil(el.scrollWidth) <= Math.floor(availableWidth)) {
            lastGoodPx = currentPx;
            break;
        }
    }

    el.style.fontSize = `${lastGoodPx}px`;
}

function applyQuoteFit() {
    const el = document.getElementById("quoteText");
    if (!el || !el.textContent.trim()) return;

    fitQuoteSingleLine(el, {
        stepEm: 0.125,
        safetyPadding: 2
    });
}

function updateQuote() {
    const el = document.getElementById("quoteText");
    if (!el) return;

    if (window.innerWidth < QUOTE_HIDE_WIDTH) {
        el.textContent = "";
        el.classList.remove("fade-in", "fade-out");
        el.style.fontSize = "";
        el.style.opacity = "";
        el.style.transform = "";
        return;
    }

    el.classList.remove("fade-in");
    el.classList.add("fade-out");

    setTimeout(() => {
        const nextQuote = getRandomQuote();

        el.classList.remove("fade-in", "fade-out");
        el.style.opacity = "0";
        el.style.transform = "translateY(10px)";
        el.style.fontSize = "";
        el.textContent = nextQuote;

        requestAnimationFrame(() => {
            fitQuoteSingleLine(el, {
                stepEm: 0.125,
                safetyPadding: 2
            });

            el.style.opacity = "";
            el.style.transform = "";
            el.classList.add("fade-in");
        });
    }, 300);
}

function startQuoteRotation() {
    if (quoteInterval) return;

    updateQuote();
    quoteInterval = setInterval(updateQuote, 10000);
}

function stopQuoteRotation() {
    if (quoteInterval) {
        clearInterval(quoteInterval);
        quoteInterval = null;
    }

    const el = document.getElementById("quoteText");
    if (el) {
        el.textContent = "";
        el.classList.remove("fade-in", "fade-out");
        el.style.fontSize = "";
        el.style.opacity = "";
        el.style.transform = "";
    }
}

function handleResize() {
    const el = document.getElementById("quoteText");

    if (window.innerWidth < QUOTE_HIDE_WIDTH) {
        stopQuoteRotation();
        return;
    }

    if (!quoteInterval) {
        startQuoteRotation();
    } else if (el && el.textContent.trim()) {
        requestAnimationFrame(() => {
            applyQuoteFit();
        });
    } else {
        updateQuote();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("quotes init", window.innerWidth);
    startQuoteRotation();
    window.addEventListener("resize", handleResize);
});
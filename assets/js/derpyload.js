(function () {
    const loader = document.createElement("div");
    loader.id = "pageLoader";
    loader.style.cssText = `
        position: fixed;
        inset: 0;
        z-index: 999999;
        background: #000;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: #fff;
        font-family: sans-serif;
        transition: opacity 0.45s ease;
    `;

    const loaderImg = document.createElement("img");
    loaderImg.src = "assets/img/derpy-coding.avif";
    loaderImg.alt = "Loading";
    loaderImg.style.cssText = `
        width: 300px;
        height: auto;
        display: block;
        margin-bottom: 16px;
    `;

    const loadingTexts = [
        "載入中，我按對鍵了嗎？",
        "載入中，這個鍵盤好難...",
        "載入中，應該有在動吧？",
        "載入中，再按幾下看看...",
        "載入中，剛剛那個是對的嗎？",
        "載入中，等等...發生什麼事？",
        "載入中，這樣就可以了吧！",
        "載入中，我很會用電腦！(大概吧...)",
        "載入中，不要壞掉拜託...",
        "載入中，快好了！真的！"
    ];

    const randomText = loadingTexts[Math.floor(Math.random() * loadingTexts.length)];

    const loaderText = document.createElement("p");
    loaderText.textContent = randomText;
    loaderText.style.cssText = `
        margin: 0;
        font-size: 20px;
        font-weight: 700;
        color: #fff;
    `;

    loader.appendChild(loaderImg);
    loader.appendChild(loaderText);

    let closed = false;

    function closeLoader() {
        if (closed) return;
        closed = true;
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.remove();
        }, 450);
    }

    function appendLoader() {
        if (!document.body) {
            requestAnimationFrame(appendLoader);
            return;
        }
        document.body.appendChild(loader);
    }

    appendLoader();

    // 預設：等頁面 load 完就關
    window.addEventListener("load", () => {
        // 如果這頁有宣告要等自訂完成事件，就不要立刻關
        if (!window.deferLoaderClose) {
            closeLoader();
        }
    });

    // 讓其他 js 可以手動關閉
    window.closePageLoader = closeLoader;

    // 共用事件：任何頁面都可以 dispatch 這個事件來關閉
    document.addEventListener("pageReady", closeLoader);

    // 保底，避免永遠不消失
    setTimeout(closeLoader, 5000);
})();
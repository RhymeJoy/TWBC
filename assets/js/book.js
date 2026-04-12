document.addEventListener("DOMContentLoaded", () => {
    const pagesData = [
        {
            id: "location",
            title: "活動地點",
            description: "就怕你找不到我們辦在哪",
            extraHTML: `<h4 style="margin: -0.25em 0 0.75em 0; line-height: 1.25;">阿斯生活空間：新北市三重區三和路四段111號10樓 <a style="color: #a54500; text-decoration: none;" href="https://maps.app.goo.gl/Ndx7tYr8oszrk3A26" target="_blank">📍導航</a></h4>`
        },
        {
            id: "vendorsMap",
            title: "商販圖",
            description: "可以提前知曉心儀的物品在哪裡"
        },
        {
            id: "VenueMap",
            title: "場地圖",
            description: "場地的平面圖，方便規劃行程"
        },
        {
            id: "timetable",
            title: "時間軸",
            description: "提供活動的時間安排資訊"
        },
        {
            id: "faq",
            title: "答題書",
            description: "簡單的問題這都能回答"
        }
    ];

    const paperView = document.getElementById("paperViewBook");
    const paperTitle = document.getElementById("paperTitle");
    const paperBody = document.getElementById("paperBody");
    const paperTabs = document.getElementById("paperTabs");

    if (!paperView || !paperTitle || !paperBody || !paperTabs) {
        console.error("book.js: 找不到必要元素");
        return;
    }

    function getBookContent(id) {
        const template = document.getElementById(`book-content-${id}`);
        if (!template) return "<p>尚未填入內容。</p>";
        return template.innerHTML;
    }

    function setURL(id) {
        const url = new URL(window.location);
        url.searchParams.set("id", id);
        window.history.pushState({}, "", url);
    }

    function getURLId() {
        const params = new URLSearchParams(window.location.search);
        return params.get("id");
    }

    function createSparkle(x, y) {
        const sparkle = document.createElement("div");
        sparkle.className = "sparkle";

        const offsetX = (Math.random() - 0.5) * 30;
        const offsetY = (Math.random() - 0.5) * 30;

        sparkle.style.left = `${x + offsetX}px`;
        sparkle.style.top = `${y + offsetY}px`;

        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 600);
    }

    function bindBoxSparkles(scope = document) {
        scope.querySelectorAll(".box").forEach(box => {
            if (box.dataset.sparkleBound === "true") return;
            box.dataset.sparkleBound = "true";

            let interval = null;

            box.addEventListener("mouseenter", () => {
                if (interval) clearInterval(interval);

                interval = setInterval(() => {
                    const rect = box.getBoundingClientRect();
                    const x = rect.left + Math.random() * rect.width;
                    const y = rect.top + Math.random() * rect.height;
                    createSparkle(x, y);
                }, 80);
            });

            box.addEventListener("mouseleave", () => {
                if (interval) {
                    clearInterval(interval);
                    interval = null;
                }
            });
        });
    }

    function bindRouteTriggers(map, scope = document) {
        scope.querySelectorAll(".route-trigger").forEach(el => {
            if (el.dataset.routeBound === "true") return;
            el.dataset.routeBound = "true";

            el.addEventListener("click", (e) => {
                const routeName = e.currentTarget.dataset.route;
                const mapWrap = document.querySelector(".leaflet-wrap");

                if (mapWrap) {
                    mapWrap.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });
                }

                setTimeout(() => {
                    if (map && typeof map.showOnlyRoute === "function" && routeName) {
                        map.showOnlyRoute(routeName, 18);
                    }
                }, 100);
            });
        });
    }

    function renderTabs(currentId) {
        paperTabs.innerHTML = "";

        pagesData.forEach(page => {
            if (page.id === currentId) return;

            const btn = document.createElement("button");
            btn.className = "paper-tab-btn";
            btn.type = "button";
            btn.textContent = page.title;

            btn.addEventListener("click", () => {
                openPage(page.id);
            });

            paperTabs.appendChild(btn);
        });
    }

    function openPage(id, fromPopState = false) {
        const page = pagesData.find(item => item.id === id);
        if (!page) return;

        paperTitle.textContent = page.title;
        const extra = page.extraHTML || "";
        paperBody.innerHTML = extra + getBookContent(page.id);

        renderTabs(page.id);

        if (!fromPopState) {
            setURL(page.id);
        }

        window.currentMap = null;

        bindBoxSparkles(paperBody);

        if (page.id === "location") {
            setTimeout(() => {
                if (typeof initLeafletSection === "function") {
                    const map = initLeafletSection("location");
                    window.currentMap = map;

                    if (map) {
                        setTimeout(() => {
                            map.invalidateSize({ pan: false, animate: false });
                        }, 50);
                    }

                    bindRouteTriggers(map, paperBody);
                    bindBoxSparkles(paperBody);
                }
            }, 120);
        }

        if (typeof window.refreshTopbar === "function") {
            window.refreshTopbar();
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    window.addEventListener("popstate", () => {
        const urlId = getURLId();
        const fallbackId = "location";
        const targetId = pagesData.some(page => page.id === urlId) ? urlId : fallbackId;
        openPage(targetId, true);
    });

    const initialId = getURLId();
    const defaultId = "location";
    const startId = pagesData.some(page => page.id === initialId) ? initialId : defaultId;

    openPage(startId, true);

    if (!initialId) {
        setURL(defaultId);
    }
});

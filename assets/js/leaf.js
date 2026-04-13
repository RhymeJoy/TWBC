document.addEventListener("DOMContentLoaded", () => {
    const vineMenu = document.querySelector(".vine-menu");
    const vineImg = document.querySelector(".vine-img");
    const blur = document.getElementById("blur");

    if (!vineMenu) return;

    const menuItems = [
        { href: "HomePage.html", className: "leaf-home", text: "首頁" },
        { href: "Ticket.html", className: "leaf-ticket", text: "門票" },
        { href: "News.html", className: "leaf-news", text: "最新消息" },
        { href: "About.html", className: "leaf-about", text: "關於我們" },
        { href: "Events.html", className: "leaf-event", text: "活動" },
        { href: "Apply.html", className: "leaf-join", text: "參與" }
    ];

    const toggle = document.createElement("img");
    toggle.src = "assets/img/leafbtn.avif";
    toggle.className = "leaf-toggle";
    toggle.id = "leafToggle";
    toggle.alt = "開啟選單";

    const vine = document.createElement("div");
    vine.className = "vine";
    vine.id = "vine";

    menuItems.forEach(item => {
        const a = document.createElement("a");
        a.href = item.href;
        a.className = `leaf ${item.className}`;
        a.innerHTML = `
            <img src="assets/img/leafbtn.avif" alt="">
            <span>${item.text}</span>
        `;
        vine.appendChild(a);
    });

    vineMenu.appendChild(toggle);
    vineMenu.appendChild(vine);

    let isOpen = false;

    /**
     * 判斷某元素是否不應該被模糊
     * 只要自己是 .noblur，或祖先有 .noblur，都排除
     */
    const isNoBlurElement = (el) => {
        return !!el.closest(".noblur");
    };

    /**
     * 取得 body 直層中所有需要模糊的元素
     */
    const getBlurTargets = () => {
        return [...document.body.children].filter(el => {
            if (el === blur) return false;              // 遮罩本身不模糊
            if (isNoBlurElement(el)) return false;     // 有 noblur 的元素不模糊
            return true;
        });
    };

    const setBlurState = (enabled) => {
        const blurTargets = getBlurTargets();

        blurTargets.forEach(el => {
            el.classList.toggle("blur-active", enabled);
        });

        document.body.classList.toggle("menu-open", enabled);

        if (blur) {
            blur.classList.toggle("active", enabled);
        }
    };

    const openMenu = () => {
        vine.classList.remove("closing");
        vine.classList.add("open");

        toggle.classList.add("active");
        vineMenu.classList.add("active");

        if (vineImg) vineImg.classList.add("active");

        setBlurState(true);
        isOpen = true;
    };

    const closeMenu = () => {
        vine.classList.remove("open");
        vine.classList.remove("closing");
        vine.classList.add("closing");

        toggle.classList.remove("active");
        vineMenu.classList.remove("active");

        if (vineImg) vineImg.classList.remove("active");

        setBlurState(false);
        isOpen = false;
    };

    const toggleMenu = (e) => {
        e.stopPropagation();
        isOpen ? closeMenu() : openMenu();
    };

    toggle.addEventListener("click", toggleMenu);

    if (blur) {
        blur.addEventListener("click", () => {
            if (isOpen) closeMenu();
        });
    }

    document.addEventListener("click", (e) => {
        if (!isOpen) return;
        if (e.target.closest(".noblur")) return;
        closeMenu();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && isOpen) {
            closeMenu();
        }
    });

    vine.addEventListener("animationend", () => {
        if (!isOpen) {
            vine.classList.remove("closing");
        }
    });
});
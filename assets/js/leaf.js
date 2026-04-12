document.addEventListener("DOMContentLoaded", () => {
    const vineMenu = document.querySelector(".vine-menu");
    const vineImg = document.querySelector(".vine-img");
    const blur = document.getElementById("blur");
    const blurTargets = document.querySelectorAll(".page-wrap, .container, .bg");

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

    const setBlurState = (enabled) => {
        blurTargets.forEach(el => {
            el.classList.toggle("blur-active", enabled);
        });
    };

    const openMenu = () => {
        vine.classList.remove("closing");
        vine.classList.add("open");

        toggle.classList.add("active");
        vineMenu.classList.add("active");

        if (vineImg) vineImg.classList.add("active");
        if (blur) blur.classList.add("active");

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
        if (blur) blur.classList.remove("active");

        setBlurState(false);

        isOpen = false;
    };

    toggle.addEventListener("click", (e) => {
        e.stopPropagation();
        isOpen ? closeMenu() : openMenu();
    });

    if (blur) {
        blur.addEventListener("click", () => {
            if (isOpen) closeMenu();
        });
    }

    vine.addEventListener("animationend", () => {
        if (!isOpen) {
            vine.classList.remove("closing");
        }
    });
});
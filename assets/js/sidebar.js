function getUI() {
    return {
        sidebar: document.getElementById("sidebar"),
        overlay: document.getElementById("overlay"),
        menuBtn: document.querySelector(".menu-btn"),
        footer: document.querySelector(".footer")
    };
}

function openSidebar() {
    const { sidebar, overlay, menuBtn, footer } = getUI();

    sidebar.classList.add("active");
    overlay.classList.add("active");
    menuBtn.classList.add("open");
    footer.classList.add("active");
}

function closeSidebar() {
    const { sidebar, overlay, menuBtn, footer } = getUI();

    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    menuBtn.classList.remove("open");
    footer.classList.remove("active");
}

function ToggleSlider() {
    const { sidebar } = getUI();

    if (sidebar.classList.contains("active")) {
        closeSidebar();
    } else {
        openSidebar();
    }
}

function initSidebarState() {
    if (window.innerWidth <= 800) {
        closeSidebar();
    } else {
        const { sidebar, overlay, menuBtn, footer } = getUI();
        sidebar.classList.add("active");
        menuBtn.classList.add("open");
        footer.classList.add("active");
        overlay.classList.add("active");
    }
}

window.addEventListener("load", initSidebarState);
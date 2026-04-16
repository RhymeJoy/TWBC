document.addEventListener("DOMContentLoaded", () => {
    const timetableData = {
        startHour: 9,
        endHour: 23,
        columns: [
            { key: "time-left", label: "" },
            { key: "mane", label: "主舞台", className: "big" },
            { key: "vendor", label: "商販區" },
            { key: "doodle", label: "" },
            { key: "sub", label: "Sub Hall", className: "big" },
            { key: "registration", label: "大廳", className: "big" },
            { key: "art", label: "" },
            { key: "time-right", label: "" }
        ],
        events: [
            { title: "Chill time", column: 2, start: "09:00", end: "10:00", color: "expo-blue", detail: "自由入場與暖場時段。" },
            { title: "Opening Ceremonies", column: 2, start: "10:00", end: "10:30", color: "expo-yellow", detail: "開幕介紹與活動說明。" },
            { title: "Relay Sketches", column: 2, start: "11:00", end: "12:30", color: "expo-blue", detail: "接龍繪圖活動。" },
            { title: "MTB Rehearsal", column: 2, start: "12:30", end: "13:30", color: "expo-blue", detail: "節目彩排。" },
            { title: "Pony Cinema", column: 2, start: "13:30", end: "14:30", color: "expo-blue", detail: "影片放映時段。" },
            { title: "Pony Trivia II", column: 2, start: "14:30", end: "16:00", color: "expo-blue", detail: "問答活動。" },
            { title: "The Master of Pony Songs", column: 2, start: "16:30", end: "18:00", color: "expo-blue", detail: "音樂互動節目。" },
            { title: "Closing Ceremonies", column: 2, start: "18:00", end: "19:00", color: "expo-yellow", detail: "閉幕與感謝。" },
            { title: "Malang the Beat! : DJ Performance", column: 2, start: "19:00", end: "20:30", color: "expo-purple", detail: "DJ 表演。" },
            { title: "Malang Wrap-Up Lounge", column: 2, start: "21:00", end: "23:00", color: "expo-purple", detail: "晚間自由交流。" },

            { title: "Vendor Zone", column: 3, start: "11:00", end: "18:00", color: "expo-pink", vertical: true, detail: "商販區營業時段。" },
            { title: "Doodle Table", column: 4, start: "09:00", end: "20:00", color: "expo-green", vertical: true, detail: "自由塗鴉區。" },

            { title: "Panel Slots", column: 5, start: "11:00", end: "15:30", color: "expo-peach", detail: "Panel 保留時段。" },
            { title: "Malang Drawing Class", column: 5, start: "15:30", end: "17:00", color: "expo-blue", detail: "繪圖教學活動。" },
            { title: "Pony Arcade", column: 5, start: "19:00", end: "20:30", color: "expo-purple", detail: "遊戲活動。" },
            { title: "My Little Karaoke", column: 5, start: "21:00", end: "22:30", color: "expo-purple", detail: "卡拉 OK 時段。" },

            { title: "Registration", column: 6, start: "09:00", end: "18:00", color: "expo-yellow", vertical: true, detail: "報到櫃台。" },
            { title: "Art Gallery & Contest", column: 7, start: "09:00", end: "18:00", color: "expo-green", vertical: true, detail: "展示與比賽區。" }
        ]
    };

    let isBound = false;

    function getEls() {
        const body = document.getElementById("paperBody");
        if (!body) return null;

        return {
            grid: body.querySelector("#expoTimetable"),
            modal: body.querySelector("#expoTtModal"),
            modalBody: body.querySelector("#expoTtModalBody")
        };
    }

    function escapeHtml(str = "") {
        return String(str)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    function timeToHalfHourIndex(time) {
        const [h, m] = time.split(":").map(Number);
        return (h - timetableData.startHour) * 2 + (m >= 30 ? 1 : 0);
    }

    function timeToGridRowStart(time) {
        return 2 + timeToHalfHourIndex(time);
    }

    function timeSpanHalfHours(start, end) {
        return timeToHalfHourIndex(end) - timeToHalfHourIndex(start);
    }

    function areaLabel(column) {
        return timetableData.columns[column - 1]?.label || timetableData.columns[column - 1]?.key || "";
    }

    function renderTimetable() {
        const els = getEls();
        if (!els?.grid) return false;

        let html = "";

        timetableData.columns.forEach((col, index) => {
            if (!col.label) return;
            html += `
                <div class="expo-col-title ${col.className || ""}"
                     style="grid-column:${index + 1}; grid-row:1;">
                    ${escapeHtml(col.label)}
                </div>
            `;
        });

        html += `<div class="expo-slot-bg"></div>`;

        for (let h = timetableData.startHour; h < timetableData.endHour; h++) {
            const row = 2 + (h - timetableData.startHour) * 2;

            html += `
                <div class="expo-time" style="grid-column:1; grid-row:${row} / span 2;">
                    ${String(h).padStart(2, "0")}:00
                </div>
                <div class="expo-time" style="grid-column:8; grid-row:${row} / span 2;">
                    ${String(h).padStart(2, "0")}:00
                </div>
            `;
        }

        timetableData.events.forEach((event, index) => {
            const startRow = timeToGridRowStart(event.start);
            const rowSpan = timeSpanHalfHours(event.start, event.end);
            const cls = `${event.color || "expo-blue"} ${event.vertical ? "vertical" : ""}`;

            html += `
                <button
                    type="button"
                    class="expo-event ${cls}"
                    data-index="${index}"
                    style="grid-column:${event.column}; grid-row:${startRow} / span ${rowSpan};"
                >
                    <span class="title">${escapeHtml(event.title)}</span>
                    ${event.vertical ? "" : `<span class="sub">${escapeHtml(event.start)} - ${escapeHtml(event.end)}</span>`}
                </button>
            `;
        });

        els.grid.innerHTML = html;
        return true;
    }

    function openModal(index) {
        const els = getEls();
        const event = timetableData.events[index];
        if (!els?.modal || !els?.modalBody || !event) return;

        els.modalBody.innerHTML = `
            <h3>${escapeHtml(event.title)}</h3>
            <div class="expo-tt-modal-meta">
                <span>🕒 ${escapeHtml(event.start)} - ${escapeHtml(event.end)}</span>
                <span>📍 區域：${escapeHtml(areaLabel(event.column))}</span>
            </div>
            <p>${escapeHtml(event.detail || "詳細資訊之後補上。")}</p>
        `;

        els.modal.classList.add("show");
        els.modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        const els = getEls();
        if (!els?.modal) return;

        els.modal.classList.remove("show");
        els.modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    function bindEvents() {
        if (isBound) return;
        isBound = true;

        document.addEventListener("click", (e) => {
            const eventBtn = e.target.closest(".expo-event");
            if (eventBtn) {
                openModal(Number(eventBtn.dataset.index));
                return;
            }

            if (e.target.closest("#expoTtModalClose") || e.target.closest("[data-close='true']")) {
                closeModal();
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") closeModal();
        });
    }

    bindEvents();

    let tries = 0;
    const timer = setInterval(() => {
        tries++;
        if (renderTimetable() || tries > 20) {
            clearInterval(timer);
        }
    }, 200);
});
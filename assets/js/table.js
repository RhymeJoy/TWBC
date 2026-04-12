const table = document.querySelector('.compare-table');

if (table) {
    const rows = [...table.querySelectorAll('tbody tr')];
    const heads = [...table.querySelectorAll('thead .tier-head')];
    const allCells = [...table.querySelectorAll('tbody td')];
    const allThs = [...table.querySelectorAll('th')];

    // 先幫每個 tier-head 補上 data-col，避免之後靠 nth-child 猜
    heads.forEach((head, index) => {
        head.dataset.col = index + 1;
    });

    function clearActive() {
        table.classList.remove('is-hovering');

        rows.forEach(row => row.classList.remove('active-row'));
        allCells.forEach(cell => cell.classList.remove('active-col'));
        allThs.forEach(th => th.classList.remove('active-col'));
    }

    function activateRow(row) {
        rows.forEach(r => r.classList.remove('active-row'));
        row.classList.add('active-row');
    }

    function activateColumn(colNumber) {
        allCells.forEach(cell => {
            cell.classList.toggle('active-col', cell.dataset.col === String(colNumber));
        });

        heads.forEach(head => {
            head.classList.toggle('active-col', head.dataset.col === String(colNumber));
        });
    }

    function startHover() {
        table.classList.add('is-hovering');
    }

    // hover td：列 + 欄 都亮
    allCells.forEach(cell => {
        cell.addEventListener('mouseenter', () => {
            const row = cell.closest('tr');
            const colNumber = cell.dataset.col;

            clearActive();
            startHover();
            activateRow(row);
            activateColumn(colNumber);
        });
    });

    // hover feature-name：整列亮
    rows.forEach(row => {
        const feature = row.querySelector('.feature-name');
        if (!feature) return;

        feature.addEventListener('mouseenter', () => {
            clearActive();
            startHover();
            activateRow(row);
        });
    });

    // hover tier-head：整欄亮
    heads.forEach(head => {
        head.addEventListener('mouseenter', () => {
            const colNumber = head.dataset.col;

            clearActive();
            startHover();
            activateColumn(colNumber);
        });
    });

    table.addEventListener('mouseleave', clearActive);
}
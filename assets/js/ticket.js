let current = 1;

const btn = document.getElementById('btn');
const section1 = document.getElementById('section1');
const section2 = document.getElementById('section2');

// 初始化
update();

btn.addEventListener('click', () => {
    current = current === 1 ? 2 : 1;
    update();
});

function update() {
    if (current === 1) {
        btn.textContent = '查看表格';
        section1.classList.add('show');
        section1.classList.remove('hidden');

        section2.classList.add('hidden');
        section2.classList.remove('show');
    } else {
        btn.textContent = '查看詳細';
        section2.classList.add('show');
        section2.classList.remove('hidden');

        section1.classList.add('hidden');
        section1.classList.remove('show');
    }
}

const purchaseBtn = document.getElementById('purchase');

purchaseBtn.addEventListener('click', () => {
    window.open("https://docs.google.com/forms/d/e/1FAIpQLScQfsnO2xAn2_6HeFo4kghgGDsYjoyk57KowrEsRyrBtYE0LQ/viewform", "_blank");
});
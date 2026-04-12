function initParallax() {
    const bg = document.getElementById('bg');
    const bg2 = document.getElementById('bg2');

    function update() {
        // 1. 計算網頁目前的滾動百分比 (0 到 1)
        const scrollTop = window.scrollY || window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight;
        const winHeight = window.innerHeight;
        
        // 避免分母為 0 (內容不足一屏時)
        const scrollPercent = docHeight > winHeight 
            ? scrollTop / (docHeight - winHeight) 
            : 0;

        // 2. 處理背景圖 (bg)
        if (bg) {
            // 我們要讓圖片在容器內移動
            // 圖片高度是 110vh (由你的 CSS 定義)
            // 容器高度是 100vh (視窗高度)
            // 圖片多出來的位移空間 = 圖片高度 - 容器高度
            // 但因為你用了 transform scale，建議直接控制 background-position 最穩
            
            // 這裡使用百分比定位：0% 是頂部切齊，100% 是底部切齊
            bg.style.backgroundPosition = `center ${scrollPercent * 100}%`;
        }

        // 3. 處理前景圖 (bg2) 
        // 如果你想維持目前的 translateY 感覺，但要它自動適應：
        if (bg2) {
            // 假設 bg2 縮放後比視窗高，我們讓它從頂滾到底
            // 這裡示範用 backgroundPosition 達成你的需求，這是最簡單且適應性最強的做法
            bg2.style.backgroundPosition = `center ${scrollPercent * 100}%`;
        }
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update); // 視窗縮放時重新計算
    update();
}

document.addEventListener('DOMContentLoaded', initParallax);
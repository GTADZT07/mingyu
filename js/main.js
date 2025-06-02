// 主要功能
document.addEventListener('DOMContentLoaded', () => {
    // 初始化右滑切换功能
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 100;
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                // 右滑，显示评论区
                document.getElementById('commentsSection').style.transform = 'translateX(0)';
            } else {
                // 左滑，隐藏评论区
                document.getElementById('commentsSection').style.transform = 'translateX(100%)';
            }
        }
    }

    // 初始化评论区位置
    document.getElementById('commentsSection').style.transform = 'translateX(100%)';
}); 
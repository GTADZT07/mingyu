// 主题管理
const theme = {
    currentTheme: localStorage.getItem('theme') || 'light',
    
    // 初始化主题
    init() {
        this.applyTheme();
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());
    },

    // 切换主题
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.currentTheme);
        this.applyTheme();
    },

    // 应用主题
    applyTheme() {
        document.body.className = `${this.currentTheme}-theme`;
        const themeButton = document.getElementById('themeToggle');
        themeButton.textContent = this.currentTheme === 'light' ? '🌙' : '☀️';
    }
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => theme.init()); 
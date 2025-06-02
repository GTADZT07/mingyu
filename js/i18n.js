// 语言设置
const i18n = {
    currentLang: localStorage.getItem('language') || 'zh',
    
    // 初始化语言
    init() {
        this.updateLanguage();
        document.getElementById('langToggle').addEventListener('click', () => this.toggleLanguage());
    },

    // 切换语言
    toggleLanguage() {
        this.currentLang = this.currentLang === 'zh' ? 'en' : 'zh';
        localStorage.setItem('language', this.currentLang);
        this.updateLanguage();
    },

    // 更新页面语言
    updateLanguage() {
        const elements = document.querySelectorAll('.i18n');
        elements.forEach(element => {
            const key = element.getAttribute(`data-${this.currentLang}`);
            if (key) {
                element.textContent = key;
            }
        });

        // 更新语言切换按钮文本
        document.getElementById('langToggle').textContent = this.currentLang === 'zh' ? 'EN' : '中';
    }
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => i18n.init()); 
// 管理员后台
const admin = {
    pageUpCount: 0,
    adminCredentials: {
        username: 'GTADZT',
        password: 'ASD246246'
    },
    
    // 初始化管理员功能
    init() {
        this.setupKeyboardListener();
        this.setupLoginListener();
    },

    // 设置键盘监听
    setupKeyboardListener() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'PageUp') {
                this.pageUpCount++;
                if (this.pageUpCount >= 5) {
                    this.showAdminModal();
                    this.pageUpCount = 0;
                }
            } else {
                this.pageUpCount = 0;
            }
        });
    },

    // 设置登录监听
    setupLoginListener() {
        document.getElementById('adminLogin').addEventListener('click', () => this.handleLogin());
    },

    // 显示管理员登录模态框
    showAdminModal() {
        const modal = document.getElementById('adminModal');
        modal.style.display = 'block';
    },

    // 隐藏管理员登录模态框
    hideAdminModal() {
        const modal = document.getElementById('adminModal');
        modal.style.display = 'none';
    },

    // 处理登录
    handleLogin() {
        const username = document.getElementById('adminUsername').value;
        const password = document.getElementById('adminPassword').value;

        if (username === this.adminCredentials.username && 
            password === this.adminCredentials.password) {
            this.hideAdminModal();
            this.showAdminPanel();
        } else {
            alert('用户名或密码错误');
        }
    },

    // 显示管理员面板
    showAdminPanel() {
        // 这里可以添加管理员面板的具体实现
        console.log('管理员登录成功');
    }
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => admin.init()); 
// 评论系统
const comments = {
    apiUrl: 'http://66.112.211.213:8000/api/comment', // 评论系统API地址
    
    // 初始化评论系统
    init() {
        this.loadComments();
        this.setupEventListeners();
    },

    // 设置事件监听
    setupEventListeners() {
        document.getElementById('submitComment').addEventListener('click', () => this.submitComment());
    },

    // 加载评论
    async loadComments() {
        try {
            const response = await fetch(this.apiUrl);
            const data = await response.json();
            this.renderComments(data);
        } catch (error) {
            console.error('加载评论失败:', error);
        }
    },

    // 渲染评论列表
    renderComments(comments) {
        const container = document.querySelector('.comments-container');
        container.innerHTML = comments.map(comment => this.createCommentElement(comment)).join('');
    },

    // 创建评论元素
    createCommentElement(comment) {
        return `
            <div class="comment" data-id="${comment.id}">
                <div class="comment-header">
                    <span class="username">${comment.username}</span>
                    <span class="time">${new Date(comment.timestamp).toLocaleString()}</span>
                </div>
                <div class="comment-content">${comment.content}</div>
                <div class="comment-actions">
                    <button class="like-btn" data-id="${comment.id}">
                        <span class="i18n" data-zh="点赞" data-en="Like">点赞</span> (${comment.likes})
                    </button>
                    <button class="reply-btn" data-id="${comment.id}">
                        <span class="i18n" data-zh="回复" data-en="Reply">回复</span>
                    </button>
                </div>
            </div>
        `;
    },

    // 提交评论
    async submitComment() {
        const content = document.getElementById('commentInput').value.trim();
        if (!content) return;

        const username = localStorage.getItem('username');
        if (!username) {
            this.showUsernameModal();
            return;
        }

        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content,
                    username,
                    timestamp: new Date().toISOString()
                })
            });

            if (response.ok) {
                document.getElementById('commentInput').value = '';
                this.loadComments();
            }
        } catch (error) {
            console.error('提交评论失败:', error);
        }
    },

    // 显示用户名设置模态框
    showUsernameModal() {
        // 这里可以添加用户名设置模态框的逻辑
        alert('请先设置用户名');
    }
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => comments.init()); 
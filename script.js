// 等待 DOM 加载完毕
document.addEventListener('DOMContentLoaded', () => {
    // 获取所有导航项和所有页面
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');

    // 页面切换函数
    function switchPage(pageId) {
        // 隐藏所有页面
        pages.forEach(page => {
            page.classList.remove('active');
        });
        // 显示选中的页面
        const activePage = document.getElementById(pageId);
        if (activePage) {
            activePage.classList.add('active');
        }
        // 更新底部导航的 active 样式
        navItems.forEach(item => {
            const targetPage = item.getAttribute('data-page');
            if (targetPage === pageId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // 为每个导航项绑定点击事件
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const targetPage = item.getAttribute('data-page');
            if (targetPage) {
                switchPage(targetPage);
            }
        });
    });

    // ------- 副本板块的简单交互（符合恐怖风格，模拟文本变化）-------
    const exploreBtn = document.querySelector('.explore-btn');
    const escapeBtn = document.querySelector('.escape-btn');
    const eventLog = document.querySelector('.event-log p');

    if (exploreBtn && escapeBtn && eventLog) {
        // 预置一些恐怖事件文本
        const exploreEvents = [
            '🔦 你推开了病房的门，病床上坐着一个穿白裙的女孩...她慢慢转过头。',
            '🩸 走廊的灯光骤然熄灭，只有远处的应急灯忽明忽暗，你似乎听到了脚步声。',
            '📻 收音机突然传出刺耳的杂音，夹杂着“快逃...快逃...”的低语。',
            '🕯️ 你在拐角处捡到一本日记，上面的字迹模糊，最后一页写着“它就在你身后”。',
            '🚪 所有门都消失了，墙壁上出现了无数道抓痕。'
        ];
        const escapeEvents = [
            '💨 你疯狂奔跑，似乎甩掉了那个东西，但理智值下降了一些。',
            '🔁 你试图离开，却发现自己又回到了原点，回廊是无限的...',
            '👁️ 一扇铁门突然出现在墙上，你毫不犹豫钻了进去，暂时安全。',
            '🌫️ 浓雾弥漫，你迷失了方向，但侥幸没遇到那个“它”。',
            '🔮 你触碰了一个诡异的雕像，瞬间被传送到另一个诡异空间。'
        ];

        exploreBtn.addEventListener('click', () => {
            const randomIndex = Math.floor(Math.random() * exploreEvents.length);
            eventLog.innerHTML = `📜 事件记录：${exploreEvents[randomIndex]}`;
            // 添加一点动态闪烁效果
            eventLog.style.opacity = '0.7';
            setTimeout(() => { eventLog.style.opacity = '1'; }, 100);
        });

        escapeBtn.addEventListener('click', () => {
            const randomIndex = Math.floor(Math.random() * escapeEvents.length);
            eventLog.innerHTML = `🚪 逃离尝试：${escapeEvents[randomIndex]}`;
            eventLog.style.transform = 'translateX(2px)';
            setTimeout(() => { eventLog.style.transform = 'none'; }, 150);
        });
    }

    // 奖池轮盘简单弹窗（保留可扩展）
    const lotteryBtn = document.querySelector('.lottery-spin');
    if (lotteryBtn) {
        lotteryBtn.addEventListener('click', () => {
            const rewards = ['⚰️ 生锈的护符', '🕸️ 诅咒绷带', '🔮 灵视药水', '📜 残缺的笔记', '🧠 理智碎片 x3'];
            const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
            alert(`轮盘缓缓停止...\n你获得了：${randomReward}`);
        });
    }

    // 好友码复制
    const copyBtn = document.querySelector('.copy-code');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const friendCode = document.querySelector('.friend-code span')?.innerText;
            if (friendCode) {
                navigator.clipboard.writeText(friendCode).then(() => {
                    alert('邀请码已复制：' + friendCode);
                }).catch(() => {
                    alert('手动复制吧：' + friendCode);
                });
            }
        });
    }

    // 可选：额外的控制台提示，保持气氛
    console.log('%c⚠️ 你感受到了注视...', 'color: #9c4a3a; font-size: 16px;');
});
// ========== 时间更新 ==========
function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeStr = `🕸️ ${hours}:${minutes}:${seconds}`;
    const timeElements = document.querySelectorAll('.status-time');
    timeElements.forEach(el => {
        if (el) el.textContent = timeStr;
    });
}
setInterval(updateTime, 1000);
updateTime();

// ========== 理智碎片存储 ==========
let sanityShards = localStorage.getItem('sanityShards');
if (sanityShards === null) {
    sanityShards = 100;
    localStorage.setItem('sanityShards', sanityShards);
} else {
    sanityShards = parseInt(sanityShards);
}

function updateShardsDisplay() {
    const shardsElements = document.querySelectorAll('.resource-value');
    shardsElements.forEach(el => {
        if (el && el.id === 'shardsValue') {
            el.textContent = sanityShards;
        }
    });
}

// ========== 背包存储 ==========
let backpack = JSON.parse(localStorage.getItem('backpack') || '[]');

function saveBackpack() {
    localStorage.setItem('backpack', JSON.stringify(backpack));
}

function addToBackpack(item) {
    backpack.push(item);
    saveBackpack();
}

// ========== 事件记录存储 ==========
let eventLog = JSON.parse(localStorage.getItem('eventLog') || '[]');

function addEvent(message) {
    const now = new Date();
    const timeStr = `${now.getMonth()+1}/${now.getDate()} ${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}:${now.getSeconds().toString().padStart(2,'0')}`;
    eventLog.unshift({ time: timeStr, message: message });
    if (eventLog.length > 50) eventLog.pop();
    localStorage.setItem('eventLog', JSON.stringify(eventLog));
}

function renderEventLog() {
    const eventList = document.querySelector('.event-list');
    if (eventList) {
        eventList.innerHTML = eventLog.map(e => 
            `<li><span class="event-time">[${e.time}]</span> ${e.message}</li>`
        ).join('');
        if (eventLog.length === 0) {
            eventList.innerHTML = '<li>暂无事件记录，开始探索吧...</li>';
        }
    }
}

// ========== 副本进度存储 ==========
let unlockedDungeons = JSON.parse(localStorage.getItem('unlockedDungeons') || '["废弃病栋"]');
let completedDungeons = JSON.parse(localStorage.getItem('completedDungeons') || '[]');

function saveUnlockedDungeons() {
    localStorage.setItem('unlockedDungeons', JSON.stringify(unlockedDungeons));
}

// ========== 导航栏点击高亮 ==========
function setActiveNav(currentPage) {
    const navItems = document.querySelectorAll('.nav-item');
    const pageMap = {
        'forum': 0, 'index': 1, 'dungeon': 1, 'shop': 2, 'lottery': 3, 'mail': 4, 'friend': 5, 'backpack': 1
    };
    let index = pageMap[currentPage] || 1;
    navItems.forEach((item, i) => {
        if (i === index) item.classList.add('active');
        else item.classList.remove('active');
    });
}

// ========== 购买物品 ==========
function buyItem(itemName, price, itemIcon, itemDesc) {
    if (sanityShards >= price) {
        sanityShards -= price;
        localStorage.setItem('sanityShards', sanityShards);
        updateShardsDisplay();
        addToBackpack({ name: itemName, icon: itemIcon, desc: itemDesc });
        addEvent(`购买了 ${itemName}，消耗 ${price} 理智碎片`);
        alert(`购买成功！获得：${itemName}\n已放入背包`);
        return true;
    } else {
        alert(`理智碎片不足！需要 ${price} 理智碎片`);
        return false;
    }
}

// ========== 使用物品 ==========
function useItem(item, index) {
    if (item.name === '镇定剂') {
        sanityShards += 10;
        localStorage.setItem('sanityShards', sanityShards);
        updateShardsDisplay();
        addEvent(`使用了镇定剂，理智碎片 +10`);
        alert(`使用了镇定剂，获得 10 理智碎片`);
        backpack.splice(index, 1);
        saveBackpack();
    } else if (item.name === '护身符') {
        addEvent(`使用了护身符，下次探索必定获得稀有物品`);
        alert(`护身符已生效，下次探索时会有好运！`);
        backpack.splice(index, 1);
        saveBackpack();
    } else if (item.name === '手摇手电筒') {
        addEvent(`使用了手摇手电筒，周围亮了一些...`);
        alert(`手电筒照亮了周围，但你感觉有什么东西在暗处移动`);
        backpack.splice(index, 1);
        saveBackpack();
    } else if (item.name === '生锈的十字架') {
        addEvent(`你拿出了生锈的十字架，周围的低语声暂时消失了`);
        alert(`十字架发出微弱的光芒，你感到一阵安心`);
        backpack.splice(index, 1);
        saveBackpack();
    } else if (item.name === '神秘符文石') {
        addEvent(`符文石上的符号开始发光... 理智碎片 +5`);
        sanityShards += 5;
        localStorage.setItem('sanityShards', sanityShards);
        updateShardsDisplay();
        alert(`符文石碎裂，你获得了 5 理智碎片`);
        backpack.splice(index, 1);
        saveBackpack();
    } else {
        alert(`这个物品暂时无法使用`);
    }
}

// 页面加载时执行
document.addEventListener('DOMContentLoaded', () => {
    updateShardsDisplay();
    renderEventLog();
    
    // 头像和齿轮点击
    const avatar = document.querySelector('.player-avatar');
    const settingsIcon = document.querySelector('.settings-icon');
    const playerStats = document.querySelector('.player-stats');
    
    if (avatar) avatar.addEventListener('click', () => window.location.href = 'pages/profile.html');
    if (playerStats) playerStats.addEventListener('click', () => window.location.href = 'pages/profile.html');
    if (settingsIcon) settingsIcon.addEventListener('click', () => window.location.href = 'pages/settings.html');
    
    // 判断当前页面设置导航高亮
    const path = window.location.pathname;
    if (path.includes('forum.html')) setActiveNav('forum');
    else if (path.includes('shop.html')) setActiveNav('shop');
    else if (path.includes('lottery.html')) setActiveNav('lottery');
    else if (path.includes('mail.html')) setActiveNav('mail');
    else if (path.includes('friend.html')) setActiveNav('friend');
    else if (path.includes('backpack.html')) setActiveNav('backpack');
    else setActiveNav('index');
});

// ========== 游戏配置 ==========
const SIZE = 10;
let playerX = 9;
let playerY = 9;
let cells = [];
// 新增：存储路径历史，最多5个
let pathHistory = [];
const MAX_PATH_LENGTH = 5;

const gameContainer = document.getElementById('game');

// ========== 生成 10x10 格子 ==========
function initGrid() {
    for (let y = 0; y < SIZE; y++) {
        for (let x = 0; x < SIZE; x++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            // 存储格子坐标，方便后续判断
            cell.dataset.x = x;
            cell.dataset.y = y;
            gameContainer.appendChild(cell);
            cells.push(cell);
        }
    }
    updatePlayer();
}

// ========== 更新玩家位置 ==========
function updatePlayer() {
    // 移除所有玩家和路径样式
    cells.forEach(c => {
        c.classList.remove('player');
        c.classList.remove('path');
    });
    
    // 更新路径样式：路径格子设为灰色
    pathHistory.forEach(pos => {
        const index = pos.y * SIZE + pos.x;
        cells[index].classList.add('path');
    });
    
    // 更新玩家位置样式
    const playerIndex = playerY * SIZE + playerX;
    cells[playerIndex].classList.add('player');
}

// ========== 记录路径 ==========
function recordPath() {
    // 将当前玩家位置加入路径（移动前的位置）
    pathHistory.push({ x: playerX, y: playerY });
    // 超出最大长度则删除最前面的（最旧的）
    if (pathHistory.length > MAX_PATH_LENGTH) {
        pathHistory.shift();
    }
}

// ========== 键盘控制 ==========
document.addEventListener('keydown', (e) => {
    // 先记录当前位置（移动前）作为路径
    recordPath();
    
    // 移动逻辑（和之前一致）
    switch (e.key.toLowerCase()) {
        case 'w':
            if (playerY > 0) playerY--;
            break;
        case 's':
            if (playerY < SIZE - 1) playerY++;
            break;
        case 'a':
            if (playerX > 0) playerX--;
            break;
        case 'd':
            if (playerX < SIZE - 1) playerX++;
            break;
        default:
            // 非方向键不记录路径
            pathHistory.pop();
            return;
    }
    
    // 更新玩家和路径显示
    updatePlayer();
});

// 启动游戏
initGrid();
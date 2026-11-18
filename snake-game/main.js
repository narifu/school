/**
 * Snake game view/controller: canvas rendering, input, overlays, persistence.
 * Requires game.js (window.SnakeGame) to be loaded first.
 */
(function () {
  'use strict';

  var SnakeGame = window.SnakeGame;
  if (!SnakeGame) {
    return;
  }

  var COLS = 20;
  var ROWS = 20;
  var CELL = 24;
  var BOARD_W = COLS * CELL;
  var BOARD_H = ROWS * CELL;
  var SWIPE_MIN = 20;
  var BEST_KEY = 'snake.bestScore';

  var params = new URLSearchParams(window.location.search);
  var DEBUG = params.get('debug') === '1';
  var seedParam = params.get('seed');
  var seed = seedParam !== null && seedParam !== '' ? Number(seedParam) : undefined;

  var canvas = document.getElementById('game-canvas');
  var ctx = canvas.getContext('2d');
  var board = document.getElementById('board');
  var overlay = document.getElementById('overlay');
  var overlayKicker = document.getElementById('overlay-kicker');
  var overlayTitle = document.getElementById('overlay-title');
  var overlayMessage = document.getElementById('overlay-message');
  var startBtn = document.getElementById('start-btn');
  var restartBtn = document.getElementById('restart-btn');
  var pauseBtn = document.getElementById('pause-btn');
  var scoreEl = document.getElementById('score-value');
  var bestEl = document.getElementById('best-value');
  var statusEl = document.getElementById('status');
  var dpad = document.getElementById('dpad');

  function loadBest() {
    try {
      var value = Number(window.localStorage.getItem(BEST_KEY));
      return Number.isFinite(value) && value > 0 ? Math.floor(value) : 0;
    } catch (error) {
      return 0;
    }
  }

  function saveBest(value) {
    try {
      window.localStorage.setItem(BEST_KEY, String(value));
    } catch (error) {
      /* storage may be unavailable (private mode / file://); not fatal */
    }
  }

  var storedBest = loadBest();
  var game = SnakeGame.createGame({
    seed: seed,
    cols: COLS,
    rows: ROWS,
    initialBest: storedBest,
  });
  var viewPhase = 'ready';
  var accumulator = 0;
  var lastTimestamp = 0;
  var rafId = null;
  var swipeStart = null;

  /* ---------------- Canvas rendering ---------------- */

  function sizeCanvas() {
    var dpr = Math.min(window.devicePixelRatio || 1, 3);
    canvas.width = Math.round(BOARD_W * dpr);
    canvas.height = Math.round(BOARD_H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function roundRect(x, y, width, height, radius) {
    var r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + width, y, x + width, y + height, r);
    ctx.arcTo(x + width, y + height, x, y + height, r);
    ctx.arcTo(x, y + height, x, y, r);
    ctx.arcTo(x, y, x + width, y, r);
    ctx.closePath();
  }

  function interpolateColor(from, to, t) {
    var r = Math.round(from[0] + (to[0] - from[0]) * t);
    var g = Math.round(from[1] + (to[1] - from[1]) * t);
    var b = Math.round(from[2] + (to[2] - from[2]) * t);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  function drawBoard() {
    ctx.fillStyle = '#060a14';
    ctx.fillRect(0, 0, BOARD_W, BOARD_H);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.045)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (var x = 0; x <= COLS; x++) {
      ctx.moveTo(x * CELL + 0.5, 0);
      ctx.lineTo(x * CELL + 0.5, BOARD_H);
    }
    for (var y = 0; y <= ROWS; y++) {
      ctx.moveTo(0, y * CELL + 0.5);
      ctx.lineTo(BOARD_W, y * CELL + 0.5);
    }
    ctx.stroke();
  }

  function drawFood(food) {
    if (!food) return;
    var fx = (food.x + 0.5) * CELL;
    var fy = (food.y + 0.5) * CELL;
    var radius = CELL * 0.31;
    var gradient = ctx.createRadialGradient(
      fx - radius * 0.35,
      fy - radius * 0.35,
      radius * 0.15,
      fx,
      fy,
      radius
    );
    gradient.addColorStop(0, '#ffd9de');
    gradient.addColorStop(0.45, '#ff6377');
    gradient.addColorStop(1, '#c8243c');
    ctx.save();
    ctx.shadowColor = 'rgba(255, 99, 119, 0.7)';
    ctx.shadowBlur = 14;
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(fx, fy, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  var TAIL_COLOR = [27, 122, 78];
  var HEAD_COLOR = [86, 244, 162];

  function drawSnake(snake, direction) {
    if (!snake.length) return;
    var total = Math.max(snake.length - 1, 1);

    for (var i = snake.length - 1; i >= 0; i--) {
      var segment = snake[i];
      var t = 1 - i / total;
      if (i === 0) {
        ctx.save();
        ctx.shadowColor = 'rgba(86, 244, 162, 0.55)';
        ctx.shadowBlur = 12;
        ctx.fillStyle = interpolateColor(HEAD_COLOR, HEAD_COLOR, 0);
        roundRect(segment.x * CELL + 1.5, segment.y * CELL + 1.5, CELL - 3, CELL - 3, 8);
        ctx.fill();
        ctx.restore();
      } else {
        ctx.fillStyle = interpolateColor(TAIL_COLOR, HEAD_COLOR, t);
        roundRect(segment.x * CELL + 2, segment.y * CELL + 2, CELL - 4, CELL - 4, 7);
        ctx.fill();
      }
    }

    // Eyes on the head, offset towards the current direction.
    var head = snake[0];
    var dx = 0;
    var dy = 0;
    if (direction === 'up') dy = -1;
    else if (direction === 'down') dy = 1;
    else if (direction === 'left') dx = -1;
    else dx = 1;
    var cx = (head.x + 0.5) * CELL;
    var cy = (head.y + 0.5) * CELL;
    var forward = CELL * 0.16;
    var side = CELL * 0.18;
    var eyeRadius = CELL * 0.09;
    ctx.fillStyle = '#062012';
    ctx.beginPath();
    ctx.arc(cx + dx * forward - dy * side, cy + dy * forward + dx * side, eyeRadius, 0, Math.PI * 2);
    ctx.arc(cx + dx * forward + dy * side, cy + dy * forward - dx * side, eyeRadius, 0, Math.PI * 2);
    ctx.fill();
  }

  function render(state) {
    drawBoard();
    drawFood(state.food);
    drawSnake(state.snake, state.direction);
  }

  /* ---------------- View state ---------------- */

  function statusText() {
    if (viewPhase === 'ready') return '准备开始';
    if (viewPhase === 'running') return '游戏进行中';
    if (viewPhase === 'paused') return '已暂停';
    if (viewPhase === 'won') return '恭喜通关';
    return '游戏结束';
  }

  function updateHud(state) {
    scoreEl.textContent = String(state.score);
    bestEl.textContent = String(Math.max(state.best, storedBest));
    pauseBtn.disabled = viewPhase !== 'running' && viewPhase !== 'paused';
    pauseBtn.textContent = viewPhase === 'paused' ? '继续' : '暂停';
    statusEl.textContent = statusText();
  }

  function syncOverlay(state) {
    var show = viewPhase !== 'running';
    overlay.hidden = !show;
    if (!show) return;

    startBtn.hidden = false;
    restartBtn.hidden = true;

    if (viewPhase === 'ready') {
      overlayKicker.textContent = '准备好了吗？';
      overlayTitle.textContent = '贪吃蛇';
      overlayMessage.textContent = '方向键 / WASD 控制方向，空格暂停';
      startBtn.textContent = '开始游戏';
    } else if (viewPhase === 'paused') {
      overlayKicker.textContent = '休息一下';
      overlayTitle.textContent = '已暂停';
      overlayMessage.textContent = '按空格或点击继续';
      startBtn.textContent = '继续';
    } else if (viewPhase === 'won') {
      overlayKicker.textContent = '太厉害了';
      overlayTitle.textContent = '通关！';
      overlayMessage.textContent = '你填满了整个棋盘，得分 ' + state.score;
      startBtn.hidden = true;
      restartBtn.hidden = false;
    } else {
      overlayKicker.textContent = '本局得分';
      overlayTitle.textContent = '游戏结束';
      overlayMessage.textContent =
        '得分 ' + state.score + ' · 最高分 ' + Math.max(state.best, storedBest);
      startBtn.hidden = true;
      restartBtn.hidden = false;
    }
  }

  function refresh() {
    var state = game.getState();
    if (state.best > storedBest) {
      storedBest = state.best;
      saveBest(storedBest);
    }
    render(state);
    updateHud(state);
    syncOverlay(state);
    return state;
  }

  /* ---------------- Game flow ---------------- */

  function startGame() {
    if (viewPhase === 'paused') {
      resumeGame();
      return;
    }
    if (viewPhase === 'over' || viewPhase === 'won') {
      restartGame();
      return;
    }
    game.start();
    viewPhase = 'running';
    accumulator = 0;
    lastTimestamp = 0;
    refresh();
  }

  function restartGame() {
    game.restart();
    viewPhase = 'running';
    accumulator = 0;
    lastTimestamp = 0;
    refresh();
  }

  function pauseGame() {
    if (viewPhase !== 'running') return;
    viewPhase = 'paused';
    refresh();
  }

  function resumeGame() {
    if (viewPhase !== 'paused') return;
    viewPhase = 'running';
    accumulator = 0;
    lastTimestamp = 0;
    refresh();
  }

  function togglePause() {
    if (viewPhase === 'running') pauseGame();
    else if (viewPhase === 'paused') resumeGame();
  }

  function handleStep() {
    var state = game.getState();
    if (state.phase === 'over' || state.phase === 'won') {
      viewPhase = state.phase;
      refresh();
      return true;
    }
    if (state.best > storedBest || state.score > storedBest) {
      storedBest = Math.max(state.best, state.score);
      saveBest(storedBest);
    }
    updateHud(state);
    return false;
  }

  function frame(timestamp) {
    rafId = window.requestAnimationFrame(frame);

    if (viewPhase !== 'running') {
      lastTimestamp = timestamp;
      return;
    }
    if (!lastTimestamp) lastTimestamp = timestamp;

    var delta = Math.min(timestamp - lastTimestamp, 250);
    lastTimestamp = timestamp;
    accumulator += delta;

    var guard = 0;
    while (viewPhase === 'running' && guard < 10) {
      guard += 1;
      var state = game.getState();
      if (accumulator < state.tickMs) break;
      accumulator -= state.tickMs;
      game.step();
      if (handleStep()) break;
    }

    render(game.getState());
    updateHud(game.getState());
  }

  /* ---------------- Input ---------------- */

  var KEY_DIRECTIONS = {
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right',
    w: 'up',
    W: 'up',
    a: 'left',
    A: 'left',
    s: 'down',
    S: 'down',
    d: 'right',
    D: 'right',
  };

  function onKeyDown(event) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    var dir = KEY_DIRECTIONS[event.key];
    if (dir) {
      event.preventDefault();
      if (viewPhase === 'running') game.setDirection(dir);
      return;
    }
    if (event.key === ' ' || event.key === 'Spacebar' || event.code === 'Space') {
      event.preventDefault();
      if (viewPhase === 'ready') startGame();
      else togglePause();
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      if (viewPhase === 'ready') startGame();
      else if (viewPhase === 'over' || viewPhase === 'won') restartGame();
      return;
    }
    if (event.key === 'p' || event.key === 'P') {
      event.preventDefault();
      togglePause();
    }
  }

  function onTouchStart(event) {
    if (event.touches.length !== 1) return;
    var touch = event.touches[0];
    swipeStart = { x: touch.clientX, y: touch.clientY };
  }

  function onTouchMove(event) {
    if (event.cancelable) event.preventDefault();
  }

  function onTouchEnd(event) {
    if (!swipeStart) return;
    var touch = event.changedTouches[0];
    var dx = touch.clientX - swipeStart.x;
    var dy = touch.clientY - swipeStart.y;
    swipeStart = null;
    if (viewPhase !== 'running') return;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < SWIPE_MIN) return;
    if (Math.abs(dx) > Math.abs(dy)) {
      game.setDirection(dx > 0 ? 'right' : 'left');
    } else {
      game.setDirection(dy > 0 ? 'down' : 'up');
    }
  }

  window.addEventListener('keydown', onKeyDown);
  canvas.addEventListener('touchstart', onTouchStart, { passive: true });
  canvas.addEventListener('touchmove', onTouchMove, { passive: false });
  canvas.addEventListener('touchend', onTouchEnd, { passive: true });
  window.addEventListener('resize', function () {
    sizeCanvas();
    render(game.getState());
  });
  document.addEventListener('visibilitychange', function () {
    if (document.hidden && viewPhase === 'running') pauseGame();
  });

  startBtn.addEventListener('click', startGame);
  restartBtn.addEventListener('click', restartGame);
  pauseBtn.addEventListener('click', togglePause);

  if (dpad) {
    dpad.addEventListener('click', function (event) {
      var button = event.target.closest('[data-dir]');
      if (!button) return;
      if (viewPhase !== 'running') return;
      game.setDirection(button.getAttribute('data-dir'));
    });
  }

  /* ---------------- Debug hook (E2E only) ---------------- */

  if (DEBUG) {
    window.__snake = {
      getState: function () {
        var state = game.getState();
        state.viewPhase = viewPhase;
        return state;
      },
      tick: function (count) {
        var steps = Number(count) > 0 ? Math.floor(Number(count)) : 1;
        var done = 0;
        for (var i = 0; i < steps; i++) {
          var before = game.getState();
          if (before.phase !== 'running') break;
          game.step();
          done += 1;
          var after = game.getState();
          if (after.phase === 'over' || after.phase === 'won') {
            viewPhase = after.phase;
            break;
          }
        }
        refresh();
        var result = game.getState();
        result.viewPhase = viewPhase;
        result.steps = done;
        return result;
      },
      placeFood: function (x, y) {
        var ok = game.placeFood(x, y);
        render(game.getState());
        return ok;
      },
      setDirection: function (dir) {
        return game.setDirection(dir);
      },
    };
  }

  /* ---------------- Boot ---------------- */

  sizeCanvas();
  refresh();
  rafId = window.requestAnimationFrame(frame);
})();

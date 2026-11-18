/**
 * Snake game engine — pure, dependency-free, deterministic.
 *
 * Works both as a classic browser script (exposes window.SnakeGame) and as a
 * CommonJS module for Node unit tests. It never touches the DOM.
 */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  }
  if (root && typeof root === 'object') {
    root.SnakeGame = api;
  }
})(typeof window !== 'undefined' ? window : typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var DIRECTIONS = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
  };

  var OPPOSITE = { up: 'down', down: 'up', left: 'right', right: 'left' };

  var BASE_TICK_MS = 140;
  var MIN_TICK_MS = 80;
  var TICK_MS_PER_STEP = 10;
  var FOODS_PER_SPEEDUP = 5;
  var SCORE_PER_FOOD = 10;
  var MAX_QUEUED_DIRECTIONS = 2;

  /** Small deterministic PRNG (mulberry32). */
  function mulberry32(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6d2b79f5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function tickMsFor(foodsEaten) {
    var speedups = Math.floor(foodsEaten / FOODS_PER_SPEEDUP);
    return Math.max(MIN_TICK_MS, BASE_TICK_MS - speedups * TICK_MS_PER_STEP);
  }

  function createGame(options) {
    options = options || {};

    var cols = options.cols > 0 ? Math.floor(options.cols) : 20;
    var rows = options.rows > 0 ? Math.floor(options.rows) : 20;
    var seed = options.seed == null ? Date.now() : options.seed;
    var random = mulberry32(seed);
    var initialBest = options.initialBest > 0 ? Math.floor(options.initialBest) : 0;

    var snake;
    var direction;
    var pending;
    var food;
    var score;
    var best;
    var foodsEaten;
    var tickCount;
    var phase;

    function occupied(x, y) {
      for (var i = 0; i < snake.length; i++) {
        if (snake[i].x === x && snake[i].y === y) return true;
      }
      return false;
    }

    function emptyCells() {
      var cells = [];
      for (var y = 0; y < rows; y++) {
        for (var x = 0; x < cols; x++) {
          if (!occupied(x, y)) cells.push({ x: x, y: y });
        }
      }
      return cells;
    }

    function spawnFood() {
      var empty = emptyCells();
      if (!empty.length) {
        food = null;
        return null;
      }
      var cell = empty[Math.floor(random() * empty.length)];
      food = { x: cell.x, y: cell.y };
      return food;
    }

    function reset() {
      var length = Math.min(3, cols);
      var cx = Math.max(length - 1, Math.floor(cols / 2));
      var cy = Math.floor(rows / 2);
      snake = [];
      for (var i = 0; i < length; i++) {
        snake.push({ x: cx - i, y: cy });
      }
      direction = 'right';
      pending = [];
      score = 0;
      foodsEaten = 0;
      tickCount = 0;
      phase = 'ready';
      spawnFood();
    }

    best = initialBest;
    reset();

    function getState() {
      return {
        phase: phase,
        score: score,
        best: best,
        length: snake.length,
        cols: cols,
        rows: rows,
        snake: snake.map(function (segment) {
          return { x: segment.x, y: segment.y };
        }),
        direction: direction,
        food: food ? { x: food.x, y: food.y } : null,
        tickMs: tickMsFor(foodsEaten),
        tickCount: tickCount,
        foodsEaten: foodsEaten,
      };
    }

    function start() {
      if (phase === 'ready') phase = 'running';
      return phase;
    }

    function restart() {
      reset();
      phase = 'running';
      return getState();
    }

    function setDirection(next) {
      if (!DIRECTIONS[next] || phase !== 'running') return false;
      var reference = pending.length ? pending[pending.length - 1] : direction;
      if (next === reference) return false;
      if (next === OPPOSITE[reference]) return false;
      if (pending.length >= MAX_QUEUED_DIRECTIONS) return false;
      pending.push(next);
      return true;
    }

    function placeFood(x, y) {
      if (!Number.isInteger(x) || !Number.isInteger(y)) return false;
      if (x < 0 || y < 0 || x >= cols || y >= rows) return false;
      if (occupied(x, y)) return false;
      food = { x: x, y: y };
      return true;
    }

    function setBest(value) {
      if (Number.isFinite(value) && value > best) best = Math.floor(value);
      return best;
    }

    function step() {
      if (phase !== 'running') return getState();

      tickCount += 1;

      if (pending.length) {
        direction = pending.shift();
      }

      var delta = DIRECTIONS[direction];
      var head = { x: snake[0].x + delta.x, y: snake[0].y + delta.y };
      var eating = !!food && head.x === food.x && head.y === food.y;

      var hitWall = head.x < 0 || head.y < 0 || head.x >= cols || head.y >= rows;
      var hitSelf = false;
      if (!hitWall) {
        // The tail cell frees up on this tick unless the snake grows.
        var checkLength = eating ? snake.length : snake.length - 1;
        for (var i = 0; i < checkLength; i++) {
          if (snake[i].x === head.x && snake[i].y === head.y) {
            hitSelf = true;
            break;
          }
        }
      }

      if (hitWall || hitSelf) {
        phase = 'over';
        if (score > best) best = score;
        return getState();
      }

      snake.unshift(head);

      if (eating) {
        score += SCORE_PER_FOOD;
        foodsEaten += 1;
        if (score > best) best = score;
        if (snake.length >= cols * rows) {
          phase = 'won';
          food = null;
          return getState();
        }
        spawnFood();
      } else {
        snake.pop();
      }

      return getState();
    }

    reset();

    return {
      start: start,
      restart: restart,
      step: step,
      setDirection: setDirection,
      placeFood: placeFood,
      setBest: setBest,
      getState: getState,
      cols: cols,
      rows: rows,
      seed: seed,
    };
  }

  return {
    createGame: createGame,
    mulberry32: mulberry32,
    tickMsFor: tickMsFor,
    DIRECTIONS: DIRECTIONS,
    OPPOSITE: OPPOSITE,
    constants: {
      BASE_TICK_MS: BASE_TICK_MS,
      MIN_TICK_MS: MIN_TICK_MS,
      TICK_MS_PER_STEP: TICK_MS_PER_STEP,
      FOODS_PER_SPEEDUP: FOODS_PER_SPEEDUP,
      SCORE_PER_FOOD: SCORE_PER_FOOD,
      MAX_QUEUED_DIRECTIONS: MAX_QUEUED_DIRECTIONS,
    },
  };
});

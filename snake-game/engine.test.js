'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const SnakeGame = require('./game.js');

const { createGame, tickMsFor, constants } = SnakeGame;

function inSnake(snake, x, y) {
  return snake.some((segment) => segment.x === x && segment.y === y);
}

function advance(game, ticks) {
  let state = game.getState();
  for (let i = 0; i < ticks && state.phase === 'running'; i += 1) {
    game.step();
    state = game.getState();
  }
  return state;
}

test('new game is ready, length 3, heading right, food off the snake', () => {
  const game = createGame({ seed: 7 });
  const state = game.getState();

  assert.equal(state.phase, 'ready');
  assert.equal(state.score, 0);
  assert.equal(state.length, 3);
  assert.equal(state.direction, 'right');
  assert.equal(state.tickMs, constants.BASE_TICK_MS);
  assert.equal(state.cols, 20);
  assert.equal(state.rows, 20);
  assert.ok(state.food);
  assert.equal(inSnake(state.snake, state.food.x, state.food.y), false);
  assert.deepEqual(state.snake[0], { x: 10, y: 10 });
});

test('start moves the game into the running phase', () => {
  const game = createGame({ seed: 1 });
  game.start();
  assert.equal(game.getState().phase, 'running');
});

test('one step advances the snake by exactly one cell', () => {
  const game = createGame({ seed: 1 });
  game.start();
  const before = game.getState();
  game.step();
  const after = game.getState();

  assert.deepEqual(after.snake[0], { x: before.snake[0].x + 1, y: before.snake[0].y });
  assert.equal(after.length, before.length);
  assert.equal(after.tickCount, before.tickCount + 1);
});

test('step is a no-op once the game is over', () => {
  const game = createGame({ seed: 1, cols: 4, rows: 4 });
  game.start();
  advance(game, 20);
  const over = game.getState();
  assert.equal(over.phase, 'over');
  const before = over.tickCount;
  game.step();
  const after = game.getState();
  assert.equal(after.phase, 'over');
  assert.equal(after.tickCount, before);
});

test('hitting a wall ends the game', () => {
  const game = createGame({ seed: 3, cols: 8, rows: 8 });
  game.start();
  const over = advance(game, 10);
  assert.equal(over.phase, 'over');
  assert.ok(over.snake[0].x > 0, 'head stays on the board');
});

test('eating food grows the snake and adds score', () => {
  const game = createGame({ seed: 5, cols: 8, rows: 8 });
  game.start();
  const start = game.getState();
  assert.equal(game.placeFood(start.snake[0].x + 1, start.snake[0].y), true);

  game.step();
  const state = game.getState();

  assert.equal(state.score, 10);
  assert.equal(state.length, 4);
  assert.equal(state.foodsEaten, 1);
  assert.ok(state.food, 'a new food was spawned');
  assert.equal(inSnake(state.snake, state.food.x, state.food.y), false);
});

test('food is never spawned on the snake for many seeds', () => {
  for (let seed = 0; seed < 50; seed += 1) {
    const game = createGame({ seed, cols: 12, rows: 12 });
    game.start();
    for (let i = 0; i < 40; i += 1) {
      const state = game.getState();
      if (state.phase !== 'running' || !state.food) break;
      assert.equal(
        inSnake(state.snake, state.food.x, state.food.y),
        false,
        `seed ${seed} step ${i}: food on snake`
      );
      game.step();
    }
  }
});

test('seeded games are deterministic', () => {
  const first = createGame({ seed: 42, cols: 10, rows: 10 });
  const second = createGame({ seed: 42, cols: 10, rows: 10 });
  first.start();
  second.start();

  first.step();
  second.step();
  first.step();
  second.step();

  assert.deepEqual(first.getState(), second.getState());
});

test('direction changes are queued and applied on the next step', () => {
  const game = createGame({ seed: 2, cols: 10, rows: 10 });
  game.start();

  assert.equal(game.setDirection('up'), true);
  assert.equal(game.getState().direction, 'right', 'kept until the next tick');

  game.step();
  assert.equal(game.getState().direction, 'up');
});

test('180-degree reversals are rejected', () => {
  const game = createGame({ seed: 2, cols: 10, rows: 10 });
  game.start();

  assert.equal(game.setDirection('left'), false);
  assert.equal(game.getState().direction, 'right');
  game.step();
  assert.equal(game.getState().phase, 'running');

  // Reversal of a queued direction is rejected as well.
  assert.equal(game.setDirection('up'), true);
  assert.equal(game.setDirection('down'), false);
});

test('queued directions are capped at two', () => {
  const game = createGame({ seed: 2, cols: 10, rows: 10 });
  game.start();

  assert.equal(game.setDirection('up'), true);
  assert.equal(game.setDirection('left'), true);
  assert.equal(game.setDirection('down'), false);
});

test('moving into the vacating tail cell is allowed', () => {
  const game = createGame({ seed: 11, cols: 8, rows: 8 });
  game.start();
  const start = game.getState();
  const origin = start.snake[0];
  game.placeFood(origin.x + 1, origin.y);
  game.step(); // grow to length 4, head right of the original head

  game.setDirection('up');
  game.step();
  game.setDirection('left');
  game.step();
  game.setDirection('down');
  game.step(); // head lands on the original head cell, now the vacating tail

  const state = game.getState();
  assert.equal(state.phase, 'running');
  assert.deepEqual(state.snake[0], origin);
});

test('running into the snake body ends the game', () => {
  const game = createGame({ seed: 13, cols: 5, rows: 5 });
  game.start();
  game.placeFood(3, 2);
  game.step(); // eat, length 4
  game.placeFood(4, 2);
  game.step(); // eat, length 5: head (4,2)

  game.setDirection('up');
  game.step(); // head (4,1)
  game.setDirection('left');
  game.step(); // head (3,1)
  game.setDirection('down');
  game.step(); // head (3,2) hits the body

  const state = game.getState();
  assert.equal(state.phase, 'over');
});

test('filling the board wins the game', () => {
  const game = createGame({ seed: 1, cols: 4, rows: 1 });
  game.start();
  const state = game.getState();
  assert.deepEqual(state.snake, [
    { x: 2, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 0 },
  ]);
  assert.deepEqual(state.food, { x: 3, y: 0 });

  game.step();
  const won = game.getState();
  assert.equal(won.phase, 'won');
  assert.equal(won.score, 10);
  assert.equal(won.length, 4);
  assert.equal(won.food, null);
});

test('speed increases every five foods down to the floor', () => {
  assert.equal(tickMsFor(0), 140);
  assert.equal(tickMsFor(4), 140);
  assert.equal(tickMsFor(5), 130);
  assert.equal(tickMsFor(10), 120);
  assert.equal(tickMsFor(25), 90);
  assert.equal(tickMsFor(60), 80);
  assert.equal(tickMsFor(1000), 80);
});

test('best score survives a restart and can be seeded', () => {
  const game = createGame({ seed: 4, cols: 8, rows: 8, initialBest: 50 });
  assert.equal(game.getState().best, 50);
  game.start();
  const start = game.getState();
  game.placeFood(start.snake[0].x + 1, start.snake[0].y);
  game.step();
  assert.equal(game.getState().best, 50, 'best is the max of seeded best and score');

  const fresh = createGame({ seed: 4, cols: 4, rows: 4 });
  fresh.start();
  fresh.placeFood(3, 2);
  fresh.step();
  assert.equal(fresh.getState().best, 10);

  fresh.restart();
  assert.equal(fresh.getState().best, 10, 'restart keeps the best score');
});

test('placed food must be inside the board and off the snake', () => {
  const game = createGame({ seed: 9, cols: 6, rows: 6 });
  game.start();
  assert.equal(game.placeFood(-1, 2), false);
  assert.equal(game.placeFood(2, 99), false);
  const head = game.getState().snake[0];
  assert.equal(game.placeFood(head.x, head.y), false);
  assert.equal(game.placeFood(5, 5), true);
  assert.deepEqual(game.getState().food, { x: 5, y: 5 });
});

test('state snapshots are isolated from the engine', () => {
  const game = createGame({ seed: 8 });
  game.start();
  const state = game.getState();
  state.snake[0].x = 999;
  state.food.x = 999;
  const next = game.getState();
  assert.notEqual(next.snake[0].x, 999);
  assert.notEqual(next.food.x, 999);
});

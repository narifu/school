# demo

> A Vue.js project

## Snake game (贪吃蛇)

A self-contained HTML5 Canvas Snake game lives in [`snake-game/`](snake-game/). It has no build step and no dependencies, so it runs without installing the Vue toolchain.

Open [`snake-game/index.html`](snake-game/index.html) directly in a browser, or serve the repository and visit `/snake-game/`:

``` bash
python3 -m http.server 8000
# then open http://localhost:8000/snake-game/
```

Controls: arrow keys / WASD to steer, `Space` or `P` to pause or resume, `Enter` to start or restart. On touch devices, swipe on the board or use the on-screen D-pad.

Rules: eat the food to score 10 points and grow; the snake speeds up every 5 foods; hitting a wall or your own body ends the game; filling the board wins. The best score is saved in `localStorage`.

The game logic is dependency-free and unit-tested with Node's built-in test runner (Node 18+):

``` bash
npm test
# or directly, without installing dependencies:
node --test snake-game/engine.test.js
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

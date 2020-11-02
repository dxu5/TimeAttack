import { loadLevel } from "./image_loader.js";
import { loadBackground, loadMario } from "./sprites.js";

const drawBackground = (background, context, sprites) => {
  background.ranges.forEach(([x1, x2, y1, y2]) => {
    for (let i = x1; i < x2; i++) {
      for (let j = y1; j < y2; j++) {
        sprites.drawTile(background.tile, context, i, j);
      }
    }
  });
};

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

Promise.all([loadMario(), loadBackground(), loadLevel("1-1")]).then(
  ([marioSprite, sprites, level]) => {
    level.backgrounds.forEach((background) =>
      drawBackground(background, context, sprites)
    );

    const pos = {
      x: 64,
      y: 64,
    };

    marioSprite.draw("idle", context, pos.x, pos.y);
  }
);

import SpriteSheet from "./sprite_sheet.js";
import { loadImage, loadLevel } from "./image_loader.js";

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

function loadBackground() {
  return loadImage("/image/tiles.png").then((image) => {
    const sprites = new SpriteSheet(image, 15, 15);
    sprites.define("ground1", 3, 215);
    sprites.define("ground2", 3, 198);
    sprites.define("sky", 105, 15);
    return sprites;
  });
}

Promise.all([loadBackground(), loadLevel("1-1")]).then(([sprites, level]) => {
  level.backgrounds.forEach((background) =>
    drawBackground(background, context, sprites)
  );
});

import SpriteSheet from "./sprite_sheet.js";
import { loadImage } from "./image_loader.js";

export function loadMario() {
  return loadImage("/image/mario.png").then((image) => {
    const sprites = new SpriteSheet(image, 15, 15);
    sprites.define("idle", 240, 80, 40, 40);
    return sprites;
  });
}

export function loadBackground() {
  return loadImage("/image/tiles.png").then((image) => {
    const sprites = new SpriteSheet(image, 15, 15);
    sprites.defineTile("ground1", 3, 215);
    sprites.defineTile("ground2", 3, 198);
    sprites.defineTile("sky", 105, 15);
    return sprites;
  });
}

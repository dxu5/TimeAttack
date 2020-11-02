import { loadLevel } from "./image_loader.js";
import { loadBackground, loadMario } from "./sprites.js";
import Compositor from "./compositor.js";

import { createBackgroundLayer } from "./layers.js";

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

function createSpriteLayer(sprite, pos) {
  return function drawSpriteLayer(context) {
    sprite.draw("idle", context, pos.x + i * 16, pos.y);
  };
}

Promise.all([loadMario(), loadBackground(), loadLevel("1-1")]).then(
  ([marioSprite, backgroundSprites, level]) => {
    const comp = new Compositor();
    const backgroundLayer = createBackgroundLayer(
      level.backgrounds,
      backgroundSprites
    );
    comp.layers.push(backgroundLayer);

    const pos = {
      x: 0,
      y: 0,
    };

    const spriteLayer = createSpriteLayer(marioSprite, pos);
    comp.layers.push(spriteLayer);

    function update() {
      comp.draw(context);

      pos.x += 2;
      pos.y += 2;
      requestAnimationFrame(update); //takes a function and call its function next time browser is ready use when drawing
    }
    update();
  }
);

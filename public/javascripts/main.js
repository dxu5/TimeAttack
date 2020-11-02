import { loadLevel } from "./image_loader.js";
import { loadBackground } from "./sprites.js";
import Compositor from "./compositor.js";
import { createMario } from "./entities.js";

import { createBackgroundLayer, createSpriteLayer } from "./layers.js";

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

Promise.all([createMario(), loadBackground(), loadLevel("1-1")]).then(
  ([mario, backgroundSprites, level]) => {
    const comp = new Compositor();
    const backgroundLayer = createBackgroundLayer(
      level.backgrounds,
      backgroundSprites
    );
    comp.layers.push(backgroundLayer);

    const deltaTime = 1 / 60;
    let accumulatedTime = 0;
    let lastTime = 0;
    const gravity = 30;
    mario.pos.set(64, 180);
    mario.vel.set(200, -600);

    const spriteLayer = createSpriteLayer(mario);
    comp.layers.push(spriteLayer);

    function update(time) {
      accumulatedTime += (time - lastTime) / 1000;
      while (accumulatedTime > deltaTime) {
        comp.draw(context);
        mario.update(deltaTime);
        //add gravity
        mario.vel.y += gravity;
        accumulatedTime -= deltaTime;
      }

      requestAnimationFrame(update); //takes a function and call its function next time browser is ready use when drawing
      lastTime = time;
    }
    update(0);
  }
);

import { loadLevel } from "./image_loader.js";
import { loadBackground } from "./sprites.js";
import Compositor from "./compositor.js";
import { createMario } from "./entities.js";
import Timer from "./timer.js";

import { createBackgroundLayer, createSpriteLayer } from "./layers.js";

import Keyboard from "./keyboard.js";

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

    const gravity = 2000;
    mario.pos.set(64, 180);

    const input = new Keyboard();
    input.addMapping(32, (keyState) => {
      if (keyState) {
        mario.jump.start();
      } else {
        mario.jump.cancel();
      }
      console.log(keyState);
    });
    input.listenTo(window);

    const spriteLayer = createSpriteLayer(mario);
    comp.layers.push(spriteLayer);

    const timer = new Timer(1 / 60);

    timer.update = function update(deltaTime) {
      mario.update(deltaTime);
      comp.draw(context);
      mario.vel.y += gravity * deltaTime;
    };

    timer.start();
  }
);

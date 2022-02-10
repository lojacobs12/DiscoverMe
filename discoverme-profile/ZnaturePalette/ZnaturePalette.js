/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class ZnaturePalette extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Palette", "./ZnaturePalette/costumes/Palette.svg", {
        x: 115,
        y: 115
      })
    ];

    this.sounds = [new Sound("pop", "./ZnaturePalette/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.goto(0, 0);
  }
}

/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Dress", "./Stage/costumes/Dress.svg", { x: 240, y: 180 }),
      new Costume("Done", "./Stage/costumes/Done.svg", { x: 240, y: 180 })
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];

    this.vars.basicHairColour = 1;
    this.vars.basicHairStyle = 0;
    this.vars.menuSelection = 2;
    this.vars.basicPersonGender = 0;
    this.vars.basicPersonSkin = 1;
    this.vars.currentBottom = 4;
    this.vars.currentTop = 10;
    this.vars.currentExtra = 1;
    this.vars.currentAssist = 1;
  }

  *whenGreenFlagClicked() {
    this.costume = "Dress";
    this.moveBehind(); // added this
  }
}

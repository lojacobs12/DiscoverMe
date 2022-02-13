/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Hair extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Hair 1", "./Hair/costumes/Hair 1.svg", { x: 51, y: 100 }),
      new Costume("Hair 2", "./Hair/costumes/Hair 2.svg", { x: 51, y: 100 }),
      new Costume("Hair 3", "./Hair/costumes/Hair 3.svg", { x: 51, y: 100 }),
      new Costume("Hair 4", "./Hair/costumes/Hair 4.svg", { x: 51, y: 100 }),
      new Costume("Hair 5", "./Hair/costumes/Hair 5.svg", { x: 51, y: 100 }),
      new Costume("Hair 6", "./Hair/costumes/Hair 6.svg", { x: 51, y: 100 })
    ];

    this.sounds = [new Sound("pop", "./Hair/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "zintro" },
        this.whenIReceiveZintro
      ),
      new Trigger(Trigger.BROADCAST, { name: "hair" }, this.whenIReceiveHair),
      new Trigger(
        Trigger.BROADCAST,
        { name: "update.hair" },
        this.whenIReceiveUpdateHair
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveZintro() {
    this.stage.vars.basicHairColour = 1;
    this.costume = this.stage.vars.basicHairColour;
    /* TODO: Implement looks_gotofrontback */
    this.moveAhead();
    this.goto(-140, 0);
    this.visible = true;
  }

  *whenIReceiveHair() {
    /* TODO: Implement looks_gotofrontback */
    this.moveAhead();
    this.costume = this.stage.vars.basicHairColour;
  }

  *whenIReceiveUpdateHair() {
    this.costume = this.stage.vars.basicHairColour;
  }
}

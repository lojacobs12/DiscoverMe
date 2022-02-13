/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class HairBack extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Hair 1", "./HairBack/costumes/Hair 1.svg", {
        x: 51,
        y: 99
      }),
      new Costume("Hair 2", "./HairBack/costumes/Hair 2.svg", {
        x: 51,
        y: 99
      }),
      new Costume("Hair 3", "./HairBack/costumes/Hair 3.svg", {
        x: 51,
        y: 99
      }),
      new Costume("Hair 4", "./HairBack/costumes/Hair 4.svg", {
        x: 51,
        y: 99
      }),
      new Costume("Hair 5", "./HairBack/costumes/Hair 5.svg", {
        x: 51,
        y: 99
      }),
      new Costume("Hair 6", "./HairBack/costumes/Hair 6.svg", {
        x: 51,
        y: 99
      }),
      new Costume("hair long", "./HairBack/costumes/hair long.svg", {
        x: 43.18685957844241,
        y: 87.83964148052635
      })
    ];

    this.sounds = [new Sound("pop", "./HairBack/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "zintro" },
        this.whenIReceiveZintro
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "behind" },
        this.whenIReceiveBehind
      ),
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
    this.stage.vars.basicHairStyle = 0;
    this.costume = this.stage.vars.basicHairColour;
    /* TODO: Implement looks_gotofrontback */
    this.moveAhead();
    this.goto(-140, 0);
  }

  *whenIReceiveBehind() {
    /* TODO: Implement looks_gotofrontback */
    this.moveAhead();
    this.costume = this.stage.vars.basicHairColour;
  }

  *whenIReceiveUpdateHair() {
    if (this.stage.vars.basicHairStyle == 1) {
      this.costume = this.stage.vars.basicHairColour;
      this.visible = true;
    } else {
      this.visible = false;
    }
  }
}

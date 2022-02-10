/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Done extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Untouched", "./Done/costumes/Untouched.svg", {
        x: 27,
        y: 17
      }),
      new Costume("Touched", "./Done/costumes/Touched.svg", { x: 27, y: 17 })
    ];

    this.sounds = [new Sound("pop", "./Done/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "zintro" },
        this.whenIReceiveZintro
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.stage.costume = "Dress";
    this.visible = false;
  }

  *whenthisspriteclicked() {
    yield* this.broadcastAndWait("update.menu.reset");
    this.stage.costume = "Done";
    this.visible = false;
    yield* this.broadcastAndWait("done.clicked");
  }

  *whenIReceiveZintro() {
    this.size = 100;
    this.visible = true;
    this.goto(-200, -150);
    while (true) {
      if (this.touching("mouse")) {
        this.costume = "Touched";
      } else {
        this.costume = "Untouched";
      }
      yield;
    }
  }
}

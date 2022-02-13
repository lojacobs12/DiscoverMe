/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Extra2 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Bow", "./Extra2/costumes/Bow.svg", { x: 21, y: 14 })
    ];

    this.sounds = [new Sound("pop", "./Extra2/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "update.menu" },
        this.whenIReceiveUpdateMenu
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "update.menu.reset" },
        this.whenIReceiveUpdateMenuReset
      ),
      new Trigger(Trigger.BROADCAST, { name: "hair" }, this.whenIReceiveHair),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "clothes2" },
        this.whenIReceiveClothes2
      )
    ];

    this.vars.menuSelectionThis4 = 6;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    yield* this.clones2();
  }

  *whenIReceiveUpdateMenu() {
    if (this.stage.vars.menuSelection == this.vars.menuSelectionThis4) {
      this.visible = true;
    }
  }

  *whenIReceiveUpdateMenuReset() {
    if (this.touching(this.sprites["Person"].andClones())) {
      null;
    } else {
      this.visible = false;
    }
  }

  *whenIReceiveHair() {
    if (this.costumeNumber < 4) {
      null;
    } else {
      if (this.costumeNumber < 7) {
        /* TODO: Implement looks_gotofrontback */
        this.moveAhead();
      } else {
        null;
      }
    }
  }

  *whenthisspriteclicked() {
    /* TODO: Implement looks_gotofrontback */
    this.moveAhead();
    //if (this.stage.costume.name == "dress") {
    while (!!this.mouse.down) {
      this.goto(this.mouse.x, this.mouse.y);
      yield;
    }
    if (this.touching(this.sprites["Person"].andClones())) {
      null;
    } else {
      if (!(this.stage.vars.menuSelection == this.vars.menuSelectionThis4)) {
        this.visible = false;
      }
      this.goto(this.random(35, 175), this.random(30, -110));
    }
    //}
  }

  *whenIReceiveClothes2() {
    if (this.costumeNumber < 4 || this.costumeNumber > 6) {
      /* TODO: Implement looks_gotofrontback */
      this.moveAhead();
    } else {
      null;
    }
  }

  *clones2() {
    this.size = 100;
    this.costume = "" + 1 + 0;
    this.vars.menuSelectionThis4 = 6;
    this.goto(40, 30);
    this.effects.color = 0;
    for (let i = 0; i < 19; i++) {
      this.createClone();
      this.effects.color += 10;
      this.goto(this.random(35, 175), this.random(30, -110));
    }
  }
}

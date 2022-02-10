/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Bottoms extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Pants 1 1", "./Bottoms/costumes/Pants 1 1.svg", {
        x: 24,
        y: -35
      }),
      new Costume("Pants 1 2", "./Bottoms/costumes/Pants 1 2.svg", {
        x: 24,
        y: -35
      }),
      new Costume("Pants 1 3", "./Bottoms/costumes/Pants 1 3.svg", {
        x: 24,
        y: -35
      }),
      new Costume("Pants 2 1", "./Bottoms/costumes/Pants 2 1.svg", {
        x: 24,
        y: -35
      }),
      new Costume("Pants 2 2", "./Bottoms/costumes/Pants 2 2.svg", {
        x: 24,
        y: -35
      }),
      new Costume("Pants 2 3", "./Bottoms/costumes/Pants 2 3.svg", {
        x: 24,
        y: -35
      }),
      new Costume("Pants 3 1", "./Bottoms/costumes/Pants 3 1.svg", {
        x: 42,
        y: -34
      }),
      new Costume("Pants 3 2", "./Bottoms/costumes/Pants 3 2.svg", {
        x: 42,
        y: -34
      }),
      new Costume("Pants 3 3", "./Bottoms/costumes/Pants 3 3.svg", {
        x: 42,
        y: -34
      }),
      new Costume("Pants 4 1", "./Bottoms/costumes/Pants 4 1.svg", {
        x: 44,
        y: -35
      }),
      new Costume("Pants 4 2", "./Bottoms/costumes/Pants 4 2.svg", {
        x: 44,
        y: -35
      }),
      new Costume("Pants 4 3", "./Bottoms/costumes/Pants 4 3.svg", {
        x: 44,
        y: -35
      })
    ];

    this.sounds = [new Sound("pop", "./Bottoms/sounds/pop.wav")];

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
      new Trigger(
        Trigger.BROADCAST,
        { name: "clothes" },
        this.whenIReceiveClothes
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "clothes2" },
        this.whenIReceiveClothes2
      ),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "delete.bottoms" },
        this.whenIReceiveDeleteBottoms
      )
    ];

    this.vars.menuSelectionThis2 = 4;
    this.vars.clone2 = 4;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    yield* this.clones2();
  }

  *whenIReceiveUpdateMenu() {
    if (this.stage.vars.menuSelection == this.vars.menuSelectionThis2) {
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

  *clones2() {
    this.size = 75;
    this.costume = 1;
    this.vars.clone2 = 1;
    this.vars.menuSelectionThis2 = 4;
    this.goto(55, 56);
    for (let i = 0; i < 3; i++) {
      this.createClone();
      this.vars.clone2 += 1;
      this.costume = this.costumeNumber + 3;
      this.x += 100;
      if (this.vars.clone2 == 3) {
        this.goto(55, -50);
      }
    }
    this.createClone();
  }

  *whenIReceiveClothes() {
    if (this.costumeNumber < 7) {
      /* TODO: Implement looks_gotofrontback */
      this.moveAhead();
    } else {
      null;
    }
  }

  *whenIReceiveClothes2() {
    if (this.costumeNumber < 7) {
      null;
    } else {
      /* TODO: Implement looks_gotofrontback */
      this.moveAhead();
    }
  }

  *whenthisspriteclicked() {
    //if (this.stage.costume.name == "dress") {
    yield* this.wait(0.15);
    if (this.touching("mouse")) {
      if (this.x < 0) {
        this.deleteThisClone();
      } else {
        this.stage.vars.currentBottom = this.costumeNumber;
        yield* this.broadcastAndWait("delete.bottoms");
        this.createClone();
        this.goto(this.sprites["Person"].x, this.sprites["Person"].y);
        this.size = 100;
      }
    }
    //}
  }

  *whenIReceiveDeleteBottoms() {
    if (!(this.costumeNumber == this.stage.vars.currentBottom) && this.x < 0) {
      //this.deleteThisClone();
      this.x = -300;
    }
  }
}

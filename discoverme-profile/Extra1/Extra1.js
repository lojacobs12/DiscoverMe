/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Extra1 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Shoe 1 1", "./Extra1/costumes/Shoe 1 1.svg", {
        x: 34,
        y: -94
      }),
      new Costume("Shoe 1 2", "./Extra1/costumes/Shoe 1 2.svg", {
        x: 34,
        y: -94
      }),
      new Costume("Shoe 1 3", "./Extra1/costumes/Shoe 1 3.svg", {
        x: 34,
        y: -94
      }),
      new Costume("Shoe 2 1", "./Extra1/costumes/Shoe 2 1.svg", {
        x: 34,
        y: -76
      }),
      new Costume("Shoe 2 2", "./Extra1/costumes/Shoe 2 2.svg", {
        x: 34,
        y: -76
      }),
      new Costume("Shoe 2 3", "./Extra1/costumes/Shoe 2 3.svg", {
        x: 34,
        y: -76
      }),
      new Costume("Hat 1 1", "./Extra1/costumes/Hat 1 1.svg", {
        x: 57,
        y: 122
      }),
      new Costume("Hat 1 2", "./Extra1/costumes/Hat 1 2.svg", {
        x: 57,
        y: 122
      }),
      new Costume("Hat 1 3", "./Extra1/costumes/Hat 1 3.svg", {
        x: 57,
        y: 122
      }),
      new Costume("Hat 2 1", "./Extra1/costumes/Hat 2 1.svg", {
        x: 59,
        y: 120
      }),
      new Costume("Hat 2 2", "./Extra1/costumes/Hat 2 2.svg", {
        x: 59,
        y: 120
      }),
      new Costume("Hat 2 3", "./Extra1/costumes/Hat 2 3.svg", {
        x: 59,
        y: 120
      })
    ];

    this.sounds = [new Sound("pop", "./Extra1/sounds/pop.wav")];

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
      ),
      new Trigger(Trigger.BROADCAST, { name: "overs" }, this.whenIReceiveOvers),
      new Trigger(
        Trigger.BROADCAST,
        { name: "delete.extra" },
        this.whenIReceiveDeleteExtra
      )
    ];

    this.vars.menuSelectionThis3 = 5;
    this.vars.clone3 = 4;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    yield* this.clones2();
  }

  *whenIReceiveUpdateMenu() {
    if (this.stage.vars.menuSelection == this.vars.menuSelectionThis3) {
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
    this.vars.clone3 = 1;
    this.vars.menuSelectionThis3 = 5;
    this.goto(55, 76);
    for (let i = 0; i < 3; i++) {
      this.createClone();
      this.vars.clone3 += 1;
      this.costume = this.costumeNumber + 3;
      this.x += 100;
      if (this.vars.clone3 == 3) {
        this.goto(55, -150);
      }
    }
    this.createClone();
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
    //if (this.stage.costume.name == "dress") {
    yield* this.wait(0.15);
    if (this.touching("mouse")) {
      if (this.x < 0) {
        this.deleteThisClone();
      } else {
        this.stage.vars.currentExtra = this.costumeNumber;
        yield* this.broadcastAndWait("delete.extra");
        this.createClone();
        this.goto(this.sprites["Person"].x, this.sprites["Person"].y);
        this.size = 100;
      }
    }
    //}
  }

  *whenIReceiveClothes2() {
    if (this.costumeNumber < 4) {
      /* TODO: Implement looks_gotofrontback */
      this.moveAhead();
    } else {
      null;
    }
  }

  *whenIReceiveOvers() {
    if (this.costumeNumber < 7) {
      null;
    } else {
      /* TODO: Implement looks_gotofrontback */
      this.moveAhead();
    }
  }

  *whenIReceiveDeleteExtra() {
    if (!(this.costumeNumber == this.stage.vars.currentExtra) && this.x < 0) {
      //this.deleteThisClone();
      this.x = -300;
    }
  }
}

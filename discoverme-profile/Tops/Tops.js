/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Tops extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Shirt 1 1", "./Tops/costumes/Shirt 1 1.svg", {
        x: 41,
        y: 10
      }),
      new Costume("Shirt 1 2", "./Tops/costumes/Shirt 1 2.svg", {
        x: 41,
        y: 10
      }),
      new Costume("Shirt 1 3", "./Tops/costumes/Shirt 1 3.svg", {
        x: 41,
        y: 10
      }),
      new Costume("Shirt 4 1", "./Tops/costumes/Shirt 4 1.svg", {
        x: 23,
        y: 5
      }),
      new Costume("Shirt 4 2", "./Tops/costumes/Shirt 4 2.svg", {
        x: 23,
        y: 5
      }),
      new Costume("Shirt 4 3", "./Tops/costumes/Shirt 4 3.svg", {
        x: 23,
        y: 5
      }),
      new Costume("Shirt 2 1", "./Tops/costumes/Shirt 2 1.svg", {
        x: 41,
        y: 12
      }),
      new Costume("Shirt 2 2", "./Tops/costumes/Shirt 2 2.svg", {
        x: 41,
        y: 12
      }),
      new Costume("Shirt 2 3", "./Tops/costumes/Shirt 2 3.svg", {
        x: 41,
        y: 12
      }),
      new Costume("Shirt 3 1", "./Tops/costumes/Shirt 3 1.svg", {
        x: 41,
        y: 13
      }),
      new Costume("Shirt 3 2", "./Tops/costumes/Shirt 3 2.svg", {
        x: 41,
        y: 13
      }),
      new Costume("Shirt 3 3", "./Tops/costumes/Shirt 3 3.svg", {
        x: 41,
        y: 13
      })
    ];

    this.sounds = [new Sound("pop", "./Tops/sounds/pop.wav")];

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
        { name: "clothes2" },
        this.whenIReceiveClothes2
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "clothes" },
        this.whenIReceiveClothes
      ),
      new Trigger(Trigger.BROADCAST, { name: "overs" }, this.whenIReceiveOvers),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "delete.tops" },
        this.whenIReceiveDeleteTops
      )
    ];

    this.vars.menuSelectionThis = 3;
    this.vars.clone = 4;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    yield* this.clones2();
  }

  *whenIReceiveUpdateMenu() {
    if (this.stage.vars.menuSelection == this.vars.menuSelectionThis) {
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
    this.costume = "" + 1 + 0;
    this.vars.clone = 1;
    this.vars.menuSelectionThis = 3;
    this.goto(55, 26);
    this.costumeNumber = 1;
    for (let i = 0; i < 3; i++) {
      this.createClone();
      this.vars.clone += 1;
      this.costume = this.costumeNumber + 3;
      this.x += 100;
      if (this.vars.clone == 3) {
        this.goto(55, -80);
      }
    }
    this.createClone();
  }

  *whenIReceiveClothes2() {
    if (this.costumeNumber < 4) {
      /* TODO: Implement looks_gotofrontback */

      this.moveAhead();
    } else {
      null;
    }
  }

  *whenIReceiveClothes() {
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

  *whenIReceiveOvers() {
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
        this.stage.vars.currentTop = this.costumeNumber;
        yield* this.broadcastAndWait("delete.tops");
        this.createClone();
        this.goto(this.sprites["Person"].x, this.sprites["Person"].y);
        this.size = 100;
      }
    }
    //}
  }

  *whenIReceiveDeleteTops() {
    if (!(this.costumeNumber == this.stage.vars.currentTop) && this.x < 0) {
      this.x = -300;
    }
  }
}

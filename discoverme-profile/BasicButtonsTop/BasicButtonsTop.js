/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class BasicButtonsTop extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Boy", "./BasicButtonsTop/costumes/Boy.svg", {
        x: 17,
        y: 23
      }),
      new Costume("Girl", "./BasicButtonsTop/costumes/Girl.svg", {
        x: 11,
        y: 19
      }),
      new Costume("Skin 1", "./BasicButtonsTop/costumes/Skin 1.svg", {
        x: 13,
        y: 13
      }),
      new Costume("Skin 2", "./BasicButtonsTop/costumes/Skin 2.svg", {
        x: 12.5,
        y: 12.5
      }),
      new Costume("Skin 3", "./BasicButtonsTop/costumes/Skin 3.svg", {
        x: 12.375,
        y: 12.375
      }),
      new Costume("Skin 4", "./BasicButtonsTop/costumes/Skin 4.svg", {
        x: 12.5,
        y: 12.5
      }),
      new Costume("Style 1", "./BasicButtonsTop/costumes/Style 1.svg", {
        x: 25,
        y: 12
      }),
      new Costume("Style 2", "./BasicButtonsTop/costumes/Style 2.svg", {
        x: 25,
        y: 12
      }),
      new Costume("Hair 1", "./BasicButtonsTop/costumes/Hair 1.svg", {
        x: 13,
        y: 13
      }),
      new Costume("Hair 2", "./BasicButtonsTop/costumes/Hair 2.svg", {
        x: 13,
        y: 13
      }),
      new Costume("Hair 3", "./BasicButtonsTop/costumes/Hair 3.svg", {
        x: 13,
        y: 13
      }),
      new Costume("Hair 4", "./BasicButtonsTop/costumes/Hair 4.svg", {
        x: 13,
        y: 13
      }),
      new Costume("Hair 5", "./BasicButtonsTop/costumes/Hair 5.svg", {
        x: 13,
        y: 13
      }),
      new Costume("Hair 6", "./BasicButtonsTop/costumes/Hair 6.svg", {
        x: 13,
        y: 13
      })
    ];

    this.sounds = [new Sound("pop", "./BasicButtonsTop/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "update.menu.reset" },
        this.whenIReceiveUpdateMenuReset
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "update.menu" },
        this.whenIReceiveUpdateMenu
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(Trigger.BROADCAST, { name: "overs" }, this.whenIReceiveOvers)
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveUpdateMenuReset() {
    /* TODO: Implement stop other scripts in sprite */ null;
    this.visible = false;
    this.deleteThisClone();
  }

  *whenIReceiveUpdateMenu() {
    if (this.stage.vars.menuSelection == 2) {
      yield* this.clones2();
    }
  }

  *startAsClone() {
    this.visible = true;
    while (true) {
      if (this.touching("mouse")) {
        this.effects.brightness = 20;
      } else {
        this.effects.brightness = 0;
      }
      yield;
    }
  }

  *clones2() {
    this.goto(30, 35);
    this.costume = "Skin 1";
    for (let i = 0; i < 4; i++) {
      this.createClone();
      this.costumeNumber += 1;
      this.x += 48;
    }
    this.goto(46, -37);
    this.createClone();
    this.costumeNumber += 1;
    this.goto(151, -37);
    this.createClone();
    this.costumeNumber += 1;
    this.goto(30, -110);
    for (let i = 0; i < 6; i++) {
      this.createClone();
      this.costumeNumber += 1;
      this.x += 29;
    }
  }

  *whenthisspriteclicked() {
    if (this.costumeNumber < 7) {
      this.stage.vars.basicPersonSkin = this.costumeNumber - 2;
      yield* this.broadcastAndWait("update.person");
    } else {
      if (this.costumeNumber < 9) {
        if (this.costumeNumber == 7) {
          this.stage.vars.basicHairStyle = 0;
        } else {
          this.stage.vars.basicHairStyle = 1;
        }
      } else {
        this.stage.vars.basicHairColour = this.costumeNumber - 8;
      }
      yield* this.broadcastAndWait("update.hair");
    }
  }

  *whenIReceiveOvers() {
    /* TODO: Implement looks_gotofrontback */
    this.moveAhead();
  }
}

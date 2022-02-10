/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class AssistiveDevice extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("wheelchair", "./AssistiveDevice/costumes/wheelchair.svg", {
        x: 42.46566929839341,
        y: 16.771947820884265
      }),
      new Costume("crutches", "./AssistiveDevice/costumes/crutches.svg", {
        x: 28.23411184521609,
        y: 60.9530967872129
      }),
      new Costume("leg", "./AssistiveDevice/costumes/leg.svg", {
        x: 157.4919641849386,
        y: -76.9103960609504
      }),
      new Costume(
        "crutches transparent",
        "./AssistiveDevice/costumes/crutches transparent.png",
        { x: 56, y: 69 }
      ),
      new Costume(
        "prosthetic leg",
        "./AssistiveDevice/costumes/prosthetic leg.png",
        { x: 338, y: -144 }
      ),
      new Costume(
        "wheelchair transparent",
        "./AssistiveDevice/costumes/wheelchair transparent.png",
        { x: 105, y: 33 }
      )
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "update.menu" },
        this.whenIReceiveUpdateMenu
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "update.menu.reset" },
        this.whenIReceiveUpdateMenuReset
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "delete.assist" },
        this.whenIReceiveDeleteAssist
      )
    ];

    this.vars.clone4 = 3;
    this.vars.menuSelectionThis5 = 1;
  }

  *whenthisspriteclicked() {
    //if (this.stage.costume.name == "dress") {
    yield* this.wait(0.15);
    if (this.touching("mouse")) {
      if (this.x < 0) {
        this.deleteThisClone();
      } else {
        this.stage.vars.currentAssist = this.costumeNumber;
        yield* this.broadcastAndWait("delete.assist");
        this.createClone();
        this.goto(this.sprites["Person"].x, this.sprites["Person"].y);
        this.size = 100;
        /* TODO: Implement looks_gotofrontback */
        this.moveAhead();
      }
    }
    //}
  }

  *whenIReceiveUpdateMenu() {
    if (this.stage.vars.menuSelection == this.vars.menuSelectionThis5) {
      this.visible = true;
    }
  }

  *clones2() {
    this.size = 75;
    this.costume = "wheelchair";
    this.vars.menuSelectionThis5 = 1;
    this.goto(55, 26);
    this.createClone();
    /* TODO: Implement looks_gotofrontback */
    this.moveAhead();
    this.costume = "crutches";
    this.goto(155, 26);
    this.createClone();
    /* TODO: Implement looks_gotofrontback */
    this.moveAhead();
    this.costume = "leg";
    this.goto(155, 0);
    /* TODO: Implement looks_gotofrontback */
    this.moveAhead();
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    yield* this.clones2();
  }

  *whenIReceiveUpdateMenuReset() {
    if (this.touching(this.sprites["Person"].andClones())) {
      null;
    } else {
      this.visible = false;
    }
  }

  *whenIReceiveDeleteAssist() {
    if (!(this.costumeNumber == this.stage.vars.currentAssist) && this.x < 0) {
      //this.deleteThisClone();
      this.x = -400;
    }
  }
}

/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class MenuButtons extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Button 6", "./MenuButtons/costumes/Button 6.svg", {
        x: 55.03343903509685,
        y: 2.8415334620529507
      }),
      new Costume("Button 1", "./MenuButtons/costumes/Button 1.svg", {
        x: 54.938748648071936,
        y: 3.038704496878836
      }),
      new Costume("Button 2", "./MenuButtons/costumes/Button 2.svg", {
        x: 55.978098551771666,
        y: 3.3030846335593083
      }),
      new Costume("Button 3", "./MenuButtons/costumes/Button 3.svg", {
        x: 56.74423184105132,
        y: 4.0704364483862605
      }),
      new Costume("Button 4", "./MenuButtons/costumes/Button 4.svg", {
        x: 54.95021997868972,
        y: 4.357583676890414
      }),
      new Costume("Button 5", "./MenuButtons/costumes/Button 5.svg", {
        x: 55.09401235292398,
        y: 4.323189129510581
      })
    ];

    this.sounds = [new Sound("pop", "./MenuButtons/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "zintro" },
        this.whenIReceiveZintro
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone)
    ];

    this.vars.xpos = 267;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveZintro() {
    /* TODO: Implement looks_gotofrontback */
    this.moveAhead();
    this.direction = 90;
    this.goto(-180, 180);
    this.costume = "" + 0 + 0;
    for (let i = 0; i < 6; i++) {
      // will need to change this if we add more menu buttons
      this.costumeNumber += 1;
      this.createClone();
      this.x += 80;
      yield;
    }
  }

  *updateMenuTo(menuSelection2) {
    this.stage.vars.menuSelection = menuSelection2;
    yield* this.broadcastAndWait("update.menu.reset");
    yield* this.broadcastAndWait("update.menu");
  }

  *whenbackdropswitchesto() {
    this.visible = false;
    this.deleteThisClone();
  }

  *startAsClone() {
    this.vars.xpos = this.x;
    this.visible = true;
    while (true) {
      if (this.touching("mouse")) {
        /* TODO: Implement looks_gotofrontback */
        this.moveAhead();
        if (
          this.mouse.down &&
          !(this.stage.vars.menuSelection == this.costumeNumber)
        ) {
          yield* this.updateMenuTo(this.costumeNumber);
        }
        this.effects.brightness = 20;
      } else {
        this.effects.brightness = 0;
      }
      yield;
    }
  }
}

/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class MenuBackground extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Menu 6", "./MenuBackground/costumes/Menu 6.svg", {
        x: -1.7479675006379978,
        y: 105.53934
      }),
      new Costume("Menu 1", "./MenuBackground/costumes/Menu 1.svg", {
        x: -1.7479662503136524,
        y: 105.5393375
      }),
      new Costume("Menu 2", "./MenuBackground/costumes/Menu 2.svg", {
        x: -1,
        y: 107
      }),
      new Costume("Menu 3", "./MenuBackground/costumes/Menu 3.svg", {
        x: -1,
        y: 107
      }),
      new Costume("Menu 4", "./MenuBackground/costumes/Menu 4.svg", {
        x: -1.7479661053027087,
        y: 106.03933764501126
      }),
      new Costume("Menu 5", "./MenuBackground/costumes/Menu 5.svg", {
        x: -1,
        y: 107
      })
    ];

    this.sounds = [new Sound("pop", "./MenuBackground/sounds/pop.wav")];

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
        { name: "update.menu" },
        this.whenIReceiveUpdateMenu
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveZintro() {
    this.stage.vars.menuSelection = 1;
    this.costume = this.stage.vars.menuSelection;
    this.goto(0, 0);
    this.visible = true;
    yield* this.broadcastAndWait("update.menu.reset");
    yield* this.broadcastAndWait("update.menu");
  }

  *whenIReceiveBehind() {
    /* TODO: Implement looks_gotofrontback */
    this.moveAhead();
  }

  *whenIReceiveUpdateMenu() {
    this.costume = this.stage.vars.menuSelection;
    /* TODO: Implement looks_gotofrontback */
    this.moveBehind();
    this.goto(0, 0);
    this.visible = true;
  }

  *whenbackdropswitchesto() {
    this.visible = false;
  }
}

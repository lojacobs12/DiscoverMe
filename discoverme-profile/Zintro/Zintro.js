/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Zintro extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume5", "./Zintro/costumes/costume5.svg", {
        x: 96,
        y: 56
      })
    ];

    this.sounds = [
      new Sound("Ding.mp3", "./Zintro/sounds/Ding.mp3.wav"),
      new Sound(
        "T Yoonmirae - Touch Love (w-fl).mp3",
        "./Zintro/sounds/T Yoonmirae - Touch Love (w-fl).mp3.wav"
      )
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];

    this.audioEffects.volume = 0;

    this.vars._ = -55;
  }

  *whenGreenFlagClicked() {
    yield* this.broadcastAndWait("zzintroremoval");
    yield* this.broadcastAndWait("zintro");
  }
}

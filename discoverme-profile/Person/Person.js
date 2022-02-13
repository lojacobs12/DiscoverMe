/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Person extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Person 1", "./Person/costumes/Person 1.svg", {
        x: 48.574908477008734,
        y: 96.5
      }),
      new Costume("Person 2", "./Person/costumes/Person 2.svg", {
        x: 48.57490695401751,
        y: 96.5
      }),
      new Costume("Person 3", "./Person/costumes/Person 3.svg", {
        x: 49,
        y: 97
      }),
      new Costume("Person 4", "./Person/costumes/Person 4.svg", {
        x: 48.574908477008734,
        y: 96.5
      }),
      new Costume("person", "./Person/costumes/person.svg", {
        x: 44.79508884167441,
        y: 98.60511282812661
      }),
      new Costume("person2", "./Person/costumes/person2.svg", {
        x: 44.79508536669766,
        y: 98.60510631250641
      }),
      new Costume("person3", "./Person/costumes/person3.svg", {
        x: 44.79508420837212,
        y: 98.60510414063299
      }),
      new Costume("person4", "./Person/costumes/person4.svg", {
        x: 44.79509305004649,
        y: 98.60511196875957
      })
    ];

    this.sounds = [new Sound("pop", "./Person/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "zintro" },
        this.whenIReceiveZintro
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "update.person" },
        this.whenIReceiveUpdatePerson
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveZintro() {
    this.stage.vars.basicPersonSkin = 1;
    this.stage.vars.basicPersonGender = 0;
    yield* this.layering();
    this.costume = "Person 1";
    this.goto(-140, 0);
    this.visible = true;
  }

  *layering() {
    yield* this.broadcastAndWait("behind");
    /* TODO: Implement looks_gotofrontback */
    this.moveAhead();
    yield* this.broadcastAndWait("hair");
    yield* this.broadcastAndWait("clothes");
    yield* this.broadcastAndWait("clothes2");
    yield* this.broadcastAndWait("overs");
  }

  *whenIReceiveUpdatePerson() {
    this.costume = this.stage.vars.basicPersonSkin;
  }
}

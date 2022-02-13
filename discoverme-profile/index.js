import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Zintro from "./Zintro/Zintro.js";
import ZnaturePalette from "./ZnaturePalette/ZnaturePalette.js";
import Hair from "./Hair/Hair.js";
import HairBack from "./HairBack/HairBack.js";
import Person from "./Person/Person.js";
import MenuBackground from "./MenuBackground/MenuBackground.js";
import MenuButtons from "./MenuButtons/MenuButtons.js";
import BasicButtonsTop from "./BasicButtonsTop/BasicButtonsTop.js";
import Tops from "./Tops/Tops.js";
import Bottoms from "./Bottoms/Bottoms.js";
import Extra1 from "./Extra1/Extra1.js";
import Extra2 from "./Extra2/Extra2.js";
import Done from "./Done/Done.js";
import AssistiveDevice from "./AssistiveDevice/AssistiveDevice.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Zintro: new Zintro({
    x: -155,
    y: -130,
    direction: 90,
    costumeNumber: 1,
    size: 85,
    visible: false
  }),
  ZnaturePalette: new ZnaturePalette({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false
  }),
  Hair: new Hair({
    x: -140,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true
  }),
  HairBack: new HairBack({
    x: -140,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false
  }),
  Person: new Person({
    x: -140,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true
  }),
  MenuBackground: new MenuBackground({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 2,
    size: 100,
    visible: true
  }),
  MenuButtons: new MenuButtons({
    x: 280,
    y: 180,
    direction: 90,
    costumeNumber: 6,
    size: 100,
    visible: false
  }),
  BasicButtonsTop: new BasicButtonsTop({
    x: 204,
    y: -110,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false
  }),
  Tops: new Tops({
    x: 155,
    y: -80,
    direction: 90,
    costumeNumber: 10,
    size: 75,
    visible: false
  }),
  Bottoms: new Bottoms({
    x: 155,
    y: -50,
    direction: 90,
    costumeNumber: 10,
    size: 75,
    visible: false
  }),
  Extra1: new Extra1({
    x: 155,
    y: -150,
    direction: 90,
    costumeNumber: 10,
    size: 75,
    visible: false
  }),
  Extra2: new Extra2({
    x: 160,
    y: -63,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false
  }),
  Done: new Done({
    x: -200,
    y: -150,
    direction: 89.99999988879998,
    costumeNumber: 1,
    size: 100,
    visible: true
  }),
  AssistiveDevice: new AssistiveDevice({
    x: 155,
    y: 0,
    direction: 90,
    costumeNumber: 3,
    size: 75,
    visible: false
  })
};

const project = new Project(stage, sprites);
export default project;

import TruckContent from "./Model/truckContent.js";
import TetrisShape from "./Model/tetrisShape.js";
import { drawTetrisShape } from "./View/tetrisShapeView.js";
import { drawTruckContent } from "./View/truckContentView.js";

let truckContent = new TruckContent(1, 6, 8);
let tetrisShape = new TetrisShape(1, 1);
let testBox = "testBox";
let testBox2 = "testBox2";
drawTetrisShape(testBox, tetrisShape);

drawTruckContent(testBox2, truckContent);

truckContent.addShape(tetrisShape);
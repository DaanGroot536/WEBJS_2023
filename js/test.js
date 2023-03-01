import TruckContent from "./Model/truckContent.js";
import TetrisShape from "./Model/tetrisShape.js";
import { drawTetrisShape } from "./View/tetrisShapeView.js";

let truckContent = new TruckContent(1, 3, 4);
let tetrisShape = new TetrisShape(5, 1);

let testBox = "testBox";
drawTetrisShape(testBox, tetrisShape);
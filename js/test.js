import TruckContent from "./Model/truckContent.js";
import TetrisShape from "./Model/tetrisShape.js";
import { drawTetrisShape } from "./View/tetrisShapeView.js";
import { drawTruckContent } from "./View/truckContentView.js";

let truckContent = new TruckContent(1, 8, 6);
let tetrisShape = new TetrisShape(5, 4);
let tetrisShape2 = new TetrisShape(2, 1);
let tetrisShape3 = new TetrisShape(3, 1);
let tetrisShape4 = new TetrisShape(4, 2);
let tetrisShape5 = new TetrisShape(1, 2);




let testBox = "testBox";
let testBox2 = "testBox2";
drawTetrisShape(testBox, tetrisShape);

truckContent.addShape(tetrisShape);
truckContent.addShape(tetrisShape2);
truckContent.addShape(tetrisShape3);
truckContent.addShape(tetrisShape4);
truckContent.addShape(tetrisShape5);


drawTruckContent(testBox2, truckContent);

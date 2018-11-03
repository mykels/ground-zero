import {Position} from '../map/position';

export interface BoundingBox {
  bottomLeftPosition: Position;
  topRightPosition: Position;
}

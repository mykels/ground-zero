import {Position} from './map/position';

export interface Entity {
  id: string,
  position: Position,
  heading: number,
}

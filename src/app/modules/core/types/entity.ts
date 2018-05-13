import {Position} from './position';

export interface Entity {
  id: string,
  position: Position,
  heading: number,
}

import {BoundingBox} from '../bounding-box';

export interface SimulationOptions {
  entityCount: number,
  updateInterval: number,
  boundingBox: BoundingBox
}

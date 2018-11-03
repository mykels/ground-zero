import { BoundingBox } from './bounding-box';

export interface SimulationSettings {
  entityCount: number;
  updateRate: number;
  updateFraction: number;
  boundingBox?: BoundingBox;
}

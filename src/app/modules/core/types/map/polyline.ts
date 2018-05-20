import {Cartesian3} from './cartesian3';

export interface Polyline {
  positions: Cartesian3[];
  material: any;
  width?: number;
  distanceDisplayCondition?: any;
}

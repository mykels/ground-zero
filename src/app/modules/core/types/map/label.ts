import {Cartesian3} from './cartesian3';

export interface Label {
  text: string;
  position?: Cartesian3;
  font?: string;
  pixelOffset?: any;
  fillColor?: any,
  outlineColor?: any,
  outlineWidth?: number,
  style?: any;
}

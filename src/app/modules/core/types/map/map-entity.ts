import {Billboard} from './billboard';
import {Label} from './label';
import {Cartesian3} from './cartesian3';
import {Polyline} from './polyline';

export interface MapEntity {
  id: string;
  position: Cartesian3;
  billboards?: Billboard[];
  labels?: Label[];
  polylines?: Polyline[];
}

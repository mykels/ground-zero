import {DiffCalculator} from './diff-calcualator/diff-calculator';
import {ViewerHolder} from './viewer-holder/viewer-holder';
import {MapEntityDrawer} from './map-entity-drawer/map-entity-drawer.service';

export const CESIUM_MAP_SERVICE = [
  DiffCalculator,
  MapEntityDrawer,
  ViewerHolder
];

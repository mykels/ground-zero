import {DiffCalculator} from './diff-calcualator/diff-calculator';
import {MapEntitiesDrawer} from './map-entities-drawer/map-entities-drawer';
import {ViewerHolder} from './viewer-holder/viewer-holder';

export const CESIUM_MAP_SERVICE = [
  DiffCalculator,
  MapEntitiesDrawer,
  ViewerHolder
];

import { DiffCalculator } from './diff-calcualator/diff-calculator';
import { MapEntityDrawer } from './map-entity-drawer/map-entity-drawer.service';
import { ViewerInitializerService } from "./viewer/viewer-initializer/viewer-initializer.service";
import { ViewerHolder } from "./viewer/viewer-holder/viewer-holder";

export const CESIUM_MAP_SERVICE = [
  DiffCalculator,
  MapEntityDrawer,
  ViewerHolder,
  ViewerInitializerService
];

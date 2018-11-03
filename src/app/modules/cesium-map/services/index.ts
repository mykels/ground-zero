import { ViewerInitializerService } from "./viewer/viewer-initializer/viewer-initializer.service";
import { ViewerHolder } from "./viewer/viewer-holder/viewer-holder";
import { CameraControllerService } from "./camera/camera-controller.service";
import { EntityRenderer } from "./entity-renderer/entity-renderer.service";

export const CESIUM_MAP_SERVICE = [
  EntityRenderer,
  ViewerHolder,
  ViewerInitializerService,
  CameraControllerService
];

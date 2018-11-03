import { Injectable } from "@angular/core";
import { ViewerHolder } from "../viewer/viewer-holder/viewer-holder";
import { ConfigService } from "../../../app/services/config/config.service";
import { ZoomConfig } from "../../../app/types/config/map/zoom/zoom-config";

@Injectable()
export class CameraControllerService {
  constructor(private viewerHolder: ViewerHolder,
              private configService: ConfigService) {

  }

  init(onInit: () => any) {
    this.flyToZoomLocation(onInit);
  }

  private flyToZoomLocation(onInit: () => any) {
    const zoomConfig: ZoomConfig = this.configService.getConfig().map.zoom;

    this.viewerHolder.getViewer().subscribe((viewer: any) => {
      viewer.camera.flyTo({
        complete: () => onInit(),
        destination: Cesium.Cartesian3.fromDegrees(zoomConfig.longitude, zoomConfig.latitude, zoomConfig.altitude),
      });
    });
  }
}

import { Injectable } from "@angular/core";
import { ViewerHolder } from "../viewer-holder/viewer-holder";
import { ConfigService } from "../../../../app/services/config/config.service";

@Injectable()
export class ViewerInitializerService {
  constructor(private viewerHolder: ViewerHolder,
              private configService: ConfigService) {

  }

  init(container: string, manualRendering: boolean = false) {
    let viewerOptions: any = this.getViewerOptions();


    if (manualRendering) {
      this.configureManualRendering(viewerOptions);
    }

    this.configureImageryProvider(viewerOptions);

    this.viewerHolder.init(new Cesium.Viewer(container, viewerOptions));
  }

  getViewerOptions(): any {
    return this.configService.getConfig().map.cesium.viewerOptions;
  }

  private configureManualRendering(viewerOptions: any) {
    viewerOptions["requestRenderMode"] = true;
    viewerOptions["maximumRenderTimeChange"] = Infinity;
  }

  private configureImageryProvider(viewerOptions: any) {
    viewerOptions["imageryProvider"] = Cesium.createTileMapServiceImageryProvider({
      url: Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
    });
  }
}

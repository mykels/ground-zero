import { Injectable } from '@angular/core';
import { ConfigService } from "../../app/services/config/config.service";

@Injectable()
export class MapViewConfigurator {

  constructor(private configService: ConfigService) {

  }

  get(): any {
    return {
      imageryProvider: Cesium.createTileMapServiceImageryProvider({
        url: Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
      }),
      ...this.configService.getConfig().map.cesium.viewerOptions
    };
  }
}

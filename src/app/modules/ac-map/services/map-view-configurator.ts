import {Injectable} from '@angular/core';

@Injectable()
export class MapViewConfigurator {

  constructor() {

  }

  get(): any {
    return {
      imageryProvider: Cesium.createTileMapServiceImageryProvider({
        url: Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
      }),
      baseLayerPicker: false,
      geocoder: false,
      fullscreenButton: false,
      homeButton: false,
      infoBox: true,
      sceneModePicker: false,
      timeline: false,
      selectionIndicator: false,
      navigationHelpButton: false,
      navigationInstructionsInitiallyVisible: false,
      animation: false,
      scene3DOnly: true,
    }
  }
}

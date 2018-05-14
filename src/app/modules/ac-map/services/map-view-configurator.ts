import {Injectable} from '@angular/core';

@Injectable()
export class MapViewConfigurator {

  constructor() {

  }

  get(): any {
    return {
      geocoder: false,
      fullscreenButton: false,
      baseLayerPicker: false,
      homeButton: false,
      infoBox: true,
      sceneModePicker: false,
      timeline: false,
      selectionIndicator: false,
      navigationHelpButton: false,
      navigationInstructionsInitiallyVisible: false,
      animation: false
    }
  }
}

import {Component, OnInit} from '@angular/core';
import 'rxjs/Rx';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/store';
import {Observable} from 'rxjs/Observable';
import {Entity} from '../../../core/types/entity';
import {Map} from 'immutable';

@Component({
  selector: 'gz-cesium-map',
  templateUrl: './cesium-map.component.html',
  styleUrls: ['./cesium-map.component.css'],
})
export class CesiumMapComponent implements OnInit {
  viewer: any;
  entitiesMap$: Observable<Map<string, Entity>>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    console.log('CesiumMapComponent:initialized');
    this.initViewer();
    this.optimizeViewer();
    this.initEntities();
  }

  private optimizeViewer() {
    const lowQuality = true;
    this.viewer.scene.debugShowFramesPerSecond = true;
    this.viewer.scene.fxaa = !lowQuality;
    this.viewer.scene.sunBloom = !lowQuality;
    this.viewer.scene.skyAtmosphere.show = !lowQuality;
    this.viewer.scene.fog.enabled = !lowQuality;
    this.viewer.shadows = !lowQuality;
    this.viewer.terrainShadows = !lowQuality;
    this.viewer.scene.shadowMap.enabled = !lowQuality;
  }

  private initViewer() {
    this.viewer = new Cesium.Viewer('cesiumMap', this.getViewerOptions());
  }

  private getViewerOptions(): any {
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
      scene3DOnly: true
    }
  }

  private initEntities() {
    this.entitiesMap$ = this.store.select('entities');
  }
}

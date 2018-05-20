import {AfterViewInit, Component, OnInit} from '@angular/core';
import 'rxjs/Rx';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/store';
import {Observable} from 'rxjs/Observable';
import {Entity} from '../../../core/types/entity';
import {ViewerHolder} from '../../services/viewer-holder/viewer-holder';
import {EntityDistributor} from '../../../core/services/distribution/entity-distributor.service';

@Component({
  selector: 'gz-cesium-map',
  templateUrl: './cesium-map.component.html',
  styleUrls: ['./cesium-map.component.css'],
})
export class CesiumMapComponent implements OnInit, AfterViewInit {
  viewer: any;
  entities$: Observable<Entity[]>;
  lastPreRenderTime = 0;

  constructor(private store: Store<AppState>,
              private viewerHolder: ViewerHolder,
              private entityDistributor: EntityDistributor) {
  }

  ngOnInit(): void {
    console.log('CesiumMapComponent:initialized');
    this.initViewer();
    this.optimizeScene();
    this.initEntities();
    this.registerRenderEvents();
    this.viewerHolder.init(this.viewer);
  }

  ngAfterViewInit(): void {
    this.flyHome();
  }

  private optimizeScene() {
    this.viewer.scene.debugShowFramesPerSecond = true;
    this.viewer.scene.fxaa = false;
    this.viewer.scene.sunBloom = false;
    this.viewer.scene.skyAtmosphere.show = false;
    this.viewer.scene.fog.enabled = false;
    this.viewer.shadows = false;
    this.viewer.terrainShadows = false;
    this.viewer.scene.shadowMap.enabled = false;
    this.viewer.scene.shadowMap.enabled = false;
    this.viewer.scene.cameraEventWaitTime = 3000;
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
      scene3DOnly: true,
      requestRenderMode: true,
      maximumRenderTimeChange: Infinity
    }
  }

  private initEntities() {
    this.entities$ = this.store.select('entities');
  }

  private registerRenderEvents() {
    this.viewer.scene.preRender.addEventListener(() => {
      this.lastPreRenderTime = new Date().getTime();
    });

    this.viewer.scene.postRender.addEventListener(() => {
      console.info(`cesium:postRender took ${new Date().getTime() - this.lastPreRenderTime} ms`);
    });
  }

  private flyHome() {
    this.viewer.camera.flyTo({
      complete: this.onFlyComplete.bind(this),
      destination: Cesium.Cartesian3.fromDegrees(33.105299899999995, 37.909721799999835, 2000000.0),
    });
  }

  private onFlyComplete() {
    this.entityDistributor.init();
  }
}

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../store/store';
import { EntityDistributor } from '../../../core/services/distribution/entity-distributor.service';
import { Observable } from 'rxjs';
import { Entity } from '../../../core/types/entity/entity';
import { ViewerInitializerService } from "../../services/viewer/viewer-initializer/viewer-initializer.service";
import { ViewerHolder } from "../../services/viewer/viewer-holder/viewer-holder";

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
              private viewerInitializer: ViewerInitializerService,
              private viewerHolder: ViewerHolder,
              private entityDistributor: EntityDistributor) {
  }

  ngOnInit(): void {
    this.initViewer();
    // this.optimizeScene();
    this.initEntities();
    // this.registerRenderEvents();
    // this.viewerHolder.init(this.viewer);
  }

  ngAfterViewInit(): void {
    this.flyHome();
  }

  private initViewer() {
    this.viewerInitializer.init('cesiumMap', true);
  }

  private initEntities() {
    this.entities$ = this.store.pipe(select('entities'));
  }

  private registerRenderEvents() {
    // this.viewer.scene.preRender.addEventListener(() => {
    //   this.lastPreRenderTime = new Date().getTime();
    // });
    //
    // this.viewer.scene.postRender.addEventListener(() => {
    //   console.info(`cesium:postRender took ${new Date().getTime() - this.lastPreRenderTime} ms`);
    // });
  }

  private flyHome() {
    this.viewerHolder.getViewer().subscribe((viewer: any) => {
      viewer.camera.flyTo({
        complete: this.onFlyComplete.bind(this),
        destination: Cesium.Cartesian3.fromDegrees(33.105299899999995, 37.909721799999835, 2000000.0),
      });
    })
  }

  private onFlyComplete() {
    this.entityDistributor.init();
  }
}

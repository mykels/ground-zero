import { AfterViewInit, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../store/store';
import { EntityDistributor } from '../../../core/services/distribution/entity-distributor.service';
import { Observable } from 'rxjs';
import { Entity } from '../../../core/types/entity/entity';
import { ViewerInitializerService } from "../../services/viewer/viewer-initializer/viewer-initializer.service";
import { CameraControllerService } from "../../services/camera/camera-controller.service";
import { EntityRenderer } from "../../services/entity-renderer/entity-renderer.service";
import { Diff } from "../../../core/types/entity/diff";

@Component({
  selector: 'gz-cesium-map',
  templateUrl: './cesium-map.component.html',
  styleUrls: ['./cesium-map.component.css'],
})
export class CesiumMapComponent implements OnInit, AfterViewInit {
  entities$: Observable<Entity[]>;

  constructor(private store: Store<AppState>,
              private viewerInitializer: ViewerInitializerService,
              private cameraController: CameraControllerService,
              private entityDistributor: EntityDistributor,
              private entityRenderer: EntityRenderer) {
  }

  ngOnInit(): void {
    this.initViewer();
    this.initEntities();
  }

  ngAfterViewInit(): void {
    this.cameraController.init(() => this.entityDistributor.init());
  }

  onLayerChange(diff: Diff<Entity>) {
    this.entityRenderer.render(diff);
  }

  private initViewer() {
    this.viewerInitializer.init('cesiumMap', true);
  }

  private initEntities() {
    this.entities$ = this.store.pipe(select('entities'));
  }
}

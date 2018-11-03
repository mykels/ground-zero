import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AcNotification, SceneMode, ViewerConfiguration } from 'angular-cesium';
import { MapViewConfigurator } from '../../services/map-view-configurator';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/store';
import { NotificationBuilder } from '../../services/notification/notification-builder';
import { MapEntityBuilder } from '../../../core/services/builders/map-entity-builder';
import { EntityDistributor } from '../../../core/services/distribution/entity-distributor.service';
import { Observable } from 'rxjs';
import { flatMap, map, take } from 'rxjs/operators';
import { Entity } from '../../../core/types/entity/entity';
import { ConfigService } from "../../../app/services/config/config.service";
import { ZoomConfig } from "../../../app/types/config/map/zoom/zoom-config";

@Component({
  selector: 'gz-ac-map',
  templateUrl: './ac-map.component.html',
  styleUrls: ['./ac-map.component.css'],
})
export class AcMapComponent implements OnInit, AfterViewInit {
  defaultSceneMode: SceneMode;
  viewer: any;
  entities$: Observable<AcNotification>;

  constructor(private viewerConfiguration: ViewerConfiguration,
              private mapViewConfigurator: MapViewConfigurator,
              private notificationBuilder: NotificationBuilder,
              private mapEntityBuilder: MapEntityBuilder,
              private configService: ConfigService,
              private entityDistributor: EntityDistributor,
              private store: Store<AppState>) {
    this.viewerConfiguration.viewerOptions = this.mapViewConfigurator.get();
    this.viewerConfiguration.viewerModifier = viewer => {
      this.viewer = viewer;
      viewer.scene.debugShowFramesPerSecond = true;
    };
  }

  ngOnInit(): void {
    this.initDefaults();

    this.entities$ = this.store.select('entities').pipe(
      map((entities: Entity[]) => {
        return entities.map(this.notificationBuilder.build.bind(this));
      }),
      flatMap((notifications: AcNotification[]) => {
        return notifications.map(notification => {
          notification.entity = this.mapEntityBuilder.build(notification.entity);
          return notification;
        });
      }));

    this.entities$.pipe(take(1));
  }

  initDefaults() {
    this.defaultSceneMode = SceneMode.SCENE3D;
  }

  ngAfterViewInit(): void {
    this.flyHome();
  }

  private flyHome() {
    const zoom: ZoomConfig = this.configService.getConfig().map.zoom;

    this.viewer.camera.flyTo({
      complete: this.onFlyComplete.bind(this),
      destination: Cesium.Cartesian3.fromDegrees(zoom.longitude, zoom.latitude, zoom.altitude),
    });
  }

  private onFlyComplete() {
    this.entityDistributor.init();
  }

}

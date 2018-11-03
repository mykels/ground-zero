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

@Component({
  selector: 'gz-ac-map',
  templateUrl: './ac-map.component.html',
  styleUrls: ['./ac-map.component.css'],
})
export class AcMapComponent implements OnInit, AfterViewInit {
  defaultSceneMode: SceneMode;
  homeLocation: any;
  viewer: any;
  private entities$: Observable<AcNotification>;

  constructor(private viewerConfiguration: ViewerConfiguration,
              private mapViewConfigurator: MapViewConfigurator,
              private notificationBuilder: NotificationBuilder,
              private mapEntityBuilder: MapEntityBuilder,
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

    this.entities$.pipe(take(1)).subscribe(entity => {
      console.log('ac-map', entity);
    });
  }

  initDefaults() {
    this.defaultSceneMode = SceneMode.SCENE3D;
    this.homeLocation = ({
      duration: 2,
      destination: Cesium.Cartesian3.fromDegrees(32.085299899999995, 34.78176759999997, 2000),
      orientation: {
        pitch: Cesium.Math.toRadians(-90),
      }
    });
  }

  ngAfterViewInit(): void {
    this.flyHome();
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

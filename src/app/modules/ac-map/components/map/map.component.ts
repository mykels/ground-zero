import {Component, OnInit} from '@angular/core';
import {AcNotification, MapLayerProviderOptions, SceneMode, ViewerConfiguration} from 'angular-cesium';
import {MapViewConfigurator} from '../../services/map-view-configurator';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/store';
import {MapEntityBuilder} from '../../services/map-entity-builder';
import {NotificationBuilder} from '../../services/notification/notification-builder';
import {Entity} from '../../../core/types/entity';

@Component({
  selector: 'gz-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  private entities$: Observable<AcNotification>;
  private defaultSceneMode: SceneMode;
  private defaultProvider: MapLayerProviderOptions;

  private homeLocation: any;

  constructor(private viewerConfiguration: ViewerConfiguration,
              private mapViewConfigurator: MapViewConfigurator,
              private notificationBuilder: NotificationBuilder,
              private mapEntityBuilder: MapEntityBuilder,
              private store: Store<AppState>) {
    this.viewerConfiguration.viewerOptions = this.mapViewConfigurator.get();
  }

  ngOnInit(): void {
    console.log('initializing map component');

    this.initDefaults();

    this.entities$ = this.store.select('distributedEntity')
      .map((distributedEntity: Entity) => {
        return this.notificationBuilder.build(distributedEntity)
      })
      .map((notification: AcNotification) => {
        notification.entity = this.mapEntityBuilder.build(notification.entity);
        return notification;
      });
  }

  initDefaults() {
    this.defaultSceneMode = SceneMode.PERFORMANCE_SCENE2D;
    this.defaultProvider = MapLayerProviderOptions.OFFLINE;
    this.homeLocation = ({
      duration: 2,
      destination: Cesium.Cartesian3.fromDegrees(32.085299899999995, 34.78176759999997, 2000),
      orientation: {
        pitch: Cesium.Math.toRadians(-90),
      }
    });
  }
}

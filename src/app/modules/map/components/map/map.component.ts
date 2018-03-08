import {Component, OnInit} from '@angular/core';
import {AcNotification, CesiumService, MapLayerProviderOptions, SceneMode, ViewerConfiguration} from 'angular-cesium';
import {MapViewConfigurator} from '../../services/map-view-configurator';
import {EntityDistributor} from '../../../core/services/distribution/entity-distributor.service';
import {Observable} from 'rxjs/Observable';
import {Entity} from '../../../core/types/entity';

@Component({
  selector: 'gz-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [ViewerConfiguration, CesiumService],
})
export class MapComponent implements OnInit {
  private entities$: Observable<AcNotification>;
  private defaultSceneMode: SceneMode;
  private mapProvider: MapLayerProviderOptions;
  private homeLocation: any;

  constructor(private viewerConfiguration: ViewerConfiguration, private mapViewConfigurator: MapViewConfigurator,
              private entityDistributorService: EntityDistributor) {
    this.viewerConfiguration.viewerOptions = this.mapViewConfigurator.get();
  }

  ngOnInit(): void {
    this.initDefaults();

    this.entities$ = this.entityDistributorService.subscribe().map(notification => {
      const entity = notification.entity as Entity;
      entity.position = Cesium.Cartesian3.fromDegrees(
        entity.position.lat, entity.position.long, entity.position.alt);
      return notification;
    });
  }

  initDefaults() {
    this.mapProvider = MapLayerProviderOptions.OFFLINE;
    this.defaultSceneMode = SceneMode.COLUMBUS_VIEW;
    this.homeLocation = ({
      duration: 2,
      destination: Cesium.Cartesian3.fromDegrees(32.085299899999995, 34.78176759999997, 2000),
      orientation: {
        pitch: Cesium.Math.toRadians(-90),
      }
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {AcNotification, SceneMode, ViewerConfiguration} from 'angular-cesium';
import {MapViewConfigurator} from '../../services/map-view-configurator';
import {EntityDistributor} from '../../../core/services/distribution/entity-distributor.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Store} from '@ngrx/store';
import {Entity} from '../../../core/types/entity';
import {AddEntity} from '../../../core/store/entities.actions';
import {AppState} from '../../../core/store/entities.reducers';

@Component({
  selector: 'gz-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  private entities$: Observable<AcNotification>;
  private defaultSceneMode: SceneMode;
  private homeLocation: any;

  constructor(private viewerConfiguration: ViewerConfiguration, private mapViewConfigurator: MapViewConfigurator,
              private entityDistributorService: EntityDistributor, private store: Store<AppState>) {
    this.viewerConfiguration.viewerOptions = this.mapViewConfigurator.get();
  }

  ngOnInit(): void {
    console.log('initializing map component');

    this.initDefaults();

    const storedEntities$: any = this.store.select('entities');

    setInterval(() => {
      const entity: Entity = {
        id: 'micha',
        position: 'dani',
        heading: 2,
        image: '/some/image',
      };

      console.log('dispatching entity');
      this.store.dispatch(new AddEntity(entity));
    }, 1000);

    storedEntities$.subscribe((event) => {
      console.log('got event from store!', event);
    });


    this.entities$ = this.entityDistributorService.subscribe().map(notification => {
      const entity = notification.entity as any;
      entity.position = Cesium.Cartesian3.fromDegrees(
        entity.position.lat, entity.position.long, entity.position.alt);

      entity.historyTail.positions = entity.historyTail.positions.map(
        position => Cesium.Cartesian3.fromDegrees(position.lat, position.long, position.alt));

      entity.displayCondition = new Cesium.DistanceDisplayCondition(0.0, 1000000.0);

      Observable.interval(1000).subscribe();


      return notification;
    });
  }

  initDefaults() {
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

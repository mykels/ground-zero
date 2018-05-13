import {Injectable} from '@angular/core';
import {MapEntity} from '../types/map-entity';

@Injectable()
export class MapEntityBuilder {
  build(entity: any): MapEntity {
    return {
      id: entity.id,
      position: Cesium.Cartesian3.fromDegrees(entity.position.lon, entity.position.lon, entity.position.alt),
      rotation: Cesium.Math.toRadians(-entity.heading),
      image: '/assets/images/fighter.png',
      scale: 0.1
    }
  }
}

import {Injectable} from '@angular/core';
import {MapEntity} from '../../types/map/map-entity';
import {Cartesian3} from '../../types/map/cartesian3';

@Injectable()
export class MapEntityBuilder {
  build(entity: any): MapEntity {
    const position = Cesium.Cartesian3.fromDegrees(entity.position.lat, entity.position.lon, entity.position.alt);

    return {
      id: entity.id,
      position,
      billboards: [{
        rotation: Cesium.Math.toRadians(-entity.heading),
        image: '/assets/images/fighter.png',
        scale: 0.15
      }],
      labels: [,
        {
          text: `XP-${entity.id}`,
          font: '12px Helvetica',
          pixelOffset: new Cesium.Cartesian2(-35, 30),
          fillColor: Cesium.Color.fromCssColorString('#95ffbe'),
          outlineColor: Cesium.Color.BLACK,
          outlineWidth: 1,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE
        },
        {
          text: `XP-${entity.id}`,
          font: '12px Helvetica',
          pixelOffset: new Cesium.Cartesian2(-35, -20),
          fillColor: Cesium.Color.fromCssColorString('#ff7656'),
          outlineColor: Cesium.Color.BLACK,
          outlineWidth: 1,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE
        },
        {
          text: `LY-${entity.id}`,
          font: '10px Helvetica',
          pixelOffset: new Cesium.Cartesian2(20, 5),
          fillColor: Cesium.Color.fromCssColorString('#8993ff'),
          outlineColor: Cesium.Color.BLACK,
          outlineWidth: 1,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE
        }],
      polylines: [
        {
          positions: this.computeHeadVector(position, entity),
          material: Cesium.Color.fromCssColorString('#ffe553'),
          width: 2
        },
        {
          positions: this.computeBackVector(position, entity),
          material: Cesium.Color.fromCssColorString('#20ebff'),
          width: 2
        }
      ]
    }
  }

  private computeHeadVector(position: Cartesian3, entity: any): Cartesian3[] {
    const points = [position];
    const endPoint = Cesium.Cartesian3.fromDegrees(entity.position.lat + 0.15, entity.position.lon + 0.15);
    points.push(endPoint);
    return points;
  }

  private computeBackVector(position: Cartesian3, entity: any): Cartesian3[] {
    const points = [position];
    const endPoint = Cesium.Cartesian3.fromDegrees(entity.position.lat - 0.15, entity.position.lon - 0.15);
    points.push(endPoint);
    return points;
  }
}

import {Injectable} from '@angular/core';
import {Position} from '../../types/map/position';
import { SimulationSettings } from '../../types/simulation/simulation-settings';
import { Entity } from '../../types/entity/entity';
import { BoundingBox } from '../../types/simulation/bounding-box';

@Injectable()
export class EntityGenerator {

  generateEntities(options: SimulationSettings): Entity[] {
    const entities: Entity[] = [];

    for (let i = 0; i < options.entityCount; i++) {
      const generatedEntity = this.generateEntity(`entity_${i}`,
        options.boundingBox);
      entities.push(generatedEntity);
    }

    return entities;
  }

  generateEntity(id: string, boundingBox: BoundingBox): Entity {
    return {
      id,
      position: this.generatePosition(boundingBox),
      heading: Math.random()
    };
  }

  generatePosition(boundingBox: BoundingBox): Position {
    return {
      lat: Cesium.Math.randomBetween(
        boundingBox.bottomLeftPosition.lat, boundingBox.topRightPosition.lat),
      lon: Cesium.Math.randomBetween(
        boundingBox.bottomLeftPosition.lon, boundingBox.topRightPosition.lon),
      alt: 0
    };
  }
}

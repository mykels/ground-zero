import {Injectable} from '@angular/core';
import {Entity} from '../../types/entity';
import {SimulationOptions} from '../../types/simulation/simulation-options';
import {BoundingBox} from '../../types/bounding-box';
import {Position} from '../../types/map/position';

@Injectable()
export class EntityGenerator {

  generateEntities(options: SimulationOptions): Entity[] {
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
    }
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

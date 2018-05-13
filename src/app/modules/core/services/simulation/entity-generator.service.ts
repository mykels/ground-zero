import {Injectable} from '@angular/core';
import {Entity} from '../../types/entity';
import {Position} from '../../types/position';

const getSign = () => Math.round(Math.random()) * 2 - 1;

@Injectable()
export class EntityGenerator {

  generateEntities(entityCount: number, anchorPosition: Position): Entity[] {
    const entities: Entity[] = [];

    for (let i = 0; i < entityCount; i++) {
      const generatedEntity = this.generateEntity(`entity_${i}`, anchorPosition);
      entities.push(generatedEntity);
    }

    return entities;
  }

  generateEntity(id: string, anchorPosition: any): Entity {
    return {
      id,
      position: this.generatePosition(anchorPosition, 2),
      heading: Math.random()
    }
  }

  generatePosition(anchorPosition: Position, distance = 1): Position {
    return {
      lat: anchorPosition.lat + getSign() * (Math.random() * distance),
      lon: anchorPosition.lon + getSign() * (Math.random() * distance),
      alt: 0
    };
  }

}

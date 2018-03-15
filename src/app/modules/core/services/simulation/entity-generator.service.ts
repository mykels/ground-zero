import {Injectable} from '@angular/core';
import {Entity} from '../../types/entity';

const getSign = () => Math.round(Math.random()) * 2 - 1;

@Injectable()
export class EntityGenerator {

  generateEntities(entityCount: number, anchorPosition: any): Entity[] {
    const entities: Entity[] = [];

    for (let i = 0; i < entityCount; i++) {
      entities.push(this.generateEntity(`entity_${i}`, anchorPosition));
    }

    return entities;
  }

  generateEntity(id: string, anchorPosition: any): Entity {
    return {
      id,
      position: this.generatePosition(anchorPosition, 20),
      heading: 90,
      image: '/assets/images/fighter-jet.png',
    }
  }

  generatePosition(anchorPosition: any, distance = 1) {
    return {
      lat: anchorPosition.lat + (Math.random() * distance),
      long: anchorPosition.long + (Math.random() * distance),
      alt: Math.floor(anchorPosition.alt + getSign() * (Math.random() * 10))
    };
  }

}

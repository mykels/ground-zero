import {Injectable} from '@angular/core';
import {Entity} from '../../types/entity';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {AcNotification, ActionType} from 'angular-cesium';
import {EntityGenerator} from './entity-generator.service';

const getSign = () => Math.round(Math.random()) * 2 - 1;

@Injectable()
export class EntitySimulator {
  private entities: Entity[];
  private entitySubject: Subject<AcNotification> = new Subject<AcNotification>();

  constructor(private entityGenerator: EntityGenerator) {

  }

  simulate(entities: Entity[]): Observable<AcNotification> {
    this.entities = entities;

    this.entities.forEach(entity => {
      this.entitySubject.next(this.entityToNotification(entity));
    });

    this.simulateUpdates();

    return this.entitySubject;
  }

  simulateUpdates() {
    this.entities.forEach(entity => {
      setInterval(() => {
        entity.heading += getSign() * 2;
        entity.position = this.entityGenerator.generatePosition(entity.position, 0.3);

        this.entitySubject.next(this.entityToNotification(entity));
      }, 10);
    });
  }

  entityToNotification(entity: Entity) {
    return {
      id: entity.id,
      actionType: ActionType.ADD_UPDATE,
      entity: {
        id: entity.id,
        image: '/assets/images/fighter-jet.png',
        alt: entity.position.altitue,
        heading: entity.heading,
        position: entity.position
      }
    }
  }
}

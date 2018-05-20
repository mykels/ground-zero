import {Injectable} from '@angular/core';
import {Entity} from '../../types/entity';
import {EntityGenerator} from './entity-generator.service';
import {AppState} from '../../../store/store';
import {Store} from '@ngrx/store';
import {SimulationOptions} from '../../types/simulation/simulation-options';
import 'rxjs/add/operator/take';
import {AddEntitiesAction, UpdateEntitiesAction} from '../../../store/entities/entities.actions';

const getSign = () => Math.round(Math.random()) * 2 - 1;

@Injectable()
export class EntitySimulator {
  constructor(private entityGenerator: EntityGenerator,
              private store: Store<AppState>) {
  }

  simulate(options: SimulationOptions): void {
    this.initInitialEntities(options);
    this.simulateUpdates(options);
  }

  simulateUpdates(options: SimulationOptions) {
    this.store.select('entities')
      .take(1)
      .subscribe(entities => {
        setInterval(() => {
          entities.forEach(entity => {
            entity.heading = (entity.heading * getSign() * 20) % 180;
            entity.position = this.entityGenerator.generatePosition(options.boundingBox);
          });

          this.store.dispatch(new UpdateEntitiesAction(entities));

        }, options.updateInterval);
      });
  }

  private initInitialEntities(options: SimulationOptions) {
    const entities: Entity[] = this.entityGenerator.generateEntities(options);

    this.store.dispatch(new AddEntitiesAction(entities));
  }
}

import {Injectable} from '@angular/core';
import {Entity} from '../../types/entity';
import {EntityGenerator} from './entity-generator.service';
import {AppState} from '../../../store/store';
import {Store} from '@ngrx/store';
import {SimulationOptions} from '../../types/simulation/simulation-options';
import {AddEntityAction, UpdateEntityAction} from '../../../store/entities/entities.actions';
import 'rxjs/add/operator/take';

const getSign = () => Math.round(Math.random()) * 2 - 1;

@Injectable()
export class EntitySimulator {
  constructor(private entityGenerator: EntityGenerator,
              private store: Store<AppState>) {

  }

  simulate(options: SimulationOptions): void {
    this.initInitialEntities(options);
    this.simulateUpdates();
  }

  simulateUpdates() {
    this.store.select('entities')
      .take(1)
      .subscribe(entities => {
        entities.forEach(entity => {
          setInterval(() => {
            entity.heading += getSign() * 2;
            entity.position = this.entityGenerator.generatePosition(entity.position, 0.3);
            this.store.dispatch(new UpdateEntityAction(entity));
          }, 1000);
        });
      });
  }

  private initInitialEntities(options: SimulationOptions) {
    const entities: Entity[] = this.entityGenerator.generateEntities(options.entityCount, options.anchorPosition);

    entities.forEach(entity => {
      this.store.dispatch(new AddEntityAction(entity));
    });
  }
}

import { Injectable } from '@angular/core';
import { EntityGenerator } from './entity-generator.service';
import { AppState } from '../../../store/store';
import { select, Store } from '@ngrx/store';
import { UpdateEntitiesAction } from '../../../store/entities/entities.actions';
import { interval, Subscription } from 'rxjs/index';
import { Entity } from '../../types/entity/entity';
import { SimulationSettings } from '../../types/simulation/simulation-settings';

const getSign = () => Math.round(Math.random()) * 2 - 1;

@Injectable()
export class EntitySimulator {
  updateIntervalSubscription: Subscription;
  entities: Entity[];

  constructor(private entityGenerator: EntityGenerator,
              private store: Store<AppState>) {
  }

  simulate(): void {
    this.init();

  }

  private init() {
    this.store.pipe(select('simulationSettings'))
    .subscribe((simulationSettings: SimulationSettings) => {
      this.clearCurrentSimulation();
      this.initInitialEntities(simulationSettings);
      this.simulateUpdates(simulationSettings);
    });
  }

  private clearCurrentSimulation() {
    this.entities = [];
    this.updateEntityStore();

    if (this.updateIntervalSubscription) {
      this.updateIntervalSubscription.unsubscribe();
    }
  }

  private simulateUpdates(simulationSettings: SimulationSettings) {
    this.updateIntervalSubscription = interval(simulationSettings.updateRate)
    .subscribe(() => {
      this.entities.forEach((entity: Entity) => {
        if (Math.random() >= (1 - simulationSettings.updateFraction)) {
          entity.heading = (entity.heading * getSign() * 20) % 180;
          entity.position = this.entityGenerator.generatePosition(simulationSettings.boundingBox);
        }
      });

      this.updateEntityStore();
    });
  }

  private initInitialEntities(simulationSettings: SimulationSettings) {
    this.entities = this.entityGenerator.generateEntities(simulationSettings);
    this.updateEntityStore();
  }

  private updateEntityStore() {
    this.store.dispatch(new UpdateEntitiesAction(this.entities));
  }

}

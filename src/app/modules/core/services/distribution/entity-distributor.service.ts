import {Injectable} from '@angular/core';
import {EntitySimulator} from '../simulation/entity-simulator.service';

@Injectable()
export class EntityDistributor {
  constructor(private entitySimulator: EntitySimulator) {

  }

  init(): void {
    return this.entitySimulator.simulate();
  }
}

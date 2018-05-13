import {Injectable} from '@angular/core';
import {EntitySimulator} from '../simulation/entity-simulator.service';
import {SimulationOptions} from '../../types/simulation/simulation-options';

@Injectable()
export class EntityDistributor {
  constructor(private entitySimulator: EntitySimulator) {

  }

  init(): void {
    return this.entitySimulator.simulate(this.getOptions());
  }

  getOptions(): SimulationOptions {
    return {
      entityCount: 50,
      anchorPosition: {
        lat: 32.085299899999995,
        lon: 34.78176759999997,
        alt: 10000
      }
    }
  }
}

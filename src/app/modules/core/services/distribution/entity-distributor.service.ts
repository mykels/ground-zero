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
      entityCount: 100,
      boundingBox: {
        bottomLeftPosition: {
          lat: 30.035299899999995,
          lon: 33.2876759999997,
          alt: 0
        },
        topRightPosition: {
          lat: 36.175299899999995,
          lon: 42.53176759999997,
          alt: 0
        }
      }
    }
  }
}

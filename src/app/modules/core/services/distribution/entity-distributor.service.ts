import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {EntityGenerator} from '../simulation/entity-generator.service';
import {EntitySimulator} from '../simulation/entity-simulator.service';
import {AcNotification} from 'angular-cesium';

@Injectable()
export class EntityDistributor {
  constructor(private entityGenerator: EntityGenerator,
              private entitySimulator: EntitySimulator) {

  }

  subscribe(): Observable<AcNotification> {
    return this.entitySimulator.simulate(this.init());
  }

  init() {
    const entityCount = 50;
    const anchorPosition = {
      lat: 32.085299899999995,
      long: 34.78176759999997,
      alt: 10000
    };

    return this.entityGenerator.generateEntities(entityCount, anchorPosition);
  }
}

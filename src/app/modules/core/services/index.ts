import {EntityDistributor} from './distribution/entity-distributor.service';
import {EntityGenerator} from './simulation/entity-generator.service';
import {EntitySimulator} from './simulation/entity-simulator.service';
import {MapEntityBuilder} from './builders/map-entity-builder';

export const CORE_SERVICES = [
  EntityGenerator,
  EntitySimulator,
  EntityDistributor,
  MapEntityBuilder
];

import {EntityDistributor} from './distribution/entity-distributor.service';
import {EntityGenerator} from './simulation/entity-generator.service';
import {EntitySimulator} from './simulation/entity-simulator.service';

export const CORE_SERVICES = [
  EntityGenerator,
  EntitySimulator,
  EntityDistributor
];

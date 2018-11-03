import {EntityDistributor} from './distribution/entity-distributor.service';
import {EntityGenerator} from './simulation/entity-generator.service';
import {EntitySimulator} from './simulation/entity-simulator.service';
import {MapEntityBuilder} from './builders/map-entity-builder';
import {MapProfilerService} from './map-profiler/map-profiler.service';

export const CORE_SERVICES = [
  EntityGenerator,
  EntitySimulator,
  EntityDistributor,
  MapEntityBuilder,
  MapProfilerService
];

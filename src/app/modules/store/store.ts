import { EntitiesReducer } from './entities/entities.reducer';
import { SimulationSettingsReducer } from './simulation-settings/simulation-settings.reducer';
import { Entity } from '../core/types/entity/entity';
import { SimulationSettings } from '../core/types/simulation/simulation-settings';

const DEFAULT_SIMULATION_SETTINGS: SimulationSettings = {
  entityCount: 100,
  updateRate: 1000,
  updateFraction: 1,
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
};

export interface AppState {
  simulationSettings: SimulationSettings;
  entities: Entity[];
}

export const initialState: AppState = {
  simulationSettings: DEFAULT_SIMULATION_SETTINGS,
  entities: []
};

export const reducerMap = {
  simulationSettings: (state, action) => new SimulationSettingsReducer().reduce(state, action),
  entities: (state, action) => new EntitiesReducer().reduce(state, action)
};

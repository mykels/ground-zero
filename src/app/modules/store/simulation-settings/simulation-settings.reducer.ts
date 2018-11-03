import { AbstractReducer } from '../util/abstract-reducer';
import { UPDATE_SIMULATION_SETTINGS, UpdateSimulationSettings } from './simulation-settings.actions';
import { SimulationSettings } from '../../core/types/simulation/simulation-settings';

export class SimulationSettingsReducer extends AbstractReducer<SimulationSettings> {
  constructor() {
    super();
    this.register(UPDATE_SIMULATION_SETTINGS, this.updateSimulationSettings.bind(this));
  }

  updateSimulationSettings(state: SimulationSettings, action: UpdateSimulationSettings): SimulationSettings {
    const simulationSettings: SimulationSettings = action.payload;

    return {
      ...state,
      ...simulationSettings
    };
  }
}

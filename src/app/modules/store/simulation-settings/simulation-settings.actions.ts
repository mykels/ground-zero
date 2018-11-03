import { AbstractAction } from '../util/abstract-action';
import { SimulationSettings } from '../../core/types/simulation/simulation-settings';

export const UPDATE_SIMULATION_SETTINGS = 'UPDATE_SIMULATION_SETTINGS';

export class UpdateSimulationSettings extends AbstractAction<SimulationSettings> {
  constructor(payload: SimulationSettings) {
    super(UPDATE_SIMULATION_SETTINGS, payload);
  }
}


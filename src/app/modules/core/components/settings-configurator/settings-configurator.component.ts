import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AppState } from '../../../store/store';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/internal/operators';
import { Observable } from 'rxjs/index';
import { SimulationSettings } from '../../types/simulation/simulation-settings';
import { UpdateSimulationSettings } from '../../../store/simulation-settings/simulation-settings.actions';

@Component({
  selector: 'gz-settings-configurator',
  templateUrl: './settings-configurator.component.html',
  styleUrls: ['./settings-configurator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsConfiguratorComponent implements OnInit {
  @Input() active = false;
  initialSimulationSettings: SimulationSettings;
  simulationSettings$: Observable<SimulationSettings>;

  constructor(private store: Store<AppState>) {

  }

  ngOnInit(): void {
    this.initSimulationSettings();
    this.backupSimulationSettings();
  }

  saveChanges(entityCount: number, updateRate: number, updateFraction: number) {
    this.store.dispatch(new UpdateSimulationSettings({entityCount, updateRate, updateFraction}));
  }

  restoreChanges() {
    this.store.dispatch(new UpdateSimulationSettings(this.initialSimulationSettings));
  }

  private initSimulationSettings() {
    this.simulationSettings$ = this.store.pipe(
      select('simulationSettings')
    );
  }

  private backupSimulationSettings() {
    this.simulationSettings$.pipe(take(1))
    .subscribe((simulationSettings: SimulationSettings) => {
      this.initialSimulationSettings = simulationSettings;
    });
  }
}

import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import 'rxjs/Rx';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/store';
import {Entity} from '../../../core/types/entity';
import {DiffCalculator} from '../../services/diff-calcualator/diff-calculator';
import {Diff} from '../../types/diff';
import {MapEntitiesDrawer} from '../../services/map-entities-drawer/map-entities-drawer';

@Component({
  selector: 'gz-entity-layer',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityLayerComponent implements OnInit, OnChanges {
  @Input() entitiesMap: Map<string, Entity>;

  constructor(private store: Store<AppState>,
              private diffCalculator: DiffCalculator,
              private entityDrawer: MapEntitiesDrawer) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const entitiesMapChange: SimpleChange = changes['entitiesMap'];
    if (entitiesMapChange) {
      const diff: Diff<Entity> = this.diffCalculator.calculate(
        entitiesMapChange.currentValue, entitiesMapChange.previousValue);
      this.entityDrawer.draw(diff);
    }
  }
}

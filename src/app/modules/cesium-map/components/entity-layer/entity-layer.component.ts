import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import 'rxjs/Rx';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/store';
import {Entity} from '../../../core/types/entity';
import {DiffCalculator} from '../../services/diff-calcualator/diff-calculator';
import {Diff} from '../../types/diff';
import {MapEntitiesDrawer} from '../../services/map-entities-drawer/map-entities-drawer';
import {Map} from 'immutable';

@Component({
  selector: 'gz-entity-layer',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityLayerComponent implements OnInit, OnChanges {
  @Input() entities: Entity[];

  constructor(private store: Store<AppState>,
              private diffCalculator: DiffCalculator,
              private entityDrawer: MapEntitiesDrawer) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const entitiesMapChange: SimpleChange = changes['entitiesMap'];
    if (entitiesMapChange) {
      console.log('EntityLayerComponent', entitiesMapChange);
      const diff: Diff<Entity> = this.diffCalculator.calculate(
        this.toEntitiesMap(entitiesMapChange.previousValue),
        this.toEntitiesMap(entitiesMapChange.currentValue);
      this.entityDrawer.draw(diff);
    }
  }

  private toEntitiesMap(entitites: Entity[]): Map<string, Entity> {
    const entitiesMap = Map<string, Entity>();
    entitiesMap.mergeWith(entitites);
    return entitiesMap;
  }
}

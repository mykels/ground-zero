import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import 'rxjs/Rx';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/store';
import {Entity} from '../../../core/types/entity';
import {DiffCalculator} from '../../services/diff-calcualator/diff-calculator';
import {Diff} from '../../types/diff';
import {Map} from 'immutable';
import {MapEntityDrawer} from '../../services/map-entity-drawer/map-entity-drawer.service';

@Component({
  selector: 'gz-entity-layer',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityLayerComponent implements OnInit, OnChanges {
  @Input() entities: Entity[];

  constructor(private store: Store<AppState>,
              private diffCalculator: DiffCalculator,
              private entityDrawer: MapEntityDrawer) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const entitiesMapChange: SimpleChange = changes['entities'];
    if (entitiesMapChange) {
      const diff: Diff<Entity> = this.diffCalculator.calculate(
        this.toEntitiesMap(entitiesMapChange.previousValue),
        this.toEntitiesMap(entitiesMapChange.currentValue));
      this.entityDrawer.draw(diff);
    }
  }

  private toEntitiesMap(entities: Entity[]): Map<string, Entity> {
    if (!entities) {
      return Map<string, Entity>();
    }

    return Map(entities.map((entity: Entity) => ([entity.id, entity])));
  }
}

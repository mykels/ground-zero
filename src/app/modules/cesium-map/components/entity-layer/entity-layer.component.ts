import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/store';
import { DiffCalculator } from '../../services/diff-calcualator/diff-calculator';
import { Diff } from '../../types/diff';
import { MapEntityDrawer } from '../../services/map-entity-drawer/map-entity-drawer.service';
import { Entity } from '../../../core/types/entity/entity';

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
    const entityMap: Map<string, Entity> = new Map<string, Entity>();

    if (entities) {
      entities.forEach((entity: Entity) => {
        entityMap.set(entity.id, entity);
      });
    }

    return entityMap;
  }
}

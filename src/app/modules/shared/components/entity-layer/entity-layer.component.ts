import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/store';
import { Diff } from "../../../core/types/entity/diff";
import { DiffCalculator } from "../../services/diff-calcualator/diff-calculator";
import { Entity } from "../../../core/types/entity/entity";

@Component({
  selector: 'gz-entity-layer',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityLayerComponent implements OnInit, OnChanges {
  @Input() entities: Entity[];
  @Output() onLayerChange: EventEmitter<Diff<Entity>>;

  constructor(private store: Store<AppState>,
              private diffCalculator: DiffCalculator) {
    this.onLayerChange = new EventEmitter<Diff<Entity>>();
  }

  ngOnInit(): void {
    console.log("EntityLayerComponent [initialized]");
  }

  ngOnChanges(changes: SimpleChanges): void {
    const entitiesMapChange: SimpleChange = changes['entities'];
    if (entitiesMapChange) {
      const diff: Diff<Entity> = this.diffCalculator.calculate(
        this.toEntitiesMap(entitiesMapChange.previousValue),
        this.toEntitiesMap(entitiesMapChange.currentValue));
      this.onLayerChange.emit(diff);
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

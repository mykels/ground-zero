import { AbstractReducer } from '../util/abstract-reducer';
import { UPDATE_ENTITIES, UpdateEntitiesAction } from './entities.actions';
import { Entity } from '../../core/types/entity/entity';

export class EntitiesReducer extends AbstractReducer<Entity[]> {
  constructor() {
    super();
    this.register(UPDATE_ENTITIES, this.updateEntities.bind(this));
  }

  updateEntities(state: Entity[], action: UpdateEntitiesAction): Entity[] {
    const updatedEntities: Entity[] = action.payload;

    return [
      ...updatedEntities
    ];
  }
}

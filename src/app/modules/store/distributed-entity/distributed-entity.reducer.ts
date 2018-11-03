import {AbstractReducer} from '../util/abstract-reducer';
import {Entity} from '../../core/types/entity';
import {ADD_ENTITIES, AddEntitiesAction, UPDATE_ENTITIES} from '../entities/entities.actions';

export class DistributedEntityReducer extends AbstractReducer<Entity> {
  constructor() {
    super();
    this.register(ADD_ENTITIES, this.distributeEntities.bind(this));
    this.register(UPDATE_ENTITIES, this.distributeEntities.bind(this));
  }

  distributeEntities(state: Entity[], action: AddEntitiesAction): Entity[] {
    const updatedEntities: Entity[] = action.payload;

    return [
      ...updatedEntities
    ];
  }
}

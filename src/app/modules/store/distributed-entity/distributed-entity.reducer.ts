import {AbstractReducer} from '../util/abstract-reducer';
import {Entity} from '../../core/types/entity';
import {ADD_ENTITIES, UPDATE_ENTITY, UpdateEntityAction} from '../entities/entities.actions';

export class DistributedEntityReducer extends AbstractReducer<Entity> {
  constructor() {
    super();
    // this.register(ADD_ENTITIES, this.updateEntity.bind(this));
    // this.register(UPDATE_ENTITY, this.updateEntity.bind(this));
  }

  updateEntity(state: Entity, action: UpdateEntityAction): Entity {
    const updateEntity = action.payload;

    return {
      ...updateEntity
    }
  }

}

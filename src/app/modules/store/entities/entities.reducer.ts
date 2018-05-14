import {AbstractReducer} from '../util/abstract-reducer';
import {Entity} from '../../core/types/entity';
import {ADD_ENTITY, AddEntityAction, UPDATE_ENTITY, UpdateEntityAction} from './entities.actions';
import {Map} from 'immutable';

export class EntitiesReducer extends AbstractReducer<Map<string, Entity>> {
  constructor() {
    super();
    this.register(ADD_ENTITY, this.addEntity.bind(this));
    this.register(UPDATE_ENTITY, this.updateEntity.bind(this));
  }

  addEntity(state: Map<string, Entity>, action: AddEntityAction): Map<string, Entity> {
    const entity = action.payload;

    return state.set(entity.id, entity);
  }

  updateEntity(state: Map<string, Entity>, action: UpdateEntityAction): Map<string, Entity> {
    const updateEntity = action.payload;

    return state.set(updateEntity.id, updateEntity);
  }
}

import {AbstractReducer} from '../util/abstract-reducer';
import {Entity} from '../../core/types/entity';
import {ADD_ENTITY, AddEntityAction, UPDATE_ENTITY, UpdateEntityAction} from './entities.actions';

export class EntitiesReducer extends AbstractReducer<Entity[]> {
  constructor() {
    super();
    this.register(ADD_ENTITY, this.addEntity.bind(this));
    this.register(UPDATE_ENTITY, this.updateEntity.bind(this));
  }

  addEntity(state: Entity[], action: AddEntityAction): Entity[] {
    const entity = action.payload;

    return [
      ...state,
      entity
    ];
  }

  updateEntity(state: Entity[], action: UpdateEntityAction): Entity[] {
    const updatedEntity: Entity = action.payload;

    return [
      ...state.filter(entity => entity.id !== updatedEntity.id),
      updatedEntity
    ];
  }
}

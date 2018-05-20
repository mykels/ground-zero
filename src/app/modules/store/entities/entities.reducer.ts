import {AbstractReducer} from '../util/abstract-reducer';
import {Entity} from '../../core/types/entity';
import {
  ADD_ENTITIES,
  AddEntitiesAction,
  UPDATE_ENTITIES,
  UPDATE_ENTITY,
  UpdateEntitiesAction,
  UpdateEntityAction
} from './entities.actions';

export class EntitiesReducer extends AbstractReducer<Entity[]> {
  constructor() {
    super();
    this.register(ADD_ENTITIES, this.addEntities.bind(this));
    this.register(UPDATE_ENTITY, this.updateEntity.bind(this));
    this.register(UPDATE_ENTITIES, this.updateEntities.bind(this));
  }

  addEntities(state: Entity[], action: AddEntitiesAction): Entity[] {
    const entities: Entity[] = action.payload;

    return [
      ...state,
      ...entities
    ];
  }

  updateEntity(state: Entity[], action: UpdateEntityAction): Entity[] {
    const updatedEntity: Entity = action.payload;

    return [
      ...state.filter(entity => entity.id !== updatedEntity.id),
      updatedEntity
    ];
  }

  updateEntities(state: Entity[], action: UpdateEntitiesAction): Entity[] {
    const updatedEntities: Entity[] = action.payload;

    return [
      ..._.differenceBy(state, updatedEntities, entity => entity.id),
      ...updatedEntities
    ]
  }
}

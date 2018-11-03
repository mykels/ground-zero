import {AbstractReducer} from '../util/abstract-reducer';
import {Entity} from '../../core/types/entity';
import {
  ADD_ENTITIES,
  AddEntitiesAction,
  UPDATE_ENTITIES,
  UpdateEntitiesAction,
} from './entities.actions';

export class EntitiesReducer extends AbstractReducer<Entity[]> {
  constructor() {
    super();
    this.register(ADD_ENTITIES, this.addEntities.bind(this));
    this.register(UPDATE_ENTITIES, this.updateEntities.bind(this));
  }

  addEntities(state: Entity[], action: AddEntitiesAction): Entity[] {
    const entities: Entity[] = action.payload;

    return [
      ...state,
      ...entities
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

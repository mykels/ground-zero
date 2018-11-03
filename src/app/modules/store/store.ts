import {EntitiesReducer} from './entities/entities.reducer';
import {Entity} from '../core/types/entity';
import {DistributedEntityReducer} from './distributed-entity/distributed-entity.reducer';

export interface AppState {
  distributedEntities: Entity[];
  entities: Entity[]
}

export const initialState: AppState = {
  distributedEntities: [],
  entities: []
};

export const reducerMap = {
  distributedEntities: (state, action) => new DistributedEntityReducer().reduce(state, action),
  entities: (state, action) => new EntitiesReducer().reduce(state, action)
};

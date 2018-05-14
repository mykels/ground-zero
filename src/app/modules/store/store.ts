import {EntitiesReducer} from './entities/entities.reducer';
import {Entity} from '../core/types/entity';
import {DistributedEntityReducer} from './distributed-entity/distributed-entity.reducer';
import {Map} from 'immutable';

export interface AppState {
  distributedEntity: Entity;
  entities: Map<string, Entity>
}

export const initialState: AppState = {
  distributedEntity: null,
  entities: Map<string, Entity>()
};

export const reducerMap = {
  distributedEntity: (state, action) => new DistributedEntityReducer().reduce(state, action),
  entities: (state, action) => new EntitiesReducer().reduce(state, action)
};

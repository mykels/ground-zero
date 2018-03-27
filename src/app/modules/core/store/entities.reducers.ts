import {ADD_ENTITY, EntityAction} from './entities.actions';
import {Entity} from '../types/entity';

export interface AppState {
  entities: Entity[];
}

const entities = {
  entities: []
};

export function entityReducer(state = entities, action: EntityAction) {
  // console.log('invoked entity reducer!');
  switch (action.type) {
    case ADD_ENTITY: {
      // console.log('handling ADD_ENTITY action...');

      const newState = {
        ...state,
        entities: [...state.entities, action.payload]
      };

      // console.log('newState', newState);
      return newState
    }

    default: {
      return state;
    }
  }
}


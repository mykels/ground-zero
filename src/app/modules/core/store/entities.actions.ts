import {Action} from '@ngrx/store';
import {Entity} from '../types/entity';

export const ADD_ENTITY = 'ADD_ENTITY';
export const UPDATE_ENTITY = 'UPDATE_ENTITY';

export class AddEntity implements Action {
  readonly type = ADD_ENTITY;
  payload: Entity;

  constructor(payload: Entity) {
    this.payload = payload;
  }
}

export type EntityAction = AddEntity;

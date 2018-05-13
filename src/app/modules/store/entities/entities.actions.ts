import {AbstractAction} from '../util/abstract-action';
import {Entity} from '../../core/types/entity';

export const ADD_ENTITY = 'ADD_ENTITY';
export const UPDATE_ENTITY = 'UPDATE_ENTITY';

export class AddEntityAction extends AbstractAction<Entity> {
  constructor(payload: Entity) {
    super(ADD_ENTITY, payload);
  }
}

export class UpdateEntityAction extends AbstractAction<Entity> {
  constructor(payload: Entity) {
    super(UPDATE_ENTITY, payload);
  }
}

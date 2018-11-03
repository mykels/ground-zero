import {AbstractAction} from '../util/abstract-action';
import {Entity} from '../../core/types/entity';

export const ADD_ENTITIES = 'ADD_ENTITIES';
export const UPDATE_ENTITIES = 'UPDATE_ENTITIES';

export class AddEntitiesAction extends AbstractAction<Entity[]> {
  constructor(payload: Entity[]) {
    super(ADD_ENTITIES, payload);
  }
}

export class UpdateEntitiesAction extends AbstractAction<Entity[]> {
  constructor(payload: Entity[]) {
    super(UPDATE_ENTITIES, payload);
  }
}

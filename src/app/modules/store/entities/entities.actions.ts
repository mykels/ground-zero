import { AbstractAction } from '../util/abstract-action';
import { Entity } from '../../core/types/entity/entity';

export const UPDATE_ENTITIES = 'UPDATE_ENTITIES';

export class UpdateEntitiesAction extends AbstractAction<Entity[]> {
  constructor(payload: Entity[]) {
    super(UPDATE_ENTITIES, payload);
  }
}

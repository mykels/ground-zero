import {Injectable} from '@angular/core';
import {Entity} from '../../../core/types/entity';
import {Diff} from '../../types/diff';

@Injectable()
export class MapEntitiesDrawer {
  draw(diff: Diff<Entity>) {
    console.log('MapEntitiesDrawer:draw', diff);

    this.handleAdd(diff.added);
    this.handleUpdated(diff.updated);
    this.handleRemoved(diff.removed);
  }

  private handleAdd(added: Entity[]) {

  }

  private handleUpdated(updated: Entity[]) {

  }

  private handleRemoved(removed: Entity[]) {

  }
}

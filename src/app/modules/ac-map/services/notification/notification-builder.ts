import {Injectable} from '@angular/core';
import {AcNotification} from 'angular-cesium';
import {ActionType} from 'angular-cesium/src/angular-cesium/models/action-type.enum';
import {Entity} from '../../../core/types/entity';

@Injectable()
export class NotificationBuilder {
  build(entity: Entity): AcNotification {
    return {
      id: entity.id,
      entity: entity,
      actionType: ActionType.ADD_UPDATE
    }
  }
}

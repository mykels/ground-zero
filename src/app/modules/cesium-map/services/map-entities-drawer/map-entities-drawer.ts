import {Injectable} from '@angular/core';
import {Entity} from '../../../core/types/entity';
import {Diff} from '../../types/diff';
import {MapEntityBuilder} from '../../../core/services/builders/map-entity-builder';
import {ViewerHolder} from '../viewer-holder/viewer-holder';

@Injectable()
export class MapEntitiesDrawer {
  private billboardCollection: any;
  private billboardMap: Map<string, any>;

  constructor(private mapEntityBuilder: MapEntityBuilder,
              private viewerHolder: ViewerHolder) {
    this.billboardCollection = new Cesium.BillboardCollection();
    this.billboardMap = new Map<string, any>();
    this.viewerHolder.getViewer().subscribe(viewer => {
      viewer.scene.primitives.add(this.billboardCollection);
    });
  }

  draw(diff: Diff<Entity>) {
    console.log('MapEntitiesDrawer:draw', diff);

    this.handleAdded(diff.added);
    this.handleUpdated(diff.updated);
    this.handleRemoved(diff.removed);
  }

  private handleAdded(added: Entity[]) {
    added.forEach(addedElement => {
      const mapEntity = this.mapEntityBuilder.build(addedElement);
      const billboard = this.billboardCollection.add(mapEntity);
      this.billboardMap.set(mapEntity.id, billboard);
    });
  }

  private handleUpdated(updated: Entity[]) {
    updated.forEach(updatedElement => {
      const mapEntity = this.mapEntityBuilder.build(updatedElement);
      const billboard = this.billboardMap.get(updatedElement.id);
      if (mapEntity.position !== billboard.position) {
        billboard.position = mapEntity.position;
      } else if (mapEntity.rotation !== billboard.rotation) {
        billboard.rotation = mapEntity.rotation;
      }
    });
  }

  private handleRemoved(removed: Entity[]) {
    removed.forEach(removedElement => {
      const billboardToRemove = this.billboardMap.get(removedElement.id);
      this.billboardCollection.remove(billboardToRemove);
      this.billboardMap.delete(removedElement.id);
    });
  }
}

import { Injectable } from '@angular/core';
import { Diff } from '../../types/diff';
import { MapEntityBuilder } from '../../../core/services/builders/map-entity-builder';
import { MapEntity } from '../../../core/types/map/map-entity';
import { Billboard } from '../../../core/types/map/billboard';
import { Label } from '../../../core/types/map/label';
import { Polyline } from '../../../core/types/map/polyline';
import { Entity } from '../../../core/types/entity/entity';
import { ViewerHolder } from "../viewer/viewer-holder/viewer-holder";

@Injectable()
export class MapEntityDrawer {
  private billboardCollection: any;
  private labelCollection: any;
  private billboardsMap: Map<string, any[]>;
  private labelsMap: Map<string, any[]>;
  private polylineMap: Map<string, any[]>;
  private viewer: any;

  constructor(private mapEntityBuilder: MapEntityBuilder,
              private viewerHolder: ViewerHolder) {
    this.billboardCollection = new Cesium.BillboardCollection({
      blendOption: Cesium.BlendOption.TRANSLUCENT
    });
    this.labelCollection = new Cesium.LabelCollection({
      blendOption: Cesium.BlendOption.TRANSLUCENT
    });

    this.billboardsMap = new Map<string, any[]>();
    this.labelsMap = new Map<string, any[]>();
    this.polylineMap = new Map<string, any[]>();

    this.viewerHolder.getViewer().subscribe(viewer => {
      viewer.scene.primitives.add(this.billboardCollection);
      viewer.scene.primitives.add(this.labelCollection);
      this.viewer = viewer;
    });
  }

  draw(diff: Diff<Entity>) {
    this.viewer.entities.suspendEvents();

    this.handleAdded(diff.added);
    this.handleUpdates(diff.updated);
    this.handleRemoved(diff.removed);

    this.viewer.entities.resumeEvents();

    this.viewer.scene.requestRender();
  }

  private handleAdded(added: Entity[]) {
    const timeElapse = Date.now();

    added.forEach(addedElement => {
      const mapEntity: MapEntity = this.mapEntityBuilder.build(addedElement);

      // handle billboards additions
      if (mapEntity.billboards) {
        const billboardGraphics: any[] = mapEntity.billboards.map((billboard: Billboard) => {
          billboard.position = mapEntity.position;
          return this.billboardCollection.add(billboard);
        });

        this.billboardsMap.set(mapEntity.id, billboardGraphics);
      }

      // handle labels additions
      if (mapEntity.labels) {
        const labelGraphics: any[] = mapEntity.labels.map((label: Label) => {
          label.position = mapEntity.position;
          return this.labelCollection.add(label);
        });

        this.labelsMap.set(mapEntity.id, labelGraphics);
      }

      // handle polylines
      if (mapEntity.polylines) {
        const polylineGraphics: any[] = mapEntity.polylines.map((polyline: Polyline) => {
          return this.viewer.entities.add({polyline});
        });

        this.polylineMap.set(mapEntity.id, polylineGraphics);
      }

    });

    console.info(`added ${added.length} entities in ${Date.now() - timeElapse} ms`);
  }

  private handleUpdates(updated: Entity[]) {
    const timeElapse = Date.now();

    updated.forEach(updatedElement => {
      const mapEntity: MapEntity = this.mapEntityBuilder.build(updatedElement);
      const billboards: any[] = this.billboardsMap.get(updatedElement.id);
      const labels: any[] = this.labelsMap.get(updatedElement.id);
      const polylineEntities: any[] = this.polylineMap.get(updatedElement.id);

      // handle billboards update
      if (billboards) {
        for (let i = 0; i < billboards.length; i++) {
          if (billboards[i] && (billboards[i].position !== mapEntity.position)) {
            billboards[i].position = mapEntity.position;
          } else if (billboards[i] && (billboards[i].rotation !== mapEntity.billboards[i].rotation)) {
            billboards[i].rotation = mapEntity.billboards[i].rotation;
          }
        }
      }

      // handle labels update
      if (labels) {
        labels.forEach(label => {
          if (label && (label.position !== mapEntity.position)) {
            label.position = mapEntity.position;
          }
        });
      }

      // handle polyline update
      if (polylineEntities) {
        for (let i = 0; i < polylineEntities.length; i++) {
          const polyline = polylineEntities[i].polyline;
          if (polyline && (polyline.positions !== mapEntity.polylines[i].positions)) {
            polyline.positions = mapEntity.polylines[i].positions;
          }
        }
      }
    });

    console.info(`updated ${updated.length} entities in ${Date.now() - timeElapse} ms`);
  }

  private handleRemoved(removed: Entity[]) {
    const timeElapse = Date.now();

    removed.forEach(removedElement => {
      // delete billboards
      const billboardsToRemove: any[] = this.billboardsMap.get(removedElement.id);
      billboardsToRemove.forEach(billboardToRemove => {
        this.billboardCollection.remove(billboardToRemove);
      });

      this.billboardsMap.delete(removedElement.id);

      // delete labels
      const labelsToRemove: any[] = this.labelsMap.get(removedElement.id);
      labelsToRemove.forEach(labelToRemove => {
        this.labelCollection.remove(labelToRemove);
      });

      this.labelsMap.delete(removedElement.id);

      // delete polylines
      const polylinesToRemove: any[] = this.polylineMap.get(removedElement.id);
      polylinesToRemove.forEach(polylineToRemove => {
        this.viewer.entities.remove(polylineToRemove);
      });

      this.polylineMap.delete(removedElement.id);
    });

    console.info(`removed ${removed.length} entities in ${Date.now() - timeElapse} ms`);
  }
}

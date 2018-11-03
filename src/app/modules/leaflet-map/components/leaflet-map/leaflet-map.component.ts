import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../store/store';
import { Store } from '@ngrx/store';
import { EntityDistributor } from '../../../core/services/distribution/entity-distributor.service';
import { Entity } from '../../../core/types/entity/entity';

@Component({
  selector: 'gz-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.css'],
})
export class LeafletMapComponent implements OnInit {
  map: any;
  graphicEntities: Map<string, any>;

  constructor(private store: Store<AppState>,
              private entityDistributor: EntityDistributor) {
    this.graphicEntities = new Map<string, any>();
  }

  ngOnInit(): void {
    this.initMap();
    this.initRasters();
    this.initEntities();
    this.entityDistributor.init();
  }

  initMap() {
    this.map = L.map('leafletMap').setView([32, 34], 8);
  }

  initRasters() {
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: `Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,
                    <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,
                    Imagery © <a href="https://www.mapbox.com/">Mapbox</a>`,
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoibXlrZWxzIiwiYSI6ImNqZ2Rtd2hkdjNjdngycXJuNTk2eWIycDMifQ.U0JlFzbO8ZXcBuYAlhTVzQ'
    }).addTo(this.map);
  }

  initEntities() {
    this.store.select('entities')
    .subscribe((entitities: Entity[]) => {
      entitities.forEach((entity: Entity) => {
        this.drawEntity(entity);
      });
    });
  }

  drawEntity(entity: Entity) {
    const graphicEntity: any = this.graphicEntities.get(entity.id);
    if (graphicEntity) {
      this.updateEntity(entity, graphicEntity);
    } else {
      this.addEntity(entity);
    }
  }

  addEntity(entity: Entity) {
    const marker: any = this.buildMarker(entity);
    const tail: any = this.buildTail(entity);
    const vector: any = this.buildVector(entity);
    const labels: any[] = this.buildLabels(entity);

    this.graphicEntities.set(entity.id, {marker, tail, vector, labels});
  }

  updateEntity(entity: Entity, graphicEntity: any) {
    this.updateMarker(graphicEntity, entity);
    this.updateTail(graphicEntity, entity);
    this.updateVector(graphicEntity, entity);
    this.updateLabels(graphicEntity, entity);
  }

  private buildMarker(entity: Entity) {
    const icon = L.icon({
      iconUrl: '/assets/images/fighter.png',
      iconSize: L.point(20, 20)
    });

    const marker: any = L.marker([entity.position.lat, entity.position.lon], {
      icon
    }).addTo(this.map);
    return marker;
  }

  private buildTail(entity: Entity) {
    const positions = [
      [entity.position.lat, entity.position.lon],
      [entity.position.lat - 1, entity.position.lon - 1],
    ];

    return L.polyline(positions, {color: 'blue'}).addTo(this.map);
  }

  private buildVector(entity: Entity) {
    const positions = [
      [entity.position.lat, entity.position.lon],
      [entity.position.lat + 1, entity.position.lon + 1],
    ];

    return L.polyline(positions, {color: 'yellow'}).addTo(this.map);
  }

  private buildLabels(entity: Entity) {
    const position: any = [entity.position.lat, entity.position.lon];
    const greenLabel: any = L.divIcon({
      className: 'label',
      html: `<p style="width:120px;color:#95ffbe">XP-${entity.id}</p>`
    });
    const redLabel: any = L.divIcon({
      className: 'label',
      html: `<p style="width:120px;color:#ff7656">TR-${entity.id}</p>`
    });
    const purpleLabel: any = L.divIcon({
      className: 'label',
      html: `<p style="width:120px;color:#8993ff">LY-${entity.id}</p>`
    });
    const point: any = this.map.latLngToContainerPoint(position);
    const greenOffset: any = L.point([point.x - 35, point.y + 30]);
    const greenPosition = this.map.containerPointToLatLng(greenOffset);

    const redOffset: any = L.point([point.x - 35, point.y - 20]);
    const redPosition = this.map.containerPointToLatLng(redOffset);

    const purpleOffset: any = L.point([point.x + 20, point.y + 5]);
    const purplePosition = this.map.containerPointToLatLng(purpleOffset);

    return [
      L.marker(greenPosition, {icon: greenLabel}).addTo(this.map),
      L.marker(redPosition, {icon: redLabel}).addTo(this.map),
      L.marker(purplePosition, {icon: purpleLabel}).addTo(this.map)
    ];
  }

  private updateMarker(graphicEntity: any, entity: Entity) {
    graphicEntity.marker.setLatLng([entity.position.lat, entity.position.lon]);
  }

  private updateTail(graphicEntity: any, entity: Entity) {
    const positions = [
      [entity.position.lat, entity.position.lon],
      [entity.position.lat - 1, entity.position.lon - 1],
    ];

    graphicEntity.tail.setLatLngs(positions);
  }

  private updateVector(graphicEntity: any, entity: Entity) {
    const positions = [
      [entity.position.lat, entity.position.lon],
      [entity.position.lat + 1, entity.position.lon + 1],
    ];

    graphicEntity.vector.setLatLngs(positions);
  }

  private updateLabels(graphicEntity: any, entity: Entity) {
    const position: any = [entity.position.lat, entity.position.lon];
    const point: any = this.map.latLngToContainerPoint(position);
    const greenOffset: any = L.point([point.x - 35, point.y + 30]);
    const greenPosition = this.map.containerPointToLatLng(greenOffset);

    const redOffset: any = L.point([point.x - 35, point.y - 20]);
    const redPosition = this.map.containerPointToLatLng(redOffset);

    const purpleOffset: any = L.point([point.x + 20, point.y + 5]);
    const purplePosition = this.map.containerPointToLatLng(purpleOffset);

    graphicEntity.labels[0].setLatLng(greenPosition);
    graphicEntity.labels[1].setLatLng(redPosition);
    graphicEntity.labels[2].setLatLng(purplePosition);
  }
}

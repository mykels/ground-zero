import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../store/store';
import { select, Store } from '@ngrx/store';
import { EntityDistributor } from '../../../core/services/distribution/entity-distributor.service';
import { ConfigService } from "../../../app/services/config/config.service";
import { MapboxglConfig } from "../../../app/types/config/map/mapboxgl/mapboxgl-config";
import { Observable } from "rxjs/index";
import { Entity } from "../../../core/types/entity/entity";
import { Diff } from "../../../core/types/entity/diff";
import { EntityRenderer } from "../../services/entity-renderer/entity-renderer.service";

@Component({
  selector: 'gz-mapboxgl-map',
  templateUrl: './mapboxgl-map.component.html',
  styleUrls: ['./mapboxgl-map.component.css'],
})
export class MapboxglMapComponent implements OnInit {
  map: any;
  entities$: Observable<Entity>;

  constructor(private store: Store<AppState>,
              private entityDistributor: EntityDistributor,
              private entityRenderer: EntityRenderer,
              private configService: ConfigService) {
  }

  ngOnInit(): void {
    this.initMap();
    this.initEntities();
    this.initDistribution();
  }

  onLayerChange(diff: Diff<Entity>) {
    this.entityRenderer.render(diff, this.map);
  }

  private initMap() {
    const mapboxglConfig: MapboxglConfig = this.configService.getConfig().map.mapboxgl;
    mapboxgl.accessToken = mapboxglConfig.accessToken;
    this.map = new mapboxgl.Map(mapboxglConfig.options);
  }

  private initEntities() {
    this.entities$ = this.store.pipe(select('entities'));
  }

  private initDistribution(): any {
    this.entityDistributor.init();
  }
}

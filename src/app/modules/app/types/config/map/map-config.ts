import { CesiumConfig } from "./cesium/cesium-config";
import { LeafletConfig } from "./leaflet/leaflet-config";
import { ZoomConfig } from "./zoom/zoom-config";
import { MapboxglConfig } from "./mapboxgl/mapboxgl-config";

export interface MapConfig {
  zoom: ZoomConfig;
  cesium: CesiumConfig;
  leaflet: LeafletConfig;
  mapboxgl: MapboxglConfig;
}

import { CesiumConfig } from "./cesium/cesium-config";
import { LeafletConfig } from "./leaflet/leaflet-config";

export interface MapConfig {
  cesium: CesiumConfig;
  leaflet: LeafletConfig;
}

import { APP_INITIALIZER } from "@angular/core";
import { ConfigService } from "./config/config.service";
import { HttpClient } from "@angular/common/http";

function loadConfig(configService: ConfigService) {
  return () => configService.init();
}

export const APP_SERVICES = [
  ConfigService,
  {
    provide: APP_INITIALIZER,
    useFactory: loadConfig,
    deps: [ConfigService, HttpClient],
    multi: true
  },
];

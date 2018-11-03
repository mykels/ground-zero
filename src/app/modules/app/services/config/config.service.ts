import { Injectable } from "@angular/core";
import { Config } from "../../types/config/config";
import { HttpClient } from "@angular/common/http";

const CONFIG_PATH = '/assets/config/config.json';

@Injectable()
export class ConfigService {
  private config: Config;

  constructor(private http: HttpClient) {

  }

  init(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get(CONFIG_PATH).subscribe((config: any) => {
        this.config = config as Config;
        resolve(this.config);
      });
    });
  }

  getConfig(): Config {
    return this.config;
  }
}

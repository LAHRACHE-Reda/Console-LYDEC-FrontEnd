import {Injectable} from "@angular/core";
import {AppConfig} from "@/Config/appconfig";
import {Subject} from "rxjs";

@Injectable()
export class AppConfigService {

  config: AppConfig = {
    theme: 'saga-blue',
    dark: false,
    inputStyle: 'outlined',
    ripple: true
  };

  private configUpdate = new Subject<AppConfig>();

  configUpdate$ = this.configUpdate.asObservable();

  updateConfig(config: AppConfig) {
    this.config = config;
    this.configUpdate.next(config);
  }

  getConfig() {
    return this.config;
  }
}

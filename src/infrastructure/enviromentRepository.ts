import { Config } from '../config/config';
import {
  TemperatureCelcicus,
  Environment,
  EnvironmentRepository,
  HumidityPercent,
} from '../domain/environment';
import { toValueObject } from '../domain/valueobject';

export class MeterEnvironmentRepository implements EnvironmentRepository {
  private readonly url: string;
  private readonly auth_token: string;

  constructor(config: Config) {
    this.url = this.urlFrom(config);
    this.auth_token = config.switchbot_auth_token;
  }

  async get(timestamp: Date): Promise<Environment> {
    //const res = await fetch('http://example.com');

    // FIXME: impl
    return {
      timestamp: new Date(),
      temperature: toValueObject<Number, TemperatureCelcicus>(30.0),
      humidity: toValueObject<Number, HumidityPercent>(70.0),
    };
  }

  private urlFrom(config: Config): string {
    return `${config.switchbot_endpoint}/devices/${config.meter_device_id}/status`;
  }
}

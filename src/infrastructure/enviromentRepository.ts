import { Config } from '../config/config';
import {
  TemperatureCelcicus,
  Environment,
  EnvironmentRepository,
  HumidityPercent,
} from '../domain/environment';
import { toValueObject } from '../domain/valueobject';

export class MeterEnvironmentRepository implements EnvironmentRepository {
  private readonly endpoint_url: string;

  constructor(config: Config) {
    this.endpoint_url = config.switchbot_endpoint;
  }

  get(timestamp: Date): Environment {
    // FIXME: impl
    return {
      timestamp: new Date(),
      temperature: toValueObject<Number, TemperatureCelcicus>(30.0),
      humidity: toValueObject<Number, HumidityPercent>(70.0),
    };
  }
}

import { Config } from '../config/config';
import {
  TemperatureCelcicus,
  Environment,
  EnvironmentRepository,
  HumidityPercent,
} from '../domain/environment';
import { toValueObject } from '../domain/valueobject';
import { Fetcher, GASFetcherFactory } from './fetcher';

export class MeterEnvironmentRepository implements EnvironmentRepository {
  private readonly url: string;
  private readonly auth_token: string;
  private readonly fetch: Fetcher;

  constructor(config: Config, fetch: Fetcher = GASFetcherFactory.create()) {
    this.url = this.urlFrom(config);
    this.auth_token = config.switchbot_auth_token;
    this.fetch = fetch;
  }

  async get(timestamp: Date): Promise<Environment> {
    const res = await this.fetch(this.url, {
      headers: {
        Authorization: this.auth_token,
      },
    });

    switch (res.status) {
      case 200:
        break; // ok
      case 401:
        throw Error('Unauthorized: auth token may be invalid');
      default:
        throw Error(
          `Unexpected: status code is not 200 (received: ${res.status})`,
        );
    }

    const body = await res.json();

    switch (body.statusCode) {
      case 100:
        break; // ok
      case 190:
        throw Error(`NotFoundDevice: meter device is not found: ${this.url}`);
      case undefined:
        throw Error(
          `Unexpected: body does not contain statusCode: ${JSON.stringify(
            body,
          )}`,
        );
      default:
        throw Error(
          `Unexpected: body.statusCode is not 100 (received: ${body.statusCode})`,
        );
    }

    if (body.body == null) {
      throw Error(`Unexpected: body.body must not be null`);
    }
    if (body.body.temperature == null) {
      throw Error(`Unexpected: temperature must not be null`);
    }
    if (body.body.humidity == null) {
      throw Error(`Unexpected: humidity must not be null`);
    }

    return {
      timestamp: timestamp,
      temperature: toValueObject<Number, TemperatureCelcicus>(
        body.body.temperature,
      ),
      humidity: toValueObject<Number, HumidityPercent>(body.body.humidity),
    };
  }

  private urlFrom(config: Config): string {
    return `${config.switchbot_endpoint}/devices/${config.meter_device_id}/status`;
  }
}

import { Config, ConfigFactory } from './config';

export interface Properties {
  getProperty(key: string): string | null;
}

export class GASConfigFactory implements ConfigFactory {
  constructor(private readonly properties: Properties) {}

  get(): Config {
    return new Config(
      this.properties.getProperty('switchbot_endpoint') ?? '',
      this.properties.getProperty('meter_device_id') ?? '',
      this.properties.getProperty('switchbot_auth_token') ?? '',
    );
  }
}

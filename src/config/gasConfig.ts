import { Config, ConfigFactory } from './config';

export interface Properties {
  getProperty(key: string): string | null;
}

export class GASConfigFactory implements ConfigFactory {
  constructor(private readonly properties: Properties) {}

  get(): Config {
    return new Config(
      this.properties.getProperty('switchbotEndpoint') ?? '',
      this.properties.getProperty('meterDeviceID') ?? '',
      this.properties.getProperty('switchbotAuthToken') ?? '',
      this.properties.getProperty('spreadSheetID') ?? '',
    );
  }
}

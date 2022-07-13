export class Config {
  constructor(
    public readonly switchbot_endpoint: string,
    public readonly meter_device_id: string,
    public readonly switchbot_auth_token: string,
  ) {
    this.switchbot_endpoint =
      switchbot_endpoint || 'https://api.switch-bot.com/v1.0/';
    this.meter_device_id = meter_device_id;
    this.switchbot_auth_token = switchbot_auth_token;
  }
}

export interface ConfigFactory {
  get(): Config;
}

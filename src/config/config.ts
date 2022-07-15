export class Config {
  constructor(
    public readonly switchbotEndpoint: string,
    public readonly meterDeviceID: string,
    public readonly switchbotAuthToken: string,
    public readonly folderName: string,
  ) {
    this.switchbotEndpoint =
      switchbotEndpoint || 'https://api.switch-bot.com/v1.0';
    this.meterDeviceID = meterDeviceID;
    this.switchbotAuthToken = switchbotAuthToken;
    this.folderName = folderName || 'meter_recorder';
  }
}

export interface ConfigFactory {
  get(): Config;
}

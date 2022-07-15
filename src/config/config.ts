export class Config {
  constructor(
    public readonly switchbotEndpoint: string,
    public readonly meterDeviceID: string,
    public readonly switchbotAuthToken: string,
    public readonly spreadSheetID: string,
  ) {
    this.switchbotEndpoint =
      switchbotEndpoint || 'https://api.switch-bot.com/v1.0';
    this.meterDeviceID = meterDeviceID;
    this.switchbotAuthToken = switchbotAuthToken;
    this.spreadSheetID = spreadSheetID;
  }
}

export interface ConfigFactory {
  get(): Config;
}

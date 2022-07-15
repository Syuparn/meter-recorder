import { Config } from './config';
import { GASConfigFactory, Properties } from './gasConfig';

class DummyProperties implements Properties {
  constructor(readonly pairs: { [key: string]: string | null }) {}

  getProperty(key: string): string | null {
    return this.pairs[key];
  }
}

test.each([
  {
    name: 'all properties are set',
    properties: {
      switchbotEndpoint: 'http://example.com',
      meterDeviceID: '1234567890AB',
      switchbotAuthToken: 'auth1234',
      folderName: 'my_folder',
    },
    expected: new Config(
      'http://example.com',
      '1234567890AB',
      'auth1234',
      'my_folder',
    ),
  },
  {
    name: 'all properties are not set',
    properties: {
      switchbotEndpoint: null,
      meterDeviceID: null,
      switchbotAuthToken: null,
      folderName: null,
    },
    expected: new Config(
      'https://api.switch-bot.com/v1.0',
      '',
      '',
      'meter_recorder',
    ),
  },
  {
    name: 'empty string is treated like null',
    properties: {
      switchbotEndpoint: '',
      meterDeviceID: '',
      switchbotAuthToken: '',
      folderName: '',
    },
    expected: new Config(
      'https://api.switch-bot.com/v1.0',
      '',
      '',
      'meter_recorder',
    ),
  },
])('$name', ({ properties, expected }) => {
  const configFactory = new GASConfigFactory(new DummyProperties(properties));
  expect(configFactory.get()).toStrictEqual(expected);
});

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
      switchbot_endpoint: 'http://example.com',
      meter_device_id: '1234567890AB',
      switchbot_auth_token: 'auth1234',
    },
    expected: new Config('http://example.com', '1234567890AB', 'auth1234'),
  },
  {
    name: 'all properties are not set',
    properties: {
      switchbot_endpoint: null,
      meter_device_id: null,
      switchbot_auth_token: null,
    },
    expected: new Config('https://api.switch-bot.com/v1.0', '', ''),
  },
  {
    name: 'empty string is treated like null',
    properties: {
      switchbot_endpoint: '',
      meter_device_id: '',
      switchbot_auth_token: '',
    },
    expected: new Config('https://api.switch-bot.com/v1.0', '', ''),
  },
])('$name', ({ properties, expected }) => {
  const configFactory = new GASConfigFactory(new DummyProperties(properties));
  expect(configFactory.get()).toStrictEqual(expected);
});

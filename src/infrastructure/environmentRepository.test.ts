import fetch from 'node-fetch';
import talkback from 'talkback';
import TalkbackServer from 'talkback/server';
import { Config } from '../config/config';
import { HumidityPercent, TemperatureCelcicus } from '../domain/environment';
import { toValueObject } from '../domain/valueobject';
import { MeterEnvironmentRepository } from './enviromentRepository';

function recordTape(tapeName: string): TalkbackServer {
  const opts = {
    host: 'https://api.switch-bot.com/v1.0/',
    record: talkback.Options.RecordMode.NEW,
    port: 5544,
    path: `${__dirname}/tapes`,
    // generate tape file name
    tapeNameGenerator: () => tapeName,
  };

  const server = talkback(opts);
  server.start(() => console.log('Talkback Started'));
  return server;
}

test('get environment from meter', () => {
  const recorder = recordTape('get_environment_success');

  const config = new Config(
    'http://localhost:5544', // to talkback proxy server
    '1234',
    'auth',
  );
  const repository = new MeterEnvironmentRepository(config);

  // NOTE: promise must be returned, otherwise test finishes and passes BEFORE it is resolved!
  return repository.get(new Date(2006, 0, 2, 15, 4, 5)).then((environment) => {
    expect(environment).toStrictEqual({
      timestamp: new Date(2006, 0, 2, 15, 4, 5),
      temperature: toValueObject<Number, TemperatureCelcicus>(23.4),
      humidity: toValueObject<Number, HumidityPercent>(78.9),
    });

    recorder.close();
  });
});

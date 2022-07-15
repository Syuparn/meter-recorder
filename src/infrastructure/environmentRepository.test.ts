import fetch from 'node-fetch';
import talkback from 'talkback';
import TalkbackServer from 'talkback/server';
import Tape from 'talkback/tape';
import { MatchingContext, Req } from 'talkback/types';
import { Config } from '../config/config';
import { HumidityPercent, TemperatureCelcicus } from '../domain/environment';
import { toValueObject } from '../domain/valueobject';
import { MeterEnvironmentRepository } from './enviromentRepository';
import dotenv from 'dotenv';
import { Options } from 'talkback/options';

function readEnvs(): { [keys: string]: string } {
  dotenv.config(); // set dotenv variables to process.env

  const keys = ['METER_DEVICE_ID', 'SWITCHBOT_AUTH_TOKEN', 'HUB_DEVICE_ID'];
  let envs: { [keys: string]: string } = {};

  for (const key of keys) {
    const value = process.env[key];
    if (typeof value === 'undefined') {
      throw new Error(`environment variable "${key}" must be set`);
    }
    envs[key] = value;
  }

  console.log(JSON.stringify(envs));

  return Object.freeze(envs);
}

const envs = readEnvs();
// NOTE: use dummy values so that credentials are not recorded in tapes
const dummyDeviceID = '1234567890AB';
const dummyHubDeviceID = 'HUB123456789';
const dummyAuthToken = 'dummyauth1234';

async function recordTape(tapeName: string): Promise<TalkbackServer> {
  return handleTape(tapeName, true);
}

async function replayTape(tapeName: string): Promise<TalkbackServer> {
  return handleTape(tapeName, false);
}

async function handleTape(
  tapeName: string,
  recording: boolean,
): Promise<TalkbackServer> {
  let opts: Partial<Options> = {
    host: 'https://api.switch-bot.com/v1.0',
    port: 5544,
    path: `${__dirname}/tapes/${tapeName}`,
    ignoreHeaders: ['authorization'], // ignore auth tokens
    tapeDecorator: replaceCredentialsInTape,
    urlMatcher: urlMatcher,
    // generate tape file name
    tapeNameGenerator: () => tapeName,
  };

  if (recording) {
    opts = {
      record: talkback.Options.RecordMode.NEW,
      ...opts,
    };
  } else {
    opts = {
      record: talkback.Options.RecordMode.DISABLED,
      fallbackMode: talkback.Options.FallbackMode.NOT_FOUND,
      ...opts,
    };
  }

  const server = talkback(opts);
  await server.start(() => console.log(`Talkback Started: tape: ${tapeName}`));
  return server;
}

function replaceCredentialsInTape(tape: Tape, _context: MatchingContext): Tape {
  // replace deviceID with dummy string
  tape.req.url = tape.req.url.replace(envs.METER_DEVICE_ID, dummyDeviceID);
  // NOTE: it appears not only request path but response body
  if (tape.res != null) {
    tape.res.body = Buffer.from(
      tape.res.body
        .toString()
        .replace(envs.METER_DEVICE_ID, dummyDeviceID)
        .replace(envs.HUB_DEVICE_ID, dummyHubDeviceID),
    );
  }

  // replace authorization header with dummy string
  if (tape.req.headers.authorization != null) {
    tape.req.headers.authorization = dummyAuthToken;
  }

  return tape;
}

function urlMatcher(tape: Tape, req: Req): boolean {
  // NOTE: replace deviceID in path with dummy string before comparison
  // because it should be secret and it is replaced with dummy values in tapes
  req.url = req.url.replace(envs.METER_DEVICE_ID, dummyDeviceID);
  console.log('matcher: ' + req.url);

  return req.url === tape.req.url;
}

test('get environment from meter', async () => {
  //const recorder = recordTape('get_environment_success');
  const recorder = await replayTape('get_environment_success');

  const config = new Config(
    'http://localhost:5544', // to talkback proxy server
    envs.METER_DEVICE_ID,
    envs.SWITCHBOT_AUTH_TOKEN,
  );
  const repository = new MeterEnvironmentRepository(config, fetch);

  // NOTE: you should wait promise, otherwise test finishes and passes BEFORE it is resolved!
  await expect(
    repository.get(new Date(2006, 0, 2, 15, 4, 5)),
  ).resolves.toStrictEqual({
    timestamp: new Date(2006, 0, 2, 15, 4, 5),
    temperature: toValueObject<Number, TemperatureCelcicus>(26),
    humidity: toValueObject<Number, HumidityPercent>(77),
  });
  recorder.close();
});

test('meter device is not found', async () => {
  //const recorder = recordTape('get_environment_failure_notfound');
  const recorder = await replayTape('get_environment_failure_notfound');

  const config = new Config(
    'http://localhost:5544', // to talkback proxy server
    'NOTFOUND404', // wrong deviceID
    envs.SWITCHBOT_AUTH_TOKEN,
  );

  const repository = new MeterEnvironmentRepository(config, fetch);

  // NOTE: you should wait promise, otherwise test finishes and passes BEFORE it is resolved!
  await expect(repository.get(new Date(2006, 0, 2, 15, 4, 5)))
    .rejects.toThrow(
      'NotFoundDevice: meter device is not found: http://localhost:5544/devices/NOTFOUND404/status',
    )
    .finally(() => {
      recorder.close();
    });
});

test('unauthorized', async () => {
  //const recorder = recordTape('get_environment_failure_unauthorized');
  const recorder = await replayTape('get_environment_failure_unauthorized');

  const config = new Config(
    'http://localhost:5544', // to talkback proxy server
    envs.METER_DEVICE_ID,
    'invalidtoken', // wrong auth token
  );
  const repository = new MeterEnvironmentRepository(config, fetch);

  // NOTE: you should wait promise, otherwise test finishes and passes BEFORE it is resolved!
  await expect(repository.get(new Date(2006, 0, 2, 15, 4, 5)))
    .rejects.toThrow('Unauthorized: auth token may be invalid')
    .finally(() => {
      recorder.close();
    });
});

test.each`
  name                        | tapeName
  ${'temperature is missing'} | ${'get_environment_failure_no_temperature_edited'}
  ${'humidity is missing'}    | ${'get_environment_failure_no_humidity_edited'}
  ${'statusCode is missing'}  | ${'get_environment_failure_no_status_code_edited'}
`('$name', async ({ tapeName }) => {
  //const recorder = recordTape(tapeName);
  const recorder = await replayTape(tapeName);

  const config = new Config(
    'http://localhost:5544', // to talkback proxy server
    envs.METER_DEVICE_ID,
    envs.SWITCHBOT_AUTH_TOKEN,
  );
  const repository = new MeterEnvironmentRepository(config, fetch);

  // NOTE: you should wait promise, otherwise test finishes and passes BEFORE it is resolved!
  await expect(repository.get(new Date(2006, 0, 2, 15, 4, 5)))
    .rejects.toThrow('Unexpected')
    .finally(() => {
      recorder.close();
    });
});

import fetch from 'node-fetch';
import talkback from 'talkback';
import TalkbackServer from 'talkback/server';

function recordTape(tapeName: string): TalkbackServer {
  const opts = {
    host: 'http://httpbin.org',
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

test('dummy', () => {
  const recorder = recordTape('httpbin');

  // NOTE: promise must be returned, otherwise test finishes and passes BEFORE it is resolved!
  return fetch('http://localhost:5544/ip').then((res) => {
    expect(res.status).toBe(200);

    recorder.close();
  });
});

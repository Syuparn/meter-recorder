import fetch from 'node-fetch';

test('dummy', () => {
  // NOTE: promise must be returned, otherwise test finishes and passes BEFORE it is resolved!
  return fetch('http://httpbin.org/ip').then((res) => {
    expect(res.status).toBe(200);
  });
});

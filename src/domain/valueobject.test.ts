import { toValueObject, fromValueObject } from './valueobject';
import { CelcicusTemperature, HumidityPercent } from './environment';

test('Number to CelcicusTemperature', () => {
  let vo: CelcicusTemperature;
  vo = 23.4 as any;
  expect(toValueObject<Number, CelcicusTemperature>(23.4)).toBe(vo);
});

test('Number to HumidityPercent', () => {
  let vo: HumidityPercent;
  vo = 78.9 as any;
  expect(toValueObject<Number, HumidityPercent>(78.9)).toBe(vo);
});

test('Number from CelcicusTemperature', () => {
  let vo: CelcicusTemperature;
  vo = 23.4 as any;
  expect(fromValueObject<CelcicusTemperature, Number>(vo)).toBe(23.4);
});

test('Number from HumidityPercent', () => {
  let vo: HumidityPercent;
  vo = 78.9 as any;
  expect(fromValueObject<HumidityPercent, Number>(vo)).toBe(78.9);
});

import { toValueObject, fromValueObject } from './valueobject';
import { TemperatureCelcicus, HumidityPercent } from './environment';

test('Number to TemperatureCelcicus', () => {
  let vo: TemperatureCelcicus;
  vo = 23.4 as any;
  expect(toValueObject<Number, TemperatureCelcicus>(23.4)).toBe(vo);
});

test('Number to HumidityPercent', () => {
  let vo: HumidityPercent;
  vo = 78.9 as any;
  expect(toValueObject<Number, HumidityPercent>(78.9)).toBe(vo);
});

test('Number from TemperatureCelcicus', () => {
  let vo: TemperatureCelcicus;
  vo = 23.4 as any;
  expect(fromValueObject<TemperatureCelcicus, Number>(vo)).toBe(23.4);
});

test('Number from HumidityPercent', () => {
  let vo: HumidityPercent;
  vo = 78.9 as any;
  expect(fromValueObject<HumidityPercent, Number>(vo)).toBe(78.9);
});

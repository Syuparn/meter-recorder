import {
  Environment,
  EnvironmentRepository,
  HumidityPercent,
  TemperatureCelcicus,
} from '../domain/environment';
import { toValueObject } from '../domain/valueobject';
import { GetEnvironment, GetEnvironmentOutputData } from './getEnvironment';
import { OutputPort } from './port';

class MockEnvironmentRepository implements EnvironmentRepository {
  get(timestamp: Date): Environment {
    return {
      timestamp: timestamp,
      temperature: toValueObject<Number, TemperatureCelcicus>(23.4),
      humidity: toValueObject<Number, HumidityPercent>(78.9),
    };
  }
}

class MockOutputPort implements OutputPort<GetEnvironmentOutputData> {
  out: GetEnvironmentOutputData | undefined;

  present(out: GetEnvironmentOutputData): void {
    this.out = out;
  }
}

test('get environment', () => {
  const outputPort = new MockOutputPort();
  const inputPort = new GetEnvironment(
    outputPort,
    new MockEnvironmentRepository(),
  );

  // 2006 Jan 2 15:04:05.000
  const inputData = { timestamp: new Date(2006, 0, 2, 15, 4, 5) };

  inputPort.execute(inputData);

  expect(outputPort.out).toStrictEqual({
    environment: {
      timestamp: new Date(2006, 0, 2, 15, 4, 5),
      temperature: toValueObject<Number, TemperatureCelcicus>(23.4),
      humidity: toValueObject<Number, HumidityPercent>(78.9),
    },
  });
});

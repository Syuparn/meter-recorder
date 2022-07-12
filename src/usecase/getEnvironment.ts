import {
  Environment,
  EnvironmentRepository,
  HumidityPercent,
  TemperatureCelcicus,
} from '../domain/environment';
import { toValueObject } from '../domain/valueobject';
import { InputPort, OutputPort } from './port';

export interface GetEnvironmentInputData {
  timestamp: Date;
}
export interface GetEnvironmentOutputData {
  environment: Environment;
}

class GetEnvironment implements InputPort<GetEnvironmentInputData> {
  constructor(
    private readonly outputPort: OutputPort<GetEnvironmentOutputData>,
    private readonly environmentRepository: EnvironmentRepository,
  ) {}

  execute(inputData: GetEnvironmentInputData): void {
    // FIXME: impl
    const out = {
      environment: {
        timestamp: new Date(),
        temperature: toValueObject<Number, TemperatureCelcicus>(23.4),
        humidity: toValueObject<Number, HumidityPercent>(78.9),
      },
    };
    this.outputPort.present(out);
  }
}

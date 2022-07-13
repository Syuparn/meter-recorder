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

export class GetEnvironment implements InputPort<GetEnvironmentInputData> {
  constructor(
    private readonly outputPort: OutputPort<GetEnvironmentOutputData>,
    private readonly environmentRepository: EnvironmentRepository,
  ) {}

  async execute(inputData: GetEnvironmentInputData): Promise<void> {
    const environment = await this.environmentRepository.get(
      inputData.timestamp,
    );
    const outputData = { environment: environment };
    this.outputPort.present(outputData);
  }
}

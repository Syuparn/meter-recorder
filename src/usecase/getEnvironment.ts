import { Environment } from '../domain/environment';
import { InputPort, OutputPort } from './port';

export interface GetEnvironmentInputData {}
export interface GetEnvironmentOutputData {
  environment: Environment;
}

class GetEnvironment implements InputPort<GetEnvironmentInputData> {
  constructor(
    private readonly outputPort: OutputPort<GetEnvironmentOutputData>
  ) {}

  execute(inputData: GetEnvironmentInputData): void {
    // FIXME: impl
  }
}

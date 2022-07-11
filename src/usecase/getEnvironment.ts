import { inject, injectable } from 'tsyringe';
import { Environment, EnvironmentRepository } from '../domain/environment';
import { InputPort, OutputPort } from './port';

export interface GetEnvironmentInputData {}
export interface GetEnvironmentOutputData {
  environment: Environment;
}

@injectable()
class GetEnvironment implements InputPort<GetEnvironmentInputData> {
  constructor(
    @inject('OutputPort')
    private readonly outputPort: OutputPort<GetEnvironmentOutputData>,
    @inject('EnvironmentRepository')
    private readonly environmentRepository: EnvironmentRepository,
  ) {}

  execute(inputData: GetEnvironmentInputData): void {
    // FIXME: impl
  }
}

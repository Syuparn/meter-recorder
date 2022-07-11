import { inject, injectable } from 'tsyringe';
import { GetEnvironmentInputData } from '../usecase/getEnvironment';
import { InputPort } from '../usecase/port';

export interface GetRequest {
  timestamp: Date;
}

@injectable()
export class Controller {
  constructor(
    @inject('InputPort')
    private readonly inputPort: InputPort<GetEnvironmentInputData>,
  ) {}

  getEnvironment(getRequest: GetRequest): void {
    const inputData = {
      timestamp: getRequest.timestamp,
    };
    this.inputPort.execute(inputData);
  }
}

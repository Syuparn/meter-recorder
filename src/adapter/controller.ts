import { GetEnvironmentInputData } from '../usecase/getEnvironment';
import { InputPort } from '../usecase/port';

export interface GetRequest {
  timestamp: Date;
}

export class Controller {
  constructor(private readonly inputPort: InputPort<GetEnvironmentInputData>) {}

  getEnvironment(getRequest: GetRequest): void {
    const inputData = {
      timestamp: getRequest.timestamp,
    };
    this.inputPort.execute(inputData);
  }
}

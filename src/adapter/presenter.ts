import { GetEnvironmentOutputData } from '../usecase/getEnvironment';
import { OutputPort } from '../usecase/port';

class GetEnvironment implements OutputPort<GetEnvironmentOutputData> {
  present(outputData: GetEnvironmentOutputData): void {
    // FIXME: impl
    console.log(JSON.stringify(outputData));
  }
}

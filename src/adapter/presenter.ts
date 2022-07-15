import { Config } from '../config/config';
import { GetEnvironmentOutputData } from '../usecase/getEnvironment';
import { OutputPort } from '../usecase/port';

export class GetEnvironmentPresenter
  implements OutputPort<GetEnvironmentOutputData>
{
  private readonly folderName: string;

  constructor(config: Config) {
    this.folderName = config.folderName;
  }

  present(outputData: GetEnvironmentOutputData): void {
    // TODO: needs test! (but how?)
    console.log(JSON.stringify(outputData));
  }
}

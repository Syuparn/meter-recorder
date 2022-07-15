import { Config } from '../config/config';
import { GetEnvironmentOutputData } from '../usecase/getEnvironment';
import { OutputPort } from '../usecase/port';

export class GetEnvironmentPresenter
  implements OutputPort<GetEnvironmentOutputData>
{
  private readonly spreadSheetID: string;

  constructor(config: Config) {
    this.spreadSheetID = config.spreadSheetID;
  }

  present(outputData: GetEnvironmentOutputData): void {
    // TODO: needs test! (but how?)
    console.log(JSON.stringify(outputData));

    const ss = SpreadsheetApp.openById(this.spreadSheetID);
    if (ss.getSheets().length == 0) {
      throw Error(
        `sheet ${this.spreadSheetID} (${ss.getName()}) does not have sheets`,
      );
    }
    const sheet = ss.getSheets()[0];

    // write header at first
    if (sheet.getRange(1, 1).isBlank()) {
      sheet.appendRow(['timestamp', 'temperature', 'humidity']);
    }

    ((e) => {
      sheet.appendRow([
        e.timestamp.toLocaleString('ja-JP-u-ca-japanese', {
          timeZone: 'Asia/Tokyo',
        }),
        e.temperature,
        e.humidity,
      ]);
    })(outputData.environment);
  }
}

// make fetch API abstract
// NOTE: GAS cannot handle fetch() and node-fetch!
export type Fetcher = (
  url: string,
  options: { headers: { [key: string]: string } },
) => Promise<AbstractResponse>;

// make Response abstract
// NOTE: GAS returns GoogleAppsScript.URL_Fetch.HTTPResponse, not Response!
export interface AbstractResponse {
  readonly status: number;
  json(): Promise<any>;
}

// return wrapper of GAS fetch API
// TODO: how to test this??
export class GASFetcherFactory {
  static create(): Fetcher {
    return (url, options) => {
      // convert sync to async
      return new Promise((callback) => {
        const gasRes = UrlFetchApp.fetch(url, options);
        const res = gasResponseToFetchResponse(gasRes);
        callback(res);
      });
    };
  }
}

// convert GAS HTTPResponse
function gasResponseToFetchResponse(
  gasResponse: GoogleAppsScript.URL_Fetch.HTTPResponse,
): AbstractResponse {
  return {
    status: gasResponse.getResponseCode(),
    json: () =>
      new Promise((callback) =>
        callback(JSON.parse(gasResponse.getContentText())),
      ),
  };
}

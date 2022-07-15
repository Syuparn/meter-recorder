# meter-recorder
Fetch temperature periodically from [SwitchBot Meter Plus](https://us.switch-bot.com/products/switchbot-meter-plus) by [Google Apps Script](https://www.google.com/script/start/)

# Usage

## Buy SwitchBot!!

Both Meter and Hub are required to use API.

- [SwitchBot Hub Mini](https://us.switch-bot.com/products/switchbot-hub-mini)
- [SwitchBot Meter Plus](https://us.switch-bot.com/products/switchbot-meter-plus)

Don't forget to setup SwitchBot app in your smartphone.

## Create Project

```bash
$ git clone https://github.com/Syuparn/meter-recorder.git && cd meter-recorder
# set auth to GAS
# (GAS API must be enabled)
$ clasp login --no-localhost
# generate .clasp.json and initialize a project
$ clasp create --rootDir ./dist
```

## Deploy Project

```bash
$ npm install
$ npm run build
$ clasp push
```

## Create a New SpreadSheet

- account must be same as where you deployed the project
- check `spreadsheetId` ([Official Reference](https://developers.google.com/sheets/api/guides/concepts))

## Set Script Properties

- open the project
- add script properties below ([Official Reference](https://developers.google.com/apps-script/guides/properties#manage_script_properties_manually))

|property|value|
|-|-|
|switchbotAuthToken|authentication token for [SwitchBot API](https://github.com/OpenWonderLabs/SwitchBotAPI#authentication)|
|meterDeviceID|deviceID of your SwitchBot Meter, which can be obtained by [API](https://github.com/OpenWonderLabs/SwitchBotAPI#get-all-devices)|
|spreadSheetID|spreadsheetId of SpreadSheet created above|

## Run Script

- create a time based [trigger](https://developers.google.com/apps-script/guides/triggers/installable#managing_triggers_manually)
- results are automatically appended to the SpreadSheet!

# for Developers

## Test

```bash
$ npm test
```

NOTE: You should set environment variables to edit some unittests. Variables are set by [dotenv](https://www.npmjs.com/package/dotenv) (see `.env.example` file).

## Format soruce codes

```bash
$ npm run fmt
```

## Bundle files into dist/

```bash
$ npm run build
```

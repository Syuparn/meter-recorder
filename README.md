# meter-recorder
Fetch temperature periodically from [SwitchBot Meter Plus](https://us.switch-bot.com/products/switchbot-meter-plus) by [GAS](https://www.google.com/script/start/)

# Create Project

```bash
# set auth to GAS
# (GAS API must be enabled)
$ clasp login --no-localhost
# generate .clasp.json and initialize a project
$ clasp create --rootDir ./src
```

# Deploy source codes to the Project

```bash
$ clasp push
```

# for Developers

## Test

```bash
$ npm test
```

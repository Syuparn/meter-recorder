export interface Environment {
  readonly time: Date;
  readonly temperature: TemperatureCelcicus;
  readonly humidity: HumidityPercent;
}

export interface TemperatureCelcicus extends Number {
  _TemperatureCelcicusBrand: any; // dummy for nominal typing
}

export interface HumidityPercent extends Number {
  _HumidityPercentBrand: any; // dummy for nominal typing
}

export interface EnvironmentRepository {
  // TODO: enable to specify time
  get(): Environment;
}

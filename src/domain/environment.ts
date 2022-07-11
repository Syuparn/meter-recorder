export interface Environment {
  readonly time: Date,
  readonly temperature: CelcicusTemperature,
  readonly humidity: HumidityPercent,
}

export interface CelcicusTemperature extends Number {
  _CelcicusTemperatureBrand: any, // dummy for nominal typing
}

export interface HumidityPercent extends Number {
  _HumidityPercentBrand: any, // dummy for nominal typing
}

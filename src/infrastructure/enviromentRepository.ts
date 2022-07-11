import {
  TemperatureCelcicus,
  Environment,
  EnvironmentRepository,
  HumidityPercent,
} from '../domain/environment';
import { toValueObject } from '../domain/valueobject';

class MeterEnvironmentRepository implements EnvironmentRepository {
  get(): Environment {
    // FIXME: impl
    return {
      time: new Date(),
      temperature: toValueObject<Number, TemperatureCelcicus>(30.0),
      humidity: toValueObject<Number, HumidityPercent>(70.0),
    };
  }
}

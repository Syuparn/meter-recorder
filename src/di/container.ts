import { Controller } from '../adapter/controller';
import { GetEnvironmentPresenter } from '../adapter/presenter';
import { GASConfigFactory } from '../config/gasConfig';
import { MeterEnvironmentRepository } from '../infrastructure/enviromentRepository';
import { GetEnvironment } from '../usecase/getEnvironment';

// NOTE: create DI container manually since GAS cannot import modules
export function container(): Controller {
  const properties = PropertiesService.getScriptProperties();
  const configFactory = new GASConfigFactory(properties);
  const config = configFactory.get();

  const environmentRepository = new MeterEnvironmentRepository(config);

  const getEnvironmentOutputPort = new GetEnvironmentPresenter(config);

  const getEnvironmentInputPort = new GetEnvironment(
    getEnvironmentOutputPort,
    environmentRepository,
  );

  return new Controller(getEnvironmentInputPort);
}

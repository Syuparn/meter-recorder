import { Controller } from '../adapter/controller';
import { GetEnvironmentPresenter } from '../adapter/presenter';
import { MeterEnvironmentRepository } from '../infrastructure/enviromentRepository';
import { GetEnvironment } from '../usecase/getEnvironment';

// NOTE: create DI container manually since GAS cannot import modules
export function container(): Controller {
  const environmentRepository = new MeterEnvironmentRepository();

  const getEnvironmentOutputPort = new GetEnvironmentPresenter();

  const getEnvironmentInputPort = new GetEnvironment(
    getEnvironmentOutputPort,
    environmentRepository,
  );

  return new Controller(getEnvironmentInputPort);
}

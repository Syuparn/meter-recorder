import { container } from 'tsyringe';
import { Controller } from './adapter/controller';

export function handler() {
  const controller = container.resolve(Controller);
  // TODO: enable to specify which method to execute
  const req = { timestamp: new Date() };
  controller.getEnvironment(req);
}

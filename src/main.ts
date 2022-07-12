import { container } from './di/container';

export function handler() {
  const controller = container();
  const req = { timestamp: new Date() };
  controller.getEnvironment(req);
}

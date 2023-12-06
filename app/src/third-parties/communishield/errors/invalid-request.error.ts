import { CommunishieldError } from './communishield';

export class InvalidRequestError extends CommunishieldError {
  constructor(reason: string) {
    super(`Invalid request: ${(reason as any).message}`);
  }
}

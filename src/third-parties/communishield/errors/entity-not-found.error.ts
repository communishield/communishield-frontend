import { CommunishieldError } from './communishield';

export class EntityNotFoundError extends CommunishieldError {
  constructor(entity: string) {
    super(`The ${entity} you are trying to access does not exist.`);
  }
}

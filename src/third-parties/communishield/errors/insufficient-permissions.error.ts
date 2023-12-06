import { CommunishieldError } from './communishield';

export class InsufficientPermissionsError extends CommunishieldError {
  constructor() {
    super(
      'You do not have sufficient permissions to perform this action. Please contact your administrator.'
    );
  }
}

import { CommunishieldError } from './communishield';

export class UsernameAlreadyInUse extends CommunishieldError {
	constructor() {
		super('Username already in use');
	}
}

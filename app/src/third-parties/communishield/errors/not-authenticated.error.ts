import { CommunishieldError } from './communishield';

export class NotAuthenticatedError extends CommunishieldError {
	constructor() {
		super('You are not authenticated. Please login first.');
	}
}

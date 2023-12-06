import { ApplicationError } from './application.error';

export class UnexpectedError extends ApplicationError {
	constructor() {
		super('An unexpected error occurred. Please try again later.');
	}
}

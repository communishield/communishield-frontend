import { CommunishieldError } from './communishield';

export class EntityAlreadyExistsError extends CommunishieldError {
	constructor(entity: string) {
		super(
			`A conflict occurred while trying to create ${entity}. Try again with a different name.`
		);
	}
}

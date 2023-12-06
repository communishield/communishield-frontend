import { Flex, Heading } from '@radix-ui/themes';
import { useContext } from 'react';
import { UserContext } from '../../contexts/user.context';

export function HomePage() {
	const { user } = useContext(UserContext);

	return (
		<Flex>
			<Heading>Welcome back!, {user?.username}</Heading>
		</Flex>
	);
}

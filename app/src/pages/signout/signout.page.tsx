import { useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import { Link } from '../../components/link';
import { Text } from '@radix-ui/themes';

export function Signout() {
	const { setUser } = useContext(UserContext);
	setUser(undefined);

	window.location.href = '/signin';

	return (
		<>
			<Text>You are signed out. Redirecting...</Text>
			<Text>
				If you are not redirected automatically, click{' '}
				<Link href="/signin" color="indigo">
					here
				</Link>
				.
			</Text>
		</>
	);
}

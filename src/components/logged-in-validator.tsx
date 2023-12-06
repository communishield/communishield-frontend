import { PropsWithChildren, useContext } from 'react';
import { UserContext } from '../contexts/user.context';
import { Text } from '@radix-ui/themes';
import { Link } from './link';

export function LoggedInValidator({ children }: PropsWithChildren) {
  const { user } = useContext(UserContext);

  if (!user) {
    window.location.href = '/signin';

    return (
      <>
        <Text color="red">You are not logged in. Redirecting...</Text>
        <Text color="red">
          If you are not redirected automatically, click{' '}
          <Link href="/signin" color="indigo">
            here
          </Link>
          .
        </Text>
      </>
    );
  }

  return children;
}

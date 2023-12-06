import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export function useCookieState<T>(
	key: string,
	opts?: { expires: number }
): [T | undefined, Dispatch<SetStateAction<T | undefined>>] {
	const [state, setState] = useState<T | undefined>(() => {
		const item = Cookies.get(key);
		try {
			return item ? JSON.parse(item) : undefined;
		} catch {
			return undefined;
		}
	});

	useEffect(() => {
		if (state) {
			Cookies.set(key, JSON.stringify(state), { expires: opts?.expires });
			return;
		}

		Cookies.remove(key);
	}, [key, opts, state]);

	return [state, setState];
}

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Root } from './components/layout/root';
import LoginPage from './pages/login/login.page';
import SignupPage from './pages/signup/signup.page';
import { ErrorContext } from './contexts/error.context';
import { useEffect, useMemo, useState } from 'react';
import { UserContext } from './contexts/user.context';
import { LoggedInValidator } from './components/logged-in-validator';
import { HomePage } from './pages/home/home-page';
import { useCookieState } from './hooks/cookieState';
import { User } from './models/user';
import { Signout } from './pages/signout/signout.page';
import { FileManagerPage } from './pages/file-manager/file-manager.page';
import { Dialog, DialogProps } from './components/dialog';
import { ApplicationError } from './errors/application.error';
import { UnexpectedError } from './errors/unexpected.error';
import { DialogContext } from './contexts/dialog.context';
import { LoadingContext } from './contexts/loading.context';
import { Loading } from './components/loading';
import { Text } from '@radix-ui/themes';

export function App() {
	const [error, setError] = useState<Error | undefined>(undefined);
	const [dialogProps, setDialogProps] = useState<DialogProps | undefined>(
		undefined
	);
	const [user, setUser] = useCookieState<User>('user');
	const [loading, setLoading] = useState(false);

	const errorContextValue = useMemo(
		() => ({ error, setError }),
		[error, setError]
	);
	const userContextValue = useMemo(() => ({ user, setUser }), [user, setUser]);
	const dialogContextValue = useMemo(
		() => ({ dialogProps, setDialogProps }),
		[dialogProps, setDialogProps]
	);
	const loadingContextValue = useMemo(
		() => ({ loading, setLoading }),
		[loading, setLoading]
	);

	useEffect(() => {
		if (error) {
			setDialogProps({
				title: 'Error',
				color: 'red',
				message:
					error instanceof ApplicationError
						? error.message
						: new UnexpectedError().message,
				isOpen: true,
				onDismiss: () => {
					setError(undefined);
				},
			});
			setLoading(false);
		}
	}, [error, setDialogProps]);

	return (
		<BrowserRouter>
			<DialogContext.Provider value={dialogContextValue}>
				<ErrorContext.Provider value={errorContextValue}>
					<UserContext.Provider value={userContextValue}>
						<LoadingContext.Provider value={loadingContextValue}>
							{dialogProps && (
								<Dialog
									title={dialogProps.title}
									color={dialogProps.color}
									message={<Text color="gray">{dialogProps.message}</Text>}
									isOpen={dialogProps.isOpen}
									onDismiss={() => {
										dialogProps.onDismiss();
										setDialogProps(undefined);
									}}
								/>
							)}
							{loading && <Loading />}
							<Root>
								<Routes>
									<Route
										path="/"
										element={
											<LoggedInValidator>
												<HomePage />
											</LoggedInValidator>
										}
									/>
									<Route
										path="/file-manager"
										element={
											<LoggedInValidator>
												<FileManagerPage />
											</LoggedInValidator>
										}
									/>
									<Route path="/signup" element={<SignupPage />} />
									<Route path="/signin" element={<LoginPage />} />
									<Route path="/signout" element={<Signout />} />
								</Routes>
							</Root>
						</LoadingContext.Provider>
					</UserContext.Provider>
				</ErrorContext.Provider>
			</DialogContext.Provider>
		</BrowserRouter>
	);
}

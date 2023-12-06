import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Root } from './components/layout/root';
import LoginPage from './pages/login/login.page';
import SignupPage from './pages/signup/signup.page';
import { ErrorContext } from './contexts/error.context';
import { useMemo, useState } from 'react';
import { Dialog } from './components/error-dialog';
import { UserContext } from './contexts/user.context';
import { LoggedInValidator } from './components/logged-in-validator';
import { HomePage } from './pages/home/home-page';
import { useCookieState } from './hooks/cookieState';

export function App() {
  const [error, setError] = useState<Error | undefined>(undefined);
  const [user, setUser] = useCookieState<{ token: string }>('user');

  const errorContextValue = useMemo(
    () => ({ error, setError }),
    [error, setError]
  );
  const userContextValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <BrowserRouter>
      <ErrorContext.Provider value={errorContextValue}>
        <UserContext.Provider value={userContextValue}>
          {error && (
            <Dialog
              isOpen={Boolean(error)}
              error={error}
              onDismiss={() => setError(undefined)}
            />
          )}
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
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </Root>
        </UserContext.Provider>
      </ErrorContext.Provider>
    </BrowserRouter>
  );
}

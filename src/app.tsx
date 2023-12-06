import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Root } from './components/layout/root';
import LoginPage from './pages/login/login.page';
import SignupPage from './pages/signup/signup.page';

export function App() {
	return (
		<BrowserRouter>
			<Root>
				<Routes>
					<Route path="/" element={<h1>Home</h1>} />
					<Route path="/signup" element={<SignupPage />} />
					<Route path="/login" element={<LoginPage />} />
				</Routes>
			</Root>
		</BrowserRouter>
	);
}

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Root } from './components/layout/root';
import RegisterPage from './pages/register/register.page';

export function App() {
  return (
    <BrowserRouter>
      <Root>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<h1>Login</h1>} />
        </Routes>
      </Root>
    </BrowserRouter>
  );
}

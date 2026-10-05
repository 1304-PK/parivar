import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import TryOnPage from './pages/TryOnPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/try-on" element={<TryOnPage />} />
      </Routes>
    </BrowserRouter>
  );
}

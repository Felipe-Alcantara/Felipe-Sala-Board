import { useState } from 'react';
import HomePage from './pages/HomePage';
import MaterialsPage from './pages/MaterialsPage';

export default function App() {
  const [page, setPage] = useState('home');

  if (page === 'materials') {
    return (
      <div key="materials" className="animate-slide-right">
        <MaterialsPage onBack={() => setPage('home')} />
      </div>
    );
  }

  return (
    <div key="home" className="animate-slide-left">
      <HomePage onNavigate={setPage} />
    </div>
  );
}

import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MaterialsPage from './pages/MaterialsPage';

export default function App() {
  const [page, setPage] = useState('home');
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const handleNavigate = (newPage: string) => {
    if (newPage === page) return;
    setDirection(newPage === 'materials' ? 'right' : 'left');
    setPage(newPage);
  };

  return (
    <div className="min-h-screen">
      <Header onNavigate={handleNavigate} currentPage={page} />
      <div
        key={page}
        className={page === 'home' ? 'animate-slide-left' : 'animate-slide-right'}
      >
        {page === 'home' ? <HomePage /> : <MaterialsPage />}
      </div>
      <Footer />
    </div>
  );
}

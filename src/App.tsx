import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import GestaoPage from './pages/GestaoPage';
import MaterialsPage from './pages/MaterialsPage';

export default function App() {
  const [page, setPage] = useState('home');

  const handleNavigate = (newPage: string) => {
    if (newPage === page) return;
    setPage(newPage);
  };

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage />;
      case 'gestao':
        return <GestaoPage />;
      case 'materials':
        return <MaterialsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen">
      <Header onNavigate={handleNavigate} currentPage={page} />
      <div key={page} className="animate-slide-left">
        {renderPage()}
      </div>
      <Footer />
    </div>
  );
}

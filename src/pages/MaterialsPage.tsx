import { useState, useEffect } from 'react';
import Header from '../components/Header';
import MaterialTree from '../components/MaterialTree';
import Footer from '../components/Footer';
import { materials } from '../data/mockData';
import type { MaterialNode } from '../data/mockData';

interface Props {
  onBack: () => void;
}

export default function MaterialsPage({ onBack }: Props) {
  const [data, setData] = useState<MaterialNode[]>(materials);

  useEffect(() => {
    const stored = localStorage.getItem('boardData');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.materials) {
        setData(parsed.materials);
      }
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Header onNavigate={(p) => { if (p === 'home') onBack(); }} currentPage="materials" />
      <MaterialTree nodes={data} />
      <Footer />
    </div>
  );
}

import { useState, useEffect } from 'react';
import MaterialTree from '../components/MaterialTree';
import { materials } from '../data/mockData';
import type { MaterialNode } from '../data/mockData';

export default function MaterialsPage() {
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

  return <MaterialTree nodes={data} />;
}

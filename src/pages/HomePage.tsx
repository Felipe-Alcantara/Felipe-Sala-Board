import { useEffect, useState } from 'react';
import Schedule from '../components/Schedule';
import QuickLinks from '../components/QuickLinks';
import { schedule, quickLinks } from '../data/mockData';

export default function HomePage() {
  const [data, setData] = useState({ schedule, quickLinks });

  useEffect(() => {
    const stored = localStorage.getItem('boardData');
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  return (
    <>
      <Schedule schedule={data.schedule} />
      <QuickLinks links={data.quickLinks} />
    </>
  );
}

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import AlertBanner from '../components/AlertBanner';
import UpcomingTasks from '../components/UpcomingTasks';
import Schedule from '../components/Schedule';
import QuickLinks from '../components/QuickLinks';
import Footer from '../components/Footer';
import { alertBanner, upcomingTasks, schedule, quickLinks } from '../data/mockData';

export default function HomePage() {
  const [data, setData] = useState({
    alertBanner,
    upcomingTasks,
    schedule,
    quickLinks
  });

  useEffect(() => {
    const stored = localStorage.getItem('boardData');
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <AlertBanner alert={data.alertBanner} />
      <UpcomingTasks tasks={data.upcomingTasks} />
      <Schedule schedule={data.schedule} />
      <QuickLinks links={data.quickLinks} />
      <Footer />
    </div>
  );
}

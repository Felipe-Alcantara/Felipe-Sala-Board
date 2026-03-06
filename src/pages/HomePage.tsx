import { useEffect, useState } from 'react';
import Header from '../components/Header';
import AlertBanner from '../components/AlertBanner';
import UpcomingTasks from '../components/UpcomingTasks';
import Schedule from '../components/Schedule';
import QuickLinks from '../components/QuickLinks';
import Footer from '../components/Footer';
import { alertBanner, upcomingTasks, schedule, quickLinks } from '../data/mockData';
import { getNextClassAlert } from '../utils/scheduleAlert';

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState(() => Date.now());
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

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentTime(Date.now());
    }, 60000);

    return () => window.clearInterval(intervalId);
  }, []);

  const activeAlert = getNextClassAlert(data.schedule, data.alertBanner, new Date(currentTime));

  return (
    <div className="min-h-screen">
      <Header />
      <AlertBanner alert={activeAlert} />
      <UpcomingTasks tasks={data.upcomingTasks} />
      <Schedule schedule={data.schedule} />
      <QuickLinks links={data.quickLinks} />
      <Footer />
    </div>
  );
}

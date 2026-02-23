import Header from './components/Header';
import AlertBanner from './components/AlertBanner';
import UpcomingTasks from './components/UpcomingTasks';
import Schedule from './components/Schedule';
import QuickLinks from './components/QuickLinks';
import Footer from './components/Footer';
import { alertBanner, upcomingTasks, schedule, quickLinks } from './data/mockData';

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <AlertBanner alert={alertBanner} />
      <UpcomingTasks tasks={upcomingTasks} />
      <Schedule schedule={schedule} />
      <QuickLinks links={quickLinks} />
      <Footer />
    </div>
  );
}

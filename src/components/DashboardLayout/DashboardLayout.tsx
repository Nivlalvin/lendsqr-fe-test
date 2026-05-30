import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import styles from './DashboardLayout.module.scss';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <Sidebar />
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
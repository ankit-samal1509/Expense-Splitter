import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function MainLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar publicView={true} />
      <Outlet />
    </div>
  );
}

export default MainLayout;
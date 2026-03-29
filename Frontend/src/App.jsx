import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import MainLayout from './components/layout/MainLayout';

// Page Components
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import GroupDetail from './pages/GroupDetail';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Main Layout: No Sidebar */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* App Layout: Navbar + Sidebar */}
        <Route element={user ? <AppLayout /> : <Navigate to="/login" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/groups" element={<Dashboard />} /> 
          <Route path="/group/:id" element={<GroupDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
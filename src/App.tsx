import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Users from './pages/Users/Users';
import UserDetails from './pages/UserDetails/UserDetails';
import './styles/global.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/users" element={<Users />} />
        <Route path="/dashboard/users/:id" element={<UserDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
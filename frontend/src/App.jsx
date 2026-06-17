import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Splash from './pages/Splash';
import Intro from './pages/Intro';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import AddEmployeePage from './pages/AddEmployeePage';
import EmployeesPage from './pages/EmployeesPage';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/splash" element={<Splash />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/employees" element={<ProtectedRoute><EmployeesPage /></ProtectedRoute>} />
        <Route path="/add" element={<ProtectedRoute><AddEmployeePage /></ProtectedRoute>} />
        <Route path="/" element={<Navigate to="/splash" replace />} />
        <Route path="*" element={<Navigate to="/splash" replace />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
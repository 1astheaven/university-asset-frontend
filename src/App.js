import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Убедитесь, что путь верный
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import UsersPage from './pages/UsersPage';
import UserFormPage from './pages/UserFormPage';
import ProtectedRoute from './components/ProtectedRoute';
import RoomsPage from './pages/RoomsPage';
import ProfilePage from './pages/ProfilePage';
import RoomDetailPage from './pages/RoomDetailPage';
import AssetsPage from './pages/AssetsPage';
import WelcomePage from './pages/WelcomePage';

function App() {
  return (
    <AuthProvider> {/* Обертываем все приложение */}
      <Router>
        <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/welcome" element={<ProtectedRoute><WelcomePage /></ProtectedRoute>}/>
            <Route path="/users" element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
            <Route path="/users/new" element={<ProtectedRoute requiredRole="admin"><UserFormPage /></ProtectedRoute>} />
            <Route path="/users/:userId" element={<ProtectedRoute><UserFormPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/rooms" element={<ProtectedRoute><RoomsPage /></ProtectedRoute>} />
            <Route path="/rooms/:roomId" element={<ProtectedRoute><RoomDetailPage /></ProtectedRoute>} />
            <Route path="/assets" element={<ProtectedRoute><AssetsPage /></ProtectedRoute>} />
            <Route path="/" element={<Navigate to="/welcome" replace />} />
            <Route path="*" element={<div>404 - Страница не найдена</div>} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
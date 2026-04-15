import React, { useMemo, useState, useEffect } from 'react';
import { api } from './api';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND } from './lib/constants';

// Layout Components
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';

// Views
import LoginView from './views/LoginView';
import DashboardView from './views/DashboardView';
import CourseView from './views/CourseView';
import LibraryView from './views/LibraryView';
import ToolsView from './views/ToolsView';
import CommunityView from './views/CommunityView';

const styles = {
  app: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: "'Poppins', 'Roboto', 'Segoe UI', sans-serif",
    background: BRAND.primary,
    color: BRAND.cream,
  },
  mainContent: (sidebarWidth) => ({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: sidebarWidth,
    transition: 'margin-left 0.3s ease',
  }),
};

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isPaid, setIsPaid] = useState(false);
  const [search, setSearch] = useState('');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [courseContent, setCourseContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    if (sessionId) {
      alert('¡Pago exitoso! Procesando tu acceso...');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    if (token) { loadProfile(token); }
  }, [token]);

  useEffect(() => {
    if (activeView === 'diplomado') { loadContent(); }
  }, [activeView]);

  const loadProfile = async (t) => {
    try {
      const { user, enrollments } = await api.getProfile(t);
      setUser(user);
      setIsPaid(enrollments.some(e => e.id === 1));
    } catch (err) { console.error(err); handleLogout(); }
  };

  const loadContent = async () => {
    try { const data = await api.getContent(1); setCourseContent(data); }
    catch (err) { console.error(err); }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { token, user } = await api.login('demo@mindhub.com', 'demo123');
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
    } catch (err) { alert('Login fallido'); }
    finally { setIsLoading(false); }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const filteredModules = useMemo(() => {
    return courseContent.filter(m => 
      m.title.toLowerCase().includes(search.toLowerCase()) || 
      m.week.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, courseContent]);

  const sidebarWidth = isSidebarOpen ? 260 : 80;

  if (!token) {
    return <LoginView handleLogin={handleLogin} isLoading={isLoading} />;
  }

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView isPaid={isPaid} setActiveView={setActiveView} />;
      case 'diplomado':
        return (
          <CourseView 
            isPaid={isPaid} 
            setIsPaid={setIsPaid} 
            search={search} 
            setSearch={setSearch} 
            filteredModules={filteredModules} 
          />
        );
      case 'biblioteca':
        return <LibraryView />;
      case 'herramientas':
        return <ToolsView />;
      case 'comunidad':
        return <CommunityView />;
      default:
        return <DashboardView isPaid={isPaid} setActiveView={setActiveView} />;
    }
  };

  return (
    <div style={styles.app}>
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        isSidebarOpen={isSidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        handleLogout={handleLogout} 
      />

      <div style={styles.mainContent(sidebarWidth)}>
        <Header activeView={activeView} user={user} />
        
        <main style={{ padding: 32, flex: 1 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

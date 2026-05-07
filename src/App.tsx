import { Routes, Route, useLocation } from 'react-router';
import { useEffect } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import ExamsPage from './pages/ExamsPage';
import ExercicesPage from './pages/ExercicesPage';
import ToolsPage from './pages/ToolsPage';
import ResearchPage from './pages/ResearchPage';
import VideosPage from './pages/VideosPage';
import CertificationsPage from './pages/CertificationsPage';
import TeachingPage from './pages/TeachingPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/exams" element={<ExamsPage />} />
          <Route path="/exercices" element={<ExercicesPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/certifications" element={<CertificationsPage />} />
          <Route path="/teaching" element={<TeachingPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

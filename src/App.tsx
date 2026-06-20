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
import EventsPage from './pages/EventsPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import MenuManage from './pages/admin/MenuManage';
import CoursesManage from './pages/admin/CoursesManage';
import ExercicesManage from './pages/admin/ExercicesManage';
import ExamsManage from './pages/admin/ExamsManage';
import ToolsManage from './pages/admin/ToolsManage';
import ResearchManage from './pages/admin/ResearchManage';
import VideosManage from './pages/admin/VideosManage';
import EventsManage from './pages/admin/EventsManage';
import FooterManage from './pages/admin/FooterManage';
import HomeManage from './pages/admin/HomeManage';
import ChangePasswordPage from './pages/admin/ChangePasswordPage';
import LoginPage from './pages/admin/LoginPage';
import ContentManage from './pages/admin/ContentManage';

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
          <Route path="/events" element={<EventsPage />} />
          <Route path="/idaraton/login" element={<LoginPage />} />
          <Route path="/idaraton" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="menu" element={<MenuManage />} />
            <Route path="courses" element={<CoursesManage />} />
            <Route path="exercices" element={<ExercicesManage />} />
            <Route path="exams" element={<ExamsManage />} />
            <Route path="tools" element={<ToolsManage />} />
            <Route path="research" element={<ResearchManage />} />
            <Route path="videos" element={<VideosManage />} />
            <Route path="events" element={<EventsManage />} />
            <Route path="footer" element={<FooterManage />} />
            <Route path="home" element={<HomeManage />} />
            <Route path="change-password" element={<ChangePasswordPage />} />
            <Route path=":section" element={<ContentManage />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

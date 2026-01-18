import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MouseFollower from './components/MouseFollower';
import { ThemeProvider } from './components/ThemeContext';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen text-text-light dark:text-text-dark font-sans animated-gradient-bg transition-colors duration-300">
          <MouseFollower />
          <ScrollToTop />
          <Navbar />
          
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* 1. Pet Shop Management System (Added Inline) */}
            <Route path="/project/petshop" element={
              <ProjectDetails
                title="Pet Shop Management System"
                desc="A versatile dual-interface Java application for pet shop management, featuring both a modern Swing GUI and a robust Command Line Interface."
                repoLink="https://github.com/Raveen-Abeydeera/PetShopManagement" 
                techStack={['Java', 'Swing (GUI)', 'AWT', 'OOP', 'SHA-256', 'File I/O']}
                features={[
                  'Dual Interface Support: Seamless operation via Graphical User Interface (Swing) or Command Line Interface (CLI).',
                  'Role-Based Dashboards: Secure login with distinct, tabbed views for Managers (Admin) and Cashiers.',
                  'Interactive GUI: Features JTabbedPane navigation, JTable inventory views, and dynamic form inputs.',
                  'Unified Persistence: Both interfaces share the same local storage (products.txt, cashiers.dat) for data consistency.',
                  'Security: SHA-256 password hashing implemented across both login modes.'
                ]}
                screenshots={[
                  '/images/petshop page images/petshoplogin.png',
                  '/images/petshop page images/home.png',
                  '/images/petshop page images/createcashier.png'
                ]}
              >
                <p className="mb-4">
                  This project has evolved into a comprehensive application featuring a <strong>Dual Interface</strong> architecture. 
                  It demonstrates the flexibility of Java by decoupling backend logic from the frontend, allowing the same core system to drive both a 
                  terminal-based menu and a rich <strong>Graphical User Interface (GUI)</strong> built with Java Swing.
                </p>
                <p>
                  The new GUI mode offers an intuitive experience with <strong>Tabbed Navigation</strong> and real-time data tables, making inventory management significantly more efficient. 
                  Despite the frontend upgrade, the system maintains its robust security with <strong>SHA-256 hashing</strong> and reliable file-based persistence for user data and inventory logs.
                </p>
              </ProjectDetails>
            } />

            {/* 2. Greenlife Wellness */}
            <Route path="/project/greenlife" element={
              <ProjectDetails
                title="Greenlife Wellness"
                desc="A holistic wellness center management system with booking and user dashboards."
                repoLink="https://github.com/Raveen-Abeydeera/greenlife-wellness"
                techStack={['PHP', 'MySQL', 'Bootstrap 5', 'JavaScript', 'CSS3']}
                features={[
                    'User Authentication: Secure login/register.',
                    'Appointment Booking: Real-time booking system.',
                    'Therapist Management: Profiles and availability.',
                    'Admin Dashboard: Backend interface.'
                ]}
                screenshots={[
                    '/images/greenlife wellness page images/client home page.png',
                    '/images/greenlife wellness page images/book appointment .png',
                    '/images/greenlife wellness page images/dashboard.png',
                    '/images/greenlife wellness page images/login.png'
                ]}
              >
                <p>Greenlife Wellness is a web-based platform designed to manage the daily operations of a wellness center. It allows clients to browse services, view therapist profiles, and book appointments online.</p>
              </ProjectDetails>
            } />

            {/* 3. LuxeVista Resort */}
            <Route path="/project/luxevista" element={
               <ProjectDetails
                title="LuxeVista Resort"
                desc="A premium native Android application serving as a digital concierge."
                downloadLink="https://github.com/Raveen-Abeydeera/luxevista-resort/releases/download/v1.0/LuxeVistaResort.apk"
                repoLink="https://github.com/Raveen-Abeydeera/luxevista-resort"
                techStack={['Java', 'Android SDK', 'SQLite', 'Material Design']}
                features={[
                    'Native Performance: Built with Java and Android SDK.',
                    'Smart Booking Engine: Filter rooms by date.',
                    'Service Reservations: Book spa treatments directly.',
                    'Local Persistence: Uses SQLite for offline data.'
                ]}
                screenshots={[
                    '/images/Luxvista images/home scr.png',
                    '/images/Luxvista images/room list scr.png',
                    '/images/Luxvista images/my bookings.png',
                    '/images/Luxvista images/Login scr.png'
                ]}
              >
                <p>LuxeVista Resort is a native Android application designed to enhance the guest experience. It features a robust room booking system, service reservations, and a secure user account system.</p>
              </ProjectDetails>
            } />

          </Routes>
          
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
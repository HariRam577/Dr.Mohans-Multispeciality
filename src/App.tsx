import { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { AppointmentDrawer, type BookingPrefill } from './components/AppointmentDrawer';
import { ArticleModal } from './components/ArticleModal';
import { DoctorProfileModal } from './components/DoctorProfileModal';
import { Footer } from './components/Footer';
import { Navbar, type AppRoute } from './components/Navbar';
import type { Doctor } from './data/doctors';
import type { MedicalArticle } from './data/insights';
import { getSpecialityBySlug } from './data/specialities';
import { CentresPage } from './pages/CentresPage';
import { DoctorsPage } from './pages/DoctorsPage';
import { HomePage } from './pages/HomePage';
import { ResearchPage } from './pages/ResearchPage';
import { SpecialitiesPage } from './pages/SpecialitiesPage';
import { SpecialityDetailPage } from './pages/SpecialityDetailPage';

function parseHashToRoute(): AppRoute {
  const hash = window.location.hash.replace(/^#/, '');
  if (hash.startsWith('/specialities/')) {
    const slug = hash.replace('/specialities/', '').split('?')[0];
    if (slug) return { page: 'speciality', slug };
  }
  if (hash === '/specialities') return { page: 'specialities' };
  if (hash === '/doctors') return { page: 'doctors' };
  if (hash === '/centres') return { page: 'centres' };
  if (hash === '/research') return { page: 'research' };
  return { page: 'home' };
}

function routeToHash(route: AppRoute): string {
  switch (route.page) {
    case 'specialities':
      return '#/specialities';
    case 'speciality':
      return `#/specialities/${route.slug ?? 'diabetes-endocrinology'}`;
    case 'doctors':
      return '#/doctors';
    case 'centres':
      return '#/centres';
    case 'research':
      return '#/research';
    default:
      return '#/';
  }
}

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() => parseHashToRoute());
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState<BookingPrefill | undefined>(undefined);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<MedicalArticle | null>(null);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseHashToRoute());
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (route.page === 'speciality' && route.slug) {
      const spec = getSpecialityBySlug(route.slug);
      document.title = spec
        ? `${spec.name} | Dr. Mohan's Multispeciality Healthcare`
        : "Specialities | Dr. Mohan's";
    } else if (route.page === 'specialities') {
      document.title = "All Specialities | Dr. Mohan's Multispeciality Healthcare";
    } else if (route.page === 'doctors') {
      document.title = "Find a Specialist Doctor | Dr. Mohan's";
    } else if (route.page === 'centres') {
      document.title = "Find a Centre (50+ Locations) | Dr. Mohan's";
    } else if (route.page === 'research') {
      document.title = "Research & MDRF Innovation | Dr. Mohan's";
    } else {
      document.title = "Dr. Mohan's | Multispeciality Healthcare & Diabetes Specialities Centre";
    }
  }, [route]);

  const navigate = (nextRoute: AppRoute) => {
    const nextHash = routeToHash(nextRoute);
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
    } else {
      setRoute(nextRoute);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openBooking = (prefill?: BookingPrefill) => {
    setBookingPrefill(prefill);
    setBookingOpen(true);
  };

  const routeKey = `${route.page}-${route.slug ?? ''}`;

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-white text-[#172B45]">
        <Navbar
          currentRoute={route}
          onNavigate={navigate}
          onOpenBooking={(prefill) => openBooking(prefill)}
        />

        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={routeKey}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {route.page === 'home' && (
                <HomePage
                  onNavigate={navigate}
                  onOpenBooking={openBooking}
                  onSelectDoctor={setSelectedDoctor}
                  onSelectArticle={setSelectedArticle}
                />
              )}

              {route.page === 'specialities' && (
                <SpecialitiesPage onNavigate={navigate} onOpenBooking={openBooking} />
              )}

              {route.page === 'speciality' && (
                <SpecialityDetailPage
                  slug={route.slug ?? 'diabetes-endocrinology'}
                  onNavigate={navigate}
                  onOpenBooking={openBooking}
                  onSelectDoctor={setSelectedDoctor}
                  onSelectArticle={setSelectedArticle}
                />
              )}

              {route.page === 'doctors' && (
                <DoctorsPage
                  onOpenBooking={openBooking}
                  onSelectDoctor={setSelectedDoctor}
                />
              )}

              {route.page === 'centres' && <CentresPage onOpenBooking={openBooking} />}

              {route.page === 'research' && (
                <ResearchPage onNavigate={navigate} onOpenBooking={() => openBooking()} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer onNavigate={navigate} onOpenBooking={() => openBooking()} />

        <AppointmentDrawer
          open={bookingOpen}
          prefill={bookingPrefill}
          onClose={() => setBookingOpen(false)}
        />

        <DoctorProfileModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
          onBookWithDoctor={(doc) => {
            setSelectedDoctor(null);
            openBooking({
              specialitySlug: doc.specialitySlug,
              centreId: doc.centreIds[0],
              doctorId: doc.id,
            });
          }}
        />

        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          onExploreSpeciality={(slug) => navigate({ page: 'speciality', slug })}
        />
      </div>
    </MotionConfig>
  );
}

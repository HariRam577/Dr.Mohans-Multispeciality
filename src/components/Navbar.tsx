import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import { SPECIALITIES } from '../data/specialities';

export interface AppRoute {
  page: 'home' | 'specialities' | 'speciality' | 'doctors' | 'centres' | 'research';
  slug?: string;
}

interface NavbarProps {
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
  onOpenBooking: (prefill?: { specialitySlug?: string }) => void;
}

export function Navbar({ currentRoute, onNavigate, onOpenBooking }: NavbarProps) {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMegaOpen(false);
        setMobileOpen(false);
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navigateAndClose = (route: AppRoute) => {
    setMegaOpen(false);
    setMobileOpen(false);
    onNavigate(route);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#172B45]/10">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between gap-8">
        {/* Zone 1: Single clean text wordmark */}
        <a
          href="#/"
          onClick={(e) => {
            e.preventDefault();
            navigateAndClose({ page: 'home' });
          }}
          className="font-display text-[20px] font-bold tracking-tight text-[#174A80] whitespace-nowrap shrink-0 hover:text-[#3C76C1] transition-colors"
        >
          Dr. Mohan&apos;s
        </a>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-8 text-[14px] font-semibold text-[#172B45]"
        >
          <div
            ref={megaRef}
            className="relative"
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <button
              type="button"
              aria-expanded={megaOpen}
              aria-haspopup="true"
              onClick={() => setMegaOpen((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 py-2 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                currentRoute.page === 'specialities' || currentRoute.page === 'speciality'
                  ? 'text-[#3C76C1]'
                  : 'text-[#172B45] hover:text-[#3C76C1]'
              }`}
            >
              <span>Specialities</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  megaOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            <AnimatePresence>
              {megaOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[780px] z-50"
                >
                  <div className="bg-white border border-[#172B45]/12 rounded-xl shadow-[0_24px_48px_-12px_rgba(23,43,69,0.14)] p-6">
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#172B45]/10">
                      <div>
                        <p className="font-display text-sm font-bold text-[#172B45]">
                          Multispeciality Clinical Departments
                        </p>
                        <p className="text-xs text-[#64748B] mt-0.5">
                          Coordinated medical, surgical, and diagnostic care across 12 specialities
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => navigateAndClose({ page: 'specialities' })}
                        className="text-xs font-semibold text-[#3C76C1] hover:text-[#174A80] whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        View all 12 specialities →
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-x-6 gap-y-2">
                      {SPECIALITIES.map((spec) => (
                        <button
                          key={spec.slug}
                          type="button"
                          onClick={() =>
                            navigateAndClose({ page: 'speciality', slug: spec.slug })
                          }
                          className="text-left px-3 py-2 rounded-lg hover:bg-[#EAF3FC]/70 transition-colors group cursor-pointer"
                        >
                          <span className="block text-[13px] font-semibold text-[#172B45] group-hover:text-[#174A80]">
                            {spec.shortName}
                          </span>
                          <span className="block text-[11px] text-[#64748B] truncate mt-0.5">
                            {spec.category}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={() => navigateAndClose({ page: 'doctors' })}
            className={`py-2 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              currentRoute.page === 'doctors'
                ? 'text-[#3C76C1]'
                : 'text-[#172B45] hover:text-[#3C76C1]'
            }`}
          >
            Doctors
          </button>

          <button
            type="button"
            onClick={() => navigateAndClose({ page: 'centres' })}
            className={`py-2 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              currentRoute.page === 'centres'
                ? 'text-[#3C76C1]'
                : 'text-[#172B45] hover:text-[#3C76C1]'
            }`}
          >
            Centres
          </button>

          <button
            type="button"
            onClick={() => navigateAndClose({ page: 'research' })}
            className={`py-2 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              currentRoute.page === 'research'
                ? 'text-[#3C76C1]'
                : 'text-[#172B45] hover:text-[#3C76C1]'
            }`}
          >
            Research
          </button>

          <a
            href="#insights"
            onClick={(e) => {
              e.preventDefault();
              if (currentRoute.page !== 'home') {
                navigateAndClose({ page: 'home' });
                setTimeout(() => {
                  document.getElementById('insights')?.scrollIntoView({ behavior: 'smooth' });
                }, 80);
              } else {
                document.getElementById('insights')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="py-2 whitespace-nowrap shrink-0 text-[#172B45] hover:text-[#3C76C1] transition-colors"
          >
            Insights
          </a>
        </nav>

        {/* Zone 3: Single primary action on desktop + mobile toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onOpenBooking()}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-[13px] font-semibold text-white bg-[#174A80] hover:bg-[#3C76C1] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Book Appointment
          </button>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#172B45]/15 text-[#172B45] hover:bg-[#F7F9FC] transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Animated Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-white border-b border-[#172B45]/10 px-5 py-5 max-h-[82vh] overflow-y-auto"
          >
            <nav aria-label="Mobile navigation" className="space-y-1">
              <button
                type="button"
                onClick={() => navigateAndClose({ page: 'specialities' })}
                className="w-full text-left px-3 py-3 text-base font-semibold text-[#172B45] rounded-lg hover:bg-[#EAF3FC]/60"
              >
                All 12 Specialities
              </button>
              <button
                type="button"
                onClick={() => navigateAndClose({ page: 'doctors' })}
                className="w-full text-left px-3 py-3 text-base font-semibold text-[#172B45] rounded-lg hover:bg-[#EAF3FC]/60"
              >
                Find a Specialist Doctor
              </button>
              <button
                type="button"
                onClick={() => navigateAndClose({ page: 'centres' })}
                className="w-full text-left px-3 py-3 text-base font-semibold text-[#172B45] rounded-lg hover:bg-[#EAF3FC]/60"
              >
                Find a Centre (50+ Locations)
              </button>
              <button
                type="button"
                onClick={() => navigateAndClose({ page: 'research' })}
                className="w-full text-left px-3 py-3 text-base font-semibold text-[#172B45] rounded-lg hover:bg-[#EAF3FC]/60"
              >
                Research &amp; Innovation (MDRF)
              </button>
            </nav>

            <div className="mt-4 pt-4 border-t border-[#172B45]/10">
              <p className="text-xs font-semibold text-[#64748B] px-3 mb-2">
                Featured Departments
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {SPECIALITIES.slice(0, 8).map((spec) => (
                  <button
                    key={spec.slug}
                    type="button"
                    onClick={() => navigateAndClose({ page: 'speciality', slug: spec.slug })}
                    className="text-left px-3 py-2 text-xs font-medium text-[#172B45] bg-[#F7F9FC] rounded-md hover:bg-[#EAF3FC]"
                  >
                    {spec.shortName}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-[#172B45]/10 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 px-4 text-sm font-semibold text-white bg-[#174A80] rounded-lg"
              >
                Book Appointment
              </button>
              <a
                href="tel:+914443968888"
                className="w-full py-2.5 px-4 text-sm font-semibold text-[#174A80] bg-[#EAF3FC] rounded-lg inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span>Call Helpline: 044-43968888</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

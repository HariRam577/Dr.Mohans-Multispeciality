import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Activity,
  Award,
  BookOpen,
  Building2,
  Calendar,
  ChevronDown,
  Dumbbell,
  FileHeart,
  Globe,
  GraduationCap,
  HeartHandshake,
  Home,
  Hospital,
  MapPin,
  Menu,
  Moon,
  PackageCheck,
  Phone,
  Scale,
  ShieldCheck,
  Smile,
  Stethoscope,
  Users,
  X,
} from 'lucide-react';
import { STATE_DIRECTORY_MENU } from '../data/drmohansMenus';
import { SPECIALITIES } from '../data/specialities';
import { BrandCrestIcon, SpecialityIconBadge } from './ClinicalIcons';

export interface AppRoute {
  page:
    | 'home'
    | 'specialities'
    | 'speciality'
    | 'doctors'
    | 'centres'
    | 'services'
    | 'education'
    | 'about';
  slug?: string;
  stateFilter?: string;
  section?: string;
}

interface NavbarProps {
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
  onOpenBooking: (prefill?: { specialitySlug?: string }) => void;
}

type DesktopMenuKey = 'specialities' | 'centres' | 'education' | 'about' | null;

const PATIENT_CARE_SHORTCUTS = [
  { label: 'Health Packages', section: 'health-packages', icon: PackageCheck },
  { label: 'Home Care & Phlebotomy', section: 'home-care', icon: Home },
  { label: 'IP Facility & Surgeries', section: 'ip-facility', icon: Hospital },
  { label: 'Weight & Obesity Care', section: 'weight-obesity', icon: Scale },
  { label: 'Physiotherapy & Fitness', section: 'physiotherapy-fitness', icon: Dumbbell },
  { label: 'Sleep & Circadian Health', section: 'sleep-health', icon: Moon },
  { label: 'Stress Management', section: 'stress-management', icon: Smile },
  { label: 'Gestational, Ortho & Dental', section: 'orthopedic-dental', icon: Activity },
];

export function Navbar({ currentRoute, onNavigate, onOpenBooking }: NavbarProps) {
  const [openMenu, setOpenMenu] = useState<DesktopMenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<DesktopMenuKey>('specialities');
  const navRef = useRef<HTMLDivElement | null>(null);
  const openedByHoverRef = useRef<DesktopMenuKey>(null);

  const handleMenuMouseEnter = (key: Exclude<DesktopMenuKey, null>) => {
    if (openMenu !== key) {
      openedByHoverRef.current = key;
      setOpenMenu(key);
    }
  };

  const handleMenuClick = (key: Exclude<DesktopMenuKey, null>) => {
    if (openedByHoverRef.current === key) {
      openedByHoverRef.current = null;
      setOpenMenu(key);
    } else {
      openedByHoverRef.current = null;
      setOpenMenu((prev) => (prev === key ? null : key));
    }
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
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
    openedByHoverRef.current = null;
    setOpenMenu(null);
    setMobileOpen(false);
    onNavigate(route);
  };

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-40 bg-white/98 text-[#172B43] border-b border-[#DCE7F1] shadow-[0_4px_20px_-8px_rgba(16,42,94,0.12)]"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between gap-8">
        {/* Zone 1: Brand mark */}
        <a
          href="#/"
          onClick={(e) => {
            e.preventDefault();
            navigateAndClose({ page: 'home' });
          }}
          className="font-display text-[20px] font-bold tracking-tight text-[#102A5E] whitespace-nowrap shrink-0 hover:text-[#1769AA] transition-colors inline-flex items-center gap-2.5"
        >
          <BrandCrestIcon className="w-8 h-8 shrink-0" />
          <span>Dr. Mohan&apos;s</span>
        </a>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-7 text-[14px] font-semibold text-[#172B43]"
        >
          {/* 1. Specialities & Patient Care */}
          <div
            className="relative"
            onMouseEnter={() => handleMenuMouseEnter('specialities')}
            onMouseLeave={() => {
              openedByHoverRef.current = null;
              setOpenMenu(null);
            }}
          >
            <button
              type="button"
              aria-expanded={openMenu === 'specialities'}
              aria-haspopup="true"
              onClick={() => handleMenuClick('specialities')}
              className={`inline-flex items-center gap-1.5 py-2 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                currentRoute.page === 'specialities' ||
                currentRoute.page === 'speciality' ||
                currentRoute.page === 'services'
                  ? 'text-[#1769AA] underline decoration-[#19B6C9] decoration-2 underline-offset-8'
                  : 'text-[#172B43] hover:text-[#1769AA]'
              }`}
            >
              <span>Specialities</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  openMenu === 'specialities' ? 'rotate-180 text-[#1769AA]' : 'text-[#64748B]'
                }`}
                aria-hidden="true"
              />
            </button>

            <AnimatePresence>
              {openMenu === 'specialities' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[880px] z-50"
                >
                  <div className="bg-white text-[#172B43] border border-[#DCE7F1] rounded-2xl shadow-[0_24px_48px_-12px_rgba(16,42,94,0.18)] p-6">
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#DCE7F1]">
                      <div>
                        <p className="font-display text-sm font-bold text-[#102A5E]">
                          Patient Care, Specialities &amp; Clinical Services
                        </p>
                        <p className="text-xs text-[#64748B] mt-0.5">
                          12 specialist departments plus preventive health packages, surgeries &amp;
                          home care
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => navigateAndClose({ page: 'specialities' })}
                        className="text-xs font-semibold text-white bg-[#1769AA] hover:bg-[#102A5E] px-3.5 py-2 rounded-xl whitespace-nowrap shrink-0 cursor-pointer transition-colors"
                      >
                        All 12 Departments →
                      </button>
                    </div>

                    <div className="grid grid-cols-12 gap-6">
                      <div className="col-span-8 grid grid-cols-2 gap-2">
                        {SPECIALITIES.map((spec) => (
                          <button
                            key={spec.slug}
                            type="button"
                            onClick={() =>
                              navigateAndClose({ page: 'speciality', slug: spec.slug })
                            }
                            className="text-left px-3 py-2 rounded-xl bg-[#F7FAFD] hover:bg-[#EAF5FC] border border-[#DCE7F1] hover:border-[#19B6C9] transition-colors flex items-center gap-2.5 group cursor-pointer"
                          >
                            <SpecialityIconBadge slug={spec.slug} tone="ice" size="sm" />
                            <div className="min-w-0">
                              <span className="block text-[13px] font-semibold text-[#172B43] group-hover:text-[#1769AA] truncate">
                                {spec.shortName}
                              </span>
                              <span className="block text-[11px] text-[#64748B] truncate">
                                {spec.category}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>

                      <div className="col-span-4 bg-[#EAF5FC]/70 border border-[#DCE7F1] rounded-xl p-3.5 space-y-1.5">
                        <p className="text-[11px] font-bold text-[#102A5E] px-2 pb-1.5 border-b border-[#DCE7F1]">
                          Additional Patient Services
                        </p>
                        {PATIENT_CARE_SHORTCUTS.map((item) => {
                          const Icon = item.icon;
                          return (
                            <button
                              key={item.section}
                              type="button"
                              onClick={() =>
                                navigateAndClose({ page: 'services', section: item.section })
                              }
                              className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-white text-xs font-medium text-[#172B43] hover:text-[#1769AA] flex items-center gap-2 transition-colors cursor-pointer"
                            >
                              <Icon
                                className="w-3.5 h-3.5 text-[#1769AA] shrink-0"
                                aria-hidden="true"
                              />
                              <span className="truncate">{item.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 2. Centres across 8 States */}
          <div
            className="relative"
            onMouseEnter={() => handleMenuMouseEnter('centres')}
            onMouseLeave={() => {
              openedByHoverRef.current = null;
              setOpenMenu(null);
            }}
          >
            <button
              type="button"
              aria-expanded={openMenu === 'centres'}
              aria-haspopup="true"
              onClick={() => handleMenuClick('centres')}
              className={`inline-flex items-center gap-1.5 py-2 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                currentRoute.page === 'centres'
                  ? 'text-[#1769AA] underline decoration-[#19B6C9] decoration-2 underline-offset-8'
                  : 'text-[#172B43] hover:text-[#1769AA]'
              }`}
            >
              <span>Centres</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  openMenu === 'centres' ? 'rotate-180 text-[#1769AA]' : 'text-[#64748B]'
                }`}
                aria-hidden="true"
              />
            </button>

            <AnimatePresence>
              {openMenu === 'centres' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[660px] z-50"
                >
                  <div className="bg-white text-[#172B43] border border-[#DCE7F1] rounded-2xl shadow-[0_24px_48px_-12px_rgba(16,42,94,0.18)] p-5">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#DCE7F1]">
                      <p className="font-display text-sm font-bold text-[#102A5E]">
                        50+ Accredited Centres Across 8 States &amp; UTs
                      </p>
                      <button
                        type="button"
                        onClick={() => navigateAndClose({ page: 'centres', stateFilter: 'all' })}
                        className="text-xs font-semibold text-white bg-[#1769AA] hover:bg-[#102A5E] px-3 py-1.5 rounded-xl cursor-pointer transition-colors"
                      >
                        All Locations →
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      {STATE_DIRECTORY_MENU.map((st) => (
                        <button
                          key={st.state}
                          type="button"
                          onClick={() =>
                            navigateAndClose({ page: 'centres', stateFilter: st.state })
                          }
                          className="text-left p-3 rounded-xl bg-[#F7FAFD] hover:bg-[#EAF5FC] border border-[#DCE7F1] hover:border-[#19B6C9] flex items-start gap-2.5 transition-colors cursor-pointer"
                        >
                          <Building2
                            className="w-4 h-4 text-[#1769AA] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <div className="min-w-0">
                            <span className="block text-[13px] font-semibold text-[#102A5E]">
                              {st.state}
                            </span>
                            <span className="block text-[11px] text-[#64748B] truncate mt-0.5">
                              {st.flagship}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 3. Find Doctor */}
          <button
            type="button"
            onClick={() => navigateAndClose({ page: 'doctors' })}
            className={`inline-flex items-center gap-1.5 py-2 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              currentRoute.page === 'doctors'
                ? 'text-[#1769AA] underline decoration-[#19B6C9] decoration-2 underline-offset-8'
                : 'text-[#172B43] hover:text-[#1769AA]'
            }`}
          >
            <span>Doctors</span>
          </button>

          {/* 4. Education & Blog */}
          <div
            className="relative"
            onMouseEnter={() => handleMenuMouseEnter('education')}
            onMouseLeave={() => {
              openedByHoverRef.current = null;
              setOpenMenu(null);
            }}
          >
            <button
              type="button"
              aria-expanded={openMenu === 'education'}
              aria-haspopup="true"
              onClick={() => handleMenuClick('education')}
              className={`inline-flex items-center gap-1.5 py-2 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                currentRoute.page === 'education'
                  ? 'text-[#1769AA] underline decoration-[#19B6C9] decoration-2 underline-offset-8'
                  : 'text-[#172B43] hover:text-[#1769AA]'
              }`}
            >
              <span>Education</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  openMenu === 'education' ? 'rotate-180 text-[#1769AA]' : 'text-[#64748B]'
                }`}
                aria-hidden="true"
              />
            </button>

            <AnimatePresence>
              {openMenu === 'education' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[360px] z-50"
                >
                  <div className="bg-white text-[#172B43] border border-[#DCE7F1] rounded-2xl shadow-[0_24px_48px_-12px_rgba(16,42,94,0.18)] p-3 space-y-1">
                    <button
                      type="button"
                      onClick={() => navigateAndClose({ page: 'education', section: 'courses' })}
                      className="w-full text-left p-3 rounded-xl hover:bg-[#EAF5FC] flex items-start gap-3 transition-colors cursor-pointer"
                    >
                      <GraduationCap className="w-4 h-4 text-[#1769AA] shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-[13px] font-semibold text-[#102A5E]">
                          Clinical Education Academy
                        </span>
                        <span className="block text-[11px] text-[#64748B]">
                          Courses for physicians, nurses &amp; dietitians
                        </span>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateAndClose({ page: 'education', section: 'articles' })}
                      className="w-full text-left p-3 rounded-xl hover:bg-[#EAF5FC] flex items-start gap-3 transition-colors cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-[#1769AA] shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-[13px] font-semibold text-[#102A5E]">
                          Patient Blog &amp; Medical Insights
                        </span>
                        <span className="block text-[11px] text-[#64748B]">
                          Clinician-reviewed prevention &amp; health articles
                        </span>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateAndClose({ page: 'education', section: 'screening' })}
                      className="w-full text-left p-3 rounded-xl hover:bg-[#EAF5FC] flex items-start gap-3 transition-colors cursor-pointer"
                    >
                      <FileHeart className="w-4 h-4 text-[#1769AA] shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-[13px] font-semibold text-[#102A5E]">
                          Annual Screening &amp; Risk Checklist
                        </span>
                        <span className="block text-[11px] text-[#64748B]">
                          Heart, kidney, eye, nerve &amp; glycemic targets
                        </span>
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 5. About Us */}
          <div
            className="relative"
            onMouseEnter={() => handleMenuMouseEnter('about')}
            onMouseLeave={() => {
              openedByHoverRef.current = null;
              setOpenMenu(null);
            }}
          >
            <button
              type="button"
              aria-expanded={openMenu === 'about'}
              aria-haspopup="true"
              onClick={() => handleMenuClick('about')}
              className={`inline-flex items-center gap-1.5 py-2 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                currentRoute.page === 'about'
                  ? 'text-[#1769AA] underline decoration-[#19B6C9] decoration-2 underline-offset-8'
                  : 'text-[#172B43] hover:text-[#1769AA]'
              }`}
            >
              <span>About Us</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  openMenu === 'about' ? 'rotate-180 text-[#1769AA]' : 'text-[#64748B]'
                }`}
                aria-hidden="true"
              />
            </button>

            <AnimatePresence>
              {openMenu === 'about' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-0 top-full pt-2 w-[380px] z-50"
                >
                  <div className="bg-white text-[#172B43] border border-[#DCE7F1] rounded-2xl shadow-[0_24px_48px_-12px_rgba(16,42,94,0.18)] p-3 space-y-1">
                    {[
                      {
                        label: 'Vision & Mission',
                        desc: 'Our commitment to accessible clinical excellence',
                        section: 'vision',
                        icon: Award,
                      },
                      {
                        label: 'Board of Directors & Leadership',
                        desc: 'Meet Dr. V. Mohan & senior medical leadership',
                        section: 'directors',
                        icon: Users,
                      },
                      {
                        label: 'Growth Story & Homage (Since 1991)',
                        desc: 'Three decades of clinical service across India',
                        section: 'story',
                        icon: Building2,
                      },
                      {
                        label: 'Charity & Community Care',
                        desc: 'Rural outreach & subsidized patient support',
                        section: 'charity',
                        icon: HeartHandshake,
                      },
                      {
                        label: 'International Patients',
                        desc: 'Dedicated care coordination for global visitors',
                        section: 'international',
                        icon: Globe,
                      },
                      {
                        label: 'Contact & 24/7 Helpline Desk',
                        desc: 'Head office, email & patient coordination',
                        section: 'contact',
                        icon: Phone,
                      },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.section}
                          type="button"
                          onClick={() => navigateAndClose({ page: 'about', section: item.section })}
                          className="w-full text-left p-2.5 rounded-xl hover:bg-[#EAF5FC] flex items-start gap-3 transition-colors cursor-pointer"
                        >
                          <Icon className="w-4 h-4 text-[#1769AA] shrink-0 mt-0.5" />
                          <div>
                            <span className="block text-[13px] font-semibold text-[#102A5E]">
                              {item.label}
                            </span>
                            <span className="block text-[11px] text-[#64748B]">{item.desc}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Zone 3: Primary CTA + Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onOpenBooking()}
            className="hidden sm:inline-flex items-center justify-center gap-2 px-5 py-2.5 text-[13px] font-bold text-white bg-[#1769AA] hover:bg-[#102A5E] rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-[0_6px_18px_-6px_rgba(23,105,170,0.45)] active:scale-[0.98]"
          >
            <Calendar className="w-4 h-4 text-[#19B6C9]" aria-hidden="true" />
            <span>Book Appointment</span>
          </button>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl border border-[#DCE7F1] bg-[#F7FAFD] text-[#102A5E] hover:bg-[#EAF5FC] transition-colors cursor-pointer"
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
            className="lg:hidden bg-white text-[#172B43] border-b border-[#DCE7F1] shadow-xl px-5 py-5 max-h-[82vh] overflow-y-auto"
          >
            <nav aria-label="Mobile navigation" className="space-y-2">
              <div>
                <button
                  type="button"
                  onClick={() =>
                    setMobileAccordion((prev) =>
                      prev === 'specialities' ? null : 'specialities'
                    )
                  }
                  className="w-full flex items-center justify-between px-3.5 py-3 text-base font-semibold text-[#102A5E] rounded-xl bg-[#EAF5FC]"
                >
                  <span className="inline-flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-[#1769AA]" />
                    <span>Specialities &amp; Patient Care</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#1769AA] transition-transform ${
                      mobileAccordion === 'specialities' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {mobileAccordion === 'specialities' && (
                  <div className="mt-2 grid grid-cols-2 gap-1.5 pl-1">
                    <button
                      type="button"
                      onClick={() => navigateAndClose({ page: 'specialities' })}
                      className="col-span-2 text-left px-3 py-2 text-xs font-bold text-white bg-[#1769AA] rounded-xl"
                    >
                      View All 12 Specialities →
                    </button>
                    {SPECIALITIES.map((spec) => (
                      <button
                        key={spec.slug}
                        type="button"
                        onClick={() => navigateAndClose({ page: 'speciality', slug: spec.slug })}
                        className="text-left px-3 py-2 text-xs font-medium text-[#172B43] bg-[#F7FAFD] border border-[#DCE7F1] rounded-xl hover:bg-[#EAF5FC]"
                      >
                        {spec.shortName}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => navigateAndClose({ page: 'services' })}
                      className="col-span-2 text-left px-3 py-2 text-xs font-semibold text-[#1769AA] bg-[#EAF5FC] border border-[#DCE7F1] rounded-xl"
                    >
                      Health Packages, Home Care &amp; Surgeries →
                    </button>
                  </div>
                )}
              </div>

              <div>
                <button
                  type="button"
                  onClick={() =>
                    setMobileAccordion((prev) => (prev === 'centres' ? null : 'centres'))
                  }
                  className="w-full flex items-center justify-between px-3.5 py-3 text-base font-semibold text-[#102A5E] rounded-xl bg-[#EAF5FC]"
                >
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#1769AA]" />
                    <span>Centres (50+ Locations)</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#1769AA] transition-transform ${
                      mobileAccordion === 'centres' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {mobileAccordion === 'centres' && (
                  <div className="mt-2 grid grid-cols-2 gap-1.5 pl-1">
                    {STATE_DIRECTORY_MENU.map((st) => (
                      <button
                        key={st.state}
                        type="button"
                        onClick={() =>
                          navigateAndClose({ page: 'centres', stateFilter: st.state })
                        }
                        className="text-left px-3 py-2 text-xs font-medium text-[#172B43] bg-[#F7FAFD] border border-[#DCE7F1] rounded-xl"
                      >
                        {st.state}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => navigateAndClose({ page: 'doctors' })}
                className="w-full text-left px-3.5 py-3 text-base font-semibold text-[#102A5E] rounded-xl bg-[#F7FAFD] border border-[#DCE7F1] inline-flex items-center gap-2"
              >
                <Users className="w-4 h-4 text-[#1769AA]" />
                <span>Find a Specialist Doctor</span>
              </button>

              <button
                type="button"
                onClick={() => navigateAndClose({ page: 'education' })}
                className="w-full text-left px-3.5 py-3 text-base font-semibold text-[#102A5E] rounded-xl bg-[#F7FAFD] border border-[#DCE7F1] inline-flex items-center gap-2"
              >
                <GraduationCap className="w-4 h-4 text-[#1769AA]" />
                <span>Education &amp; Health Blog</span>
              </button>

              <button
                type="button"
                onClick={() => navigateAndClose({ page: 'about' })}
                className="w-full text-left px-3.5 py-3 text-base font-semibold text-[#102A5E] rounded-xl bg-[#F7FAFD] border border-[#DCE7F1] inline-flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-[#1769AA]" />
                <span>About Us, Leadership &amp; Contact</span>
              </button>
            </nav>

            <div className="mt-5 pt-4 border-t border-[#DCE7F1] flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 px-4 text-sm font-bold text-white bg-[#1769AA] hover:bg-[#102A5E] rounded-xl inline-flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#19B6C9]" />
                <span>Book Appointment</span>
              </button>
              <a
                href="tel:+914443968888"
                className="w-full py-2.5 px-4 text-sm font-semibold text-[#102A5E] bg-[#EAF5FC] border border-[#DCE7F1] rounded-xl inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#1769AA]" aria-hidden="true" />
                <span>Call Helpline: 044-43968888</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

import {
  Activity,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Dumbbell,
  Home,
  Hospital,
  Moon,
  PackageCheck,
  Phone,
  Scale,
  Smile,
} from 'lucide-react';
import type { BookingPrefill } from '../components/AppointmentDrawer';
import type { AppRoute } from '../components/Navbar';
import { PATIENT_CARE_PROGRAMS } from '../data/drmohansMenus';

interface ServicesPageProps {
  onNavigate: (route: AppRoute) => void;
  onOpenBooking: (prefill?: BookingPrefill) => void;
}

const ICON_BY_PROGRAM: Record<string, typeof PackageCheck> = {
  'health-packages': PackageCheck,
  'home-care': Home,
  'ip-facility': Hospital,
  'weight-obesity': Scale,
  'physiotherapy-fitness': Dumbbell,
  'sleep-health': Moon,
  'stress-management': Smile,
  'orthopedic-dental': Activity,
};

export function ServicesPage({ onNavigate, onOpenBooking }: ServicesPageProps) {
  return (
    <div className="bg-[#F7FAFD]">
      {/* Header Banner */}
      <section className="hero-animated-mesh text-white border-b border-[#19B6C9]/25 py-14 lg:py-20">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 space-y-5">
          <p className="inline-flex items-center gap-2 text-xs font-bold text-[#19B6C9]">
            <PackageCheck className="w-4 h-4 text-[#19B6C9]" aria-hidden="true" />
            <span>Patient Care &amp; Specialized Programs</span>
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-white max-w-3xl [text-wrap:balance]">
            Health Packages, Inpatient Care, Home Visits &amp; Rehabilitation
          </h1>
          <p className="text-base text-[#EAF5FC]/85 leading-relaxed max-w-2xl">
            Extending our 12 clinical departments with preventive screening packages, surgical
            inpatient wings, physiotherapy, weight optimization, sleep health, and doorstep lab
            collection.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={() => onOpenBooking()}
              className="px-6 py-3 text-sm font-bold text-[#102A5E] bg-[#19B6C9] hover:bg-white rounded-xl inline-flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Calendar className="w-4 h-4 text-[#102A5E]" aria-hidden="true" />
              <span>Book Package or Service</span>
            </button>
            <a
              href="tel:+914443968888"
              className="px-5 py-3 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 rounded-xl inline-flex items-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#19B6C9]" aria-hidden="true" />
              <span>Call 044-43968888</span>
            </a>
          </div>
        </div>
      </section>

      {/* Program Grid */}
      <section className="bg-[#EAF5FC] py-14 lg:py-20">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {PATIENT_CARE_PROGRAMS.map((prog, index) => {
              const Icon = ICON_BY_PROGRAM[prog.id] ?? PackageCheck;
              const isNavy = index % 2 === 0;
              return (
                <article
                  id={prog.id}
                  key={prog.id}
                  className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-6 border transition-all ${
                    isNavy
                      ? 'bg-[#102A5E] text-white border-[#1769AA] hover:border-[#19B6C9]'
                      : 'bg-white text-[#172B43] border-[#DCE7F1] hover:border-[#19B6C9]'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-start gap-3.5">
                      <span
                        className={`w-11 h-11 rounded-xl inline-flex items-center justify-center shrink-0 ${
                          isNavy
                            ? 'bg-[#19B6C9]/20 text-[#19B6C9] border border-[#19B6C9]/35'
                            : 'bg-[#EAF5FC] text-[#1769AA] border border-[#DCE7F1]'
                        }`}
                        aria-hidden="true"
                      >
                        <Icon className="w-5 h-5" />
                      </span>
                      <div>
                        <p
                          className={`text-xs font-bold ${
                            isNavy ? 'text-[#19B6C9]' : 'text-[#1769AA]'
                          }`}
                        >
                          {prog.subtitle}
                        </p>
                        <h2
                          className={`font-display text-xl sm:text-2xl font-bold mt-0.5 ${
                            isNavy ? 'text-white' : 'text-[#102A5E]'
                          }`}
                        >
                          {prog.title}
                        </h2>
                      </div>
                    </div>

                    <p
                      className={`text-sm leading-relaxed ${
                        isNavy ? 'text-[#EAF5FC]/85' : 'text-[#64748B]'
                      }`}
                    >
                      {prog.description}
                    </p>

                    <ul className="space-y-2 pt-1">
                      {prog.highlights.map((h) => (
                        <li
                          key={h}
                          className={`flex items-start gap-2 text-xs sm:text-sm ${
                            isNavy ? 'text-[#EAF5FC]/90' : 'text-[#172B43]'
                          }`}
                        >
                          <CheckCircle2
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              isNavy ? 'text-[#19B6C9]' : 'text-[#1769AA]'
                            }`}
                            aria-hidden="true"
                          />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className={`pt-4 border-t flex flex-wrap items-center justify-between gap-3 ${
                      isNavy ? 'border-white/15' : 'border-[#DCE7F1]'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        onNavigate({ page: 'speciality', slug: prog.linkedSpecialitySlug })
                      }
                      className={`inline-flex items-center gap-1.5 text-xs font-bold cursor-pointer ${
                        isNavy
                          ? 'text-[#19B6C9] hover:text-white hover:underline'
                          : 'text-[#1769AA] hover:text-[#102A5E]'
                      }`}
                    >
                      <span>Related Clinical Department</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        onOpenBooking({ specialitySlug: prog.linkedSpecialitySlug })
                      }
                      className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                        isNavy
                          ? 'bg-[#19B6C9] text-[#102A5E] hover:bg-white'
                          : 'bg-[#1769AA] text-white hover:bg-[#102A5E]'
                      }`}
                    >
                      Schedule Service
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

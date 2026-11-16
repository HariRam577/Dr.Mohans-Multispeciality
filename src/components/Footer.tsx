import {
  ArrowUpRight,
  Award,
  BookOpen,
  Building2,
  Calendar,
  Globe,
  GraduationCap,
  HeartHandshake,
  Home,
  MapPin,
  MessageCircle,
  PackageCheck,
  Phone,
  Stethoscope,
  Users,
} from 'lucide-react';
import { SPECIALITIES } from '../data/specialities';
import { BrandCrestIcon } from './ClinicalIcons';
import type { AppRoute } from './Navbar';

interface FooterProps {
  onNavigate: (route: AppRoute) => void;
  onOpenBooking: () => void;
}

export function Footer({ onNavigate, onOpenBooking }: FooterProps) {
  return (
    <footer className="bg-[#102A5E] text-white border-t-4 border-[#19B6C9]">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/15">
          {/* Institutional Identity */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <BrandCrestIcon className="w-10 h-10 shrink-0" />
              <div>
                <h2 className="font-display text-2xl font-bold tracking-tight text-white">
                  Dr. Mohan&apos;s
                </h2>
                <p className="text-xs text-[#19B6C9] font-semibold mt-0.5">
                  Diabetes Specialities Centre &amp; Multispeciality Care
                </p>
              </div>
            </div>
            <p className="text-sm text-white/80 leading-relaxed max-w-sm">
              Established in 1991. An NABH-accredited, IDF Centre of Excellence and WHO
              Collaborating Centre delivering coordinated multispeciality medicine and accredited
              diagnostics across 50+ centres in India.
            </p>
            <div className="space-y-2.5 text-sm text-white/85 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#19B6C9] shrink-0 mt-1" aria-hidden="true" />
                <span>
                  No. 6B, Conran Smith Road, Gopalapuram, Chennai – 600086, Tamil Nadu
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#19B6C9] shrink-0" aria-hidden="true" />
                <a
                  href="tel:+914443968888"
                  className="hover:text-[#19B6C9] hover:underline tabular-nums"
                >
                  044-43968888
                </a>
                <span className="text-[#19B6C9]" aria-hidden="true">
                  ·
                </span>
                <a
                  href="tel:+914428359048"
                  className="hover:text-[#19B6C9] hover:underline tabular-nums"
                >
                  044-28359048
                </a>
              </div>
            </div>
          </div>

          {/* Specialities Columns */}
          <div className="lg:col-span-4">
            <h3 className="font-display text-sm font-bold text-[#19B6C9] mb-4 inline-flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-[#19B6C9]" aria-hidden="true" />
              <span>Clinical Specialities</span>
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {SPECIALITIES.map((spec) => (
                <button
                  key={spec.slug}
                  type="button"
                  onClick={() => onNavigate({ page: 'speciality', slug: spec.slug })}
                  className="text-left text-xs sm:text-sm text-white/80 hover:text-[#19B6C9] transition-colors cursor-pointer truncate"
                >
                  {spec.shortName}
                </button>
              ))}
            </div>
          </div>

          {/* Patient Care, Institution & Access */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-display text-sm font-bold text-[#19B6C9] mb-4 inline-flex items-center gap-2">
                <PackageCheck className="w-4 h-4 text-[#19B6C9]" aria-hidden="true" />
                <span>Patient Care &amp; Services</span>
              </h3>
              <ul className="space-y-2.5 text-sm text-white/80">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate({ page: 'services', section: 'health-packages' })}
                    className="inline-flex items-center gap-2 hover:text-[#19B6C9] transition-colors cursor-pointer"
                  >
                    <PackageCheck className="w-3.5 h-3.5 text-[#19B6C9]" aria-hidden="true" />
                    <span>Health Packages</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate({ page: 'services', section: 'home-care' })}
                    className="inline-flex items-center gap-2 hover:text-[#19B6C9] transition-colors cursor-pointer"
                  >
                    <Home className="w-3.5 h-3.5 text-[#19B6C9]" aria-hidden="true" />
                    <span>Home Care &amp; Lab</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate({ page: 'doctors' })}
                    className="inline-flex items-center gap-2 hover:text-[#19B6C9] transition-colors cursor-pointer"
                  >
                    <Users className="w-3.5 h-3.5 text-[#19B6C9]" aria-hidden="true" />
                    <span>Find a Specialist</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate({ page: 'centres' })}
                    className="inline-flex items-center gap-2 hover:text-[#19B6C9] transition-colors cursor-pointer"
                  >
                    <Building2 className="w-3.5 h-3.5 text-[#19B6C9]" aria-hidden="true" />
                    <span>50+ Hospital Centres</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="inline-flex items-center gap-2 hover:text-[#19B6C9] transition-colors cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#19B6C9]" aria-hidden="true" />
                    <span>Book Appointment</span>
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-display text-sm font-bold text-[#19B6C9] inline-flex items-center gap-2">
                <Award className="w-4 h-4 text-[#19B6C9]" aria-hidden="true" />
                <span>Institution</span>
              </h3>
              <ul className="space-y-2.5 text-sm text-white/80">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate({ page: 'about', section: 'directors' })}
                    className="inline-flex items-center gap-2 hover:text-[#19B6C9] transition-colors cursor-pointer"
                  >
                    <Users className="w-3.5 h-3.5 text-[#19B6C9]" aria-hidden="true" />
                    <span>About &amp; Directors</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate({ page: 'education', section: 'courses' })}
                    className="inline-flex items-center gap-2 hover:text-[#19B6C9] transition-colors cursor-pointer"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-[#19B6C9]" aria-hidden="true" />
                    <span>Education Academy</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate({ page: 'education', section: 'articles' })}
                    className="inline-flex items-center gap-2 hover:text-[#19B6C9] transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#19B6C9]" aria-hidden="true" />
                    <span>Health Insights Blog</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate({ page: 'about', section: 'charity' })}
                    className="inline-flex items-center gap-2 hover:text-[#19B6C9] transition-colors cursor-pointer"
                  >
                    <HeartHandshake className="w-3.5 h-3.5 text-[#19B6C9]" aria-hidden="true" />
                    <span>Charity &amp; Outreach</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate({ page: 'about', section: 'international' })}
                    className="inline-flex items-center gap-2 hover:text-[#19B6C9] transition-colors cursor-pointer"
                  >
                    <Globe className="w-3.5 h-3.5 text-[#19B6C9]" aria-hidden="true" />
                    <span>International Patients</span>
                  </button>
                </li>
              </ul>

              <a
                href="https://wa.me/919384848888?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20an%20appointment%20at%20Dr.%20Mohan%27s."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#19B6C9] hover:bg-[#1769AA] text-xs font-bold text-[#102A5E] hover:text-white transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>WhatsApp Care Desk</span>
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/65">
          <p>
            © {new Date().getFullYear()} Dr. Mohan&apos;s Diabetes Specialities Centre. All
            rights reserved.
          </p>
          <p>
            Clinical information is intended for patient education and does not substitute for
            in-person medical evaluation.
          </p>
        </div>
      </div>
    </footer>
  );
}

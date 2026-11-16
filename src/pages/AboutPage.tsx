import {
  Award,
  Building2,
  Calendar,
  Globe,
  HeartHandshake,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Users,
} from 'lucide-react';
import type { BookingPrefill } from '../components/AppointmentDrawer';
import type { AppRoute } from '../components/Navbar';
import { LEADERSHIP_DIRECTORS } from '../data/drmohansMenus';
import { INSTITUTIONAL_STATS } from '../data/insights';

interface AboutPageProps {
  onNavigate: (route: AppRoute) => void;
  onOpenBooking: (prefill?: BookingPrefill) => void;
}

export function AboutPage({ onNavigate, onOpenBooking }: AboutPageProps) {
  return (
    <div className="bg-[#F7FAFD]">
      {/* Hero Banner */}
      <section className="hero-animated-mesh text-white border-b border-[#19B6C9]/25 py-14 lg:py-20">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 space-y-5">
          <p className="inline-flex items-center gap-2 text-xs font-bold text-[#19B6C9]">
            <ShieldCheck className="w-4 h-4 text-[#19B6C9]" aria-hidden="true" />
            <span>About Dr. Mohan&apos;s Healthcare Network · Since 1991</span>
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-white max-w-3xl [text-wrap:balance]">
            Three Decades of Specialist Care, Compassion &amp; Clinical Integrity
          </h1>
          <p className="text-base text-[#EAF5FC]/85 leading-relaxed max-w-2xl">
            From a single specialty clinic founded in Chennai in 1991 to 50+ accredited centres
            across India, our mission unites specialist physicians, evidence-based protocols, and
            patient-friendly healthcare access.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section id="vision" className="bg-white py-14 lg:py-20 border-b border-[#DCE7F1]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#102A5E] text-white border border-[#1769AA] rounded-2xl p-8 space-y-4">
            <span className="w-11 h-11 rounded-xl bg-[#19B6C9]/20 text-[#19B6C9] inline-flex items-center justify-center">
              <Award className="w-5 h-5" aria-hidden="true" />
            </span>
            <h2 className="font-display text-2xl font-bold text-white">Our Vision</h2>
            <p className="text-sm sm:text-base text-[#EAF5FC]/85 leading-relaxed">
              To deliver accessible, internationally benchmarked multispeciality and metabolic
              healthcare that prevents organ complications early and empowers families to live
              longer, healthier lives.
            </p>
          </div>

          <div className="bg-[#F7FAFD] text-[#172B43] border border-[#DCE7F1] rounded-2xl p-8 space-y-4">
            <span className="w-11 h-11 rounded-xl bg-[#EAF5FC] border border-[#DCE7F1] text-[#1769AA] inline-flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" aria-hidden="true" />
            </span>
            <h2 className="font-display text-2xl font-bold text-[#102A5E]">Our Mission</h2>
            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
              Every patient deserves unhurried physician consultations, standardized diagnostics,
              and coordinated care spanning endocrinology, heart health, vision protection, kidney
              preservation, digestive care, and nutrition under one roof.
            </p>
          </div>
        </div>
      </section>

      {/* Directors & Homage */}
      <section id="directors" className="bg-[#EAF5FC] py-14 lg:py-20 border-b border-[#DCE7F1]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 space-y-8">
          <div className="max-w-2xl space-y-2">
            <p className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1769AA]">
              <Users className="w-4 h-4 text-[#19B6C9]" aria-hidden="true" />
              <span>Leadership &amp; Heritage</span>
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#102A5E]">
              Board of Directors &amp; Founding Homage
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LEADERSHIP_DIRECTORS.map((leader) => (
              <div
                key={leader.name}
                className="bg-white border border-[#DCE7F1] hover:border-[#19B6C9] rounded-2xl p-6 space-y-2 transition-colors"
              >
                <p className="text-xs font-bold text-[#1769AA]">{leader.role}</p>
                <h3 className="font-display text-xl font-bold text-[#102A5E]">{leader.name}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">{leader.note}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onNavigate({ page: 'doctors' })}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#1769AA] hover:bg-[#102A5E] rounded-xl cursor-pointer transition-colors"
            >
              Meet Our Complete Medical Faculty →
            </button>
          </div>
        </div>
      </section>

      {/* Growth Story */}
      <section id="story" className="bg-[#102A5E] text-white py-14 lg:py-20 border-y border-[#1769AA]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 space-y-8">
          <div className="max-w-2xl space-y-2">
            <p className="inline-flex items-center gap-1.5 text-xs font-bold text-[#19B6C9]">
              <Building2 className="w-4 h-4 text-[#19B6C9]" aria-hidden="true" />
              <span>Growth Story</span>
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Expanding Multispeciality Excellence Across India
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INSTITUTIONAL_STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 border border-white/15 rounded-2xl p-6 space-y-2"
              >
                <p className="font-display text-3xl font-bold text-[#19B6C9] tabular-nums">
                  {stat.value}
                </p>
                <h3 className="font-display text-base font-bold text-white">{stat.label}</h3>
                <p className="text-xs text-[#EAF5FC]/80 leading-relaxed">{stat.context}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charity & International Patients */}
      <section className="bg-white py-14 lg:py-20 border-b border-[#DCE7F1]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div
            id="charity"
            className="bg-[#F7FAFD] border border-[#DCE7F1] rounded-2xl p-8 space-y-4"
          >
            <span className="w-11 h-11 rounded-xl bg-[#EAF5FC] border border-[#DCE7F1] text-[#1769AA] inline-flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" aria-hidden="true" />
            </span>
            <h2 className="font-display text-2xl font-bold text-[#102A5E]">
              Charity &amp; Community Outreach
            </h2>
            <p className="text-sm text-[#64748B] leading-relaxed">
              Community screening camps, subsidized care for underserved families, and rural mobile
              eye and foot outreach clinics ensure quality medical evaluation reaches beyond urban
              centres.
            </p>
          </div>

          <div
            id="international"
            className="bg-[#102A5E] text-white border border-[#1769AA] rounded-2xl p-8 space-y-4"
          >
            <span className="w-11 h-11 rounded-xl bg-[#19B6C9]/20 text-[#19B6C9] inline-flex items-center justify-center">
              <Globe className="w-5 h-5" aria-hidden="true" />
            </span>
            <h2 className="font-display text-2xl font-bold text-white">
              International Patient Services
            </h2>
            <p className="text-sm text-[#EAF5FC]/85 leading-relaxed">
              Dedicated care coordinators assist visiting international patients with fast-tracked
              comprehensive health checkups, specialist consultations, visa letter support, and
              digital medical report handoffs.
            </p>
            <button
              type="button"
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-[#102A5E] bg-[#19B6C9] hover:bg-white rounded-xl cursor-pointer transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Coordinate International Visit</span>
            </button>
          </div>
        </div>
      </section>

      {/* Contact Desk */}
      <section id="contact" className="bg-[#EAF5FC] py-14 lg:py-16">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <div className="bg-[#102A5E] text-white border border-[#1769AA] rounded-[20px] p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <p className="text-xs font-bold text-[#19B6C9]">Central Patient Care Desk</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Reach Our Head Office &amp; Appointment Helpline
              </h2>
              <p className="text-sm text-[#EAF5FC]/80 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#19B6C9] shrink-0 mt-0.5" aria-hidden="true" />
                <span>No. 6B, Conran Smith Road, Gopalapuram, Chennai – 600086, Tamil Nadu</span>
              </p>
              <p className="text-sm text-[#EAF5FC]/85 flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#19B6C9] shrink-0" aria-hidden="true" />
                <span>appointments@drmohans.com</span>
              </p>
            </div>
            <div className="lg:col-span-5 flex flex-wrap gap-3 lg:justify-end">
              <a
                href="tel:+914443968888"
                className="px-5 py-3 text-sm font-bold text-[#102A5E] bg-[#19B6C9] hover:bg-white rounded-xl inline-flex items-center gap-2 tabular-nums transition-colors"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span>044-43968888</span>
              </a>
              <a
                href="https://wa.me/919384848888?text=Hello%2C%20I%20would%20like%20assistance%20at%20Dr.%20Mohan%27s."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 rounded-xl inline-flex items-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#19B6C9]" aria-hidden="true" />
                <span>WhatsApp 24/7</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

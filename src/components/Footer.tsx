import { ArrowUpRight, MapPin, MessageCircle, Phone } from 'lucide-react';
import { SPECIALITIES } from '../data/specialities';
import type { AppRoute } from './Navbar';

interface FooterProps {
  onNavigate: (route: AppRoute) => void;
  onOpenBooking: () => void;
}

export function Footer({ onNavigate, onOpenBooking }: FooterProps) {
  return (
    <footer className="bg-[#172B45] text-white border-t border-white/10">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-white/12">
          {/* Institutional Identity */}
          <div className="lg:col-span-4 space-y-5">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-white">
                Dr. Mohan&apos;s
              </h2>
              <p className="text-sm text-[#EAF3FC]/80 mt-1">
                Diabetes Specialities Centre &amp; Multispeciality Care
              </p>
            </div>
            <p className="text-sm text-white/75 leading-relaxed max-w-sm">
              Established in 1991. An NABH-accredited, IDF Centre of Excellence and WHO
              Collaborating Centre delivering coordinated multispeciality medicine, diagnostics,
              and clinical research across 50+ centres in India.
            </p>
            <div className="space-y-2.5 text-sm text-white/85 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#EAF3FC] shrink-0 mt-1" aria-hidden="true" />
                <span>
                  No. 6B, Conran Smith Road, Gopalapuram, Chennai – 600086, Tamil Nadu
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#EAF3FC] shrink-0" aria-hidden="true" />
                <a href="tel:+914443968888" className="hover:underline tabular-nums">
                  044-43968888
                </a>
                <span className="text-white/40" aria-hidden="true">
                  ·
                </span>
                <a href="tel:+914428359048" className="hover:underline tabular-nums">
                  044-28359048
                </a>
              </div>
            </div>
          </div>

          {/* Specialities Columns */}
          <div className="lg:col-span-5">
            <h3 className="font-display text-sm font-semibold text-[#EAF3FC] mb-4">
              Clinical Specialities
            </h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {SPECIALITIES.map((spec) => (
                <button
                  key={spec.slug}
                  type="button"
                  onClick={() => onNavigate({ page: 'speciality', slug: spec.slug })}
                  className="text-left text-sm text-white/75 hover:text-white transition-colors cursor-pointer"
                >
                  {spec.shortName}
                </button>
              ))}
            </div>
          </div>

          {/* Patient Access & Navigation */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h3 className="font-display text-sm font-semibold text-[#EAF3FC] mb-4">
                Patient Services
              </h3>
              <ul className="space-y-2.5 text-sm text-white/75">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate({ page: 'doctors' })}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Find a Specialist Doctor
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate({ page: 'centres' })}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Centre &amp; Branch Locator
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate({ page: 'research' })}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Research &amp; MDRF Studies
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Schedule a Consultation
                  </button>
                </li>
              </ul>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href="https://wa.me/919384848888?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20an%20appointment%20at%20Dr.%20Mohan%27s."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/18 text-sm font-semibold text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>WhatsApp Care Desk</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/60">
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

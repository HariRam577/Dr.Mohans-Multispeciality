import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Calendar, MapPin, Search, Users } from 'lucide-react';
import type { BookingPrefill } from '../components/AppointmentDrawer';
import { SpecialityIconBadge } from '../components/ClinicalIcons';
import { ClinicalImage } from '../components/ClinicalImage';
import { DOCTORS, type Doctor } from '../data/doctors';
import { SPECIALITIES } from '../data/specialities';
import { filterDoctors } from '../utils/filters';

interface DoctorsPageProps {
  onOpenBooking: (prefill?: BookingPrefill) => void;
  onSelectDoctor: (doctor: Doctor) => void;
}

export function DoctorsPage({ onOpenBooking, onSelectDoctor }: DoctorsPageProps) {
  const [query, setQuery] = useState('');
  const [specialitySlug, setSpecialitySlug] = useState('all');
  const [city, setCity] = useState('all');
  const prefersReduced = useReducedMotion();

  const cities = Array.from(new Set(DOCTORS.map((d) => d.city))).sort();
  const results = filterDoctors(DOCTORS, { query, specialitySlug, city });

  return (
    <div className="bg-[#F7FAFD]">
      <section className="hero-animated-mesh text-white border-b border-[#19B6C9]/25 py-14 lg:py-20">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 space-y-6">
          <div className="max-w-3xl space-y-3">
            <p className="inline-flex items-center gap-2 text-xs font-bold text-[#19B6C9]">
              <Users className="w-4 h-4 text-[#19B6C9]" aria-hidden="true" />
              <span>Medical Faculty &amp; Consultants</span>
            </p>
            <h1 className="font-display text-3xl sm:text-5xl font-bold text-white">
              Find a Specialist Doctor
            </h1>
            <p className="text-base text-[#EAF5FC]/85 leading-relaxed">
              Search our clinical leadership and specialist consultants by department, city,
              or area of medical expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2">
            <div className="md:col-span-5 relative">
              <Search
                className="w-4 h-4 text-[#19B6C9] absolute left-3.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                type="search"
                aria-label="Search doctors by name or clinical focus"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search doctor name, condition, or focus..."
                className="w-full pl-10 pr-3.5 py-2.5 text-sm border border-white/25 rounded-xl bg-[#0A1E47] text-white placeholder:text-white/60"
              />
            </div>

            <div className="md:col-span-4">
              <select
                aria-label="Filter doctors by speciality"
                value={specialitySlug}
                onChange={(e) => setSpecialitySlug(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-white/25 rounded-xl bg-[#0A1E47] text-white font-medium"
              >
                <option value="all">All 12 Specialities</option>
                {SPECIALITIES.map((spec) => (
                  <option key={spec.slug} value={spec.slug}>
                    {spec.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3">
              <select
                aria-label="Filter doctors by city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-white/25 rounded-xl bg-[#0A1E47] text-white font-medium"
              >
                <option value="all">All Cities</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#EAF5FC] py-14 lg:py-20">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <p className="text-xs font-bold text-[#102A5E] mb-6 tabular-nums inline-flex items-center gap-2">
            <Users className="w-4 h-4 text-[#1769AA]" aria-hidden="true" />
            <span>
              Showing {results.length} {results.length === 1 ? 'specialist' : 'specialists'}
            </span>
          </p>

          {results.length === 0 ? (
            <div className="bg-white border border-[#DCE7F1] rounded-2xl p-12 text-center space-y-3">
              <p className="font-display text-lg font-semibold text-[#102A5E]">
                No specialists matched your current filter selection.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setSpecialitySlug('all');
                  setCity('all');
                }}
                className="text-sm font-bold text-[#1769AA] hover:underline cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {results.map((doc, idx) => (
                <motion.article
                  key={doc.id}
                  initial={prefersReduced ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.08 }}
                  transition={{
                    duration: 0.4,
                    delay: Math.min(idx * 0.04, 0.24),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group bg-white border border-[#DCE7F1] hover:border-[#19B6C9] rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-[0_8px_24px_-12px_rgba(16,42,94,0.1)] hover:shadow-[0_18px_36px_-14px_rgba(23,105,170,0.22)]"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex gap-4 items-start">
                      <ClinicalImage
                        src={doc.image}
                        alt={doc.name}
                        className="w-24 h-28 rounded-xl shrink-0 border border-[#DCE7F1]"
                        imgClassName="object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-bold text-[#1769AA]">{doc.specialityName}</p>
                          <SpecialityIconBadge slug={doc.specialitySlug} tone="ice" size="sm" />
                        </div>
                        <h2 className="font-display text-xl font-bold text-[#102A5E] mt-0.5 group-hover:text-[#1769AA] transition-colors">
                          {doc.name}
                        </h2>
                        <p className="text-xs text-[#64748B] mt-0.5">{doc.designation}</p>
                        {doc.experienceLabel && (
                          <p className="text-xs font-bold text-[#1769AA] mt-2">
                            {doc.experienceLabel}
                          </p>
                        )}
                      </div>
                    </div>

                    <p className="text-xs font-semibold text-[#172B43]/85">{doc.qualifications}</p>

                    <div className="pt-3 border-t border-[#DCE7F1] text-xs text-[#64748B] flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#1769AA] shrink-0 mt-0.5" />
                      <span>{doc.centreNames.join(' · ')}</span>
                    </div>
                  </div>

                  <div className="px-6 py-4 bg-[#F7FAFD] border-t border-[#DCE7F1] flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onSelectDoctor(doc)}
                      className="text-xs font-bold text-[#1769AA] hover:text-[#102A5E] hover:underline cursor-pointer"
                    >
                      Full Profile
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        onOpenBooking({
                          specialitySlug: doc.specialitySlug,
                          centreId: doc.centreIds[0],
                          doctorId: doc.id,
                        })
                      }
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#1769AA] hover:bg-[#102A5E] rounded-xl transition-colors cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#19B6C9]" aria-hidden="true" />
                      <span>Book Appointment</span>
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

import { useState } from 'react';
import { Calendar, MapPin, Search } from 'lucide-react';
import type { BookingPrefill } from '../components/AppointmentDrawer';
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

  const cities = Array.from(new Set(DOCTORS.map((d) => d.city))).sort();
  const results = filterDoctors(DOCTORS, { query, specialitySlug, city });

  return (
    <div className="bg-white">
      <section className="bg-[#F8FAFD] border-b border-[#C89B2B]/25 py-14 lg:py-20">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 space-y-6">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold text-[#9A6B11]">
              Medical Faculty &amp; Consultants
            </p>
            <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#0F1F4B]">
              Find a Specialist Doctor
            </h1>
            <p className="text-base text-[#55627A] leading-relaxed">
              Search our clinical leadership and specialist consultants by department, city,
              or area of medical expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2">
            <div className="md:col-span-5 relative">
              <Search
                className="w-4 h-4 text-[#9A6B11] absolute left-3.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                type="search"
                aria-label="Search doctors by name or clinical focus"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search doctor name, condition, or focus..."
                className="w-full pl-10 pr-3.5 py-2.5 text-sm border border-[#0F1F4B]/18 rounded-lg bg-white text-[#0F1F4B]"
              />
            </div>

            <div className="md:col-span-4">
              <select
                aria-label="Filter doctors by speciality"
                value={specialitySlug}
                onChange={(e) => setSpecialitySlug(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-[#0F1F4B]/18 rounded-lg bg-white text-[#0F1F4B]"
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
                className="w-full px-3.5 py-2.5 text-sm border border-[#0F1F4B]/18 rounded-lg bg-white text-[#0F1F4B]"
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

      <section className="max-w-[1360px] mx-auto px-5 sm:px-8 py-14 lg:py-20">
        <p className="text-xs font-semibold text-[#55627A] mb-6 tabular-nums">
          Showing {results.length} {results.length === 1 ? 'specialist' : 'specialists'}
        </p>

        {results.length === 0 ? (
          <div className="bg-[#F8FAFD] border border-[#0F1F4B]/10 rounded-xl p-12 text-center space-y-3">
            <p className="font-display text-lg font-semibold text-[#0F1F4B]">
              No specialists matched your current filter selection.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSpecialitySlug('all');
                setCity('all');
              }}
              className="text-sm font-semibold text-[#1B3B8B] hover:underline cursor-pointer"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {results.map((doc) => (
              <article
                key={doc.id}
                className="bg-white border border-[#0F1F4B]/12 rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#C89B2B] transition-colors"
              >
                <div className="p-6 space-y-4">
                  <div className="flex gap-4 items-start">
                    <ClinicalImage
                      src={doc.image}
                      alt={doc.name}
                      className="w-24 h-28 rounded-lg shrink-0 border border-[#C89B2B]/25"
                      imgClassName="object-top"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#9A6B11]">
                        {doc.specialityName}
                      </p>
                      <h2 className="font-display text-xl font-bold text-[#0F1F4B] mt-0.5">
                        {doc.name}
                      </h2>
                      <p className="text-xs text-[#55627A] mt-0.5">{doc.designation}</p>
                      {doc.experienceLabel && (
                        <p className="text-xs font-semibold text-[#1B3B8B] mt-2">
                          {doc.experienceLabel}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="text-xs font-medium text-[#0F1F4B]/80">
                    {doc.qualifications}
                  </p>

                  <div className="pt-3 border-t border-[#0F1F4B]/8 text-xs text-[#55627A] flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#9A6B11] shrink-0 mt-0.5" />
                    <span>{doc.centreNames.join(' · ')}</span>
                  </div>
                </div>

                <div className="px-6 py-4 bg-[#F8FAFD] border-t border-[#0F1F4B]/8 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectDoctor(doc)}
                    className="text-xs font-semibold text-[#1B3B8B] hover:text-[#9A6B11] cursor-pointer"
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
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#1B3B8B] hover:bg-[#254EDB] border border-[#D4AF37]/40 rounded-lg transition-colors cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#E8C463]" aria-hidden="true" />
                    <span>Book Appointment</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

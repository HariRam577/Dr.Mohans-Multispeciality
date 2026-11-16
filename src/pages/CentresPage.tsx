import { useState } from 'react';
import { Calendar, Clock, ExternalLink, MapPin, Phone, Search } from 'lucide-react';
import type { BookingPrefill } from '../components/AppointmentDrawer';
import { CENTRES } from '../data/centres';
import { SPECIALITIES } from '../data/specialities';
import { filterCentres, getCitiesForState, getUniqueStates } from '../utils/filters';

interface CentresPageProps {
  onOpenBooking: (prefill?: BookingPrefill) => void;
}

export function CentresPage({ onOpenBooking }: CentresPageProps) {
  const [stateFilter, setStateFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');
  const [specialityFilter, setSpecialityFilter] = useState('all');
  const [query, setQuery] = useState('');

  const states = getUniqueStates(CENTRES);
  const cities = getCitiesForState(CENTRES, stateFilter);
  const results = filterCentres(CENTRES, {
    state: stateFilter,
    city: cityFilter,
    specialitySlug: specialityFilter,
    query,
  });

  const handleStateChange = (newState: string) => {
    setStateFilter(newState);
    setCityFilter('all');
  };

  const getSpecialityName = (slug: string) =>
    SPECIALITIES.find((s) => s.slug === slug)?.shortName ?? slug;

  return (
    <div className="bg-white">
      <section className="bg-[#F8FAFD] border-b border-[#C89B2B]/25 py-14 lg:py-20">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 space-y-6">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold text-[#9A6B11]">
              50+ Centres Across India
            </p>
            <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#0F1F4B]">
              Interactive Centre Finder
            </h1>
            <p className="text-base text-[#55627A] leading-relaxed">
              Locate accredited hospitals and specialist centres by state, city, or required
              medical department.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 pt-2">
            <div className="lg:col-span-4 relative">
              <Search
                className="w-4 h-4 text-[#9A6B11] absolute left-3.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                type="search"
                aria-label="Search centres by area, landmark, or city"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search area, road, or centre name..."
                className="w-full pl-10 pr-3.5 py-2.5 text-sm border border-[#0F1F4B]/18 rounded-lg bg-white text-[#0F1F4B]"
              />
            </div>

            <div className="lg:col-span-3">
              <select
                aria-label="Filter centres by state"
                value={stateFilter}
                onChange={(e) => handleStateChange(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-[#0F1F4B]/18 rounded-lg bg-white text-[#0F1F4B]"
              >
                <option value="all">All States ({states.length})</option>
                {states.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <div className="lg:col-span-2">
              <select
                aria-label="Filter centres by city"
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
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

            <div className="lg:col-span-3">
              <select
                aria-label="Filter centres by available speciality"
                value={specialityFilter}
                onChange={(e) => setSpecialityFilter(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-[#0F1F4B]/18 rounded-lg bg-white text-[#0F1F4B]"
              >
                <option value="all">All Available Specialities</option>
                {SPECIALITIES.map((spec) => (
                  <option key={spec.slug} value={spec.slug}>
                    {spec.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1360px] mx-auto px-5 sm:px-8 py-14 lg:py-20">
        <p className="text-xs font-semibold text-[#55627A] mb-6 tabular-nums">
          Showing {results.length} {results.length === 1 ? 'centre' : 'centres'}
        </p>

        {results.length === 0 ? (
          <div className="bg-[#F8FAFD] border border-[#0F1F4B]/10 rounded-xl p-12 text-center space-y-3">
            <p className="font-display text-lg font-semibold text-[#0F1F4B]">
              No centres match the selected state, city, and speciality filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setStateFilter('all');
                setCityFilter('all');
                setSpecialityFilter('all');
                setQuery('');
              }}
              className="text-sm font-semibold text-[#1B3B8B] hover:underline cursor-pointer"
            >
              Reset all centre filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.map((centre) => (
              <article
                key={centre.id}
                className="bg-white border border-[#0F1F4B]/12 border-t-2 border-t-[#C89B2B] rounded-xl p-6 sm:p-7 flex flex-col justify-between gap-5 hover:border-[#C89B2B] transition-colors"
              >
                <div className="space-y-3">
                  <p className="text-xs text-[#55627A]">
                    <span className="font-semibold text-[#9A6B11]">{centre.city}</span>
                    <span className="mx-2" aria-hidden="true">
                      ·
                    </span>
                    <span>{centre.state}</span>
                    {centre.accreditation ? (
                      <>
                        <span className="mx-2" aria-hidden="true">
                          ·
                        </span>
                        <span className="text-[#1B3B8B] font-medium">
                          {centre.accreditation}
                        </span>
                      </>
                    ) : null}
                  </p>

                  <h2 className="font-display text-xl font-bold text-[#0F1F4B]">
                    {centre.name}
                  </h2>

                  <div className="space-y-1.5 text-sm text-[#55627A]">
                    <p className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[#9A6B11] shrink-0 mt-0.5" />
                      <span>{centre.address}</span>
                    </p>
                    <p className="flex items-center gap-2 tabular-nums">
                      <Phone className="w-4 h-4 text-[#9A6B11] shrink-0" />
                      <a
                        href={`tel:${centre.phone.replace(/\D/g, '')}`}
                        className="font-semibold text-[#0F1F4B] hover:text-[#1B3B8B]"
                      >
                        {centre.phone}
                      </a>
                    </p>
                    <p className="flex items-center gap-2 text-xs">
                      <Clock className="w-3.5 h-3.5 text-[#9A6B11] shrink-0" />
                      <span>{centre.hours}</span>
                    </p>
                  </div>

                  <div className="pt-2">
                    <p className="text-xs font-semibold text-[#0F1F4B] mb-1">
                      Available Departments:
                    </p>
                    <p className="text-xs text-[#55627A] leading-relaxed">
                      {centre.specialities.map(getSpecialityName).join(' · ')}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#0F1F4B]/10 flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${centre.mapQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B3B8B] hover:text-[#9A6B11] hover:underline"
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>

                  <button
                    type="button"
                    onClick={() =>
                      onOpenBooking({
                        centreId: centre.id,
                        specialitySlug:
                          specialityFilter !== 'all' ? specialityFilter : undefined,
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

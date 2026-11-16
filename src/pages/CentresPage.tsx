import { useEffect, useState } from 'react';
import { Building2, Calendar, Clock, ExternalLink, MapPin, Phone, Search } from 'lucide-react';
import type { BookingPrefill } from '../components/AppointmentDrawer';
import { CENTRES } from '../data/centres';
import { SPECIALITIES } from '../data/specialities';
import { filterCentres, getCitiesForState, getUniqueStates } from '../utils/filters';

interface CentresPageProps {
  initialState?: string;
  onOpenBooking: (prefill?: BookingPrefill) => void;
}

export function CentresPage({ initialState, onOpenBooking }: CentresPageProps) {
  const [stateFilter, setStateFilter] = useState(initialState || 'all');
  const [cityFilter, setCityFilter] = useState('all');
  const [specialityFilter, setSpecialityFilter] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setStateFilter(initialState || 'all');
    setCityFilter('all');
  }, [initialState]);

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
    <div className="bg-[#F7FAFD]">
      <section className="hero-animated-mesh text-white border-b border-[#19B6C9]/25 py-14 lg:py-20">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 space-y-6">
          <div className="max-w-3xl space-y-3">
            <p className="inline-flex items-center gap-2 text-xs font-bold text-[#19B6C9]">
              <Building2 className="w-4 h-4 text-[#19B6C9]" aria-hidden="true" />
              <span>50+ Centres Across 8 States &amp; UTs</span>
            </p>
            <h1 className="font-display text-3xl sm:text-5xl font-bold text-white">
              Interactive Centre Finder
            </h1>
            <p className="text-base text-[#EAF5FC]/85 leading-relaxed">
              Locate accredited hospitals and specialist centres by state, city, or required
              medical department.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 pt-2">
            <div className="lg:col-span-4 relative">
              <Search
                className="w-4 h-4 text-[#19B6C9] absolute left-3.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                type="search"
                aria-label="Search centres by area, landmark, or city"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search area, road, or centre name..."
                className="w-full pl-10 pr-3.5 py-2.5 text-sm border border-white/25 rounded-xl bg-[#0A1E47] text-white placeholder:text-white/60"
              />
            </div>

            <div className="lg:col-span-3">
              <select
                aria-label="Filter centres by state"
                value={stateFilter}
                onChange={(e) => handleStateChange(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-white/25 rounded-xl bg-[#0A1E47] text-white font-medium"
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

            <div className="lg:col-span-3">
              <select
                aria-label="Filter centres by available speciality"
                value={specialityFilter}
                onChange={(e) => setSpecialityFilter(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-white/25 rounded-xl bg-[#0A1E47] text-white font-medium"
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

      <section className="bg-[#EAF5FC] py-14 lg:py-20">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <p className="text-xs font-bold text-[#102A5E] mb-6 tabular-nums inline-flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#1769AA]" aria-hidden="true" />
            <span>
              Showing {results.length} {results.length === 1 ? 'centre' : 'centres'}
            </span>
          </p>

          {results.length === 0 ? (
            <div className="bg-white border border-[#DCE7F1] rounded-2xl p-12 text-center space-y-3">
              <p className="font-display text-lg font-semibold text-[#102A5E]">
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
                className="text-sm font-bold text-[#1769AA] hover:underline cursor-pointer"
              >
                Reset all centre filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map((centre) => (
                <article
                  key={centre.id}
                  className="bg-white border border-[#DCE7F1] hover:border-[#19B6C9] rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-5 transition-all shadow-xs hover:shadow-[0_14px_30px_-12px_rgba(23,105,170,0.18)]"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs text-[#64748B]">
                          <span className="font-bold text-[#1769AA]">{centre.city}</span>
                          <span className="mx-2" aria-hidden="true">
                            ·
                          </span>
                          <span>{centre.state}</span>
                          {centre.accreditation ? (
                            <>
                              <span className="mx-2" aria-hidden="true">
                                ·
                              </span>
                              <span className="text-[#102A5E] font-semibold">
                                {centre.accreditation}
                              </span>
                            </>
                          ) : null}
                        </p>
                        <h2 className="font-display text-xl font-bold text-[#102A5E] mt-1">
                          {centre.name}
                        </h2>
                      </div>
                      <span
                        className="w-10 h-10 rounded-xl bg-[#EAF5FC] border border-[#DCE7F1] text-[#1769AA] inline-flex items-center justify-center shrink-0"
                        aria-hidden="true"
                      >
                        <Building2 className="w-5 h-5" />
                      </span>
                    </div>

                    <div className="space-y-1.5 text-sm text-[#64748B]">
                      <p className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-[#1769AA] shrink-0 mt-0.5" />
                        <span>{centre.address}</span>
                      </p>
                      <p className="flex items-center gap-2 tabular-nums">
                        <Phone className="w-4 h-4 text-[#1769AA] shrink-0" />
                        <a
                          href={`tel:${centre.phone.replace(/\D/g, '')}`}
                          className="font-bold text-[#1769AA] hover:underline"
                        >
                          {centre.phone}
                        </a>
                      </p>
                      <p className="flex items-center gap-2 text-xs">
                        <Clock className="w-3.5 h-3.5 text-[#1769AA] shrink-0" />
                        <span>{centre.hours}</span>
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#DCE7F1]">
                      <p className="text-xs font-bold text-[#102A5E] mb-1">
                        Available Departments:
                      </p>
                      <p className="text-xs text-[#64748B] leading-relaxed">
                        {centre.specialities.map(getSpecialityName).join(' · ')}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#DCE7F1] flex flex-wrap items-center justify-between gap-3">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${centre.mapQuery}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1769AA] hover:text-[#102A5E] hover:underline"
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
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#1769AA] hover:bg-[#102A5E] rounded-xl transition-colors cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#19B6C9]" aria-hidden="true" />
                      <span>Book Appointment</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

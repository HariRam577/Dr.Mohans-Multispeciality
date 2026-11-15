import { useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import type { BookingPrefill } from '../components/AppointmentDrawer';
import { ClinicalImage } from '../components/ClinicalImage';
import type { AppRoute } from '../components/Navbar';
import { SPECIALITIES } from '../data/specialities';
import { filterSpecialities } from '../utils/filters';

interface SpecialitiesPageProps {
  onNavigate: (route: AppRoute) => void;
  onOpenBooking: (prefill?: BookingPrefill) => void;
}

const CATEGORIES = [
  'All',
  'Metabolic & Medical',
  'Organ & Surgical Care',
  'Diagnostics & Preventive',
] as const;

export function SpecialitiesPage({ onNavigate, onOpenBooking }: SpecialitiesPageProps) {
  const [category, setCategory] = useState<string>('All');
  const [query, setQuery] = useState<string>('');

  const filtered = filterSpecialities(SPECIALITIES, category, query);

  return (
    <div className="bg-white">
      <section className="bg-[#F7F9FC] border-b border-[#172B45]/10 py-14 lg:py-20">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 space-y-6">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold text-[#3C76C1]">
              Multispeciality Clinical Architecture
            </p>
            <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#172B45] [text-wrap:balance]">
              Twelve Clinical &amp; Diagnostic Specialities Under One Roof
            </h1>
            <p className="text-base text-[#64748B] leading-relaxed">
              Explore each department’s conditions treated, procedural capabilities, diagnostic
              technology, specialist faculty, and participating centres.
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
            <div
              role="tablist"
              aria-label="Filter specialities"
              className="flex flex-wrap gap-1.5 bg-white p-1.5 rounded-lg border border-[#172B45]/10"
            >
              {CATEGORIES.map((cat) => {
                const active = category === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setCategory(cat)}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#174A80] text-white'
                        : 'text-[#172B45]/80 hover:bg-[#F7F9FC]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full md:w-72">
              <Search
                className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                type="search"
                aria-label="Search specialities or conditions"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search condition or service..."
                className="w-full pl-10 pr-3.5 py-2.5 text-sm border border-[#172B45]/18 rounded-lg bg-white text-[#172B45]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1360px] mx-auto px-5 sm:px-8 py-14 lg:py-20">
        {filtered.length === 0 ? (
          <div className="bg-[#F7F9FC] border border-[#172B45]/10 rounded-xl p-12 text-center space-y-3">
            <p className="font-display text-lg font-semibold text-[#172B45]">
              No matching departments found for &ldquo;{query}&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => {
                setCategory('All');
                setQuery('');
              }}
              className="text-sm font-semibold text-[#3C76C1] hover:underline cursor-pointer"
            >
              Show all 12 specialities
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((spec) => (
              <article
                key={spec.slug}
                className="group bg-white border border-[#172B45]/12 rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#3C76C1]/60 transition-colors"
              >
                <div>
                  <ClinicalImage
                    src={spec.heroImage}
                    alt={spec.imageAlt}
                    className="aspect-[16/10] w-full"
                    imgClassName="transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="p-6 space-y-2.5">
                    <p className="text-xs text-[#64748B]">
                      <span className="font-mono-tabular text-[#3C76C1] font-medium">
                        {spec.index}
                      </span>
                      <span className="mx-2" aria-hidden="true">
                        ·
                      </span>
                      <span>{spec.category}</span>
                    </p>
                    <h2 className="font-display text-xl font-bold text-[#172B45]">
                      {spec.name}
                    </h2>
                    <p className="text-sm text-[#64748B] leading-relaxed">{spec.summary}</p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-3 border-t border-[#172B45]/8 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onNavigate({ page: 'speciality', slug: spec.slug })}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#174A80] hover:text-[#3C76C1] cursor-pointer"
                  >
                    <span>Department Details</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenBooking({ specialitySlug: spec.slug })}
                    className="text-xs font-semibold text-[#64748B] hover:text-[#174A80] cursor-pointer"
                  >
                    Book Visit
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

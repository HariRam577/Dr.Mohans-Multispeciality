import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Search, Stethoscope } from 'lucide-react';
import type { BookingPrefill } from '../components/AppointmentDrawer';
import { SpecialityIconBadge } from '../components/ClinicalIcons';
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
  const prefersReduced = useReducedMotion();

  const filtered = filterSpecialities(SPECIALITIES, category, query);

  return (
    <div className="bg-[#F7FAFD]">
      <section className="hero-animated-mesh text-white border-b border-[#19B6C9]/25 py-14 lg:py-20">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 space-y-6">
          <div className="max-w-3xl space-y-3">
            <p className="inline-flex items-center gap-2 text-xs font-bold text-[#19B6C9]">
              <Stethoscope className="w-4 h-4 text-[#19B6C9]" aria-hidden="true" />
              <span>Multispeciality Clinical Architecture</span>
            </p>
            <h1 className="font-display text-3xl sm:text-5xl font-bold text-white [text-wrap:balance]">
              Twelve Clinical &amp; Diagnostic Specialities Under One Roof
            </h1>
            <p className="text-base text-[#EAF5FC]/85 leading-relaxed">
              Explore each department’s conditions treated, procedural capabilities, diagnostic
              technology, specialist faculty, and participating centres.
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
            <div
              role="tablist"
              aria-label="Filter specialities"
              className="flex flex-wrap gap-1 bg-white p-1.5 rounded-xl border border-[#DCE7F1]"
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
                    className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#1769AA] text-white'
                        : 'text-[#172B43] hover:text-[#1769AA] hover:bg-[#EAF5FC]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full md:w-72">
              <Search
                className="w-4 h-4 text-[#19B6C9] absolute left-3.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                type="search"
                aria-label="Search specialities or conditions"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search condition or service..."
                className="w-full pl-10 pr-3.5 py-2.5 text-sm border border-white/25 rounded-xl bg-[#0A1E47] text-white placeholder:text-white/60"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#EAF5FC] py-14 lg:py-20">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          {filtered.length === 0 ? (
            <div className="bg-white border border-[#DCE7F1] rounded-2xl p-12 text-center space-y-3">
              <p className="font-display text-lg font-semibold text-[#102A5E]">
                No matching departments found for &ldquo;{query}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setCategory('All');
                  setQuery('');
                }}
                className="text-sm font-bold text-[#1769AA] hover:underline cursor-pointer"
              >
                Show all 12 specialities
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filtered.map((spec, idx) => (
                <motion.article
                  key={spec.slug}
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
                  <div>
                    <div className="aspect-[16/10] w-full overflow-hidden">
                      <ClinicalImage
                        src={spec.heroImage}
                        alt={spec.imageAlt}
                        className="w-full h-full"
                        imgClassName="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs text-[#64748B]">
                          <span className="font-mono-tabular text-[#1769AA] font-bold">
                            {spec.index}
                          </span>
                          <span className="mx-2" aria-hidden="true">
                            ·
                          </span>
                          <span>{spec.category}</span>
                        </p>
                        <SpecialityIconBadge slug={spec.slug} tone="ice" size="sm" />
                      </div>
                      <h2 className="font-display text-xl font-bold text-[#102A5E] group-hover:text-[#1769AA] transition-colors">
                        {spec.name}
                      </h2>
                      <p className="text-sm text-[#64748B] leading-relaxed">{spec.summary}</p>
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-[#F7FAFD] border-t border-[#DCE7F1] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => onNavigate({ page: 'speciality', slug: spec.slug })}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1769AA] hover:text-[#102A5E] cursor-pointer"
                    >
                      <span>Department Details</span>
                      <ArrowRight className="w-4 h-4 text-[#19B6C9]" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenBooking({ specialitySlug: spec.slug })}
                      className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#1769AA] hover:bg-[#102A5E] rounded-xl transition-colors cursor-pointer"
                    >
                      Book Visit
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

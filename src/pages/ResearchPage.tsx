import { ArrowRight, BookOpen } from 'lucide-react';
import { ClinicalImage } from '../components/ClinicalImage';
import type { AppRoute } from '../components/Navbar';
import { RESEARCH_INITIATIVES } from '../data/insights';
import { MEDIA } from '../data/media';

interface ResearchPageProps {
  onNavigate: (route: AppRoute) => void;
  onOpenBooking: () => void;
}

export function ResearchPage({ onNavigate, onOpenBooking }: ResearchPageProps) {
  return (
    <div className="bg-white">
      <section className="bg-[#F7F9FC] border-b border-[#172B45]/10 py-14 lg:py-20">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs font-semibold text-[#3C76C1]">
              Madras Diabetes Research Foundation (MDRF)
            </p>
            <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#172B45] leading-[1.1] [text-wrap:balance]">
              Clinical Research Shaping Global &amp; Indian Standards of Care
            </h1>
            <p className="text-base text-[#64748B] leading-relaxed max-w-2xl">
              Founded in 1996 as our dedicated research sister institution, MDRF operates as an
              ICMR Centre for Advanced Research on Diabetes and collaborates with the World Health
              Organization and International Diabetes Federation.
            </p>
          </div>
          <div className="lg:col-span-5 rounded-2xl overflow-hidden aspect-[4/3]">
            <ClinicalImage
              src={MEDIA.mdrfCampus}
              alt="Madras Diabetes Research Foundation (MDRF) campus building in Chennai"
              eager
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

      <section className="max-w-[1360px] mx-auto px-5 sm:px-8 py-14 lg:py-20 border-b border-[#172B45]/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              value: '1,700+',
              label: 'Peer-Reviewed Publications',
              desc: 'Indexed clinical, epidemiological, and genetic research articles.',
            },
            {
              value: 'ICMR',
              label: 'Centre for Advanced Research',
              desc: 'Leading the landmark ICMR–INDIAB national prevalence study across India.',
            },
            {
              value: 'WHO · IDF',
              label: 'Global Collaborating Status',
              desc: 'Recognized for NCD prevention, clinical training, and excellence in care.',
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-[#F7F9FC] border border-[#172B45]/10 rounded-xl p-6 space-y-2"
            >
              <p className="font-display text-3xl font-bold text-[#174A80] tabular-nums">
                {stat.value}
              </p>
              <h2 className="font-display text-base font-bold text-[#172B45]">{stat.label}</h2>
              <p className="text-xs text-[#64748B] leading-relaxed">{stat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[1360px] mx-auto px-5 sm:px-8 py-14 lg:py-20">
        <div className="max-w-2xl mb-10 space-y-2">
          <p className="text-xs font-semibold text-[#3C76C1]">Key Scientific Pillars</p>
          <h2 className="font-display text-3xl font-bold text-[#172B45]">
            Active Research Programmes
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {RESEARCH_INITIATIVES.map((item) => (
            <article
              key={item.id}
              className="bg-white border border-[#172B45]/12 rounded-xl p-6 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#3C76C1]">
                  <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{item.kicker}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-[#172B45]">{item.title}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">{item.summary}</p>
              </div>
              <p className="pt-4 border-t border-[#172B45]/10 text-xs font-semibold text-[#174A80]">
                {item.impact}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 bg-[#EAF3FC]/60 border border-[#172B45]/10 rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="font-display text-2xl font-bold text-[#172B45]">
              Evidence-Based Clinical Care for You
            </h2>
            <p className="text-sm text-[#64748B]">
              Schedule a specialist consultation informed by three decades of clinical research.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onNavigate({ page: 'specialities' })}
              className="px-4 py-2.5 text-sm font-semibold text-[#174A80] bg-white rounded-lg border border-[#172B45]/15 hover:bg-[#F7F9FC] inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Explore Specialities</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onOpenBooking}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-[#174A80] hover:bg-[#3C76C1] rounded-lg cursor-pointer"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

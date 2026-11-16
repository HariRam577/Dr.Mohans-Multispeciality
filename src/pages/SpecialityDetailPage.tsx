import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronDown,
  ExternalLink,
  MapPin,
} from 'lucide-react';
import type { BookingPrefill } from '../components/AppointmentDrawer';
import { ClinicalImage } from '../components/ClinicalImage';
import type { AppRoute } from '../components/Navbar';
import { CENTRES } from '../data/centres';
import { DOCTORS, type Doctor } from '../data/doctors';
import { MEDICAL_ARTICLES, type MedicalArticle } from '../data/insights';
import { SPECIALITIES, getSpecialityBySlug } from '../data/specialities';

interface SpecialityDetailPageProps {
  slug: string;
  onNavigate: (route: AppRoute) => void;
  onOpenBooking: (prefill?: BookingPrefill) => void;
  onSelectDoctor: (doctor: Doctor) => void;
  onSelectArticle: (article: MedicalArticle) => void;
}

export function SpecialityDetailPage({
  slug,
  onNavigate,
  onOpenBooking,
  onSelectDoctor,
  onSelectArticle,
}: SpecialityDetailPageProps) {
  const speciality = getSpecialityBySlug(slug) ?? SPECIALITIES[0];
  const [openFaq, setOpenFaq] = useState<number>(0);

  const deptDoctors = DOCTORS.filter((d) => d.specialitySlug === speciality.slug);
  const deptCentres = CENTRES.filter((c) => c.specialities.includes(speciality.slug)).slice(
    0,
    6
  );
  const relatedArticles = MEDICAL_ARTICLES.filter(
    (a) => a.specialitySlug === speciality.slug
  );
  const displayArticles =
    relatedArticles.length > 0 ? relatedArticles : MEDICAL_ARTICLES.slice(0, 2);

  return (
    <div className="bg-white">
      {/* Department Hero */}
      <section className="bg-[#F7F9FC] border-b border-[#172B45]/10 py-12 lg:py-16">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <button
            type="button"
            onClick={() => onNavigate({ page: 'specialities' })}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3C76C1] hover:text-[#174A80] mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>All 12 Specialities</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <p className="text-xs text-[#64748B]">
                  <span className="font-mono-tabular font-semibold text-[#3C76C1]">
                    Department {speciality.index}
                  </span>
                  <span className="mx-2" aria-hidden="true">
                    ·
                  </span>
                  <span>{speciality.category}</span>
                </p>
                <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#172B45] leading-[1.1] [text-wrap:balance]">
                  {speciality.name}
                </h1>
                <p className="text-base sm:text-lg text-[#174A80] font-medium">
                  {speciality.tagline}
                </p>
                <p className="text-[15px] text-[#64748B] leading-relaxed">
                  {speciality.introduction}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onOpenBooking({ specialitySlug: speciality.slug })}
                  className="px-6 py-3.5 text-sm font-semibold text-white bg-[#174A80] hover:bg-[#3C76C1] rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  <span>Book {speciality.shortName} Consultation</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'doctors' })}
                  className="px-5 py-3.5 text-sm font-semibold text-[#174A80] bg-white border border-[#172B45]/15 hover:bg-[#EAF3FC] rounded-lg transition-colors cursor-pointer"
                >
                  View Specialist Team
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 rounded-2xl overflow-hidden min-h-[300px] lg:min-h-[400px]">
              <ClinicalImage
                src={speciality.heroImage}
                alt={speciality.imageAlt}
                eager
                className="w-full h-full"
                imgClassName="lg:h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Conditions, Services, and Diagnostics */}
      <section className="max-w-[1360px] mx-auto px-5 sm:px-8 py-14 lg:py-20 border-b border-[#172B45]/10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-[#F7F9FC] border border-[#172B45]/10 rounded-xl p-6 sm:p-7 space-y-4">
            <h2 className="font-display text-xl font-bold text-[#172B45]">
              Conditions Treated
            </h2>
            <ul className="space-y-2.5 text-sm text-[#172B45]/85">
              {speciality.conditionsTreated.map((cond) => (
                <li key={cond} className="flex items-start gap-2.5">
                  <span className="text-[#3C76C1] font-bold mt-0.5" aria-hidden="true">
                    ·
                  </span>
                  <span>{cond}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#F7F9FC] border border-[#172B45]/10 rounded-xl p-6 sm:p-7 space-y-4">
            <h2 className="font-display text-xl font-bold text-[#172B45]">
              Available Clinical Services
            </h2>
            <ul className="space-y-2.5 text-sm text-[#172B45]/85">
              {speciality.services.map((srv) => (
                <li key={srv} className="flex items-start gap-2.5">
                  <span className="text-[#3C76C1] font-bold mt-0.5" aria-hidden="true">
                    ·
                  </span>
                  <span>{srv}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#F7F9FC] border border-[#172B45]/10 rounded-xl p-6 sm:p-7 space-y-4">
            <h2 className="font-display text-xl font-bold text-[#172B45]">
              Diagnostic Facilities
            </h2>
            <ul className="space-y-2.5 text-sm text-[#172B45]/85">
              {speciality.diagnostics.map((diag) => (
                <li key={diag} className="flex items-start gap-2.5">
                  <span className="text-[#3C76C1] font-bold mt-0.5" aria-hidden="true">
                    ·
                  </span>
                  <span>{diag}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Specialist Doctors in this Department */}
      <section className="max-w-[1360px] mx-auto px-5 sm:px-8 py-14 lg:py-20 border-b border-[#172B45]/10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold text-[#3C76C1]">Department Faculty</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#172B45] mt-1">
              {deptDoctors.length > 0
                ? `${speciality.shortName} Specialists`
                : `Coordinated ${speciality.shortName} & Clinical Faculty`}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate({ page: 'doctors' })}
            className="text-sm font-semibold text-[#174A80] hover:underline cursor-pointer"
          >
            View All Specialists →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(deptDoctors.length > 0 ? deptDoctors : DOCTORS.slice(0, 3)).map((doc) => (
            <article
              key={doc.id}
              className="bg-white border border-[#172B45]/12 rounded-xl overflow-hidden flex flex-col justify-between"
            >
              <div className="p-6 flex gap-4 items-start">
                <ClinicalImage
                  src={doc.image}
                  alt={doc.name}
                  className="w-20 h-24 rounded-lg shrink-0"
                  imgClassName="object-top"
                />
                <div>
                  <p className="text-xs font-semibold text-[#3C76C1]">{doc.specialityName}</p>
                  <h3 className="font-display text-lg font-bold text-[#172B45] mt-0.5">
                    {doc.name}
                  </h3>
                  <p className="text-xs text-[#64748B] mt-0.5">{doc.designation}</p>
                  <p className="text-xs font-medium text-[#174A80] mt-2">
                    {doc.city} · {doc.qualifications.split(',')[0]}
                  </p>
                </div>
              </div>
              <div className="px-6 py-3.5 bg-[#F7F9FC] border-t border-[#172B45]/8 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onSelectDoctor(doc)}
                  className="text-xs font-semibold text-[#174A80] hover:underline cursor-pointer"
                >
                  Profile
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onOpenBooking({
                      specialitySlug: speciality.slug,
                      doctorId: doc.id,
                      centreId: doc.centreIds[0],
                    })
                  }
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-[#174A80] hover:bg-[#3C76C1] rounded-md cursor-pointer"
                >
                  Book Consultation
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Relevant Centres */}
      <section className="bg-[#F7F9FC] py-14 lg:py-20 border-b border-[#172B45]/10">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold text-[#3C76C1]">Available Locations</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#172B45] mt-1">
                Centres Offering {speciality.shortName}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate({ page: 'centres' })}
              className="text-sm font-semibold text-[#174A80] hover:underline cursor-pointer"
            >
              Open Full Centre Finder →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {deptCentres.map((centre) => (
              <div
                key={centre.id}
                className="bg-white border border-[#172B45]/10 rounded-xl p-5 flex flex-col justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-[#3C76C1]">
                    {centre.city} · {centre.state}
                  </p>
                  <h3 className="font-display text-base font-bold text-[#172B45]">
                    {centre.name}
                  </h3>
                  <p className="text-xs text-[#64748B] flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#3C76C1]" />
                    <span>{centre.address}</span>
                  </p>
                  <p className="text-xs text-[#172B45] font-medium tabular-nums pt-1">
                    {centre.phone}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#172B45]/8 flex items-center justify-between">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${centre.mapQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#174A80] hover:underline"
                  >
                    <span>Directions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    type="button"
                    onClick={() =>
                      onOpenBooking({
                        specialitySlug: speciality.slug,
                        centreId: centre.id,
                      })
                    }
                    className="text-xs font-semibold text-white bg-[#174A80] hover:bg-[#3C76C1] px-3 py-1.5 rounded-md cursor-pointer"
                  >
                    Book Here
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Information Accordion & Related Articles */}
      <section className="max-w-[1360px] mx-auto px-5 sm:px-8 py-14 lg:py-20 border-b border-[#172B45]/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6 space-y-5">
            <div>
              <p className="text-xs font-semibold text-[#3C76C1]">Patient Information</p>
              <h2 className="font-display text-2xl font-bold text-[#172B45] mt-1">
                Preparing for Your Consultation
              </h2>
            </div>

            <div className="divide-y divide-[#172B45]/10 border-y border-[#172B45]/10">
              {speciality.patientGuidance.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={faq.question} className="py-4">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      className="w-full flex items-center justify-between gap-4 text-left font-display text-base font-semibold text-[#172B45] cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#3C76C1] shrink-0 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm text-[#64748B] leading-relaxed pt-3">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <div>
              <p className="text-xs font-semibold text-[#3C76C1]">Related Reading</p>
              <h2 className="font-display text-2xl font-bold text-[#172B45] mt-1">
                Clinician-Reviewed Articles
              </h2>
            </div>

            <div className="space-y-4">
              {displayArticles.map((art) => (
                <article
                  key={art.id}
                  className="bg-[#F7F9FC] border border-[#172B45]/10 rounded-xl p-5 space-y-2"
                >
                  <p className="text-xs text-[#64748B]">
                    <span className="font-semibold text-[#3C76C1]">{art.category}</span>
                    <span className="mx-2" aria-hidden="true">
                      ·
                    </span>
                    <span>{art.readTime}</span>
                  </p>
                  <h3 className="font-display text-lg font-bold text-[#172B45]">{art.title}</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">{art.excerpt}</p>
                  <button
                    type="button"
                    onClick={() => onSelectArticle(art)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#174A80] hover:underline pt-1 cursor-pointer"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Department Appointment CTA & Switcher */}
      <section className="bg-[#EAF3FC]/55 py-14 lg:py-16">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 space-y-10">
          <div className="bg-white border border-[#172B45]/12 rounded-2xl p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-xl">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#172B45]">
                Schedule a {speciality.shortName} Evaluation
              </h2>
              <p className="text-sm text-[#64748B]">
                Choose your preferred centre and date, or call 044-43968888 for coordinated
                multispeciality scheduling.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenBooking({ specialitySlug: speciality.slug })}
              className="px-6 py-3.5 text-sm font-semibold text-white bg-[#174A80] hover:bg-[#3C76C1] rounded-lg transition-colors inline-flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book {speciality.shortName} Visit</span>
            </button>
          </div>

          <div>
            <p className="text-xs font-semibold text-[#64748B] mb-3">
              Explore Other Departments
            </p>
            <div className="flex flex-wrap gap-2">
              {SPECIALITIES.filter((s) => s.slug !== speciality.slug).map((other) => (
                <button
                  key={other.slug}
                  type="button"
                  onClick={() => onNavigate({ page: 'speciality', slug: other.slug })}
                  className="px-3.5 py-2 text-xs font-semibold text-[#172B45] bg-white border border-[#172B45]/12 rounded-lg hover:border-[#3C76C1] hover:text-[#174A80] transition-colors cursor-pointer"
                >
                  {other.shortName}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

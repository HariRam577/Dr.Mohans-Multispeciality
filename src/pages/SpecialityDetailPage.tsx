import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  ExternalLink,
  FlaskConical,
  MapPin,
  Stethoscope,
} from 'lucide-react';
import type { BookingPrefill } from '../components/AppointmentDrawer';
import { SpecialityIconBadge } from '../components/ClinicalIcons';
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
    <div className="bg-[#F7FAFD]">
      {/* Department Hero */}
      <section className="hero-animated-mesh text-white border-b border-[#19B6C9]/25 py-12 lg:py-16">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <button
            type="button"
            onClick={() => onNavigate({ page: 'specialities' })}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#19B6C9] hover:text-white hover:underline mb-6 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>All 12 Specialities</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <SpecialityIconBadge slug={speciality.slug} tone="cyan" size="lg" />
                  <p className="text-xs text-[#EAF5FC]/80">
                    <span className="font-mono-tabular font-bold text-[#19B6C9]">
                      Department {speciality.index}
                    </span>
                    <span className="mx-2" aria-hidden="true">
                      ·
                    </span>
                    <span>{speciality.category}</span>
                  </p>
                </div>
                <h1 className="font-display text-3xl sm:text-5xl font-bold text-white leading-[1.1] [text-wrap:balance]">
                  {speciality.name}
                </h1>
                <p className="text-base sm:text-lg text-[#19B6C9] font-semibold">
                  {speciality.tagline}
                </p>
                <p className="text-[15px] text-[#EAF5FC]/85 leading-relaxed">
                  {speciality.introduction}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onOpenBooking({ specialitySlug: speciality.slug })}
                  className="px-6 py-3.5 text-sm font-bold text-[#102A5E] bg-[#19B6C9] hover:bg-white rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#102A5E]" aria-hidden="true" />
                  <span>Book {speciality.shortName} Consultation</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'doctors' })}
                  className="px-5 py-3.5 text-sm font-semibold text-white bg-white/10 border border-white/25 hover:bg-white/20 rounded-xl transition-colors cursor-pointer"
                >
                  View Specialist Team
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 rounded-[20px] overflow-hidden min-h-[300px] lg:min-h-[400px] border border-white/20 shadow-xl">
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

      {/* Conditions, Services, and Diagnostics on White Canvas */}
      <section className="bg-white py-14 lg:py-20 border-b border-[#DCE7F1]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-[#102A5E] text-white border border-[#1769AA] rounded-2xl p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-[#19B6C9]/20 text-[#19B6C9] inline-flex items-center justify-center">
                <ClipboardList className="w-5 h-5" aria-hidden="true" />
              </span>
              <h2 className="font-display text-xl font-bold text-white">Conditions Treated</h2>
            </div>
            <ul className="space-y-2.5 text-sm text-[#EAF5FC]/90">
              {speciality.conditionsTreated.map((cond) => (
                <li key={cond} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#19B6C9] shrink-0 mt-0.5" />
                  <span>{cond}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#F7FAFD] text-[#172B43] border border-[#DCE7F1] rounded-2xl p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-[#EAF5FC] border border-[#DCE7F1] text-[#1769AA] inline-flex items-center justify-center">
                <Stethoscope className="w-5 h-5" aria-hidden="true" />
              </span>
              <h2 className="font-display text-xl font-bold text-[#102A5E]">
                Available Clinical Services
              </h2>
            </div>
            <ul className="space-y-2.5 text-sm text-[#172B43]/90">
              {speciality.services.map((srv) => (
                <li key={srv} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1769AA] shrink-0 mt-0.5" />
                  <span>{srv}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#102A5E] text-white border border-[#1769AA] rounded-2xl p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-[#19B6C9]/20 text-[#19B6C9] inline-flex items-center justify-center">
                <FlaskConical className="w-5 h-5" aria-hidden="true" />
              </span>
              <h2 className="font-display text-xl font-bold text-white">Diagnostic Facilities</h2>
            </div>
            <ul className="space-y-2.5 text-sm text-[#EAF5FC]/90">
              {speciality.diagnostics.map((diag) => (
                <li key={diag} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#19B6C9] shrink-0 mt-0.5" />
                  <span>{diag}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Specialist Doctors in this Department */}
      <section className="bg-[#EAF5FC] py-14 lg:py-20 border-b border-[#DCE7F1]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-bold text-[#1769AA]">Department Faculty</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#102A5E] mt-1">
                {deptDoctors.length > 0
                  ? `${speciality.shortName} Specialists`
                  : `Coordinated ${speciality.shortName} & Clinical Faculty`}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate({ page: 'doctors' })}
              className="text-sm font-bold text-[#1769AA] hover:text-[#102A5E] hover:underline cursor-pointer"
            >
              View All Specialists →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(deptDoctors.length > 0 ? deptDoctors : DOCTORS.slice(0, 3)).map((doc) => (
              <article
                key={doc.id}
                className="group bg-white border border-[#DCE7F1] hover:border-[#19B6C9] rounded-2xl overflow-hidden flex flex-col justify-between transition-all shadow-xs"
              >
                <div className="p-6 flex gap-4 items-start">
                  <ClinicalImage
                    src={doc.image}
                    alt={doc.name}
                    className="w-20 h-24 rounded-xl shrink-0 border border-[#DCE7F1]"
                    imgClassName="object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  <div>
                    <p className="text-xs font-bold text-[#1769AA]">{doc.specialityName}</p>
                    <h3 className="font-display text-lg font-bold text-[#102A5E] mt-0.5">
                      {doc.name}
                    </h3>
                    <p className="text-xs text-[#64748B] mt-0.5">{doc.designation}</p>
                    <p className="text-xs font-semibold text-[#172B43] mt-2">
                      {doc.city} · {doc.qualifications.split(',')[0]}
                    </p>
                  </div>
                </div>
                <div className="px-6 py-3.5 bg-[#F7FAFD] border-t border-[#DCE7F1] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onSelectDoctor(doc)}
                    className="text-xs font-bold text-[#1769AA] hover:underline cursor-pointer"
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
                    className="px-3.5 py-2 text-xs font-bold text-white bg-[#1769AA] hover:bg-[#102A5E] rounded-xl transition-colors cursor-pointer"
                  >
                    Book Consultation
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Relevant Centres on Deep Navy */}
      <section className="bg-[#102A5E] text-white py-14 lg:py-20 border-y border-[#1769AA]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-bold text-[#19B6C9]">Available Locations</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                Centres Offering {speciality.shortName}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate({ page: 'centres' })}
              className="text-sm font-bold text-[#19B6C9] hover:text-white hover:underline cursor-pointer"
            >
              Open Full Centre Finder →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {deptCentres.map((centre) => (
              <div
                key={centre.id}
                className="bg-white text-[#172B43] border border-[#DCE7F1] rounded-2xl p-5 flex flex-col justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <p className="text-xs font-bold text-[#1769AA]">
                    {centre.city} · {centre.state}
                  </p>
                  <h3 className="font-display text-base font-bold text-[#102A5E]">
                    {centre.name}
                  </h3>
                  <p className="text-xs text-[#64748B] flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#1769AA]" />
                    <span>{centre.address}</span>
                  </p>
                  <p className="text-xs text-[#102A5E] font-bold tabular-nums pt-1">
                    {centre.phone}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#DCE7F1] flex items-center justify-between">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${centre.mapQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#1769AA] hover:underline"
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
                    className="text-xs font-bold text-white bg-[#1769AA] hover:bg-[#102A5E] px-3 py-1.5 rounded-xl cursor-pointer transition-colors"
                  >
                    Book Here
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Information Accordion & Related Articles on White Canvas */}
      <section className="bg-white py-14 lg:py-20 border-b border-[#DCE7F1]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6 space-y-5">
            <div>
              <p className="text-xs font-bold text-[#1769AA]">Patient Information</p>
              <h2 className="font-display text-2xl font-bold text-[#102A5E] mt-1">
                Preparing for Your Consultation
              </h2>
            </div>

            <div className="space-y-3">
              {speciality.patientGuidance.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={faq.question}
                    className="bg-[#F7FAFD] border border-[#DCE7F1] rounded-2xl p-5"
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      className="w-full flex items-center justify-between gap-4 text-left font-display text-base font-bold text-[#102A5E] cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#1769AA] shrink-0 transition-transform ${
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
              <p className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1769AA]">
                <BookOpen className="w-3.5 h-3.5 text-[#19B6C9]" aria-hidden="true" />
                <span>Related Reading</span>
              </p>
              <h2 className="font-display text-2xl font-bold text-[#102A5E] mt-1">
                Clinician-Reviewed Articles
              </h2>
            </div>

            <div className="space-y-4">
              {displayArticles.map((art) => (
                <article
                  key={art.id}
                  className="bg-[#102A5E] text-white border border-[#1769AA] rounded-2xl p-5 space-y-2"
                >
                  <p className="text-xs text-[#EAF5FC]/75">
                    <span className="font-bold text-[#19B6C9]">{art.category}</span>
                    <span className="mx-2" aria-hidden="true">
                      ·
                    </span>
                    <span>{art.readTime}</span>
                  </p>
                  <h3 className="font-display text-lg font-bold text-white">{art.title}</h3>
                  <p className="text-xs text-[#EAF5FC]/80 leading-relaxed">{art.excerpt}</p>
                  <button
                    type="button"
                    onClick={() => onSelectArticle(art)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#19B6C9] hover:text-white hover:underline pt-1 cursor-pointer"
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
      <section className="bg-[#EAF5FC] py-14 lg:py-16">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 space-y-10">
          <div className="bg-[#102A5E] text-white border border-[#1769AA] rounded-[20px] p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-xl">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Schedule a {speciality.shortName} Evaluation
              </h2>
              <p className="text-sm text-[#EAF5FC]/80">
                Choose your preferred centre and date, or call 044-43968888 for coordinated
                multispeciality scheduling.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenBooking({ specialitySlug: speciality.slug })}
              className="px-6 py-3.5 text-sm font-bold text-[#102A5E] bg-[#19B6C9] hover:bg-white rounded-xl transition-colors inline-flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book {speciality.shortName} Visit</span>
            </button>
          </div>

          <div>
            <p className="text-xs font-bold text-[#102A5E] mb-3">
              Explore Other Departments
            </p>
            <div className="flex flex-wrap gap-2">
              {SPECIALITIES.filter((s) => s.slug !== speciality.slug).map((other) => (
                <button
                  key={other.slug}
                  type="button"
                  onClick={() => onNavigate({ page: 'speciality', slug: other.slug })}
                  className="px-3.5 py-2 text-xs font-bold text-[#102A5E] bg-white border border-[#DCE7F1] rounded-xl hover:border-[#19B6C9] hover:text-[#1769AA] transition-colors cursor-pointer"
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

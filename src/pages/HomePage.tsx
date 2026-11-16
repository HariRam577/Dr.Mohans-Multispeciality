import { useState, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  ExternalLink,
  MapPin,
  MessageCircle,
  Phone,
  Search,
} from 'lucide-react';
import type { BookingPrefill } from '../components/AppointmentDrawer';
import { ClinicalImage } from '../components/ClinicalImage';
import { AnimatedStatValue, RevealSection } from '../components/MotionPrimitives';
import type { AppRoute } from '../components/Navbar';
import { CENTRES } from '../data/centres';
import { DOCTORS, type Doctor } from '../data/doctors';
import {
  CARE_PATHWAY,
  INSTITUTIONAL_STATS,
  MEDICAL_ARTICLES,
  PATIENT_STORIES,
  RESEARCH_INITIATIVES,
  type MedicalArticle,
} from '../data/insights';
import { MEDIA } from '../data/media';
import { SPECIALITIES } from '../data/specialities';
import {
  createBookingReference,
  filterCentres,
  filterDoctors,
  filterSpecialities,
  getCitiesForState,
  getUniqueStates,
  validateAppointmentInput,
  type AppointmentInput,
} from '../utils/filters';

interface HomePageProps {
  onNavigate: (route: AppRoute) => void;
  onOpenBooking: (prefill?: BookingPrefill) => void;
  onSelectDoctor: (doctor: Doctor) => void;
  onSelectArticle: (article: MedicalArticle) => void;
}

const SPECIALITY_CATEGORIES = [
  'All',
  'Metabolic & Medical',
  'Organ & Surgical Care',
  'Diagnostics & Preventive',
] as const;

export function HomePage({
  onNavigate,
  onOpenBooking,
  onSelectDoctor,
  onSelectArticle,
}: HomePageProps) {
  const prefersReduced = useReducedMotion();

  // Section 4: Specialities filter state
  const [specCategory, setSpecCategory] = useState<string>('All');
  const filteredSpecialities = filterSpecialities(SPECIALITIES, specCategory);

  // Section 6: Specialist quick filter state
  const [doctorCity, setDoctorCity] = useState<string>('all');
  const [doctorQuery, setDoctorQuery] = useState<string>('');
  const filteredDoctors = filterDoctors(DOCTORS, {
    city: doctorCity,
    query: doctorQuery,
  }).slice(0, 6);

  // Section 7: Centre finder quick filter state
  const states = getUniqueStates(CENTRES);
  const [selectedState, setSelectedState] = useState<string>('Tamil Nadu');
  const availableCities = getCitiesForState(CENTRES, selectedState);
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const previewCentres = filterCentres(CENTRES, {
    state: selectedState,
    city: selectedCity,
  }).slice(0, 4);

  // Section 13: Inline conversion form state
  const [inlineForm, setInlineForm] = useState<AppointmentInput>({
    patientName: '',
    phone: '',
    email: '',
    specialitySlug: SPECIALITIES[0].slug,
    centreId: CENTRES[0].id,
    preferredDate: '2026-11-18',
    preferredSlot: '08:00 AM – 10:00 AM',
  });
  const [inlineErrors, setInlineErrors] = useState<
    Partial<Record<keyof AppointmentInput, string>>
  >({});
  const [inlineConfirmedRef, setInlineConfirmedRef] = useState<string | null>(null);

  const handleStateChange = (newState: string) => {
    setSelectedState(newState);
    setSelectedCity('all');
  };

  const handleInlineSubmit = (e: FormEvent) => {
    e.preventDefault();
    const res = validateAppointmentInput(inlineForm);
    if (!res.valid) {
      setInlineErrors(res.errors);
      return;
    }
    setInlineErrors({});
    setInlineConfirmedRef(
      createBookingReference(inlineForm.patientName.length * 91 + inlineForm.phone.length * 43)
    );
  };

  return (
    <div>
      {/* 2. FULL-SCREEN EDITORIAL HERO */}
      <section className="relative bg-[#FFFFFF] border-b border-[#172B45]/10 overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 pt-7 pb-10 lg:pt-16 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 flex flex-col justify-between py-2"
            >
              <div className="space-y-6">
                <p className="text-xs font-semibold tracking-wide text-[#3C76C1]">
                  Multispeciality Clinical Network · Established 1991
                </p>

                <h1 className="font-display text-[36px] sm:text-[46px] lg:text-[54px] font-bold text-[#172B45] leading-[1.08] [text-wrap:balance] max-w-xl">
                  Complete Healthcare. Specialist Expertise. Better Living.
                </h1>

                <p className="text-base sm:text-[17px] text-[#64748B] leading-relaxed max-w-xl">
                  Comprehensive healthcare backed by specialist expertise in Diabetes &amp;
                  Endocrinology, Cardiology, Gastroenterology, Ophthalmology, Nephrology,
                  Neurology, Vascular Surgery, and accredited diagnostics across 50+ centres.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => onOpenBooking()}
                    className="px-6 py-3.5 text-sm font-semibold text-white bg-[#174A80] hover:bg-[#3C76C1] rounded-lg transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    <span>Book Appointment</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      document
                        .getElementById('specialities-section')
                        ?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-3.5 text-sm font-semibold text-[#174A80] bg-[#EAF3FC] hover:bg-[#dcebfa] rounded-lg transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Explore Specialities</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-[#172B45]/10 grid grid-cols-3 gap-4 text-left">
                <div>
                  <p className="text-xs text-[#64748B]">Accreditation</p>
                  <p className="text-sm font-semibold text-[#172B45] mt-0.5">
                    NABH &amp; IDF Excellence
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#64748B]">Research Arm</p>
                  <p className="text-sm font-semibold text-[#172B45] mt-0.5">
                    MDRF · ICMR Centre
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#64748B]">Central Helpline</p>
                  <a
                    href="tel:+914443968888"
                    className="text-sm font-semibold text-[#174A80] hover:underline mt-0.5 block tabular-nums"
                  >
                    044-43968888
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={prefersReduced ? false : { opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 relative rounded-2xl overflow-hidden min-h-[260px] sm:min-h-[340px] lg:min-h-[520px]"
            >
              <ClinicalImage
                src={MEDIA.heroClinical}
                alt="Senior specialist physician at Dr. Mohan's Multispeciality Healthcare Centre"
                eager
                className="w-full h-full"
                imgClassName="lg:h-full object-cover object-[72%_15%]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#172B45]/85 via-[#172B45]/35 to-transparent p-6 sm:p-8 text-white">
                <p className="text-xs font-medium text-[#EAF3FC]">
                  Coordinated Multispeciality Care
                </p>
                <p className="font-display text-lg sm:text-xl font-semibold mt-1 max-w-md">
                  12 clinical departments united under a single electronic medical record across
                  India.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. INSTITUTIONAL CREDIBILITY AND STATISTICS */}
      <section className="bg-[#F7F9FC] border-b border-[#172B45]/10">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 py-12 lg:py-16">
          <RevealSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
              {INSTITUTIONAL_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white border border-[#172B45]/10 rounded-xl p-6 flex flex-col justify-between"
                >
                  <p className="font-display text-3xl sm:text-4xl font-bold text-[#174A80] tabular-nums">
                    <AnimatedStatValue
                      displayValue={stat.value}
                      numericTarget={stat.numericTarget}
                      suffix={stat.suffix}
                    />
                  </p>
                  <div className="mt-4">
                    <h2 className="font-display text-base font-bold text-[#172B45]">
                      {stat.label}
                    </h2>
                    <p className="text-xs text-[#64748B] leading-relaxed mt-1">{stat.context}</p>
                  </div>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* 4. EXPLORE OUR SPECIALITIES */}
      <section id="specialities-section" className="bg-white py-16 lg:py-24 border-b border-[#172B45]/10">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <RevealSection>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#172B45]/10">
              <div className="max-w-2xl space-y-2.5">
                <p className="text-xs font-semibold text-[#3C76C1]">
                  Multispeciality Clinical Excellence
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#172B45] [text-wrap:balance]">
                  Twelve Integrated Departments Built Around Lifelong Organ Health
                </h2>
                <p className="text-[15px] text-[#64748B] leading-relaxed">
                  While diabetes care remains a foundational strength, our centres provide direct
                  access to cardiology, gastroenterology, ophthalmology, nephrology, neurology,
                  vascular surgery, and diagnostic medicine.
                </p>
              </div>

              <div
                role="tablist"
                aria-label="Filter specialities by category"
                className="flex flex-wrap items-center gap-1.5 bg-[#F7F9FC] p-1.5 rounded-lg border border-[#172B45]/10 shrink-0"
              >
                {SPECIALITY_CATEGORIES.map((category) => {
                  const active = specCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setSpecCategory(category)}
                      className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        active
                          ? 'bg-[#174A80] text-white'
                          : 'text-[#172B45]/80 hover:text-[#174A80] hover:bg-white'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>
          </RevealSection>

          {specCategory === 'All' && filteredSpecialities.length > 2 && (
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredSpecialities.slice(0, 2).map((spec, idx) => (
                <motion.article
                  key={spec.slug}
                  initial={prefersReduced ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group bg-[#F7F9FC] border border-[#172B45]/12 rounded-xl overflow-hidden grid grid-cols-1 sm:grid-cols-12 hover:border-[#3C76C1]/60 transition-colors"
                >
                  <div className="sm:col-span-5 aspect-[4/3] sm:aspect-auto overflow-hidden">
                    <ClinicalImage
                      src={spec.heroImage}
                      alt={spec.imageAlt}
                      className="w-full h-full"
                      imgClassName="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="sm:col-span-7 p-6 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <p className="text-xs text-[#64748B]">
                        <span className="font-mono-tabular text-[#3C76C1] font-medium">
                          {spec.index}
                        </span>
                        <span className="mx-2" aria-hidden="true">
                          ·
                        </span>
                        <span>{spec.category}</span>
                      </p>
                      <h3 className="font-display text-xl font-bold text-[#172B45] group-hover:text-[#174A80] transition-colors">
                        {spec.name}
                      </h3>
                      <p className="text-sm text-[#64748B] leading-relaxed">{spec.summary}</p>
                      <ul className="pt-1 space-y-1 text-xs text-[#172B45]/85">
                        {spec.services.slice(0, 2).map((srv) => (
                          <li key={srv} className="truncate">
                            · {srv}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-[#172B45]/10 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => onNavigate({ page: 'speciality', slug: spec.slug })}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#174A80] hover:text-[#3C76C1] cursor-pointer"
                      >
                        <span>Explore Department</span>
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
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          <div
            className={`${
              specCategory === 'All' ? 'mt-6' : 'mt-10'
            } grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}
          >
            {(specCategory === 'All'
              ? filteredSpecialities.slice(2)
              : filteredSpecialities
            ).map((spec, idx) => (
              <motion.article
                key={spec.slug}
                initial={prefersReduced ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.4,
                  delay: Math.min(idx * 0.04, 0.24),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group bg-white border border-[#172B45]/12 rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#3C76C1]/60 transition-colors"
              >
                <div>
                  <div className="aspect-[16/10] w-full overflow-hidden">
                    <ClinicalImage
                      src={spec.heroImage}
                      alt={spec.imageAlt}
                      className="w-full h-full"
                      imgClassName="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
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
                    <h3 className="font-display text-xl font-bold text-[#172B45] group-hover:text-[#174A80] transition-colors">
                      {spec.name}
                    </h3>
                    <p className="text-sm text-[#64748B] leading-relaxed">{spec.summary}</p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-[#172B45]/8 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onNavigate({ page: 'speciality', slug: spec.slug })}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#174A80] hover:text-[#3C76C1] cursor-pointer"
                  >
                    <span>Explore Department</span>
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
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INTEGRATED HEALTHCARE APPROACH */}
      <section className="bg-[#F7F9FC] py-16 lg:py-24 border-b border-[#172B45]/10">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <RevealSection>
            <div className="max-w-2xl space-y-2.5 mb-12">
              <p className="text-xs font-semibold text-[#3C76C1]">
                Integrated Healthcare Approach
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#172B45] [text-wrap:balance]">
                One Coordinated Clinical Pathway Instead of Fragmented Referrals
              </h2>
              <p className="text-[15px] text-[#64748B] leading-relaxed">
                Chronic and multi-system conditions interact across organs. Our clinical teams
                share unified case histories so cardiac, renal, ophthalmic, digestive, and metabolic
                decisions reinforce one another.
              </p>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CARE_PATHWAY.map((step, index) => (
              <RevealSection key={step.number} delay={index * 0.06}>
                <div className="bg-white border border-[#172B45]/10 rounded-xl p-6 h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="font-mono-tabular text-sm font-medium text-[#3C76C1]">
                      {step.number}
                    </span>
                    <h3 className="font-display text-lg font-bold text-[#172B45] leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#64748B] leading-relaxed">{step.description}</p>
                  </div>
                  <p className="mt-6 pt-4 border-t border-[#172B45]/10 text-xs font-semibold text-[#174A80]">
                    {step.outcome}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FIND A SPECIALIST */}
      <section className="bg-white py-16 lg:py-24 border-b border-[#172B45]/10">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <RevealSection>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
              <div className="max-w-xl space-y-2.5">
                <p className="text-xs font-semibold text-[#3C76C1]">Medical Faculty</p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#172B45]">
                  Find a Specialist
                </h2>
                <p className="text-[15px] text-[#64748B]">
                  Consult senior diabetologists, cardiologists, gastroenterologists, ophthalmologists,
                  nephrologists, neurologists, and surgical specialists.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search
                    className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2"
                    aria-hidden="true"
                  />
                  <input
                    type="search"
                    aria-label="Search specialists by name or focus"
                    value={doctorQuery}
                    onChange={(e) => setDoctorQuery(e.target.value)}
                    placeholder="Search doctor or condition..."
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm border border-[#172B45]/18 rounded-lg bg-[#F7F9FC] text-[#172B45]"
                  />
                </div>
                <select
                  aria-label="Filter specialists by city"
                  value={doctorCity}
                  onChange={(e) => setDoctorCity(e.target.value)}
                  className="px-3.5 py-2.5 text-sm border border-[#172B45]/18 rounded-lg bg-[#F7F9FC] text-[#172B45]"
                >
                  <option value="all">All Cities</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Coimbatore">Coimbatore</option>
                  <option value="Kolkata">Kolkata</option>
                </select>
              </div>
            </div>
          </RevealSection>

          {filteredDoctors.length === 0 ? (
            <div className="bg-[#F7F9FC] border border-[#172B45]/10 rounded-xl p-10 text-center space-y-3">
              <p className="font-display text-lg font-semibold text-[#172B45]">
                No specialists match that search in {doctorCity === 'all' ? 'selected cities' : doctorCity}.
              </p>
              <button
                type="button"
                onClick={() => {
                  setDoctorCity('all');
                  setDoctorQuery('');
                }}
                className="text-sm font-semibold text-[#3C76C1] hover:underline cursor-pointer"
              >
                Reset specialist filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doc) => (
                <article
                  key={doc.id}
                  className="bg-white border border-[#172B45]/12 rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#3C76C1]/60 transition-colors"
                >
                  <div className="p-6 flex gap-4 items-start">
                    <ClinicalImage
                      src={doc.image}
                      alt={doc.name}
                      className="w-20 h-24 rounded-lg shrink-0"
                      imgClassName="object-top"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#3C76C1] truncate">
                        {doc.specialityName}
                      </p>
                      <h3 className="font-display text-lg font-bold text-[#172B45] mt-0.5">
                        {doc.name}
                      </h3>
                      <p className="text-xs text-[#64748B] mt-0.5 line-clamp-2">
                        {doc.designation}
                      </p>
                      <p className="text-xs font-medium text-[#174A80] mt-2">
                        {doc.city} · {doc.qualifications.split(',')[0]}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 py-3.5 bg-[#F7F9FC] border-t border-[#172B45]/8 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => onSelectDoctor(doc)}
                      className="text-xs font-semibold text-[#174A80] hover:text-[#3C76C1] cursor-pointer"
                    >
                      View Full Profile
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
                      className="text-xs font-semibold text-white bg-[#174A80] hover:bg-[#3C76C1] px-3.5 py-2 rounded-md transition-colors cursor-pointer"
                    >
                      Book Visit
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={() => onNavigate({ page: 'doctors' })}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#174A80] hover:text-[#3C76C1] cursor-pointer"
            >
              <span>Browse Full Doctor Directory ({DOCTORS.length} Specialists)</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. FIND A CENTRE */}
      <section className="bg-[#F7F9FC] py-16 lg:py-24 border-b border-[#172B45]/10">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <RevealSection>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
              <div className="max-w-xl space-y-2.5">
                <p className="text-xs font-semibold text-[#3C76C1]">Hospital &amp; Clinic Network</p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#172B45]">
                  Find a Centre Near You
                </h2>
                <p className="text-[15px] text-[#64748B]">
                  Access consistent clinical protocols, diagnostic labs, and specialist visits
                  across Tamil Nadu, Telangana, Karnataka, Andhra Pradesh, Kerala, West Bengal,
                  Odisha, and Puducherry.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <select
                  aria-label="Filter centres by state"
                  value={selectedState}
                  onChange={(e) => handleStateChange(e.target.value)}
                  className="px-4 py-2.5 text-sm border border-[#172B45]/18 rounded-lg bg-white text-[#172B45] font-medium"
                >
                  {states.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
                <select
                  aria-label="Filter centres by city"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="px-4 py-2.5 text-sm border border-[#172B45]/18 rounded-lg bg-white text-[#172B45] font-medium"
                >
                  <option value="all">All Cities in {selectedState}</option>
                  {availableCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {previewCentres.map((centre) => (
              <div
                key={centre.id}
                className="bg-white border border-[#172B45]/10 rounded-xl p-6 flex flex-col justify-between gap-4"
              >
                <div className="space-y-2">
                  <p className="text-xs text-[#64748B]">
                    <span className="font-semibold text-[#3C76C1]">{centre.city}</span>
                    <span className="mx-2" aria-hidden="true">
                      ·
                    </span>
                    <span>{centre.state}</span>
                    {centre.accreditation ? (
                      <>
                        <span className="mx-2" aria-hidden="true">
                          ·
                        </span>
                        <span>{centre.accreditation}</span>
                      </>
                    ) : null}
                  </p>
                  <h3 className="font-display text-lg font-bold text-[#172B45]">{centre.name}</h3>
                  <p className="text-sm text-[#64748B] flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#3C76C1] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{centre.address}</span>
                  </p>
                  <p className="text-xs text-[#172B45]/80 tabular-nums">
                    Helpline:{' '}
                    <a
                      href={`tel:${centre.phone.replace(/\D/g, '')}`}
                      className="font-semibold text-[#174A80] hover:underline"
                    >
                      {centre.phone}
                    </a>{' '}
                    · {centre.hours}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#172B45]/10 flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${centre.mapQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#174A80] hover:underline"
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                  <button
                    type="button"
                    onClick={() => onOpenBooking({ centreId: centre.id })}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#174A80] hover:bg-[#3C76C1] rounded-lg transition-colors cursor-pointer"
                  >
                    Book at This Centre
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={() => onNavigate({ page: 'centres' })}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#174A80] hover:text-[#3C76C1] cursor-pointer"
            >
              <span>Open Interactive Centre Finder ({CENTRES.length} Regional Locations)</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* 8. ADVANCED DIAGNOSTIC FACILITIES */}
      <section className="bg-white py-16 lg:py-24 border-b border-[#172B45]/10">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
            <div className="lg:col-span-6 rounded-2xl overflow-hidden min-h-[320px]">
              <ClinicalImage
                src={MEDIA.diagnosticsLab}
                alt="Accredited clinical biochemistry and diagnostic imaging laboratory"
                className="w-full h-full"
                imgClassName="lg:h-full object-cover"
              />
            </div>

            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-semibold text-[#3C76C1]">
                  Accredited Pathology &amp; Imaging
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#172B45] [text-wrap:balance]">
                  Precision Diagnostics Under One Clinical Roof
                </h2>
                <p className="text-[15px] text-[#64748B] leading-relaxed">
                  Faster, more accurate answers mean safer care. Our central and regional
                  diagnostic suites unite automated biochemistry with cardiac, ocular, digestive,
                  vascular, and neurological testing.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  {
                    title: 'HPLC Standardized Biochemistry',
                    desc: 'NGSP-certified HbA1c, insulin, thyroid, lipid, hepatic, and renal biomarkers.',
                  },
                  {
                    title: 'Cardiac & Vascular Imaging',
                    desc: '12-lead ECG, 2D colour Doppler echocardiography, TMT, and arterial duplex.',
                  },
                  {
                    title: 'Ophthalmic & Neuro Screening',
                    desc: 'Digital non-mydriatic fundus cameras, OCT macular scans, and nerve conduction.',
                  },
                  {
                    title: 'GI Endoscopy & Ultrasound',
                    desc: 'High-definition upper GI endoscopy, hepatobiliary ultrasound, and home phlebotomy.',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="p-4 rounded-xl bg-[#F7F9FC] border border-[#172B45]/8 space-y-1"
                  >
                    <h3 className="font-display text-sm font-bold text-[#172B45]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#64748B] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div>
                <button
                  type="button"
                  onClick={() =>
                    onNavigate({ page: 'speciality', slug: 'laboratory-diagnostics' })
                  }
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#174A80] hover:text-[#3C76C1] cursor-pointer"
                >
                  <span>Explore Diagnostic &amp; Home Collection Services</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. WHY CHOOSE DR. MOHAN'S */}
      <section className="bg-[#174A80] text-white py-16 lg:py-24">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <RevealSection>
            <div className="max-w-2xl space-y-2.5 mb-12">
              <p className="text-xs font-semibold text-[#EAF3FC]">Institutional Standards</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white [text-wrap:balance]">
                Why Families &amp; Physicians Trust Dr. Mohan&apos;s
              </h2>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: '01',
                title: 'NABH & Global Quality Benchmarks',
                body: 'Our flagship Gopalapuram facility holds NABH accreditation alongside recognition as an IDF Centre of Excellence and WHO Collaborating Centre.',
              },
              {
                num: '02',
                title: 'True Multispecialist Collaboration',
                body: 'Cardiologists, gastroenterologists, ophthalmologists, nephrologists, neurologists, and podiatrists review complex cases together.',
              },
              {
                num: '03',
                title: 'Research-Driven Protocols',
                body: 'Clinical guidelines are continually refined by peer-reviewed evidence from the Madras Diabetes Research Foundation (MDRF).',
              },
              {
                num: '04',
                title: 'Seamless Family Accessibility',
                body: 'Morning express fasting labs, home blood collection, transparent appointment slots, and compassionate senior-friendly facilities.',
              },
            ].map((pillar) => (
              <div
                key={pillar.num}
                className="bg-white/8 border border-white/15 rounded-xl p-6 space-y-3"
              >
                <span className="font-mono-tabular text-xs font-medium text-[#EAF3FC]">
                  {pillar.num}
                </span>
                <h3 className="font-display text-lg font-bold text-white">{pillar.title}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. RESEARCH AND INNOVATION */}
      <section className="bg-white py-16 lg:py-24 border-b border-[#172B45]/10">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <RevealSection>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
              <div className="lg:col-span-7 space-y-3">
                <p className="text-xs font-semibold text-[#3C76C1]">
                  Research &amp; Innovation · MDRF
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#172B45] [text-wrap:balance]">
                  Translating Scientific Discovery Directly Into Patient Care
                </h2>
                <p className="text-[15px] text-[#64748B] leading-relaxed max-w-2xl">
                  Founded in 1996, our sister institution—the Madras Diabetes Research Foundation
                  (MDRF)—is an ICMR Centre for Advanced Research conducting landmark national
                  studies.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onNavigate({ page: 'research' })}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#174A80] hover:text-[#3C76C1] whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Explore Research &amp; Publications</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 rounded-2xl overflow-hidden aspect-[16/10] border border-[#172B45]/10">
                <ClinicalImage
                  src={MEDIA.mdrfCampus}
                  alt="Madras Diabetes Research Foundation (MDRF) research campus"
                  className="w-full h-full"
                />
              </div>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {RESEARCH_INITIATIVES.map((item) => (
              <article
                key={item.id}
                className="bg-[#F7F9FC] border border-[#172B45]/10 rounded-xl p-6 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-2.5">
                  <p className="text-xs font-semibold text-[#3C76C1]">{item.kicker}</p>
                  <h3 className="font-display text-xl font-bold text-[#172B45]">{item.title}</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">{item.summary}</p>
                </div>
                <p className="pt-4 border-t border-[#172B45]/10 text-xs font-semibold text-[#174A80]">
                  Clinical Impact: {item.impact}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 11. PATIENT STORIES */}
      <section className="bg-[#F7F9FC] py-16 lg:py-24 border-b border-[#172B45]/10">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <RevealSection>
            <div className="max-w-2xl space-y-2.5 mb-12">
              <p className="text-xs font-semibold text-[#3C76C1]">Patient Care Journeys</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#172B45]">
                Outcomes Built Through Early Intervention
              </h2>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {PATIENT_STORIES.map((story) => (
              <article
                key={story.id}
                className="bg-white border border-[#172B45]/10 rounded-xl p-6 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <p className="text-xs text-[#64748B]">
                    <span className="font-semibold text-[#3C76C1]">{story.specialityTag}</span>
                    <span className="mx-2" aria-hidden="true">
                      ·
                    </span>
                    <span>{story.location}</span>
                  </p>
                  <div className="space-y-2.5 text-sm text-[#172B45]/85 leading-relaxed">
                    <p>
                      <span className="font-semibold text-[#172B45]">Presentation: </span>
                      {story.beforeContext}
                    </p>
                    <p>
                      <span className="font-semibold text-[#172B45]">Clinical Care: </span>
                      {story.careProvided}
                    </p>
                    <p>
                      <span className="font-semibold text-[#174A80]">Outcome: </span>
                      {story.outcome}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#172B45]/10 flex items-center justify-between">
                  <p className="font-display text-sm font-bold text-[#172B45]">
                    {story.patientName}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      onNavigate({ page: 'speciality', slug: story.specialitySlug })
                    }
                    className="text-xs font-semibold text-[#3C76C1] hover:underline cursor-pointer"
                  >
                    View Department
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 12. MEDICAL INSIGHTS AND HEALTH EDUCATION */}
      <section id="insights" className="bg-white py-16 lg:py-24 border-b border-[#172B45]/10">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <RevealSection>
            <div className="max-w-2xl space-y-2.5 mb-12">
              <p className="text-xs font-semibold text-[#3C76C1]">
                Medical Insights &amp; Health Education
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#172B45]">
                Clinician-Reviewed Guidance Across Every Speciality
              </h2>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Lead Story */}
            <article className="lg:col-span-6 bg-white border border-[#172B45]/12 rounded-xl overflow-hidden flex flex-col justify-between">
              <div>
                <ClinicalImage
                  src={MEDICAL_ARTICLES[0].image}
                  alt={MEDICAL_ARTICLES[0].title}
                  className="aspect-[16/10] w-full"
                />
                <div className="p-6 sm:p-8 space-y-3">
                  <p className="text-xs text-[#64748B]">
                    <span className="font-semibold text-[#3C76C1]">
                      {MEDICAL_ARTICLES[0].category}
                    </span>
                    <span className="mx-2" aria-hidden="true">
                      ·
                    </span>
                    <span>{MEDICAL_ARTICLES[0].publishedDate}</span>
                    <span className="mx-2" aria-hidden="true">
                      ·
                    </span>
                    <span>{MEDICAL_ARTICLES[0].readTime}</span>
                  </p>
                  <h3 className="font-display text-2xl font-bold text-[#172B45] leading-snug">
                    {MEDICAL_ARTICLES[0].title}
                  </h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">
                    {MEDICAL_ARTICLES[0].excerpt}
                  </p>
                </div>
              </div>
              <div className="px-6 sm:px-8 pb-6 flex items-center justify-between">
                <span className="text-xs text-[#64748B]">
                  Reviewed by {MEDICAL_ARTICLES[0].reviewedBy}
                </span>
                <button
                  type="button"
                  onClick={() => onSelectArticle(MEDICAL_ARTICLES[0])}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#174A80] hover:text-[#3C76C1] cursor-pointer"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </article>

            {/* Secondary Articles */}
            <div className="lg:col-span-6 flex flex-col justify-between gap-5">
              {MEDICAL_ARTICLES.slice(1).map((article) => (
                <article
                  key={article.id}
                  className="bg-[#F7F9FC] border border-[#172B45]/10 rounded-xl p-5 flex flex-col sm:flex-row gap-5 items-start"
                >
                  <ClinicalImage
                    src={article.image}
                    alt={article.title}
                    className="w-full sm:w-40 aspect-[4/3] rounded-lg shrink-0"
                  />
                  <div className="space-y-2 flex-1">
                    <p className="text-xs text-[#64748B]">
                      <span className="font-semibold text-[#3C76C1]">{article.category}</span>
                      <span className="mx-2" aria-hidden="true">
                        ·
                      </span>
                      <span>{article.readTime}</span>
                    </p>
                    <h3 className="font-display text-lg font-bold text-[#172B45] leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs text-[#64748B] line-clamp-2">{article.excerpt}</p>
                    <button
                      type="button"
                      onClick={() => onSelectArticle(article)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#174A80] hover:text-[#3C76C1] pt-1 cursor-pointer"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 13. APPOINTMENT CONVERSION SECTION */}
      <section className="bg-[#EAF3FC]/55 py-16 lg:py-24">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <div className="bg-white border border-[#172B45]/12 rounded-2xl p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-5">
              <p className="text-xs font-semibold text-[#3C76C1]">Patient Appointment Desk</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#172B45] [text-wrap:balance]">
                Schedule a Consultation Across Any Speciality
              </h2>
              <p className="text-[15px] text-[#64748B] leading-relaxed">
                Select your department and preferred centre. Our care coordinators confirm your
                exact consultation slot and fasting instructions if diagnostics are needed.
              </p>

              <div className="pt-4 border-t border-[#172B45]/10 space-y-3">
                <a
                  href="tel:+914443968888"
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-[#F7F9FC] border border-[#172B45]/10 hover:border-[#3C76C1]/50 transition-colors"
                >
                  <Phone className="w-5 h-5 text-[#174A80]" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-[#64748B]">Central Appointment Helpline</p>
                    <p className="text-sm font-bold text-[#172B45] tabular-nums">044-43968888</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/919384848888?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-[#F7F9FC] border border-[#172B45]/10 hover:border-[#3C76C1]/50 transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-[#174A80]" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-[#64748B]">WhatsApp Appointment Assistance</p>
                    <p className="text-sm font-bold text-[#172B45]">Chat with Care Desk</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              {inlineConfirmedRef ? (
                <div className="bg-[#F7F9FC] border border-[#172B45]/12 rounded-xl p-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#174A80]" />
                    <h3 className="font-display text-xl font-bold text-[#172B45]">
                      Appointment Logged · {inlineConfirmedRef}
                    </h3>
                  </div>
                  <p className="text-sm text-[#172B45]/85">
                    Thank you, <span className="font-semibold">{inlineForm.patientName}</span>. Our
                    team will confirm your slot via{' '}
                    <span className="font-semibold tabular-nums">{inlineForm.phone}</span>.
                  </p>
                  <button
                    type="button"
                    onClick={() => setInlineConfirmedRef(null)}
                    className="px-4 py-2 text-xs font-semibold text-[#174A80] bg-[#EAF3FC] rounded-lg cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInlineSubmit} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="home-patient-name"
                        className="block text-xs font-semibold text-[#172B45] mb-1.5"
                      >
                        Patient Name *
                      </label>
                      <input
                        id="home-patient-name"
                        type="text"
                        value={inlineForm.patientName}
                        onChange={(e) =>
                          setInlineForm({ ...inlineForm, patientName: e.target.value })
                        }
                        placeholder="Full name"
                        className="w-full px-3.5 py-2.5 text-sm border border-[#172B45]/18 rounded-lg bg-[#F7F9FC] text-[#172B45]"
                      />
                      {inlineErrors.patientName && (
                        <p className="text-xs text-red-700 mt-1">{inlineErrors.patientName}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="home-phone"
                        className="block text-xs font-semibold text-[#172B45] mb-1.5"
                      >
                        Mobile Number *
                      </label>
                      <input
                        id="home-phone"
                        type="tel"
                        value={inlineForm.phone}
                        onChange={(e) => setInlineForm({ ...inlineForm, phone: e.target.value })}
                        placeholder="+91 98400 00000"
                        className="w-full px-3.5 py-2.5 text-sm border border-[#172B45]/18 rounded-lg bg-[#F7F9FC] text-[#172B45]"
                      />
                      {inlineErrors.phone && (
                        <p className="text-xs text-red-700 mt-1">{inlineErrors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="home-speciality"
                        className="block text-xs font-semibold text-[#172B45] mb-1.5"
                      >
                        Speciality *
                      </label>
                      <select
                        id="home-speciality"
                        value={inlineForm.specialitySlug}
                        onChange={(e) =>
                          setInlineForm({ ...inlineForm, specialitySlug: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-sm border border-[#172B45]/18 rounded-lg bg-[#F7F9FC] text-[#172B45]"
                      >
                        {SPECIALITIES.map((s) => (
                          <option key={s.slug} value={s.slug}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="home-centre"
                        className="block text-xs font-semibold text-[#172B45] mb-1.5"
                      >
                        Centre *
                      </label>
                      <select
                        id="home-centre"
                        value={inlineForm.centreId}
                        onChange={(e) =>
                          setInlineForm({ ...inlineForm, centreId: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-sm border border-[#172B45]/18 rounded-lg bg-[#F7F9FC] text-[#172B45]"
                      >
                        {CENTRES.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.city} — {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="home-date"
                        className="block text-xs font-semibold text-[#172B45] mb-1.5"
                      >
                        Preferred Date *
                      </label>
                      <input
                        id="home-date"
                        type="date"
                        value={inlineForm.preferredDate}
                        onChange={(e) =>
                          setInlineForm({ ...inlineForm, preferredDate: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-sm border border-[#172B45]/18 rounded-lg bg-[#F7F9FC] text-[#172B45]"
                      />
                      {inlineErrors.preferredDate && (
                        <p className="text-xs text-red-700 mt-1">{inlineErrors.preferredDate}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="home-slot"
                        className="block text-xs font-semibold text-[#172B45] mb-1.5"
                      >
                        Preferred Window
                      </label>
                      <select
                        id="home-slot"
                        value={inlineForm.preferredSlot}
                        onChange={(e) =>
                          setInlineForm({ ...inlineForm, preferredSlot: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-sm border border-[#172B45]/18 rounded-lg bg-[#F7F9FC] text-[#172B45]"
                      >
                        <option value="08:00 AM – 10:00 AM">08:00 AM – 10:00 AM</option>
                        <option value="10:00 AM – 12:30 PM">10:00 AM – 12:30 PM</option>
                        <option value="02:00 PM – 04:30 PM">02:00 PM – 04:30 PM</option>
                        <option value="04:30 PM – 06:30 PM">04:30 PM – 06:30 PM</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-white bg-[#174A80] hover:bg-[#3C76C1] rounded-lg transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    <span>Request Appointment</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

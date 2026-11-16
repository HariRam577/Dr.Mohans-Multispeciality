import { useState, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  Award,
  BookOpen,
  Building2,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Eye,
  FlaskConical,
  HeartHandshake,
  HeartPulse,
  MapPin,
  MessageCircle,
  Microscope,
  Phone,
  Quote,
  Scan,
  Search,
  ShieldCheck,
  Stethoscope,
  Users,
} from 'lucide-react';
import type { BookingPrefill } from '../components/AppointmentDrawer';
import { SpecialityIconBadge } from '../components/ClinicalIcons';
import { ClinicalImage } from '../components/ClinicalImage';
import {
  AnimatedStatValue,
  RevealSection,
  StaggerGrid,
  StaggerItem,
} from '../components/MotionPrimitives';
import type { AppRoute } from '../components/Navbar';
import { CENTRES } from '../data/centres';
import { DOCTORS, type Doctor } from '../data/doctors';
import {
  CARE_PATHWAY,
  INSTITUTIONAL_STATS,
  MEDICAL_ARTICLES,
  PATIENT_STORIES,
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

const STAT_ICONS = [Award, Building2, Stethoscope, MapPin];
const PATHWAY_ICONS = [ShieldCheck, Users, Microscope, HeartHandshake];
const PILLAR_ICONS = [Award, Users, ShieldCheck, HeartHandshake];

export function HomePage({
  onNavigate,
  onOpenBooking,
  onSelectDoctor,
  onSelectArticle,
}: HomePageProps) {
  const prefersReduced = useReducedMotion();

  // Specialities filter state
  const [specCategory, setSpecCategory] = useState<string>('All');
  const filteredSpecialities = filterSpecialities(SPECIALITIES, specCategory);

  // Specialist quick filter state
  const [doctorCity, setDoctorCity] = useState<string>('all');
  const [doctorQuery, setDoctorQuery] = useState<string>('');
  const filteredDoctors = filterDoctors(DOCTORS, {
    city: doctorCity,
    query: doctorQuery,
  }).slice(0, 6);

  // Centre finder quick filter state
  const states = getUniqueStates(CENTRES);
  const [selectedState, setSelectedState] = useState<string>('Tamil Nadu');
  const availableCities = getCitiesForState(CENTRES, selectedState);
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const previewCentres = filterCentres(CENTRES, {
    state: selectedState,
    city: selectedCity,
  }).slice(0, 4);

  // Inline conversion form state
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
      {/* 1. HERO SECTION — ANIMATED NAVY/BLUE/CYAN GRADIENT WITH FLOATING MEDICAL MOTIFS */}
      <section className="relative hero-animated-mesh text-white border-b border-[#19B6C9]/25 overflow-hidden">
        {/* Subtle floating abstract medical-inspired geometric motifs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="animate-soft-glow absolute -top-28 -right-24 w-[460px] h-[460px] rounded-full bg-[radial-gradient(circle,rgba(25,182,201,0.22)_0%,transparent_68%)]" />
          <div className="animate-soft-glow absolute -bottom-32 -left-24 w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(23,105,170,0.34)_0%,transparent_70%)]" />
          <svg
            className="animate-float-gentle absolute top-14 right-[44%] w-24 h-24 text-[#6CE3F0]/22 hidden lg:block"
            viewBox="0 0 96 96"
            fill="none"
          >
            <rect x="38" y="10" width="20" height="76" rx="6" stroke="currentColor" strokeWidth="2" />
            <rect x="10" y="38" width="76" height="20" rx="6" stroke="currentColor" strokeWidth="2" />
          </svg>
          <svg
            className="animate-float-gentle-alt absolute bottom-16 left-[46%] w-28 h-28 text-white/14 hidden lg:block"
            viewBox="0 0 112 112"
            fill="none"
          >
            <circle cx="56" cy="56" r="46" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" />
            <circle cx="56" cy="56" r="28" stroke="#6CE3F0" strokeOpacity="0.4" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-8 pt-8 pb-12 lg:pt-16 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-between py-2">
              <div className="space-y-6">
                <motion.p
                  initial={prefersReduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-wide text-[#7CE5F2]"
                >
                  <Award className="w-4 h-4 text-[#19B6C9]" aria-hidden="true" />
                  <span>Multispeciality Clinical Network · Established 1991</span>
                </motion.p>

                <motion.h1
                  initial={prefersReduced ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.48, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-[36px] sm:text-[46px] lg:text-[54px] font-bold text-white leading-[1.08] [text-wrap:balance] max-w-xl"
                >
                  Complete Healthcare.{' '}
                  <span className="text-[#19B6C9]">Specialist Expertise.</span> Better Living.
                </motion.h1>

                <motion.p
                  initial={prefersReduced ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.48, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className="text-base sm:text-[17px] text-[#EAF5FC]/90 leading-relaxed max-w-xl"
                >
                  Comprehensive healthcare backed by specialist expertise in Diabetes &amp;
                  Endocrinology, Cardiology, Gastroenterology, Ophthalmology, Nephrology,
                  Neurology, Vascular Surgery, and accredited diagnostics across 50+ centres.
                </motion.p>

                <motion.div
                  initial={prefersReduced ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.46, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  className="pt-2 flex flex-wrap items-center gap-4"
                >
                  <motion.button
                    type="button"
                    whileHover={prefersReduced ? undefined : { y: -2 }}
                    whileTap={prefersReduced ? undefined : { scale: 0.98 }}
                    onClick={() => onOpenBooking()}
                    className="px-6 py-3.5 text-sm font-bold text-[#102A5E] bg-[#19B6C9] hover:bg-white rounded-xl transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer shadow-[0_12px_28px_-8px_rgba(25,182,201,0.55)]"
                  >
                    <Calendar className="w-4 h-4 text-[#102A5E]" aria-hidden="true" />
                    <span>Book Appointment</span>
                  </motion.button>

                  <motion.button
                    type="button"
                    whileHover={prefersReduced ? undefined : { y: -2 }}
                    whileTap={prefersReduced ? undefined : { scale: 0.98 }}
                    onClick={() => {
                      document
                        .getElementById('specialities-section')
                        ?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-3.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 rounded-xl transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Explore Specialities</span>
                    <ArrowRight className="w-4 h-4 text-[#19B6C9]" aria-hidden="true" />
                  </motion.button>
                </motion.div>
              </div>

              <motion.div
                initial={prefersReduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.48, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="mt-10 pt-6 border-t border-white/15 grid grid-cols-3 gap-4 text-left"
              >
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#19B6C9] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-[#EAF5FC]/70">Accreditation</p>
                    <p className="text-sm font-bold text-white mt-0.5">
                      NABH &amp; IDF Excellence
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Building2 className="w-4 h-4 text-[#19B6C9] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-[#EAF5FC]/70">Hospital Network</p>
                    <p className="text-sm font-bold text-white mt-0.5">
                      50+ Centres · 30+ Cities
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-[#19B6C9] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-[#EAF5FC]/70">Central Helpline</p>
                    <a
                      href="tel:+914443968888"
                      className="text-sm font-bold text-[#7CE5F2] hover:text-white hover:underline mt-0.5 block tabular-nums"
                    >
                      044-43968888
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={prefersReduced ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 relative rounded-[20px] overflow-hidden min-h-[260px] sm:min-h-[340px] lg:min-h-[520px] border border-white/20 shadow-[0_28px_60px_-15px_rgba(10,24,58,0.65)]"
            >
              <ClinicalImage
                src={MEDIA.heroClinical}
                alt="Senior specialist physician at Dr. Mohan's Multispeciality Healthcare Centre"
                eager
                className="w-full h-full"
                imgClassName="lg:h-full object-cover object-[72%_15%]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#102A5E]/95 via-[#102A5E]/55 to-transparent p-6 sm:p-8 text-white border-t border-white/10">
                <p className="text-xs font-bold text-[#7CE5F2]">
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

      {/* 2. STATISTICS — WHITE SECTION */}
      <section className="bg-white border-b border-[#DCE7F1]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 py-12 lg:py-16">
          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
            {INSTITUTIONAL_STATS.map((stat, idx) => {
              const Icon = STAT_ICONS[idx % STAT_ICONS.length];
              return (
                <StaggerItem key={stat.label}>
                  <div className="h-full bg-[#F7FAFD] border border-[#DCE7F1] hover:border-[#19B6C9] rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-[0_14px_32px_-12px_rgba(23,105,170,0.18)]">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-display text-3xl sm:text-4xl font-bold text-[#102A5E] tabular-nums">
                        <AnimatedStatValue
                          displayValue={stat.value}
                          numericTarget={stat.numericTarget}
                          suffix={stat.suffix}
                        />
                      </p>
                      <span
                        className="w-10 h-10 rounded-xl bg-[#EAF5FC] border border-[#DCE7F1] text-[#1769AA] inline-flex items-center justify-center shrink-0"
                        aria-hidden="true"
                      >
                        <Icon className="w-5 h-5" />
                      </span>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#DCE7F1]">
                      <h2 className="font-display text-base font-bold text-[#172B43]">
                        {stat.label}
                      </h2>
                      <p className="text-xs text-[#64748B] leading-relaxed mt-1">{stat.context}</p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        </div>
      </section>

      {/* 3. EXPLORE OUR SPECIALITIES — ICE BLUE SECTION */}
      <section
        id="specialities-section"
        className="bg-[#EAF5FC] py-16 lg:py-24 border-b border-[#DCE7F1]"
      >
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <RevealSection>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#DCE7F1]">
              <div className="max-w-2xl space-y-2.5">
                <p className="inline-flex items-center gap-2 text-xs font-bold text-[#1769AA]">
                  <Stethoscope className="w-4 h-4 text-[#19B6C9]" aria-hidden="true" />
                  <span>Multispeciality Clinical Excellence</span>
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#102A5E] [text-wrap:balance]">
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
                className="flex flex-wrap items-center gap-1 bg-white p-1.5 rounded-xl border border-[#DCE7F1] shrink-0 shadow-xs"
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
                      className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        active
                          ? 'bg-[#1769AA] text-white shadow-xs'
                          : 'text-[#172B43] hover:text-[#1769AA] hover:bg-[#EAF5FC]'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>
          </RevealSection>

          {specCategory === 'All' && filteredSpecialities.length > 3 && (
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {filteredSpecialities.slice(0, 3).map((spec, idx) => (
                <motion.article
                  key={spec.slug}
                  initial={prefersReduced ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: 0.42,
                    delay: idx * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group bg-[#102A5E] text-white border border-[#1769AA]/60 hover:border-[#19B6C9] rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-[0_14px_34px_-12px_rgba(16,42,94,0.35)] hover:shadow-[0_22px_44px_-14px_rgba(25,182,201,0.35)]"
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
                    <div className="p-6 space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs text-[#EAF5FC]/80">
                          <span className="font-mono-tabular text-[#7CE5F2] font-bold">
                            {spec.index}
                          </span>
                          <span className="mx-2" aria-hidden="true">
                            ·
                          </span>
                          <span>{spec.category}</span>
                        </p>
                        <SpecialityIconBadge slug={spec.slug} tone="cyan" size="sm" />
                      </div>
                      <h3 className="font-display text-xl font-bold text-white group-hover:text-[#7CE5F2] transition-colors">
                        {spec.name}
                      </h3>
                      <p className="text-sm text-[#EAF5FC]/85 leading-relaxed">{spec.summary}</p>
                      <ul className="pt-1 space-y-1 text-xs text-[#EAF5FC]/80">
                        {spec.services.slice(0, 2).map((srv) => (
                          <li key={srv} className="truncate">
                            · {srv}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="px-6 py-4 border-t border-white/15 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => onNavigate({ page: 'speciality', slug: spec.slug })}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[#7CE5F2] hover:text-white transition-colors cursor-pointer"
                    >
                      <span>Explore Department</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenBooking({ specialitySlug: spec.slug })}
                      className="px-3.5 py-1.5 text-xs font-bold text-[#102A5E] bg-[#19B6C9] hover:bg-white rounded-xl transition-colors cursor-pointer"
                    >
                      Book Visit
                    </button>
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
              ? filteredSpecialities.slice(3)
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
                className="group bg-white border border-[#DCE7F1] hover:border-[#19B6C9] rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-[0_8px_24px_-12px_rgba(16,42,94,0.12)] hover:shadow-[0_20px_40px_-14px_rgba(23,105,170,0.22)]"
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
                  <div className="p-6 space-y-2.5">
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
                    <h3 className="font-display text-xl font-bold text-[#102A5E] group-hover:text-[#1769AA] transition-colors">
                      {spec.name}
                    </h3>
                    <p className="text-sm text-[#64748B] leading-relaxed">{spec.summary}</p>
                  </div>
                </div>

                <div className="px-6 py-4 bg-[#F7FAFD] border-t border-[#DCE7F1] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onNavigate({ page: 'speciality', slug: spec.slug })}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1769AA] hover:text-[#102A5E] transition-colors cursor-pointer"
                  >
                    <span>Explore Department</span>
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
        </div>
      </section>

      {/* 4. COORDINATED CLINICAL PATHWAY — WHITE SECTION */}
      <section className="bg-white py-16 lg:py-24 border-b border-[#DCE7F1]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <RevealSection>
            <div className="max-w-2xl space-y-2.5 mb-12">
              <p className="inline-flex items-center gap-2 text-xs font-bold text-[#1769AA]">
                <HeartHandshake className="w-4 h-4 text-[#19B6C9]" aria-hidden="true" />
                <span>Integrated Healthcare Approach</span>
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#102A5E] [text-wrap:balance]">
                One Coordinated Clinical Pathway Instead of Fragmented Referrals
              </h2>
              <p className="text-[15px] text-[#64748B] leading-relaxed">
                Chronic and multi-system conditions interact across organs. Our clinical teams
                share unified case histories so cardiac, renal, ophthalmic, digestive, and metabolic
                decisions reinforce one another.
              </p>
            </div>
          </RevealSection>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CARE_PATHWAY.map((step, index) => {
              const Icon = PATHWAY_ICONS[index % PATHWAY_ICONS.length];
              return (
                <StaggerItem key={step.number}>
                  <div className="bg-[#F7FAFD] border border-[#DCE7F1] hover:border-[#19B6C9] hover:bg-white rounded-2xl p-6 h-full flex flex-col justify-between transition-all duration-200 hover:shadow-[0_14px_30px_-12px_rgba(23,105,170,0.16)]">
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono-tabular text-xs font-bold text-[#1769AA] tracking-wide">
                          Step {step.number}
                        </span>
                        <span
                          className="w-10 h-10 rounded-xl bg-[#EAF5FC] border border-[#DCE7F1] text-[#1769AA] inline-flex items-center justify-center"
                          aria-hidden="true"
                        >
                          <Icon className="w-4 h-4" />
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-[#102A5E] leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-sm text-[#64748B] leading-relaxed">{step.description}</p>
                    </div>
                    <p className="mt-6 pt-4 border-t border-[#DCE7F1] text-xs font-semibold text-[#1769AA]">
                      {step.outcome}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        </div>
      </section>

      {/* 5. FIND A SPECIALIST — ICE BLUE SECTION */}
      <section className="bg-[#EAF5FC] py-16 lg:py-24 border-b border-[#DCE7F1]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <RevealSection>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
              <div className="max-w-xl space-y-2.5">
                <p className="inline-flex items-center gap-2 text-xs font-bold text-[#1769AA]">
                  <Users className="w-4 h-4 text-[#19B6C9]" aria-hidden="true" />
                  <span>Medical Faculty</span>
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#102A5E]">
                  Find a Specialist
                </h2>
                <p className="text-[15px] text-[#64748B]">
                  Consult senior diabetologists, cardiologists, gastroenterologists,
                  ophthalmologists, nephrologists, neurologists, and surgical specialists.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search
                    className="w-4 h-4 text-[#1769AA] absolute left-3.5 top-1/2 -translate-y-1/2"
                    aria-hidden="true"
                  />
                  <input
                    type="search"
                    aria-label="Search specialists by name or focus"
                    value={doctorQuery}
                    onChange={(e) => setDoctorQuery(e.target.value)}
                    placeholder="Search doctor or condition..."
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm border border-[#DCE7F1] rounded-xl bg-white text-[#172B43] placeholder:text-[#64748B] focus:border-[#1769AA]"
                  />
                </div>
                <select
                  aria-label="Filter specialists by city"
                  value={doctorCity}
                  onChange={(e) => setDoctorCity(e.target.value)}
                  className="px-3.5 py-2.5 text-sm border border-[#DCE7F1] rounded-xl bg-white text-[#172B43] font-medium focus:border-[#1769AA]"
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
            <div className="bg-white border border-[#DCE7F1] rounded-2xl p-10 text-center space-y-3">
              <p className="font-display text-lg font-semibold text-[#102A5E]">
                No specialists match that search in{' '}
                {doctorCity === 'all' ? 'selected cities' : doctorCity}.
              </p>
              <button
                type="button"
                onClick={() => {
                  setDoctorCity('all');
                  setDoctorQuery('');
                }}
                className="text-sm font-bold text-[#1769AA] hover:underline cursor-pointer"
              >
                Reset specialist filters
              </button>
            </div>
          ) : (
            <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doc) => (
                <StaggerItem key={doc.id}>
                  <article className="group h-full bg-white border border-[#DCE7F1] hover:border-[#19B6C9] rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-[0_8px_24px_-12px_rgba(16,42,94,0.1)] hover:shadow-[0_18px_36px_-14px_rgba(23,105,170,0.22)]">
                    <div className="p-6 flex gap-4 items-start">
                      <ClinicalImage
                        src={doc.image}
                        alt={doc.name}
                        className="w-20 h-24 rounded-xl shrink-0 border border-[#DCE7F1]"
                        imgClassName="object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-bold text-[#1769AA] truncate">
                            {doc.specialityName}
                          </p>
                          <SpecialityIconBadge slug={doc.specialitySlug} tone="ice" size="sm" />
                        </div>
                        <h3 className="font-display text-lg font-bold text-[#102A5E] mt-1 group-hover:text-[#1769AA] transition-colors">
                          {doc.name}
                        </h3>
                        <p className="text-xs text-[#64748B] mt-0.5 line-clamp-2">
                          {doc.designation}
                        </p>
                        <p className="text-xs font-semibold text-[#172B43] mt-2">
                          {doc.city} · {doc.qualifications.split(',')[0]}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 py-3.5 bg-[#F7FAFD] border-t border-[#DCE7F1] flex items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={() => onSelectDoctor(doc)}
                        className="text-xs font-bold text-[#1769AA] hover:text-[#102A5E] hover:underline cursor-pointer"
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
                        className="text-xs font-bold text-white bg-[#1769AA] hover:bg-[#102A5E] px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
                      >
                        Book Visit
                      </button>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </StaggerGrid>
          )}

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={() => onNavigate({ page: 'doctors' })}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#102A5E] text-white hover:bg-[#1769AA] text-sm font-bold cursor-pointer transition-colors"
            >
              <span>Browse Full Doctor Directory ({DOCTORS.length} Specialists)</span>
              <ArrowRight className="w-4 h-4 text-[#19B6C9]" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. FIND A CENTRE — PRIMARY NAVY ANCHOR BAND */}
      <section className="bg-[#102A5E] text-white py-16 lg:py-24 border-y border-[#1769AA]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <RevealSection>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
              <div className="max-w-xl space-y-2.5">
                <p className="inline-flex items-center gap-2 text-xs font-bold text-[#7CE5F2]">
                  <MapPin className="w-4 h-4 text-[#19B6C9]" aria-hidden="true" />
                  <span>Hospital &amp; Clinic Network</span>
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                  Find a Centre Near You
                </h2>
                <p className="text-[15px] text-[#EAF5FC]/80">
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
                  className="px-4 py-2.5 text-sm border border-white/25 rounded-xl bg-[#0A1E47] text-white font-semibold"
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
                  className="px-4 py-2.5 text-sm border border-white/25 rounded-xl bg-[#0A1E47] text-white font-semibold"
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
                className="bg-white text-[#172B43] border border-[#DCE7F1] hover:border-[#19B6C9] rounded-2xl p-6 flex flex-col justify-between gap-4 shadow-md transition-colors"
              >
                <div className="space-y-2.5">
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
                      <h3 className="font-display text-lg font-bold text-[#102A5E] mt-0.5">
                        {centre.name}
                      </h3>
                    </div>
                    <span
                      className="w-10 h-10 rounded-xl bg-[#EAF5FC] border border-[#DCE7F1] text-[#1769AA] inline-flex items-center justify-center shrink-0"
                      aria-hidden="true"
                    >
                      <Building2 className="w-4 h-4" />
                    </span>
                  </div>

                  <p className="text-sm text-[#64748B] flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#1769AA] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{centre.address}</span>
                  </p>
                  <p className="text-xs text-[#172B43] tabular-nums flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#1769AA]" aria-hidden="true" />
                    <a
                      href={`tel:${centre.phone.replace(/\D/g, '')}`}
                      className="font-bold text-[#1769AA] hover:underline"
                    >
                      {centre.phone}
                    </a>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#64748B]">{centre.hours}</span>
                  </p>
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
                    onClick={() => onOpenBooking({ centreId: centre.id })}
                    className="px-4 py-2 text-xs font-bold text-white bg-[#1769AA] hover:bg-[#102A5E] rounded-xl transition-colors cursor-pointer"
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#19B6C9] text-[#102A5E] hover:bg-white text-sm font-bold cursor-pointer transition-colors"
            >
              <span>Open Interactive Centre Finder ({CENTRES.length} Regional Locations)</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. DIAGNOSTICS — WHITE SECTION */}
      <section className="bg-white py-16 lg:py-24 border-b border-[#DCE7F1]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
            <div className="lg:col-span-6 rounded-[20px] overflow-hidden min-h-[320px] border border-[#DCE7F1] shadow-[0_18px_40px_-18px_rgba(16,42,94,0.2)]">
              <ClinicalImage
                src={MEDIA.diagnosticsLab}
                alt="Accredited clinical biochemistry and diagnostic imaging laboratory"
                className="w-full h-full"
                imgClassName="lg:h-full object-cover"
              />
            </div>

            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <div className="space-y-3">
                <p className="inline-flex items-center gap-2 text-xs font-bold text-[#1769AA]">
                  <FlaskConical className="w-4 h-4 text-[#19B6C9]" aria-hidden="true" />
                  <span>Accredited Pathology &amp; Imaging</span>
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#102A5E] [text-wrap:balance]">
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
                    icon: FlaskConical,
                    title: 'HPLC Standardized Biochemistry',
                    desc: 'NGSP-certified HbA1c, insulin, thyroid, lipid, hepatic, and renal biomarkers.',
                  },
                  {
                    icon: HeartPulse,
                    title: 'Cardiac & Vascular Imaging',
                    desc: '12-lead ECG, 2D colour Doppler echocardiography, TMT, and arterial duplex.',
                  },
                  {
                    icon: Eye,
                    title: 'Ophthalmic & Neuro Screening',
                    desc: 'Digital non-mydriatic fundus cameras, OCT macular scans, and nerve conduction.',
                  },
                  {
                    icon: Scan,
                    title: 'GI Endoscopy & Ultrasound',
                    desc: 'High-definition upper GI endoscopy, hepatobiliary ultrasound, and home phlebotomy.',
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="p-5 rounded-2xl bg-[#F7FAFD] border border-[#DCE7F1] hover:border-[#19B6C9] hover:bg-white space-y-2 transition-all duration-200"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-9 h-9 rounded-xl bg-[#EAF5FC] border border-[#DCE7F1] text-[#1769AA] inline-flex items-center justify-center shrink-0"
                          aria-hidden="true"
                        >
                          <Icon className="w-4 h-4" />
                        </span>
                        <h3 className="font-display text-sm font-bold text-[#102A5E]">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-xs text-[#64748B] leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>

              <div>
                <button
                  type="button"
                  onClick={() =>
                    onNavigate({ page: 'speciality', slug: 'laboratory-diagnostics' })
                  }
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1769AA] text-white hover:bg-[#102A5E] text-sm font-bold cursor-pointer transition-colors"
                >
                  <span>Explore Diagnostic &amp; Home Collection Services</span>
                  <ArrowRight className="w-4 h-4 text-[#19B6C9]" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. WHY FAMILIES & PHYSICIANS TRUST US — ICE BLUE SECTION */}
      <section className="bg-[#EAF5FC] py-16 lg:py-24 border-b border-[#DCE7F1]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <RevealSection>
            <div className="max-w-2xl space-y-2.5 mb-12">
              <p className="inline-flex items-center gap-2 text-xs font-bold text-[#1769AA]">
                <Award className="w-4 h-4 text-[#19B6C9]" aria-hidden="true" />
                <span>Institutional Standards</span>
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#102A5E] [text-wrap:balance]">
                Why Families &amp; Physicians Trust Dr. Mohan&apos;s
              </h2>
            </div>
          </RevealSection>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                title: 'Evidence-Based Clinical Protocols',
                body: 'Clinical pathways are continually refined by decades of international clinical standards and longitudinal multi-organ patient outcomes.',
              },
              {
                num: '04',
                title: 'Seamless Family Accessibility',
                body: 'Morning express fasting labs, home blood collection, transparent appointment slots, and compassionate senior-friendly facilities.',
              },
            ].map((pillar, idx) => {
              const Icon = PILLAR_ICONS[idx % PILLAR_ICONS.length];
              return (
                <StaggerItem key={pillar.num}>
                  <div className="h-full bg-white border border-[#DCE7F1] hover:border-[#19B6C9] rounded-2xl p-6 space-y-3 transition-all duration-200 hover:shadow-[0_14px_30px_-12px_rgba(23,105,170,0.18)]">
                    <div className="flex items-center justify-between">
                      <span className="font-mono-tabular text-xs font-bold text-[#1769AA]">
                        {pillar.num}
                      </span>
                      <span
                        className="w-9 h-9 rounded-xl bg-[#EAF5FC] border border-[#DCE7F1] text-[#1769AA] inline-flex items-center justify-center"
                        aria-hidden="true"
                      >
                        <Icon className="w-4 h-4" />
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#102A5E]">{pillar.title}</h3>
                    <p className="text-sm text-[#64748B] leading-relaxed">{pillar.body}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        </div>
      </section>

      {/* 9. PATIENT OUTCOMES — WHITE SECTION */}
      <section className="bg-white py-16 lg:py-24 border-b border-[#DCE7F1]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <RevealSection>
            <div className="max-w-2xl space-y-2.5 mb-12">
              <p className="inline-flex items-center gap-2 text-xs font-bold text-[#1769AA]">
                <HeartHandshake className="w-4 h-4 text-[#19B6C9]" aria-hidden="true" />
                <span>Patient Care Journeys</span>
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#102A5E]">
                Outcomes Built Through Early Intervention
              </h2>
            </div>
          </RevealSection>

          <StaggerGrid className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {PATIENT_STORIES.map((story) => (
              <StaggerItem key={story.id}>
                <article className="h-full bg-[#F7FAFD] border border-[#DCE7F1] hover:border-[#19B6C9] rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:shadow-[0_14px_30px_-12px_rgba(23,105,170,0.16)]">
                  <div>
                    <div className="bg-[#102A5E] text-white px-6 py-4 border-b border-[#1769AA] flex items-center justify-between gap-2">
                      <p className="text-xs font-bold text-[#19B6C9] truncate">
                        {story.specialityTag}
                      </p>
                      <Quote className="w-4 h-4 text-[#19B6C9] shrink-0" aria-hidden="true" />
                    </div>
                    <div className="p-6 space-y-3 text-sm text-[#172B43] leading-relaxed">
                      <p className="text-xs font-semibold text-[#64748B]">{story.location}</p>
                      <p>
                        <span className="font-bold text-[#102A5E]">Presentation: </span>
                        {story.beforeContext}
                      </p>
                      <p>
                        <span className="font-bold text-[#102A5E]">Clinical Care: </span>
                        {story.careProvided}
                      </p>
                      <p>
                        <span className="font-bold text-[#1769AA]">Outcome: </span>
                        {story.outcome}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 py-4 bg-white border-t border-[#DCE7F1] flex items-center justify-between">
                    <p className="font-display text-sm font-bold text-[#102A5E]">
                      {story.patientName}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        onNavigate({ page: 'speciality', slug: story.specialitySlug })
                      }
                      className="text-xs font-bold text-[#1769AA] hover:text-[#102A5E] hover:underline cursor-pointer"
                    >
                      View Department →
                    </button>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* 10. CLINICAL GUIDANCE & HEALTH EDUCATION — ICE BLUE SECTION */}
      <section id="insights" className="bg-[#EAF5FC] py-16 lg:py-24 border-b border-[#DCE7F1]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <RevealSection>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div className="max-w-2xl space-y-2.5">
                <p className="inline-flex items-center gap-2 text-xs font-bold text-[#1769AA]">
                  <BookOpen className="w-4 h-4 text-[#19B6C9]" aria-hidden="true" />
                  <span>Medical Insights &amp; Health Education</span>
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#102A5E]">
                  Clinician-Reviewed Guidance Across Every Speciality
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigate({ page: 'education' })}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#102A5E] text-white hover:bg-[#1769AA] text-xs font-bold shrink-0 cursor-pointer transition-colors"
              >
                <span>Open Education Academy &amp; Blog</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#19B6C9]" aria-hidden="true" />
              </button>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Lead Story */}
            <article className="group lg:col-span-6 bg-[#102A5E] text-white border border-[#1769AA] rounded-2xl overflow-hidden flex flex-col justify-between shadow-[0_14px_34px_-12px_rgba(16,42,94,0.3)]">
              <div>
                <div className="aspect-[16/10] w-full overflow-hidden">
                  <ClinicalImage
                    src={MEDICAL_ARTICLES[0].image}
                    alt={MEDICAL_ARTICLES[0].title}
                    className="w-full h-full"
                    imgClassName="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-6 sm:p-8 space-y-3">
                  <p className="text-xs text-[#EAF5FC]/75">
                    <span className="font-bold text-[#19B6C9]">
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
                  <h3 className="font-display text-2xl font-bold text-white leading-snug">
                    {MEDICAL_ARTICLES[0].title}
                  </h3>
                  <p className="text-sm text-[#EAF5FC]/85 leading-relaxed">
                    {MEDICAL_ARTICLES[0].excerpt}
                  </p>
                </div>
              </div>
              <div className="px-6 sm:px-8 pb-6 pt-4 border-t border-white/15 flex items-center justify-between">
                <span className="text-xs text-[#EAF5FC]/75">
                  Reviewed by {MEDICAL_ARTICLES[0].reviewedBy}
                </span>
                <button
                  type="button"
                  onClick={() => onSelectArticle(MEDICAL_ARTICLES[0])}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#19B6C9] hover:text-white hover:underline cursor-pointer transition-colors"
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
                  className="group bg-white border border-[#DCE7F1] hover:border-[#19B6C9] rounded-2xl p-5 flex flex-col sm:flex-row gap-5 items-start transition-all duration-200 shadow-xs hover:shadow-[0_12px_28px_-12px_rgba(23,105,170,0.18)]"
                >
                  <div className="w-full sm:w-40 aspect-[4/3] rounded-xl shrink-0 border border-[#DCE7F1] overflow-hidden">
                    <ClinicalImage
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full"
                      imgClassName="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="space-y-2 flex-1">
                    <p className="text-xs text-[#64748B]">
                      <span className="font-bold text-[#1769AA]">{article.category}</span>
                      <span className="mx-2" aria-hidden="true">
                        ·
                      </span>
                      <span>{article.readTime}</span>
                    </p>
                    <h3 className="font-display text-lg font-bold text-[#102A5E] group-hover:text-[#1769AA] leading-snug transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-xs text-[#64748B] line-clamp-2">{article.excerpt}</p>
                    <button
                      type="button"
                      onClick={() => onSelectArticle(article)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#1769AA] hover:text-[#102A5E] pt-1 cursor-pointer"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#19B6C9]" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 11. APPOINTMENT BOOKING CONVERSION SECTION — WHITE SECTION */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <div className="bg-[#F7FAFD] border border-[#DCE7F1] rounded-[20px] p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start shadow-[0_20px_50px_-18px_rgba(16,42,94,0.14)]">
            <div className="lg:col-span-5 space-y-5">
              <p className="inline-flex items-center gap-2 text-xs font-bold text-[#1769AA]">
                <Calendar className="w-4 h-4 text-[#19B6C9]" aria-hidden="true" />
                <span>Patient Appointment Desk</span>
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#102A5E] [text-wrap:balance]">
                Schedule a Consultation Across Any Speciality
              </h2>
              <p className="text-[15px] text-[#64748B] leading-relaxed">
                Select your department and preferred centre. Our care coordinators confirm your
                exact consultation slot and fasting instructions if diagnostics are needed.
              </p>

              <div className="pt-4 border-t border-[#DCE7F1] space-y-3">
                <a
                  href="tel:+914443968888"
                  className="flex items-center gap-3 p-4 rounded-2xl bg-[#102A5E] text-white hover:bg-[#1769AA] transition-colors"
                >
                  <span className="w-10 h-10 rounded-xl bg-[#19B6C9]/20 text-[#19B6C9] inline-flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs text-[#EAF5FC]/75">Central Appointment Helpline</p>
                    <p className="text-sm font-bold text-white tabular-nums">044-43968888</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/919384848888?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-2xl bg-[#EAF5FC] border border-[#DCE7F1] hover:border-[#19B6C9] transition-colors"
                >
                  <span className="w-10 h-10 rounded-xl bg-white border border-[#DCE7F1] text-[#1769AA] inline-flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs text-[#64748B]">WhatsApp Appointment Assistance</p>
                    <p className="text-sm font-bold text-[#102A5E]">Chat with Care Desk</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white border border-[#DCE7F1] rounded-2xl p-6 sm:p-8 shadow-xs">
              {inlineConfirmedRef ? (
                <div className="bg-[#102A5E] text-white border border-[#1769AA] rounded-2xl p-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#19B6C9]" />
                    <h3 className="font-display text-xl font-bold text-white">
                      Appointment Logged · {inlineConfirmedRef}
                    </h3>
                  </div>
                  <p className="text-sm text-[#EAF5FC]/85">
                    Thank you,{' '}
                    <span className="font-semibold text-white">{inlineForm.patientName}</span>. Our
                    team will confirm your slot via{' '}
                    <span className="font-semibold text-[#19B6C9] tabular-nums">
                      {inlineForm.phone}
                    </span>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => setInlineConfirmedRef(null)}
                    className="px-4 py-2 text-xs font-bold text-[#102A5E] bg-[#19B6C9] hover:bg-white rounded-xl cursor-pointer transition-colors"
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
                        className="block text-xs font-bold text-[#172B43] mb-1.5"
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
                        className="w-full px-3.5 py-2.5 text-sm border border-[#DCE7F1] rounded-xl bg-[#F7FAFD] text-[#172B43] focus:bg-white focus:border-[#1769AA] transition-colors"
                      />
                      {inlineErrors.patientName && (
                        <p className="text-xs text-red-700 mt-1">{inlineErrors.patientName}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="home-phone"
                        className="block text-xs font-bold text-[#172B43] mb-1.5"
                      >
                        Mobile Number *
                      </label>
                      <input
                        id="home-phone"
                        type="tel"
                        value={inlineForm.phone}
                        onChange={(e) => setInlineForm({ ...inlineForm, phone: e.target.value })}
                        placeholder="+91 98400 00000"
                        className="w-full px-3.5 py-2.5 text-sm border border-[#DCE7F1] rounded-xl bg-[#F7FAFD] text-[#172B43] focus:bg-white focus:border-[#1769AA] transition-colors"
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
                        className="block text-xs font-bold text-[#172B43] mb-1.5"
                      >
                        Speciality *
                      </label>
                      <select
                        id="home-speciality"
                        value={inlineForm.specialitySlug}
                        onChange={(e) =>
                          setInlineForm({ ...inlineForm, specialitySlug: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-sm border border-[#DCE7F1] rounded-xl bg-[#F7FAFD] text-[#172B43] focus:bg-white focus:border-[#1769AA]"
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
                        className="block text-xs font-bold text-[#172B43] mb-1.5"
                      >
                        Centre *
                      </label>
                      <select
                        id="home-centre"
                        value={inlineForm.centreId}
                        onChange={(e) =>
                          setInlineForm({ ...inlineForm, centreId: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-sm border border-[#DCE7F1] rounded-xl bg-[#F7FAFD] text-[#172B43] focus:bg-white focus:border-[#1769AA]"
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
                        className="block text-xs font-bold text-[#172B43] mb-1.5"
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
                        className="w-full px-3.5 py-2.5 text-sm border border-[#DCE7F1] rounded-xl bg-[#F7FAFD] text-[#172B43] focus:bg-white focus:border-[#1769AA]"
                      />
                      {inlineErrors.preferredDate && (
                        <p className="text-xs text-red-700 mt-1">{inlineErrors.preferredDate}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="home-slot"
                        className="block text-xs font-bold text-[#172B43] mb-1.5"
                      >
                        Preferred Window
                      </label>
                      <select
                        id="home-slot"
                        value={inlineForm.preferredSlot}
                        onChange={(e) =>
                          setInlineForm({ ...inlineForm, preferredSlot: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-sm border border-[#DCE7F1] rounded-xl bg-[#F7FAFD] text-[#172B43] focus:bg-white focus:border-[#1769AA]"
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
                    className="w-full sm:w-auto px-7 py-3.5 text-sm font-bold text-white bg-[#1769AA] hover:bg-[#102A5E] rounded-xl transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shadow-[0_10px_24px_-8px_rgba(23,105,170,0.45)]"
                  >
                    <Calendar className="w-4 h-4 text-[#19B6C9]" aria-hidden="true" />
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

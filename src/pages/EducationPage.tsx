import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  FileHeart,
  GraduationCap,
} from 'lucide-react';
import type { BookingPrefill } from '../components/AppointmentDrawer';
import { ClinicalImage } from '../components/ClinicalImage';
import { EDUCATION_COURSES } from '../data/drmohansMenus';
import { MEDICAL_ARTICLES, type MedicalArticle } from '../data/insights';

interface EducationPageProps {
  onSelectArticle: (article: MedicalArticle) => void;
  onOpenBooking: (prefill?: BookingPrefill) => void;
}

const ANNUAL_CHECKLIST = [
  'HbA1c & fasting metabolic profile every 3 to 6 months',
  'Dilated retinal fundus screening & OCT eye exam annually',
  'Spot urine uACR & serum creatinine eGFR kidney check annually',
  '12-lead ECG & lipid risk evaluation (non-HDL / ApoB) annually',
  'Monofilament & vibration perception foot nerve assessment annually',
];

export function EducationPage({ onSelectArticle, onOpenBooking }: EducationPageProps) {
  return (
    <div className="bg-[#F7FAFD]">
      {/* Header */}
      <section className="hero-animated-mesh text-white border-b border-[#19B6C9]/25 py-14 lg:py-20">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 space-y-5">
          <p className="inline-flex items-center gap-2 text-xs font-bold text-[#19B6C9]">
            <GraduationCap className="w-4 h-4 text-[#19B6C9]" aria-hidden="true" />
            <span>Medical Education &amp; Patient Health Blog</span>
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-white max-w-3xl [text-wrap:balance]">
            Clinical Education Academy &amp; Preventive Health Guides
          </h1>
          <p className="text-base text-[#EAF5FC]/85 leading-relaxed max-w-2xl">
            Structured training programs for healthcare professionals alongside clinician-reviewed
            patient articles covering heart, liver, retinal, kidney, nerve, and metabolic care.
          </p>
        </div>
      </section>

      {/* Education Academy Courses on White */}
      <section id="courses" className="bg-white py-14 lg:py-20 border-b border-[#DCE7F1]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 space-y-8">
          <div className="max-w-2xl space-y-2">
            <p className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1769AA]">
              <GraduationCap className="w-4 h-4 text-[#19B6C9]" aria-hidden="true" />
              <span>Dr. Mohan&apos;s Education Academy</span>
            </p>
            <h2 className="font-display text-3xl font-bold text-[#102A5E]">
              Academic Training &amp; Community Literacy Tracks
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {EDUCATION_COURSES.map((course) => (
              <article
                key={course.title}
                className="bg-[#F7FAFD] text-[#172B43] border border-[#DCE7F1] hover:border-[#19B6C9] rounded-2xl p-7 flex flex-col justify-between space-y-4 transition-colors"
              >
                <div className="space-y-3">
                  <span className="w-10 h-10 rounded-xl bg-[#EAF5FC] border border-[#DCE7F1] text-[#1769AA] inline-flex items-center justify-center">
                    <GraduationCap className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <p className="text-xs font-semibold text-[#1769AA]">{course.audience}</p>
                  <h3 className="font-display text-xl font-bold text-[#102A5E]">{course.title}</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">{course.summary}</p>
                </div>
                <p className="pt-4 border-t border-[#DCE7F1] text-xs font-semibold text-[#1769AA]">
                  Format: {course.format}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Blog & Medical Insights on Ice Blue */}
      <section id="articles" className="bg-[#EAF5FC] py-14 lg:py-20 border-b border-[#DCE7F1]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 space-y-8">
          <div className="max-w-2xl space-y-2">
            <p className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1769AA]">
              <BookOpen className="w-4 h-4 text-[#19B6C9]" aria-hidden="true" />
              <span>Patient Blog &amp; Medical Insights</span>
            </p>
            <h2 className="font-display text-3xl font-bold text-[#102A5E]">
              Clinician-Reviewed Health Articles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {MEDICAL_ARTICLES.map((article) => (
              <article
                key={article.id}
                className="group bg-white border border-[#DCE7F1] hover:border-[#19B6C9] rounded-2xl overflow-hidden flex flex-col justify-between transition-all shadow-xs"
              >
                <div>
                  <div className="aspect-[16/9] w-full overflow-hidden">
                    <ClinicalImage
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full"
                      imgClassName="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-6 space-y-2.5">
                    <p className="text-xs text-[#64748B]">
                      <span className="font-bold text-[#1769AA]">{article.category}</span>
                      <span className="mx-2" aria-hidden="true">
                        ·
                      </span>
                      <span>{article.publishedDate}</span>
                      <span className="mx-2" aria-hidden="true">
                        ·
                      </span>
                      <span>{article.readTime}</span>
                    </p>
                    <h3 className="font-display text-xl font-bold text-[#102A5E] group-hover:text-[#1769AA] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-[#64748B] leading-relaxed">{article.excerpt}</p>
                  </div>
                </div>
                <div className="px-6 py-4 bg-[#F7FAFD] border-t border-[#DCE7F1] flex items-center justify-between">
                  <span className="text-xs font-medium text-[#64748B] truncate">
                    By {article.reviewedBy}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectArticle(article)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1769AA] hover:text-[#102A5E] shrink-0 cursor-pointer"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#19B6C9]" aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Annual Preventive Screening Checklist */}
      <section id="screening" className="bg-[#102A5E] text-white py-14 lg:py-16">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="inline-flex items-center gap-2 text-xs font-bold text-[#19B6C9]">
              <FileHeart className="w-4 h-4 text-[#19B6C9]" aria-hidden="true" />
              <span>Annual Organ-Protection Checklist</span>
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Five Preventive Screenings Recommended Every Year
            </h2>
            <ul className="space-y-2.5 text-sm text-[#EAF5FC]/90">
              {ANNUAL_CHECKLIST.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#19B6C9] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5 lg:text-right">
            <button
              type="button"
              onClick={() => onOpenBooking({ specialitySlug: 'laboratory-diagnostics' })}
              className="px-6 py-3.5 text-sm font-bold text-[#102A5E] bg-[#19B6C9] hover:bg-white rounded-xl inline-flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <span>Book Annual Screening Package</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

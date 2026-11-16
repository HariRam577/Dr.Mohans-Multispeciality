import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Calendar, CheckCircle2, Clock, Languages, MapPin, X } from 'lucide-react';
import type { Doctor } from '../data/doctors';
import { SpecialityIconBadge } from './ClinicalIcons';
import { ClinicalImage } from './ClinicalImage';

interface DoctorProfileModalProps {
  doctor: Doctor | null;
  onClose: () => void;
  onBookWithDoctor: (doctor: Doctor) => void;
}

export function DoctorProfileModal({
  doctor,
  onClose,
  onBookWithDoctor,
}: DoctorProfileModalProps) {
  useEffect(() => {
    if (!doctor) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [doctor, onClose]);

  return (
    <AnimatePresence>
      {doctor && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="doctor-modal-name"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#102A5E]/65"
          />

          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-[780px] bg-white border border-[#DCE7F1] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-5 bg-[#EAF5FC] relative">
                <ClinicalImage
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-72 md:h-full min-h-[300px]"
                  imgClassName="object-top"
                />
              </div>

              <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <SpecialityIconBadge slug={doctor.specialitySlug} tone="ice" size="sm" />
                        <p className="text-xs font-bold text-[#1769AA]">{doctor.specialityName}</p>
                      </div>
                      <h2
                        id="doctor-modal-name"
                        className="font-display text-2xl font-bold text-[#102A5E]"
                      >
                        {doctor.name}
                      </h2>
                      <p className="text-sm font-medium text-[#64748B]">{doctor.designation}</p>
                    </div>
                    <button
                      type="button"
                      aria-label="Close doctor profile"
                      onClick={onClose}
                      className="w-10 h-10 rounded-xl bg-[#F7FAFD] border border-[#DCE7F1] text-[#102A5E] hover:bg-[#EAF5FC] flex items-center justify-center shrink-0 cursor-pointer transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="text-xs font-bold text-[#1769AA] mt-3">
                    {doctor.qualifications}
                    {doctor.experienceLabel ? ` · ${doctor.experienceLabel}` : ''}
                  </p>

                  <p className="text-sm text-[#172B43]/90 leading-relaxed mt-4">{doctor.bio}</p>

                  <div className="mt-5 pt-4 border-t border-[#DCE7F1]">
                    <h3 className="text-xs font-bold text-[#102A5E] mb-2">
                      Clinical Focus Areas
                    </h3>
                    <ul className="space-y-1.5 text-sm text-[#172B43]">
                      {doctor.clinicalFocus.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle2
                            className="w-4 h-4 text-[#1769AA] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <dl className="mt-5 pt-4 border-t border-[#DCE7F1] space-y-2 text-xs">
                    <div className="flex items-start justify-between gap-4">
                      <dt className="text-[#64748B] shrink-0 inline-flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#1769AA]" aria-hidden="true" />
                        <span>Consultation Centres</span>
                      </dt>
                      <dd className="text-[#172B43] font-bold text-right">
                        {doctor.centreNames.join(' · ')}
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <dt className="text-[#64748B] shrink-0 inline-flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#1769AA]" aria-hidden="true" />
                        <span>Availability</span>
                      </dt>
                      <dd className="text-[#172B43] font-semibold text-right">
                        {doctor.consultationDays}
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <dt className="text-[#64748B] shrink-0 inline-flex items-center gap-1.5">
                        <Languages className="w-3.5 h-3.5 text-[#1769AA]" aria-hidden="true" />
                        <span>Languages</span>
                      </dt>
                      <dd className="text-[#172B43] font-semibold text-right">
                        {doctor.languages.join(', ')}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-6 pt-4 border-t border-[#DCE7F1] flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => onBookWithDoctor(doctor)}
                    className="flex-1 py-3 px-5 text-sm font-bold text-white bg-[#1769AA] hover:bg-[#102A5E] rounded-xl transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-[#19B6C9]" aria-hidden="true" />
                    <span>Book Consultation with {doctor.name}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

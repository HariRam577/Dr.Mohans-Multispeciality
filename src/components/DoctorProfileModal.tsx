import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Calendar, MapPin, X } from 'lucide-react';
import type { Doctor } from '../data/doctors';
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
            className="fixed inset-0 bg-[#172B45]/50 backdrop-blur-[2px]"
          />

          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-[780px] bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-5 bg-[#F7F9FC] relative">
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
                    <div>
                      <p className="text-xs font-semibold text-[#3C76C1]">
                        {doctor.specialityName}
                      </p>
                      <h2
                        id="doctor-modal-name"
                        className="font-display text-2xl font-bold text-[#172B45] mt-1"
                      >
                        {doctor.name}
                      </h2>
                      <p className="text-sm font-medium text-[#64748B] mt-0.5">
                        {doctor.designation}
                      </p>
                    </div>
                    <button
                      type="button"
                      aria-label="Close doctor profile"
                      onClick={onClose}
                      className="w-10 h-10 rounded-lg border border-[#172B45]/12 flex items-center justify-center text-[#172B45] hover:bg-[#F7F9FC] shrink-0 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="text-xs font-semibold text-[#174A80] mt-3">
                    {doctor.qualifications}
                    {doctor.experienceLabel ? ` · ${doctor.experienceLabel}` : ''}
                  </p>

                  <p className="text-sm text-[#172B45]/85 leading-relaxed mt-4">{doctor.bio}</p>

                  <div className="mt-5 pt-4 border-t border-[#172B45]/10">
                    <h3 className="text-xs font-semibold text-[#64748B] mb-2">
                      Clinical Focus Areas
                    </h3>
                    <ul className="space-y-1.5 text-sm text-[#172B45]">
                      {doctor.clinicalFocus.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="text-[#3C76C1] font-bold" aria-hidden="true">
                            ·
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <dl className="mt-5 pt-4 border-t border-[#172B45]/10 space-y-2 text-xs">
                    <div className="flex items-start justify-between gap-4">
                      <dt className="text-[#64748B] shrink-0">Consultation Centres</dt>
                      <dd className="text-[#172B45] font-semibold text-right inline-flex items-start gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#3C76C1] shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{doctor.centreNames.join(' · ')}</span>
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <dt className="text-[#64748B] shrink-0">Availability</dt>
                      <dd className="text-[#172B45] font-medium text-right">
                        {doctor.consultationDays}
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <dt className="text-[#64748B] shrink-0">Languages</dt>
                      <dd className="text-[#172B45] font-medium text-right">
                        {doctor.languages.join(', ')}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-6 pt-4 border-t border-[#172B45]/10 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => onBookWithDoctor(doctor)}
                    className="flex-1 py-3 px-5 text-sm font-semibold text-white bg-[#174A80] hover:bg-[#3C76C1] rounded-lg transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" aria-hidden="true" />
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

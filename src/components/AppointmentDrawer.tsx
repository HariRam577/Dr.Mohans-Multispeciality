import { useEffect, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Calendar, CheckCircle2, MessageCircle, Phone, X } from 'lucide-react';
import { CENTRES } from '../data/centres';
import { DOCTORS } from '../data/doctors';
import { SPECIALITIES } from '../data/specialities';
import {
  createBookingReference,
  validateAppointmentInput,
  type AppointmentInput,
} from '../utils/filters';

export interface BookingPrefill {
  specialitySlug?: string;
  centreId?: string;
  doctorId?: string;
}

interface AppointmentDrawerProps {
  open: boolean;
  prefill?: BookingPrefill;
  onClose: () => void;
}

const TIME_SLOTS = [
  '08:00 AM – 10:00 AM',
  '10:00 AM – 12:30 PM',
  '02:00 PM – 04:30 PM',
  '04:30 PM – 06:30 PM',
];

export function AppointmentDrawer({ open, prefill, onClose }: AppointmentDrawerProps) {
  const [form, setForm] = useState<AppointmentInput>({
    patientName: '',
    phone: '',
    email: '',
    specialitySlug: prefill?.specialitySlug || SPECIALITIES[0].slug,
    centreId: prefill?.centreId || CENTRES[0].id,
    preferredDate: '2026-11-18',
    preferredSlot: TIME_SLOTS[0],
    notes: '',
  });
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(prefill?.doctorId || '');
  const [errors, setErrors] = useState<Partial<Record<keyof AppointmentInput, string>>>({});
  const [confirmationRef, setConfirmationRef] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setConfirmationRef(null);
      setErrors({});
      setForm((prev) => ({
        ...prev,
        specialitySlug: prefill?.specialitySlug || prev.specialitySlug || SPECIALITIES[0].slug,
        centreId: prefill?.centreId || prev.centreId || CENTRES[0].id,
      }));
      setSelectedDoctorId(prefill?.doctorId || '');
    }
  }, [open, prefill]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  const matchingDoctors = DOCTORS.filter(
    (doc) => !form.specialitySlug || doc.specialitySlug === form.specialitySlug
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validation = validateAppointmentInput(form);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    const seed = form.patientName.length * 137 + form.phone.replace(/\D/g, '').length * 89 + 412;
    setConfirmationRef(createBookingReference(seed));
  };

  const selectedCentre = CENTRES.find((c) => c.id === form.centreId);
  const selectedSpeciality = SPECIALITIES.find((s) => s.slug === form.specialitySlug);
  const selectedDoctor = DOCTORS.find((d) => d.id === selectedDoctorId);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-drawer-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#172B45]/45 backdrop-blur-[2px]"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-[520px] bg-white h-full overflow-y-auto shadow-2xl flex flex-col"
          >
            <div className="px-6 py-5 border-b border-[#172B45]/10 flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <h2
                  id="booking-drawer-title"
                  className="font-display text-xl font-bold text-[#172B45]"
                >
                  Request an Appointment
                </h2>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Outpatient specialist consultation &amp; diagnostic scheduling
                </p>
              </div>
              <button
                type="button"
                aria-label="Close appointment drawer"
                onClick={onClose}
                className="w-10 h-10 rounded-lg border border-[#172B45]/15 flex items-center justify-center text-[#172B45] hover:bg-[#F7F9FC] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 flex-1">
              {confirmationRef ? (
                <div className="bg-[#F7F9FC] border border-[#172B45]/10 rounded-xl p-6 space-y-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#174A80] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-[#3C76C1]">
                        Appointment Request Logged
                      </p>
                      <h3 className="font-display text-xl font-bold text-[#172B45] mt-0.5">
                        Reference {confirmationRef}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-[#172B45]/85 leading-relaxed">
                    Thank you, <span className="font-semibold">{form.patientName}</span>. Our
                    central patient coordination desk will confirm your exact consultation slot via{' '}
                    <span className="font-semibold tabular-nums">{form.phone}</span> shortly.
                  </p>

                  <dl className="border-t border-[#172B45]/10 pt-4 space-y-2.5 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-[#64748B]">Department</dt>
                      <dd className="font-semibold text-[#172B45] text-right">
                        {selectedSpeciality?.name}
                      </dd>
                    </div>
                    {selectedDoctor && (
                      <div className="flex justify-between gap-4">
                        <dt className="text-[#64748B]">Requested Specialist</dt>
                        <dd className="font-semibold text-[#172B45] text-right">
                          {selectedDoctor.name}
                        </dd>
                      </div>
                    )}
                    <div className="flex justify-between gap-4">
                      <dt className="text-[#64748B]">Centre</dt>
                      <dd className="font-semibold text-[#172B45] text-right">
                        {selectedCentre?.name}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-[#64748B]">Preferred Date &amp; Time</dt>
                      <dd className="font-semibold text-[#172B45] text-right tabular-nums">
                        {form.preferredDate} · {form.preferredSlot}
                      </dd>
                    </div>
                  </dl>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={() => setConfirmationRef(null)}
                      className="flex-1 py-2.5 px-4 text-sm font-semibold text-[#174A80] bg-[#EAF3FC] hover:bg-[#dbeaf9] rounded-lg transition-colors cursor-pointer"
                    >
                      Book Another Visit
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 py-2.5 px-4 text-sm font-semibold text-white bg-[#174A80] hover:bg-[#3C76C1] rounded-lg transition-colors cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div>
                    <label
                      htmlFor="drawer-patient-name"
                      className="block text-xs font-semibold text-[#172B45] mb-1.5"
                    >
                      Patient Full Name *
                    </label>
                    <input
                      id="drawer-patient-name"
                      type="text"
                      value={form.patientName}
                      onChange={(e) => setForm({ ...form, patientName: e.target.value })}
                      placeholder="e.g., Ramesh Narayanan"
                      className="w-full px-3.5 py-2.5 text-sm border border-[#172B45]/20 rounded-lg bg-white text-[#172B45]"
                    />
                    {errors.patientName && (
                      <p className="text-xs text-red-700 mt-1">{errors.patientName}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="drawer-phone"
                        className="block text-xs font-semibold text-[#172B45] mb-1.5"
                      >
                        Mobile Number *
                      </label>
                      <input
                        id="drawer-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 98400 00000"
                        className="w-full px-3.5 py-2.5 text-sm border border-[#172B45]/20 rounded-lg bg-white text-[#172B45]"
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-700 mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="drawer-email"
                        className="block text-xs font-semibold text-[#172B45] mb-1.5"
                      >
                        Email (Optional)
                      </label>
                      <input
                        id="drawer-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full px-3.5 py-2.5 text-sm border border-[#172B45]/20 rounded-lg bg-white text-[#172B45]"
                      />
                      {errors.email && (
                        <p className="text-xs text-red-700 mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="drawer-speciality"
                      className="block text-xs font-semibold text-[#172B45] mb-1.5"
                    >
                      Clinical Speciality *
                    </label>
                    <select
                      id="drawer-speciality"
                      value={form.specialitySlug}
                      onChange={(e) => {
                        setForm({ ...form, specialitySlug: e.target.value });
                        setSelectedDoctorId('');
                      }}
                      className="w-full px-3.5 py-2.5 text-sm border border-[#172B45]/20 rounded-lg bg-white text-[#172B45]"
                    >
                      {SPECIALITIES.map((spec) => (
                        <option key={spec.slug} value={spec.slug}>
                          {spec.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="drawer-centre"
                      className="block text-xs font-semibold text-[#172B45] mb-1.5"
                    >
                      Preferred Centre *
                    </label>
                    <select
                      id="drawer-centre"
                      value={form.centreId}
                      onChange={(e) => setForm({ ...form, centreId: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-[#172B45]/20 rounded-lg bg-white text-[#172B45]"
                    >
                      {CENTRES.map((centre) => (
                        <option key={centre.id} value={centre.id}>
                          {centre.city} — {centre.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {matchingDoctors.length > 0 && (
                    <div>
                      <label
                        htmlFor="drawer-doctor"
                        className="block text-xs font-semibold text-[#172B45] mb-1.5"
                      >
                        Preferred Specialist (Optional)
                      </label>
                      <select
                        id="drawer-doctor"
                        value={selectedDoctorId}
                        onChange={(e) => setSelectedDoctorId(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm border border-[#172B45]/20 rounded-lg bg-white text-[#172B45]"
                      >
                        <option value="">First Available Specialist</option>
                        {matchingDoctors.map((doc) => (
                          <option key={doc.id} value={doc.id}>
                            {doc.name} ({doc.city})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="drawer-date"
                        className="block text-xs font-semibold text-[#172B45] mb-1.5"
                      >
                        Preferred Date *
                      </label>
                      <input
                        id="drawer-date"
                        type="date"
                        value={form.preferredDate}
                        onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm border border-[#172B45]/20 rounded-lg bg-white text-[#172B45]"
                      />
                      {errors.preferredDate && (
                        <p className="text-xs text-red-700 mt-1">{errors.preferredDate}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="drawer-slot"
                        className="block text-xs font-semibold text-[#172B45] mb-1.5"
                      >
                        Preferred Window
                      </label>
                      <select
                        id="drawer-slot"
                        value={form.preferredSlot}
                        onChange={(e) => setForm({ ...form, preferredSlot: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm border border-[#172B45]/20 rounded-lg bg-white text-[#172B45]"
                      >
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="drawer-notes"
                      className="block text-xs font-semibold text-[#172B45] mb-1.5"
                    >
                      Clinical Notes or Symptoms (Optional)
                    </label>
                    <textarea
                      id="drawer-notes"
                      rows={2}
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      placeholder="Brief note for our triage coordinator..."
                      className="w-full px-3.5 py-2 text-sm border border-[#172B45]/20 rounded-lg bg-white text-[#172B45]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-5 text-sm font-semibold text-white bg-[#174A80] hover:bg-[#3C76C1] rounded-lg transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    <span>Confirm Appointment Request</span>
                  </button>
                </form>
              )}

              {/* Direct Phone & WhatsApp Patient Access */}
              <div className="mt-6 pt-5 border-t border-[#172B45]/10 space-y-2.5">
                <p className="text-xs font-semibold text-[#64748B]">
                  Prefer direct assistance?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href="tel:+914443968888"
                    className="inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-[#172B45]/15 text-xs font-semibold text-[#172B45] hover:bg-[#F7F9FC] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#3C76C1]" aria-hidden="true" />
                    <span>Call 044-43968888</span>
                  </a>
                  <a
                    href="https://wa.me/919384848888?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-[#EAF3FC] text-xs font-semibold text-[#174A80] hover:bg-[#dbeaf9] transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>WhatsApp Desk</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

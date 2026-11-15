import type { Centre } from '../data/centres';
import type { Doctor } from '../data/doctors';
import type { Speciality } from '../data/specialities';

export interface DoctorFilterCriteria {
  query?: string;
  specialitySlug?: string;
  city?: string;
}

export interface CentreFilterCriteria {
  query?: string;
  state?: string;
  city?: string;
  specialitySlug?: string;
}

export interface AppointmentInput {
  patientName: string;
  phone: string;
  email?: string;
  specialitySlug: string;
  centreId: string;
  preferredDate: string;
  preferredSlot: string;
  notes?: string;
}

export interface AppointmentValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof AppointmentInput, string>>;
}

export function filterSpecialities(
  specialities: Speciality[],
  category: string,
  query = ''
): Speciality[] {
  const normalizedQuery = query.trim().toLowerCase();
  return specialities.filter((spec) => {
    const matchesCategory = category === 'All' || spec.category === category;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    return (
      spec.name.toLowerCase().includes(normalizedQuery) ||
      spec.summary.toLowerCase().includes(normalizedQuery) ||
      spec.conditionsTreated.some((c) => c.toLowerCase().includes(normalizedQuery)) ||
      spec.services.some((s) => s.toLowerCase().includes(normalizedQuery))
    );
  });
}

export function filterDoctors(doctors: Doctor[], criteria: DoctorFilterCriteria): Doctor[] {
  const query = (criteria.query ?? '').trim().toLowerCase();
  const specialitySlug = criteria.specialitySlug ?? 'all';
  const city = criteria.city ?? 'all';

  return doctors.filter((doc) => {
    if (specialitySlug !== 'all' && doc.specialitySlug !== specialitySlug) {
      return false;
    }
    if (city !== 'all' && doc.city.toLowerCase() !== city.toLowerCase()) {
      return false;
    }
    if (!query) return true;
    return (
      doc.name.toLowerCase().includes(query) ||
      doc.specialityName.toLowerCase().includes(query) ||
      doc.designation.toLowerCase().includes(query) ||
      doc.city.toLowerCase().includes(query) ||
      doc.clinicalFocus.some((f) => f.toLowerCase().includes(query))
    );
  });
}

export function getUniqueStates(centres: Centre[]): string[] {
  return Array.from(new Set(centres.map((c) => c.state))).sort();
}

export function getCitiesForState(centres: Centre[], state: string): string[] {
  const filtered = state === 'all' ? centres : centres.filter((c) => c.state === state);
  return Array.from(new Set(filtered.map((c) => c.city))).sort();
}

export function filterCentres(centres: Centre[], criteria: CentreFilterCriteria): Centre[] {
  const query = (criteria.query ?? '').trim().toLowerCase();
  const state = criteria.state ?? 'all';
  const city = criteria.city ?? 'all';
  const specialitySlug = criteria.specialitySlug ?? 'all';

  return centres.filter((centre) => {
    if (state !== 'all' && centre.state !== state) {
      return false;
    }
    if (city !== 'all' && centre.city !== city) {
      return false;
    }
    if (specialitySlug !== 'all' && !centre.specialities.includes(specialitySlug)) {
      return false;
    }
    if (!query) return true;
    return (
      centre.name.toLowerCase().includes(query) ||
      centre.city.toLowerCase().includes(query) ||
      centre.state.toLowerCase().includes(query) ||
      centre.address.toLowerCase().includes(query)
    );
  });
}

export function validateAppointmentInput(input: AppointmentInput): AppointmentValidationResult {
  const errors: Partial<Record<keyof AppointmentInput, string>> = {};

  if (!input.patientName.trim() || input.patientName.trim().length < 2) {
    errors.patientName = 'Please enter the patient’s full name.';
  }

  const digits = input.phone.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 13) {
    errors.phone = 'Enter a valid 10-digit mobile or landline number.';
  }

  if (input.email && input.email.trim().length > 0) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(input.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
  }

  if (!input.specialitySlug) {
    errors.specialitySlug = 'Please select a clinical speciality.';
  }

  if (!input.centreId) {
    errors.centreId = 'Please choose a preferred centre.';
  }

  if (!input.preferredDate) {
    errors.preferredDate = 'Please select a preferred consultation date.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function createBookingReference(seedNumber: number): string {
  const padded = String(Math.abs(seedNumber) % 90000 + 10000);
  return `DMH-${padded}`;
}

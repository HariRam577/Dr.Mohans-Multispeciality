import test from 'node:test';
import assert from 'node:assert/strict';
import { CENTRES } from '../data/centres';
import { DOCTORS } from '../data/doctors';
import { SPECIALITIES } from '../data/specialities';
import {
  createBookingReference,
  filterCentres,
  filterDoctors,
  filterSpecialities,
  getCitiesForState,
  getUniqueStates,
  validateAppointmentInput,
} from './filters';

test('speciality filter matches category and search term across all 12 departments', () => {
  const all = filterSpecialities(SPECIALITIES, 'All', '');
  assert.equal(all.length, 12);

  const organCare = filterSpecialities(SPECIALITIES, 'Organ & Surgical Care', '');
  assert.ok(organCare.some((s) => s.slug === 'cardiology'));
  assert.ok(organCare.some((s) => s.slug === 'gastroenterology'));

  const searchFattyLiver = filterSpecialities(SPECIALITIES, 'All', 'fatty liver');
  assert.equal(searchFattyLiver.length, 2);
  assert.ok(searchFattyLiver.some((s) => s.slug === 'gastroenterology'));
  assert.ok(searchFattyLiver.some((s) => s.slug === 'nutrition-dietetics'));

  const searchEndoscopy = filterSpecialities(SPECIALITIES, 'All', 'endoscopy');
  assert.equal(searchEndoscopy.length, 1);
  assert.equal(searchEndoscopy[0].slug, 'gastroenterology');
});

test('doctor filter filters accurately by speciality, city, and clinical focus', () => {
  const chennaiCardio = filterDoctors(DOCTORS, {
    specialitySlug: 'cardiology',
    city: 'Chennai',
  });
  assert.equal(chennaiCardio.length, 1);
  assert.equal(chennaiCardio[0].name, 'Dr. Aravind Subramanian');

  const bengaluruDocs = filterDoctors(DOCTORS, { city: 'Bengaluru' });
  assert.equal(bengaluruDocs.length, 2);

  const searchMody = filterDoctors(DOCTORS, { query: 'MODY' });
  assert.equal(searchMody.length, 1);
  assert.equal(searchMody[0].id, 'dr-v-mohan');
});

test('centre finder derives states, cascading cities, and filters by speciality', () => {
  const states = getUniqueStates(CENTRES);
  assert.ok(states.includes('Tamil Nadu'));
  assert.ok(states.includes('Telangana'));
  assert.ok(states.includes('Karnataka'));

  const tnCities = getCitiesForState(CENTRES, 'Tamil Nadu');
  assert.deepEqual(tnCities, ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli']);

  const cardioCentresInHyderabad = filterCentres(CENTRES, {
    state: 'Telangana',
    city: 'Hyderabad',
    specialitySlug: 'cardiology',
  });
  assert.equal(cardioCentresInHyderabad.length, 2);
});

test('appointment validation enforces required patient fields and phone format', () => {
  const invalid = validateAppointmentInput({
    patientName: '',
    phone: '123',
    email: 'bad-email',
    specialitySlug: '',
    centreId: '',
    preferredDate: '',
    preferredSlot: 'Morning',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.patientName);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.specialitySlug);

  const valid = validateAppointmentInput({
    patientName: 'Ananya Krishnan',
    phone: '+91 98400 12345',
    email: 'ananya@example.com',
    specialitySlug: 'cardiology',
    centreId: 'chennai-gopalapuram',
    preferredDate: '2026-11-20',
    preferredSlot: '09:00 AM – 11:00 AM',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
  assert.match(createBookingReference(4821), /^DMH-\d{5}$/);
});

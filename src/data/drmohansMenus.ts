export interface PatientCareProgram {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  linkedSpecialitySlug: string;
}

export const PATIENT_CARE_PROGRAMS: PatientCareProgram[] = [
  {
    id: 'health-packages',
    title: 'Preventive Health Packages',
    subtitle: 'Comprehensive Executive, Cardiac, Renal & Metabolic Screening',
    description:
      'Structured single-morning health check packages combining fasting biochemistry, HbA1c, lipid panels, ECG, retinal screening, kidney uACR, and physician review.',
    highlights: [
      'Complete Basic & Master Health Checkup Options',
      'Senior Citizen & Cardiac-Renal Preventive Bundles',
      'Express Morning Fasting Slots from 7:00 AM',
    ],
    linkedSpecialitySlug: 'laboratory-diagnostics',
  },
  {
    id: 'home-care',
    title: 'Home Care & Phlebotomy',
    subtitle: 'Doorstep Blood Collection, Nursing & Tele-Follow-up',
    description:
      'Accredited laboratory sample collection at home across major cities, paired with senior care coordination, medication guidance, and wound dressing support.',
    highlights: [
      'Trained Phlebotomists for Fasting & Post-Meal Samples',
      'Same-Day Digital Reports Shared with Treating Physician',
      'Post-Discharge & Mobility-Friendly Clinical Check-ins',
    ],
    linkedSpecialitySlug: 'laboratory-diagnostics',
  },
  {
    id: 'ip-facility',
    title: 'Inpatient (IP) Facility & Surgeries',
    subtitle: 'Safe Glycemic-Guided Hospitalisation & Laparoscopic Procedures',
    description:
      'Dedicated inpatient wards, continuous telemetry monitoring, minor and major surgical suites, and multidisciplinary stabilization teams for complex medical cases.',
    highlights: [
      'Diabetic Foot Limb-Salvage & Reconstructive Procedures',
      'Laparoscopic Cholecystectomy, Hernia & GI Surgeries',
      '24/7 Inpatient Glycemic & Electrolyte Stabilization',
    ],
    linkedSpecialitySlug: 'gastroenterology',
  },
  {
    id: 'weight-obesity',
    title: 'Diabetes Obesity & Weight Management',
    subtitle: 'Evidence-Based Metabolic Remission & Medical Nutrition',
    description:
      'Integrated obesity and weight clinic pairing endocrinologists, clinical dietitians, and lifestyle physiotherapists to improve insulin sensitivity sustainably.',
    highlights: [
      'Body Composition & Visceral Fat Profiling',
      'Culturally Adapted Indian Calorie & Macro Planning',
      'Safe Pharmacotherapy & Bariatric Evaluation When Indicated',
    ],
    linkedSpecialitySlug: 'nutrition-dietetics',
  },
  {
    id: 'physiotherapy-fitness',
    title: 'Physiotherapy & Medical Fitness',
    subtitle: 'Supervised Exercise Prescriptions & Joint Rehabilitation',
    description:
      'Clinical physiotherapists design joint-safe aerobic and resistance routines for frozen shoulder, lumbar stiffness, neuropathy balance training, and cardiac fitness.',
    highlights: [
      'Adhesive Capsulitis (Frozen Shoulder) Mobilisation',
      'Neuropathy Balance & Gait Conditioning',
      'Ergonomic & Post-Surgical Functional Recovery',
    ],
    linkedSpecialitySlug: 'podiatry',
  },
  {
    id: 'sleep-health',
    title: 'Sleep Health & Circadian Care',
    subtitle: 'Snoring, Obstructive Sleep Apnea & Metabolic Fatigue',
    description:
      'Evaluation of sleep quality, daytime drowsiness, and circadian rhythm misalignment linked with resistant hypertension, insulin resistance, and cardiac strain.',
    highlights: [
      'Obstructive Sleep Apnea (OSA) Risk Screening',
      'Circadian Rhythm & Shift-Work Metabolic Counselling',
      'Coordinated Weight, ENT & Pulmonary Referrals',
    ],
    linkedSpecialitySlug: 'general-medicine',
  },
  {
    id: 'stress-management',
    title: 'Stress Management & Behavioral Health',
    subtitle: 'Cortisol Regulation, Sleep Hygiene & Chronic Condition Resilience',
    description:
      'Structured behavioural guidance supporting patients and caregivers managing chronic cardiac, renal, or endocrine conditions without burnout.',
    highlights: [
      'Breathing & Mindfulness Techniques for Blood Pressure Control',
      'Overcoming Needle & Diagnosis Anxiety',
      'Family Caregiver Support & Adherence Coaching',
    ],
    linkedSpecialitySlug: 'general-medicine',
  },
  {
    id: 'orthopedic-dental',
    title: 'Orthopedic, Dental & Gestational Care',
    subtitle: 'Comprehensive Whole-Body Support Across Life Stages',
    description:
      'Coordinated specialist care for pregnancy-induced glucose elevation, musculoskeletal pain, and periodontal health tightly linked to systemic inflammation.',
    highlights: [
      'Gestational Diabetes & High-Risk Pregnancy Clinic',
      'Periodontal Gum Health & Oral Hygiene Screening',
      'Orthopedic Evaluation for Diabetic Hand & Joint Stiffness',
    ],
    linkedSpecialitySlug: 'diabetes-endocrinology',
  },
];

export const STATE_DIRECTORY_MENU = [
  { state: 'Tamil Nadu', flagship: 'Gopalapuram · Anna Nagar · Coimbatore · Madurai' },
  { state: 'Telangana', flagship: 'Domalguda · Jubilee Hills · Secunderabad · Warangal' },
  { state: 'Andhra Pradesh', flagship: 'Vijayawada · Visakhapatnam · Tirupati · Guntur' },
  { state: 'Karnataka', flagship: 'Indiranagar · JP Nagar · Basavanagudi · Whitefield' },
  { state: 'West Bengal', flagship: 'Rashbehari · Kaikhali · Siliguri' },
  { state: 'Kerala', flagship: 'Thiruvananthapuram · Kozhikode (Calicut)' },
  { state: 'Odisha', flagship: 'Bhubaneswar Specialist Centre' },
  { state: 'Puducherry', flagship: 'Puducherry Branch Centre' },
];

export const LEADERSHIP_DIRECTORS = [
  {
    name: 'Dr. V. Mohan, MD, FRCP, PhD, DSc',
    role: 'Chairman & Chief of Diabetology',
    note: 'Founded the institution in 1991; recipient of the Padma Shri award for distinguished medical service.',
  },
  {
    name: 'Dr. R. M. Anjana, MD, PhD, FRCP',
    role: 'Managing Director & Senior Consultant',
    note: 'Leads national clinical quality harmonization, digital outpatient standards, and preventive care programs.',
  },
  {
    name: 'Dr. Ranjit Unnikrishnan, MD, FRCP',
    role: 'Vice Chairman & Consultant Diabetologist',
    note: 'Oversees complex cardiometabolic clinics, clinical guideline updates, and postgraduate medical education.',
  },
  {
    name: 'Late Prof. M. Viswanathan & Founding Legacy',
    role: 'Homage & Clinical Heritage',
    note: 'Honouring pioneering Indian clinical medicine rooted in ethical, affordable, and patient-first care since 1991.',
  },
];

export const EDUCATION_COURSES = [
  {
    title: 'Certified Course in Evidence-Based Diabetes Management',
    audience: 'Practicing Physicians & Primary Care Doctors',
    format: 'Structured Clinical Modules & Case Reviews',
    summary:
      'Equips family physicians across India with updated standards in glycemic care, cardiovascular risk reduction, and complication screening.',
  },
  {
    title: 'Diabetes Educator & Clinical Nutrition Training',
    audience: 'Nurses, Dietitians & Allied Health Professionals',
    format: 'Practical Counselling & Insulin Technique Workshops',
    summary:
      'Trains healthcare educators to guide families on safe insulin storage, hypoglycemia prevention, and culturally relevant Indian diet plans.',
  },
  {
    title: 'Patient & Family Health Literacy Sessions',
    audience: 'Patients, Caregivers & Community Groups',
    format: 'Interactive Centre Workshops & Multilingual Guides',
    summary:
      'Practical Saturday clinics covering foot self-checks, reading lab reports, travel nutrition, and active living at every age.',
  },
];

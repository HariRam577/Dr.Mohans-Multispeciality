import { MEDIA } from './media';

export interface InstitutionalStat {
  value: string;
  numericTarget?: number;
  suffix?: string;
  label: string;
  context: string;
}

export const INSTITUTIONAL_STATS: InstitutionalStat[] = [
  {
    value: '1991',
    label: 'Year Founded',
    context: 'Over three decades of specialist clinical care in India',
  },
  {
    value: '50+',
    numericTarget: 50,
    suffix: '+',
    label: 'Accredited Centres',
    context: 'Across 30+ cities in 8 states and union territories',
  },
  {
    value: '12',
    numericTarget: 12,
    suffix: '',
    label: 'Integrated Specialities',
    context: 'From endocrinology and cardiology to gastro, eye, and renal care',
  },
  {
    value: '1,700+',
    numericTarget: 1700,
    suffix: '+',
    label: 'Peer-Reviewed Papers',
    context: 'Published with Madras Diabetes Research Foundation (MDRF)',
  },
];

export interface CarePathwayStep {
  number: string;
  title: string;
  description: string;
  outcome: string;
}

export const CARE_PATHWAY: CarePathwayStep[] = [
  {
    number: '01',
    title: 'Preventive Screening & Risk Mapping',
    description:
      'Baseline metabolic, cardiovascular, retinal, renal, and vascular evaluations completed efficiently during a single structured visit.',
    outcome: 'Early risk identification before symptoms arise',
  },
  {
    number: '02',
    title: 'Coordinated Multispecialist Consultation',
    description:
      'Diabetologists collaborate directly with cardiologists, ophthalmologists, nephrologists, gastroenterologists, and neurologists.',
    outcome: 'Unified treatment plans without fragmented referrals',
  },
  {
    number: '03',
    title: 'Targeted Intervention & Diagnostics',
    description:
      'Accredited laboratory assays, 2D echocardiography, endoscopy, retinal lasers, and limb-salvage wound care delivered under strict clinical protocols.',
    outcome: 'Evidence-based organ protection and surgical safety',
  },
  {
    number: '04',
    title: 'Longitudinal Follow-up & Home Support',
    description:
      'Culturally adapted medical nutrition therapy, digital report tracking, and home blood sample collection keep care effortless for families.',
    outcome: 'Sustained day-to-day confidence and continuity',
  },
];

export interface ResearchInitiative {
  id: string;
  kicker: string;
  title: string;
  summary: string;
  impact: string;
}

export const RESEARCH_INITIATIVES: ResearchInitiative[] = [
  {
    id: 'icmr-indiab',
    kicker: 'National Epidemiology',
    title: 'ICMR–INDIAB National Study',
    summary:
      'Spearheaded by MDRF in collaboration with the Indian Council of Medical Research, mapping diabetes, pre-diabetes, hypertension, and dyslipidemia prevalence across all Indian states and union territories.',
    impact: 'Informs national public health guidelines and early regional screening protocols.',
  },
  {
    id: 'mdrf-genetics',
    kicker: 'Precision Medicine',
    title: 'Genetics & Phenotyping of Young-Onset Diabetes',
    summary:
      'Translational research identifying monogenic diabetes (MODY) subtypes and distinct Indian metabolic phenotypes, enabling personalized oral therapy instead of unnecessary insulin where clinically indicated.',
    impact: 'Recognized by the ICMR Centre for Advanced Research on Diabetes.',
  },
  {
    id: 'nutritional-science',
    kicker: 'Clinical Nutrition Science',
    title: 'Glycemic Index & Millet Clinical Trials',
    summary:
      'Randomized clinical studies evaluating traditional millets, unpolished grains, and South Asian dietary patterns to establish culturally familiar, evidence-backed meal protocols.',
    impact: 'Directly powers our clinical dietetics consultations across all 50+ centres.',
  },
];

export interface PatientStory {
  id: string;
  patientName: string;
  location: string;
  specialityTag: string;
  specialitySlug: string;
  beforeContext: string;
  careProvided: string;
  outcome: string;
}

export const PATIENT_STORIES: PatientStory[] = [
  {
    id: 'story-venkatraman',
    patientName: 'S. Venkatraman, 62',
    location: 'Chennai, Tamil Nadu',
    specialityTag: 'Cardiology & Diabetes Care',
    specialitySlug: 'cardiology',
    beforeContext:
      'Presented for a routine annual metabolic review with borderline elevated blood pressure and unexplained fatigue during morning walks.',
    careProvided:
      'Same-day cardiology consultation, 2D echocardiography, and lipid optimization coordinated alongside his diabetologist at Gopalapuram.',
    outcome:
      'Within four months of coordinated blood pressure, statin, and dietary adjustments, walking stamina returned without chest discomfort.',
  },
  {
    id: 'story-padmavathi',
    patientName: 'Padmavathi Reddy, 54',
    location: 'Hyderabad, Telangana',
    specialityTag: 'Ophthalmology & Renal Protection',
    specialitySlug: 'eye-care',
    beforeContext:
      'Had not undergone a dilated eye or urine microalbumin screening in five years despite living with fluctuating blood sugar.',
    careProvided:
      'Digital fundus photography and OCT scan detected early macular changes alongside mild microalbuminuria; prompt retinal laser and renal-protective therapy began the same week.',
    outcome:
      'Vision remained crisp at 6/6 and kidney markers stabilized over follow-up visits at Domalguda.',
  },
  {
    id: 'story-karthikeyan',
    patientName: 'M. Karthikeyan, 58',
    location: 'Coimbatore, Tamil Nadu',
    specialityTag: 'Diabetic Foot & Vascular Care',
    specialitySlug: 'diabetic-foot-care',
    beforeContext:
      'Developed a persistent plantar ulcer that had failed to heal for eight weeks due to unrecognized foot neuropathy and shoe pressure.',
    careProvided:
      'Vascular Doppler confirmed adequate arterial flow; our foot care team performed sterile debridement, applied total contact offloading, and fitted custom insoles.',
    outcome:
      'Complete wound closure achieved in seven weeks with full mobility preserved.',
  },
];

export interface MedicalArticle {
  id: string;
  slug: string;
  specialitySlug: string;
  category: string;
  title: string;
  readTime: string;
  publishedDate: string;
  reviewedBy: string;
  excerpt: string;
  image: string;
  sections: { heading: string; body: string }[];
}

export const MEDICAL_ARTICLES: MedicalArticle[] = [
  {
    id: 'art-1',
    slug: 'cardiometabolic-connection-heart-screening',
    specialitySlug: 'cardiology',
    category: 'Cardiology & Preventive Health',
    title: 'Why Preventive Cardiac Screening Matters Beyond Cholesterol Numbers',
    readTime: '4 min read',
    publishedDate: 'October 2026',
    reviewedBy: 'Dr. Aravind Subramanian, DM (Cardiology)',
    excerpt:
      'Understanding how blood pressure variability, non-HDL cholesterol, and 2D echocardiography work together to detect silent cardiovascular strain early.',
    image: MEDIA.cardiologySuite,
    sections: [
      {
        heading: 'Looking Past Standard Lipid Panels',
        body: 'Routine cholesterol tests capture only part of cardiovascular risk. ApoB, non-HDL cholesterol, and ambulatory blood pressure trends reveal arterial strain much earlier—especially when evaluated alongside metabolic markers.',
      },
      {
        heading: 'The Role of Non-Invasive Imaging',
        body: 'A baseline 12-lead ECG and 2D colour Doppler echocardiogram give clinicians direct insight into heart muscle relaxation, chamber dimensions, and valve performance without invasive procedures.',
      },
    ],
  },
  {
    id: 'art-2',
    slug: 'fatty-liver-masld-digestive-health',
    specialitySlug: 'gastroenterology',
    category: 'Gastroenterology',
    title: 'Managing Fatty Liver (MASLD): Early Staging and Clinical Pathways',
    readTime: '5 min read',
    publishedDate: 'September 2026',
    reviewedBy: 'Dr. Kavitha Rajesh, DM (Gastroenterology)',
    excerpt:
      'Fatty liver is frequently silent in its early stages. Learn which liver fibrosis scores, ultrasound markers, and dietary adjustments protect long-term hepatic health.',
    image: MEDIA.gastroEndoscopy,
    sections: [
      {
        heading: 'Why Metabolic Fatty Liver Is Often Missed',
        body: 'Many adults carry mild to moderate hepatic steatosis with completely normal routine liver enzyme tests. Combining abdominal ultrasound with simple non-invasive fibrosis indices (FIB-4) identifies who needs specialist hepatology follow-up.',
      },
      {
        heading: 'Reversibility Through Coordinated Care',
        body: 'Gradual, structured weight optimization, refined carbohydrate reduction, and targeted medical therapy under gastroenterology guidance can measurably reduce liver fat content.',
      },
    ],
  },
  {
    id: 'art-3',
    slug: 'annual-retinal-screening-oct-guide',
    specialitySlug: 'eye-care',
    category: 'Ophthalmology',
    title: 'Digital Retinal Imaging and OCT: Protecting Vision Before Symptoms Appear',
    readTime: '3 min read',
    publishedDate: 'August 2026',
    reviewedBy: 'Dr. Meenakshi Sundaram, MS (Ophthalmology)',
    excerpt:
      'How modern non-mydriatic fundus cameras and Optical Coherence Tomography detect microscopic retinal changes long before central vision blurs.',
    image: MEDIA.eyeOphthalmology,
    sections: [
      {
        heading: 'Silent Changes in the Back of the Eye',
        body: 'The retina contains delicate microvessels sensitive to both blood pressure and glucose fluctuations. Early microaneurysms rarely cause pain or blurriness, making scheduled annual screening essential.',
      },
      {
        heading: 'Fast, Painless Diagnostics',
        body: 'High-resolution fundus photography captures the optic disc and macula in minutes, while OCT provides cross-sectional retinal layer mapping to guide timely intervention.',
      },
    ],
  },
  {
    id: 'art-4',
    slug: 'early-kidney-markers-uacr-egfr',
    specialitySlug: 'nephrology',
    category: 'Nephrology',
    title: 'uACR and eGFR Explained: Two Essential Tests for Lifelong Kidney Health',
    readTime: '4 min read',
    publishedDate: 'July 2026',
    reviewedBy: 'Dr. K. Narasimha Rao, DM (Nephrology)',
    excerpt:
      'Why serum creatinine alone misses early renal stress, and how combining urine albumin checks with blood pressure control preserves kidney function.',
    image: MEDIA.nephrologyRenal,
    sections: [
      {
        heading: 'Understanding the Filtration Barrier',
        body: 'Healthy kidneys retain protein while filtering waste. Small amounts of albumin appearing in urine (measured by uACR) signal early barrier stress years before overall filtration rate drops.',
      },
      {
        heading: 'Modern Renal Protection',
        body: 'Today’s evidence-based blood pressure targets, modern renal-protective medications, and individualized sodium/protein guidance help patients maintain stable kidney health for decades.',
      },
    ],
  },
];

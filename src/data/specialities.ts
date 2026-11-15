import { MEDIA } from './media';

export interface SpecialityFAQ {
  question: string;
  answer: string;
}

export interface Speciality {
  slug: string;
  index: string;
  name: string;
  shortName: string;
  category: 'Metabolic & Medical' | 'Organ & Surgical Care' | 'Diagnostics & Preventive';
  tagline: string;
  summary: string;
  introduction: string;
  heroImage: string;
  imageAlt: string;
  accentHex: string;
  conditionsTreated: string[];
  services: string[];
  diagnostics: string[];
  patientGuidance: SpecialityFAQ[];
  featured: boolean;
}

export const SPECIALITIES: Speciality[] = [
  {
    slug: 'diabetes-endocrinology',
    index: '01',
    name: 'Diabetes & Endocrinology',
    shortName: 'Diabetes & Endocrinology',
    category: 'Metabolic & Medical',
    tagline: 'Evidence-based glycemic, thyroid, and endocrine disorder management.',
    summary:
      'Comprehensive evaluation and personalized longitudinal care for Type 1, Type 2, gestational diabetes, thyroid disorders, and complex metabolic syndromes.',
    introduction:
      'Founded in 1991, our Diabetes & Endocrinology department brings together internationally recognized diabetologists, endocrinologists, diabetes educators, and clinical researchers. Rather than focusing on blood glucose readings in isolation, our teams coordinate lipid, blood pressure, thyroid, and organ-protective protocols under one roof.',
    heroImage: MEDIA.diabetesConsult,
    imageAlt: 'Endocrinologist reviewing continuous glucose and metabolic trends with a patient',
    accentHex: '#174A80',
    conditionsTreated: [
      'Type 1 and Type 2 Diabetes Mellitus',
      'Gestational Diabetes & Pre-Conception Metabolic Care',
      'Thyroid Disorders (Hypothyroidism, Hyperthyroidism, Nodules)',
      'Polycystic Ovary Syndrome (PCOS) & Insulin Resistance',
      'Monogenic Diabetes (MODY) & Young-Onset Diabetes',
      'Dyslipidemia, Obesity & Metabolic Syndrome',
    ],
    services: [
      'Individualized Glycemic & Pharmacotherapy Optimization',
      'Continuous Glucose Monitoring (CGM) & Insulin Pump Therapy',
      'Comprehensive Annual Complication Screening Protocols',
      'Gestational & High-Risk Pregnancy Endocrine Clinic',
      'Structured Diabetes Self-Management Education',
    ],
    diagnostics: [
      'NGSP-Standardized HbA1c & Oral Glucose Tolerance Testing',
      'C-Peptide, Insulin Assay & Autoantibody Profiling',
      'Complete Thyroid Panel (TSH, Free T3, Free T4, Anti-TPO)',
      'Body Composition & Visceral Fat Analysis',
    ],
    patientGuidance: [
      {
        question: 'What should I bring to my first Diabetes & Endocrinology consultation?',
        answer:
          'Please carry your recent blood test reports from the past 3 months, a complete list of current medications or insulin dosages, and a 3-day home glucometer log if available.',
      },
      {
        question: 'How often is a comprehensive complication screening recommended?',
        answer:
          'Clinical guidelines advise an annual retinal examination, microalbuminuria kidney check, lipid profile, and monofilament foot nerve screening alongside quarterly HbA1c reviews.',
      },
    ],
    featured: true,
  },
  {
    slug: 'cardiology',
    index: '02',
    name: 'Cardiology & Cardiac Care',
    shortName: 'Cardiology',
    category: 'Organ & Surgical Care',
    tagline: 'Preventive cardiac screening, echocardiography, and vascular risk protection.',
    summary:
      'Dedicated cardiovascular risk assessment, non-invasive cardiac imaging, hypertension management, and preventive heart care integrated with metabolic medicine.',
    introduction:
      'Metabolic health and cardiovascular performance are inseparable. Our Cardiology & Cardiac Care services provide early detection of silent myocardial ischemia, hypertensive heart disease, and lipid-driven arterial risk through modern non-invasive diagnostics and coordinated cardiologist consultations.',
    heroImage: MEDIA.cardiologySuite,
    imageAlt: 'Cardiology specialist conducting an echocardiography heart scan in a diagnostic suite',
    accentHex: '#3C76C1',
    conditionsTreated: [
      'Coronary Artery Risk & Silent Myocardial Ischemia',
      'Resistant & Essential Hypertension',
      'Dyslipidemia & Familial Hypercholesterolemia',
      'Diabetic Cardiomyopathy & Heart Failure Risk',
      'Cardiac Arrhythmias & Palpitations',
    ],
    services: [
      'Comprehensive Cardiometabolic Consultation',
      'Pre-Operative Cardiac Clearance & Risk Stratification',
      'Hypertension & Blood Pressure Ambulatory Management',
      'Preventive Lipid & Statin Optimization Clinics',
      'Post-Cardiac Event Metabolic Rehabilitation Guidance',
    ],
    diagnostics: [
      '12-Lead Digital Electrocardiogram (ECG)',
      '2D Colour Doppler Echocardiography',
      'Treadmill Stress Testing (TMT)',
      '24-Hour Ambulatory Blood Pressure Monitoring (ABPM)',
      'High-Sensitivity Troponin & NT-proBNP Biomarkers',
    ],
    patientGuidance: [
      {
        question: 'Why does preventive cardiology matter even without chest pain?',
        answer:
          'Patients with long-standing hypertension, high cholesterol, or diabetes can develop silent coronary changes without classic symptoms. Non-invasive ECG and echocardiography detect subtle functional shifts early.',
      },
      {
        question: 'Is fasting required before a cardiac evaluation?',
        answer:
          'ECG and echocardiography do not require fasting. However, if your visit includes a fasting lipid profile or treadmill stress test, our care coordinator will advise light attire and timing beforehand.',
      },
    ],
    featured: true,
  },
  {
    slug: 'gastroenterology',
    index: '03',
    name: 'Gastroenterology & Laparoscopic Care',
    shortName: 'Gastroenterology',
    category: 'Organ & Surgical Care',
    tagline: 'Digestive, hepatobiliary, endoscopy, and metabolic surgical services.',
    summary:
      'Specialist diagnosis and treatment for fatty liver disease (MASLD), GERD, gastroparesis, gallbladder conditions, and minimally invasive laparoscopic procedures.',
    introduction:
      'Our Gastroenterology & Surgical Care wing addresses the full spectrum of digestive, hepatic, and gastrointestinal conditions—from non-invasive fatty liver staging and diagnostic endoscopy to safely coordinated laparoscopic gallbladder, hernia, and metabolic surgeries.',
    heroImage: MEDIA.gastroEndoscopy,
    imageAlt: 'Modern gastroenterology endoscopy suite with medical imaging tower and specialist team',
    accentHex: '#1F5A96',
    conditionsTreated: [
      'Metabolic Dysfunction-Associated Steatotic Liver Disease (Fatty Liver)',
      'Gastroesophageal Reflux Disease (GERD) & Peptic Ulcers',
      'Diabetic Gastroparesis & Motility Disorders',
      'Gallstones, Cholecystitis & Biliary Conditions',
      'Abdominal Wall & Inguinal Hernias',
      'Chronic Constipation, IBS & Enteropathy',
    ],
    services: [
      'Upper GI Diagnostic Endoscopy & Colonoscopy',
      'Fatty Liver & Hepatobiliary Risk Management',
      'Laparoscopic Cholecystectomy & Hernia Repair',
      'Bariatric & Metabolic Surgical Consultations',
      'Peri-Operative Glycemic Stabilization Protocols',
    ],
    diagnostics: [
      'High-Definition Video Upper GI Endoscopy',
      'Abdominal & Hepatobiliary Ultrasound',
      'Liver Fibrosis Biomarkers (FIB-4) & Hepatic Panel',
      'H. pylori Breath & Stool Antigen Testing',
    ],
    patientGuidance: [
      {
        question: 'How do you manage blood sugar safely during endoscopy or surgery?',
        answer:
          'Every surgical and endoscopic candidate receives an integrated pre-procedure protocol managed jointly by our gastroenterology, anaesthesia, and diabetology teams to keep glucose stable.',
      },
      {
        question: 'When should fatty liver be evaluated by a specialist?',
        answer:
          'If ultrasound imaging shows hepatic steatosis or liver enzymes (ALT/AST) are elevated alongside abdominal obesity or metabolic syndrome, early staging prevents progression.',
      },
    ],
    featured: true,
  },
  {
    slug: 'eye-care',
    index: '04',
    name: 'Ophthalmology & Eye Care',
    shortName: 'Eye Care',
    category: 'Organ & Surgical Care',
    tagline: 'Retinal screening, diabetic retinopathy lasers, and cataract care.',
    summary:
      'Dedicated ophthalmic evaluations featuring non-mydriatic digital retinal imaging, OCT scanning, glaucoma screening, and specialist cataract care.',
    introduction:
      'Vision preservation has been a cornerstone of Dr. Mohan’s since our founding alongside pioneering retinal specialists. Our Ophthalmology units combine dilated fundoscopy, digital fundus photography, and surgical cataract pathways to safeguard eyesight before symptoms appear.',
    heroImage: MEDIA.eyeOphthalmology,
    imageAlt: 'Ophthalmologist examining a patient with a slit-lamp biomicroscope and digital retinal monitor',
    accentHex: '#285F9E',
    conditionsTreated: [
      'Non-Proliferative & Proliferative Diabetic Retinopathy',
      'Diabetic Macular Edema',
      'Age-Related & Metabolic Cataracts',
      'Glaucoma & Elevated Intraocular Pressure',
      'Refractive Errors & Hypertensive Retinopathy',
    ],
    services: [
      'Comprehensive Dilated Retinal Screening',
      'Retinal Laser Photocoagulation & Intravitreal Care',
      'Phacoemulsification Cataract Surgery',
      'Glaucoma Monitoring & Visual Field Assessment',
      'Tele-Ophthalmology Retinal Grading Across Centres',
    ],
    diagnostics: [
      'Digital Non-Mydriatic Fundus Photography',
      'Optical Coherence Tomography (OCT) Macular Scan',
      'Slit-Lamp Biomicroscopy & Applanation Tonometry',
      'Automated Perimetry Visual Field Testing',
    ],
    patientGuidance: [
      {
        question: 'Will my pupils be dilated during an eye screening?',
        answer:
          'For routine screening we use digital fundus cameras; when comprehensive retinal examination is needed, dilating drops may blur near vision for 3 to 4 hours, so bringing sunglasses or an attendant is helpful.',
      },
      {
        question: 'Can retinopathy be present even if my vision feels 20/20?',
        answer:
          'Yes. Early retinal microaneurysms rarely affect central vision until later stages. Regular annual retinal checks allow timely, sight-saving care.',
      },
    ],
    featured: true,
  },
  {
    slug: 'diabetic-foot-care',
    index: '05',
    name: 'Diabetic Foot Care',
    shortName: 'Diabetic Foot Care',
    category: 'Organ & Surgical Care',
    tagline: 'Ulcer healing, offloading therapy, and limb-preservation clinics.',
    summary:
      'Multidisciplinary diabetic foot assessment, infected wound management, total contact casting, and reconstructive foot care focused on amputation prevention.',
    introduction:
      'Diabetic foot complications require rapid, specialized intervention. Our dedicated Foot Care units bring together foot surgeons, podiatrists, wound-care nurses, and orthotic specialists to heal chronic ulcers, treat neuropathy-related pressure points, and preserve mobility.',
    heroImage: MEDIA.footVascular,
    imageAlt: 'Specialist clinician performing lower-limb vascular and diabetic foot diagnostic evaluation',
    accentHex: '#174A80',
    conditionsTreated: [
      'Neuropathic & Neuro-Ischemic Foot Ulcers',
      'Cellulitis & Deep Foot Space Infections',
      'Charcot Neuroarthropathy',
      'Calluses, Corns & High-Pressure Plantar Lesions',
      'Ingrown Toenails & Fungal Nail Infections',
    ],
    services: [
      'Specialized Wound Debridement & Advanced Dressings',
      'Total Contact Casting & Pressure Offloading',
      'Limb-Salvage & Minor Foot Reconstructive Procedures',
      'Custom Therapeutic Footwear & Insole Fabrication',
      'Preventive Nail & Callus Care Protocols',
    ],
    diagnostics: [
      'Plantar Foot Pressure Mapping (Pedobarography)',
      '10g Semmes-Weinstein Monofilament Testing',
      'Vibration Perception Threshold (Biothesiometry)',
      'Ankle-Brachial Index (ABI) & Foot X-Ray',
    ],
    patientGuidance: [
      {
        question: 'When should a foot blister or cut be seen urgently?',
        answer:
          'Any redness, swelling, warmth, discharge, or a painless sore on the sole of the foot in someone with diabetes or neuropathy warrants same-day specialist inspection.',
      },
    ],
    featured: true,
  },
  {
    slug: 'podiatry',
    index: '06',
    name: 'Podiatry & Biomechanics',
    shortName: 'Podiatry',
    category: 'Organ & Surgical Care',
    tagline: 'Gait analysis, therapeutic orthotics, and preventive nail & skin care.',
    summary:
      'Clinical podiatry focused on lower-limb biomechanics, plantar pressure redistribution, medical-grade pedicure care, and customized insoles.',
    introduction:
      'Preventing ulceration begins long before skin breakdown occurs. Our Podiatry specialists analyze standing and walking plantar pressures, address structural deformities such as bunions or hammertoes, and craft custom-molded orthotics tailored to your daily footwear.',
    heroImage: MEDIA.footVascular,
    imageAlt: 'Podiatry and lower extremity biomechanical assessment room',
    accentHex: '#3C76C1',
    conditionsTreated: [
      'Abnormal Plantar Pressure & Gait Imbalance',
      'Recurrent Callosities & Fissured Heels',
      'Flat Feet, High Arches & Toe Deformities',
      'Onychomycosis & Dystrophic Nails',
      'Post-Ulcer Remission Maintenance',
    ],
    services: [
      'Medical Podiatry & Sterile Nail Care',
      'Custom CAD/CAM Orthotic Insole Design',
      'Diabetic & Orthopedic Footwear Fitting',
      'Biomechanical Gait & Posture Assessment',
    ],
    diagnostics: [
      'Dynamic & Static Foot Scan Pressure Analysis',
      'Lower-Limb Joint Range & Biomechanical Audit',
      'Sudomotor Sweat Function Screening',
    ],
    patientGuidance: [
      {
        question: 'Do I need a referral to see a podiatrist?',
        answer:
          'No referral is needed. Preventive podiatry visits are especially beneficial every 3 to 6 months if you experience foot numbness, calluses, or discomfort while walking.',
      },
    ],
    featured: false,
  },
  {
    slug: 'nephrology',
    index: '07',
    name: 'Nephrology & Kidney Care',
    shortName: 'Nephrology',
    category: 'Organ & Surgical Care',
    tagline: 'Early renal protection, hypertension control, and dedicated dialysis support.',
    summary:
      'Specialist kidney care covering microalbuminuria screening, chronic kidney disease (CKD) progression slowing, electrolyte balance, and outpatient dialysis.',
    introduction:
      'Kidney function can decline silently over years without noticeable symptoms. Our Nephrology & Kidney Care teams intervene at the earliest stage of albumin leakage or eGFR change, utilizing renal-protective therapies, tailored renal nutrition, and serene dialysis units where needed.',
    heroImage: MEDIA.nephrologyRenal,
    imageAlt: 'Bright, tranquil nephrology and outpatient dialysis care bay with natural daylight',
    accentHex: '#1E548C',
    conditionsTreated: [
      'Diabetic Nephropathy & Albuminuria',
      'Chronic Kidney Disease (Stages 1–5)',
      'Hypertensive Nephrosclerosis',
      'Electrolyte & Acid-Base Disorders',
      'Renal Anemia & Mineral Bone Disorder',
    ],
    services: [
      'Early Microalbuminuria & Renal Preservation Clinic',
      'Hypertension & RAAS / SGLT2 Renal Optimization',
      'Outpatient Hemodialysis Support (Select Flagship Centres)',
      'Renal Dietetics & Protein/Potassium Planning',
      'Urology Coordination for Kidney Stones & Prostate Health',
    ],
    diagnostics: [
      'Urine Albumin-to-Creatinine Ratio (uACR)',
      'Serum Creatinine, Cystatin-C & eGFR Profiling',
      'Renal Doppler & Kidney-Ureter-Bladder (KUB) Ultrasound',
      '24-Hour Urine Protein & Electrolyte Panel',
    ],
    patientGuidance: [
      {
        question: 'What is the earliest test to detect kidney stress?',
        answer:
          'A simple spot urine test measuring the Albumin-to-Creatinine Ratio (uACR) detects subtle kidney stress years before blood creatinine levels rise.',
      },
    ],
    featured: true,
  },
  {
    slug: 'neurology',
    index: '08',
    name: 'Neurology & Nerve Health',
    shortName: 'Neurology',
    category: 'Organ & Surgical Care',
    tagline: 'Peripheral neuropathy, autonomic nerve care, and cerebrovascular health.',
    summary:
      'Targeted evaluation of tingling, numbness, neuropathic pain, autonomic nerve dysfunction, balance issues, and metabolic-vascular brain health.',
    introduction:
      'Peripheral and autonomic nerve health directly shape daily comfort, sleep, and mobility. Our Neurology specialists evaluate sensory-motor nerve conduction, manage painful diabetic neuropathy, and screen for cerebrovascular and autonomic complications through integrated neurological care.',
    heroImage: MEDIA.neurologyConsult,
    imageAlt: 'Neurology specialist reviewing neuroimaging and nerve electrophysiology studies',
    accentHex: '#2B5B94',
    conditionsTreated: [
      'Peripheral Sensorimotor Neuropathy',
      'Painful Neuropathy & Burning Feet Syndrome',
      'Autonomic Neuropathy (Orthostatic & GI Symptoms)',
      'Carpal Tunnel & Focal Nerve Entrapments',
      'Cerebrovascular Risk & Cognitive Metabolic Health',
    ],
    services: [
      'Comprehensive Neurological Consultation',
      'Evidence-Based Neuropathic Pain Management',
      'Autonomic Function & Postural Hypotension Care',
      'Fall Prevention & Balance Rehabilitation Guidance',
    ],
    diagnostics: [
      'Nerve Conduction Studies (NCS) & Electromyography',
      'Quantitative Sensory & Vibration Threshold Testing',
      'Cardiac Autonomic Reflex Testing',
      'Carotid Doppler & Cerebrovascular Risk Screening',
    ],
    patientGuidance: [
      {
        question: 'Can tingling or burning sensations in the feet improve?',
        answer:
          'Yes. Stabilizing blood glucose, correcting B12 or thyroid deficiencies, and starting targeted neuropathic therapies significantly ease discomfort and halt nerve progression.',
      },
    ],
    featured: true,
  },
  {
    slug: 'vascular-surgery',
    index: '09',
    name: 'Vascular Assessment & Surgery',
    shortName: 'Vascular Surgery',
    category: 'Organ & Surgical Care',
    tagline: 'Peripheral arterial disease diagnostics, Doppler imaging, and revascularization.',
    summary:
      'Specialist vascular evaluation for leg claudication, non-healing ischemic wounds, varicose veins, and peripheral arterial circulation.',
    introduction:
      'Healthy arterial blood flow is essential for tissue healing and mobility. Our Vascular specialists collaborate closely with Foot Care and Cardiology teams to diagnose peripheral arterial disease (PAD) early using duplex ultrasound and guide timely endovascular or surgical revascularization.',
    heroImage: MEDIA.footVascular,
    imageAlt: 'Vascular clinician performing color duplex Doppler ultrasound on the lower extremity',
    accentHex: '#174A80',
    conditionsTreated: [
      'Peripheral Arterial Disease (PAD) & Claudication',
      'Critical Limb Ischemia & Non-Healing Wounds',
      'Chronic Venous Insufficiency & Varicose Veins',
      'Carotid Artery Stenosis Screening',
      'Deep Vein Thrombosis (DVT) Follow-up',
    ],
    services: [
      'Vascular Specialist Consultation & Limb Salvage Planning',
      'Medical Management of Claudication & Arterial Risk',
      'Surgical & Endovascular Referral Coordination',
      'Compression Therapy & Venous Ulcer Management',
    ],
    diagnostics: [
      'Lower-Limb Arterial & Venous Color Doppler Ultrasound',
      'Ankle-Brachial Index (ABI) & Toe Pressure Measurement',
      'Transcutaneous Oxygen Pressure (TcPO2) Assessment',
    ],
    patientGuidance: [
      {
        question: 'What are early signs of reduced leg circulation?',
        answer:
          'Cramping in the calves during brisk walking that eases with rest, cold feet, or slow-healing minor scratches on the toes warrant a non-invasive vascular Doppler check.',
      },
    ],
    featured: false,
  },
  {
    slug: 'general-medicine',
    index: '10',
    name: 'General & Internal Medicine',
    shortName: 'General Medicine',
    category: 'Metabolic & Medical',
    tagline: 'Comprehensive adult primary care, preventive health checks, and chronic disease coordination.',
    summary:
      'Holistic adult physician consultations managing acute illnesses, hypertension, infections, preventive health evaluations, and multi-morbidity care.',
    introduction:
      'Our General & Internal Medicine physicians serve as the clinical anchor for adults and families—addressing everyday medical concerns, fever and respiratory infections, preventive adult immunization, and complex multi-system conditions that benefit from unified oversight.',
    heroImage: MEDIA.diabetesConsult,
    imageAlt: 'Senior internal medicine consultant discussing preventive health plan with a patient',
    accentHex: '#3C76C1',
    conditionsTreated: [
      'Hypertension, Dyslipidemia & Multi-System Chronic Care',
      'Acute Fevers, Respiratory & Urinary Tract Infections',
      'Anemia, Vitamin Deficiencies & Fatigue Evaluation',
      'Preventive Executive & Senior Health Assessments',
      'Pre-Operative Medical Fitness Evaluations',
    ],
    services: [
      'Same-Day Adult Outpatient Physician Consultations',
      'Comprehensive Preventive Health Check Packages',
      'Senior Citizen Geriatric & Polypharmacy Review',
      'Adult Vaccination & Travel Health Counseling',
      'Inpatient Medical Care & Coordinated Specialist Referrals',
    ],
    diagnostics: [
      'Complete Blood Count, ESR & Inflammatory Markers',
      'Liver, Renal & Electrolyte Biochemical Profiles',
      'Digital Chest X-Ray & Abdominal Ultrasound',
      'Vitamin D, Vitamin B12 & Iron Studies',
    ],
    patientGuidance: [
      {
        question: 'Can I book a comprehensive annual checkup even if I do not have diabetes?',
        answer:
          'Yes. Our preventive health checks are designed for all adults seeking baseline cardiovascular, metabolic, liver, kidney, and thyroid screening.',
      },
    ],
    featured: false,
  },
  {
    slug: 'nutrition-dietetics',
    index: '11',
    name: 'Nutrition & Medical Dietetics',
    shortName: 'Nutrition & Dietetics',
    category: 'Diagnostics & Preventive',
    tagline: 'Culturally grounded medical nutrition therapy for metabolic, cardiac, and renal health.',
    summary:
      'Personalized meal plans tailored to regional Indian cuisines, glycemic index science, weight management, gestational health, and kidney-safe nutrition.',
    introduction:
      'Sustainable nutrition respects both clinical science and family food traditions. Backed by MDRF’s landmark research on Indian dietary patterns, millets, and carbohydrate quality, our clinical dietitians build practical, sustainable nutrition plans for every life stage.',
    heroImage: MEDIA.diabetesConsult,
    imageAlt: 'Clinical nutritionist consulting with a patient on evidence-based dietary planning',
    accentHex: '#25609B',
    conditionsTreated: [
      'Type 1, Type 2 & Gestational Diabetes Nutrition',
      'Medical Weight Management & Obesity',
      'Fatty Liver & Dyslipidemia Dietary Care',
      'Renal-Specific Protein & Potassium Modification',
      'Pediatric & Adolescent Healthy Growth',
    ],
    services: [
      'One-on-One Medical Nutrition Therapy (MNT)',
      'Regional Indian & Family-Adapted Meal Planning',
      'Carbohydrate Counting & Insulin-to-Carb Guidance',
      'Sports, Pregnancy & Elderly Nutrition Counseling',
    ],
    diagnostics: [
      'Anthropometric & Body Composition Assessment',
      '24-Hour Dietary Recall & Macronutrient Analysis',
      'Glycemic Response & Meal-Timing Review',
    ],
    patientGuidance: [
      {
        question: 'Will I have to give up traditional South or North Indian home food?',
        answer:
          'Never. Our dietitians adapt portion balance, fiber pairing, protein distribution, and whole-grain/millet swaps around the dishes your household already enjoys.',
      },
    ],
    featured: false,
  },
  {
    slug: 'laboratory-diagnostics',
    index: '12',
    name: 'Laboratory & Advanced Diagnostics',
    shortName: 'Laboratory & Diagnostics',
    category: 'Diagnostics & Preventive',
    tagline: 'Accredited biochemistry, molecular assays, imaging, and same-day reporting.',
    summary:
      'High-precision clinical pathology, standardized HbA1c assays, cardiac and renal panels, ultrasound, digital X-ray, and home sample collection.',
    introduction:
      'Accurate diagnosis underpins every safe clinical decision. Our accredited central and regional laboratories operate under rigorous internal and external quality controls, delivering standardized biochemistry, endocrinology assays, microbiology, and bedside diagnostic imaging with rapid digital reporting.',
    heroImage: MEDIA.diagnosticsLab,
    imageAlt: 'Accredited clinical biochemistry and molecular diagnostics laboratory with automated analyzers',
    accentHex: '#174A80',
    conditionsTreated: [
      'Comprehensive Metabolic & Endocrine Biomarker Profiling',
      'Cardiovascular & Lipid Risk Panels',
      'Renal, Hepatic & Hematological Diagnostics',
      'Microbiology & Wound Culture Sensitivity',
      'Preventive Whole-Body Diagnostic Screening',
    ],
    services: [
      'Walk-in Phlebotomy & Express Morning Fasting Slots',
      'Home Blood Sample Collection Across Major Cities',
      'Digital Reports Portal & Physician Alert Escalation',
      'Integrated Ultrasound, ECG, Echo, X-Ray & Fundus Imaging',
    ],
    diagnostics: [
      'HPLC Standardized HbA1c & Fasting Metabolic Panels',
      'Hormonal, Thyroid & Reproductive Endocrine Assays',
      'Ultrasound, Color Doppler & Digital Radiography',
      'Microbiology & Drug-Sensitivity Cultures',
    ],
    patientGuidance: [
      {
        question: 'Is home blood sample collection available?',
        answer:
          'Yes. Trained phlebotomists provide morning home sample collection across Chennai, Hyderabad, Bengaluru, Coimbatore, and major regional hubs.',
      },
    ],
    featured: false,
  },
];

export function getSpecialityBySlug(slug: string): Speciality | undefined {
  return SPECIALITIES.find((s) => s.slug === slug);
}

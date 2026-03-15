/**
 * Evidence data for health suggestions.
 *
 * Maps suggestion IDs to:
 * - reason: Patient-facing explanation of WHY this recommendation is made
 * - guidelines: Short labels for always-visible guideline tags
 * - references: Clickable study/guideline links (DOI or stable URLs)
 *
 * SCREENING VARIANTS: Suggestions with dynamic suffixes (-overdue, -upcoming, -followup)
 * share evidence with their base ID. The attachment code in suggestions.ts handles
 * prefix matching for these.
 *
 * DOI STATUS:
 * - All DOIs verified via web lookup against roadmap_text.html citations
 */

export interface SuggestionReference {
  label: string;
  url: string;
}

export interface SuggestionEvidence {
  reason: string;
  guidelines: string[];
  references: SuggestionReference[];
}

// ============================================================
// Shared reference blocks (reused across related suggestions)
// ============================================================

const REFS_PROTEIN: SuggestionReference[] = [
  { label: 'Naghshi 2020 – Protein & all-cause mortality (BMJ meta-analysis)', url: 'https://doi.org/10.1136/bmj.m2412' },
  { label: 'Morton 2018 – Protein & muscle gains (Br J Sports Med meta-analysis)', url: 'https://doi.org/10.1136/bjsports-2017-097608' },
  { label: 'Jäger 2017 – ISSN position stand: protein & exercise', url: 'https://doi.org/10.1186/s12970-017-0177-8' },
  { label: 'Tagawa 2021 – Protein dose-response for muscle mass (Nutr Rev)', url: 'https://doi.org/10.1093/nutrit/nuaa104' },
];

const REFS_SODIUM: SuggestionReference[] = [
  { label: 'Filippini 2021 – Sodium reduction & blood pressure (Circulation)', url: 'https://doi.org/10.1161/CIRCULATIONAHA.120.050371' },
  { label: 'Huang 2020 – Dietary sodium reduction & BP (BMJ)', url: 'https://doi.org/10.1136/bmj.m315' },
];

const REFS_BP_LIFESTYLE: SuggestionReference[] = [
  { label: 'Charchar 2023 – ISH lifestyle management of hypertension', url: 'https://doi.org/10.1097/HJH.0000000000003563' },
];

const REFS_EXERCISE: SuggestionReference[] = [
  { label: 'Piercy 2018 – Physical Activity Guidelines for Americans (JAMA)', url: 'https://doi.org/10.1001/jama.2018.14854' },
  { label: 'Lear 2017 – Physical activity & mortality in 130,000 people (Lancet PURE)', url: 'https://doi.org/10.1016/S0140-6736(17)31634-3' },
  { label: 'Kodama 2009 – Cardiorespiratory fitness & mortality (JAMA)', url: 'https://doi.org/10.1001/jama.2009.681' },
];

const REFS_LIPID_GUIDELINES: SuggestionReference[] = [
  { label: 'Grundy 2019 – AHA/ACC Cholesterol Guideline (JACC)', url: 'https://doi.org/10.1016/j.jacc.2018.11.002' },
  { label: 'Mach 2020 – ESC/EAS Dyslipidaemia Guidelines (Eur Heart J)', url: 'https://doi.org/10.1093/eurheartj/ehz455' },
];

const REFS_LIPID_EVIDENCE: SuggestionReference[] = [
  ...REFS_LIPID_GUIDELINES,
  { label: 'Borén 2020 – LDL causes atherosclerosis: EAS consensus (Eur Heart J)', url: 'https://doi.org/10.1093/eurheartj/ehz962' },
  { label: 'Sniderman 2019 – ApoB & cardiovascular disease (JAMA Cardiol)', url: 'https://doi.org/10.1001/jamacardio.2019.3780' },
];

const REFS_PESA: SuggestionReference[] = [
  { label: 'Ibanez 2021 – PESA study: subclinical atherosclerosis progression (JACC)', url: 'https://doi.org/10.1016/j.jacc.2021.05.011' },
];

const REFS_LDL_SAFETY: SuggestionReference[] = [
  { label: 'Karagiannis 2021 – Safety of very low LDL (<30 mg/dL) (Eur Heart J)', url: 'https://doi.org/10.1093/eurheartj/ehaa1080' },
  { label: 'Patti 2023 – Very low LDL intensive lowering: safety & efficacy', url: 'https://doi.org/10.1093/ehjcvp/pvac049' },
  { label: 'Navarese 2018 – LDL lowering & cardiovascular mortality (JAMA)', url: 'https://doi.org/10.1001/jama.2018.2525' },
];

const REFS_LPA: SuggestionReference[] = [
  { label: 'Kronenberg 2022 – Lp(a) in cardiovascular disease: EAS consensus (Eur Heart J)', url: 'https://doi.org/10.1093/eurheartj/ehac361' },
];

const REFS_GLP1: SuggestionReference[] = [
  { label: 'Wilding 2021 – Semaglutide for overweight/obesity: STEP 1 trial (NEJM)', url: 'https://doi.org/10.1056/NEJMoa2032183' },
  { label: 'Wilding 2022 – Weight regain after semaglutide withdrawal (Diabetes Obes Metab)', url: 'https://doi.org/10.1111/dom.14725' },
];

const REFS_SGLT2I: SuggestionReference[] = [
  { label: 'Zinman 2015 – EMPA-REG OUTCOME: empagliflozin CV outcomes (NEJM)', url: 'https://doi.org/10.1056/NEJMoa1504720' },
  { label: 'McMurray 2019 – DAPA-HF: dapagliflozin in heart failure (NEJM)', url: 'https://doi.org/10.1056/NEJMoa1911303' },
];

const REFS_BP_TRIALS: SuggestionReference[] = [
  { label: 'SPRINT 2015 – Intensive BP lowering <120 mmHg (NEJM)', url: 'https://doi.org/10.1056/NEJMoa1511939' },
  { label: 'Liu 2024 – ESPRIT: intensive BP lowering incl. diabetes (Lancet)', url: 'https://doi.org/10.1016/S0140-6736(24)01028-6' },
];

const REFS_SCREENING_ACS: SuggestionReference[] = [
  { label: 'American Cancer Society – Screening Guidelines', url: 'https://www.cancer.org/cancer/screening/american-cancer-society-guidelines-for-the-early-detection-of-cancer.html' },
];

const GUIDELINES_LIPIDS = ['AHA/ACC 2018', 'ESC/EAS 2019'];
const GUIDELINES_BP = ['ISH/ESH 2023'];

// ============================================================
// Evidence map
// ============================================================

export const SUGGESTION_EVIDENCE: Record<string, SuggestionEvidence> = {

  // ── Nutrition ──────────────────────────────────────────────

  'protein-target': {
    reason: 'Higher protein intake supports muscle maintenance, metabolic health, and healthy aging. In healthy adults pursuing strength, lean mass, or healthy aging, intakes around 1.6g per kg per day are well supported by sports-nutrition evidence. If kidney function is reduced (CKD stage 3 or higher), a lower target around 0.8g/kg is more appropriate.',
    guidelines: ['ISSN 2017', 'KDIGO 2024'],
    references: REFS_PROTEIN,
  },

  'low-salt': {
    reason: 'Excess sodium raises blood pressure by increasing fluid retention. The ACC/AHA guidelines recommend an ideal sodium intake of less than 1,500mg per day for most adults. Meta-analyses confirm that reducing sodium intake produces meaningful blood pressure reductions, with greater benefit in those who already have elevated blood pressure.',
    guidelines: [...GUIDELINES_BP, 'ACC/AHA 2017'],
    references: [
      ...REFS_SODIUM,
      ...REFS_BP_LIFESTYLE,
      { label: 'Whelton 2017 – ACC/AHA Blood Pressure Guideline (Hypertension)', url: 'https://doi.org/10.1161/HYP.0000000000000065' },
    ],
  },

  'fiber': {
    reason: 'Dietary fibre lowers cardiovascular risk through multiple mechanisms: reducing cholesterol absorption, improving blood sugar control, and supporting a healthy gut microbiome. A Cochrane review found that higher fibre intake significantly reduces cardiovascular events.',
    guidelines: [],
    references: [
      { label: 'Hartley 2016 – Dietary fibre & cardiovascular disease (Cochrane Review)', url: 'https://doi.org/10.1002/14651858.CD011472.pub2' },
    ],
  },

  'high-potassium': {
    reason: 'Potassium helps counteract the blood-pressure-raising effects of sodium. The ISH recommends 3,500–5,000mg/day from food sources. This recommendation only applies when kidney function is adequate (eGFR ≥45), as impaired kidneys may not excrete excess potassium safely.',
    guidelines: [...GUIDELINES_BP],
    references: REFS_BP_LIFESTYLE,
  },

  'trig-nutrition': {
    reason: 'Blood triglycerides are highly responsive to dietary changes — improvements can be seen within 2–3 weeks. The most effective dietary measures are reducing alcohol, sugar, and total calorie intake. Mendelian randomisation studies confirm that triglyceride-lowering reduces coronary heart disease risk.',
    guidelines: [],
    references: [
      { label: 'Ference 2019 – Triglyceride-lowering & coronary risk: Mendelian randomisation (JAMA)', url: 'https://doi.org/10.1001/jama.2018.20045' },
    ],
  },

  'reduce-alcohol': {
    reason: 'Alcohol contributes to weight gain (7 calories per gram), raises triglycerides, and elevates blood pressure. The International Society of Hypertension recommends reducing or eliminating alcohol intake for blood pressure management and metabolic health.',
    guidelines: [...GUIDELINES_BP],
    references: REFS_BP_LIFESTYLE,
  },

  // ── Exercise ───────────────────────────────────────────────

  'exercise': {
    reason: 'The Physical Activity Guidelines for Americans recommend at least 150 minutes of moderate-intensity aerobic activity plus 2–3 resistance training sessions per week. Large studies (PURE, 130,000 people across 17 countries) show that higher physical activity reduces all-cause mortality regardless of income level or country. Cardiorespiratory fitness is one of the strongest predictors of longevity.',
    guidelines: ['Physical Activity Guidelines 2018'],
    references: REFS_EXERCISE,
  },

  // ── Sleep ──────────────────────────────────────────────────

  'sleep': {
    reason: 'Consistent sleep of 7–9 hours per night is essential for cardiovascular health, immune function, and cognitive performance. A large meta-analysis of over 1.3 million participants found that both short sleep (<6 hours) and long sleep (>8–9 hours) are associated with significantly increased mortality risk.',
    guidelines: [],
    references: [
      { label: 'Cappuccio 2010 – Sleep duration & all-cause mortality: meta-analysis (Sleep)', url: 'https://doi.org/10.1093/sleep/33.5.585' },
    ],
  },

  // ── Weight & Diabetes Medications ──────────────────────────

  'weight-med-glp1': {
    reason: 'GLP-1 and dual GIP/GLP-1 agonists such as semaglutide and tirzepatide have been shown in large randomised trials to produce substantial weight loss alongside improvements in blood sugar, blood pressure, and triglycerides. They are best used as part of comprehensive obesity care and only after checking eligibility, contraindications, tolerability, and pregnancy plans.',
    guidelines: [],
    references: REFS_GLP1,
  },

  'weight-med-glp1-increase': {
    reason: 'GLP-1 medications show a dose-dependent response — higher doses generally produce greater weight loss and metabolic improvement. Clinical trials used a gradual dose-escalation approach to improve tolerability.',
    guidelines: [],
    references: REFS_GLP1,
  },

  'weight-med-glp1-switch': {
    reason: 'If response to current incretin therapy is inadequate, switching to a more potent option may be reasonable. Tirzepatide produced greater mean weight loss than semaglutide in head-to-head trials, but treatment choice should still be individualized.',
    guidelines: [],
    references: REFS_GLP1,
  },

  'weight-med-sglt2i': {
    reason: 'SGLT2 inhibitors (empagliflozin, dapagliflozin) work by a different mechanism to GLP-1 medications — they cause the kidneys to excrete excess glucose. Beyond modest weight loss, they provide proven cardiovascular and kidney protection, making them a valuable addition for metabolic health.',
    guidelines: [],
    references: REFS_SGLT2I,
  },

  'weight-med-metformin': {
    reason: 'Metformin has been used for decades to improve blood sugar control. The Diabetes Prevention Program (DPP) study showed that metformin reduced diabetes progression. Extended-release formulations cause fewer gastrointestinal side effects.',
    guidelines: [],
    references: [
      { label: 'Lee 2021 – Metformin & mortality in Diabetes Prevention Program (Diabetes Care)', url: 'https://doi.org/10.2337/dc21-1046' },
    ],
  },

  'weight-glp1': {
    reason: 'GLP-1 receptor agonists like tirzepatide and semaglutide have been shown in large randomised trials to produce significant weight loss alongside improvements in metabolic health. These medications work best as part of a comprehensive approach including diet, exercise, and sleep.',
    guidelines: [],
    references: REFS_GLP1,
  },

  // ── General ────────────────────────────────────────────────

  'measure-waist': {
    reason: 'With a BMI in the 25–30 range, waist circumference is critical for determining whether your weight poses health risks. The AACE 2025 guidelines and NICE guidelines use waist-to-height ratio (WHtR) to reclassify individuals — a WHtR below 0.5 indicates healthy body composition even with a BMI of 25–29.9.',
    guidelines: ['AACE 2025', 'NICE'],
    references: [
      { label: 'Ashwell 2012 – WHtR better than BMI for cardiometabolic risk (Obes Rev)', url: 'https://doi.org/10.1111/j.1467-789X.2011.00952.x' },
    ],
  },

  // ── Blood Work: HbA1c ─────────────────────────────────────

  'hba1c-diabetic': {
    reason: 'An HbA1c in the diabetic range (≥6.5% / ≥47.5 mmol/mol) indicates sustained high blood sugar levels over the past 2–3 months. This requires medical management to prevent complications including cardiovascular disease, kidney damage, nerve damage, and vision loss.',
    guidelines: ['ADA Standards of Care'],
    references: [
      { label: 'ADA – Standards of Medical Care in Diabetes', url: 'https://diabetesjournals.org/care/issue/47/Supplement_1' },
    ],
  },

  'hba1c-prediabetic': {
    reason: 'An HbA1c in the prediabetic range (5.7–6.4% / 38.8–47.4 mmol/mol) means your blood sugar is higher than normal but not yet diabetic. This is a critical window — lifestyle changes at this stage can prevent or significantly delay progression to type 2 diabetes.',
    guidelines: ['ADA Standards of Care'],
    references: [
      { label: 'ADA – Standards of Medical Care in Diabetes', url: 'https://diabetesjournals.org/care/issue/47/Supplement_1' },
    ],
  },

  'hba1c-normal': {
    reason: 'A normal HbA1c (below 5.7% / below 38.8 mmol/mol) indicates healthy blood sugar control over the past 2–3 months. Maintaining this through diet, exercise, and healthy weight reduces your long-term risk of diabetes.',
    guidelines: ['ADA Standards of Care'],
    references: [
      { label: 'ADA – Standards of Medical Care in Diabetes', url: 'https://diabetesjournals.org/care/issue/47/Supplement_1' },
    ],
  },

  // ── Blood Work: Atherogenic Lipids ─────────────────────────

  'apob-very-high': {
    reason: 'ApoB directly measures the number of atherogenic (artery-clogging) particles in your blood and is considered one of the strongest predictors of cardiovascular risk by the European Atherosclerosis Society. Each LDL, VLDL, and Lp(a) particle carries exactly one ApoB molecule, making it a more direct marker than LDL cholesterol. A very high ApoB indicates significantly elevated cardiovascular risk, and statin therapy is typically recommended.\n\nThis tool uses a low preventive target of ???50 mg/dL (???0.5 g/L) to reflect cumulative lifetime exposure to atherogenic particles, which is more aggressive than many standard primary-prevention thresholds.',
    guidelines: [...GUIDELINES_LIPIDS, 'EAS Consensus'],
    references: [...REFS_LIPID_EVIDENCE, ...REFS_PESA, ...REFS_LDL_SAFETY],
  },

  'apob-high': {
    reason: 'ApoB directly measures the number of atherogenic (artery-clogging) particles in your blood. It is considered a more accurate predictor of cardiovascular risk than LDL cholesterol by the European Atherosclerosis Society. Your level is elevated and lifestyle modifications and/or medication should be discussed with your doctor.\n\nThis tool uses a low preventive target of ???50 mg/dL (???0.5 g/L) to reflect cumulative lifetime exposure to atherogenic particles, which is more aggressive than many standard primary-prevention thresholds.',
    guidelines: [...GUIDELINES_LIPIDS, 'EAS Consensus'],
    references: [...REFS_LIPID_EVIDENCE, ...REFS_PESA, ...REFS_LDL_SAFETY],
  },

  'apob-borderline': {
    reason: 'ApoB measures the total number of atherogenic particles in your blood. Standard guidelines may classify this level as acceptable, but this tool uses a more aggressive preventive target based on the idea that cumulative LDL/ApoB exposure drives atherosclerosis over time. This is why your result shows as borderline rather than optimal.',
    guidelines: [...GUIDELINES_LIPIDS, 'EAS Consensus'],
    references: [...REFS_LIPID_EVIDENCE, ...REFS_PESA],
  },

  'ldl-very-high': {
    reason: 'Very high LDL cholesterol may indicate familial hypercholesterolaemia, a genetic condition causing elevated LDL from birth. The AHA/ACC and ESC/EAS guidelines recommend statin therapy at this level. A causal relationship between LDL particles and atherosclerosis is well-established through Mendelian randomisation studies and decades of clinical trials.\n\nNote: ApoB is a more accurate marker than LDL cholesterol for cardiovascular risk. If available, ask your doctor about testing ApoB.',
    guidelines: [...GUIDELINES_LIPIDS],
    references: [...REFS_LIPID_EVIDENCE, ...REFS_LDL_SAFETY],
  },

  'ldl-high': {
    reason: 'High LDL cholesterol is a well-established driver of atherosclerosis. The AHA/ACC and ESC/EAS guidelines recommend lifestyle modification and discussion of statin therapy at this level.\n\nNote: ApoB is a more accurate marker than LDL cholesterol for cardiovascular risk. If available, ask your doctor about testing ApoB.',
    guidelines: [...GUIDELINES_LIPIDS],
    references: [...REFS_LIPID_EVIDENCE, ...REFS_LDL_SAFETY],
  },

  'ldl-borderline': {
    reason: 'Standard guidelines may classify this LDL level as acceptable, but this tool uses a more aggressive preventive target because cumulative LDL exposure drives atherosclerosis over time. LDL is a causal factor in atherosclerosis.\n\nNote: ApoB is a more accurate marker than LDL cholesterol. If available, ask your doctor about testing ApoB.',
    guidelines: [...GUIDELINES_LIPIDS],
    references: [...REFS_LIPID_EVIDENCE, ...REFS_PESA],
  },

  'non-hdl-very-high': {
    reason: 'Non-HDL cholesterol captures all atherogenic particles (LDL + VLDL + remnants) and is a better predictor of cardiovascular risk than LDL cholesterol alone. Your level is very high, indicating significantly elevated risk. Treatment with statins and lifestyle modification is typically recommended.\n\nNote: ApoB is the most accurate single marker. If available, ask your doctor about testing ApoB.',
    guidelines: [...GUIDELINES_LIPIDS],
    references: REFS_LIPID_EVIDENCE,
  },

  'non-hdl-high': {
    reason: 'Non-HDL cholesterol captures all atherogenic particles (LDL + VLDL + remnants). Your level is high, indicating elevated cardiovascular risk.\n\nNote: ApoB is the most accurate single marker. If available, ask your doctor about testing ApoB.',
    guidelines: [...GUIDELINES_LIPIDS],
    references: REFS_LIPID_EVIDENCE,
  },

  'non-hdl-borderline': {
    reason: 'Non-HDL cholesterol captures all atherogenic particles (LDL + VLDL + remnants). Standard guidelines may classify this level as acceptable, but this tool uses a more aggressive preventive target because cumulative exposure to atherogenic lipids drives atherosclerosis over time.\n\nNote: ApoB is the most accurate single marker. If available, ask your doctor about testing ApoB.',
    guidelines: [...GUIDELINES_LIPIDS],
    references: [...REFS_LIPID_EVIDENCE, ...REFS_PESA],
  },

  // ── Blood Work: Lp(a) ─────────────────────────────────────

  'lpa-elevated': {
    reason: 'Lp(a) is genetically determined — you are born with a set level that cannot be changed through diet or lifestyle. The European Atherosclerosis Society identifies elevated Lp(a) as an independent cardiovascular risk factor. Since Lp(a) itself cannot be lowered (yet), the strategy is to aggressively reduce all other modifiable risk factors: lipids, blood pressure, blood sugar, weight, and medications where indicated.',
    guidelines: ['EAS 2022'],
    references: REFS_LPA,
  },

  'lpa-borderline': {
    reason: 'Your Lp(a) is in the borderline range. Lp(a) is genetically determined and does not change with lifestyle. The EAS consensus recommends that borderline levels still warrant attention to other cardiovascular risk factors.',
    guidelines: ['EAS 2022'],
    references: REFS_LPA,
  },

  'lpa-normal': {
    reason: 'Your Lp(a) is in the normal range. Since Lp(a) is genetically determined and does not change significantly over time, this is typically a one-time test.',
    guidelines: ['EAS 2022'],
    references: REFS_LPA,
  },

  // ── Blood Work: Other ──────────────────────────────────────

  'total-chol-high': {
    reason: 'Total cholesterol is a broad measure that includes both harmful (LDL, VLDL) and protective (HDL) cholesterol. A high level warrants further investigation with a full lipid panel, ideally including ApoB, to determine which components are elevated.',
    guidelines: [...GUIDELINES_LIPIDS],
    references: REFS_LIPID_GUIDELINES,
  },

  'total-chol-borderline': {
    reason: 'Total cholesterol is a broad measure that includes both harmful and protective cholesterol. A borderline level is worth monitoring. A full lipid panel, ideally including ApoB, provides a more accurate cardiovascular risk picture.',
    guidelines: [...GUIDELINES_LIPIDS],
    references: REFS_LIPID_GUIDELINES,
  },

  'hdl-low': {
    reason: 'Low HDL cholesterol is associated with increased cardiovascular risk. Unlike LDL, HDL is generally considered protective — it helps remove cholesterol from arteries. Regular exercise and healthy fats (olive oil, nuts, avocado) can help raise HDL levels. Weight loss also improves HDL.',
    guidelines: [...GUIDELINES_LIPIDS],
    references: REFS_LIPID_GUIDELINES,
  },

  'trig-very-high': {
    reason: 'Very high triglycerides (≥500 mg/dL / ≥5.64 mmol/L) carry an acute risk of pancreatitis — inflammation of the pancreas that can be life-threatening. This requires immediate medical attention and aggressive dietary intervention (strict alcohol and sugar avoidance, calorie reduction).',
    guidelines: [...GUIDELINES_LIPIDS],
    references: REFS_LIPID_GUIDELINES,
  },

  // ── Blood Pressure ─────────────────────────────────────────

  'bp-crisis': {
    reason: 'A blood pressure reading this high (≥180/120 mmHg) is classified as a hypertensive crisis. If accompanied by symptoms such as chest pain, shortness of breath, severe headache, or vision changes, this is a medical emergency requiring immediate attention.',
    guidelines: [...GUIDELINES_BP],
    references: [...REFS_BP_LIFESTYLE, ...REFS_BP_TRIALS],
  },

  'bp-stage2': {
    reason: 'Stage 2 hypertension (???140/90 mmHg) significantly increases the risk of heart attack, stroke, kidney disease, and heart failure. At this level, medication is typically recommended alongside lifestyle measures.\n\nMost modern guidelines aim for below 130/80 mmHg in treated adults, while lower systolic targets can be considered only when they are well tolerated and measured carefully.',
    guidelines: [...GUIDELINES_BP, 'SPRINT 2015', 'ESPRIT 2024'],
    references: [...REFS_BP_LIFESTYLE, ...REFS_SODIUM, ...REFS_BP_TRIALS],
  },

  'bp-stage1': {
    reason: 'Stage 1 hypertension (130???139/80???89 mmHg) is the point at which blood pressure starts to cause meaningful cardiovascular damage over time. Lifestyle measures are the first-line treatment: reduce sodium, increase potassium-rich foods, exercise regularly, prioritise sleep, and manage weight.\n\nMost modern guidelines aim for below 130/80 mmHg in treated adults, while lower systolic targets can be considered only when they are well tolerated and measured carefully.',
    guidelines: [...GUIDELINES_BP, 'SPRINT 2015', 'ESPRIT 2024'],
    references: [...REFS_BP_LIFESTYLE, ...REFS_SODIUM, ...REFS_BP_TRIALS],
  },

  // ── Cholesterol Medication Cascade ─────────────────────────

  'med-statin': {
    reason: 'Statins are the cornerstone of cholesterol-lowering therapy. Both the AHA/ACC and ESC/EAS guidelines recommend statins as first-line treatment when lipid levels exceed targets. Statins reduce LDL/ApoB by inhibiting cholesterol synthesis in the liver, and large clinical trials consistently show they reduce cardiovascular events and mortality.\n\nThis tool uses a low preventive target for atherogenic particles to reflect cumulative lifetime exposure, which is more aggressive than many standard primary-prevention thresholds. Multiple studies confirm that very low LDL levels are generally safe.',
    guidelines: [...GUIDELINES_LIPIDS],
    references: [...REFS_LIPID_GUIDELINES, ...REFS_PESA, ...REFS_LDL_SAFETY],
  },

  'med-ezetimibe': {
    reason: 'Ezetimibe works differently from statins — it blocks cholesterol absorption in the intestine. Adding ezetimibe to a statin typically lowers LDL by an additional 15–20%. Recent evidence shows that starting ezetimibe early alongside a statin produces better cardiovascular outcomes than adding it later.',
    guidelines: [...GUIDELINES_LIPIDS],
    references: [
      ...REFS_LIPID_GUIDELINES,
      { label: 'Leosdottir 2025 – Early vs late ezetimibe initiation (JACC)', url: 'https://doi.org/10.1016/j.jacc.2025.02.007' },
    ],
  },

  'med-statin-increase': {
    reason: 'Doubling the statin dose typically provides an additional 6–7% LDL reduction (the "rule of 6"). While each dose increase has diminishing returns, the cumulative benefit of reaching lower lipid targets is supported by guidelines and the PESA study evidence.',
    guidelines: ['ESC/EAS 2019', 'BPAC 2021'],
    references: [
      { label: 'Mach 2020 – ESC/EAS Dyslipidaemia Guidelines (Eur Heart J)', url: 'https://doi.org/10.1093/eurheartj/ehz455' },
    ],
  },

  'med-statin-switch': {
    reason: 'Different statins vary in potency. Rosuvastatin 40mg provides the highest LDL reduction (~63%), while some other statins max out at lower potencies. Switching to a more potent statin is recommended by ESC/EAS guidelines before adding additional medications.',
    guidelines: ['ESC/EAS 2019', 'BPAC 2021'],
    references: [
      { label: 'Mach 2020 – ESC/EAS Dyslipidaemia Guidelines (Eur Heart J)', url: 'https://doi.org/10.1093/eurheartj/ehz455' },
    ],
  },

  'med-pcsk9i': {
    reason: 'PCSK9 inhibitors (evolocumab, alirocumab) are injectable medications that can lower LDL by an additional 50–60% beyond statins. They are recommended by AHA/ACC and ESC/EAS guidelines when lipid targets are not met with maximally tolerated statin plus ezetimibe. They also lower Lp(a) by approximately 25–30%.',
    guidelines: [...GUIDELINES_LIPIDS],
    references: REFS_LIPID_GUIDELINES,
  },

  // ── Cancer Screening ───────────────────────────────────────

  'screening-colorectal': {
    reason: 'Average-risk colorectal screening starts at age 45 in current major guidelines. Screening options include annual stool-based testing (FIT) or colonoscopy every 10 years, and the right choice depends on access, preference, and individual risk factors.',
    guidelines: ['USPSTF 2021', 'ACS'],
    references: [
      { label: 'USPSTF ??? Colorectal Cancer Screening Recommendation', url: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/colorectal-cancer-screening' },
      ...REFS_SCREENING_ACS,
    ],
  },

  'screening-breast': {
    reason: 'Mammography screening reduces breast cancer mortality by detecting cancers early, when treatment is most effective. The ACS recommends annual mammograms starting at age 45 (optional from 40). The benefits and appropriate frequency should be discussed with your doctor based on your individual risk.',
    guidelines: ['ACS'],
    references: REFS_SCREENING_ACS,
  },

  'screening-cervical': {
    reason: 'Cervical screening (HPV testing or Pap smear) detects precancerous changes caused by human papillomavirus. Catching these changes early prevents cervical cancer from developing. HPV testing every 5 years is now preferred over Pap smears every 3 years due to higher sensitivity.',
    guidelines: ['ACS'],
    references: REFS_SCREENING_ACS,
  },

  'screening-lung': {
    reason: 'The USPSTF recommends annual low-dose CT screening for adults aged 50–80 with a smoking history of ≥15 pack-years (current or former smokers). Low-dose CT can detect lung cancer at an early, treatable stage, significantly reducing lung cancer mortality.',
    guidelines: ['USPSTF 2021'],
    references: [
      ...REFS_SCREENING_ACS,
      { label: 'USPSTF – Lung Cancer Screening Recommendation', url: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/lung-cancer-screening' },
    ],
  },

  'screening-prostate': {
    reason: 'Prostate cancer screening via PSA testing is a shared decision between patient and doctor. The benefits (early detection) must be weighed against the risks (overdiagnosis and overtreatment of slow-growing cancers). Long-term follow-up of the Prostate Cancer Prevention Trial showed that 5-alpha reductase inhibitors can reduce prostate cancer incidence.',
    guidelines: [],
    references: [
      ...REFS_SCREENING_ACS,
      { label: 'Goodman 2019 – Finasteride & prostate cancer mortality (NEJM)', url: 'https://doi.org/10.1056/NEJMc1809961' },
    ],
  },

  'screening-prostate-elevated': {
    reason: 'A PSA above 4.0 ng/mL is above the typical reference range, but elevated PSA can have multiple causes including benign prostatic hyperplasia (BPH), infection, or prostate cancer. Further evaluation by your doctor is needed to determine the cause.',
    guidelines: [],
    references: REFS_SCREENING_ACS,
  },

  'screening-endometrial-bleeding': {
    reason: 'Abnormal uterine bleeding — especially after menopause — can be an early sign of endometrial cancer. Prompt evaluation is important because endometrial cancer detected early has a very high cure rate.',
    guidelines: ['ACS'],
    references: REFS_SCREENING_ACS,
  },

  'screening-endometrial': {
    reason: 'Women at menopause should be aware of the symptoms of endometrial cancer, particularly unexpected vaginal bleeding. The ACS recommends that women be informed about risks and symptoms at the onset of menopause.',
    guidelines: ['ACS'],
    references: REFS_SCREENING_ACS,
  },

  'screening-dexa': {
    reason: 'A DEXA scan measures bone mineral density and can detect osteoporosis before a fracture occurs. Early detection allows treatment with medications that reduce fracture risk. For average-risk adults, the USPSTF supports routine screening for women aged 65+ and younger postmenopausal women only when fracture risk is increased.',
    guidelines: ['USPSTF'],
    references: [
      { label: 'USPSTF – Osteoporosis Screening Recommendation', url: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/osteoporosis-screening' },
    ],
  },


  // ── Skin Health ────────────────────────────────────────────

  'skin-moisturizer': {
    reason: 'Ceramides are the primary lipids in the skin barrier — a randomised trial showed ceramide-containing moisturisers significantly improved skin hydration and barrier function for up to 7 days. Niacinamide (vitamin B3) is a well-studied ingredient that reduces pigmentation, improves skin texture, and enhances the skin barrier.',
    guidelines: [],
    references: [
      { label: 'Lueangarun 2019 – Ceramide moisturiser efficacy (Dermatol Ther)', url: 'https://doi.org/10.1111/dth.13090' },
      { label: 'Hakozaki 2002 – Niacinamide reduces pigmentation (Br J Dermatol)', url: 'https://doi.org/10.1046/j.1365-2133.2002.04834.x' },
    ],
  },

  'skin-sunscreen': {
    reason: 'A landmark randomised trial (Hughes 2013) proved that daily sunscreen use prevents skin aging — not just sunburn, but the wrinkles, texture changes, and pigmentation caused by UV exposure. Daily broad-spectrum SPF 50+ sunscreen applied to exposed skin is one of the most evidence-backed anti-aging interventions available.',
    guidelines: [],
    references: [
      { label: 'Hughes 2013 – Sunscreen prevents skin aging: randomised trial (Ann Intern Med)', url: 'https://doi.org/10.7326/0003-4819-158-11-201306040-00002' },
      { label: 'Randhawa 2016 – Daily sunscreen improves photoaging (Dermatol Surg)', url: 'https://doi.org/10.1097/DSS.0000000000000879' },
    ],
  },

  'skin-retinoid': {
    reason: 'Retinoids (vitamin A derivatives) are the most studied topical anti-aging treatment. They stimulate collagen production, accelerate cell turnover, and improve skin texture. A randomised trial found adapalene 0.3% comparable in efficacy to tretinoin 0.05% for treating photoaging, with better tolerability. Caution: retinoids must not be used during pregnancy.',
    guidelines: [],
    references: [
      { label: 'Bagatin 2018 – Adapalene vs tretinoin for photoaging (Eur J Dermatol)', url: 'https://doi.org/10.1684/ejd.2018.3320' },
      { label: 'Zasada 2019 – Retinoids in skin treatments (Postepy Dermatol Alergol)', url: 'https://doi.org/10.5114/ada.2019.87443' },
    ],
  },

  'skin-advanced': {
    reason: 'For those seeking additional skin rejuvenation, several evidence-based professional treatments exist. Red light therapy (630–850nm) was shown in a controlled trial to significantly reduce wrinkles and increase collagen density. Resistance training has also been shown to improve dermal structure. Other professional options include fractional laser, IPL, and microneedling.',
    guidelines: [],
    references: [
      { label: 'Wunsch 2014 – Red light therapy for skin rejuvenation (Photomed Laser Surg)', url: 'https://doi.org/10.1089/pho.2013.3616' },
      { label: 'Nishikori 2023 – Resistance training rejuvenates skin (Sci Rep)', url: 'https://doi.org/10.1038/s41598-023-37207-9' },
    ],
  },
};

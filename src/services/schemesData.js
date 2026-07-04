export const mockSchemes = [
  {
    id: 1,
    title: 'PM Kisan Samman Nidhi',
    description: 'Financial support of ₹6,000 per year to all landholding farmer families across India.',
    tags: ['Agriculture', 'Financial Assistance'],
    deadline: '2026-12-31',
    benefits: [
      '₹6,000 per year paid in three equal installments',
      'Direct benefit transfer to bank accounts',
      'Reduces dependence on moneylenders',
      'Coverage for all small and marginal farmers'
    ],
    criteria: [
      'Must be a landholding farmer family',
      'Must possess valid Aadhaar card',
      'Should have an active bank account linked to Aadhaar',
      'Not a government employee or income tax payer'
    ],
    steps: [
      'Visit the official PM Kisan portal (pmkisan.gov.in)',
      'Click on "New Farmer Registration"',
      'Enter Aadhaar number and complete captcha',
      'Fill in personal, bank, and land details',
      'Submit the form and save reference number for tracking'
    ],
    link: 'https://pmkisan.gov.in/'
  },
  {
    id: 2,
    title: 'Post Matric Scholarship',
    description: 'Scholarship for students belonging to SC/ST communities to study at post-matriculation level.',
    tags: ['Education', 'Scholarship', 'SC/ST'],
    deadline: '2026-10-15',
    benefits: [
      'Covers maintenance allowance for living expenses',
      'Reimbursement of compulsory non-refundable fees',
      'Study tour charges covered',
      'Thesis typing and printing charges included'
    ],
    criteria: [
      'Must belong to SC/ST category with valid certificate',
      'Family income should not exceed ₹2.5 Lakh per annum',
      'Must be studying at post-matriculation level',
      'Must be enrolled in a recognized institution'
    ],
    steps: [
      'Register on the National Scholarship Portal (scholarships.gov.in)',
      'Login and fill out the scholarship application form',
      'Upload caste certificate, income proof, and marksheets',
      'Submit the application before deadline'
    ],
    link: 'https://scholarships.gov.in/'
  },
  {
    id: 3,
    title: 'Beti Bachao Beti Padhao',
    description: 'Promotes awareness and improves welfare services for the girl child across the nation.',
    tags: ['Women', 'Education'],
    deadline: 'Ongoing',
    benefits: [
      'Promotes girls\' education and empowerment',
      'Financial incentives through Sukanya Samriddhi Account',
      'Improves child sex ratio in critical districts',
      'Free education campaigns in underserved areas'
    ],
    criteria: [
      'Family with a girl child',
      'Girl child under age 10 for Sukanya Samriddhi account',
      'No income restriction for awareness programs'
    ],
    steps: [
      'Open a Sukanya Samriddhi Account at a post office or authorized bank',
      'Provide birth certificate of the girl child',
      'Submit identity and address proof of the parent/guardian',
      'Start regular deposits to build the corpus'
    ],
    link: 'https://wcd.nic.in/bbbp-schemes'
  },
  {
    id: 4,
    title: 'Pradhan Mantri Awas Yojana',
    description: 'Housing for all scheme providing affordable housing solutions to the urban poor.',
    tags: ['Housing', 'General Welfare'],
    deadline: '2026-11-30',
    benefits: [
      'Interest subsidy of up to 6.5% on home loans',
      'Financial assistance for house construction',
      'Slum rehabilitation and in-situ development',
      'Technology-driven housing for durability'
    ],
    criteria: [
      'Must not own a pucca house anywhere in India',
      'Annual household income as per EWS / LIG / MIG category',
      'At least one adult female must be co-owner',
      'Family must not have availed of any other housing scheme'
    ],
    steps: [
      'Visit the official PMAY portal (pmaymis.gov.in)',
      'Select "Citizen Assessment" from the menu',
      'Enter Aadhaar details for verification',
      'Fill the detailed application form',
      'Save the assessment ID for tracking your application'
    ],
    link: 'https://pmaymis.gov.in/'
  },
  {
    id: 5,
    title: 'National Rural Employment Guarantee',
    description: 'Guarantees 100 days of wage employment per year to every rural household in India.',
    tags: ['Employment', 'General Welfare'],
    deadline: 'Ongoing',
    benefits: [
      '100 days of guaranteed wage employment per year',
      'Unemployment allowance if work not provided within 15 days',
      'Equal wages for men and women',
      'Work provided within 5 km of residence'
    ],
    criteria: [
      'Must be a citizen of India residing in a rural area',
      'Must be 18 years of age or older',
      'Must be willing to do unskilled manual work',
      'Must apply for a Job Card through Gram Panchayat'
    ],
    steps: [
      'Apply for a Job Card at your local Gram Panchayat',
      'Submit a passport-size photograph and ID proof',
      'Receive the Job Card within 15 working days',
      'Submit a written application when you need work',
      'Work will be allotted within 15 days of demand'
    ],
    link: 'https://nrega.nic.in/'
  }
];

export const getSchemeById = (id) => {
  return mockSchemes.find(scheme => scheme.id.toString() === id?.toString());
};

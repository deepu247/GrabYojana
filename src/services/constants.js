export const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi",
  "Jammu & Kashmir", "Ladakh",
];

export const OCCUPATIONS = [
  { value: 'Student', label: 'Student' },
  { value: 'Farmer', label: 'Farmer / Agriculture' },
  { value: 'Unemployed', label: 'Unemployed' },
  { value: 'Self-Employed', label: 'Self-Employed / Business' },
  { value: 'Salaried', label: 'Salaried Employee' },
  { value: 'Homemaker', label: 'Homemaker' },
];

export const INCOME_RANGES = [
  { value: 'below_1L', label: 'Below ₹1,00,000' },
  { value: '1L_to_2.5L', label: '₹1,00,001 – ₹2,50,000' },
  { value: '2.5L_to_5L', label: '₹2,50,001 – ₹5,00,000' },
  { value: '5L_to_8L', label: '₹5,00,001 – ₹8,00,000' },
  { value: 'above_8L', label: 'Above ₹8,00,000' },
];

export const GENDERS = ['Male', 'Female', 'Transgender', 'Other'];
export const CATEGORIES = ['General', 'OBC', 'SC', 'ST'];

export const SCHEME_CATEGORIES = [
  { id: 'education', label: 'Education', icon: '🎓', color: 'primary' },
  { id: 'agriculture', label: 'Agriculture', icon: '🌾', color: 'success' },
  { id: 'women', label: 'Women & Girls', icon: '👩', color: 'warning' },
  { id: 'housing', label: 'Housing', icon: '🏠', color: 'danger' },
  { id: 'employment', label: 'Employment', icon: '💼', color: 'info' },
  { id: 'health', label: 'Healthcare', icon: '🏥', color: 'success' },
];

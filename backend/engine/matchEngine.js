const INCOME_ORDER = ['below_1L', '1L_to_2.5L', '2.5L_to_5L', '5L_to_8L', 'above_8L'];

const incomeIndex = (income) => INCOME_ORDER.indexOf(income);

const OCCUPATION_RELATED = {
  Salaried: ['Self-Employed'],
  'Self-Employed': ['Salaried', 'Unemployed'],
  Unemployed: ['Self-Employed', 'Homemaker'],
  Homemaker: ['Unemployed'],
  Farmer: [],
  Student: [],
};

function scoreScheme(user, rules) {
  let score = 0;
  let disqualified = false;

  const userAge = parseInt(user.age, 10);

  const ageUniversal = rules.minAge == null && rules.maxAge == null;
  if (ageUniversal) {
    score += 20;
  } else {
    const aboveMin = rules.minAge == null || userAge >= rules.minAge;
    const belowMax = rules.maxAge == null || userAge <= rules.maxAge;
    if (aboveMin && belowMax) {
      score += 20;
    } else {
      disqualified = true;
    }
  }

  if (disqualified) return { score: 0, disqualified: true };

  if (rules.gender.includes('Any') || rules.gender.includes(user.gender)) {
    score += 15;
  } else {
    return { score: 0, disqualified: true };
  }

  if (rules.states.includes('All') || rules.states.includes(user.state)) {
    score += 15;
  } else {
    return { score: 0, disqualified: true };
  }

  if (rules.occupations.includes('Any')) {
    score += 20;
  } else if (rules.occupations.includes(user.occupation)) {
    score += 20;
  } else {
    const relatedToUser = OCCUPATION_RELATED[user.occupation] || [];
    const hasRelated = rules.occupations.some((occ) => relatedToUser.includes(occ));
    if (hasRelated) {
      score += 8;
    }
  }

  if (rules.incomeRange.includes('Any')) {
    score += 15;
  } else if (rules.incomeRange.includes(user.income)) {
    score += 15;
  } else {
    const userIdx = incomeIndex(user.income);
    const schemeMaxIdx = Math.max(...rules.incomeRange.map(incomeIndex));

    if (userIdx > schemeMaxIdx) {
      return { score: 0, disqualified: true };
    }

    const isAdjacent = rules.incomeRange.some(
      (r) => Math.abs(incomeIndex(r) - userIdx) === 1
    );
    if (isAdjacent) {
      score += 8;
    }
  }

  if (rules.categories.includes('Any')) {
    score += 15;
  } else if (rules.categories.includes(user.category)) {
    score += 15;
  } else if (rules.categories.includes('General')) {
    score += 15;
  } else {
    return { score: 0, disqualified: true };
  }

  return { score, disqualified: false };
}

function matchSchemes(userProfile, allSchemes) {
  const MAX_RAW_SCORE = 85;
  const results = [];

  for (const scheme of allSchemes) {
    const rules = scheme.eligibilityRules || {};
    const { score, disqualified } = scoreScheme(userProfile, rules);

    if (disqualified) continue;

    const matchPercent = Math.min(100, Math.round((score / MAX_RAW_SCORE) * 100));

    if (matchPercent < 25) continue;

    const schemeObj = scheme.toObject ? scheme.toObject() : { ...scheme };
    results.push({ ...schemeObj, matchPercent });
  }

  return results.sort((a, b) => b.matchPercent - a.matchPercent).slice(0, 20);
}

module.exports = { matchSchemes };

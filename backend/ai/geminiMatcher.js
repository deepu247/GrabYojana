const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const GEMINI_MODEL = 'gemini-flash-latest';

async function aiRankSchemes(userProfile, candidates) {
  const schemeList = candidates.map((s) => ({
    id: s._id.toString(),
    name: s.title,
  }));

  const incomeLabel = {
    below_1L: 'below ₹1 Lakh/year',
    '1L_to_2.5L': '₹1–2.5 Lakh/year',
    '2.5L_to_5L': '₹2.5–5 Lakh/year',
    '5L_to_8L': '₹5–8 Lakh/year',
    above_8L: 'above ₹8 Lakh/year',
  };

  const prompt = `You are a government scheme eligibility expert for India.

User Profile:
- Age: ${userProfile.age}
- Gender: ${userProfile.gender}
- State: ${userProfile.state}
- Occupation: ${userProfile.occupation}
- Annual Household Income: ${incomeLabel[userProfile.income] || userProfile.income}
- Social Category: ${userProfile.category}

Below is a list of Indian government scheme names. Based on your knowledge of these schemes and the user profile above:
1. Rank ONLY the schemes that genuinely match this user (skip clearly irrelevant ones).
2. Assign a matchPercent (0-100) based on how well the user fits each scheme.
3. Write a short, personalized matchReason (1-2 sentences) explaining why the user qualifies.

Return ONLY valid JSON — no markdown, no extra text — in this exact format:
{
  "rankedSchemes": [
    {
      "schemeId": "<exact id from the input list>",
      "matchPercent": 92,
      "matchReason": "As a 24-year-old female student from Kerala with low income, you meet the core eligibility criteria for this scheme."
    }
  ]
}

Schemes (id + name only):
${JSON.stringify(schemeList, null, 2)}`;

  const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

  let lastErr;
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      const text = result.response.text().trim();

      const jsonText = text
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/```\s*$/i, '')
        .trim();

      const parsed = JSON.parse(jsonText);
      const ranked = parsed.rankedSchemes || [];

      const aiMap = {};
      for (const item of ranked) {
        aiMap[item.schemeId] = {
          aiMatchPercent: Math.min(100, Math.max(0, Math.round(item.matchPercent))),
          aiMatchReason: item.matchReason || '',
        };
      }

      const merged = candidates
        .filter((s) => aiMap[s._id.toString()])
        .map((s) => {
          const plain = s.toObject ? s.toObject() : { ...s };
          const ai = aiMap[plain._id.toString()];
          return {
            ...plain,
            matchPercent: ai.aiMatchPercent,
            matchReason: ai.aiMatchReason,
          };
        });

      merged.sort((a, b) => b.matchPercent - a.matchPercent);
      return merged;
    } catch (err) {
      lastErr = err;
      if (attempt === 1 && (err.message.includes('429') || err.message.includes('quota'))) {
        console.warn('Gemini quota hit, retrying in 3s...');
        await new Promise((r) => setTimeout(r, 3000));
      } else {
        break;
      }
    }
  }

  throw lastErr;
}

module.exports = { aiRankSchemes };

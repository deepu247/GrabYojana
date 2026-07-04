const express = require('express');
const router = express.Router();

const Scheme = require('../models/Scheme');
const UserQuery = require('../models/UserQuery');
const { matchSchemes } = require('../engine/matchEngine');
const { aiRankSchemes } = require('../ai/geminiMatcher');
const { validateMatchRequest } = require('../middleware/validate');

router.post('/match', validateMatchRequest, async (req, res) => {
  try {
    const { age, gender, state, occupation, income, category } = req.body;
    const userProfile = { age, gender, state, occupation, income, category };

    const allSchemes = await Scheme.find({});

    if (allSchemes.length === 0) {
      return res.status(200).json({
        success: true,
        count: 0,
        aiPowered: false,
        schemes: [],
        message: 'No schemes found in the database. Please run the seeder.',
      });
    }

    const ruleCandidates = matchSchemes(userProfile, allSchemes);

    let finalSchemes = ruleCandidates;
    let aiPowered = false;

    if (process.env.GEMINI_API_KEY && ruleCandidates.length > 0) {
      try {
        const aiRanked = await aiRankSchemes(userProfile, ruleCandidates.map((s) => ({
          _id: s._id,
          title: s.title,
          toObject: () => s,
        })));

        if (aiRanked.length > 0) {
          finalSchemes = aiRanked;
          aiPowered = true;
          console.log(`AI ranked ${aiRanked.length} schemes for user profile`);
        }
      } catch (aiErr) {
        console.warn('Gemini AI ranking failed, falling back to rule-based results:', aiErr.message);
      }
    }

    const topSchemes = finalSchemes.slice(0, 10);

    const matchedSchemeIds = topSchemes.map((s) => s._id);
    UserQuery.create({
      age,
      gender,
      state,
      occupation,
      income,
      category,
      matchedSchemeIds,
      matchedCount: topSchemes.length,
    }).catch((err) => {
      console.error('Failed to save UserQuery:', err.message);
    });

    return res.status(200).json({
      success: true,
      count: topSchemes.length,
      aiPowered,
      schemes: topSchemes,
    });
  } catch (error) {
    console.error('Error in POST /api/match:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.',
    });
  }
});

module.exports = router;

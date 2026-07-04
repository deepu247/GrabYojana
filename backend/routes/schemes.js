const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Scheme = require('../models/Scheme');
const UserQuery = require('../models/UserQuery');

router.get('/schemes', async (req, res) => {
  try {
    const filter = {};

    if (req.query.category) {
      filter.category = req.query.category.toLowerCase();
    }

    if (req.query.state) {
      filter.$or = [
        { 'eligibilityRules.states': 'All' },
        { 'eligibilityRules.states': req.query.state },
      ];
    }

    const schemes = await Scheme.find(filter).lean();

    return res.status(200).json({
      success: true,
      count: schemes.length,
      schemes,
    });
  } catch (error) {
    console.error('Error in GET /api/schemes:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.',
    });
  }
});

router.get('/schemes/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: 'Scheme not found. Invalid ID format.',
      });
    }

    const scheme = await Scheme.findById(id).lean();

    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: 'Scheme not found.',
      });
    }

    return res.status(200).json({
      success: true,
      scheme,
    });
  } catch (error) {
    console.error('Error in GET /api/schemes/:id:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.',
    });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const [totalSchemes, totalQueries, categoryAgg] = await Promise.all([
      Scheme.countDocuments(),
      UserQuery.countDocuments(),
      Scheme.aggregate([
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 },
          },
        },
      ]),
    ]);

    const categoryCounts = {};
    categoryAgg.forEach(({ _id, count }) => {
      if (_id) categoryCounts[_id] = count;
    });

    return res.status(200).json({
      success: true,
      totalSchemes,
      totalQueries,
      categoryCounts,
    });
  } catch (error) {
    console.error('Error in GET /api/stats:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.',
    });
  }
});

module.exports = router;

const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Scheme title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      enum: ['education', 'agriculture', 'women', 'housing', 'employment', 'health'],
      required: [true, 'Category is required'],
    },
    tags: {
      type: [String],
      default: [],
    },
    deadline: {
      type: String,
      default: 'Ongoing',
    },
    benefits: {
      type: [String],
      default: [],
    },
    criteria: {
      type: [String],
      default: [],
    },
    steps: {
      type: [String],
      default: [],
    },
    link: {
      type: String,
      trim: true,
    },
    eligibilityRules: {
      minAge: {
        type: Number,
        default: null,
      },
      maxAge: {
        type: Number,
        default: null,
      },
      gender: {
        type: [String],
        default: ['Any'],
      },
      states: {
        type: [String],
        default: ['All'],
      },
      occupations: {
        type: [String],
        default: ['Any'],
      },
      incomeRange: {
        type: [String],
        default: ['Any'],
      },
      categories: {
        type: [String],
        default: ['Any'],
      },
    },
  },
  {
    timestamps: true,
  }
);

schemeSchema.index({ category: 1 });
schemeSchema.index({ 'eligibilityRules.states': 1 });

const Scheme = mongoose.model('Scheme', schemeSchema);

module.exports = Scheme;

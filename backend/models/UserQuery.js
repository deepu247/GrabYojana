const mongoose = require('mongoose');

const userQuerySchema = new mongoose.Schema(
  {
    age: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    income: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    matchedSchemeIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Scheme',
      },
    ],
    matchedCount: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

const UserQuery = mongoose.model('UserQuery', userQuerySchema);

module.exports = UserQuery;

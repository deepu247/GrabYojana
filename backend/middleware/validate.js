const REQUIRED_FIELDS = ['age', 'gender', 'state', 'occupation', 'income', 'category'];

const VALID_GENDERS = ['Male', 'Female', 'Transgender', 'Other'];
const VALID_OCCUPATIONS = ['Student', 'Farmer', 'Unemployed', 'Self-Employed', 'Salaried', 'Homemaker'];
const VALID_INCOMES = ['below_1L', '1L_to_2.5L', '2.5L_to_5L', '5L_to_8L', 'above_8L'];
const VALID_CATEGORIES = ['General', 'OBC', 'SC', 'ST'];

const validateMatchRequest = (req, res, next) => {
  const body = req.body;

  const missing = REQUIRED_FIELDS.filter(
    (field) => body[field] === undefined || body[field] === null || body[field] === ''
  );

  if (missing.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Missing required fields: ${missing.join(', ')}`,
    });
  }

  const age = parseInt(body.age, 10);
  if (isNaN(age) || age <= 0 || age > 120) {
    return res.status(400).json({
      success: false,
      message: 'Field "age" must be a valid number between 1 and 120.',
    });
  }

  if (!VALID_GENDERS.includes(body.gender)) {
    return res.status(400).json({
      success: false,
      message: `Field "gender" must be one of: ${VALID_GENDERS.join(', ')}.`,
    });
  }

  if (!VALID_OCCUPATIONS.includes(body.occupation)) {
    return res.status(400).json({
      success: false,
      message: `Field "occupation" must be one of: ${VALID_OCCUPATIONS.join(', ')}.`,
    });
  }

  if (!VALID_INCOMES.includes(body.income)) {
    return res.status(400).json({
      success: false,
      message: `Field "income" must be one of: ${VALID_INCOMES.join(', ')}.`,
    });
  }

  if (!VALID_CATEGORIES.includes(body.category)) {
    return res.status(400).json({
      success: false,
      message: `Field "category" must be one of: ${VALID_CATEGORIES.join(', ')}.`,
    });
  }

  req.body.age = String(age);

  next();
};

module.exports = { validateMatchRequest };

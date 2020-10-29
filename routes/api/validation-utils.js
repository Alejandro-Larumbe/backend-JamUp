
const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => error.msg);

    const err = new Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad Request.';
    return next(err);
  }
  next();
}

const validateEmailAndPassword = [
  check('email')
  .exists({
    checkFalsy: true
  })
  .withMessage('Please enter email address')
  .isEmail()
  .withMessage('Please enter a valid e-mail address'),
  check('password')
  .exists({
    checkFalsy: true
  })
  .withMessage('Please enter password')
]

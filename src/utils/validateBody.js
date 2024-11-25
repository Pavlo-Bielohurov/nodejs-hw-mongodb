import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    console.log('Validated request body:', req.body);
    await schema.validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  } catch (err) {
    const errorMessages = err.details.map((detail) => detail.message);
    const error = createHttpError(400, 'Bad request', {
      errors: errorMessages,
    });
    next(error);
  }
};

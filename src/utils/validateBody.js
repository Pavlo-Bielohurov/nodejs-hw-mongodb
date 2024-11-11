import createHttpError from 'http-errors';

const validateBody = (shema) => {
  const func = (req, res, next) => {
    const { error } = shema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      throw createHttpError(400, error.message);
    }
    next();
  };

  return func;
};
export default validateBody;

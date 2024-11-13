import createHttpError from 'http-errors';

import { isValidObjectId } from 'mongoose';

export const isValideId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    throw next(createHttpError(400, `${contactId} not valid id`));
  }
  next();
};

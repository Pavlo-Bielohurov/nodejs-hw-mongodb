import { Router } from 'express';

import {
  getAllContactsController,
  getContactsByIdController,
  addContactController,
  upsertContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';
import { isValideId } from '../middlewares/isValideId.js';
import {
  CreateContactSchema,
  UpdateContactSchema,
} from '../validation/contact.js';

const contactsRouter = Router();

contactsRouter.get('/contacts', ctrlWrapper(getAllContactsController));

contactsRouter.get(
  '/contacts/:contactId',
  isValideId,
  ctrlWrapper(getContactsByIdController),
);

contactsRouter.post(
  '/contacts',
  validateBody(CreateContactSchema),
  ctrlWrapper(addContactController),
);

contactsRouter.put(
  '/contacts/:contactId',
  isValideId,
  validateBody(CreateContactSchema),
  ctrlWrapper(upsertContactController),
);

contactsRouter.patch(
  '/contacts/:contactId',
  isValideId,
  validateBody(UpdateContactSchema),
  patchContactController,
);

contactsRouter.delete(
  '/contacts/:contactId',
  isValideId,
  deleteContactController,
);

export default contactsRouter;

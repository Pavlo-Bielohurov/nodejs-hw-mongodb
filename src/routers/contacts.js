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

const contactsRouter = Router();

contactsRouter.get('/contacts', ctrlWrapper(getAllContactsController));

contactsRouter.get(
  '/contacts/:contactId',
  ctrlWrapper(getContactsByIdController),
);

contactsRouter.post('/contacts', ctrlWrapper(addContactController));

contactsRouter.put(
  '/contacts/:contactId',
  ctrlWrapper(upsertContactController),
);

contactsRouter.patch('/contacts/:contactId', patchContactController);

contactsRouter.delete('/contacts/:contactId', deleteContactController);

export default contactsRouter;

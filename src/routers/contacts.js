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
import { authenticate } from '../middlewares/authenticate.js';
import {
  CreateContactSchema,
  UpdateContactSchema,
} from '../validation/contact.js';
import { upload } from '../middlewares/multer.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(getAllContactsController));

contactsRouter.get(
  '/:contactId',
  isValideId,
  ctrlWrapper(getContactsByIdController),
);

contactsRouter.post(
  '/',
  upload.single('photo'),
  validateBody(CreateContactSchema),
  ctrlWrapper(addContactController),
);

contactsRouter.put(
  '/:contactId',
  isValideId,
  validateBody(CreateContactSchema),
  ctrlWrapper(upsertContactController),
);

contactsRouter.patch(
  '/:contactId',
  isValideId,
  upload.single('photo'),
  validateBody(UpdateContactSchema),
  patchContactController,
);

contactsRouter.delete('/:contactId', isValideId, deleteContactController);

export default contactsRouter;

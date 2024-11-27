import createHttpError from 'http-errors';
import {
  getAllContacts,
  getContactsById,
  addContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';
import { parseSortParams } from '../utils/parseSortParams.js';

import { parsePaginationParams } from '../utils/parsPaginationParams.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getAllContactsController = async (req, res) => {
  const { _id: userId } = req.user;
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const contacts = await getAllContacts({
    userId,
    page,
    perPage,
    sortBy,
    sortOrder,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactsByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const contact = await getContactsById(contactId, userId);
  if (!contact) {
    throw createHttpError(404, `Contact with id=${contactId} not found`);
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const addContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    photoUrl = await saveFileToCloudinary(photo);
  }
  const newContact = { ...req.body, userId, photo: photoUrl };
  const data = await addContact(newContact);
  console.log('Validated body:', req.body);
  console.log('req.user in addContactController:', req.user);
  console.log('userId:', userId);

  res.status(201).json({
    status: 201,
    messange: 'Successfully created a contact!',
    data: data,
  });
};

export const upsertContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  const data = await updateContact(
    contactId,
    req.body,
    { upsert: true },
    userId,
  );
  if (!data) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  const status = data.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully patched a contact!`,
    data: data.contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    photoUrl = await saveFileToCloudinary(photo);
  }

  const data = await updateContact(contactId, userId, {
    ...req.body,
    photo: photoUrl,
  });
  if (!data) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: data.contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const data = await deleteContact(contactId, userId);

  if (!data) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};

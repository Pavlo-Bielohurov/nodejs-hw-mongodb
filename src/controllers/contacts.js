import createHttpError from 'http-errors';
import {
  getAllContacts,
  getContactsById,
  addContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';

import { contactAddShema } from '../validation/contact.js';

import { parseSortParams } from '../utils/parseSortParams.js';

import { parsePaginationParams } from '../utils/parsPaginationParams.js';

import { sortByList } from '../db/models/Contacts.js';

export const getAllContactsController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, sortByList);
  const contacts = await getAllContacts({ page, perPage, sortBy, sortOrder });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactsByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactsById(contactId);
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
  const { error } = contactAddShema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    throw createHttpError(400, error.message);
  }

  const data = await addContact(req.body);

  res.status(201).json({
    status: 201,
    messange: 'Successfully created a contact!',
    data: data,
  });
};

export const upsertContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const data = await updateContact(contactId, req.body, { upsert: true });
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

  const data = await updateContact(contactId, req.body);
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
  const data = await deleteContact(contactId);

  if (!data) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};

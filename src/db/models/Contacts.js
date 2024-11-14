import { Schema, model } from 'mongoose';

import { contactType } from '../../constants/contact.js';

const contactsShema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      default: false,
      required: false,
    },
    contactType: {
      type: String,
      required: true,
      default: 'personal',
      enum: contactType,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ContactsCollection = model('contacts', contactsShema);

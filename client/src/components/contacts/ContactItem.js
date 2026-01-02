import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  deleteContact,
  setCurrent,
  clearCurrent,
  useContacts
} from '../../context/contact/ContactState';

const ContactItem = ({ contact }) => {
  const navigate = useNavigate();
  const [, contactDispatch] = useContacts();

  const { _id, name, email, phone, type } = contact;

  const onDelete = () => {
    deleteContact(contactDispatch, _id);
    clearCurrent(contactDispatch);
  };

  const onEdit = () => {
    setCurrent(contactDispatch, contact);
    navigate('/add-contact');
  };

  return (
    <div className="contact-card">
      <div className="contact-top">
        <div>
          <h3 className="contact-name">{name}</h3>

          {email && (
            <p className="contact-info">
              <i className="fas fa-envelope"></i> {email}
            </p>
          )}

          {phone && (
            <p className="contact-info">
              <i className="fas fa-phone"></i> {phone}
            </p>
          )}
        </div>

        <span className={`badge ${type}`}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </div>

      <div className="contact-actions">
        <button className="btn edit-btn" onClick={onEdit}>
          <i className="fas fa-pen"></i> Edit
        </button>

        <button className="btn delete-btn" onClick={onDelete}>
          <i className="fas fa-trash"></i> Delete
        </button>
      </div>
    </div>
  );
};

export default ContactItem;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/toast/ToastContext';
import {
  addContact,
  useContacts,
  updateContact,
  clearCurrent
} from '../../context/contact/ContactState';

const initialContact = {
  name: '',
  email: '',
  phone: '',
  type: 'personal'
};

const ContactForm = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [contactState, contactDispatch] = useContacts();
  const { current } = contactState;

  const [contact, setContact] = useState(initialContact);

  useEffect(() => {
    if (current) {
      setContact(current);
    } else {
      setContact(initialContact);
    }
  }, [current]);

  const { name, email, phone, type } = contact;

  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (current === null) {
        await addContact(contactDispatch, contact);
        showToast('Contact added successfully');
      } else {
        await updateContact(contactDispatch, contact);
        showToast('Contact updated successfully');
      }

      clearCurrent(contactDispatch);
      navigate('/contacts');
    } catch (err) {
      showToast('Something went wrong', 'error');
    }
  };

  return (
    <form onSubmit={onSubmit} className="modern-form">
      <input
        type="text"
        placeholder="Full Name"
        name="name"
        value={name}
        onChange={onChange}
        required
      />

      <input
        type="email"
        placeholder="Email Address"
        name="email"
        value={email}
        onChange={onChange}
      />

      <input
        type="text"
        placeholder="Phone Number"
        name="phone"
        value={phone}
        onChange={onChange}
        required
      />

      <div className="radio-group">
        <p className="radio-label">Contact Type</p>

        <div className="radio-options">
          <label className="radio-item">
            <input
              type="radio"
              name="type"
              value="personal"
              checked={type === 'personal'}
              onChange={onChange}
            />
            <span>Personal</span>
          </label>

          <label className="radio-item">
            <input
              type="radio"
              name="type"
              value="professional"
              checked={type === 'professional'}
              onChange={onChange}
            />
            <span>Professional</span>
          </label>
        </div>
      </div>

      <button type="submit" className="modern-btn">
        {current ? 'Update Contact' : 'Add Contact'}
      </button>

      {current && (
        <button
          type="button"
          className="modern-btn secondary-btn"
          onClick={() => clearCurrent(contactDispatch)}
        >
          Clear
        </button>
      )}
    </form>
  );
};

export default ContactForm;

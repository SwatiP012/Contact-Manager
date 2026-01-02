import React, { useRef } from 'react';
import {
  filterContacts,
  clearFilter,
  useContacts
} from '../../context/contact/ContactState';

const ContactFilter = () => {
  const text = useRef('');
  const contactDispatch = useContacts()[1];

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterContacts(contactDispatch, e.target.value);
    } else {
      clearFilter(contactDispatch);
    }
  };

  return (
    <input
      ref={text}
      type="text"
      placeholder="Search contacts..."
      className="search-input"
      onChange={onChange}
    />
  );
};

export default ContactFilter;

import React, { useEffect } from 'react';
import ContactItem from './ContactItem';
import { useContacts, getContacts } from '../../context/contact/ContactState';

const Contacts = () => {
  const [contactState, contactDispatch] = useContacts();
  const { contacts, filtered } = contactState;

  useEffect(() => {
    getContacts(contactDispatch);
    // eslint-disable-next-line
  }, []);

  // ⛔ IMPORTANT GUARD
  if (!contacts) {
    return <h4 style={{ textAlign: 'center' }}>Loading contacts...</h4>;
  }

  if (contacts.length === 0) {
    return <h4 style={{ textAlign: 'center' }}>No contacts found</h4>;
  }

  // Alphabetical sorting
  const sortedContacts = [...(filtered || contacts)].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className="contacts-grid">
      {sortedContacts.map((contact) => (
        <ContactItem key={contact._id} contact={contact} />
      ))}
    </div>
  );
};

export default Contacts;

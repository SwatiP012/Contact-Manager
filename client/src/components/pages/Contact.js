import React from 'react';
import Contacts from '../contacts/Contacts';
import ContactFilter from '../contacts/ContactFilter';

const ContactsPage = () => {
    return (
        <div className="contacts-page">
            <h1>My Contacts</h1>
            <ContactFilter />
            <Contacts />
        </div>
    );
};

export default ContactsPage;

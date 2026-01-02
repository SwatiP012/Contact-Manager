import ContactForm from '../contacts/ContactForm';

const AddContact = () => {
    return (
        <div className="page-wrapper">
            <div className="card modern-card">
                <h1 className="card-title">Add New Contact</h1>
                <p className="card-subtitle">
                    Fill in the details below to save a contact
                </p>
                <ContactForm />
            </div>
        </div>
    );
};

export default AddContact;

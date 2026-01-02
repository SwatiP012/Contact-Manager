import React, { Fragment } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';

import ContactsPage from './components/pages/Contact';
import AddContactPage from './components/pages/AddContact';

import ContactState from './context/contact/ContactState';
import AlertState from './context/alert/AlertState';

import { ToastProvider } from './context/toast/ToastContext';

import './App.css';

const App = () => {
  return (
    <ToastProvider>
    <ContactState>
      <AlertState>
        <BrowserRouter>
          <Fragment>
            <Navbar />
            <div className='container'>
              <Alerts />
              <Routes>
                <Route path='/' element={<Navigate to='/contacts' />} />
                <Route path='/contacts' element={<ContactsPage />} />
                <Route path='/add-contact' element={<AddContactPage />} />
              </Routes>
            </div>
          </Fragment>
        </BrowserRouter>
      </AlertState>
    </ContactState>
    </ToastProvider>
  );
};

export default App;

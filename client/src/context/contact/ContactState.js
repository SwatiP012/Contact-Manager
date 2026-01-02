import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR
} from '../types';

const API_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const useContacts = () => {
  const { state, dispatch } = useContext(ContactContext);
  return [state, dispatch];
};


export const getContacts = async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/api/contacts`);

    dispatch({
      type: GET_CONTACTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response?.data?.msg || err.message
    });
  }
};

export const addContact = async (dispatch, contact) => {
  try {
    const res = await axios.post(
      `${API_URL}/api/contacts`,
      contact,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    dispatch({
      type: ADD_CONTACT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response?.data?.msg || err.message
    });
  }
};


export const deleteContact = async (dispatch, id) => {
  try {
    await axios.delete(`${API_URL}/api/contacts/${id}`);

    dispatch({
      type: DELETE_CONTACT,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response?.data?.msg || err.message
    });
  }
};

export const updateContact = async (dispatch, contact) => {
  try {
    const res = await axios.put(
      `${API_URL}/api/contacts/${contact._id}`,
      contact,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    dispatch({
      type: UPDATE_CONTACT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response?.data?.msg || err.message
    });
  }
};

export const clearContacts = (dispatch) => {
  dispatch({ type: CLEAR_CONTACTS });
};

export const setCurrent = (dispatch, contact) => {
  dispatch({ type: SET_CURRENT, payload: contact });
};

export const clearCurrent = (dispatch) => {
  dispatch({ type: CLEAR_CURRENT });
};

export const filterContacts = (dispatch, text) => {
  dispatch({ type: FILTER_CONTACTS, payload: text });
};

export const clearFilter = (dispatch) => {
  dispatch({ type: CLEAR_FILTER });
};


const ContactState = (props) => {
  const initialState = {
    contacts: [],
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  return (
    <ContactContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;

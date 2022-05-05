import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import Container from './Container/Container';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import initialContacts from './contacts.json';

import s from './App.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsContact = JSON.parse(contacts);

    // if (parsContact) {
    this.setState({ contacts: parsContact ?? initialContacts });
    // }
  }
  componentDidUpdate(prevProps, prevState) {
    const nextContackt = this.state.contacts;
    const prevContact = prevState.contacts;
    if (nextContackt !== prevContact) {
      localStorage.setItem('contacts', JSON.stringify(nextContackt));
    }
  }

  addContact = ({ name, number }) => {
    let isAdded = false;
    this.state.contacts.forEach(el => {
      if (el.name === name) {
        alert(`${name} is already in contacts`);
        isAdded = true;
      }
    });
    if (isAdded) {
      return;
    }
    const contact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  deletContact = contactID => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactID),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter, contacts } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <>
        <Container>
          <h1 className={s.h}>Phonebook</h1>
          <ContactForm onSubmit={this.addContact} />
        </Container>

        <Container>
          <h2>Contacts</h2>
          {contacts.length > 1 ? (
            <Filter value={filter} onChange={this.changeFilter} />
          ) : (
            ''
          )}
          {contacts.length !== 0 ? (
            <ContactList
              contacts={visibleContacts}
              onDeletContact={this.deletContact}
            />
          ) : (
            <div className={s.savedContacts}>You have no saved contacts</div>
          )}
        </Container>
      </>
    );
  }
}

export default App;

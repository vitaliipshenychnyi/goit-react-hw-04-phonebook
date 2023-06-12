import { useState, useEffect } from 'react';
import { ContactForm } from './contactForm/ContactForm';
import { ContactsList } from './contactList/ContactList';
import { Filter } from './filter/Filter';
import { Container } from './App.styled';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts'))
  );
  const [filter, setFilter] = useState('');

  // функція запису отриманих даних до масиву contacts
  const formSubmit = data => {
    if (contacts.findIndex(contact => contact.name === data.name) === -1) {
      setContacts(prevState => [...prevState, data]);
    } else {
      alert(`${data.name} is already in contacts.`);
    }
  };

  // функція отримання даних з поля filter
  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  // функція видалення контакту зі списку
  const deleteContact = Id => {
    setContacts(contacts.filter(contact => contact.id !== Id));
  };

  // умова пошуку контактів у списку за значенням веденних даних у поле filter
  const visibleContact = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  // запис до сховища
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  });

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm formSubmit={formSubmit} />

      <h2>Contacts:</h2>
      <Filter value={filter} changeFilter={changeFilter} />
      {contacts.length !== 0 && (
        <ContactsList contacts={visibleContact} deleteContact={deleteContact} />
      )}
    </Container>
  );
};

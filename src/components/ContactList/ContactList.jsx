import { List } from './ContactListStyled';
import { ContactsItem } from 'components/ContactsItem/ContactsItem';
import { useSelector } from 'react-redux';
import { useGetContactsQuery } from 'redux/contactsApi';

export const ContactList = () => {
  const { data: contacts, error } = useGetContactsQuery();
  const filter = useSelector(state => state.filter.value);

  const getFiltredContacts = () => {
    return filter
      ? contacts?.filter(({ name }) =>
          name.toLowerCase().includes(filter.toLowerCase())
        )
      : contacts;
  };

  const filtredContacts = getFiltredContacts();

  return (
    <>
      <List>
        {contacts?.length > 0 &&
          !error &&
          filtredContacts.map(contact => (
            <ContactsItem key={contact.id} contact={contact} />
          ))}
      </List>
      {error && contacts?.length === 0 && (
        <p>Something went wrong. Please refresh the page</p>
      )}
      {error?.status === 404 && <p>Your phonebook is empty</p>}
    </>
  );
};

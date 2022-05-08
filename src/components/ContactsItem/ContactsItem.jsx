import { Item } from './ContactsItemStyled';
import { Button } from 'components/Button/Button';
import propTypes from 'prop-types';
import { useDeleteContactMutation } from 'redux/contactsApi';

export const ContactsItem = ({ contact: { id, name, phone } }) => {
  const [deleteContact, { error }] = useDeleteContactMutation();
  const handleDeleteContact = async () => {
    await deleteContact({ id });
    if (error) {
      alert('Something went wrong. Please try again');
    }
  };

  return (
    <Item>
      <span>{name}:</span>
      <span>{phone} </span>
      <Button type="button" onClick={handleDeleteContact} text={'Delete'} />
    </Item>
  );
};

ContactsItem.propTypes = {
  contact: propTypes.object.isRequired,
};

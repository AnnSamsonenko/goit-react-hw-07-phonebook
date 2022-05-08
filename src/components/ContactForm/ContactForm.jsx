import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import 'yup-phone';
import { useAddContactMutation } from 'redux/contactsApi';
import { Button } from 'components/Button/Button';
import { FormStyled, Input, Message, LabelStyled } from './ContactFormStyled';

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const validationSchema = yup.object({
  name: yup.string().required('required field'),
  number: yup
    .string()
    .required('required field')
    .matches(phoneRegExp, 'phone number is not valid')
    .min(6, 'to short')
    .max(15, 'to long'),
});

const initialValues = {
  name: '',
  number: '',
  filter: '',
};

const FormError = ({ name }) => {
  return (
    <ErrorMessage
      name={name}
      render={message => <Message>{message}</Message>}
    />
  );
};

export const ContactForm = () => {
  const [addContact, { error }] = useAddContactMutation();

  const handleSubmit = async ({ name, phone }, { resetForm }) => {
    const contactObj = { name, phone };
    await addContact(contactObj);
    if (error) {
      alert('This contact can not be added. Please update the fields');
    } else {
      resetForm();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <FormStyled autoComplete="off">
        <div>
          <LabelStyled htmlFor="name">Name</LabelStyled>
          <div>
            <Input name="name" type="text" />
            <FormError name="name" />
          </div>
        </div>
        <div>
          <LabelStyled htmlFor="number">Number</LabelStyled>
          <div>
            <Input name="number" type="tel" />
            <FormError name="phone" />
          </div>
        </div>
        <Button type="submit" text={'Add contact'} />
      </FormStyled>
    </Formik>
  );
};

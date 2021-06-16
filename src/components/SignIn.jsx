import React from 'react';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import { Pressable, StyleSheet, View } from 'react-native';
import * as yup from 'yup';

import Text from './Text';
import theme from '../theme';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const styles = StyleSheet.create({
  textInput: {
    margin: 5,
    padding: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.colors.appBackgroundColor,
    borderRadius: theme.borderRadius.semiRound,
  },
  signInForm: {
    backgroundColor: 'white',
    padding: 10,
  },
  submitButton: {
    margin: 5,
    padding: 15,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.semiRound,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.signInForm}>
      <FormikTextInput style={styles.textInput}  name="username" placeholder="username" />
      <FormikTextInput style={styles.textInput} name="password" placeholder="password" secureTextEntry/>
      <Pressable style={styles.submitButton} onPress={onSubmit}>
        <Text style={styles.submitButtonText} fontWeight="bold" fontSize="subheading" >SIGN IN</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => console.log(values);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
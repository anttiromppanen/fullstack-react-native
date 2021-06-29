import React from 'react';
import { View, Pressable, ImageBackground, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';
import { Formik } from 'formik';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import * as yup from 'yup';

import Text from './Text';
import FormikTextInput from './FormikTextInput';

import useCreateUser from '../hooks/useCreateUser';
import useSignIn from '../hooks/useSignIn';

import theme from '../theme';

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1)
    .max(30)
    .required('Username must be between 1 and 30 characters long'),
  password: yup
    .string()
    .min(5)
    .max(50)
    .required('Password must be between 5 and 50 characters long'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is a required field')
});

const backgroundImage = { uri: 'https://images.pexels.com/photos/6603481/pexels-photo-6603481.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260' };

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <ImageBackground style={styles.backgroundImage} source={backgroundImage}>
      <View style={theme.formStyle}>
      <Text style={theme.formHeadingText} fontSize="heading">Sign up</Text>
      <FormikTextInput
        style={theme.formTextInput}
        name="username"
        placeholder="username"
        testID="usernameField"
        icon={faUser}
      />
      <FormikTextInput
        style={theme.formTextInput}
        name="password"
        placeholder="password"
        secureTextEntry
        testID="passwordField"
        icon={faLock}
      />
      <FormikTextInput
        style={theme.formTextInput}
        name="passwordConfirmation"
        placeholder="password confirmation"
        secureTextEntry
        testID="passwordConfirmationField"
        icon={faLock}
      />
      <Pressable
        style={theme.formSubmitButton}
        onPress={onSubmit}
        testID="submitButton">
        <Text
          style={theme.formSubmitButtonText}
          fontWeight="bold"
          fontSize="subheading">
          SIGN UP
        </Text>
      </Pressable>
      </View>
    </ImageBackground>
  );
};

const SignUp = () => {
  const [createUser] = useCreateUser();
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;
    
    try {
      await createUser({ username, password });
      await signIn({ username, password });

      history.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;
import React from 'react';
import { useHistory } from 'react-router-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import { Pressable, View, ImageBackground, StyleSheet } from 'react-native';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import * as yup from 'yup';

import Text from './Text';
import theme from '../theme';

import useSignIn from '../hooks/useSignIn';

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

const backgroundImage = { uri: 'https://images.pexels.com/photos/3644742/pexels-photo-3644742.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260' };

const styles = StyleSheet.create({
  backgroundImage: {
    height: '100%',
    width: '100%',
  },
});

const SignInForm = ({ onSubmit }) => {
  return (
    <ImageBackground style={styles.backgroundImage} source={backgroundImage}>
      <View style={theme.formStyle}>
        <Text style={theme.formHeadingText} fontSize="heading">Log in</Text>
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
        <Pressable
          style={theme.formSubmitButton}
          onPress={onSubmit}
          testID="submitButton">
          <Text
            style={theme.formSubmitButtonText}
            fontWeight="bold"
            fontSize="subheading">
            LOG IN
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

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
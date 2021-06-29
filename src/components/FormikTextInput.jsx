import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useField } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import TextInput from './TextInput';
import Text from './Text';

import theme from '../theme';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    marginLeft: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});

const FormikTextInput = ({ name, icon, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <View style={styles.inputContainer}>
      <FontAwesomeIcon style={theme.formIcon} icon={icon} />
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText} color='errorColor'>{meta.error}</Text>}
    </View>
  );
};

export default FormikTextInput;
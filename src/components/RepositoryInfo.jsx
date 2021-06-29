import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import theme from '../theme';
import Text from './Text';

const style = StyleSheet.create({
  amountText: {
    color: theme.colors.primary,
  },
  icon: {
    color: theme.colors.textSecondary,
    marginTop: 3,
  },
});

// icon = faStar
const RepositoryInfo = ({ text, amount, testID, icon = faStar }) => {
  return (
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <Text fontWeight="bold" fontSize="subheading" testID={testID}>{amount}</Text>
      <Text>{text}</Text>
      <FontAwesomeIcon style={style.icon} icon={icon} />
    </View>
  );
};

export default RepositoryInfo;
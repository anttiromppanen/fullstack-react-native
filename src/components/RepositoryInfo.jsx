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
    color: 'grey',
    marginTop: 3,
  },
});

const RepositoryInfo = ({ text, amount, icon = faStar}) => {
  return (
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <Text fontWeight="bold" fontSize="subheading">{amount}</Text>
      <Text>{text}</Text>
      <FontAwesomeIcon style={style.icon} icon={icon} />
    </View>
  );
};

export default RepositoryInfo;
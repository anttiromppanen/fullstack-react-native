import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.appBarPrimaryTextColor,
    fontSize: theme.fontSizes.appBarTextSize,
  },
});

const AppBarTab = ({ text, linkDestination }) => {
  return (
    <Link to={linkDestination}>
      <Text style={styles.text}>{text}</Text>
    </Link>
  );
};

export default AppBarTab;
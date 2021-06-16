import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    height: '15%',
  },
  flexContainer: {
    flexGrow: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.flexContainer} horizontal>
        <AppBarTab text='Repositories' linkDestination='/' />
        <AppBarTab text='Sign in' linkDestination='/signin' />
      </ScrollView>
    </View>
  );
};

export default AppBar;
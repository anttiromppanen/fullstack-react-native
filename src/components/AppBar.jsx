import React from 'react';
import { useQuery, ApolloClient, useApolloClient } from '@apollo/client';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';

import theme from '../theme';
import AppBarTab from './AppBarTab';

import { AUTHORIZED_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

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
  const { loading, error, data } = useQuery(AUTHORIZED_USER);
  const authStorage = useAuthStorage();
  const client = useApolloClient();
 
  console.log(data.authorizedUser);
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.flexContainer} horizontal>
        <AppBarTab text='Repositories' linkDestination='/' />
        <AppBarTab text='Log in' linkDestination='/signin' />
      </ScrollView>
    </View>
  );
};

export default AppBar;
import React from 'react';
import { useQuery, useApolloClient } from '@apollo/client';
import { View, StyleSheet, ScrollView } from 'react-native';
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

  const handleLogout = () => {
    if (data && data.authorizedUser) {
      authStorage.removeAccessToken();
      client.resetStore();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.flexContainer} horizontal>
        <AppBarTab text='Repositories' linkDestination='/' />
        {data && data.authorizedUser
          ? <AppBarTab text='Log out' linkDestination='/signin' handlePress={handleLogout} />
          : <AppBarTab text='Log in' linkDestination='/signin' />
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;
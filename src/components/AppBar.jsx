import React from 'react';
import { useQuery, useApolloClient } from '@apollo/client';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import AppBarTab from './AppBarTab';

import { AUTHORIZED_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#504538',
    height: 100,
  },
  flexContainer: {
    flexGrow: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

const AppBar = () => {
  const { data } = useQuery(AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network',
  });

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
        <AppBarTab text="Repositories" linkDestination="/" />
        {data && data.authorizedUser
          ? 
          <>
            <AppBarTab text="Create a review" linkDestination="/createreview" />
            <AppBarTab text="My reviews" linkDestination="/reviewsbyuser" />
            <AppBarTab text="Log out" linkDestination="/signin" handlePress={handleLogout} />
          </> 
          : 
          <>
            <AppBarTab text="Log in" linkDestination="/signin" />
            <AppBarTab text="Sign up" linkDestination="signup"  />
          </>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;
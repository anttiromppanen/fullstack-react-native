import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import theme from '../theme';
import SingleRepositoryView from './SingleRepositoryView';
import CreateReview from './CreateReview';
import SignUp from './SignUp';
import UsersReviewsView from './UsersReviewsView';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.appBackgroundColor,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/signin">
          <SignIn /> 
        </Route>
        <Route path="/repository/:id">
          <SingleRepositoryView />
        </Route>
        <Route path="/createreview">
          <CreateReview />
        </Route>
        <Route path="/reviewsbyuser">
          <UsersReviewsView /> 
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;
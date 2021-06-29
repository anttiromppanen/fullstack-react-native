import React from 'react';
import { FlatList, StyleSheet, Alert } from 'react-native';

import Text from './Text';
import ReviewItem from './ReviewItem';
import useAuthorizedUser from '../hooks/useAuthorizedUser';

import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';

import theme from '../theme';

const styles = StyleSheet.create({
  headerText: {
    marginTop: 10,
    textAlign: 'center',
    color: theme.colors.appBarBackground
  }
});

const UsersReviewsView = () => {
  const { data, refetch } = useAuthorizedUser(true);
  const [deleteReview] = useMutation(DELETE_REVIEW);
  
  const reviews = data
    ? data.authorizedUser.reviews.edges.map(edge => edge.node)
    : [];
    
  const header = () => {
    return (
      <Text style={styles.headerText} fontSize="heading">My reviews</Text>
    );
  };

  const deleteAndRefetch = (id) => {
    deleteReview({ variables: { id } });
    refetch();
  };

  const handleDeleteReview = (id) => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "CANCEL",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "DELETE", onPress: () => deleteAndRefetch(id) }
      ]
    );
  };
  

  return (
    <FlatList
      style={{ backgroundColor: 'white' }} 
      data={reviews}
      renderItem={({ item }) =>
        <ReviewItem
          review={item}
          enableButtons={true}
          handleDeleteReview={handleDeleteReview}
        />
      }
      keyExtractor={({ id }) => id}
      ListHeaderComponent={header()}
    />
  );
};

export default UsersReviewsView;
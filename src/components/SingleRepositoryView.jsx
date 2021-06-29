import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import theme from '../theme';

import useReviews from '../hooks/useReviews';

import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import Text from './Text';

const styles = StyleSheet.create({
  reviewTextContainer: {
    borderBottomColor: theme.colors.appBackgroundColor,
    borderBottomWidth: 1,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  reviewText: {
    color: theme.colors.textSecondary,
    letterSpacing: -2,
  },
  noReviewsText: {
    marginLeft: 20,
    paddingVertical: 10,
  }
});


const RepositoryHeader = ({ repository }) => {
  return (
    <View>
      {repository &&
        <View style={{ backgroundColor: 'white' }}>
          <RepositoryItem item={repository} showGithubButton={true} />
          <View style={styles.reviewTextContainer}>
            <Text style={styles.reviewText} fontSize="heading">Reviews</Text>
          </View>
          {repository.reviewCount <= 0 &&
            <Text style={styles.noReviewsText} fontSize="subheading">No reviews yet, add a review!</Text>
          }
        </View>
      }
    </View>
  );
};

const SingleRepositoryView = () => {
  const { id } = useParams();
  const { repository, fetchMore } = useReviews(id, 10);
  
  const reviews = repository
    ? repository.reviews.edges.map(edge => edge.node)
    : [];
   
  const onEndReach = () => fetchMore();

  return (
    <FlatList
      style={{ backgroundColor: 'white' }}
      data={reviews}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryHeader repository={repository} />}
    />
  );
};

export default SingleRepositoryView;
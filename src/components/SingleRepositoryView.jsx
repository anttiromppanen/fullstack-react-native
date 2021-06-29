import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import { format, parseISO } from 'date-fns';
import theme from '../theme';

import { GET_REPOSITORY } from '../graphql/queries';

import RepositoryItem from './RepositoryItem';
import Text from './Text';

const styles = StyleSheet.create({
  reviewScoreContainer: {
    backgroundColor: theme.colors.primary,
    borderRadius: 100,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
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
  reviewTextBody: {
    marginTop: 2,
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
          <RepositoryItem item={repository.repository} showGithubButton={true} />
          <View style={styles.reviewTextContainer}>
            <Text style={styles.reviewText} fontSize="heading">Reviews</Text>
          </View>
          {repository.repository.reviewCount <= 0 &&
            <Text style={styles.noReviewsText} fontSize="subheading">No reviews yet, add a review!</Text>
          }
        </View>
      }
    </View>
  );
};

const ReviewItem = ({ review }) => {
  const formattedDate = () => review && format(parseISO(review.createdAt), 'dd.MM.yyyy');
  
  return (
    <View style={theme.container}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.reviewScoreContainer}>
          <Text color="white" fontSize="subheading" fontWeight="bold">{review.rating}</Text>
        </View>
        <View style={{ flexShrink: 1 }}>
          <Text fontWeight="bold" fontSize="subheading">{review.user.username}</Text> 
          <Text style={{ fontStyle: 'italic' }}>{formattedDate()}</Text>
          <Text style={styles.reviewTextBody} fontSize="subheading">{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

const SingleRepositoryView = () => {
  const { id } = useParams();
  const { data } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });
  
  const reviews = data
    ? data.repository.reviews.edges.map(edge => edge.node)
    : [];
    
  return (
    <FlatList
      style={{ backgroundColor: 'white' }}
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryHeader repository={data} />}
    />
  );
};

export default SingleRepositoryView;
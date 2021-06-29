import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { format, parseISO } from 'date-fns';
import * as WebBrowser from 'expo-web-browser';

import Text from './Text';

import theme from '../theme';

const styles = StyleSheet.create({
  reviewScoreContainer: {
    borderRadius: 100,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  lowReviewScoreBackgroundColor: {
    backgroundColor: theme.colors.lowReviewScoreRed,
  },
  mediumReviewScoreBacgkroundColor: {
    backgroundColor: theme.colors.yellow,
  },
  highReviewScoreBackgroundColor: {
    backgroundColor: theme.colors.primary,
  },
  repositoryButtonsContainer: {
    marginTop: 10,
    flexDirection: 'row'
  },
  viewRepositoryButton: {
    padding: 10,
    marginRight: 5,
    borderRadius: 20,
    backgroundColor: 'white',
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  deleteReviewButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    borderColor: theme.colors.lowReviewScoreRed,
    borderWidth: 2,
  },
});

const selectScoreBackgroundColor = (scoreValue) => {
  if (scoreValue < 60) return styles.lowReviewScoreBackgroundColor;
  if (scoreValue < 80) return styles.mediumReviewScoreBacgkroundColor;

  return styles.highReviewScoreBackgroundColor;
};

const ReviewItem = ({ review, enableButtons, handleDeleteReview }) => {
  const { createdAt, rating, text } = review;
  const formattedDate = () => createdAt && format(parseISO(createdAt), 'dd.MM.yyyy');

  const handleViewRepository = () => WebBrowser.openBrowserAsync(review.repository.url);
  
  return (
    <View style={theme.container}>
      <View style={{ flexDirection: 'row' }}>
        <View style={[styles.reviewScoreContainer, selectScoreBackgroundColor(rating)]}>
          <Text color="white" fontSize="subheading" fontWeight="bold">{rating}</Text>
        </View>
        <View style={{ flexShrink: 1 }}>
          <Text fontWeight="bold" fontSize="subheading">
            {review.user ? review.user.username : review.repository.fullName}
          </Text> 
          <Text style={{ fontStyle: 'italic' }}>{formattedDate()}</Text>
          <Text fontSize="subheading">{text}</Text>
          {enableButtons &&
            <View style={styles.repositoryButtonsContainer}>
              <Pressable style={styles.viewRepositoryButton} onPress={handleViewRepository}>
                <Text color="primary" fontWeight="bold">View repository</Text>
              </Pressable>
              <Pressable style={styles.deleteReviewButton} onPress={() => handleDeleteReview(review.id)}>
                <Text style={{ color: theme.colors.lowReviewScoreRed }}>Delete review</Text>
              </Pressable>
            </View>
          }
        </View>
      </View>
    </View>
  );
};

export default ReviewItem;
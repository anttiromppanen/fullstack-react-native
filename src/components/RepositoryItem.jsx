import React from 'react';
import { Image, View, StyleSheet, Pressable } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { faStar, faUtensils, faSearch, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

import Text from './Text';
import RepositoryInfo from './RepositoryInfo';
import theme from '../theme';

const styles = StyleSheet.create({
  avatar: {
    width: 75,
    height: 75,
    borderRadius: theme.borderRadius.round,
  },
  languageText: {
    backgroundColor: '#FFC25E',
    color: 'white',
    padding: 5,
    borderRadius: theme.borderRadius.semiRound,
  },
  githubButton: {
    backgroundColor: theme.colors.primary,
    padding: 20,
    alignItems: 'center',
    marginTop: 15,
    borderRadius: theme.borderRadius.round,
  },
  horizontalLine: {
    borderBottomColor: theme.colors.appBackgroundColor,
    borderBottomWidth: 1,
    marginTop: 20,
    marginBottom: 5 
  }
});

const RepositoryItem = ({ item, onPress, showGithubButton = false }) => {
  const createAmount = (amount) => {
    if (amount < 1000) return amount;

    const newAmount = (amount / 1000).toFixed(1);

    if (newAmount.charAt(newAmount.length - 1) === '0') {
      return parseInt(newAmount) + 'k'; 
    }

    return newAmount + 'k';
  };
 
  const handleOpenWithWebBrowser = () => {
    WebBrowser.openBrowserAsync(item.url);
  };

  const handleRepositoryPress = (id) => onPress && onPress(id);

  return (
    <View style={theme.container}>
      <Pressable onPress={() => handleRepositoryPress(item.id)}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
          <View style={{ flexShrink: 1, marginLeft: 10 }}>
            <Text
              fontWeight="bold"
              fontSize="subheading"
              testID="repositoryName">
              {item.fullName}
            </Text>
            <Text testID="repositoryDescription">{item.description}</Text>
          </View>
        </View>
        </Pressable>
      <View
        style={{ alignSelf: 'flex-start', marginVertical: 7 }}>
        <Text
          style={styles.languageText}
          testID="repositoryLanguage">
          {item.language}
        </Text>
      </View>
      <View style={styles.horizontalLine}></View>
      <View
        style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <RepositoryInfo
          text="Stars"
          amount={createAmount(item.stargazersCount)}
          testID="repositoryStargazers"
          icon={faStar}
        />
        <RepositoryInfo
          text="Forks"
          amount={createAmount(item.forksCount)}
          testID="repositoryForks"
          icon={faUtensils}
        />
        <RepositoryInfo
          text="Reviews" 
          amount={createAmount(item.reviewCount)}
          testID="repositoryReviews"
          icon={faSearch}
        />
        <RepositoryInfo
          text="Rating"
          amount={createAmount(item.ratingAverage)}
          testID="repositoryRatings"
          icon={faThumbsUp}
        />
      </View>
      {
        showGithubButton &&
        <Pressable style={styles.githubButton} onPress={handleOpenWithWebBrowser}>
          <Text color="white" fontSize="subheading" fontWeight="bold">Open in GitHub</Text>
        </Pressable>
      }
    </View>
  );
};

export default RepositoryItem;
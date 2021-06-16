import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { faStar, faUtensils, faSearch, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

import Text from './Text';
import RepositoryInfo from './RepositoryInfo';
import theme from '../theme';

const styles = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.repositoryItemBackgroundColor,
    padding: 20,
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 10,
  },
  languageText: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    padding: 5,
    borderRadius: 5,
  },
});

const RepositoryItem = ({ item }) => {
  const createAmount = (amount) => {
    if (amount < 1000) return amount;

    const newAmount = (amount / 1000).toFixed(1);

    if (newAmount.charAt(newAmount.length - 1) === '0') {
      return parseInt(newAmount) + 'k'; 
    }

    return newAmount + 'k';
  };

  return (
    <View style={styles.background}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
        <View style={{ flexShrink: 1, marginLeft: 10 }}>
          <Text fontWeight="bold" fontSize="subheading">{item.fullName}</Text>
          <Text>{item.description}</Text>
        </View>
      </View>
      <View style={{ alignSelf: 'flex-start', marginVertical: 10 }}>
        <Text style={styles.languageText}>{item.language}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <RepositoryInfo
          text="Stars"
          amount={createAmount(item.stargazersCount)}
          icon={faStar}
        />
        <RepositoryInfo
          text="Forks"
          amount={createAmount(item.forksCount)}
          icon={faUtensils}
        />
        <RepositoryInfo
          text="Reviews" 
          amount={createAmount(item.reviewCount)}
          icon={faSearch}
        />
        <RepositoryInfo
          text="Rating"
          amount={createAmount(item.ratingAverage)}
          icon={faThumbsUp}
        />
      </View>
    </View>
  );
};

export default RepositoryItem;
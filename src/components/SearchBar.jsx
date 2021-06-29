import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';

const styles = StyleSheet.create({
  searchBar: {
    borderRadius: 20,
    marginTop: 10,
    marginHorizontal: 15,
  },
});

const SearchBar = ({ setSearchFieldValue }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (value) => {
    setSearchQuery(value);
    setSearchFieldValue(value);
  };

  return (
    <Searchbar
      style={styles.searchBar}
      placeholder="Search"
      onChangeText={handleInputChange}
      value={searchQuery}
    />
  );
};

export default SearchBar;
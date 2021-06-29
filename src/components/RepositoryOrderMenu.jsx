import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import SearchBar from './SearchBar';

import theme from '../theme';

const styles = StyleSheet.create({
  pickerContainer: {
    backgroundColor: 'white',
    borderColor: 'white',
    paddingHorizontal: 10,
  },
});

const RepositoryOrderMenu = ({
  selectedOrder,
  setSelectedOrder,
  setSearchFieldValue
  }) => {
  return (
    <View style={{ backgroundColor: 'white' }}>
      <SearchBar
        setSearchFieldValue={setSearchFieldValue}
      />
      <View style={styles.pickerContainer}>
        <Picker
          style={{ color: theme.colors.appBarBackground, padding: 30 }}
          dropdownIconColor='#504538'
          selectedValue={selectedOrder}
          onValueChange={(itemValue) =>
            setSelectedOrder(itemValue)
          }>
          <Picker.Item label="⚡ Latest repositories" value="CREATED_AT" />
          <Picker.Item label="👍 Highest rated repositories" value="RATING AVERAGE HIGHEST" />
          <Picker.Item label="👎 Lowest rated repositories" value="RATING AVERAGE LOWEST" />
        </Picker>
      </View>
    </View>
  );
};

export default RepositoryOrderMenu;
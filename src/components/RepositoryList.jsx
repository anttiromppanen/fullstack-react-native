import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';
import { useDebounce } from 'use-debounce';

import RepositoryItem from './RepositoryItem';
import RepositoryOrderMenu from './RepositoryOrderMenu';

import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    return (
      <RepositoryOrderMenu
        selectedOrder={this.props.selectedOrder}
        setSelectedOrder={this.props.setSelectedOrder}
        setSearchFieldValue={this.props.setSearchFieldValue}
      />
    );
  };

  render() {
    const repositoryNodes = this.props.data
      ? this.props.data.repositories.edges.map(edge => edge.node)
      : [];
      
    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        renderItem={({ item }) => (
          <RepositoryItem item={item} onPress={this.props.handleRepositoryPress} />
        )}
      />
    );
  }
}

const RepositoryList = () => {
  const history = useHistory();
  const [searchFieldValue, setSearchFieldValue] = useState('');
  const [searchQueryValue] = useDebounce(searchFieldValue, 500);
  const [selectedOrder, setSelectedOrder] = useState('CREATED_AT');
  const data = useRepositories(selectedOrder, searchQueryValue);

  const handleRepositoryPress = (id) => {
    history.push(`/repository/${id}`);
  };

  return (
    <RepositoryListContainer
      data={data}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
      setSearchFieldValue={setSearchFieldValue}
      handleRepositoryPress={handleRepositoryPress}
    />
  );
};

export default RepositoryList;
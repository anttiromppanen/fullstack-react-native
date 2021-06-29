import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderBy, keyword, first) => {
  const orderLogic = () => {
    switch (orderBy) {
      case 'RATING AVERAGE HIGHEST':
        return {
          orderBy: 'RATING_AVERAGE',
          searchKeyword: keyword,
          first,
        };
      case 'RATING AVERAGE LOWEST':
        return {
          orderBy: 'RATING_AVERAGE',
          orderDirection: 'ASC',
          searchKeyword: keyword,
          first,
        };
      default:
        return { orderBy, searchKeyword: keyword, first };
    }
  };

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables: orderLogic(),
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) return;

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        orderBy,
        keyword
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;
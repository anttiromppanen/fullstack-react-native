import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderBy, keyword) => {
  const orderLogic = () => {
    switch (orderBy) {
      case 'RATING AVERAGE HIGHEST':
        return {
          orderBy: 'RATING_AVERAGE',
          searchKeyword: keyword,
        };
      case 'RATING AVERAGE LOWEST':
        return {
          orderBy: 'RATING_AVERAGE',
          orderDirection: 'ASC',
          searchKeyword: keyword,
        };
      default:
        return { orderBy, searchKeyword: keyword };
    }
  };

  const { data } = useQuery(GET_REPOSITORIES, {
    variables: orderLogic(),
    fetchPolicy: 'cache-and-network',
  });

  return data;
};

export default useRepositories;
import { useQuery } from '@apollo/client';
import { AUTHORIZED_USER } from '../graphql/queries';

const useAuthorizedUser = (includeReviews = false) => {
  const { data, refetch, networkStatus } = useQuery(AUTHORIZED_USER, {
    variables: { includeReviews },
    fetchPolicy: 'cache-and-network',
  });

  return { data, refetch, networkStatus };
};

export default useAuthorizedUser;
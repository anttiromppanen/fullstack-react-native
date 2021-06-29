import { useQuery } from "@apollo/client";
import { SEARCH_REPOSITORIES } from "../graphql/queries";

const searchRepositories = (keyword) => {
  const { data } = useQuery(SEARCH_REPOSITORIES, {
    variables: { searchKeyword: keyword },
    fetchPolicy: 'cache-and-network',
  });

  return data;
};

export default searchRepositories;
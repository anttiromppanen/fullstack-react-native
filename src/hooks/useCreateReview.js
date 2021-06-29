import { useMutation } from '@apollo/client';

import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [submitReview, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ repositoryOwner, repositoryName, rating, reviewText }) => {
    const { data } = await submitReview({ variables: {
      repositoryName,
      ownerName: repositoryOwner,
      rating,
      text: reviewText
    }});

    return data;
  };

  return [createReview, result];
};

export default useCreateReview;
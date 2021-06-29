import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation signIn($username: String!, $password: String!) {
    authorize(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation createNewReview(
    $repositoryName: String!,
    $ownerName: String!,
    $rating: Int!,
    $text: String
  ) {
    createReview(review: {
      repositoryName: $repositoryName,
      ownerName: $ownerName,
      rating: $rating,
      text: $text
    }) {
      user {
        username
      }
      repository {
        name
      }
      repositoryId
    }
  }
`;

export const CREATE_USER = gql`
  mutation createNewUser($username: String!, $password: String!) {
    createUser(user: { username: $username, password: $password }) {
      username
    }
  }
`;
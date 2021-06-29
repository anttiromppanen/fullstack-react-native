import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query getRepositories(
    $orderBy: AllRepositoriesOrderBy,
    $orderDirection: OrderDirection,
    $searchKeyword: String,
    $first: Int,
    $after: String) {
    repositories(
      orderBy: $orderBy,
      orderDirection: $orderDirection,
      searchKeyword: $searchKeyword,
      first: $first,
      after: $after) {
      edges {
        node {
          id,
          ownerAvatarUrl,
          fullName,
          description,
          language,
          stargazersCount,
          forksCount,
          reviewCount,
          ratingAverage
        }
        cursor
      }
      pageInfo {
        endCursor,
        startCursor,
        hasNextPage
      }
    }
  }
`;

export const SEARCH_REPOSITORIES = gql`
  query searchRepositories($keyword: String!) {
    repositories(searchKeyword: $keyword) {
      edges {
        node {
          id,
          ownerAvatarUrl,
          fullName,
          description,
          language,
          stargazersCount,
          forksCount,
          reviewCount,
          ratingAverage
        }
      }
    }
  }
`;

export const AUTHORIZED_USER = gql`
  query getAuthorizedUser($includeReviews: Boolean = false) {
    authorizedUser {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            rating
            createdAt
            text
            repository {
              fullName
              url
            }
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query getRepository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      id
      ownerName
      name
      fullName
      ratingAverage
      reviewCount
      stargazersCount
      watchersCount
      forksCount
      url
      ownerAvatarUrl
      description
      language
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;
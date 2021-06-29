import React from 'react';
import { render } from '@testing-library/react-native';
import { RepositoryListContainer } from '../../components/RepositoryListContainer';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      // Add your test code here
      const { debug, getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);

      const repositoryNames = getAllByTestId('repositoryName');
      const repositoryDescriptions = getAllByTestId('repositoryDescription');
      const repositoryLanguages = getAllByTestId('repositoryLanguage');
      const repositoryForkCounts = getAllByTestId('repositoryForks');
      const repositoryStargazerCounts = getAllByTestId('repositoryStargazers');
      const repositoryRatings = getAllByTestId('repositoryRatings');
      const repositoryReviews = getAllByTestId('repositoryReviews');

      debug();

      expect(repositoryNames[0]).toHaveTextContent('jaredpalmer/formik');
      expect(repositoryNames[1]).toHaveTextContent('async-library/react-async');

      expect(repositoryDescriptions[0]).toHaveTextContent('Build forms in React, without the tears');
      expect(repositoryDescriptions[1]).toHaveTextContent('Flexible promise-based React data loader');

      expect(repositoryLanguages[0]).toHaveTextContent('TypeScript');
      expect(repositoryLanguages[1]).toHaveTextContent('JavaScript');

      expect(repositoryForkCounts[0]).toHaveTextContent('1.6k');
      expect(repositoryForkCounts[1]).toHaveTextContent('69');

      expect(repositoryStargazerCounts[0]).toHaveTextContent('21.9k');
      expect(repositoryStargazerCounts[1]).toHaveTextContent('1.8k');

      expect(repositoryRatings[0]).toHaveTextContent('88');
      expect(repositoryRatings[1]).toHaveTextContent('72');

      expect(repositoryReviews[0]).toHaveTextContent('3');
      expect(repositoryReviews[1]).toHaveTextContent('3');
    });
  });
});
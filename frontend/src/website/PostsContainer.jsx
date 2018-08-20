import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import BasicContainer from './base/BasicContainer';
import Posts from './Posts';

PostsContainer.propTypes = {
  parentsCornerPosts: PropTypes.shape({
    loading: PropTypes.bool,
    posts: PropTypes.array
  })
};

PostsContainer.defaultProps = {
  parentsCornerPosts: {
    loading: true,
    posts: []
  }
};

function PostsContainer({ parentsCornerPosts }) {
  return (
    <BasicContainer>
      <Helmet title="Parents Corner - Nature's Classroom Institute and Montessori School" />
      <Posts posts={parentsCornerPosts.posts} loading={parentsCornerPosts.loading} />
    </BasicContainer>
  );
}

const ALL_POSTS_QUERY = gql`
  query AllPostsQuery {
    posts {
      id,
      title,
      slug,
      publishDate,
      isPublished,
      isPinned,
      post
    }
  }
`;

export default graphql(ALL_POSTS_QUERY, {
  name: 'parentsCornerPosts',
  options: {
    pollInterval: 10000
  }
})(PostsContainer);

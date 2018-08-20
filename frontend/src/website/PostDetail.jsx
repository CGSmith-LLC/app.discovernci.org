import React from 'react';
import PropTypes from 'prop-types';
import renderHTML from 'react-render-html';
import Moment from 'react-moment';
import Helmet from 'react-helmet';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Row, Col } from 'react-bootstrap';

import BasicContainer from './base/BasicContainer';

PostDetail.propTypes = {
  params: PropTypes.shape({
    year: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    month: PropTypes.string,
    slug: PropTypes.string
  }).isRequired,
  data: PropTypes.shape({
    loading: PropTypes.bool,
    post: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      publishDate: PropTypes.string,
      post: PropTypes.string
    })
  }).isRequired
};

function PostDetail(props) {
  return (
    props.data.loading
      ? <BasicContainer>Loading...</BasicContainer>
      : <BasicContainer>
        <Helmet title={props.data.post.title} />
        <Row>
          <Col md={8} mdOffset={2}>

            <h1>{props.data.post.title}</h1>

            <Moment format="dddd, MMMM Do YYYY \a\t h:ma">
              {props.data.post.publishDate}
            </Moment>

            {renderHTML(props.data.post.post)}

          </Col>
        </Row>
      </BasicContainer>
  );
}

const POST_DETAIL = gql`
  query PostDetail(
    $year: Int!
    $month: String!
    $slug: String!
  ) {
    post(
      year: $year
      month: $month
      slug: $slug
    ) {
      id
      slug
      title
      publishDate
      post
    }
  }`;

export default graphql(POST_DETAIL, {
  options: ownProps => ({
    variables: {
      year: ownProps.params.year,
      month: ownProps.params.month,
      slug: ownProps.params.slug
    }
  })
})(PostDetail);

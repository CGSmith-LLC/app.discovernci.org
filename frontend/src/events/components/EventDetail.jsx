import React from 'react';
import PropTypes from 'prop-types';
import renderHTML from 'react-render-html';
import Moment from 'react-moment';
import Helmet from 'react-helmet';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Row, Col } from 'react-bootstrap';

import BasicContainer from '../../base/BasicContainer';

EventDetail.propTypes = {
  params: PropTypes.shape({
    year: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    month: PropTypes.string,
    slug: PropTypes.string
  }).isRequired,
  eventDetailQuery: PropTypes.shape({
    loading: PropTypes.bool,
    event: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      startDate: PropTypes.string,
      event: PropTypes.string
    })
  }).isRequired
};

function EventDetail(props) {
  const obj = props.eventDetailQuery.event && props.eventDetailQuery.event;
  return (
    obj
      ? <BasicContainer>

        <Helmet title={obj.title} />

        <Row>
          <Col md={8} mdOffset={2}>

            <h1>{obj.title}</h1>

            <Moment format="dddd, MMMM Do YYYY \a\t h:ma">{obj.startDate}</Moment>

            {renderHTML(obj.body)}

            <hr />
            
            <ul>
              {obj.featureImage && <li><img src={obj.featureImage} alt="" style={{ width: 300 }} /></li>}
              {obj.location && <li>Location: {obj.location}</li>}
              {obj.customUrl && <li>More info: <a href={obj.customUrl}>{obj.customUrl}</a></li>}
              {obj.physicalFlyer && <li>Physical flyer: <a href={`https://discovernci.org/media/${obj.physicalFlyer}`}>{obj.physicalFlyer }</a></li>}
            </ul>

          </Col>
        </Row>

      </BasicContainer>
      : <BasicContainer>Loading...</BasicContainer>
  );
}

const EVENT_DETAIL_QUERY = gql`
  query EventDetailQuery(
    $year: Int!
    $month: String!
    $slug: String!
  ) {
    event(
      year: $year
      month: $month
      slug: $slug
    ) {
      id
      slug
      title
      body
      startDate
      endDate
      location
      customUrl
      featureImage
      physicalFlyer
      sortOrder
      created
      modified
    }
  }`;

export default graphql(EVENT_DETAIL_QUERY, {
  name: 'eventDetailQuery',
  options: ownProps => ({
    variables: {
      year: ownProps.params.year,
      month: ownProps.params.month,
      slug: ownProps.params.slug
    },
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore'
  })
})(EventDetail);

import React from 'react';
import PropTypes from 'prop-types';

import Helmet from 'react-helmet';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

import BasicContainer from '../../base/BasicContainer';
import EventList from './EventList';

class Events extends React.Component {
  static propTypes = {
    allEventsQuery: PropTypes.shape({
      loading: PropTypes.bool,
      events: PropTypes.array
    })
  }

  static defaultProps = {
    allEventsQuery: {
      loading: true,
      events: []
    }
  }

  componentWillMount() {
    document.body.style.backgroundImage = 'url(/discovernci_media/bgDeep.jpg)';
  }

  render() {
    return (
      <BasicContainer>
        <Helmet title="Events - Nature's Classroom Institute and Montessori School" />
        <EventList
          upcomingEvents={this.props.upcomingEvents.events}
          previousEvents={this.props.previousEvents.events}
        />
      </BasicContainer>
    );
  }
}

const EVENTS_QUERY = gql`
  query AllEventsQuery(
    $timeline: String,
    $limit: Int
  ) {
    events(
      timeline: $timeline,
      limit: $limit
    ) {
      id
      title
      slug
      startDate
      endDate
      body
      created
      isFeatured
      getAbsoluteUrl
    }
  }`;

const EventsContainer = compose(
  graphql(EVENTS_QUERY, { name: 'upcomingEvents' }),
  graphql(EVENTS_QUERY, {
    name: 'previousEvents',
    options: {
      variables: {
        timeline: 'previous'
      }
    }
  })
)(Events);

export default EventsContainer;

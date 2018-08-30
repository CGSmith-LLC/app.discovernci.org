import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import renderHTML from 'react-render-html';
import Moment from 'react-moment';
// import moment from 'moment';
// import { Link } from 'react-router';
import { Row, Col, Panel } from 'react-bootstrap';

EventList.propTypes = {
  upcomingEvents: PropTypes.arrayOf(PropTypes.shape({
    pk: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
    start_date: PropTypes.string
  })),
  previousEvents: PropTypes.arrayOf(PropTypes.shape({
    pk: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
    start_date: PropTypes.string
  }))
};

EventList.defaultProps = {
  upcomingEvents: [],
  previousEvents: []
};

export default function EventList({ upcomingEvents, previousEvents }) {
  // const getAbsoluteUrl = (event) => {
  //   const dateString = moment(event.start_date).format('YYYY/MMM/').toLowerCase();
  //   return `/events/${dateString}${event.slug}`;
  // };

  // const orderedByMonths = _.groupBy(previousEvents, element => element.startDate.substring(0, 7));
  // const orderedByYears = _.groupBy(orderedByMonths, month => month[0].startDate.substring(0, 4));
  // console.log(orderedByYears);

  return (
    <Row>
      <Col md={6} mdOffset={1} className="sans-block" style={{ paddingTop: 20 }}>
        {upcomingEvents && upcomingEvents.length > 0
          ? upcomingEvents.map(event =>
            <div key={event.id}>
              <h2>{/* <a href={getAbsoluteUrl(event)}> */}{event.title} {/* }</a> */}</h2>
              <p>When: <strong><Moment format="dddd, MMMM D YYYY \a\t h:mma">{event.startDate}</Moment></strong> <span style={{ color: '#737373' }}>(<Moment fromNow>{event.startDate}</Moment>)</span></p>
              {event.body && renderHTML(event.body)}
              <hr />
            </div>
          )
          : 'There are no events to show at this time. Please check back soon.'
        }
      </Col>
      <Col md={4}>

        {/* <Panel header="Big Upcoming Events" className="top-30">
          <Link to="/events/dinner-in-the-woods">
            <img src="discovernci_media/DinnerInTheWoodsTn.jpg" alt="" className="img-responsive img-rounded" style={{ marginBottom: 10 }} />
          </Link>
          <h3 style={{ marginTop: 0, marginBottom: 5 }}>Dinner in the Woods 2018</h3>
          <p style={{ fontSize: '1em' }}>5-11:30pm on Saturday, June 2nd 2018</p>
          <p style={{ fontFamily: 'helvetica, sans-serif', fontSize: '1em' }}>Join us for a delightful evening of dining, cocktails, mingling and merriment! Hyper-local dinner and deserts. Garden party attire.</p>
          <a href="/events/dinner-in-the-woods" className="btn btn-block btn-lg btn-success">Details</a>
        </Panel> */}

        <Panel header="Previous Events" className="top-30">
          <ul>
            {_.map(previousEvents, event => (
              <li key={event.id}>
                <a href={event.getAbsoluteUrl}>{event.title}</a>
              </li>
            ))}
          </ul>
        </Panel>

      </Col>

    </Row>
  );
}

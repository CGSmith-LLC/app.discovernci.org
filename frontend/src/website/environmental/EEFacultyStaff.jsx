import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import { locations, facultyStaffList } from '../db';

EEFacultyStaff.propTypes = {
  params: PropTypes.shape({
    location: PropTypes.string
  })
};

EEFacultyStaff.defaultProps = {
  params: { location: null }
};

export default function EEFacultyStaff(props) {
  const selectedLocation = props.params.location
    ? _.find(locations, { slug: props.params.location })
    : { shortName: 'All Locations' };

  const userList = _.orderBy(
    props.params.location
      ? _.filter(facultyStaffList, { locations: [selectedLocation.id] })
      : _.reject(facultyStaffList, { locations: [6] }),
    ['rank']
  );

  const showList = userList.map(person => (
    <Row key={person.id}>
      <Col md={4} mdOffset={1}>
        {person.image &&
          <img
            src={person.image}
            className="img-responsive img-rounded bottom-30 top-30"
            alt="presentation"
            style={{
              width: !props.params.location && 120,
              float: !props.params.location && 'right'
            }}
          />
        }
      </Col>
      <Col md={6}>
        <a name={person.slug}>
          <h2>{person.name}</h2>
        </a>
        <h4>{person.title}</h4>
        {props.params.location &&
          <span dangerouslySetInnerHTML={{ __html: person.bio }} />
        }
      </Col>
    </Row>
  ));

  return (
    <div>
      <Row>
        <Col md={10} mdOffset={1} className="center">
          <h1 className="bottom-30">{selectedLocation.shortName} Faculty and Staff</h1>
        </Col>
      </Row>
      <div className="row-wrapper">
        {showList}
      </div>
    </div>
  );
}

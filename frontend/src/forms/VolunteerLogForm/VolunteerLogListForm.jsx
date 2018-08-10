import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Row, Col } from 'react-bootstrap';

import VolunteerLogListItem from './VolunteerLogListItem';

const VolunteerLogListForm = ({
  items,
  handleAdd,
  handleRemove,
  handleDate,
  handleTopic,
  handleHours
}) => [
  (items.length > 0)
    && (
      <Row key={16346} className="top-20" style={{ margin: 0, padding: '7px 0' }}>
        <Col md={3}>
          <strong>
            Date
          </strong>
        </Col>
        <Col md={7}>
          <strong>
            Project/Activity your family volunteered for
          </strong>
        </Col>
        <Col md={2}>
          <strong>
            Hours
          </strong>
        </Col>
      </Row>
    ),
  (items.length > 0)
    && items.map(item => (
      <VolunteerLogListItem
        key={item.id}
        item={item}
        handleRemove={handleRemove}
        handleDate={handleDate}
        handleTopic={handleTopic}
        handleHours={handleHours}
      />
    )),
  (
    <div key={2355} style={{ marginTop: 15, marginBottom: 15 }}>
      <button
        type="button"
        onClick={handleAdd}
        style={{
          background: 'none',
          border: 'none',
          color: '#377BB5'
        }}
      >
        <FontAwesome name="plus" fixedWidth />
        {' '}
        Log Volunteer Hours
      </button>
    </div>
  )

];

export default VolunteerLogListForm;

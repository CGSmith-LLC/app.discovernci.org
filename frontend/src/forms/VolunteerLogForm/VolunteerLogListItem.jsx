import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Row, Col, FormControl } from 'react-bootstrap';

const VolunteerLogListItem = ({
  item,
  handleRemove,
  handleDate,
  handleTopic,
  handleHours
}) => (
  <Row
    className="inline-formset-wrapper"
    style={{
      margin: 0,
      padding: '7px 0',
      background: '#e4e4e4'
    }}
  >
    <Col md={3}>

      <FormControl
        type="date"
        style={{ lineHeight: '1.3em' }}
        onChange={e => handleDate(item.id, e.target.value)}
        value={item.date}
      />

    </Col>
    <Col md={7}>

      <FormControl
        type="text"
        placeholder="e.g. Face painting station at Harvest Fest"
        onChange={e => handleTopic(item.id, e.target.value)}
        value={item.topic}
      />

    </Col>
    <Col md={2}>

      <FormControl
        type="text"
        placeholder="e.g. 1"
        onChange={e => handleHours(item.id, e.target.value)}
        value={item.hours}
      />

    </Col>
    {!item.locked
      && (
        <div style={{ position: 'absolute', right: -20 }}>

          <FontAwesome
            name="minus-circle"
            onClick={() => handleRemove(item.id)}
          />

        </div>
      )
    }
  </Row>
);

export default VolunteerLogListItem;

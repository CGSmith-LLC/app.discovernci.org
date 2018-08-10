import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Row, Col, FormControl } from 'react-bootstrap';

const ApprovedAdultListItem = ({
  item,
  handleRemove,
  handleName
}) => (
  <Row
    className="inline-formset-wrapper"
    style={{
      margin: '0 0 5px 0',
      padding: 10,
      background: '#e4e4e4'
    }}
  >
    <Col md={4}>

      <FormControl
        type="text"
        placeholder="Full Name"
        onChange={e => handleName(item.id, e.target.value)}
        value={item.name}
      />

    </Col>
    <Col md={4}>

      <FormControl
        type="text"
        placeholder="(555) 555-5555"
        onChange={e => handleName(item.id, e.target.value)}
        value={item.relationToChild}
      />

    </Col>
    <Col md={4}>

      <FormControl
        type="text"
        placeholder="Aunt, Grand Parent, Friend"
        onChange={e => handleName(item.id, e.target.value)}
        value={item.email}
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

export default ApprovedAdultListItem;

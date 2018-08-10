import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Row, Col } from 'react-bootstrap';

import ApprovedAdultListItem from './ApprovedAdultListItem';

const ApprovedAdultListForm = ({
  items,
  handleRemove,
  handleName,
  handleAdd
}) => [
  (items.length > 0)
    && (
      <Row className="top-20">
        <Col md={4}>
          <strong>
            Name
          </strong>
        </Col>
        <Col md={4}>
          <strong>
            Phone
          </strong>
        </Col>
        <Col md={4}>
          <strong>
            Relation
          </strong>
        </Col>
      </Row>
    ),
  (items.length > 0)
    && items.map(item => (
      <ApprovedAdultListItem
        key={item.id}
        item={item}
        handleRemove={handleRemove}
        handleName={handleName}
      />
    )),
  (
    <div style={{ marginTop: 15, marginBottom: 15 }}>
      <button
        type="button"
        onClick={handleAdd}
        style={{
          background: 'none',
          border: 'none',
          color: '#377BB5'
        }}
      >
        <FontAwesome name="user-plus" fixedWidth />
        {' '}
        Add
        {' '}
        {(items.length > 0) && 'another'}
        {' '}
        Approved Adult
      </button>
    </div>
  )

];

export default ApprovedAdultListForm;

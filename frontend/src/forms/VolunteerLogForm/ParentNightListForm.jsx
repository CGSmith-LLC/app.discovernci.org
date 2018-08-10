import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Row, Col } from 'react-bootstrap';

import ParentNightListItem from './ParentNightListItem';

const ParentNightListForm = ({
  items,
  handleAdd,
  handleRemove,
  handleDate,
  handleTopic
}) => [
  (items.length > 0)
    && (
      <Row
        key={124124}
        className="top-20"
        style={{
          margin: 0,
          padding: '7px 0'
        }}
      >
        <Col md={3}>
          <strong>
            Date
          </strong>
        </Col>
        <Col md={9}>
          <strong>
            Topic
          </strong>
        </Col>
      </Row>
    ),
  (items.length > 0)
    && items.map(item => (
      <ParentNightListItem
        key={item.id}
        item={item}
        handleAdd={handleAdd}
        handleRemove={handleRemove}
        handleDate={handleDate}
        handleTopic={handleTopic}
      />
    )),
  (
    <div key={452645} style={{ marginTop: 15, marginBottom: 15 }}>
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
        Log Parent Night
      </button>
    </div>
  )

];

export default ParentNightListForm;

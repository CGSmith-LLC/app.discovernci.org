import React from 'react';
import { Row, Col } from 'react-bootstrap';

import TshirtOrderItem from './TshirtOrderItem';

export default function TshirtOrderForm(props) {
  const { items, handleRemove, handleSize, handleColor } = props;
  return (
    <div>
      <Row>
        <Col md={6}>
          <strong>Color</strong>
        </Col>
        <Col md={5}>
          <strong>Size</strong>
        </Col>
      </Row>
      {items &&
        items.map(item => (
          <TshirtOrderItem
            key={item.id}
            item={item}
            handleRemove={handleRemove}
            handleSize={handleSize}
            handleColor={handleColor}
          />
        ))
      }
    </div>
  );
}

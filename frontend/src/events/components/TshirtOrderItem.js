import React from 'react';
import { Row, Col, FormControl } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

export default function TshirtOrderItem(props) {
  const { item, handleColor, handleSize, handleRemove } = props;
  return (
    <Row className="inline-formset-wrapper">

      <Col md={6}>
        <FormControl
          componentClass="select"
          onChange={e => handleColor(item.id, e.target.value)}
          value={item.color}
        >
          <option value={'wamrgrey'}>Warm Grey</option>
          <option value={'coolblue'}>Cool Blue</option>
          <option value={'turquoise'}>Turquoise</option>
        </FormControl>
      </Col>

      <Col md={5}>
        <FormControl
          componentClass="select"
          onChange={e => handleSize(item.id, e.target.value)}
          value={item.size}
        >
          <option disabled>Youth Sizes</option>
          <option value={'yxs'}>&nbsp;&nbsp;&nbsp;&nbsp;X-Small (Youth)</option>
          <option value={'ysm'}>&nbsp;&nbsp;&nbsp;&nbsp;Small (Youth)</option>
          <option value={'ymd'}>&nbsp;&nbsp;&nbsp;&nbsp;Medium (Youth)</option>
          <option value={'ylg'}>&nbsp;&nbsp;&nbsp;&nbsp;Large (Youth)</option>
          <option value={'yxl'}>&nbsp;&nbsp;&nbsp;&nbsp;X-Large (Youth)</option>
          <option disabled>────────</option>
          <option disabled>Adult Sizes</option>
          <option value={'xs'}>&nbsp;&nbsp;&nbsp;&nbsp;X-Small</option>
          <option value={'sm'}>&nbsp;&nbsp;&nbsp;&nbsp;Small</option>
          <option value={'md'}>&nbsp;&nbsp;&nbsp;&nbsp;Medium</option>
          <option value={'lg'}>&nbsp;&nbsp;&nbsp;&nbsp;Large</option>
          <option value={'xl'}>&nbsp;&nbsp;&nbsp;&nbsp;X-Large</option>
          <option value={'2xl'}>&nbsp;&nbsp;&nbsp;&nbsp;XX-Large</option>
          <option value={'3xl'}>&nbsp;&nbsp;&nbsp;&nbsp;XXX-Large</option>
        </FormControl>
      </Col>

      {!item.locked &&
        <Col md={1}>
          <FontAwesome
            name="trash"
            onClick={() => handleRemove(item.id)}
          />
        </Col>
      }

    </Row>
  );
}

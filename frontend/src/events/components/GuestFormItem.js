import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, Button } from 'react-bootstrap';

const GuestFormItem = ({ item, handleName, handleEmail, handleCheckIn, handlePaddle }) => (
  <div className="inline-formset-wrapper">

    <FormControl
      type="text"
      placeholder="Guest's Name"
      onChange={e => handleName(item.id, e.target.value)}
      value={item.name}
      className="name"
    />

    <FormControl
      type="text"
      placeholder="Email"
      onChange={e => handleEmail(item.id, e.target.value)}
      value={item.email}
      className="email"
    />

    <FormControl
      type="text"
      placeholder="Paddle"
      onChange={e => handlePaddle(item.id, e.target.value)}
      value={item.paddleId}
      className="paddle"
    />

    {item.checkIn === 1
      ? <Button bsStyle="success" bsSize="sm" onClick={e => handleCheckIn(item.id, 0)}>Check-in</Button>
      : <Button bsStyle="warning" bsSize="sm" onClick={e => handleCheckIn(item.id, 1)}>Check-in</Button>
    }

  </div>
);

GuestFormItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    checkIn: PropTypes.boolean
  }).isRequired,
  handleName: PropTypes.func.isRequired,
  handleEmail: PropTypes.func.isRequired,
  handleCheckIn: PropTypes.func.isRequired,
  handlePaddle: PropTypes.func.isRequired
};

export default GuestFormItem;

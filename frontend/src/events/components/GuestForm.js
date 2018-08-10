import React from 'react';
import PropTypes from 'prop-types';

import GuestFormItem from './GuestFormItem';

const GuestForm = ({ items, handleName, handleEmail, handleCheckIn, handlePaddle }) => (
  <div>
    {items &&
      items.map(item => (
        <GuestFormItem
          key={item.id}
          item={item}
          handleName={handleName}
          handleEmail={handleEmail}
          handleCheckIn={handleCheckIn}
          handlePaddle={handlePaddle}
        />
      ))
    }
  </div>
);

GuestForm.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      email: PropTypes.string,
      checkIn: PropTypes.boolean
    })
  ).isRequired,
  handleName: PropTypes.func.isRequired,
  handleEmail: PropTypes.func.isRequired,
  handleCheckIn: PropTypes.func.isRequired,
  handlePaddle: PropTypes.func.isRequired
};

export default GuestForm;

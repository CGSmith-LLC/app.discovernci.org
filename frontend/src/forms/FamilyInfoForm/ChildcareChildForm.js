import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import ChildcareChildItem from './ChildcareChildItem';

const ChildcareChildForm = props => [
  props.items.map(item => (
    <ChildcareChildItem
      key={item.id}
      item={item}
      handleRemove={props.handleRemove}
      handleName={props.handleName}
      handleDobMonth={props.handleDobMonth}
      handleDobDay={props.handleDobDay}
      handleDobYear={props.handleDobYear}
      handleDobClear={props.handleDobClear}
      handleChildAllergyAlert={props.handleChildAllergyAlert}
      handleChildHealthConditions={props.handleChildHealthConditions}
      handleChildAdditionalHealthInfo={props.handleChildAdditionalHealthInfo}
      handleDisplayAdditionalHealthInfo={props.handleDisplayAdditionalHealthInfo}
      displayAdditionalHealthInfo={props.displayAdditionalHealthInfo}
    />
  )),
  (
    <div key={2343} style={{ marginTop: 15, marginBottom: 15 }}>
      <button
        type="button"
        onClick={props.handleAdd}
        style={{ background: 'none', border: 'none', color: '#377BB5' }}
      >
        <FontAwesome name="user-plus" fixedWidth />
        {' '}
        Add another Child
      </button>
    </div>
  )

];

ChildcareChildForm.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      dobMonth: PropTypes.number,
      dobDay: PropTypes.number,
      dobYear: PropTypes.number,
      allergyAlert: PropTypes.string,
      healthConditions: PropTypes.string,
      additionalHealthInfo: PropTypes.string,
      locked: PropTypes.boolean
    })
  ).isRequired,
  handleAdd: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleName: PropTypes.func.isRequired,
  handleDobMonth: PropTypes.func.isRequired,
  handleDobDay: PropTypes.func.isRequired,
  handleDobYear: PropTypes.func.isRequired,
  handleDobClear: PropTypes.func.isRequired
};

export default ChildcareChildForm;

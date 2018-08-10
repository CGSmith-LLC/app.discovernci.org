import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, FormControl, FormGroup, ControlLabel, Checkbox } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import { medicationAdminTimeChoices } from './formFieldChoices';

const MedicationFormItem = props => (
  <Row className="inline-formset-wrapper" style={{ background: '#fffdf1', margin: '0 0 25px 0', padding: '15px 0', border: '1px solid #cccccc', borderRadius: 6 }}>

    {props.showCloseBtn &&
      <button
        onClick={() => props.handleRemove(props.item.id)}
        style={{ border: 'none', background: 'none', position: 'absolute', right: 0, top: 3, color: '#b55050' }}
      >
        <FontAwesome name="close" fixedWidth />
      </button>
    }

    <Col sm={6} md={6}>

      <FormGroup controlId="medicationNameInput">
        <ControlLabel>Name of Medication</ControlLabel>
        <FormControl
          type="text"
          placeholder="e.g. Claritin"
          onChange={e => props.handleMedMedicationName(props.item.id, e.target.value)}
          value={props.item.medicationName}
          autoFocus
        />
      </FormGroup>

      <FormGroup controlId="medicationNotes">
        <ControlLabel>Details / Addition instructions</ControlLabel>
        <FormControl
          componentClass="textarea"
          onChange={e => props.handleMedNotes(props.item.id, e.target.value)}
          value={props.item.notes}
          style={{ maxWidth: '100%', fontSize: '0.9em', minHeight: props.item.administrationTimes.includes(5) ? 184 : 127 }}
        />
        <FormControl.Feedback />
      </FormGroup>

    </Col>

    <Col sm={6} md={6}>

      <FormGroup controlId="medicationNameInput">
        <ControlLabel>Dosage amount</ControlLabel>
        <FormControl
          type="text"
          placeholder="e.g. '10 mL' or '2 puffs'..."
          onChange={e => props.handleMedAmountHuman(props.item.id, e.target.value)}
          value={props.item.amountHuman}
        />
      </FormGroup>

      <FormGroup controlId="administrationTimesArray">
        <ControlLabel>To be taken at:</ControlLabel>
        {_.map(medicationAdminTimeChoices, adminTime => (
          <Checkbox
            key={adminTime.id}
            checked={props.item.administrationTimes.length > 0 &&
              props.item.administrationTimes.includes(adminTime.id)
            }
            onChange={e => props.handleMedAdministrationTimes(
              props.item.id,
              String(adminTime.label).toLowerCase(),
              e.target.checked
            )}
          >{adminTime.label}</Checkbox>
        ))}
      </FormGroup>

      {props.item.administrationTimes.includes(5) &&
        <FormGroup controlId="administrationTimesOtherInput">
          <FormControl
            type="text"
            placeholder="e.g. 'As needed'..."
            onChange={e => props.handleMedAdministrationTimesOther(props.item.id, e.target.value)}
            value={props.item.administrationTimesOther}
          />
        </FormGroup>
      }

    </Col>

  </Row>
);

MedicationFormItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    medicationName: PropTypes.string,
    amountHuman: PropTypes.string,
    notes: PropTypes.string,
    administrationTimes: PropTypes.arrayOf(PropTypes.number),
    administrationTimesOther: PropTypes.string
  }).isRequired,
  handleRemove: PropTypes.func,
  handleMedMedicationName: PropTypes.func.isRequired,
  handleMedAmountHuman: PropTypes.func.isRequired,
  handleMedNotes: PropTypes.func.isRequired,
  handleMedAdministrationTimes: PropTypes.func.isRequired,
  handleMedAdministrationTimesOther: PropTypes.func.isRequired,
  showCloseBtn: PropTypes.bool
};

MedicationFormItem.defaultProps = {
  handleRemove: null,
  showCloseBtn: true
};

export default MedicationFormItem;

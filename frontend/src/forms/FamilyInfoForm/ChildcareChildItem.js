import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import {
  Row, Col, FormGroup, FormControl, ControlLabel, Button
} from 'react-bootstrap';

import DateField from '../../common/DateField';

const ChildcareChildItem = ({
  item,
  handleRemove,
  handleName,
  handleDobMonth,
  handleDobDay,
  handleDobYear,
  handleDobClear,
  displayAdditionalHealthInfo,
  handleDisplayAdditionalHealthInfo
}) => [
  <Row
    className="inline-formset-wrapper"
    style={{
      margin: '0 0 5px 0',
      padding: 10,
      background: '#e4e4e4'
    }}
  >
    <Col md={6}>

      <ControlLabel>
        Child&apos;s Name
      </ControlLabel>
      <FormControl
        type="text"
        placeholder="Child's Name"
        onChange={e => handleName(item.id, e.target.value)}
        value={item.name}
      />

    </Col>
    <Col md={6}>

      <ControlLabel>
        Allergy Alert
      </ControlLabel>
      <FormControl
        type="text"
        placeholder="Any major allergy issues?"
        onChange={e => handleName(item.id, e.target.value)}
        value={item.name}
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
    <Col md={6} style={{ paddingTop: 15 }}>

      <FormGroup controlId="birthdate">
        <DateField
          handleMonth={handleDobMonth}
          handleDay={handleDobDay}
          handleYear={handleDobYear}
          handleClear={handleDobClear}
          minYear={2000}
          maxYear={2015}
          month={item.dobMonth}
          day={item.dobDay}
          year={item.dobYear}
          displayBirthdayMessage
          displayAgeCalc
        />
      </FormGroup>

    </Col>
    <Col md={6} style={{ paddingTop: 15 }}>

      <ControlLabel>
        Health Conditions
      </ControlLabel>
      <FormControl
        type="text"
        placeholder="Any health conditions you'd like us to know about?"
        onChange={e => handleName(item.id, e.target.value)}
        value={item.name}
        className="bottom-10"
      />

      {displayAdditionalHealthInfo
        ? [
          <span style={{ padding: '10px 0' }}>
            Please detail any additional health information that you think is important/significant for the school/your child’s teachers to know.
          </span>,
          <textarea
            type="text"
            // onChange={e => handleName(item.id, e.target.value)}
            // value={item.streetAddress}
            className="form-control top-10"
            style={{
              maxWidth: '100%',
              minWidth: '100%',
              minHeight: 100
            }}
          />
        ]
        : (
          <Button
            bsStyle="link"
            style={{ position: 'relative', right: 0 }}
            onClick={handleDisplayAdditionalHealthInfo}
          >
            Add Additional Health Information
          </Button>
        )
      }

    </Col>
  </Row>
];

ChildcareChildItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    dob: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    locked: PropTypes.boolean
  }).isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleName: PropTypes.func.isRequired,
  handleDobMonth: PropTypes.func.isRequired,
  handleDobDay: PropTypes.func.isRequired,
  handleDobYear: PropTypes.func.isRequired,
  handleDobClear: PropTypes.func.isRequired
};

export default ChildcareChildItem;

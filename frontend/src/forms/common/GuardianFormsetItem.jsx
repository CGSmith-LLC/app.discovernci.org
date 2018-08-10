import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import {
  Row, Col, FormControl, ControlLabel, Checkbox
} from 'react-bootstrap';


const GuardianListItem = props => (
  <Row
    className="inline-formset-wrapper"
    style={{
      margin: '0 0 15px 0',
      padding: 10,
      background: '#e4e4e4'
    }}
  >
    <Col md={6}>

      <ControlLabel>
        Name
      </ControlLabel>
      <FormControl
        type="text"
        placeholder="Full Name"
        onChange={e => props.handleName(props.item.id, e.target.value)}
        value={props.item.name}
      />

      <br />
      <br />

      <ControlLabel>
        Relationship to Child
      </ControlLabel>
      <FormControl
        type="text"
        placeholder="Parent, Gaurdian, Grand Parent..."
        onChange={e => props.handleName(props.item.id, e.target.value)}
        value={props.item.relationToChild}
      />

      <br />
      <br />

      <ControlLabel>
        Email Address
      </ControlLabel>
      <FormControl
        type="text"
        placeholder="me@example.com"
        onChange={e => props.handleName(props.item.id, e.target.value)}
        value={props.item.email}
      />

      <br />
      <br />

      <ControlLabel>
        Phone
      </ControlLabel>
      <FormControl
        type="text"
        placeholder="(555) 555-5555"
        onChange={e => props.handleName(props.item.id, e.target.value)}
        value={props.item.phone}
      />

    </Col>
    <Col md={6}>

      <ControlLabel>
        Street Address
      </ControlLabel>
      <textarea
        type="text"
        onChange={e => props.handleName(props.item.id, e.target.value)}
        value={props.item.streetAddress}
        className="form-control"
      />

      <br />

      <Checkbox>
        Display this Parent/Guardian in the Student Directory
      </Checkbox>


    </Col>
    {!props.item.locked
      && (
        <div style={{ position: 'absolute', right: -20 }}>

          <FontAwesome
            name="minus-circle"
            onClick={() => props.handleRemove(props.item.id)}
          />

        </div>
      )
    }
  </Row>
);

GuardianListItem.propTypes = {
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
  handleName: PropTypes.func.isRequired
};

export default GuardianListItem;

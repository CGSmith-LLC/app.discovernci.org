// import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { Row, Col, FormGroup, FormControl, InputGroup, ControlLabel } from 'react-bootstrap';

CreditCardForm.propTypes = {
  handleCardNumber: PropTypes.func.isRequired,
  handleCardExpMonth: PropTypes.func.isRequired,
  handleCardExpYear: PropTypes.func.isRequired,
  handleCardCvc: PropTypes.func.isRequired,
  cardNumber: PropTypes.string.isRequired,
  cardExpMonth: PropTypes.string.isRequired,
  cardExpYear: PropTypes.string.isRequired,
  cardCvc: PropTypes.string.isRequired
};

export default function CreditCardForm(props) {
  return (
    <div className="panel panel-default credit-card-box top-30 bottom-30">

      <div className="panel-heading display-table">
        <Row>
          <span className="panel-title display-td" style={{ marginLeft: 15, fontSize: '1.1em' }}>Payment Details</span>
          <img
            src="/discovernci_media/cards-accepted.jpg"
            style={{ width: 125, marginRight: 15, position: 'relative', top: 4 }}
            className="img-responsive pull-right"
            alt="All major credit cards accepted"
          />
        </Row>
      </div>

      <div className="panel-body" style={{ paddingBottom: 0 }}>
        <Row>
          <Col xs={12}>

            <FormGroup>
              <InputGroup>
                <InputGroup.Addon><FontAwesome name="credit-card" /></InputGroup.Addon>
                <FormControl
                  type="text"
                  placeholder="Credit Card Number"
                  data-stripe="number"
                  onChange={props.handleCardNumber}
                  value={props.cardNumber}
                />
              </InputGroup>
            </FormGroup>

          </Col>
        </Row>
        <Row>
          <Col md={5} xs={5}>

            <FormGroup>
              <InputGroup>
                <ControlLabel style={{ display: 'block' }}>Exp. Date</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="MM"
                  data-stripe="exp-month"
                  onChange={props.handleCardExpMonth}
                  value={props.cardExpMonth}
                  style={{ width: 70, marginRight: 5 }}
                />
                <FormControl
                  type="text"
                  placeholder="YY"
                  data-stripe="exp-year"
                  onChange={props.handleCardExpYear}
                  value={props.cardExpYear}
                  style={{ width: 70 }}
                />
              </InputGroup>
            </FormGroup>

          </Col>
          <Col md={5} xs={5}>

            <FormGroup>
              <ControlLabel>CVC Code</ControlLabel>
              <FormControl
                type="text"
                placeholder="CVC"
                data-stripe="cvc"
                onChange={props.handleCardCvc}
                value={props.cardCvc}
              />
            </FormGroup>

          </Col>
        </Row>
      </div>
    </div>
  );
}

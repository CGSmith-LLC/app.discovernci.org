import React from 'react';
import request from 'superagent';
import { Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel, Button, InputGroup } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import TshirtOrderForm from './TshirtOrderForm';

export default class MyComponent extends React.Component {
  state = {
    name: '',
    email: '',
    phone: '',

    success: false,
    submitDisabled: false,
    paymentComplete: false,
    paymentError: null,
    stripeLoadingError: false,
    stripeLoading: true,

    cardNumber: '',
    cardExpMonth: '',
    cardExpYear: '',
    cardCvc: '',
    token: null,

    tshirtOrder: [
      { id: 1, color: 'warmgrey', size: 'sm', locked: true }
    ],
    total: 15
  }

  componentWillMount() {
    /* global Stripe */
    // Stripe.setPublishableKey('pk_live_I0aXq1wrhAdM6vxFA55zsOiZ');
    // Stripe.setPublishableKey('pk_test_2iONQfKDphIIa8M9W1hkisQq');
  }

  calcTotal = () => {
    let total = 0;
    if (this.state.tshirtOrder.length > 0) {
      total += (15 * parseInt(this.state.tshirtOrder.length, 10));
    }
    this.setState({ total });
  }

  handleShowTshirtFormset = () => {
    this.setState({ showTshirtFormset: true });
    if (this.state.tshirtOrder.length === 0) {
      this.handleAddTshirt();
    }
  }
  handleHideTshirtFormset = () => {
    this.setState({ showTshirtFormset: false });
  }
  handleAddTshirt = () => {
    const randId = Math.floor(Math.random() * (99999999 - 9999)) + 9999;
    this.setState(
      state => ({
        tshirtOrder: state.tshirtOrder.concat(
          { id: randId, color: 'warmgrey', size: 'sm' }
        )
      }), this.calcTotal
    );
  }
  handleTshirtRemove = (id) => {
    this.setState({
      tshirtOrder: this.state.tshirtOrder.filter(item => item.id !== id)
    }, () => {
      this.calcTotal();
      if (this.state.tshirtOrder.length === 0) {
        this.handleHideTshirtFormset();
      }
    });
  }
  handleTshirtSize = (id, size) => {
    // Slice out the object from the rest of state
    const orders = this.state.tshirtOrder.slice();
    // Get the index of the tshirt item object in question
    const index = orders.findIndex(x => x.id === id);
    // Use es7+ transform-object-rest-spread to and append size (shorthanded)
    orders[index] = { ...orders[index], size };
    // Push it back into state
    this.setState({ tshirtOrder: orders });
  }
  handleTshirtColor = (id, color) => {
    const orders = this.state.tshirtOrder.slice();
    const index = orders.findIndex(x => x.id === id);
    orders[index] = { ...orders[index], color };
    this.setState({ tshirtOrder: orders });
  }

  handleInputName = (e) => {
    this.setState({ name: e.target.value });
  }
  handleInputEmail = (e) => {
    this.setState({ email: e.target.value });
  }
  handleInputPhone = (e) => {
    this.setState({ phone: e.target.value });
  }

  handleCardNumber = (e) => {
    this.setState({ cardNumber: e.target.value });
  }
  handleCardExpMonth = (e) => {
    this.setState({ cardExpMonth: e.target.value });
  }
  handleCardExpYear = (e) => {
    this.setState({ cardExpYear: e.target.value });
  }
  handleCardCvc = (e) => {
    this.setState({ cardCvc: e.target.value });
  }

  /**
   * The first step is submitting is posting payment details to stripe. Only
   * unpon successful payment will we then move on to posting to our own server.
   */
  handlePaymentSubmit = (e) => {
    e.preventDefault();
    const payload = {
      number: this.state.cardNumber,
      cvc: this.state.cardCvc,
      exp_month: this.state.cardExpMonth,
      exp_year: this.state.cardExpYear,
      name: this.state.name
    };
    this.setState({ submitDisabled: true, paymentError: null });
    // Stripe.createToken(payload, (status, response) => {
    //   if (response.error) {
    //     this.setState({ paymentError: response.error.message, submitDisabled: false });
    //   } else {
    //     this.setState({ paymentComplete: true, submitDisabled: false, token: response.id });
    //     this.handleSubmit();
    //   }
    // });
  }

  handleSubmit = () => {
    const self = this;
    this.setState({ submitDisabled: true });
    request
      .post('/post/tshirt-order/')
      .send({
        total: this.state.total,
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        stripe_token: this.state.token,
        tshirt_order: this.state.tshirtOrder
      })
      .end((err, res) => {
        if (err || !res.ok) {
          self.setState({
            error: err
          });
        } else {
          self.setState({
            success: true,
            response: res,
            name: '',
            email: '',
            phone: '',
            tshirtOrder: []
          });
        }
      });
  }


  render() {
    return (

      <Grid className="grid-container">
        <h1 className="center top-35">Nature&apos;s Classroom 20th Aniversary Tshirt</h1>
        <div className="row-wrapper">

          <Row>
            <Col md={6} mdOffset={3}>

              {this.state.success
                ? <div className="center">
                  <FontAwesome name="check-circle-o" style={{ fontSize: '7em', color: '#62c656' }} />
                  <h3>Payment Successful.</h3>
                  <p style={{ marginBottom: 20, fontFamily: 'Helvetica, sans-serif' }}>A receipt was emailed to you.</p>
                </div>
                : <Form onSubmit={this.handlePaymentSubmit}>

                    <hr style={{ marginTop: 5 }} />
                    <div>

                      <img
                        src="//nciw.s3.amazonaws.com/discovernci_media/ditw-darkblue-preview.png"
                        style={{ marginBottom: 30, width: '100%' }}
                        alt="Tshirt examples"
                      />

                      <ul style={{ fontSize: '1em', marginBottom: 20 }}>
                        <li>$15, all sizes</li>
                        <li>Limited availability. Purchase by <strong>5/12</strong></li>
                        <li>Designed by a proud parent (Thanks Tim Guild!)</li>
                      </ul>

                      <TshirtOrderForm
                        items={this.state.tshirtOrder}
                        handleRemove={this.handleTshirtRemove}
                        handleSize={this.handleTshirtSize}
                        handleColor={this.handleTshirtColor}
                      />

                      <div style={{ marginTop: 15 }}>
                        <a onClick={this.handleAddTshirt}>
                          <FontAwesome name="plus" fixedWidth /> Add another tshirt
                        </a>
                      </div>

                    </div>


                  <hr style={{ marginTop: 30, marginBottom: 30 }} />

                  <FormGroup controlId="name">
                    <ControlLabel>Your Full Name</ControlLabel>
                    <FormControl
                      type="text"
                      placeholder="First and Last Name..."
                      onChange={this.handleInputName}
                      value={this.state.name}
                      style={{ width: 300 }}
                    />
                    <FormControl.Feedback />
                  </FormGroup>

                  <FormGroup controlId="email">
                    <ControlLabel>Email Address</ControlLabel>
                    <FormControl
                      type="text"
                      placeholder="me@example.com"
                      onChange={this.handleInputEmail}
                      value={this.state.email}
                      style={{ width: 300 }}
                    />
                    <FormControl.Feedback />
                  </FormGroup>

                  <FormGroup controlId="phone">
                    <ControlLabel>Phone Number</ControlLabel>
                    <FormControl
                      type="text"
                      placeholder="(555) 555-5555"
                      onChange={this.handleInputPhone}
                      value={this.state.phone}
                      style={{ width: 170 }}
                    />
                    <FormControl.Feedback />
                  </FormGroup>

                  <div className="panel panel-default credit-card-box top-40 bottom-40">

                    <div className="panel-heading display-table">
                      <Row>
                        <span className="panel-title display-td" style={{ marginLeft: 15, fontSize: '1.1em' }}>Payment Details</span>
                        <img
                          src="//nciw.s3.amazonaws.com/discovernci_media/cards-accepted.jpg"
                          style={{
                            width: 125,
                            marginRight: 15,
                            position: 'relative',
                            top: 4
                          }}
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
                                onChange={this.handleCardNumber}
                                value={this.state.cardNumber}
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
                                onChange={this.handleCardExpMonth}
                                value={this.state.cardExpMonth}
                                style={{ width: 70 }}
                              />
                              <FormControl
                                type="text"
                                placeholder="YY"
                                data-stripe="exp-year"
                                onChange={this.handleCardExpYear}
                                value={this.state.cardExpYear}
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
                              onChange={this.handleCardCvc}
                              value={this.state.cardCvc}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>

                  </div>

                  <Row style={{ marginTop: 20, marginBottom: 5 }}>
                    <Col xs={12} className="center">

                      {this.state.error &&
                        <p style={{ fontFamily: 'lato, sans-serif', color: '#da2e2e' }}>{this.state.error}</p>
                      }

                      {this.state.paymentError &&
                        <p style={{ fontFamily: 'lato, sans-serif', color: '#da2e2e' }}>{this.state.paymentError}</p>
                      }

                      <Button
                        bsStyle="success"
                        bsSize="large"
                        onClick={this.handlePaymentSubmit}
                        disabled={this.state.submitDisabled}
                        block
                      >
                        Purchase (${this.state.total})
                      </Button>
                      <div
                        style={{
                          marginTop: 10,
                          color: '#858585',
                          fontSize: '0.9em'
                        }}
                      >
                        <FontAwesome name="lock" />{' '}
                        Secure payments powered by Stripe.com
                      </div>
                    </Col>
                  </Row>

                </Form>
              }

            </Col>
          </Row>
        </div>
      </Grid>
    );
  }
}

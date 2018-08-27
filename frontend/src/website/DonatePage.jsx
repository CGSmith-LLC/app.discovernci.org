import React from 'react';
// import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import request from 'superagent';
import Helmet from 'react-helmet';
import {
  Grid, Row, Col, FormGroup, FormControl, ControlLabel, InputGroup, Button, Panel, Form
} from 'react-bootstrap';

export default class DonatePage extends React.Component {
  state = {
    amount: 0,
    recurring: 0,

    name: '',
    email: '',
    phone: '',

    success: false,
    submitDisabled: false,
    paymentComplete: false,
    paymentError: null,
    stripeLoadingError: false,
    stripeLoading: true,
    error: null,

    cardNumber: null,
    cardExpMonth: null,
    cardExpYear: null,
    cardCvc: null,
    token: null
  };

  componentWillMount() {
    //* global Stripe */
    // Stripe.setPublishableKey('pk_live_I0aXq1wrhAdM6vxFA55zsOiZ');
    // Stripe.setPublishableKey('pk_test_2iONQfKDphIIa8M9W1hkisQq');
  }

  handleInputAmount = (e) => {
    this.setState({ amount: parseInt(e.target.value, 10) });
  }
  handleSelectRecurring = (e) => {
    this.setState({ recurring: e.target.value });
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
    this.setState({ cardNumber: parseInt(e.target.value, 10) });
  }
  handleCardExpMonth = (e) => {
    this.setState({ cardExpMonth: parseInt(e.target.value, 10) });
  }
  handleCardExpYear = (e) => {
    this.setState({ cardExpYear: parseInt(e.target.value, 10) });
  }
  handleCardCvc = (e) => {
    this.setState({ cardCvc: parseInt(e.target.value, 10) });
  }

  /**
   * The first step is submitting is posting payment details to stripe. Only
   * unpon successful payment will we then move on to posting to our own server.
   */
  handlePaymentSubmit = (e) => {
    e.preventDefault();
    // const payload = {
    //   number: this.state.cardNumber,
    //   cvc: this.state.cardCvc,
    //   exp_month: this.state.cardExpMonth,
    //   exp_year: this.state.cardExpYear,
    //   name: this.state.name
    // };
    this.setState({
      submitDisabled: true,
      paymentError: null
    });
    // Stripe.createToken(payload, (status, response) => {
    //   if (response.error) {
    //     this.setState({
    //       paymentError: response.error.message,
    //       submitDisabled: false
    //     });
    //   } else {
    //     this.setState({
    //       paymentComplete: true,
    //       submitDisabled: false,
    //       token: response.id
    //     });
    //     this.handleSubmit();
    //   }
    // });
  }

  handleSubmit = () => {
    const self = this;
    request
      .post('/post/donate/')
      .send({
        amount: this.state.total,
        recurring: this.state.recurring,
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        stripe_token: this.state.token
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
            amount: '',
            recurring: 'NONE',
            name: '',
            email: '',
            phone: '',
            cardNumber: '',
            cardExpMonth: '',
            cardExpYear: '',
            cardCvc: ''
          });
        }
      });
  }

  render() {
    return (
      <Grid className="grid-container">

        <Helmet title="Donate to Nature&apos;s Classroom Institute and Montessori School" />

        <Row className="top-30">
          <Col xs={8} md={6} mdOffset={1}>

            <h1 style={{ marginTop: 10, marginBottom: 5, fontSize: '2.4em', fontFamily: 'bitter' }}>Make a Donation</h1>
            <p style={{ fontSize: '1.4em', marginBottom: 20 }}>Your support directly impacts our mission in teaching independence, mastery of self and the environment.</p>


            {this.state.success
              ? <div className="center">
                <FontAwesome name="check-circle-o" style={{ fontSize: '7em', color: '#62c656' }} />
                <h3>Your donation went through successfully. Thank you for your support!</h3>
                <p style={{ marginBottom: 20, fontFamily: 'Helvetica, sans-serif' }}>A receipt was emailed to you.</p>
                <Button onClick={this.props.closeModal}>Finish</Button>
              </div>
              : <Form onSubmit={this.handlePaymentSubmit} style={{ marginBottom: 40 }}>

                {this.state.error &&
                  <p style={{ fontFamily: 'lato, sans-serif', color: '#da2e2e' }}>{this.state.error}</p>
                }

                {this.state.paymentError &&
                  <p style={{ fontFamily: 'lato, sans-serif', color: '#da2e2e' }}>{this.state.paymentError}</p>
                }

                <FormGroup>
                  <ControlLabel onClick={() => console.log(this.state)}>
                    Dollar Amount (in USD)
                  </ControlLabel>
                  <InputGroup style={{ width: 149 }}>
                    <InputGroup.Addon>
                      <FontAwesome name="usd" style={{ color: '#848484' }} />
                    </InputGroup.Addon>
                    <FormControl
                      type="number"
                      placeholder="10"
                      onChange={this.handleInputAmount}
                      value={this.state.amount}
                    />
                  </InputGroup>
                  <FormControl.Feedback />
                </FormGroup>

                {this.state.amount > 0 &&
                  <span>

                    {/* <FormGroup controlId="recurringInterval">
                      <ControlLabel>Recurring donation options</ControlLabel>
                      <FormControl
                        componentClass="select"
                        onChange={this.handleSelectRecurring}
                        value={this.state.recurringInterval}
                        style={{ width: 170, marginBottom: 30 }}
                      >
                        <option value="NONE">Select...</option>
                        <option value="ONCE">One-time</option>
                        <option value="MONT">Monthly</option>
                        <option value="QTLY">Quarterly</option>
                        <option value="YEAR">Yearly</option>
                      </FormControl>
                      <FormControl.Feedback />
                    </FormGroup> */}

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

                    <div className="panel panel-default credit-card-box top-40 bottom-30" style={{ width: 420 }}>

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


                  </span>
                }

                <Button
                  bsStyle="success"
                  onClick={this.handlePaymentSubmit}
                  disabled={this.state.submitDisabled}
                >
                  Place Donation (${this.state.amount})
                </Button>

                <hr />

                <h3>Volunteering</h3>
                <p>Perhaps the best way to participate in your child’s experience
                  here is to volunteer. In this way, you’ll get to know other
                  families and students and increase your familiarity with the
                  teachers and classroom, together enhancing the experience for
                  the entire student body and our overall community.</p>

                <hr />

                <h3>In-kind Donations</h3>
                <p>Our children have family members with wonderful hobbies,
                  talents and occupational skills. We encourage parents and
                  extended family members to donate time and items that can help
                  enhance classrooms. These include services or goods gifted to
                  the school. Over the past few years, donations have ranged from
                  kitchen and craft supplies, to carpentry and computer services.
                  The fair market value of such items is tax-deductible. The real
                  market value is priceless.</p>

              </Form>
            }

          </Col>
          <Col md={4}>

            <img
              src="//nciw.s3.amazonaws.com/discovernci_media/skyviewRibbonCutting.jpg"
              alt="presentation"
              className="img-responsive img-rounded"
              style={{ marginTop: 20, marginBottom: 25 }}
            />

            <Panel header="Annual Report 2016-2017" style={{ textAlign: 'center' }}>
              <a href="//nciw.s3.amazonaws.com/discovernci_media/Natures%20Classroom%202017-2018%20Annual%20Report.pdf" className="btn btn-primary" target="_blank" rel="noopener noreferrer">View our 2017-2019 Annual Report (PDF)</a><br/>
              <a href="//nciw.s3.amazonaws.com/discovernci_media/2016-2017%20Annual%20Report%20-%20Final_Spreads.pdf" className="btn btn-primary" target="_blank" rel="noopener noreferrer">View our 2016-2017 Annual Report (PDF)</a>
            </Panel>


          </Col>

        </Row>

      </Grid>
    );
  }
}

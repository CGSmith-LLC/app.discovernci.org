import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';
import request from 'superagent';
import Helmet from 'react-helmet';
import {Elements, StripeProvider} from 'react-stripe-elements';
import {
    Grid, Row, Col, FormGroup, FormControl, ControlLabel, InputGroup, Button, Panel, Form
} from 'react-bootstrap';
import CheckoutForm from "./forms/CheckoutForm";

export default class DonatePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
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

    }


    handleSubmit = (e) => {
        e.preventDefault();
    }


    render() {
        return (
            <Grid className="grid-container">

                <Helmet title="Donate to Nature&apos;s Classroom Institute and Montessori School"/>

                <Row>
                </Row>
                <Row className="top-30">
                    <Col xs={8} md={6} mdOffset={1}>

                        <h1 style={{marginTop: 10, marginBottom: 5, fontSize: '2.4em', fontFamily: 'bitter'}}>Make a
                            Donation</h1>
                        <p style={{fontSize: '1.4em', marginBottom: 20}}>Your support directly impacts our mission in
                            teaching independence, mastery of self and the environment.</p>


                        {this.state.success
                            ? <div className="center">
                                <FontAwesome name="check-circle-o" style={{fontSize: '7em', color: '#62c656'}}/>
                                <h3>Your donation went through successfully. Thank you for your support!</h3>
                                <p style={{marginBottom: 20, fontFamily: 'Helvetica, sans-serif'}}>A receipt was emailed
                                    to you.</p>
                                <Button onClick={this.props.closeModal}>Finish</Button>
                            </div>
                            : <Form onSubmit={this.handleSubmit} style={{marginBottom: 40}}>

                                {this.state.error &&
                                <p style={{fontFamily: 'lato, sans-serif', color: '#da2e2e'}}>{this.state.error}</p>
                                }

                                {this.state.paymentError &&
                                <p style={{
                                    fontFamily: 'lato, sans-serif',
                                    color: '#da2e2e'
                                }}>{this.state.paymentError}</p>
                                }

                                <FormGroup>
                                    <ControlLabel>Dollar Amount (in USD)</ControlLabel>
                                    <InputGroup style={{width: 149}}>
                                        <InputGroup.Addon>
                                            <FontAwesome name="usd" style={{color: '#848484'}}/>
                                        </InputGroup.Addon>
                                        <FormControl
                                            type="number"
                                            placeholder="10"
                                            onChange={this.handleInputChange}
                                            value={this.state.amount}
                                        />
                                    </InputGroup>
                                    <FormControl.Feedback/>

                                    <StripeProvider apiKey="pk_test_2iONQfKDphIIa8M9W1hkisQq">
                                        <div className="example">
                                            <Elements>
                                                <CheckoutForm/>
                                            </Elements>
                                        </div>
                                    </StripeProvider>
                                </FormGroup>

                                {this.state.amount > 0 &&
                                <span>

                    <FormGroup controlId="name">
                      <ControlLabel>Your Full Name</ControlLabel>
                      <FormControl
                          type="text"
                          placeholder="First and Last Name..."
                          onChange={this.handleInputChange}
                          value={this.state.name}
                          style={{width: 300}}
                      />
                      <FormControl.Feedback/>
                    </FormGroup>

                    <FormGroup controlId="email">
                      <ControlLabel>Email Address</ControlLabel>
                      <FormControl
                          type="text"
                          placeholder="me@example.com"
                          onChange={this.handleInputChange}
                          value={this.state.email}
                          style={{width: 300}}
                      />
                      <FormControl.Feedback/>
                    </FormGroup>

                    <FormGroup controlId="phone">
                      <ControlLabel>Phone Number</ControlLabel>
                      <FormControl
                          type="text"
                          placeholder="(555) 555-5555"
                          onChange={this.handleInputChange}
                          value={this.state.phone}
                          style={{width: 170}}
                      />
                      <FormControl.Feedback/>
                    </FormGroup>

                    <div className="panel panel-default credit-card-box top-40 bottom-30" style={{width: 420}}>

                      <div className="panel-heading display-table">
                        <Row>
                          <span className="panel-title display-td" style={{marginLeft: 15, fontSize: '1.1em'}}>Payment Details</span>
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

                      <div className="panel-body" style={{paddingBottom: 0}}>
                        <Row>
                          <Col xs={12}>
                            <FormGroup>
                              <InputGroup>
                                <InputGroup.Addon><FontAwesome name="credit-card"/></InputGroup.Addon>
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
                                <ControlLabel style={{display: 'block'}}>Exp. Date</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="MM"
                                    data-stripe="exp-month"
                                    onChange={this.handleCardExpMonth}
                                    value={this.state.cardExpMonth}
                                    style={{width: 70}}
                                />
                                <FormControl
                                    type="text"
                                    placeholder="YY"
                                    data-stripe="exp-year"
                                    onChange={this.handleCardExpYear}
                                    value={this.state.cardExpYear}
                                    style={{width: 70}}
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
                                    onClick={this.submit}
                                    disabled={this.state.submitDisabled}
                                >
                                    Place Donation (${this.state.amount})
                                </Button>

                                <hr/>

                                <h3>Volunteering</h3>
                                <p>Perhaps the best way to participate in your child’s experience
                                    here is to volunteer. In this way, you’ll get to know other
                                    families and students and increase your familiarity with the
                                    teachers and classroom, together enhancing the experience for
                                    the entire student body and our overall community.</p>

                                <hr/>

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
                            style={{marginTop: 20, marginBottom: 25}}
                        />

                        <Panel header="Annual Report 2016-2017" style={{textAlign: 'center'}}>
                            <a href="//nciw.s3.amazonaws.com/discovernci_media/Natures%20Classroom%202017-2018%20Annual%20Report.pdf"
                               className="btn btn-primary" target="_blank" rel="noopener noreferrer">View our 2017-2018
                                Annual Report (PDF)</a><br/><br/>
                            <a href="//nciw.s3.amazonaws.com/discovernci_media/2016-2017%20Annual%20Report%20-%20Final_Spreads.pdf"
                               className="btn btn-primary" target="_blank" rel="noopener noreferrer">View our 2016-2017
                                Annual Report (PDF)</a>
                        </Panel>


                    </Col>

                </Row>

            </Grid>
        );
    }
}
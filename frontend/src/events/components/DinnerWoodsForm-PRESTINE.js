import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import request from 'superagent';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Row, Col, FormGroup, FormControl, ControlLabel, HelpBlock, InputGroup, Button, Checkbox, Form } from 'react-bootstrap';

import { genRandId } from '../../utils';
import ChildcareChildForm from './ChildcareChildForm';

class DinnerWoodsForm extends React.Component {

  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    purchaseDitwTickets: PropTypes.func.isRequired
  }

  state = {
    total: 45,

    eventTicketQty: 1,
    drinkTicketPrice: 0,
    wantsCabana: false,

    wantsVegetarian: false,
    vegetarianCount: 0,

    isParentGuardian: false,
    wantsChildcare: false,
    childcareChildren: [
      { id: 1, name: '', age: '', locked: true }
    ],

    dietaryRestrictions: [],
    guestList: [
      { id: 1, name: '', age: '', locked: true }
    ],

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
    token: null
  }

  componentWillMount() {
    /* global Stripe */
    // Stripe.setPublishableKey('pk_live_I0aXq1wrhAdM6vxFA55zsOiZ');
    Stripe.setPublishableKey('pk_test_2iONQfKDphIIa8M9W1hkisQq');
  }

  calcTotal = () => {
    let total = 0;
    const ticketQty = parseInt(this.state.eventTicketQty, 10);

    total = ticketQty;

    // Cabana costs...
    if (this.state.wantsCabana) {
      total += 200;
    }
    // Addon Childcare total ($20 per child)
    if (this.state.isParentGuardian
        && this.state.wantsChildcare
        && this.state.childcareChildren.length > 0) {
      total += (20 * parseInt(this.state.childcareChildren.length, 10));
    }

    this.setState({ total });
  }

  // Update state everytime we touch a form input
  handleSelectTicket = (e) => {
    this.setState({ eventTicketQty: e.target.value }, this.calcTotal);
  }

  handleCheckVegetarian = (e) => {
    this.setState({ wantsVegetarian: e.target.checked });
  }
  handleSelectVegCount = (e) => {
    this.setState({ vegetarianCount: e.target.value });
  }

  handleCheckCabana = (e) => {
    this.setState({ wantsCabana: e.target.checked }, this.calcTotal);
  }
  handleCheckParentGuardian = (e) => {
    this.setState({ isParentGuardian: e.target.checked }, this.calcTotal);
  }
  handleCheckChildcare = (e) => {
    this.setState({ wantsChildcare: e.target.checked }, this.calcTotal);
  }

  // handleShowTshirtFormset = () => {
  //   this.setState({ showTshirtFormset: true });
  //   if (this.state.tshirtOrder.length === 0) {
  //     this.handleAddTshirt();
  //   }
  // }
  // handleHideTshirtFormset = () => {
  //   this.setState({ showTshirtFormset: false });
  // }
  // handleAddTshirt = () => {
  //   this.setState(
  //     state => ({
  //       tshirtOrder: state.tshirtOrder.concat(
  //         { id: genRandId(), color: 'warmgrey', size: 'sm' }
  //       )
  //     }), this.calcTotal
  //   );
  // }
  // handleTshirtRemove = (id) => {
  //   this.setState({
  //     tshirtOrder: this.state.tshirtOrder.filter(item => item.id !== id)
  //   }, () => {
  //     this.calcTotal();
  //     if (this.state.tshirtOrder.length === 0) {
  //       this.handleHideTshirtFormset();
  //     }
  //   });
  // }
  // handleTshirtSize = (id, size) => {
  //   // Slice out the object from the rest of state
  //   const orders = this.state.tshirtOrder.slice();
  //   // Get the index of the tshirt item object in question
  //   const index = orders.findIndex(x => x.id === id);
  //   // Use es7+ transform-object-rest-spread to and append size (shorthanded)
  //   orders[index] = { ...orders[index], size };
  //   // Push it back into state
  //   this.setState({ tshirtOrder: orders });
  // }
  // handleTshirtColor = (id, color) => {
  //   const orders = this.state.tshirtOrder.slice();
  //   const index = orders.findIndex(x => x.id === id);
  //   orders[index] = { ...orders[index], color };
  //   this.setState({ tshirtOrder: orders });
  // }

  /**
   * Childcare Child Signup
   */
  handleChildAdd = () => {
    this.setState(
      state => ({
        childcareChildren: state.childcareChildren.concat(
          { id: genRandId(), name: '', age: 0 }
        )
      }), this.calcTotal
    );
  }
  handleChildRemove = (id) => {
    this.setState({
      childcareChildren: this.state.childcareChildren.filter(item => item.id !== id)
    }, () => {
      this.calcTotal();
    });
  }
  handleChildName = (id, name) => {
    const items = this.state.childcareChildren.slice();
    const index = items.findIndex(x => x.id === id);
    items[index] = { ...items[index], name };
    this.setState({ childcareChildren: items });
  }
  handleChildAge = (id, age) => {
    const items = this.state.childcareChildren.slice();
    const index = items.findIndex(x => x.id === id);
    items[index] = { ...items[index], age };
    this.setState({ childcareChildren: items });
  }

  /**
   * Contact details
   */
  handleInputName = (e) => {
    this.setState({ name: e.target.value });
  }
  handleInputEmail = (e) => {
    this.setState({ email: e.target.value });
  }
  handleInputPhone = (e) => {
    this.setState({ phone: e.target.value });
  }

  /**
   * Credit card details
   */
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
    Stripe.createToken(payload, (status, response) => {
      if (response.error) {
        this.setState({ paymentError: response.error.message, submitDisabled: false });
      } else {
        this.setState({ paymentComplete: true, submitDisabled: false, token: response.id });
        // this.handleSubmit();
        console.log('Stripe.createToken', response);
      }
    });
  }

  handlePurchaseDitWTickets = () => {
    const i = this;
    this.props.purchaseDitwTickets({
      variables: {
        rsvpToken: 'indevtest-32423q54tgreg'
      }
    })
      .then(({ data }) => {
        console.log('AddStudent data back from server @@@@@@@@@@', data);
        this.props.closeModal();
      }).catch((error) => {
        const err = String(error).replace('Error: GraphQL error:', '')
        i.setState({ err: `Error purchasing tickets. Try again. ${err}` });
      });
  }

  handleSubmit = () => {
    const self = this;
    this.setState({ submitDisabled: true });
    request
      .post('/post/dinw2017/')
      .send({
        total: this.state.total,
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        ticket_qty: parseInt(this.state.eventTicketQty, 10),
        drink_price: parseInt(this.state.drinkTicketPrice, 10),
        has_cabana: this.state.wantsCabana,
        has_childcare: this.state.wantsChildcare,
        childcare_children: this.state.childcareChildren,
        has_veg: this.state.wantsVegetarian,
        veg_count: this.state.vegetarianCount,
        stripe_token: this.state.token
        // tshirt_order: this.state.tshirtOrder
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
            eventTicketQty: 1,
            drinkTicketPrice: 0,
            wantsCabana: false,
            wantsChildcare: false,
            isParentGuardian: false,
            wantsVegetarian: false,
            vegetarianCount: 0,
            // tshirtOrder: [],
            childcareChildren: []
          });
        }
      });
  }


  render() {
    return (
      <Row>
        <Col md={10} mdOffset={1}>

          {this.state.success
            ? <div className="center">
              <FontAwesome name="check-circle-o" style={{ fontSize: '7em', color: '#62c656' }} />
              <h3>Payment Successful. We&apos;ll see you there!</h3>
              <p style={{ marginBottom: 20, fontFamily: 'Helvetica, sans-serif' }}>A receipt was emailed to you.</p>
              <Button bsStyle="success" bsSize="large" onClick={this.props.closeModal} block>Finish</Button>
            </div>
            : <Form onSubmit={this.handlePaymentSubmit}>

              <FormGroup controlId="eventTicketQty">
                <ControlLabel>How Many Tickets? 🎟</ControlLabel>
                <FormControl
                  componentClass="select"
                  onChange={this.handleSelectTicket}
                  value={this.state.eventTicketQty}
                >
                  <option value={45}>1 Ticket ($45)</option>
                  <option value={90}>2 Tickets ($90)</option>
                  <option value={145}>3 Tickets ($145)</option>
                  <option value={200}>4 Tickets ($200)</option>
                  <option value={225}>5 Tickets ($255)</option>
                  <option value={310}>6 Tickets ($310)</option>
                  <option value={365}>7 Tickets ($365)</option>
                  <option value={420}>8 Tickets ($420) - Reserved table, w/2 bottles of wine.</option>
                </FormControl>
                <FormControl.Feedback />
              </FormGroup>

              <FormGroup controlId="wantsVegGroup">
                <Checkbox
                  onChange={this.handleCheckVegetarian}
                  checked={this.state.wantsVegetarian}
                >
                  <span style={{ userSelect: 'none' }}>I would like vegetarian options</span>
                </Checkbox>
              </FormGroup>

              {this.state.wantsVegetarian &&
                <div style={{ marginLeft: 20, marginTop: 0 }}>
                  <FormGroup controlId="vegetarianCount">
                    <ControlLabel>For how many in your party?</ControlLabel>
                    <FormControl
                      componentClass="select"
                      onChange={this.handleSelectVegCount}
                      value={this.state.vegetarianCount}
                      style={{ width: 70 }}
                    >
                      {Array((parseInt(this.state.eventTicketQty, 10) === 7)
                          ? parseInt((this.state.eventTicketQty), 10) + 1
                          : parseInt((this.state.eventTicketQty), 10)
                        )
                        .fill().map((_, i) => (
                          <option key={i} value={i + 1}>{i + 1}</option>
                        )
                      )}
                    </FormControl>
                    <FormControl.Feedback />
                  </FormGroup>
                </div>
              }

              <FormGroup controlId="wantsCabana">
                <Checkbox onChange={this.handleCheckCabana} checked={this.state.wantsCabana}>
                  <span style={{ userSelect: 'none' }}>I would like to reserve a cabana ($200).</span>
                </Checkbox>
              </FormGroup>

              <FormGroup controlId="isParentGuardian">
                <Checkbox
                  onChange={this.handleCheckParentGuardian}
                  checked={this.state.isParentGuardian}
                >
                  <span style={{ userSelect: 'none' }}>I&apos;m a Parent/Guardian of a currently enrolled NCI student.</span>
                </Checkbox>
              </FormGroup>

              {this.state.isParentGuardian &&
                <FormGroup controlId="wantsChildcare" style={{ marginBottom: 0 }}>
                  <Checkbox
                    onChange={this.handleCheckChildcare}
                    checked={this.state.wantsChildcare}
                  >
                    <span style={{ userSelect: 'none' }}>Signup for on-site childcare services ($20/each)</span>
                    <HelpBlock>From 5:30-9pm, NCM students ALL ages and their siblings.</HelpBlock>
                  </Checkbox>

                  {this.state.wantsChildcare &&
                    <ChildcareChildForm
                      items={this.state.childcareChildren}
                      handleAdd={this.handleChildAdd}
                      handleRemove={this.handleChildRemove}
                      handleName={this.handleChildName}
                      handleAge={this.handleChildAge}
                    />
                  }

                </FormGroup>
              }

              <hr style={{ marginTop: 5 }} />
              {
                // this.state.showTshirtFormset
                // ? <div>

                //   <ControlLabel style={{ marginBottom: 10 }}>Limited-edition 20th anniversary tshirt ($15/each)</ControlLabel>

                //   <TshirtOrderForm
                //     items={this.state.tshirtOrder}
                //     handleRemove={this.handleTshirtRemove}
                //     handleSize={this.handleTshirtSize}
                //     handleColor={this.handleTshirtColor}
                //   />

                //   <div style={{ marginTop: 15 }}>
                //     <a onClick={this.handleAddTshirt}>
                //       <FontAwesome name="plus" fixedWidth /> Add another tshirt
                //     </a>
                //   </div>

                // </div>
                // : <a onClick={this.handleShowTshirtFormset}>
                //   <FontAwesome name="plus" fixedWidth /> Add limited-edition 20th anniversary tshirt ($15/each)
                // </a>
              }

              {/* <hr style={{ marginTop: 20 }} /> */}

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

              <div className="panel panel-default credit-card-box top-30 bottom-30">

                <div className="panel-heading display-table">
                  <Row>
                    <span className="panel-title display-td" style={{ marginLeft: 15, fontSize: '1.1em' }}>Payment Details</span>
                    <img
                      src="//nciw.s3.amazonaws.com/discovernci_media/cards-accepted.jpg"
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
                    Purchase Tickets (${this.state.total})
                  </Button>

                  <button onClick={() => this.handlePurchaseDitWTickets()}>
                    Trigger ticket purchase (in-development)
                  </button>

                  <div style={{ marginTop: 10, color: '#858585', fontSize: '0.9em' }}>
                    <FontAwesome name="lock" />{' '}
                    Secure payments powered by Stripe.com
                  </div>

                </Col>
              </Row>

            </Form>
          }

        </Col>
      </Row>
    );
  }
}

const PURCHASE_DITW_TICKETS = gql`
  mutation PurchaseDitwTickets($rsvpToken: String!) {
    purchaseDitwTickets(rsvpToken: $rsvpToken) {
      success
    }
  }`;

export default graphql(PURCHASE_DITW_TICKETS, { name: 'purchaseDitwTickets' })(DinnerWoodsForm);

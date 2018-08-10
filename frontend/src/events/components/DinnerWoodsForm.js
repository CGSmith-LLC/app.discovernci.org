import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Alert, Button, Row, Col, InputGroup, FormControl, FormGroup, Radio, ControlLabel, Checkbox } from 'react-bootstrap';

import { genRandId, validateEmail } from '../../utils';
import { CreditCardForm } from '../../common';
// import ChildcareChildForm from './ChildcareChildForm';
import DitwPurchaseReviewTable from './DitwPurchaseReviewTable';
import GuestForm from './GuestForm';

// These prices end March 31st,
// April 1st to May 1st,The table package goes up to regular price ($360)
const ticketPricesNciFamilies = [
  { id: 1, price: 45, label: '1 Ticket' },
  { id: 2, price: 90, label: '2 Tickets' },
  { id: 3, price: 135, label: '3 Tickets' },
  { id: 4, price: 180, label: '4 Tickets' },
  { id: 5, price: 225, label: '5 Tickets' },
  { id: 6, price: 270, label: '6 Tickets' },
  { id: 7, price: 315, label: '7 Tickets' },
  { id: 8, price: 360, label: '8 Tickets - Reserved table, w/2 bottles of wine' }
];

// These prices are good from March 15th to April 30
const ticketPricesEarlyBird = [
  { id: 1, price: 55, label: '1 Ticket' },
  { id: 2, price: 110, label: '2 Tickets' },
  { id: 3, price: 165, label: '3 Tickets' },
  { id: 4, price: 220, label: '4 Tickets' },
  { id: 5, price: 275, label: '5 Tickets' },
  { id: 6, price: 330, label: '6 Tickets' },
  { id: 7, price: 385, label: '7 Tickets' },
  { id: 8, price: 440, label: '8 Tickets - Reserved table, w/2 bottles of wine' }
];

// Starting May 1st
// const ticketPrices = [
//   { id: 1, price: 75, label: '1 Ticket' },
//   { id: 2, price: 150, label: '2 Tickets' },
//   { id: 3, price: 225, label: '3 Tickets' },
//   { id: 4, price: 300, label: '4 Tickets' },
//   { id: 5, price: 375, label: '5 Tickets' },
//   { id: 6, price: 450, label: '6 Tickets' },
//   { id: 7, price: 525, label: '7 Tickets' },
//   { id: 8, price: 600, label: '8 Tickets - Reserved table, w/2 bottles of wine.' }
// ];

class DinnerWoodsForm extends React.Component {

  static propTypes = {
    closeModal: PropTypes.func.isRequired
  }

  state = {
    // Customer Details
    name: '',
    nameError: false,
    email: '',
    emailError: false,
    phone: '',
    phoneError: false,
    newsletterSubscribe: true,

    // Ticketing & Preferences
    ticketQty: 1,
    wantsCabana: 'no',
    wantsValetParking: 'no',
    additionalValetCount: 0,
    ticketEnhancer: '',

    // Purchasers Guest List
    deferGuestList: false,
    guestList: [],

    // Food Restrictions & Preferences
    hasVegetarianRestriction: false,
    vegetarianCount: 0,
    hasVeganRestriction: false,
    veganCount: 0,
    hasDairyRestriction: false,
    dairyCount: 0,
    hasGlutenRestriction: false,
    glutenCount: 0,
    hasFoodAllergies: 'no',
    foodAllergenNotes: '',
    foodAllergenNotesError: false,

    // Childcare Options
    isParentGuardian: 'no',
    wantsChildcare: 'no',
    childcareChildrenError: false,
    childcareChildren: [
      { id: 1, name: '', age: '', locked: true }
    ],

    // Form Controls
    step: 1,
    submitDisabled: false,
    checkoutComplete: false,
    paymentError: '',
    stripeToken: '',

    // Payment Details
    paymentMethod: 'credit',
    retainPaymentInfo: 'no',
    totalPrice: 55,
    additionalDonation: 0,
    cardNumber: '',
    cardExpMonth: '',
    cardExpYear: '',
    cardCvc: ''
  }

  componentWillMount() {
    /* global Stripe */
    if (process.env.NODE_ENV === 'production') {
      Stripe.setPublishableKey('pk_live_I0aXq1wrhAdM6vxFA55zsOiZ');
    } else {
      Stripe.setPublishableKey('pk_test_2iONQfKDphIIa8M9W1hkisQq');
    }
  }

  /**
   * The Calculator
   */
  calcTotal = () => {
    let totalPrice = 0;

    const selectedTicketPricing = this.state.isParentGuardian === 'yes'
      ? ticketPricesNciFamilies
      : ticketPricesEarlyBird;

    // The `id` represents the quantity of tickets as well...
    const ticketPackagePrice = _.find(selectedTicketPricing, { id: this.state.ticketQty }).price;
    totalPrice += ticketPackagePrice;

    // Ticket enhancers,
    if (parseInt(this.state.ticketEnhancer, 10) > 0) {
      totalPrice += (this.state.ticketEnhancer * 20);
    }

    // Cabana costs...
    if (this.state.wantsCabana === 'yes') {
      totalPrice += 250;
    }
    // Addon Childcare total ($25 per child)
    if (this.state.isParentGuardian === 'yes'
        && this.state.wantsChildcare === 'yes'
        && this.state.childcareChildren.length > 0) {
      totalPrice += (25 * parseInt(this.state.childcareChildren.length, 10));
    }

    // Addon Valet Parking ($5 per vehicle)
    if (this.state.wantsValetParking === 'yes') {
      if (this.state.ticketQty === 1) {
        totalPrice += 5;
      } else if (this.state.ticketQty > 1) {
        totalPrice += (5 + (5 * parseInt(this.state.additionalValetCount, 10)));
      }
    }

    // Additional contribution
    if (this.state.additionalDonation > 0) {
      totalPrice += parseInt(this.state.additionalDonation, 10);
    }

    this.setState({ totalPrice });
  }

  calcTotalThenCreateGuestList = () => {
    this.calcTotal();
    // console.log('state.guestList.length ', this.state.guestList.length)
    this.setState(
      state => ({
        guestList: state.guestList.concat(
          _((state.ticketQty - 1)).times((n) => {
            const x = n + 1;
            return ({ id: x, name: '', email: '' });
          })
        )
      })
    );
  }

  /**
   * First step in submitting payment is to submit the actual payment details to
   * Stripe. Upon successful payment, Stripe returns a customer token which we
   * then pass off to our own backend to finish the process (See: handleSubmit)
   */
  handleCreateStripeToken = () => {
    // e.preventDefault();
    const payload = {
      number: this.state.cardNumber,
      cvc: this.state.cardCvc,
      exp_month: this.state.cardExpMonth,
      exp_year: this.state.cardExpYear,
      name: this.state.name
    };
    this.setState({
      submitDisabled: true,
      paymentError: ''
    });
    /* global Stripe */
    Stripe.createToken(payload, (status, response) => {
      if (response.error) {
        this.setState({
          paymentError: response.error.message,
          submitDisabled: false
        });
      } else {
        // console.log('Stripe.createToken ----------- ', response);
        this.setState({
          checkoutComplete: true,
          stripeToken: response.id
        }, this.handleSubmit(response.id));  // With Stripe Token in-hand, we proceed to full submission.
      }
    });
  }

  handleSubmit = (stripeTokenId = '') => {
    const i = this;
    const fullName = this.state.name.split(' ');
    const lastName = fullName[fullName.length - 1];

    this.setState({ submitDisabled: true });

    this.props.mutate({
      variables: {
        rsvpToken: `${String(lastName).toLowerCase()}-${genRandId()}`,
        name: i.state.name,
        email: i.state.email,
        phone: i.state.phone,
        newsletterSubscribe: i.state.newsletterSubscribe,
        ticketQty: i.state.ticketQty,
        wantsCabana: i.state.wantsCabana,
        wantsValetParking: i.state.wantsValetParking,
        additionalValetCount: i.state.additionalValetCount,
        deferGuestList: i.state.deferGuestList,
        guestList: i.state.guestList,
        hasVegetarianRestriction: i.state.hasVegetarianRestriction,
        vegetarianCount: i.state.vegetarianCount,
        hasVeganRestriction: i.state.hasVeganRestriction,
        veganCount: i.state.veganCount,
        hasDairyRestriction: i.state.hasDairyRestriction,
        dairyCount: i.state.dairyCount,
        hasGlutenRestriction: i.state.hasGlutenRestriction,
        glutenCount: i.state.glutenCount,
        hasFoodAllergies: i.state.hasFoodAllergies,
        foodAllergenNotes: i.state.foodAllergenNotes,
        isParentGuardian: i.state.isParentGuardian,
        wantsChildcare: i.state.wantsChildcare,
        childcareChildren: i.state.childcareChildren,
        stripeToken: stripeTokenId,
        paymentMethod: i.state.paymentMethod,
        retainPaymentInfo: i.state.retainPaymentInfo,
        totalPrice: i.state.totalPrice,
        additionalDonation: i.state.additionalDonation
      }
    })
      .then(({ data }) => {
        i.setState({
          step: 11,
          checkoutComplete: true,
          submitDisabled: false
        });
        // console.log('purchaseDitwTickets success!!!!!!!!! @@@@@@@@@@ ', data);
        // console.log(i.state);
      }).catch((error) => {
        const err = String(error).replace('Error: GraphQL error:', '');
        i.setState({ err: `Error purchasing tickets. Try again. ${err}` });
      });
  }

  prevFormStep = () => {
    let x = this.state.step;
    if (x === 4 && this.state.isParentGuardian === 'no') {
      this.setState({ step: x -= 2 }, this.calcTotal);
    } else if (x === 6 && this.state.ticketQty === 1) {
      this.setState({ step: x -= 2 }, this.calcTotal);
    } else if (x === 10 && this.state.paymentError !== '') {
      this.setState({ step: x -= 1, paymentError: '' }, this.calcTotal);
    } else {
      this.setState({ step: x -= 1 }, this.calcTotal);
    }
  }

  nextFormStep = () => {
    let x = this.state.step;
    // Skip over childcare if user is not NCI enrolled
    if (x === 2 && this.state.isParentGuardian === 'no') {
      this.setState({ step: x += 2 }, this.calcTotal);
    } else if (x === 3) {  // Childcare Options *******************************
      this.setState({ childcareChildrenError: false });
      // Do not proceed if any of children's names or ages are blank
      if (this.state.wantsChildcare === 'yes') {
        _.some(this.state.childcareChildren, child => (child.name === '' || child.age === ''))
          ? this.setState({ childcareChildrenError: true })
          : this.setState({ step: x += 1 }, this.calcTotal);
      } else {
        // Nothing to add to price, advance to next step
        this.setState({ step: x += 1 });
      }
    } else if (x === 4) {  // Personal Details ********************************
      this.setState({ nameError: false, emailError: false, phoneError: false });
      if (this.state.name === '' || !validateEmail(this.state.email) || this.state.phone === '') {
        if (this.state.name === '') { this.setState({ nameError: true }); }
        if (!validateEmail(this.state.email)) { this.setState({ emailError: true }); }
        if (this.state.phone === '') { this.setState({ phoneError: true }); }
      } else {
        // Single-ticket holders skip over the next step (Guest List)
        (this.state.ticketQty === 1)
          ? this.setState({ step: x += 2 }, this.calcTotal)
          : this.setState({ step: x += 1 }, this.calcTotal);
      }
    } else if (x === 6) {  // Dietary Restrictions ****************************
      this.setState({ foodAllergenNotesError: false });
      if (this.state.hasFoodAllergies === 'yes' && this.state.foodAllergenNotes === '') {
        this.setState({ foodAllergenNotesError: true });
      } else {
        this.setState({ step: x += 1 });
      }
    } else if (x === 10 && this.state.paymentMethod === 'credit') {
      this.handleCreateStripeToken();
    } else if (x === 10 && (this.state.paymentMethod === 'check' || this.state.paymentMethod === 'onsite')) {
      this.handleSubmit();
    } else {
      this.setState({ step: x += 1 }, this.calcTotal);
    }
  }

  handleIsGuardian = (e) => {
    this.setState({ isParentGuardian: e.target.value });
  }

  handleSelectTicketQty = (e) => {
    this.setState({
      ticketQty: parseInt(e.target.value, 10)
    }, this.calcTotalThenCreateGuestList)
  }

  handleSelectTicketEnhancer = (e) => {
    this.setState({
      ticketEnhancer: parseInt(e.target.value, 10)
    }, this.calcTotal);
  }

  handleCabana = (e) => {
    this.setState({ wantsCabana: e.target.value }, this.calcTotal);
  }

  handleChildcare = (e) => {
    this.setState({ wantsChildcare: e.target.value }, this.calcTotal);
  }

  handleCheckDeferGuestList = (e) => {
    this.setState({ deferGuestList: e.target.checked });
  }

  /**
   * Childcare Child Signup
   */
  handleChildAdd = () => {
    this.setState(
      state => ({
        childcareChildrenError: false,
        childcareChildren: state.childcareChildren.concat(
          { id: genRandId(), name: '', age: '' }
        )
      }), this.calcTotal
    );
  }
  handleChildRemove = (id) => {
    this.setState({
      childcareChildrenError: false,
      childcareChildren: this.state.childcareChildren.filter(item => item.id !== id)
    }, () => {
      this.calcTotal();
    });
  }
  handleChildName = (id, name) => {
    const items = this.state.childcareChildren.slice();
    const index = items.findIndex(x => x.id === id);
    items[index] = { ...items[index], name };
    this.setState({ childcareChildrenError: false, childcareChildren: items });
  }
  handleChildAge = (id, age) => {
    const items = this.state.childcareChildren.slice();
    const index = items.findIndex(x => x.id === id);
    items[index] = { ...items[index], age };
    this.setState({ childcareChildrenError: false, childcareChildren: items });
  }

  /**
   * Contact details
   */
  handleInputName = (e) => {
    this.setState({ name: e.target.value, nameError: false });
  }
  handleInputEmail = (e) => {
    this.setState({ email: e.target.value, emailError: false });
  }
  handleInputPhone = (e) => {
    this.setState({ phone: e.target.value, phoneError: false });
  }
  handleCheckNewsletterSubscribe = (e) => {
    this.setState({ newsletterSubscribe: e.target.checked });
  }

  /**
   * Guest List
   */
  handleGuestName = (id, name) => {
    const items = this.state.guestList.slice();
    const index = items.findIndex(x => x.id === id);
    items[index] = { ...items[index], name };
    this.setState({ guestList: items });
  }
  handleGuestEmail = (id, email) => {
    const items = this.state.guestList.slice();
    const index = items.findIndex(x => x.id === id);
    items[index] = { ...items[index], email };
    this.setState({ guestList: items });
  }


  /**
   * Dietary Restrictions
   */
  handleCheckVegetarianRestriction = (e) => {
    this.setState({ hasVegetarianRestriction: e.target.checked });
  }
  handleCheckVeganRestriction = (e) => {
    this.setState({ hasVeganRestriction: e.target.checked });
  }
  handleCheckDairyRestriction = (e) => {
    this.setState({ hasDairyRestriction: e.target.checked });
  }
  handleCheckGlutenRestriction = (e) => {
    this.setState({ hasGlutenRestriction: e.target.checked });
  }
  handleHasFoodAllergies = (e) => {
    this.setState({ hasFoodAllergies: e.target.value });
  }
  // Dietary Restriction Select counters
  handleVegetarianCount = (e) => {
    this.setState({ vegetarianCount: parseInt(e.target.value, 10) });
  }
  handleVeganCount = (e) => {
    this.setState({ veganCount: parseInt(e.target.value, 10) });
  }
  handleDairyCount = (e) => {
    this.setState({ dairyCount: parseInt(e.target.value, 10) });
  }
  handleGlutenCount = (e) => {
    this.setState({ glutenCount: parseInt(e.target.value, 10) });
  }
  handleFoodAllergenNotes = (e) => {
    this.setState({ foodAllergenNotes: e.target.value, foodAllergenNotesError: false });
  }


  handleWantsValetParking = (e) => {
    this.setState({ wantsValetParking: e.target.value }, this.calcTotal);
  }
  handleSelectValetCount = (e) => {
    this.setState({ additionalValetCount: e.target.value }, this.calcTotal);
  }


  /**
   * Payment Details
   */
  handleAdditionalDonation = (e) => {
    this.setState({ additionalDonation: e.target.value }, this.calcTotal);
  }
  handlePaymentMethod = (e) => {
    this.setState({ paymentMethod: e.target.value });
  }
  handleRetainPaymentInfo = (e) => {
    this.setState({ retainPaymentInfo: e.target.value });
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

  render() {
    const selectedTicketPricing = this.state.isParentGuardian === 'yes'
      ? ticketPricesNciFamilies
      : ticketPricesEarlyBird;
    return (
      <div className="dinner-woods-form">
        <form>

          {/* Parent/Guardian */}
          {this.state.step === 1 &&
            <div className="form-step">
              <h3 style={{ marginTop: 0 }}>NCI Parents / Guardians</h3>
              Are you a parent or guardian of a student attending Nature's Classroom Institute Montessori School (current or alumni)?
              <FormGroup style={{ marginTop: 15 }}>
                <Radio onChange={this.handleIsGuardian} value="yes" name="isParentGuardian" inline checked={this.state.isParentGuardian === 'yes'}>
                  Yes
                </Radio>{' '}
                <Radio onChange={this.handleIsGuardian} value="no" name="isParentGuardian" inline checked={this.state.isParentGuardian === 'no'}>
                  No
                </Radio>
              </FormGroup>

              <div className="step-footer">
                <Button className="btn-form-step-next" onClick={this.nextFormStep} bsStyle="success">Next</Button>
                {this.state.step >= 2 &&
                  <div className="mute pull-right">Total: ${this.state.totalPrice}</div>
                }
              </div>
            </div>
          }

          {/* Ticketing */}
          {this.state.step === 2 &&
            <div className="form-step">
              <h3 style={{ marginTop: 0 }}>Ticketing</h3>
              <FormGroup controlId="eventTicketQty">
                  How many tickets would you like to purchase?
                <FormControl
                  componentClass="select"
                  onChange={this.handleSelectTicketQty}
                  value={this.state.ticketQty}
                  style={{ marginTop: 15 }}
                >
                  {_.map(selectedTicketPricing, ticketOpt => (
                    <option key={ticketOpt.id} value={ticketOpt.id}>
                      {ticketOpt.label} (${ticketOpt.price})
                    </option>
                  ))}
                </FormControl>
                <FormControl.Feedback />
              </FormGroup>

              <FormGroup controlId="ticketEnhancer" style={{ marginTop: 20, marginBottom: 20 }}>
                  Enhance your Evening <span role="img" aria-label="Party Popper">🎉</span><br />
                  <span style={{ color: '#918e8e', fontSize: '0.9em' }}>Would you like to purchase tickets for raffles, drinks, egg pull and wine pull? Tickets are available in packs of 10. Purchase 50 tickets and receive 5 more, free!</span>
                <FormControl
                  componentClass="select"
                  onChange={this.handleSelectTicketEnhancer}
                  value={this.state.ticketEnhancer}
                  style={{ marginTop: 15 }}
                >
                  <option selected disabled value="">How many packs of 10 tickets would you like?</option>
                  {_(10).times(
                    function (n) {
                      const x = n + 1;
                      return (<option key={x} value={x}>{x} Pack of 10 tickets {x * 20 === 200 && ' +5 more, free!'} for ${x * 20}</option>);
                    }
                  )}
                  <option value={0}>None</option>
                </FormControl>
                <FormControl.Feedback />
              </FormGroup>


              Would you like to reserve a private Cabana for an additional $250?

              <FormGroup style={{ marginTop: 10 }}>
                <Radio onChange={this.handleCabana} value="yes" name="wantsCabana" checked={this.state.wantsCabana === 'yes'} inline>
                  Yes
                </Radio>{' '}
                <Radio onChange={this.handleCabana} value="no" name="wantsCabana" checked={this.state.wantsCabana === 'no'} inline>
                  No
                </Radio>{' '}
              </FormGroup>
              <div className="step-footer">
                <Button className="btn-form-step-prev" onClick={this.prevFormStep}>Back</Button>
                <Button className="btn-form-step-next" onClick={this.nextFormStep} bsStyle="success">Next</Button>
                <div className="mute pull-right">Total: ${this.state.totalPrice}</div>
              </div>
            </div>
          }

          {/* Childcare */}
          {this.state.step === 3 && this.state.isParentGuardian &&
            <div className="form-step">
              <h3 style={{ marginTop: 0 }}>On-site Childcare</h3>

              Childcare services will be offered for current and alumni NCI families. Drop-off will begin at 5pm and pick-up ends at 11pm. This service is available to ages 3+ and siblings.

              <FormGroup controlId="wantsChildcare" style={{ marginTop: 10, marginBottom: 0 }}>

                <ControlLabel>
                  Would you like to sign up for on-site childcare during the event? Cost is $25 per child and will be payable at the event. Pizza dinner and dessert will be served.
                </ControlLabel>
                <FormGroup>
                  <Radio onChange={this.handleChildcare} value="yes" name="wantsChildcare" checked={this.state.wantsChildcare === 'yes'} inline>
                    Yes
                  </Radio>{' '}
                  <Radio onChange={this.handleChildcare} value="no" name="wantsChildcare" checked={this.state.wantsChildcare === 'no'} inline>
                    No
                  </Radio>{' '}
                </FormGroup>

                {this.state.wantsChildcare === 'yes' &&
                  {/* <ChildcareChildForm
                    items={this.state.childcareChildren}
                    handleAdd={this.handleChildAdd}
                    handleRemove={this.handleChildRemove}
                    handleName={this.handleChildName}
                    handleAge={this.handleChildAge}
                    childcareChildrenError={this.state.childcareChildrenError}
                  /> */}
                }
              </FormGroup>
              <div className="step-footer">
                <Button className="btn-form-step-prev" onClick={this.prevFormStep}>Back</Button>
                <Button className="btn-form-step-next" onClick={this.nextFormStep} bsStyle="success">Next</Button>
                <div className="mute pull-right">Total: ${this.state.totalPrice}</div>
              </div>
            </div>
          }

          {/* Personal Contact Info */}
          {this.state.step === 4 &&
            <div className="form-step">

              <h3 style={{ marginTop: 0 }}>Tell us about yourself</h3>

              {(this.state.emailError || this.state.nameError || this.state.phoneError) &&
                <Alert bsStyle="danger">
                  Please ensure all fields are filled in.
                </Alert>
              }

              <div style={{ width: 400 }}>
                <FormGroup controlId="name" validationState={this.state.nameError ? 'error' : null}>
                  <ControlLabel>Your Full Name</ControlLabel>
                  <FormControl
                    type="text"
                    placeholder="First and Last Name..."
                    onChange={this.handleInputName}
                    value={this.state.name}
                  />
                  <FormControl.Feedback />
                </FormGroup>
              </div>

              <div style={{ width: 400 }}>
                <FormGroup controlId="email" validationState={this.state.emailError ? 'error' : null}>
                  <ControlLabel>Email Address</ControlLabel>
                  <FormControl
                    type="text"
                    placeholder="me@example.com"
                    onChange={this.handleInputEmail}
                    value={this.state.email}
                    style={{ width: 400 }}
                  />
                  <FormControl.Feedback />
                </FormGroup>
              </div>

              <div style={{ width: 290 }}>
                <FormGroup controlId="phone" validationState={this.state.phoneError ? 'error' : null}>
                  <ControlLabel>Phone Number</ControlLabel>
                  <FormControl
                    type="text"
                    placeholder="(555) 555-5555"
                    onChange={this.handleInputPhone}
                    value={this.state.phone}
                    style={{ width: 290 }}
                  />
                  <FormControl.Feedback />
                </FormGroup>
              </div>

              <Checkbox
                onChange={this.handleCheckNewsletterSubscribe}
                checked={this.state.newsletterSubscribe}
              >
                I would like to be added to the Nature’s Classroom Institute email distribution list for notifications regarding upcoming events, community activity and school news.
              </Checkbox>

              <div className="step-footer">
                <Button className="btn-form-step-prev" onClick={this.prevFormStep}>Back</Button>
                <Button className="btn-form-step-next" onClick={this.nextFormStep} bsStyle="success">Next</Button>
                <div className="mute pull-right">Total: ${this.state.totalPrice}</div>
              </div>
            </div>
          }

          {/* Guest List */}
          {this.state.step === 5 &&
            <div className="form-step">
              <h3 style={{ marginTop: 0, marginBottom: 10 }}>Your Guest List</h3>

              You have <strong>{this.state.ticketQty - 1}</strong> guests. If you have their names and emails handy, fill them in below so we know who to expect and so we can also send out any important announcements.<br /><br />

              <Checkbox onChange={this.handleCheckDeferGuestList} checked={this.state.deferGuestList}>
                I would like to provide this information closer to the event date.
              </Checkbox>

              {!this.state.deferGuestList &&
                <GuestForm
                  items={this.state.guestList}
                  handleName={this.handleGuestName}
                  handleEmail={this.handleGuestEmail}
                  ticketQty={this.state.ticketQty}
                />
              }

              <div className="step-footer">
                <Button className="btn-form-step-prev" onClick={this.prevFormStep}>Back</Button>
                <Button className="btn-form-step-next" onClick={this.nextFormStep} bsStyle="success">Next</Button>
                <div className="mute pull-right">Total: ${this.state.totalPrice}</div>
              </div>
            </div>
          }

          {/* Dietary Restrictions */}
          {this.state.step === 6 &&
            <div className="form-step">
              <h3 style={{ marginTop: 0, marginBottom: 10 }}>Dietary Restrictions</h3>

              {this.state.hasFoodAllergies === 'yes' && this.state.foodAllergenNotesError &&
                <Alert bsStyle="danger">
                  Please make sure to tell us any details around your allergy so we can ensure a safe environment.
                </Alert>
              }

              Select all that apply but only if you are certain of the information.

              <Row style={{ marginTop: 15 }}>
                <Col md={3}>
                  <Checkbox onChange={this.handleCheckVegetarianRestriction} checked={this.state.hasVegetarianRestriction}>Vegetarian</Checkbox>
                </Col>
                {this.state.ticketQty > 1 && this.state.hasVegetarianRestriction &&
                  <Col md={6}>
                    <FormGroup controlId="vegetarianRestriction">
                      <FormControl
                        componentClass="select"
                        onChange={this.handleVegetarianCount}
                        value={this.state.vegetarianCount}
                      >
                        <option selected disabled value={0}>How many in your group?</option>
                        {_(this.state.ticketQty).times(
                          function (n) {
                            const x = n + 1;
                            return (<option key={x} value={x}>{x}</option>);
                          }
                        )}
                      </FormControl>
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                }
              </Row>

              <Row>
                <Col md={3}>
                  <Checkbox onChange={this.handleCheckVeganRestriction} checked={this.state.hasVeganRestriction}>Vegan</Checkbox>
                </Col>
                {this.state.ticketQty > 1 && this.state.hasVeganRestriction &&
                  <Col md={6}>
                    <FormGroup controlId="veganRestriction">
                      <FormControl
                        componentClass="select"
                        onChange={this.handleVeganCount}
                        value={this.state.veganCount}
                      >
                        <option selected disabled value={0}>How many in your group?</option>
                        {_(this.state.ticketQty).times(
                          function (n) {
                            const x = n + 1;
                            return (<option key={x} value={x}>{x}</option>);
                          }
                        )}
                      </FormControl>
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                }
              </Row>

              <Row>
                <Col md={3}>
                  <Checkbox onChange={this.handleCheckDairyRestriction} checked={this.state.hasDairyRestriction}>Dairy</Checkbox>
                </Col>
                {this.state.ticketQty > 1 && this.state.hasDairyRestriction &&
                  <Col md={6}>
                    <FormGroup controlId="dairyRestriction">
                      <FormControl
                        componentClass="select"
                        onChange={this.handleDairyCount}
                        value={this.state.dairyCount}
                      >
                        <option selected disabled value={0}>How many in your group?</option>
                        {_(this.state.ticketQty).times(
                          function (n) {
                            const x = n + 1;
                            return (<option key={x} value={x}>{x}</option>);
                          }
                        )}
                      </FormControl>
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                }
              </Row>

              <Row style={{ marginBottom: 20 }}>
                <Col md={3}>
                  <Checkbox onChange={this.handleCheckGlutenRestriction} checked={this.state.hasGlutenRestriction}>Gluten</Checkbox>
                </Col>
                {this.state.ticketQty > 1 && this.state.hasGlutenRestriction &&
                  <Col md={6}>
                    <FormGroup controlId="glutenRestriction">
                      <FormControl
                        componentClass="select"
                        onChange={this.handleGlutenCount}
                        value={this.state.glutenCount}
                      >
                        <option selected disabled value={0}>How many in your group?</option>
                        {_(this.state.ticketQty).times(
                          function (n) {
                            const x = n + 1;
                            return (<option key={x} value={x}>{x}</option>);
                          }
                        )}
                      </FormControl>
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                }
              </Row>

              Do you {this.state.ticketQty > 1 && 'or any members of your party'} have any food allergies? If yes, please tell us any details you’d like us to know.

              <FormGroup style={{ marginTop: 10 }}>
                <Radio onChange={this.handleHasFoodAllergies} value="yes" name="hasFoodAllergies" checked={this.state.hasFoodAllergies === 'yes'} inline>
                  Yes
                </Radio>{' '}
                <Radio onChange={this.handleHasFoodAllergies} value="no" name="hasFoodAllergies" checked={this.state.hasFoodAllergies === 'no'} inline>
                  No
                </Radio>{' '}
              </FormGroup>

              {this.state.hasFoodAllergies === 'yes' &&
                <FormGroup controlId="foodAllergenNotes" validationState={this.state.foodAllergenNotesError ? 'error' : null}>
                  <FormControl
                    componentClass="textarea"
                    value={this.state.foodAllergenNotes}
                    onChange={this.handleFoodAllergenNotes}
                  />
                </FormGroup>
              }

              <div className="step-footer">
                <Button className="btn-form-step-prev" onClick={this.prevFormStep}>Back</Button>
                <Button className="btn-form-step-next" onClick={this.nextFormStep} bsStyle="success">Next</Button>
                <div className="mute pull-right">Total: ${this.state.totalPrice}</div>
              </div>
            </div>
          }

          {/* Valet Parking */}
          {this.state.step === 7 &&
            <div className="form-step">
              <h3 style={{ marginTop: 0, marginBottom: 10 }}>Valet Parking</h3>
              Do you {this.state.ticketQty > 1 && 'or members of your party'} anticipate utilizing valet parking services? {this.state.ticketQty > 1 && 'This will be an additional $5 per vehicle, payable at the event.'}

              <FormGroup style={{ marginTop: 10 }}>
                <Radio onChange={this.handleWantsValetParking} name="wantsValetParking" value="yes" checked={this.state.wantsValetParking === 'yes'} inline>
                  Yes
                </Radio>{' '}
                <Radio onChange={this.handleWantsValetParking} name="wantsValetParking" value="no" checked={this.state.wantsValetParking === 'no'} inline>
                  No
                </Radio>{' '}
              </FormGroup>

              {this.state.ticketQty > 1 && this.state.wantsValetParking === 'yes' &&
                <span>
                  How many additional vehicles besides your own?
                  <Row style={{ marginTop: 10 }}>
                    <Col md={3} sm={3}>
                      <FormGroup controlId="valetParking">
                        <FormControl
                          componentClass="select"
                          onChange={this.handleSelectValetCount}
                          value={this.state.additionalValetCount}
                        >
                          {_(this.state.ticketQty).times(
                            n => <option key={n} value={n}>{n}</option>
                          )}
                        </FormControl>
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                  </Row>
                </span>
              }
              <div className="step-footer">
                <Button className="btn-form-step-prev" onClick={this.prevFormStep}>Back</Button>
                <Button className="btn-form-step-next" onClick={this.nextFormStep} bsStyle="success">Next</Button>
                <div className="mute pull-right">Total: ${this.state.totalPrice}</div>
              </div>
            </div>
          }

          {/* Additional Contributions */}
          {this.state.step === 8 &&
            <div className="form-step">
              <h3 style={{ marginTop: 0, marginBottom: 10 }}>Additional Contributions</h3>
              Would you like to make an additional contribution to Nature’s Classroom Institute? Your support directly impacts our mission teaching independence, master of self, and the environment.

              <FormGroup style={{ marginTop: 15 }}>
                <ControlLabel onClick={() => console.log(this.state)}>
                  Dollar Amount
                </ControlLabel>
                <InputGroup style={{ width: 149 }}>
                  <InputGroup.Addon>
                    <FontAwesome name="usd" style={{ color: '#848484' }} />
                  </InputGroup.Addon>
                  <FormControl
                    type="number"
                    placeholder="10"
                    onChange={this.handleAdditionalDonation}
                    value={this.state.additionalDonation}
                  />
                </InputGroup>
                <FormControl.Feedback />
              </FormGroup>
              <div className="step-footer">
                <Button className="btn-form-step-prev" onClick={this.prevFormStep}>Back</Button>
                <Button className="btn-form-step-next" onClick={this.nextFormStep} bsStyle="success">Next</Button>
                <div className="mute pull-right">Total: ${this.state.totalPrice}</div>
              </div>
            </div>
          }

          {/* Payment Details */}
          {this.state.step === 9 &&
            <div className="form-step">
              <h3 style={{ marginTop: 0, marginBottom: 10 }}>Payment Details</h3>

              How would you like to pay?

              <FormGroup>
                <Radio onChange={this.handlePaymentMethod} name="paymentMethod" value="credit" checked={this.state.paymentMethod === 'credit'}>
                  I’ll pay now with a debit/credit card
                </Radio>{' '}
                <Radio onChange={this.handlePaymentMethod} name="paymentMethod" value="check" checked={this.state.paymentMethod === 'check'}>
                  I’ll send a check directly to NCI.
                </Radio>{' '}
                <Radio onChange={this.handlePaymentMethod} name="paymentMethod" value="onsite" checked={this.state.paymentMethod === 'onsite'}>
                  I’ll pay when I arrive at the event
                </Radio>{' '}
              </FormGroup>

              {this.state.paymentMethod === 'check' &&
                <span>
                  Please send check to the below address postmarked by <strong>May 18, 2018</strong>
                  <pre>
                    Nature's Classroom Institute<br />
                    PO Box 660<br />
                    Mukwonago WI 53149
                  </pre>
                </span>
              }

              {this.state.paymentMethod === 'credit' &&
                <span style={{ display: 'block', maxWidth: 430 }}>
                  <CreditCardForm
                    handleCardNumber={this.handleCardNumber}
                    handleCardExpMonth={this.handleCardExpMonth}
                    handleCardExpYear={this.handleCardExpYear}
                    handleCardCvc={this.handleCardCvc}
                    cardNumber={this.state.cardNumber}
                    cardExpMonth={this.state.cardExpMonth}
                    cardExpYear={this.state.cardExpYear}
                    cardCvc={this.state.cardCvc}
                  />

                  If participating in the Live or Silent auctions, would you like to use this payment method for them?
                  <FormGroup style={{ marginTop: 10 }}>
                    <Radio onChange={this.handleRetainPaymentInfo} value="yes" name="retainPaymentInfo" checked={this.state.retainPaymentInfo === 'yes' } inline>
                      Yes
                    </Radio>{' '}
                    <Radio onChange={this.handleRetainPaymentInfo} value="no" name="retainPaymentInfo" checked={this.state.retainPaymentInfo === 'no' } inline>
                      No
                    </Radio>{' '}
                  </FormGroup>

                </span>
              }
              <div className="step-footer">
                <Button className="btn-form-step-prev" onClick={this.prevFormStep}>Back</Button>
                <Button className="btn-form-step-next" onClick={this.nextFormStep} bsStyle="success">Review</Button>
                <div className="mute pull-right">Total: ${this.state.totalPrice}</div>
              </div>
            </div>
          }

          {/* Review */}
          {this.state.step === 10 &&
            <div className="form-step">
              <h3 style={{ marginTop: 0, marginBottom: 10 }}>Review Your Order</h3>

              <DitwPurchaseReviewTable
                order={this.state}
                selectedTicketPricing={selectedTicketPricing}
              />

              {this.state.paymentError !== '' &&
                <Alert bsStyle="danger" style={{ marginTop: 20 }}>
                  {this.state.paymentError} &nbsp; <Button className="btn pull-right" bsSize="sm" bsStyle="danger" onClick={this.prevFormStep} style={{ position: 'relative', top: '-4px' }}><FontAwesome name="exclamation-triangle" fixedWidth /> Fix it</Button>
                </Alert>
              }

              <div className="step-footer">
                <Button className="btn-form-step-prev" onClick={this.prevFormStep}>Back</Button>
                <Button className="btn-form-step-next" onClick={this.nextFormStep} bsStyle="success" disabled={this.state.submitDisabled}>{this.state.submitDisabled ? 'Please wait...' : 'Purchase Tickets'}</Button>
              </div>
            </div>
          }

          {/* Finished */}
          {this.state.step === 11 &&
            <div className="form-step">

              <img src="https://nciw.s3.amazonaws.com/discovernci_media/DITW%20teaser.jpg" alt="" className="img-rounded img-responsive" style={{ marginBottom: 20 }} />

              Thank you, {this.state.name}! We look forward to seeing you on June 2nd for our second annual Dinner In The Woods to celebrate Nature’s Classroom Institute.
              <br /><br />You will be receiving a confirmation email that contains additional information regarding the event.

              <Button onClick={this.props.closeModal} block style={{ marginTop: 20 }}>Close</Button>

            </div>
          }

        </form>
      </div>
    );
  }
}

const PURCHASE_DITW_TICKETS = gql`
  mutation PurchaseDitwTickets(
    $rsvpToken: String!
    $name: String!
    $email: String!
    $phone: String
    $newsletterSubscribe: Boolean
    $ticketQty: Int!
    $wantsCabana: String!
    $wantsValetParking: String!
    $additionalValetCount: Int
    $deferGuestList: Boolean
    $guestList: String
    $hasVegetarianRestriction: Boolean
    $vegetarianCount: Int
    $hasVeganRestriction: Boolean
    $veganCount: Int
    $hasDairyRestriction: Boolean
    $dairyCount: Int
    $hasGlutenRestriction: Boolean
    $glutenCount: Int
    $hasFoodAllergies: String!
    $foodAllergenNotes: String
    $isParentGuardian: String!
    $wantsChildcare: String!
    $childcareChildren: String
    $stripeToken: String!
    $paymentMethod: String!
    $retainPaymentInfo: String!
    $totalPrice: Int
    $additionalDonation: Int
  ) {
    purchaseDitwTickets(
      rsvpToken: $rsvpToken
      name: $name
      email: $email
      phone: $phone
      newsletterSubscribe: $newsletterSubscribe
      ticketQty: $ticketQty
      wantsCabana: $wantsCabana
      wantsValetParking: $wantsValetParking
      additionalValetCount: $additionalValetCount
      deferGuestList: $deferGuestList
      guestList: $guestList
      hasVegetarianRestriction: $hasVegetarianRestriction
      vegetarianCount: $vegetarianCount
      hasVeganRestriction: $hasVeganRestriction
      veganCount: $veganCount
      hasDairyRestriction: $hasDairyRestriction
      dairyCount: $dairyCount
      hasGlutenRestriction: $hasGlutenRestriction
      glutenCount: $glutenCount
      hasFoodAllergies: $hasFoodAllergies
      foodAllergenNotes: $foodAllergenNotes
      isParentGuardian: $isParentGuardian
      wantsChildcare: $wantsChildcare
      childcareChildren: $childcareChildren
      stripeToken: $stripeToken
      paymentMethod: $paymentMethod
      retainPaymentInfo: $retainPaymentInfo
      totalPrice: $totalPrice
      additionalDonation: $additionalDonation
    ) {
      success
    }
  }`;

export default graphql(PURCHASE_DITW_TICKETS)(DinnerWoodsForm);

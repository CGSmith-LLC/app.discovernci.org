import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
// import FontAwesome from 'react-fontawesome';
import { graphql, compose } from 'react-apollo';
import { Alert, Button, Modal, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { Link } from 'react-router';
import moment from 'moment';
// import QrReader from 'react-qr-reader';

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
  { id: 8, price: 300, label: '8 Tickets - Reserved table, w/2 bottles of wine' }
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

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}


class DitWReservationContainer extends React.Component {

  static propTypes = {
    params: PropTypes.shape({
      rsvpToken: PropTypes.string.isRequired
    }).isRequired,
    data: PropTypes.shape({
      ditwCheckin: PropTypes.object
    }).isRequired,
    updateDitwPreferences: PropTypes.func.isRequired
  }

  state = {
    success: false,
    submitDisabled: false,
    guestList: [],
    checkInTableHost: false,

    table: '',
    paddle: '',

    // Charge Card modal
    showApplyPaymentModal: false,
    chargeCardNotes: null,
    chargeCardAmount: null,
    chargeCardMemo: null,

    mockPaymentHistory: [
      { id: 1, memo: 'Ticket Purchase', amount: '$123' },
      { id: 2, memo: 'Ticket Enhancer', amount: '$20' }
    ]
  }

  componentWillMount() {
    document.body.style.background = '#fff';
  }

  componentWillReceiveProps = (nextProps) => {
    // console.log('nextProps coming in...  ', nextProps);
    nextProps.data && nextProps.data.ditwCheckin && nextProps.data.ditwCheckin.guestList &&
    this.setState({
      guestList: JSON.parse(nextProps.data.ditwCheckin.guestList),
      checkInTableHost: nextProps.data.ditwCheckin.checkedIn,
      table: nextProps.data.ditwCheckin.table,
      paddle: nextProps.data.ditwCheckin.paddle,
      receivedManualPayment: nextProps.data.ditwCheckin.receivedManualPayment
    });
  }

  handleShowApplyPaymentModal = () => (
    this.setState({
      showApplyPaymentModal: !this.state.showApplyPaymentModal
    })
  )

  handleTableInput = (e) => {
    this.setState({ table: e.target.value });
  }

  handlePaddleInput = (e) => {
    this.setState({ paddle: e.target.value });
  }

  handleSavePref = () => {
    const i = this;
    this.setState({ submitDisabled: true });

    this.props.updateDitwPreferences({
      variables: {
        rsvpToken: i.props.params.rsvpToken,
        guestList: i.state.guestList,
        hostCheckedIn: i.state.checkInTableHost,
        table: i.state.table,
        paddle: i.state.paddle,
        receivedManualPayment: i.state.receivedManualPayment
      }
    })
      .then(({ data }) => {
        // console.log('------- ', data);
        i.setState({
          success: true,
          submitDisabled: false
        });
      }).catch((error) => {
        const err = String(error).replace('Error: GraphQL error:', '');
        i.setState({ err: `Error purchasing tickets. Try again. ${err}` });
      });
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
  handleGuestCheckIn = (id, checkIn) => {
    const items = this.state.guestList.slice();
    const index = items.findIndex(x => x.id === id);
    items[index] = { ...items[index], checkIn };
    this.setState({ guestList: items });
  }
  handleGuestPaddle = (id, paddleId) => {
    const items = this.state.guestList.slice();
    const index = items.findIndex(x => x.id === id);
    items[index] = { ...items[index], paddleId };
    this.setState({ guestList: items });
  }


  handleHostCheckIn = () => {
    this.setState({
      checkInTableHost: !this.state.checkInTableHost
    });
  }

  handleReceivedManualPayment = () => {
    this.setState({
      receivedManualPayment: !this.state.receivedManualPayment
    });
  }

  /**
   * Bootstrap's Alert dismissal
   */
  handleDismiss = () => {
    this.setState({
      success: false,
      chargeCardSuccess: false
    });
  }

  /**
   * Modal Stuff
   */
  handleCloseModal = () => (
    this.setState({ showApplyPaymentModal: false })
  )

  /**
   * Charge Card Stuff (in Modal)
   */
  handleChargeCardAmount = (e) => {
    this.setState({ chargeCardAmount: e.target.value });
  }
  handleChargeCardMemo = (e) => {
    this.setState({ chargeCardMemo: e.target.value });
  }
  handleChargeCardNotes = (e) => {
    this.setState({ chargeCardNotes: e.target.value });
  }
  handleChargeCard = () => {
    // this.setState({
    //   chargeCardSuccess: true,
    //   showApplyPaymentModal: false,
    //   chargeCardNotes: null,
    //   chargeCardAmount: null,
    //   chargeCardMemo: null
    // });
    this.setState({
      chargeCardSuccess: true,
      showApplyPaymentModal: false,
      chargeCardNotes: null,
      chargeCardAmount: null,
      chargeCardMemo: null
    });
  }

  render() {
    const order = this.props.data.ditwCheckin && this.props.data.ditwCheckin;
    const selectedTicketPricing = order && order.isParentGuardian === 'yes'
      ? ticketPricesNciFamilies
      : ticketPricesEarlyBird;

    let childcareChildren = order && order.childcareChildren;
    if (!_.isNil(childcareChildren)) {
      childcareChildren = JSON.parse(childcareChildren);
    }

    let hasDietaryPreferences = order && false;
    if (!_.isNil(order)) {
      if (order.hasVegetarianRestriction || order.hasVeganRestriction || order.hasDairyRestriction || order.hasGlutenRestriction || order.hasFoodAllergies === 'yes') {
        hasDietaryPreferences = true;
      }
    }

    const stripeCustomer = order && JSON.parse(order.getStripeCustomer);

    const ticketTotal = order && _.find(selectedTicketPricing, { id: order.ticketQty }).price;
    const cabanaTotal = order && (order.wantsCabana === 'yes') ? 250 : 0;
    const childcareTotal = order && order.wantsChildcare === 'yes' ? (25 * parseInt(childcareChildren.length, 10)) : 0;
    const additionalTotal = order && order.additionalDonation;

    let valetTotal = 0;
    if (!_.isNil(order)) {
      if (order.wantsValetParking === 'yes') {
        if (parseInt(order.additionalValetCount, 10) > 0) {
          valetTotal = (1 + order.additionalValetCount) * 5;
        } else {
          valetTotal = 5;
        }
      }
    }

    const totalPrice = order && order.totalPrice;
    const calcTotalPrice = order && (ticketTotal + cabanaTotal + childcareTotal + additionalTotal + valetTotal);

    const missingTicketEnhancerPrice = order && (totalPrice !== calcTotalPrice)
      ? (totalPrice - calcTotalPrice)
      : 0;

    // console.log('------------------------------------');
    // console.log('                ticketTotal:', ticketTotal);
    // console.log('                cabanaTotal:', cabanaTotal);
    // console.log('             childcareTotal:', childcareTotal);
    // console.log('            additionalTotal:', additionalTotal);
    // console.log('                 totalPrice:', totalPrice);
    // console.log('             calcTotalPrice:', calcTotalPrice);
    // console.log('              valet parking:', valetTotal);
    // console.log(`totalPrice - calcTotalPrice: ${missingTicketEnhancerPrice} (${parseInt(missingTicketEnhancerPrice, 10) / 20})`);

    return (
      <div style={{ position: 'relative' }}>

        <div className="right" style={{ position: 'absolute', top: 10, right: 13, padding: '4px 20px' }}>
          <Link to="/events/dinner-in-the-woods/check-in">Done</Link>
        </div>

        <h2 style={{ margin: '10px 0 10px 15px', padding: 0 }}>Reservation</h2>

        {this.state.success &&
          <Alert bsStyle="success" onDismiss={this.handleDismiss} style={{ margin: 15 }}>
            Your preferences have been saved.
          </Alert>
        }

        {this.state.chargeCardSuccess &&
          <Alert bsStyle="success" onDismiss={this.handleDismiss} style={{ margin: 15 }}>
            Payment successfull applied.
          </Alert>
        }

          <div className="details-pane">

            {order &&
              <ul className="generic-list">
                <li>Name <span className="right">{order.name}</span></li>
                <li>Email <span className="right"><a href={`mailto:${order.email}`}>{order.email}</a></span></li>
                <li>Phone <span className="right"><a href={`tel:${order.phone}`}>{order.phone}</a></span></li>
                <li style={{ border: 'none' }}>Check-in <span className="right">{this.state.checkInTableHost ? <Button bsStyle="success" bsSize="sm" onClick={this.handleHostCheckIn}>Check-in</Button> : <Button bsStyle="warning" bsSize="sm" onClick={this.handleHostCheckIn}>Check-in</Button>}</span></li>
              </ul>
            }

            <h4 style={{ marginTop: 15 }}>Ticket & Event Features</h4>

            {order &&
              <ul className="generic-list">
                <li>Tickets <span className="right">{_.find(selectedTicketPricing, { id: order.ticketQty }).label}</span></li>
                <li>Ticket Enhancers (Pre-paid) {(missingTicketEnhancerPrice > 0)
                  ? <span className="right"><strong>${missingTicketEnhancerPrice} ({(parseInt(missingTicketEnhancerPrice, 10) / 20)}</strong>) {(valetTotal > 0) && `+${valetTotal / 5} valet refund`}</span>
                  : <span className="right">0</span>
                }</li>
                <li>Cabana <span className="right">{order.wantsCabana === 'yes' ? 'Yes' : 'No'}</span></li>
                <li style={{ padding: '12px inherit' }}>Table Number <span className="right"><span style={{ float: 'none', fontSize: '0.85em' }}>Table</span> <input type="text" value={this.state.table} onChange={this.handleTableInput} className="form-control" style={{ display: 'inline', margin: 0, padding: '2px 3px', height: 'auto', width: 35 }} /></span></li>
                <li style={{ padding: '12px inherit' }}>Paddle Number <span className="right"><span style={{ float: 'none', fontSize: '0.85em' }}>Paddle</span> <input type="text" value={this.state.paddle} onChange={this.handlePaddleInput} className="form-control" style={{ display: 'inline', margin: 0, padding: '2px 3px', height: 'auto', width: 35 }} /></span></li>
                {order && order.paymentMethod !== 'CREDIT' &&
                  <li>Payment Method <span className="right">{order && order.paymentMethod}</span></li>
                }
                {order && order.paymentMethod !== 'CREDIT' &&
                  <li style={{ background: !this.state.receivedManualPayment && '#fbe5e5' }}>Payment Received <span className="right"><input checked={this.state.receivedManualPayment} onChange={this.handleReceivedManualPayment} type="checkbox"/></span></li>
                }
                <li>Total Charged <span className="right">${order.totalPrice} <i>(on {moment(order.created).format('M/D/YY')})</i></span></li>
                {stripeCustomer &&
                  <li style={{ border: 'none' }}>Card on-file  <span className="right">{stripeCustomer.sources.data[0].brand}  •••• {stripeCustomer.sources.data[0].last4}</span></li>
                }
                {/* <li style={{ paddingLeft: 0, border: 'none' }} >
                  <Button bsStyle="primary" onClick={this.handleShowApplyPaymentModal}><FontAwesome name="shopping-cart" fixedWidth /> Add to Cart</Button>
                  {stripeCustomer && <Button onClick={this.handleShowApplyPaymentModal} style={{ marginLeft: 10 }}><FontAwesome name="credit-card" /> Checkout</Button>}
                </li> */}
              </ul>
            }

            {order && stripeCustomer &&
              <div className="modal-container">
                <Modal show={this.state.showApplyPaymentModal} onHide={this.handleCloseModal}>
                  <Modal.Body>
                    <h3>[TEST MODE] Apply Payment</h3>

                    <FieldGroup
                      id="formControlsText1"
                      type="number"
                      label="Amount"
                      placeholder="50"
                      onChange={this.handleChargeCardAmount}
                      style={{ width: 100 }}
                    />

                    <FormGroup controlId="formControlsSelect">
                      <ControlLabel>Memo</ControlLabel>
                      <FormControl componentClass="select" placeholder="Enhancer Tickets, Donation..." onChange={this.handleChargeCardMemo}>
                        <option value="enhancer">Tickent Enhancers</option>
                        <option value="donation">Auction Items</option>
                        <option value="donation">Additional Donation</option>
                      </FormControl>
                    </FormGroup>

                    <FormGroup controlId="formControlsTextarea">
                      <ControlLabel>Additional Notes</ControlLabel>
                      <FormControl
                        componentClass="textarea"
                        placeholder="Additional notes..."
                        onChange={this.handleChargeCardNotes}
                      />
                    </FormGroup>

                    {this.state.chargeCardAmount > 0 &&
                      <div style={{ padding: '15px 10px', borderLeft: '3px solid #3B7CB3', background: '#d9edff' }}>
                        [TEST MODE]: <strong>${this.state.chargeCardAmount}</strong> will be charged to {order.name}'s {stripeCustomer.sources.data[0].brand} ending in <strong>{stripeCustomer.sources.data[0].last4}</strong>
                      </div>
                    }

                  </Modal.Body>

                  <Modal.Footer>
                    <Button onClick={this.handleCloseModal}>Cancel</Button>
                    <Button bsStyle="primary" onClick={this.handleChargeCard}>Charge {stripeCustomer.sources.data[0].brand}  •••• {stripeCustomer.sources.data[0].last4}</Button>
                  </Modal.Footer>
                </Modal>
              </div>
            }

            {hasDietaryPreferences &&
              <h4 style={{ marginTop: 15 }}>Allergies & Dietary Preferences</h4>
            }

            {hasDietaryPreferences &&
              <ul className="generic-list">
                {order.hasVegetarianRestriction &&
                  <li>Vegetarian <span className="right">{order.vegetarianCount === 0 ? '1' : order.vegetarianCount}</span></li>
                }
                {order.hasVeganRestriction &&
                  <li>Vegan <span className="right">{order.veganCount === 0 ? '1' : order.veganCount}</span></li>
                }
                {order.hasDairyRestriction &&
                  <li>Dairy <span className="right">{order.dairyCount === 0 ? '1' : order.dairyCount}</span></li>
                }
                {order.hasGlutenRestriction &&
                  <li>Gluten <span className="right">{order.glutenCount === 0 ? '1' : order.glutenCount}</span></li>
                }
                {order.hasFoodAllergies === 'yes' &&
                  <li>Food Allergies <span className="right">{order.foodAllergenNotes}</span></li>
                }
              </ul>
            }

            {order && this.state.guestList.length > 0 &&
              <h4 style={{ marginTop: 15 }}>Guest List</h4>
            }

            {order && this.state.guestList.length > 0 &&
              <GuestForm
                items={this.state.guestList}
                handleName={this.handleGuestName}
                handleEmail={this.handleGuestEmail}
                handleCheckIn={this.handleGuestCheckIn}
                handlePaddle={this.handleGuestPaddle}
              />
            }

            {order && order.wantsChildcare === 'yes' &&
              <h4 style={{ marginTop: 15 }}>Childcare</h4>
            }

            {order && order.wantsChildcare === 'yes' &&
              <ul className="generic-list">
                <li>{childcareChildren.length > 1 ? 'Children' : 'Child'} <span className="right">{childcareChildren.length}</span></li>
                {_.map(childcareChildren, child => (
                  <li key={child.id}>&nbsp;<span className="right">{child.name}, {child.age}/yo</span></li>
                ))}
              </ul>
            }

            {/* order && stripeCustomer &&
              <h4 style={{ marginTop: 50 }}>[TEST MODE]: Payment History</h4>
            }
            {order && stripeCustomer &&
              <ul className="generic-list">
                <li><span className="right strong">${order.totalPrice}</span> Ticket Purchase</li>
                <li><span className="right strong">$20</span> Ticket Enhancers <div style={{ fontSize: '0.9em', textAlign: 'left' }}>Paid for 20 but gave them 30</div> </li>
                <li><span className="right strong">$40</span> Ticket Enhancers</li>
              </ul>
            */}


            {/* }<tr style={{ background: '#dddddd' }}>
              <th colSpan={2}>Payment Details</th>
            </tr>
            <tr>
              <td className="right">Payment Method:</td>
              <td>{order.paymentMethod} {order.paymentMethod === 'credit' && `(...${order.cardNumber.slice(-4)})`}</td>
            </tr>
            {order.paymentMethod === 'credit' &&
              <tr>
                <td className="right" style={{ whiteSpace: 'nowrap' }}>Live & Silent Auctions:</td>
                <td>{order.retainPaymentInfo === 'yes' ? 'Use this Credit Card' : 'Don\'t use this Credit Card'}</td>
              </tr>
            }

            <tr>
              <td className="right">Tickets:</td>
              <td>${_.find(selectedTicketPricing, { id: order.ticketQty }).price}</td>
            </tr>

            {order.wantsCabana === 'yes' &&
              <tr>
                <td className="right">Cabana:</td>
                <td>$250</td>
              </tr>
            }
            {order.wantsChildcare === 'yes' &&
              <tr>
                <td className="right">Childcare:</td>
                <td>${20 * parseInt(childcareChildren.length, 10)}</td>
              </tr>
            }
            {order.additionalDonation > 0 &&
              <tr>
                <td className="right" style={{ whiteSpace: 'nowrap' }}>Additional Contributions:</td>
                <td>${order.additionalDonation}</td>
              </tr>
            }
            <tr>
              <td className="right">Total Price:</td>
              <td><strong>${order.totalPrice}.00</strong></td>
            </tr> */}

            <div className="center">
              <Button
                block
                bsSize="lg"
                bsStyle="primary"
                onClick={this.handleSavePref}
                disabled={this.state.submitDisabled}
                style={{ marginTop: 20, marginBottom: 50 }}
              >
                Save Preferences
              </Button>
            </div>
        </div>




      </div>
    );
  }
}

const CHECKIN = gql`
  query DitwCheckin($rsvpToken: String!) {
    ditwCheckin(rsvpToken: $rsvpToken) {
      id
      name
      email
      phone
      ticketQty
      ticketEnhancer
      guestList
      wantsCabana
      created
      wantsChildcare
      hasFoodAllergies
      hasDairyRestriction
      hasVeganRestriction
      hasDairyRestriction
      hasGlutenRestriction
      hasVegetarianRestriction
      foodAllergenNotes
      veganCount
      dairyCount
      glutenCount
      vegetarianCount
      totalPrice
      additionalDonation
      qrcodeUrl
      retainPaymentInfo
      childcareChildren
      isParentGuardian
      modified
      paymentMethod
      stripeCustomerId
      getStripeCustomer
      checkedIn
      table
      paddle
      wantsValetParking
      additionalValetCount
      receivedManualPayment
    }
  }`;

const MY_ACCOUNT_QUERY = gql`
  query MyAccountQuery {
    me {
      id
      name
      email
      title
      accountType
      phone
      bio
    }
  }`;

const UPDATE_DITW_PREFERENCES = gql`
  mutation UpdateDitwPreferences(
    $rsvpToken: String!
    $guestList: String
    $hostCheckedIn: Boolean
    $table: String
    $paddle: String
    $receivedManualPayment: Boolean
  ) {
    updateDitwPreferences(
      rsvpToken: $rsvpToken
      guestList: $guestList
      hostCheckedIn: $hostCheckedIn
      table: $table
      paddle: $paddle
      receivedManualPayment: $receivedManualPayment
    ) {
      success
    }
  }`;


const DitWReservation = compose(
  graphql(CHECKIN, {
    options: ownProps => ({
      pollInterval: 2000,
      variables: {
        rsvpToken: ownProps.params.rsvpToken
      }
    })
  }),
  graphql(UPDATE_DITW_PREFERENCES, { name: 'updateDitwPreferences' }),
  graphql(MY_ACCOUNT_QUERY, { name: 'myAccountQuery' }),
)(DitWReservationContainer);

export default DitWReservation;

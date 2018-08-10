import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
// import FontAwesome from 'react-fontawesome';
import { graphql, compose } from 'react-apollo';
import { Alert, Row, Col, Button } from 'react-bootstrap';
// import QrReader from 'react-qr-reader';

import BasicContainer from '../../base/BasicContainer';
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

class DitWCheckInContainer extends React.Component {

  static propTypes = {
    params: PropTypes.shape({
      rsvpToken: PropTypes.string.isRequired
    }).isRequired,
    data: PropTypes.shape({
      ditwCheckin: PropTypes.objecy
    }).isRequired
  }

  state = {
    success: false,
    submitDisabled: false,
    guestList: [],

    // qr code stuff
    // delay: 300,
    // result: 'No result'
  }

  componentWillMount() {
    document.body.style.backgroundImage = 'url(//nciw.s3.amazonaws.com/discovernci_media/DitWBg.jpg)';
  }

  componentWillReceiveProps = (nextProps) => {
      nextProps.data && nextProps.data.ditwCheckin && nextProps.data.ditwCheckin.guestList &&
      this.setState({
        guestList: JSON.parse(nextProps.data.ditwCheckin.guestList)
      });
  }

  handleScan = (data) => {
    if (data) {
      this.setState({ result: data });
    }
  }

  handleError = (err) => {
    console.error(err);
  }

  handleSavePref = () => {
    const i = this;
    this.setState({ submitDisabled: true });

    this.props.updateDitwPreferences({
      variables: {
        rsvpToken: i.props.params.rsvpToken,
        guestList: i.state.guestList
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

  /**
   * Bootstrap's Alert dismissal
   */
  handleDismiss = () => {
    this.setState({ success: false });
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

    const stripeCustomer = order && JSON.parse(order.getStripeCustomer);

    const ticketTotal = order && _.find(selectedTicketPricing, { id: order.ticketQty }).price;
    const cabanaTotal = order && (order.wantsCabana === 'yes') ? 250 : 0;
    const childcareTotal = order && order.wantsChildcare === 'yes' ? (20 * parseInt(childcareChildren.length, 10)) : 0;
    const additionalTotal = order && order.additionalDonation;

    const totalPrice = order && order.totalPrice;
    const calcTotalPrice = order && (ticketTotal + cabanaTotal + childcareTotal + additionalTotal);

    const missingTicketEnhancerPrice = order && (totalPrice !== calcTotalPrice)
      ? (totalPrice - calcTotalPrice)
      : totalPrice;

    // console.log('-----------------------------');
    // console.log('ticketTotal   ', ticketTotal);
    // console.log('cabanaTotal   ', cabanaTotal);
    // console.log('childcareTotal   ', childcareTotal);
    // console.log('additionalTotal   ', additionalTotal);
    // console.log('totalPrice   ', totalPrice);
    // console.log('missingTicketEnhancerPrice     ', missingTicketEnhancerPrice);
    // console.log('calcTotalPrice        ', calcTotalPrice)

    return (
      <BasicContainer>
        <Row>
          <Col md={10} mdOffset={1} style={{ marginTop: 20 }}>

            {this.state.success &&
              <Alert bsStyle="success" onDismiss={this.handleDismiss}>
                Your preferences have been saved.
              </Alert>
            }

            <div className="center bottom-20">
              <img src="//nciw.s3.amazonaws.com/discovernci_media/DITW-logo-sm.png" alt="" style={{ margin: 'auto', width: 180, display: 'block' }} />
              {/* <img
                src={`https://discovernci.org/media/ditw-qrcodes/${this.props.params.rsvpToken}.png`}
                style={{ margin: '15px auto', width: 180, height: 180, border: '1px solid black' }}
                alt=""
              /> */}
              <h3>Dinner in the Woods 2018</h3>

              {/* <QrReader
                delay={this.state.delay}
                onError={this.handleError}
                onScan={this.handleScan}
                style={{ width: 320 }}
              />
              <p>{this.state.result}</p> */}


            </div>

            {order &&
              <table width="100%" className="review-table">
                <tbody>
                <tr className="table-row-header">
                  <th>Personal Information</th>
                  <th></th>
                </tr>
                <tr>
                  <td className="right" style={{ minWidth: 120, width: '35%' }}>Name:</td>
                  <td>{order.name}</td>
                </tr>
                <tr>
                  <td className="right">Email:</td>
                  <td>{order.email}</td>
                </tr>
                <tr>
                  <td className="right">Phone:</td>
                  <td>{order.phone}</td>
                </tr>
                {order.isParentGuardian === 'yes' &&
                  <tr>
                    <td className="right" style={{ whiteSpace: 'nowrap' }}>NCI Parent/Guardian:</td>
                    <td>Yes</td>
                  </tr>
                }
                {order.newsletterSubscribe &&
                  <tr>
                    <td className="right">Newsletter:</td>
                    <td>Yes</td>
                  </tr>
                }

                <tr style={{ background: '#dddddd' }}>
                  <th>Ticket & Event Preferences</th>
                  <th></th>
                </tr>
                <tr>
                  <td className="right">Tickets:</td>
                  <td>{_.find(selectedTicketPricing, { id: order.ticketQty }).label}</td>
                </tr>
                {/* <tr>
                  <td className="right">Tickets Enhancers:</td>
                  <td>{order.ticketEnhancer}</td>
                </tr> */}
                <tr>
                  <td className="right">Reserved Cabana:</td>
                  <td>{order.wantsCabana === 'yes' ? 'Yes' : 'No'}</td>
                </tr>

                <tr>
                  <td className="right">Valet Parking:</td>
                  <td>{order.wantsValetParking === 'yes' ? `Yes(${parseInt(order.additionalValetCount, 10) + 1})` : 'No' }</td>
                </tr>

                {(order.hasVegetarianRestriction || order.hasVeganRestriction || order.hasDairyRestriction || order.hasGlutenRestriction) &&
                  <tr>
                    <td className="right">Dietary Restrictions:</td>
                    <td>
                      {order.hasVegetarianRestriction && `Vegetarian(${order.vegetarianCount === 0 ? '1' : order.vegetarianCount}) `}
                      {order.hasVeganRestriction && `Vegan(${order.veganCount === 0 ? '1' : order.veganCount}) `}
                      {order.hasDairyRestriction && `Dairy(${order.dairyCount === 0 ? '1' : order.dairyCount}) `}
                      {order.hasGlutenRestriction && `Gluten(${order.glutenCount === 0 ? '1' : order.glutenCount}) `}
                    </td>
                  </tr>
                }

                {order.hasFoodAllergies === 'yes' &&
                  <tr>
                    <td className="right">Food Allergies:</td>
                    <td>{order.foodAllergenNotes}</td>
                  </tr>
                }

                {this.state.guestList.length > 0 &&
                  <tr style={{ background: '#dddddd' }}>
                    <th colSpan={2}>Your Guest List</th>
                  </tr>
                }
                <tr>
                  <td colSpan={2}>
                    <Row>
                      <Col md={10} mdOffset={2}>
                        <GuestForm
                          items={this.state.guestList}
                          handleName={this.handleGuestName}
                          handleEmail={this.handleGuestEmail}
                        />
                      </Col>
                    </Row>
                  </td>
                </tr>

                {order.deferGuestList &&
                  <tr>
                    <td className="right" style={{ verticalAlign: 'top' }}>Guest List:</td>
                    <td style={{ verticalAlign: 'top' }}>
                      You have chosen to enter your guests names and emails at a later time.
                    </td>
                  </tr>
                }

                {order.wantsChildcare === 'yes' &&
                  <tr style={{ background: '#dddddd' }}>
                    <th>On-site Childcare</th>
                    <th></th>
                  </tr>
                }
                {order.wantsChildcare === 'yes' &&
                  <tr>
                    <td className="right" style={{ verticalAlign: 'top' }}>{childcareChildren.length > 1 ? 'Children' : 'Child'}:</td>
                    <td style={{ verticalAlign: 'top' }}>
                      <ul style={{ margin: 0, paddingLeft: 15 }}>
                        {_.map(childcareChildren, child => (
                          <li key={child.id}>{child.name} ({child.age}/yo)</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                }

                <tr style={{ background: '#dddddd' }}>
                  <th colSpan={2}>Payment Details</th>
                </tr>


                {order.paymentMethod === 'CREDIT' && stripeCustomer ?
                  <tr>
                    <td className="right" style={{ whiteSpace: 'nowrap' }}>Card on-file:</td>
                    <td>{stripeCustomer.sources.data[0].brand}  •••• {stripeCustomer.sources.data[0].last4}</td>
                  </tr>
                  : <tr>
                    <td className="right" style={{ whiteSpace: 'nowrap' }}>Payment Method:</td>
                    <td>{order.paymentMethod}</td>
                  </tr>
                }

                <tr>
                  <td className="right">Tickets:</td>
                  <td>${_.find(selectedTicketPricing, { id: order.ticketQty }).price}</td>
                </tr>

                <tr>
                  <td className="right">Ticket Enhancers:</td>
                  <td>${missingTicketEnhancerPrice}</td>
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
                  <td><strong>${totalPrice}.00</strong></td>
                </tr>


                </tbody>
              </table>
            }

            <div className="center">
              <Button
                bsStyle="success"
                bsSize="lg"
                onClick={this.handleSavePref}
                disabled={this.state.submitDisabled}
                style={{ marginTop: 20 }}
              >
                Save Preferences
              </Button>
            </div>


          </Col>
        </Row>
      </BasicContainer>
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
      wantsChildcare
      wantsValetParking
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
      additionalValetCount
      totalPrice
      additionalDonation
      qrcodeUrl
      retainPaymentInfo
      childcareChildren
      isParentGuardian
      modified
      paymentMethod
      getStripeCustomer
      stripeCustomerId
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
  ) {
    updateDitwPreferences(
      rsvpToken: $rsvpToken
      guestList: $guestList
    ) {
      success
    }
  }`;


const DitWCheckIn = compose(
  graphql(CHECKIN, {
    options: ownProps => ({
      variables: {
        rsvpToken: ownProps.params.rsvpToken
      }
    })
  }),
  graphql(UPDATE_DITW_PREFERENCES, { name: 'updateDitwPreferences' }),
  graphql(MY_ACCOUNT_QUERY, { name: 'myAccountQuery' }),
)(DitWCheckInContainer);

export default DitWCheckIn;

import _ from 'lodash';
import React from 'react';

export default class DitwPurchaseReviewTable extends React.Component {
  render() {
    const order = this.props.order;
    const selectedTicketPricing = this.props.selectedTicketPricing;
    return (
      <table width="100%" className="review-table">
        <tbody>
        <tr className="table-row-header">
          <th colSpan={2}>Personal Information</th>
        </tr>
        <tr>
          <td className="right">Name:</td>
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
          <th colSpan={2}>Ticket & Event Preferences</th>
        </tr>
        <tr>
          <td className="right">Tickets:</td>
          <td>{_.find(selectedTicketPricing, { id: order.ticketQty }).label}</td>
        </tr>
        <tr>
          <td className="right">Ticket enhancers:</td>
          <td>{order.ticketEnhancer > 0 ? `${order.ticketEnhancer} Pack` : 'None'}</td>
        </tr>
        <tr>
          <td className="right">Reserved Cabana:</td>
          <td>{order.wantsCabana === 'yes' ? 'Yes' : 'No' }</td>
        </tr>
        {order.wantsValetParking === 'yes' &&
          <tr>
            <td className="right">Valet Parking:</td>
            <td>{`Yes(${parseInt(order.additionalValetCount, 10) + 1})`}</td>
          </tr>
        }

        {order.guestList.length > 0 &&
          <tr style={{ background: '#dddddd' }}>
            <th colSpan={2}>Guest List</th>
          </tr>
        }
        {!order.deferGuestList && (order.guestList.length > 0) &&
          <tr>
            <td className="right" style={{ verticalAlign: 'top' }}>Yours Guests:</td>
            <td style={{ verticalAlign: 'top' }}>
              <ul style={{ margin: 0, paddingLeft: 15 }}>
                {_.map(order.guestList, guest => (
                  <li key={guest.id}>{guest.name} {guest.email && `(${guest.email})`}</li>
                ))}
              </ul>
            </td>
          </tr>
        }
        {order.deferGuestList &&
          <tr>
            <td className="right" style={{ verticalAlign: 'top' }}>Guest List:</td>
            <td style={{ verticalAlign: 'top' }}>
              You have chosen to enter your guests names and emails at a later time.
            </td>
          </tr>
        }

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

        {order.wantsChildcare === 'yes' &&
          <tr style={{ background: '#dddddd' }}>
            <th colSpan={2}>On-site Childcare</th>
          </tr>
        }
        {order.wantsChildcare === 'yes' &&
          <tr>
            <td className="right" style={{ verticalAlign: 'top' }}>{order.childcareChildren.length > 1 ? 'Children' : 'Child'}:</td>
            <td style={{ verticalAlign: 'top' }}>
              <ul style={{ margin: 0, paddingLeft: 15 }}>
                {_.map(order.childcareChildren, child => (
                  <li key={child.id}>{child.name} ({child.age}/yo)</li>
                ))}
              </ul>
            </td>
          </tr>
        }

        <tr style={{ background: '#dddddd' }}>
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

        <tr>
          <td className="right">Tickets enhancers:</td>
          <td>${order.ticketEnhancer > 0 ? parseInt(order.ticketEnhancer, 10) * 20 : '0'}</td>
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
            <td>${25 * parseInt(order.childcareChildren.length, 10)}</td>
          </tr>
        }
        {order.wantsValetParking === 'yes' &&
          <tr>
            <td className="right">Valet Parking:</td>
            <td>${
              order.additionalValetCount > 0
                ? ((1 + parseInt(order.additionalValetCount, 10)) * 5)
                : 5
            } ({order.additionalValetCount > 0 ? `${(1 + parseInt(order.additionalValetCount, 10))} Cars` : '1 Car'  })</td>
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
        </tr>


        </tbody>
      </table>
    );
  }
}

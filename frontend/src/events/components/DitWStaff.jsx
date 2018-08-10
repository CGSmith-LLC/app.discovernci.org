import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import FontAwesome from 'react-fontawesome';
import { graphql, compose } from 'react-apollo';
import { Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import QrReader from 'react-qr-reader';

import SearchInput, { createFilter } from 'react-search-input';

const KEYS_TO_FILTERS = ['name', 'email', 'guestList'];

class DitWStaffContainer extends React.Component {

  static propTypes = {
    data: PropTypes.shape({
      ditwRsvpList: PropTypes.array
    }).isRequired
  }

  state = {
    success: false,
    submitDisabled: false,
    guestList: [],
    searchTerms: '',

    // QR Code
    displayCamera: false,
    delay: 300

  }

  componentWillMount() {
    document.body.style.background = '#fff';
  }

  handleScan = (data) => {
    if (data) {
      this.setState({
        searchTerms: data.replace('http://dinnerinthewoods.org/', ''),
        displayCamera: false
      });
    }
    // sortedRsvpList && console.log(_.filter(sortedRsvpList, ['category.parent', 'Food']));
  }

  handleError = (err) => {
    console.error(err);
  }

  /**
   * Bootstrap's Alert dismissal
   */
  handleDismiss = () => {
    this.setState({ success: false });
  }

  handleToggleCamera = () => {
    this.setState({ displayCamera: !this.state.displayCamera });
  }

  handleFilterList = (e) => {
    // console.log(e)
    this.setState({ searchTerms: e });
  }

  render() {
    let objectList = [];
    objectList = this.props.data && this.props.data.ditwRsvpList;
    // console.log(objectList);

    const filteredList = !_.isEmpty(objectList) && objectList.filter(createFilter(this.state.searchTerms, KEYS_TO_FILTERS));

    // const filteredList = objectList &&
    //   this.state.searchTerms === ''
    //     ? objectList
    //     : _.filter(objectList, o => _.includes(_.values(o), this.state.searchTerms));

    const rsvpListByLastNameLetter = _(filteredList)
      .groupBy(x => x.lastName.charAt(0))
      .map((value, key) => ({ lastName: key, users: value }))
      .value();

    const sortedRsvpList = _.orderBy(
      rsvpListByLastNameLetter,
      [user => user.lastName.toLowerCase()],
      ['asc']
    );

    return (
      <div>

        {this.state.success &&
          <Alert bsStyle="success" onDismiss={this.handleDismiss}>
            Your preferences have been saved.
          </Alert>
        }

        <div className="main-list">

          <div className="center">

            {this.props.myAccountQuery.me !== null &&
              <div className="search-qr">

                <Link to="/events/dinner-in-the-woods/check-in">
                  <img
                    src="//nciw.s3.amazonaws.com/discovernci_media/DITW-logo-sm.png"
                    style={{ margin: 'auto', width: 130, display: 'block' }}
                    alt=""
                  />
                </Link>

                <FontAwesome name="search" />
                <FontAwesome name="qrcode" onClick={this.handleToggleCamera} />
                <SearchInput className="search-input" onChange={this.handleFilterList} />

                {/* <input
                  type="text"
                  className="search-qr"
                  value={this.state.searchTerms}
                  placeholder="Search by Name, Email, Phone…"
                  onChange={this.handleFilterList}
                /> */}

                {this.state.displayCamera &&
                  <QrReader
                    delay={this.state.delay}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    className="qrdiv"
                  />
                }
              </div>
            }

            {sortedRsvpList &&
              <div className="rsvp-list" style={{ position: 'relative', top: this.state.displayCamera ? 337 : 0 }}>
                {_.map(sortedRsvpList, group => (
                  <ul key={group.lastName} className="item-list">
                    <li className="header" style={{ top: this.state.displayCamera ? 480 : 143 }}>
                      {group.lastName === '' ? '#' : group.lastName}
                    </li>
                    <ul>
                      {_.map(group.users, u => (
                        <Link key={u.id} to={`/events/dinner-in-the-woods/check-in/${u.rsvpToken}`}>
                          <li className="item">{u.checkedIn && <FontAwesome name="check-circle" fixedWidth />}{u.name}</li>
                        </Link>
                      ))}
                    </ul>
                  </ul>
                ))}

                {this.state.searchTerms !== '' &&
                  <div style={{ textAlign: 'left' }}>
                    <Button block bsStyle="link" onClick={() => this.setState({ searchTerms: '' })}>
                      Clear Search
                    </Button>
                  </div>
                }

              </div>
            }

          </div>

        </div>

        <div className="secondary-list">
          {this.props.myAccountQuery.me !== null
            ? this.props.children
            : <div className="not-signed-in">You are not signed in. <Link to="/login">Sign In</Link></div>
          }
        </div>

      </div>
    );
  }
}

const RSVP_LIST_QUERY = gql`
  query {
    ditwRsvpList {
      id
      name
      lastName
      email
      phone
      guestList
      isParentGuardian
      rsvpToken
      modified
      checkedIn
    }
  }`;

const MY_ACCOUNT_QUERY = gql`
  query {
    me {
      id
      name
      email
      accountType
    }
  }`;


const DitWStaff = compose(
  graphql(RSVP_LIST_QUERY),
  graphql(MY_ACCOUNT_QUERY, { name: 'myAccountQuery' }),
)(DitWStaffContainer);

export default DitWStaff;

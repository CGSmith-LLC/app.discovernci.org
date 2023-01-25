import _ from 'lodash';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';
import { Navbar, NavDropdown, MenuItem } from 'react-bootstrap';

import { getQueryParams } from '../../common/utils/index';
import { loggedIn } from '../../common/auth';
import NavLink from './NavLink';

import { locations } from '../db';

export default class MainMenuContainer extends React.Component {
  state = {
    isReady: false
  };

  componentWillMount() {
    this.setState({ isReady: true });
  }

  userMenuItems = () => (this.state.isReady && loggedIn()
    ? <li><a key={3} href="/dashboard"><FontAwesome name="lock" fixedWidth /> My NCI Dashboard</a></li>
    : <li><a key={3584} href="/dashboard"><FontAwesome name="lock" fixedWidth /> Sign into NCI</a></li>
  );

  render() {
    return (
      <div></div>
    );
  }
}

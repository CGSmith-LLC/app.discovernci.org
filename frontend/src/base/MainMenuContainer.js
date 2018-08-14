import _ from 'lodash';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';
import {
  Navbar, Nav, NavDropdown, MenuItem
} from 'react-bootstrap';

import { getQueryParams } from '../utils';
import { loggedIn } from '../common/auth';
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
      <Navbar collapseOnSelect fixedTop>
        <Navbar.Header>
          <Navbar.Brand className="brandItem">
            <Link key={1} to="/" style={{ margin: '5px 0 0 0', padding: '0 21px' }}>
              <img src="//nciw.s3.amazonaws.com/discovernci_media/logo.png" className="navbar-logo" alt="presentation" />
              <span
                style={{
                  fontSize: 15,
                  color: 'white',
                  display: 'inline-block',
                  marginLeft: 13,
                  marginTop: 14
                }}
              >
                Nature&apos;s Classroom Institute
              </span>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <li eventKey="412"><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>

            <NavDropdown eventKey="21" title="Outdoor Environmental Edu" id="basic-nav-dropdown">

              <li eventKey={3} href="/environmental"><NavLink to="/environmental" onlyActiveOnIndex>Environmental Edu Overview</NavLink></li>

              <MenuItem divider />

              <li key={4}><NavLink to="/environmental/prepare" onlyActiveOnIndex>Prepare for NCI</NavLink></li>
              <li key={5}><NavLink to="/environmental/a-day-in-the-life" onlyActiveOnIndex>A day in the life...</NavLink></li>
              <li key={6}><NavLink to="/environmental/visit" onSelect={() => document.dispatchEvent(new MouseEvent('click'))} onlyActiveOnIndex>Schedule a visit</NavLink></li>

              <MenuItem divider />

              <li className="menuLabel">
                Locations
              </li>

              {_.map(locations, location => (
                <li key={location.id}>
                  <NavLink to={`/environmental/${location.slug}`}>
                    <FontAwesome name="map-marker" fixedWidth />
                    {' '}
                    {location.name}
                  </NavLink>
                </li>
              ))}

              <MenuItem divider />

              {this.userMenuItems()}

            </NavDropdown>

            <li><NavLink key={8} to="/curriculum">Curriculum</NavLink></li>

            <li className="hidden-xs">
              <Link key={25} to="/" style={{ margin: '5px 0 0 0', padding: '0 21px' }}>
                <img src="//nciw.s3.amazonaws.com/discovernci_media/logo.png" className="navbar-logo" alt="presentation" />
              </Link>
            </li>

            <NavDropdown eventKey={24} title="Montessori School" id="basic-nav-dropdown">
              <li><NavLink key={10} to="/montessori" onlyActiveOnIndex>NCI Montessori Overview</NavLink></li>
              {getQueryParams().preview
                && <li><NavLink key={10} to="/montessori/this-week/">This Week at NCIM</NavLink></li>
              }
              <MenuItem divider />
              <li className="menuLabel">Classrooms</li>
              <li><NavLink key={11} to="/montessori/childrens-house">Children&apos;s House <span className="dim">(Ages 3-6)</span></NavLink></li>
              <li><NavLink key={12} to="/montessori/lower-elementary">Lower Elementary <span className="dim">(Ages 6-9)</span></NavLink></li>
              <li><NavLink key={13} to="/montessori/upper-elementary">Upper Elementary <span className="dim">(Ages 9-12)</span></NavLink></li>
              <li><NavLink key={14} to="/montessori/adolescent">Adolescent <span className="dim">(Ages 12-18)</span></NavLink></li>
              <MenuItem divider />
              <li><NavLink key={15} to="/montessori/faculty-staff"><FontAwesome name="users" fixedWidth /> Faculty and Staff</NavLink></li>
              <li><NavLink key={16} to="/montessori/calendar"><FontAwesome name="calendar-o" fixedWidth /> School Calendar</NavLink></li>
              <li><NavLink key={17} to="/montessori/parents"><FontAwesome name="commenting" fixedWidth /> Parents Corner / PABC</NavLink></li>
              <MenuItem divider />
              <li><NavLink key={18} to="/montessori/visit">Visit our School</NavLink></li>
              <li><NavLink key={19} to="/montessori/tuition">Tuition and Fees</NavLink></li>
              <li><NavLink key={20} to="/montessori/enrollment">Enrollment</NavLink></li>
            </NavDropdown>

            <li><NavLink key={21} to="/events">Events</NavLink></li>
            <li><NavLink key={22} to="/donate">Donate</NavLink></li>
            <li><NavLink key={23} to="/contact">Contact</NavLink></li>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

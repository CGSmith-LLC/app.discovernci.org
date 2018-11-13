import _ from 'lodash';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';
import {
  Navbar, Nav, NavDropdown, MenuItem
} from 'react-bootstrap';

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
      <Navbar collapseOnSelect fixedTop>
        <Navbar.Header>
          <Navbar.Brand className="brandItem">
            <Link key={1} to="https://discovernci.org/" target="_self" style={{ margin: '5px 0 0 0', padding: '0 21px' }}>
              <img src="/discovernci_media/logo.png" className="navbar-logo" alt="presentation" />
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
            <li eventKey="412" className="hidden-xs hidden-sm hidden-md"><NavLink to="https://discovernci.org/" target="_self" onlyActiveOnIndex>Home</NavLink></li>

            <NavDropdown eventKey="21" title="Outdoor Environmental Edu" id="basic-nav-dropdown">

              <li eventKey={3} href="https://discovernci.org/environmental" target="_self"><NavLink to="https://discovernci.org/environmental" target="_self" onlyActiveOnIndex>Environmental Edu Overview</NavLink></li>

              <MenuItem divider />

              <li key={4}><NavLink to="https://discovernci.org/environmental/prepare" target="_self" onlyActiveOnIndex>Prepare for NCI</NavLink></li>
              <li key={5}><NavLink to="https://discovernci.org/environmental/a-day-in-the-life" target="_self" onlyActiveOnIndex>A day in the life...</NavLink></li>
              <li key={6}><NavLink to="https://discovernci.org/environmental/visit" target="_self" onSelect={() => document.dispatchEvent(new MouseEvent('click'))} onlyActiveOnIndex>Schedule a visit</NavLink></li>

              <MenuItem divider />

              <li className="menuLabel">
                Locations
              </li>

              {_.map(locations, location => (
                <li key={location.id}>
                  <NavLink to={`https://discovernci.org/environmental/${location.slug}`} target="_self">
                    <FontAwesome name="map-marker" fixedWidth />
                    {' '}
                    {location.name}
                  </NavLink>
                </li>
              ))}

              <MenuItem divider />

              {this.userMenuItems()}

            </NavDropdown>

            <li><NavLink key={8} to="https://discovernci.org/curriculum" target="_self">Curriculum</NavLink></li>

            <li className="hidden-xs hidden-sm">
              <Link key={25} to="https://discovernci.org/" style={{ margin: '5px 0 0 0', padding: '0 21px' }} target="_self">
                <img src="/discovernci_media/logo.png" className="navbar-logo" alt="presentation" />
              </Link>
            </li>

            <NavDropdown eventKey={24} title="Montessori School" id="basic-nav-dropdown">
              <li><NavLink key={10} to="https://discovernci.org/montessori" target="_self" onlyActiveOnIndex>NCI Montessori Overview</NavLink></li>
              {getQueryParams().preview
                && <li><NavLink key={10} to="https://discovernci.org/montessori/this-week/" target="_self">This Week at NCIM</NavLink></li>
              }
              <MenuItem divider />
              <li className="menuLabel">Classrooms</li>
              <li><NavLink key={11} to="https://discovernci.org/montessori/childrens-house" target="_self">Children&apos;s House <span className="dim">(Ages 3-6)</span></NavLink></li>
              <li><NavLink key={12} to="https://discovernci.org/montessori/lower-elementary" target="_self">Lower Elementary <span className="dim">(Ages 6-9)</span></NavLink></li>
              <li><NavLink key={13} to="https://discovernci.org/montessori/upper-elementary" target="_self">Upper Elementary <span className="dim">(Ages 9-12)</span></NavLink></li>
              <li><NavLink key={14} to="https://discovernci.org/montessori/adolescent" target="_self">Adolescent <span className="dim">(Ages 12-18)</span></NavLink></li>
              <MenuItem divider />
              <li><NavLink key={15} to="https://discovernci.org/montessori/faculty-staff" target="_self"><FontAwesome name="users" fixedWidth /> Faculty and Staff</NavLink></li>
              <li><NavLink key={16} to="https://discovernci.org/montessori/calendar" target="_self"><FontAwesome name="calendar-o" fixedWidth /> School Calendar</NavLink></li>
              <li><NavLink key={17} to="https://discovernci.org/montessori/parents" target="_self"><FontAwesome name="commenting" fixedWidth /> Parents Corner / PABC</NavLink></li>
              <MenuItem divider />
              <li><NavLink key={18} to="https://discovernci.org/montessori/visit" target="_self">Visit our School</NavLink></li>
              <li><NavLink key={19} to="https://discovernci.org/montessori/tuition" target="_self">Tuition and Fees</NavLink></li>
              <li><NavLink key={20} to="https://discovernci.org/montessori/enrollment" target="_self">Enrollment</NavLink></li>
            </NavDropdown>

            <li><NavLink key={21} to="https://discovernci.org/events" target="_self">Events</NavLink></li>
            <li><NavLink key={22} to="https://discovernci.org/donate" target="_self">Donate</NavLink></li>
            <li><NavLink key={23} to="https://discovernci.org/contact" target="_self">Contact</NavLink></li>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

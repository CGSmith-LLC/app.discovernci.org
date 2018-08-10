import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Grid } from 'react-bootstrap';

LocationsContainer.propTypes = {
  children: PropTypes.node
};

LocationsContainer.defaultProps = {
  children: []
};

export default function LocationsContainer(props) {
  return (
    <Grid className="grid-container">

      <h1 className="center top-35">The Nation&apos;s Premier Environmental Education Program</h1>

      <ul className="sub-menu">
        <li><Link to="/environmental" onlyActiveOnIndex activeClassName="active">Overview</Link></li>
        <li><Link to="/environmental/angelus-oaks-california" activeClassName="active">Angelus Oaks, CA</Link></li>
        <li><Link to="/environmental/ben-lomond-california" activeClassName="active">Ben Lomond, CA</Link></li>
        <li><Link to="/environmental/bruceville-texas" activeClassName="active">Bruceville, TX</Link></li>
        <li><Link to="/environmental/new-ulm-texas" activeClassName="active">New Ulm, TX</Link></li>
        <li><Link to="/environmental/lake-geneva-wisconsin" activeClassName="active">Lake Geneva, WI</Link></li>
      </ul>

      <div className="row-wrapper">
        {props.children}
      </div>

    </Grid>
  );
}

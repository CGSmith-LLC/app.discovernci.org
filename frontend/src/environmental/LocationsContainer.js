import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Grid } from 'react-bootstrap';

import { locations } from '../db';

LocationsContainer.propTypes = {
  children: PropTypes.node
};

LocationsContainer.defaultProps = {
  children: []
};

export default function LocationsContainer({ children }) {
  return (
    <Grid className="grid-container">

      <h1 className="center top-35">
        The Nation&apos;s Premier Environmental Education Program
      </h1>

      <ul className="sub-menu">

        <li>
          <Link to="/environmental" onlyActiveOnIndex activeClassName="active">
            Overview
          </Link>
        </li>

        {_.map(locations, loc => (
          <li key={loc.id}>
            <Link to={`/environmental/${loc.slug}`} activeClassName="active">
              {loc.shortName}
            </Link>
          </li>
        ))}

      </ul>

      <div className="row-wrapper">
        {children}
      </div>

    </Grid>
  );
}

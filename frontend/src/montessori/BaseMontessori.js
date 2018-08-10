import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';

import Menu from './ClassroomsMenu';

BaseMontessori.propTypes = {
  children: PropTypes.node
};

BaseMontessori.defaultProps = {
  children: []
};

export default function BaseMontessori(props) {
  return (
    <Grid className="grid-container">
      <h1 className="center top-35">Nature&apos;s Classroom Institute Montessori School</h1>
      <Row>
        <Col md={10} mdOffset={1}>

          <Menu />

          {/* <Alert bsStyle="warning">
            <strong>NOTE</strong>: Winter weather school closings and delays for our Mukwonago, WI Montessori School are <a href="https://www.tmj4.com/weather/school-closings-delays" target="_blank">posted here</a>.
          </Alert> */}

        </Col>
      </Row>
      <div className="row-wrapper">
        {props.children}
      </div>
    </Grid>
  );
}

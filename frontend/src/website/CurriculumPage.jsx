import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Grid, Row, Col } from 'react-bootstrap';

import NewsletterList from './NewsletterList';

export default class Curriculum extends Component {

  componentWillMount() {
    document.body.style.backgroundImage = 'url(//nciw.s3.amazonaws.com/discovernci_media/bg6.jpg)';
  }

  render() {
    return (
      <Grid className="grid-container">

        <Helmet title="Curriculum - Nature&apos;s Classroom Institute and Montessori School" />

        <Row className="top-30">
          <Col md={10} mdOffset={1} className="center bottom-30">
            <h3 className="center top-30" style={{ opacity: 0.7 }}>The nation&apos;s premier environmental education program</h3>
            <h1 className="center" style={{ marginTop: 13 }}>Curriculum designed around you</h1>
          </Col>
        </Row>

        <Row>
          <Col md={10} mdOffset={1}>
            <NewsletterList />
          </Col>
        </Row>

      </Grid>
    );
  }
}

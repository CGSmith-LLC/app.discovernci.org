import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import NewsletterList from './NewsletterList';

export default class Contact extends React.Component {
  componentWillMount() {
    document.body.style.backgroundImage = 'url(/discovernci_media/bg3.jpg)';
  }
  render() {
    return (
      <Grid className="grid-container">
        <h1 className="center bottom-25">Nature&apos;s Classroom Institute Newsletter</h1>

        <Row>
          <Col md={10} mdOffset={1}>
            <NewsletterList />
          </Col>
        </Row>

      </Grid>
    );
  }
}

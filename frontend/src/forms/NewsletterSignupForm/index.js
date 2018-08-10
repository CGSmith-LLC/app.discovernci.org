import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Button } from 'react-bootstrap';

const NewsletterSignupForm = (props) => (
  <Row className="show-grid subscribe-newsletter top-30">
    <Col md={6} mdOffset={1}>
      <h3>Stay current. Signup for our Newsletter.</h3>
      <p>We'll send you email newsletters of upcoming events, school updates and related news. We also keep an <Link to="/newsletters">archive of past Newsletters</Link>.</p>
    </Col>
    <Col md={4}>
      <form
        action="//discovernci.us9.list-manage.com/subscribe/post?u=191d352658045bb98e2c71587&amp;id=7fab981cdc"
        method="POST"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        target="_blank"
        style={{ marginTop: 20 }}
      >
        <input type="email" name="EMAIL" id="mce-EMAIL" className="required email form-control" />
        <br />
        <Button bsStyle="success" bsSize="large" type="submit" name="subscribe" id="mc-embedded-subscribe" className="button">Subscribe</Button>
        <div id="mce-responses" className="clear">
          <div className="response" id="mce-error-response" style={{ display: 'none' }}></div>
          <div className="response" id="mce-success-response" style={{ display: 'none' }}></div>
        </div>
        <div style={{ position: 'absolute', left: '-5000px', display: 'none' }}>
          <input type="text" name="b_191d352658045bb98e2c71587_7fab981cdc" tabIndex="-1" />
        </div>
      </form>
    </Col>
  </Row>
);

export default NewsletterSignupForm;

import React from 'react';
import Helmet from 'react-helmet';
import FontAwesome from 'react-fontawesome';
import { Row, Col } from 'react-bootstrap';

import 'react-progress-button/react-progress-button.css';

import BasicContainer from './base/BasicContainer';

export default class Contact extends React.Component {

  componentWillMount() {
    document.body.style.backgroundImage = 'url(//nciw.s3.amazonaws.com/discovernci_media/bgDeep.jpg)';
  }

  render() {
    return (
      <BasicContainer>

        <Helmet title="Contact Us - Nature&apos;s Classroom Institute and Montessori School" />

        <h1 className="center">Contact Information</h1>

        <Row>
          <Col md={12} style={{ marginBottom: 30 }}>
            <div className="flex-container">
              <div className="flex-item">

                <h3 className="location-header yellowBg">California</h3>

                <h4 className="yellowTxt top-35"><FontAwesome name="location-arrow" /> Angelus Oaks, CA</h4>
                <ul>
                  <li>42900 Jenks Lake Rd W
                    <br />Angelus Oaks, CA 92305</li>
                  <li>Phone: <a href="tel:310-892-9468">(310) 892-9468</a></li>
                  <li>Email: <a href="mailto:mirko@discovernci.org">mirko@discovernci.org</a></li>
                </ul>

                <h4 className="yellowTxt top-35"><FontAwesome name="location-arrow" /> Ben Lomond, CA</h4>
                <ul>
                  <li>7795 Hwy 9<br /> Ben Lomond, CA 95018</li>
                  <li>Phone: <a href="tel:310-892-9468">(310) 892-9468</a></li>
                  <li>Email: <a href="mailto:mirko@discovernci.org">mirko@discovernci.org</a></li>
                </ul>

              </div>

              <div className="flex-item">
                <h3 className="location-header blueBg">Florida</h3>

                <h4 className="purpleTxt top-35"><FontAwesome name="location-arrow" /> Brooksville, FL</h4>
                <ul>
                  <li>25458 Dan Brown Hill Rd,
                    <br />Brooksville, FL 34602</li>
                  <li>Phone: <a href="tel:414-949-1856">414-949-1856</a></li>
                  <li>Email: <a href="mailto:Austin@DiscoverNCI.org">Austin@DiscoverNCI.org</a></li>
                </ul>

                <h4 className="purpleTxt top-35"><FontAwesome name="location-arrow" /> Parrish, FL</h4>
                <ul>
                  <li>8411 25th Street
                    <br />Parrish FL, 34219</li>
                  <li>Phone: <a href="tel:414-949-1856">414-949-1856</a></li>
                  <li>Email: <a href="mailto:Austin@DiscoverNCI.org">Austin@DiscoverNCI.org</a></li>
                </ul>
              </div>


              <div className="flex-item">
                <h3 className="location-header greenBg">Texas</h3>

                <h4 className="greenTxt top-35"><FontAwesome name="location-arrow" /> Bruceville, TX</h4>
                <ul>
                  <li>1192 Smith Lane
                    <br />Bruceville, TX 76630</li>
                  <li>Phone: <a href="tel:310-892-9468">(310) 892-9468</a></li>
                  <li>Email: <a href="mailto:mirko@discovernci.org">mirko@discovernci.org</a></li>
                </ul>

                <h4 className="greenTxt top-35"><FontAwesome name="location-arrow" /> New Ulm, TX</h4>
                <ul>
                  <li>1912 Zimmerscheidt Rd
                    <br />New Ulm TX, 78950</li>
                  <li>Phone: <a href="tel:310-892-9468">(310) 892-9468</a></li>
                  <li>Email: <a href="mailto:mirko@discovernci.org">mirko@discovernci.org</a></li>
                </ul>
              </div>

              <div className="flex-item">
                <h3 className="location-header purpleBg">Wisconsin</h3>

                <h4 className="purpleTxt top-35"><FontAwesome name="location-arrow" /> Lake Geneva, WI</h4>
                <ul>
                  <li>W2655 South Street
                    <br />Lake Geneva, WI 53147</li>
                  <li>Phone: <a href="tel:262-363-2815">(262) 363-2815</a></li>
                  <li>Email: <a href="mailto:jennifer@nciw.org">jennifer@nciw.org</a></li>
                </ul>

                <h4 className="purpleTxt top-35"><FontAwesome name="location-arrow" /> Mukwonago, WI</h4>
                <ul>
                  <li>W336 S8455 Hwy E
                    <br />PO Box 660
                    <br />Mukwonago WI 53149</li>
                  <li>Phone: <a href="tel:262-363-2815">(262) 363-2815</a></li>
                  <li>Email: <a href="mailto:info@nciw.org">info@nciw.org</a></li>
                </ul>
              </div>

            </div>
          </Col>

        </Row>

      </BasicContainer>
    );
  }
}

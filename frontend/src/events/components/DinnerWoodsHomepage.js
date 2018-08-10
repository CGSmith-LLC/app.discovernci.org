import React from 'react';
import Helmet from 'react-helmet';
import { Alert, Row, Col, Panel, Modal } from 'react-bootstrap';

import BasicContainer from '../../base/BasicContainer';
import DinnerWoodsForm from './DinnerWoodsForm';

export default class DinnerWoodsHomepage extends React.Component {

  state = {
    showModal: false
  };

  componentWillMount() {
    document.body.style.backgroundImage = 'url(//nciw.s3.amazonaws.com/discovernci_media/DitWBg.jpg)';
    if (new URLSearchParams(window.location.search).get('checkout') === 'true') {
      this.setState({ showModal: true });
    }
  }

  open = (e) => {
    e.preventDefault();
    this.setState({ showModal: true });
  }

  close = () => {
    this.setState({ showModal: false });
  }

  canPreview = () => (
    new URLSearchParams(window.location.search).get('token') === 'preview' && true
  )

  render() {
    return (
      <BasicContainer>

        <Helmet
          title="Dinner in the Woods (June 2nd, 2018) in Mukwonago, WI"
          link={[
            { rel: 'canonical', href: 'https://discovernci.org/events/dinner-in-the-woods/' }
          ]}
          meta={[
            { property: 'og:url', content: 'https://discovernci.org/events/dinner-in-the-woods/' },
            { property: 'og:title', content: 'Dinner in the Woods (June 2nd, 2018) in Mukwonago, WI' },
            { property: 'og:og:description', content: 'Join us for a delightful evening of dining, cocktails, mingling and merriment! Hyper-local dinner and deserts. Garden party attire.' },
            { property: 'og:image', content: 'http://nciw.s3.amazonaws.com/discovernci_media/nci-og-dinner-in-the-woods-2017.jpg' }
          ]}
        />

        {this.canPreview() &&
          <Alert bsStyle="warning" className="center" style={{ marginTop: 20 }}>
            You are viewing the in-development version of this page. <a href=".">View public version</a>.
          </Alert>
        }

        <Row>
          <Col md={10} mdOffset={1} className="center bottom-25">
            <p style={{ marginTop: 30, marginBottom: 10, color: '#858585' }}>Nature&apos;s Classroom Institute & Montessori School Presents</p>
            <img src="//nciw.s3.amazonaws.com/discovernci_media/DITW-logo-sm.png" alt="" style={{ width: 210 }} />
            <h1 style={{ marginTop: 0, marginBottom: 5, fontSize: '3.4em', fontFamily: 'bitter' }}>Dinner in the Woods</h1>
            <p style={{ marginTop: 0, fontSize: '1.6em', fontFamily: 'bitter' }}>Live Music <span style={{ color: '#797979' }}>•</span> Local Food <span style={{ color: '#797979' }}>•</span> Live & Silent Auction <span style={{ color: '#797979' }}>•</span> Cabanas</p>
            <h4 style={{ marginTop: 13, marginBottom: 30, color: '#7a7a7a' }}>5:30-11:30pm on Saturday June 2, 2018 in <a href="https://goo.gl/maps/o16c52qjraT2" target="_blank" rel="noopener noreferrer">Mukwonago, WI</a></h4>
          </Col>
        </Row>

        <Row>
          <Col md={6} mdOffset={1}>

            <div className="videoWrapper" style={{ marginBottom: 25 }}>
              <iframe title="Play video" src="https://www.youtube.com/embed/-ysh1zPTqVI?rel=0" frameBorder={0} allowFullScreen />
            </div>

            <p>Start your summer with a delightful Dinner in the Woods! Come for the delicious local food, and stay for the fun - live band, silent and live auctions, raffles.... Dinner featuring East Troy’s famous LDs BBQ and fabulous vegetarian options.</p>

            <h3 className="top-30">Pricing - $75/ticket</h3>

            <div style={{ marginBottom: 25, background: '#fffdf4', padding: 15 }}>
              <p style={{ fontWeight: 'bold', color: '#a70303', fontFamily: 'sans-serif', fontSize: '1em' }}>We're sorry, but the 2018 event is sold out. Will Call tickets may become available. Please enter your email to be notified.</p>

              <div id="mc_embed_signup">
                <form
                  action="https://discovernci.us9.list-manage.com/subscribe/post?u=191d352658045bb98e2c71587&amp;id=1e020f1518"
                  method="post"
                  id="mc-embedded-subscribe-form"
                  name="mc-embedded-subscribe-form"
                  target="_blank"
                >
                  <div id="mc_embed_signup_scroll">

                    <div className="mc-field-group">
                      <label htmlFor="mce-EMAIL">Email Address:</label>{' '}
                      <input type="email" name="EMAIL" className="required email" id="mce-EMAIL" />{' '}
                      <input type="submit" value="Subscribe" name="Notify Me" id="mc-embedded-subscribe" className="button" />
                    </div>

                    <div id="mce-responses" className="clear">
                      <div className="response" id="mce-error-response" style={{ display: 'none' }} />
                      <div className="response" id="mce-success-response" style={{ display: 'none' }} />
                    </div>

                    <div style={{ position: 'absolute', left: -5000 }} ariaHidden="true">
                      <input type="text" name="b_191d352658045bb98e2c71587_1e020f1518" tabIndex="-1" />
                    </div>

                  </div>
                </form>
              </div>
            </div>

            <h3>Enhance your experience</h3>

            <ul style={{ fontFamily: 'Georgia, serif' }}>
              <li style={{ marginBottom: 15 }}>Be ready for even more fun with tickets for our raffles, egg pull, wine pull and drinks!! Purchase in advance for a discount (tickets also available at the event) Not sure what an egg pull is? No problem, we’ll show you!!</li>
              <li style={{ marginBottom: 15 }}>Purchase these tickets in packs of 10. Purchase 5 packs and we’ll give you 5 tickets more for free!</li>
              <li>Also available for your evening -- a private cabana!! Enjoy a post-dinner retreat for your group! Experience includes premium dessert and signature cocktail for all. Yum!! Cabanas are available for $250 for a party of 8.</li>
            </ul>

            <h3>Childcare options</h3>

            <ul style={{ fontFamily: 'Georgia, serif' }}>
              <li>Childcare (offered to current and alumni NCM students ALL ages and their siblings above 3 years of age): NCI staff to lead large group activities onsite and provide dinner & movie in school building. $25/child. Available 5:00-11:00pm. Must reserve in advance.</li>
            </ul>

            <h3>Volunteer</h3>

            <ul style={{ fontFamily: 'Georgia, serif' }}>
              <li>Share your time and talents. <a href="https://goo.gl/forms/A8TTHc2I0Fhfsgxw1" target="_blank" rel="noopener noreferrer">Many volunteer opportunities available throughout the next several months</a>.</li>
            </ul>

            <h3>Event Sponsors</h3>
            <img src="//nciw.s3.amazonaws.com/discovernci_media/DitW2018-SponsorLogos.jpg" style={{ marginTop: 20, marginBottom: 20, width: 413, marginLeft: 25 }} alt="Sponsor Logos" />
            <ul>
              <li><a href="http://www.ldsbbq.com/" target="_blank" rel="noopener noreferrer">LD&apos;s BBQ (East Troy, WI)</a></li>
              <li><a href="https://www.nothingbundtcakes.com/" target="_blank" rel="noopener noreferrer">Nothing Bundt Cakes (Brookfield, WI)</a></li>
            </ul>

          </Col>

          <Col md={4}>

            <nav>

              <button className="btn btn-block btn-lg btn-success" disabled>
                SOLD OUT
              </button>

              {this.state.showModal &&
                <Modal show={this.state.showModal} onHide={this.close} backdrop="static">
                  <Modal.Header closeButton />
                  <Modal.Body>
                    <DinnerWoodsForm closeModal={this.close} />
                  </Modal.Body>
                </Modal>
              }

              {/* }<p style={{ marginTop: 10, fontFamily: 'helvetica, sans-serif', fontSize: '1.1em' }} className="center">ALL monies raised are matched 100%.</p> */}
              <img src="//nciw.s3.amazonaws.com/discovernci_media/DinnerInTheWoodsPosterTn.jpg" alt="" className="img-responsive img-rounded" style={{ marginTop: 20, marginBottom: 30 }} />
            </nav>

            <div style={{ marginBottom: 25 }}>
              {/* <img src="https://nciw.s3.amazonaws.com/discovernci_media/DitWTicketChart.jpg" alt="" className="img-responsive" /> */}
              <img src="https://nciw.s3.amazonaws.com/discovernci_media/DinnerInTheWoodsPostcardTn.jpg" alt="" className="img-responsive" />
            </div>

            <Panel header="Location Details">

              <p style={{ marginTop: 0, marginLeft: 24, fontFamily: 'helvetica, sans-serif', fontSize: '1.1em' }}>
                W336 S8455 Hwy E
                  <br /> Mukwonago WI 5314
                  (<a href="https://goo.gl/maps/o16c52qjraT2" target="_blank" rel="noopener noreferrer">Google Map</a>)
              </p>

            </Panel>

          </Col>
        </Row>

      </BasicContainer>
    );
  }
}

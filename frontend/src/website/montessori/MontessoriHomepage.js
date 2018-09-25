import React from 'react';
import FontAwesome from 'react-fontawesome';
import Helmet from 'react-helmet';
import { Row, Col, Panel } from 'react-bootstrap';

import AdditionalResourcesPanel from './AdditionalResourcesPanel';

export default class MontessoriHomepage extends React.Component {

  state = {
    showPoster: true,
    showGoogleMap: false,
    googleMapToggle: '+ show map'
  }

  componentWillMount() {
    document.body.style.backgroundImage = 'url(/discovernci_media/bg6.jpg)';
  }

  handlePlay = () => {
    this.setState({ showPoster: false });
  }

  handleShowMap = () => {
    if (this.state.googleMapToggle === '+ show map') {
      this.setState({
        showGoogleMap: true,
        googleMapToggle: '- hide map'
      });
    } else {
      this.setState({
        showGoogleMap: false,
        googleMapToggle: '+ show map'
      });
    }
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>

        <Helmet title="Montessori School - Nature&apos;s Classroom Institute" />

        <Row>
          <Col md={12} style={{ lineHeight: 0 }}>
            {this.state.showPoster ?
              <img
                alt="presentation"
                className="img-responsive"
                onClick={this.handlePlay}
                role="button"
                src="discovernci_media/homePoster.jpg"
                tabIndex={0}
              />
            :
              <iframe
                title="Play NCIM video"
                width="100%"
                height="641"
                src="//www.youtube.com/embed/BzBXWlAU0M8?rel=0&amp;showinfo=0&autoplay=1"
                style={{ border: 'none', margin: 0, padding: 0 }}
                frameBorder="0"
                allowFullScreen
              />
            }
          </Col>
        </Row>

        <h2 className="center" style={{ marginTop: 30, marginBottom: 20 }}>Offering the Very Best in Montessori Education</h2>

        <Row className="bottom-30 top-30">
          <Col md={6} mdOffset={1}>

            <p>The goals of Nature&apos;s Classroom Montessori are to foster independence and to
              support children in moving toward a mastery of self and the environment. Our
              classrooms are prepared Montessori environments designed to encourage children in
              their self-directed discovery of the world. Interest-based activities encourage
              children to develop a love of learning and trust in their own ability to learn.</p>

            <img
              src="documents/imgHappyTreeFriends.jpg"
              className="img-responsive img-rounded top-30"
              alt="presentation"
            />

          </Col>
          <Col md={4}>

            <Panel header="Contact Information">

              <span
                style={{ float: 'right', fontFamily: 'helvetica, sans-serif', color: '#3fb981', fontSize: '0.9em', cursor: 'pointer' }}
                onClick={this.handleShowMap}
              >
                {this.state.googleMapToggle}
              </span>

              <p style={{ fontFamily: 'helvetica, sans-serif' }}>Nature&apos;s Classroom Institute
                <br />
                <a href="//goo.gl/maps/SRFA3qZ8Vx62" target="_blank" rel="noopener noreferrer" >
                  W336 S8455 Hwy E
                  <br />PO Box 660
                  <br />Mukwonago, WI 53149
                </a>
              </p>

              {this.state.showGoogleMap
                ? <iframe
                  title="NCIM Google Map"
                  src="//www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d748338.0253818559!2d-88.97799341540974!3d42.889823709472225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88059633d969329b%3A0xa4aff843ee787691!2sNature&#39;s+Classroom+Institute+and+Montessori+School!5e0!3m2!1sen!2sus!4v1486143237120"
                  width="328"
                  height="400"
                  frameBorder="0"
                  style={{ border: 0, marginTop: 10 }}
                  allowFullScreen
                />
                :
                  null
              }

              <hr />

              <ul className="nostyle" style={{ fontFamily: 'helvetica, sans-serif' }}>
                <li>
                  <FontAwesome name="phone" fixedWidth />
                  <a href="tel:310-892-9468">(262) 363-2815</a> (main office)
                </li>
              </ul>

            </Panel>

            <AdditionalResourcesPanel />

          </Col>
        </Row>

        <Row className="bottom-30">
          <Col md={4} mdOffset={1}>
            <h3 style={{ marginBottom: 20, marginTop: 15 }}>What is Montessori?</h3>
            <p>The Montessori system of education is both a philosophy of child development and a
              rationale for guiding such growth. It is based on the child&apos;s developmental
              need for freedom within limits, as well as a carefully prepared environment, which
              guarantees exposure to materials and experiences. Through this, the child develops
              intelligence as well as physical and psychological abilities. It is designed to take
              full advantage of the child&apos;s desire to learn and their unique ability to
              develop their own capabilities.</p>
          </Col>
          <Col md={6}>
            <img src="discovernci_media/splash.jpg" className="top-25 img-responsive img-rounded" alt="presentation" />
          </Col>
        </Row>

      </div>
    );
  }
}

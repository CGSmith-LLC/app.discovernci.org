import React from 'react';
import FontAwesome from 'react-fontawesome';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import {
  Grid, Row, Col, Table
} from 'react-bootstrap';

import { NewsletterSignupForm } from './forms';

export default class Home extends React.Component {
  state = {
    showPoster: true
  };

  componentDidMount() {
    document.body.style.backgroundImage = 'url(//nciw.s3.amazonaws.com/discovernci_media/bgDeep.jpg)';
  }

  handlePlay = () => {
    this.setState({ showPoster: false });
  }

  render() {
    return (
      <Grid className="gridStyle" style={{ marginTop: 100 }}>

        <Helmet title="Nature&apos;s Classroom Institute and Montessori School" />

        <Row className="bottom-20">
          <Col md={12} className="top-16" style={{ lineHeight: 0 }}>

            {/* <Alert bsStyle="warning">
              <strong>NOTE</strong>: Winter weather school closings and delays for our Mukwonago, WI Montessori School are <a href="https://www.tmj4.com/weather/school-closings-delays" target="_blank">posted here</a>.
            </Alert> */}

            {this.state.showPoster
              ? <img
                src="//nciw.s3.amazonaws.com/discovernci_media/homePosterOutsideRiver.jpg"
                className="img-responsive"
                alt="presentation"
                onClick={this.handlePlay}
              />
              : <iframe
                title="Welcome to Nature's Classtoom"
                width="100%"
                height="641"
                src="//www.youtube.com/embed/ikMlQCT7CMU?rel=0&amp;showinfo=0&autoplay=1"
                style={{ border: 'none', margin: 0, padding: 0 }}
                frameBorder="0"
                allowFullScreen
              />
            }
          </Col>
        </Row>

        <Row className="top-10">
          <Col md={6} mdOffset={1}>
            <h4 className="top" style={{ opacity: 0.7 }}>The nation&apos;s premier environmental education program</h4>
            <h1 className="bottom-30 top-20">Nature&apos;s Classroom Institute and Montessori School</h1>

            <p>Nature&apos;s Classroom Institute is the nation&apos;s premier
              environmental education program. We offer a fully customized, highly engaging 3 or 5
              day experience that has direct positive impacts on classroom community and academic
              performance. Our multi-disciplined, degreed educators integrate lessons with the
              curriculum of visiting schools in order to reinforce what is being taught in the
              classroom. With thousands of classes and activities to choose from, we create unique
              and individualized experiences for each and every student and teacher.</p>

            <p>The goals of Nature&apos;s Classroom Montessori are to foster independence and to
              support children in moving toward a mastery of self and the environment. Our
              classrooms are prepared Montessori environments designed to encourage children in
              their self-directed discovery of the world. Interest-based activities encourage
              children to develop a love of learning and trust in their own ability to learn.</p>

            <p>You might also be curious to know the <Link to="/montessori/history">history behind how we got started</Link>.</p>

            <h2 className="bottom-20 top-30">Educational Programs & Locations</h2>

            <Table striped bordered className="locationCompare">
              <thead>
                <tr>
                  <th>Location</th>
                  <th>Environmental Edu</th>
                  <th>Teacher Edu</th>
                  <th>Montessori Edu</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th><Link to="/environmental/angelus-oaks-california">Angelus Oaks, CA</Link></th>
                  <td><FontAwesome name="check" /></td>
                  <td><FontAwesome name="check" /></td>
                  <td />
                </tr>
                <tr>
                  <th><Link to="/environmental/ben-lomond-california">Ben Lomond, CA</Link></th>
                  <td><FontAwesome name="check" /></td>
                  <td><FontAwesome name="check" /></td>
                  <td />
                </tr>
                <tr>
                  <th><Link to="/environmental/bruceville-texas">Bruceville, TX</Link></th>
                  <td><FontAwesome name="check" /></td>
                  <td><FontAwesome name="check" /></td>
                  <td />
                </tr>
                <tr>
                  <th><Link to="/environmental/new-ulm-texas">New Ulm, TX</Link></th>
                  <td><FontAwesome name="check" /></td>
                  <td><FontAwesome name="check" /></td>
                  <td />
                </tr>
                <tr>
                  <th><Link to="/environmental/lake-geneva-wisconsin">Lake Geneva, WI</Link></th>
                  <td><FontAwesome name="check" /></td>
                  <td><FontAwesome name="check" /></td>
                  <td />
                </tr>
                <tr>
                  <th><Link to="/montessori">Mukwonago, WI</Link></th>
                  <td />
                  <td><FontAwesome name="check" /></td>
                  <td><FontAwesome name="check" /></td>
                </tr>
              </tbody>
            </Table>

            <p className="top-30">
              Looking to get a better idea of what a typical day at Nature&apos;s Classroom Institute looks like?
              {' '}
              <Link to="/environmental/a-day-in-the-life">
                Take a glimpse...
              </Link>
            </p>

          </Col>
          <Col md={4}>
            <img
              src="//nciw.s3.amazonaws.com/discovernci_media/onTheFarm.jpg"
              className="img-responsive img-rounded top-10"
              alt="presentation"
            />
            <img
              src="//nciw.s3.amazonaws.com/documents/BeTheTree.jpg"
              style={{ marginTop: 30 }}
              className="img-responsive img-rounded"
              alt="presentation"
            />
          </Col>
        </Row>

        <NewsletterSignupForm />

      </Grid>
    );
  }
}

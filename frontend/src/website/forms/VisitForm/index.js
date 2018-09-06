import React from 'react';
import Helmet from 'react-helmet';
import ProgressButton from 'react-progress-button';
import request from 'superagent';
import {
  Row, Col, FormGroup, FormControl, ControlLabel
} from 'react-bootstrap';

import 'react-progress-button/react-progress-button.css';

import { validateEmail } from '../../../common/utils/index';
import BasicContainer from '../../base/BasicContainer';

export default class VisitMontessori extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // react-progress-button
      buttonState: '',
      // Our own final verdictof form submission
      error: null,
      success: false,
      // Form payload values
      preferredTime: 0,
      location: 0,
      personalName: '',
      email: '',
      phone: '',
      comments: ''
    };
  }

  componentWillMount() {
    document.body.style.backgroundImage = 'url(/discovernci_media/winterBg1.jpg)';
  }

  getPreferredTimeValidationState = (e) => { if (this.state.preferredTime >= 1) return 'success'; }
  getLocationValidationState = (e) => { if (this.state.location >= 1) return 'success'; }
  getPersonalNameValidationState = (e) => { if (this.state.personalName.length >= 3) return 'success'; }
  getPhoneValidationState = (e) => { if (this.state.phone.length >= 7) return 'success'; }
  getEmailValidationState = (e) => { if (validateEmail(this.state.email)) return 'success'; }

  handlePrefferedTimeChange = (e) => { this.setState({ preferredTime: e.target.value }); }
  handleLocationChange = (e) => { this.setState({ location: e.target.value }); }
  handlePersonalNameChange = (e) => { this.setState({ personalName: e.target.value }); }
  handleEmailChange = (e) => { this.setState({ email: e.target.value }); }
  handlePhoneChange = (e) => { this.setState({ phone: e.target.value }); }
  handleCommentsChange = (e) => { this.setState({ comments: e.target.value }); }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ buttonState: 'loading' });
    const i = this;
    request
      .post('/post/visit/')
      .send({
        preferred_time: parseInt(this.state.preferredTime, 10),
        location: parseInt(this.state.location, 10),
        personal_name: this.state.personalName,
        email: this.state.email,
        phone: this.state.phone,
        comments: this.state.comments
      })
      .end(function (err, res) {
        if (err || !res.ok) {
          i.setState({
            buttonState: 'error',
            error: err
          });
        } else {
          i.setState({
            success: true,
            buttonState: 'success',
            response: res,
            preferredTime: 0,
            location: 0,
            personalName: '',
            email: '',
            phone: '',
            comments: ''
          });
        }
      });
  }

  render() {
    return (
      <BasicContainer>

        <Helmet title="Visit our Montessori School in Mukwonago, WI" />

        <Row style={{ paddingTop: 30, paddingBottom: 30 }}>
          <Col md={6} mdOffset={1} sm={6} smOffset={1} xs={10} xsOffset={1}>

            <h2 style={{ marginBottom: 30 }}>Visit our Montessori School in Mukwonago, Wisconsin</h2>

            {this.state.success &&
              <Row>
                <Col md={12} className="bottom-30">
                  <div style={{ padding: 10, background: 'rgba(187, 255, 212, 0.4)' }}>Your submission has been received. We&apos;ll contact you soon.</div>
                </Col>
              </Row>
            }

            <div>
              <Row>
                <Col md={6}>
                  <FormGroup
                    controlId="preferredTimeSelect"
                    validationState={this.getPreferredTimeValidationState()}
                  >
                    <ControlLabel onClick={() => console.log(this.state)}>
                      When would you like to visit?
                    </ControlLabel>
                    <FormControl
                      componentClass="select"
                      value={this.state.preferredTime}
                      onChange={this.handlePrefferedTimeChange}
                    >
                      <option value="0" disabled>Select...</option>
                      <option value="1">Classroom Observation</option>
                      <option value="2">During off hours</option>
                    </FormControl>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup
                    controlId="classroomSelect"
                    validationState={this.getLocationValidationState()}
                  >
                    <ControlLabel>Classroom to Observe</ControlLabel>
                    <FormControl
                      componentClass="select"
                      value={this.state.location}
                      onChange={this.handleLocationChange}
                    >
                      <option value="0" disabled>Select...</option>
                      <option value="1">Children&apos;s House (Ages 3-6)</option>
                      <option value="2">Lower Elementary (Ages 6-9)</option>
                      <option value="3">Upper Elementary (Ages 9-12)</option>
                      <option value="4">Adolescent (Ages 12-18)</option>
                    </FormControl>
                  </FormGroup>
                </Col>
              </Row>

              <FormGroup
                controlId="personalNameInput"
                validationState={this.getPersonalNameValidationState()}
              >
                <ControlLabel>Your name</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="First and last name"
                  value={this.state.personalName}
                  onChange={this.handlePersonalNameChange}
                />
              </FormGroup>

              <Row>
                <Col md={8}>
                  <FormGroup
                    controlId="emailInput"
                    validationState={this.getEmailValidationState()}
                  >
                    <ControlLabel>Your Email Address</ControlLabel>
                    <FormControl
                      type="email"
                      placeholder="me@example.com"
                      value={this.state.email}
                      onChange={this.handleEmailChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup controlId="phoneInput" >
                    <ControlLabel>Phone Number</ControlLabel>
                    <FormControl
                      type="phone"
                      placeholder="555-555-5555"
                      value={this.state.phone}
                      onChange={this.handlePhoneChange}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <FormGroup controlId="commentsTextarea">
                <ControlLabel>Questions or Comments?</ControlLabel>
                <textarea
                  className="form-control"
                  style={{ minHeight: 150, minWidth: '100%', maxWidth: '100%' }}
                  value={this.state.comments}
                  onChange={this.handleCommentsChange}
                />
              </FormGroup>

              <Row className="top-25 bottom-25">
                <ProgressButton
                  onClick={this.handleSubmit}
                  state={this.state.buttonState}
                >Submit Request</ProgressButton>
              </Row>
            </div>
          </Col>

          <Col md={4} sm={4} style={{ fontSize: '0.85em' }}>
            <h3>What to expect...</h3>
            <p style={{ marginBottom: 20, fontFamily: 'Helvetica' }}>Our montessori school tours begin at 9:30am starting at the office and last approximately 90 minutes. Please plan on a tour of our grounds, an observation in the classroom of the age you are interested in and a meeting with our Executive Director.</p>
            <p style={{ fontFamily: 'Helvetica' }}><a href="https://goo.gl/maps/cGXoTPKAiZL2" target="_blank" rel="noopener noreferrer">Get directions (Google Maps)</a></p>
            <iframe title="Map" src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJmzJp2TOWBYgRkXZ47kP4r6Q&key=AIzaSyBbch5v146nAkVkR13DHAEMhVUNWHlODok" width="380" height="360" frameBorder="0" style={{ border: '1px solid #949494' }} allowFullScreen />
          </Col>
        </Row>
      </BasicContainer>
    );
  }

}

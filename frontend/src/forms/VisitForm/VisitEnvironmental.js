import React from 'react';
import Helmet from 'react-helmet';
import ProgressButton from 'react-progress-button';
import request from 'superagent';
import { Row, Col, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import 'react-progress-button/react-progress-button.css';

import { validateEmail } from '../../utils/index';

export default class VisitEnvironmental extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // react-progress-button
      buttonState: '',
      // Our own final verdictof form submission
      error: null,
      success: null,
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
    document.body.style.backgroundImage = 'url(//nciw.s3.amazonaws.com/discovernci_media/winterBg1.jpg)';
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
      <div>

        <Helmet title="Environmental Education tours and observation" />

        <h1 className="center">Environmental Education tours and observation</h1>

        <Row style={{ paddingTop: 30, paddingBottom: 30 }}>
          <Col md={6} mdOffset={1} sm={6} smOffset={1} xs={10} xsOffset={1}>

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
                    <ControlLabel>When would you like to visit?</ControlLabel>
                    <FormControl
                      componentClass="select"
                      value={this.state.preferredTime}
                      onChange={this.handlePrefferedTimeChange}
                    >
                      <option value="0" disabled>Select...</option>
                      <option value="1">Earliest Convienence</option>
                      <option value="2">During off hours</option>
                    </FormControl>
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup
                    controlId="locationSelect"
                    validationState={this.getLocationValidationState()}
                  >
                    <ControlLabel>Location to visit</ControlLabel>
                    <FormControl
                      componentClass="select"
                      value={this.state.location}
                      onChange={this.handleLocationChange}
                    >
                      <option value="0" disabled>Select...</option>
                      <option value="5">Angelus Oaks, California</option>
                      <option value="6">Ben Lomond, California</option>
                      <option value="11">Brooksville, FL</option>
                      <option value="10">Parrish, FL</option>
                      <option value="7">Bruceville, Texas</option>
                      <option value="8">New Ulm, Texas</option>
                      <option value="9">Lake Geneva, Wisconsin</option>
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
                  style={{ minHeight: 150 }}
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

          <Col md={4} sm={4}>
            <p style={{ marginBottom: 20, fontFamily: 'Helvetica', fontSize: '1em' }}>Tours of our Environmental Education facilities in each region can happen Tuesday through Thursday by appointment. Tours take approximately half an hour and would give you an overview of the site, sleeping arrangements, dinning and a general perspective of the environment. Tours would be led by the onsite education Director are not available whilst your child is on site.</p>
          </Col>
        </Row>
      </div>
    );
  }

}

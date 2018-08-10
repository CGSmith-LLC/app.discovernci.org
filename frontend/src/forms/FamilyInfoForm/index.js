import _ from 'lodash';
import React from 'react';
// import PropTypes from 'prop-types';
// import FontAwesome from 'react-fontawesome';
// import gql from 'graphql-tag';
// import { graphql } from 'react-apollo';
import {
  Row, Col, ControlLabel, FormControl, FormGroup, Checkbox, Radio, Button
} from 'react-bootstrap';

import { genRandId } from '../../utils';
import BasicContainer from '../../base/BasicContainer';
import ChildcareChildForm from './ChildcareChildForm';
import { GuardianFormset } from '../common';
import ApprovedAdultListForm from './ApprovedAdultListForm';

const schoolDistrictList = [
  { id: 1, name: 'Burlington', hasBusService: false },
  { id: 2, name: 'Eagle/Palmyra', hasBusService: false },
  { id: 3, name: 'East Troy', hasBusService: true },
  { id: 4, name: 'Mukwonago', hasBusService: false },
  { id: 5, name: 'Oconomowoc', hasBusService: false },
  { id: 6, name: 'Waterford', hasBusService: false },
  { id: 7, name: 'Waukesha', hasBusService: false },
  { id: 8, name: 'Whitewater', hasBusService: false }
];

class FamilyRegistrationForm extends React.Component {
  state = {
    tuitionEstimate: 0,
    childList: [
      {
        id: 1,
        name: '',
        dobMonth: null,
        dobDay: null,
        dobYear: null,
        allergyAlert: '',
        healthConditions: '',
        additionalHealthInfo: '',
        displayAdditionalHealthInfo: false,
        locked: true
      }
    ],
    guardianList: [
      {
        id: 1,
        name: '',
        relationToChild: '',
        streetAddress: '',
        phone: '',
        email: '',
        companyName: '',
        companyAddress: '',
        companyPhone: '',
        isPrimaryContact: false,
        isBillingContact: false,
        locked: true

      }
    ],
    approvedAdultList: [],
    primaryContact: 1,
    schoolDistrict: null,
    schoolDistrictOther: '',
    wantsBusService: false,
    beforeCareNeeded: false,
    beforeCareDays: [],
    afterCareNeeded: false,
    afterCareDays: [],

    directoryFamilyNames: '',
    directoryParentGuardianNames: '',
    directoryChildrenNames: '',
    directoryPhone: '',
    directoryAddress: '',
    directoryEmails: '',
    directoryOptOut: false,

    mySignature: ''
  }

  /* Tution Calculator */
  calcTotal = () => {
    console.log('calcTotal ------');
    const tuitionEstimate = 0;
    this.setState({ tuitionEstimate });
  }

  /**
   * Child Form Fields
   */
  handleChildAdd = () => {
    this.setState(
      state => ({
        childList: state.childList.concat({ id: genRandId() })
      }), this.calcTotal
    );
  }

  handleChildRemove = (id) => {
    this.setState({
      childList: this.state.childList.filter(item => item.id !== id)
    }, () => {
      this.calcTotal();
    });
  }

  handleChildName = (id, name) => {
    const items = this.state.childList.slice();
    const index = items.findIndex(x => x.id === id);
    items[index] = { ...items[index], name };
    this.setState({ childList: items });
  }

  handleChildDobMonth = (id, dobMonth) => {
    console.log('dobMonth ------', dobMonth);
    const items = this.state.childList.slice();
    const index = items.findIndex(x => x.id === id);
    items[index] = { ...items[index], dobMonth };
    this.setState({ childList: items });
  }

  handleChildDobDay = (id, birthDate) => {
    const items = this.state.childList.slice();
    const index = items.findIndex(x => x.id === id);
    items[index] = { ...items[index], birthDate };
    this.setState({ childList: items });
  }

  handleChildDobYear = (id, birthDate) => {
    const items = this.state.childList.slice();
    const index = items.findIndex(x => x.id === id);
    items[index] = { ...items[index], birthDate };
    this.setState({ childList: items });
  }

  handleChildDobClear = (id, birthDate) => {
    console.log('clear');
  }

  handleChildAllergyAlert = (id, allergyAlert) => {
    const items = this.state.childList.slice();
    const index = items.findIndex(x => x.id === id);
    items[index] = { ...items[index], allergyAlert };
    this.setState({ childList: items });
  }

  handleChildHealthConditions = (id, healthConditions) => {
    const items = this.state.childList.slice();
    const index = items.findIndex(x => x.id === id);
    items[index] = { ...items[index], healthConditions };
    this.setState({ childList: items });
  }

  handleChildAdditionalHealthInfo = (id, additionalHealthInfo) => {
    const items = this.state.childList.slice();
    const index = items.findIndex(x => x.id === id);
    items[index] = { ...items[index], additionalHealthInfo };
    this.setState({ childList: items });
  }

  /**
   * Guardian List Fields
   */
  handleGuardianAdd = () => {
    this.setState(
      state => ({
        guardianList: state.guardianList.concat({ id: genRandId() })
      }), this.calcTotal
    );
  }

  handleGuardianRemove = (id) => {
    this.setState({
      guardianList: this.state.guardianList.filter(item => item.id !== id)
    }, () => {
      this.calcTotal();
    });
  }

  handleGuardianName = (id, name) => {
    const items = this.state.guardianList.slice();
    const index = items.findIndex(x => x.id === id);
    items[index] = { ...items[index], name };
    this.setState({ guardianList: items });
  }

  handleGuardianRelationToChild = (id, name) => {
    const items = this.state.guardianList.slice();
    const index = items.findIndex(x => x.id === id);
    items[index] = { ...items[index], name };
    this.setState({ guardianList: items });
  }

  handleGuardianEmail = (id, name) => {
    const items = this.state.guardianList.slice();
    const index = items.findIndex(x => x.id === id);
    items[index] = { ...items[index], name };
    this.setState({ guardianList: items });
  }

  handleGuardianPhone = (id, name) => {
    const items = this.state.guardianList.slice();
    const index = items.findIndex(x => x.id === id);
    items[index] = { ...items[index], name };
    this.setState({ guardianList: items });
  }

  handleGuardianStreetAddress = (id, name) => {
    const items = this.state.guardianList.slice();
    const index = items.findIndex(x => x.id === id);
    items[index] = { ...items[index], name };
    this.setState({ guardianList: items });
  }

  handleGuardianDisplayInDirectory = (id, name) => {
    const items = this.state.guardianList.slice();
    const index = items.findIndex(x => x.id === id);
    items[index] = { ...items[index], name };
    this.setState({ guardianList: items });
  }


  /**
   * School District Field
   */
  handleChangeSchoolDistrict = (e) => (
    this.setState({ schoolDistrict: parseInt(e.target.value, 10) })
  )

  handleOtherSchoolDistrict = (e) => (
    this.setState({ schoolDistrictOther: e.target.value })
  )

  /**
   * Approved Adult List Fields
   */
 handleApprovedAdultAdd = () => {
   this.setState(
     state => ({
       approvedAdultList: state.approvedAdultList.concat({ id: genRandId() })
     }), this.calcTotal
   );
 }

 handleApprovedAdultRemove = (id) => {
   this.setState({
     approvedAdultList: this.state.approvedAdultList.filter(item => item.id !== id)
   }, () => {
     this.calcTotal();
   });
 }

 handleApprovedAdultName = (id, name) => {
   const items = this.state.approvedAdultList.slice();
   const index = items.findIndex(x => x.id === id);
   items[index] = { ...items[index], name };
   this.setState({ approvedAdultList: items });
 }


 handleDisplayAdditionalHealthInfo = () => (
   this.setState({ displayAdditionalHealthInfo: true })
 )

  render() {
    const {
      childList,
      guardianList,
      schoolDistrict,
      approvedAdultList,
      displayAdditionalHealthInfo,
      beforeCareNeeded,
      wantsBusService,
      schoolDistrictOther
    } = this.state;
    return (
      <BasicContainer>
        <Row>
          <Col md={10} mdOffset={1}>

            <h1 className="center">
              2018-2019 Family Information Sheet
            </h1>

            <h3>
              Child Information
            </h3>

            <ChildcareChildForm
              items={childList}
              handleAdd={this.handleChildAdd}
              handleRemove={this.handleChildRemove}
              handleName={this.handleChildName}
              handleAge={this.handleChildAge}
              handleDobMonth={this.handleChildDobMonth}
              handleDobDay={this.handleChildDobDay}
              handleDobYear={this.handleChildDobYear}
              handleDobClear={this.handleChildDobClear}
              handleDisplayAdditionalHealthInfo={this.handleDisplayAdditionalHealthInfo}
              displayAdditionalHealthInfo={displayAdditionalHealthInfo}
            />

            <hr />

            <h3 className="top-30">
              Parent/Gubardian Information
            </h3>

            <GuardianFormset
              items={guardianList}
              handleAdd={this.handleGuardianAdd}
              handleRemove={this.handleGuardianRemove}
              handleName={this.handleGuardianName}
              handleRelationToChild={this.handleGuardianRelationToChild}
              handleEmail={this.handleGuardianEmail}
              handlePhone={this.handleGuardianPhone}
              handleStreetAddress={this.handleGuardianStreetAddress}
              handleDisplayInDirectory={this.handleGuardianDisplayInDirectory}
            />

            {(this.state.guardianList.length > 1)
              && [
                <ControlLabel>
                  If the teacher should need to contact a parent(s) or guardian(s), WHO should be contacted first?
                </ControlLabel>,
                <select className="form-control" style={{ maxWidth: 240 }}>
                  {_.map(this.state.guardianList, guardian => (
                    <option key={guardian.id}>
                      {guardian.name}
                    </option>
                  ))}
                </select>,

                <ControlLabel>
                  To which email address should billing be sent to ?
                </ControlLabel>,
                <select className="form-control" style={{ maxWidth: 240 }}>
                  {_.map(this.state.guardianList, guardian => (
                    <option key={guardian.id}>
                      {guardian.email}
                    </option>
                  ))}
                </select>
              ]
            }

            <hr />

            <h3 className="top-30">
              Transportation
            </h3>

            <ControlLabel>
              Which school district is listed in your tax bill?
            </ControlLabel>

            <select
              className="form-control"
              style={{ maxWidth: 240 }}
              onChange={this.handleChangeSchoolDistrict}
              defaultValue={0}
            >
              <option value={0} disabled>
                Select You School District
              </option>
              {_.map(schoolDistrictList, school => (
                <option key={school.id} value={school.id}>
                  {school.name}
                </option>
              ))}
              <option value={99}>
                Other...
              </option>
            </select>

            {schoolDistrict === 99
              && (
                <FormControl
                  type="text"
                  onChange={this.handleOtherSchoolDistrict}
                  value={schoolDistrictOther}
                  placeholder="Name of your school or district"
                  style={{ marginTop: 10, maxWidth: 240 }}
                />
              )
            }

            {schoolDistrict === 3
              && (
                <Checkbox
                  checked={wantsBusService}
                  onClick={() => this.setState({
                    wantsBusService: !wantsBusService
                  })}
                >
                  Request Transportation by Your School District for children 4 years and older.
                </Checkbox>
              )
            }

            <hr />

            <h3 className="top-30">
              Approved Adults for Pickup/Transport
            </h3>

            The following people (other than parents/guardians) are allowed to pick-up/transport my child if I/we cannot or in the event of emergency: No one can be added later to this list without a signature from both parents/guardians.

            <ApprovedAdultListForm
              items={approvedAdultList}
              handleAdd={this.handleApprovedAdultAdd}
              handleRemove={this.handleApprovedAdultRemove}
              handleName={this.handleApprovedAdultName}
            />

            <hr />

            <h3 className="top-30">
              Before/After Childcare
            </h3>

            <Checkbox
              checked={beforeCareNeeded}
              onClick={() => (
                this.setState({ beforeCareNeeded: !beforeCareNeeded })
              )}
            >
              Before School Care Needed (7:30-8:30am)
            </Checkbox>

            {beforeCareNeeded
              && (
                <FormGroup style={{ marginLeft: 20 }}>
                  <Checkbox inline>Monday</Checkbox>
                  <Checkbox inline>Tuesday</Checkbox>
                  <Checkbox inline>Wednesday</Checkbox>
                  <Checkbox inline>Thursday</Checkbox>
                  <Checkbox inline>Friday</Checkbox>
                </FormGroup>
              )
            }

            <Checkbox checked={this.state.afterCareNeeded} onClick={() => this.setState({ afterCareNeeded: !this.state.afterCareNeeded })}>
              After School Care Needed (This is for full day students only)
            </Checkbox>

            {this.state.afterCareNeeded
              && [
                <FormGroup style={{ marginLeft: 20 }}>
                  <Checkbox inline>Monday</Checkbox>
                  <Checkbox inline>Tuesday</Checkbox>
                  <Checkbox inline>Wednesday</Checkbox>
                  <Checkbox inline>Thursday</Checkbox>
                  <Checkbox inline>Friday</Checkbox>
                </FormGroup>,
                <FormGroup style={{ marginLeft: 20 }}>
                  Pick up time:{' '}
                  <Radio name="radioGroup" inline style={{ marginLeft: 5 }}>
                    3:30 p.m.
                  </Radio>{' '}
                  <Radio name="radioGroup" inline>
                    4:00 p.m.
                  </Radio>{' '}
                  <Radio name="radioGroup" inline>
                    4:30 p.m.
                  </Radio>{' '}
                  <Radio name="radioGroup" inline>
                    5:00 p.m
                  </Radio>
                </FormGroup>

              ]
            }

            <hr />

            <h3 className="top-30">
              Student Directory Information
            </h3>

            This information is only circulated among our families for school related activities.

            <FormGroup>
              <Radio name="radioGroup" checked={!this.state.directoryOptOut} onClick={() => this.setState({ directoryOptOut: false })}>
                Yes, include our basic/ contact information in the student directory
              </Radio>
              {' '}
              <Radio name="radioGroup" checked={this.state.directoryOptOut} onClick={() => this.setState({ directoryOptOut: true })}>
                No, I do not want our information in the student directory.
              </Radio>
            </FormGroup>

          </Col>
        </Row>
        <Row>
          <Col md={10} mdOffset={1}>
            <hr />
            <Button bsStyle="success" bsSize="lg">
              Submit
            </Button>
          </Col>
        </Row>
      </BasicContainer>
    );
  }
}

export default FamilyRegistrationForm;

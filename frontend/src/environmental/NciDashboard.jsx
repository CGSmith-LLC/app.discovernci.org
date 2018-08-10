import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import {
  Row, Col, Button, ListGroup, ListGroupItem
} from 'react-bootstrap';

import { getQueryParams } from '../utils';
import BasicContainer from '../base/BasicContainer';
import NciDashboardParent from './NciDashboardParent';
import NciDashboardTeacher from './NciDashboardTeacher';
import NciDashboardModalUpdateMyProfile from './MyNciProfile';
import NciTechSupportModal from './NciTechSupportModal';

import imgLoader from '../loader.svg';

class NciDashboardContainer extends React.Component {
  static propTypes = {
    schoolList: PropTypes.shape({
      schools: PropTypes.array
    }).isRequired,
    myAccountQuery: PropTypes.shape({
      me: PropTypes.shape({
        email: PropTypes.string,
        accountType: PropTypes.string
      })
    }).isRequired
  };

  state = {
    showMyProfile: false,
    showTechSupport: false
  };

  openMyProfile = () => this.setState({ showMyProfile: true });

  closeMyProfile = () => this.setState({ showMyProfile: false });

  openTechSupport = () => this.setState({ showTechSupport: true });

  closeTechSupport = () => this.setState({ showTechSupport: false });

  render() {
    const { me } = this.props.myAccountQuery;

    const isNciMontessori = me
      && _.some(me.assocSchoolList, { slug: 'natures-classroom-montessori' });

    return (
      <BasicContainer>

        {me
          ? (
            <span>
              <Row>

                <Col md={10} mdOffset={1} className="center bottom-30">

                  <h2>
                    My NCI Dashboard
                  </h2>

                  <Button onClick={this.openMyProfile}>
                    <FontAwesome name="edit" fixedWidth />
                    {' '}
                    Edit My Profile
                  </Button>
                  {' '}

                  <Button onClick={() => this.openTechSupport()}>
                    <FontAwesome name="question-circle" fixedWidth />
                    {' '}
                    Help / Support
                  </Button>
                  {' '}

                  {me.accountType === 'EE_STAFF'
                    && (
                      <a href="/app" className="btn btn-default">
                        NCI App
                        {' '}
                        <FontAwesome name="external-link" fixedWidth />
                      </a>
                    )
                  }
                  {' '}

                  <a className="btn btn-default" href="/logout">
                    Logout ({me.email})
                  </a>
                  {' '}

                  <NciDashboardModalUpdateMyProfile
                    showMyProfile={this.state.showMyProfile}
                    closeMyProfile={this.closeMyProfile}
                    me={me}
                  />

                  <NciTechSupportModal
                    showModal={this.state.showTechSupport}
                    handleCloseModal={this.closeTechSupport}
                  />

                </Col>
              </Row>

              <Row>

                <Col md={isNciMontessori ? 7 : 10} mdOffset={1}>
                  {(me.accountType === 'PARENT' || me.accountType === 'EE_STAFF')
                   && <NciDashboardParent data={me} schoolList={this.props.schoolList} />
                  }

                  {me.accountType === 'TEACHER'
                    && <NciDashboardTeacher me={me} schoolList={this.props.schoolList} />
                  }
                </Col>


                {getQueryParams().preview
                  && isNciMontessori
                    && (
                      <Col md={4}>
                        <h4>
                          NCI Montessori School Forms
                        </h4>
                        The following is a list of forms commonly used and referenced. Please keep your records as up-to-date as possible.
                        <ListGroup className="foobar" style={{ marginTop: 15, width: 300 }}>
                          <ListGroupItem href="/forms/additional-permissions" header="Additional Permissions">Permission to attend Field Trips, Computer usage, Kitchen equipment...</ListGroupItem>
                          <ListGroupItem href="/forms/application-for-admission" header="Application for Admission">For new students wishing to attend NCIM</ListGroupItem>
                          <ListGroupItem href="/forms/childrens-house-medication-authorization" header="Authorization for Medication">For Children's House Students</ListGroupItem>
                          <ListGroupItem href="/forms/before-after-care" header="Before/After Childcare">Submit a new before/after care request</ListGroupItem>
                          <ListGroupItem href="/forms/immunization-record" header="Immunization Record Form">Enter your Childs required immunization records</ListGroupItem>
                          <ListGroupItem href="/forms/medical-exam-for-entrance" header="Medical Examination for Entrance into School">To be completed by family physician</ListGroupItem>
                          <ListGroupItem href="/forms/emergency-info-medication-authorization" header="Emergency Information and Medical Authorization">We use this information in the unlikely case of an emergency</ListGroupItem>
                          <ListGroupItem href="/forms/family-information" header="Family Information Form">General Information, Including Transportion preferences</ListGroupItem>
                          <ListGroupItem href="/forms/volunteer-log" header="Volunteer Hour Log">Enter and keep track of your NCI volunteer hours</ListGroupItem>
                        </ListGroup>
                      </Col>
                    )
                }

              </Row>

            </span>
          )
          : <Row>
            <Col md={12} className="center">
              <span>
                <img src={imgLoader} alt="" style={{ width: 32, marginTop: 80 }} />
                <div style={{ marginTop: 30 }}>Not loading? Try <a href="/logout">logging out</a> and back in.</div>
              </span>
            </Col>
          </Row>
        }

      </BasicContainer>
    );
  }
}

const SCHOOL_LIST = gql`
  {
    schools {
      id
      name,
      schoolType
    }
  }`;
const MY_ACCOUNT_QUERY = gql`
  query MyAccountQuery {
    me {
      id
      name
      email
      title
      accountType
      phone
      bio
      assocSchoolList {
        id
        slug
      }
      studentSet {
        id
        name
        firstName
        dob
        getClassroomDisplay
        hasAllergies
        hasFoodAllergens
        allergenCount
        foodAllergenCount
        classroom
        modified
        photoWaiver
        currentSchool {
          id
          name
        }
        insuranceDependentsList {
          id
          companyName
        }
        medicalrecord {
          id
          getNonRxTypeDisplay
          nonRxType
          nonRxNotes
          lastTetanus
          noTetanusVaccine
          restrictions
          allergies
          allergiesExpanded
          foodAllergens
          recentTrauma
          dietaryNeeds
          gender
          weight
          height
          modified
          guardianSuppliesFood
          medicationSet {
            id
            administrationTimes
            administrationTimesOther
            medicationName
            amount
            amountHuman
            amountUnit
            getAmountUnitDisplay
            notes
          }
        }
      }
      insuranceSet {
        id
        companyName
        holderName
        policyNum
        groupNum
        modified
        dependentsList {
          id
          firstName
        }
      }
    }
  }`;

const NciDashboard = compose(
  graphql(SCHOOL_LIST, { name: 'schoolList' }),
  graphql(MY_ACCOUNT_QUERY, {
    name: 'myAccountQuery',
    options: {
      pollInterval: 2000
    }
  })
)(NciDashboardContainer);

export default NciDashboard;

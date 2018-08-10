import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
// import { ButtonGroup, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import Moment from 'react-moment';
import moment from 'moment';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router';

// import NciAppAddMedication from './NciAppAddMedication';

class NciAppStudentDetailContainer extends React.Component {

  static propTypes = {
    checkInMedication: PropTypes.func.isRequired
  }

  static defaultProps = {}

  state = {
    showAddMedication: false
  }

  componentWillMount() {
    document.body.style.background = '#fff';
  }

  getAllergy = (id) => {
    const allergy = {
      1: function () { return { id: 1, value: 'Food Allergy' }; },
      2: function () { return { id: 2, value: 'Skin Allergy' }; },
      3: function () { return { id: 3, value: 'Dust Allergy' }; },
      4: function () { return { id: 4, value: 'Insect Sting Allergy' }; },
      5: function () { return { id: 5, value: 'Pet Allergies' }; },
      6: function () { return { id: 6, value: 'Eye Allergy' }; },
      7: function () { return { id: 7, value: 'Drug Allergies' }; },
      8: function () { return { id: 8, value: 'Allergic Rhinitis (hay fever)' }; },
      9: function () { return { id: 9, value: 'Latex Allergy' }; },
      10: function () { return { id: 10, value: 'Mold Allergy' }; },
      11: function () { return { id: 11, value: 'Pollen Allergy' }; },
      12: function () { return { id: 12, value: 'Sinus Infection' }; },
      13: function () { return { id: 13, value: 'Other (please specify)' }; }
    };
    return (allergy[id]() || allergy[0]());
  }

  getAdminTime = (id) => {
    const timeOfDay = {
      1: function () { return { id: 1, value: 'Breakfast' }; },
      2: function () { return { id: 2, value: 'Lunch' }; },
      3: function () { return { id: 3, value: 'Dinner' }; },
      4: function () { return { id: 4, value: 'Bedtime' }; },
      5: function () { return { id: 5, value: 'Other...' }; }
    };
    return (timeOfDay[id]() || timeOfDay[0]());
  }

  handleCheckInMedication = (medicationId) => {
    const i = this;
    // console.log(medication)
    this.props.checkInMedication({
      variables: { id: medicationId }
    }).then(({ data }) => {
      console.log('success: ', data.checkInMedication.success)
      i.setState({
        success: data.checkInMedication.success,
        err: null
      });
    }).catch((error) => {
      console.log('could not check-in medication')
      // i.setState({ err: 'Error removing record' });
    });
  }

  render() {
    const student = this.props.data.student && this.props.data.student;
    return (
      <div className="nciapp-fieldtrip-detail">
        {this.props.data.loading
          ? <span>Loading student trip details...</span>
          : this.props.data.error
            ? <span>{String(this.props.data.error.message).replace('GraphQL error:', '')}</span>
            : <span>

            <div className="nci-navbar-header">
              <div className="nci-navbar-header-back">
                <button onClick={() => window.history.back()} style={{ background: 'none', padding: 0, border: 'none' }}>
                  <FontAwesome name="chevron-left" fixedWidth />{' '}Back
                </button>
              </div>
              <div className="nci-navbar-header-title">
                <h2>Student Profile {student.hasAllergies === 'true' && <FontAwesome name="exclamation-triangle" style={{ color: '#FECB2F', marginRight: 10 }} />}</h2>
              </div>
              <div className="nci-navbar-header-share">
                {/* <a href=""><FontAwesome name="share-square-o" fixedWidth /></a> */}
              </div>
            </div>

            <div className="student-profile-header">
              <div className="profile-photo-fa">
                <FontAwesome name="user-circle" />
              </div>
              <h2>{student.name}</h2>
              <p style={{ marginBottom: 10 }}><a href="">{student.currentSchool.name} <FontAwesome name="arrow-circle-right" /></a></p>
              <button className="outline-btn" style={{ marginRight: 8 }}><FontAwesome name="phone" /> Call Primary Contact</button> <button className="outline-btn"><FontAwesome name="pencil" /> Add Note</button>
            </div>

            <ul className="display-list">
              <li>Age <span className="pull-right">{moment().diff(student.dob, 'years')}</span></li>
              <li>Birthday <span className="pull-right"><Moment date={student.dob} format="MMMM Do, YYYY" /></span></li>
              {student.medicalrecord && <li>Weight <span className="pull-right">{student.medicalrecord.weight} <span style={{ color: '#939393' }}>lbs</span></span></li>}
              {student.medicalrecord && <li>Height <span className="pull-right">{student.medicalrecord.height}</span></li>}
              {student.medicalrecord && <li>Gender <span className="pull-right">{student.medicalrecord.getGenderDisplay}</span></li>}
            </ul>

            <div style={{ marginBottom: 7, fontWeight: 'bold', fontSize: '1.1em', padding: 10, background: '#3F7FB3', color: 'white' }}>
              Parents / Guardians
            </div>

            <ul className="display-list">
              {_.map(student.guardianList, guardian => (
                <li key={guardian.id}>
                  <Link to={`/app/guardian/${guardian.id}`}>
                    {guardian.name}
                  </Link>
                  <span className="pull-right">
                    {guardian.phone && <a href="tel:{guardian.phone}">{guardian.phone}</a>}{' '}
                    <FontAwesome name="angle-right" style={{ lineHeight: 0, fontSize: '1.8em', position: 'relative', top: 3, left: 7 }} />
                  </span>
                </li>
              ))}
            </ul>

            <div className="display-list-header">
              Dietary Preferences
            </div>

            {student.medicalrecord &&
              <ul className="display-list">
                <li>Restrictions
                  <span className="pull-right">
                    {student.medicalrecord.dietaryNeeds ? 'Yes' : 'None'}
                  </span>
                  {student.medicalrecord.dietaryNeeds &&
                    <div className="allergies-expanded" style={{ marginTop: 10 }}>
                      {student.medicalrecord.dietaryNeeds}
                    </div>
                  }
                </li>
                <li>Guardian supplies meals <span className="pull-right">{student.medicalrecord.guardianSuppliesFood}</span></li>
              </ul>
            }

            <div className="display-list-header">
              Medical
            </div>

            {student.medicalrecord
              ? <ul className="display-list">
                <li>OTC Pain Relief <span className="pull-right">{student.medicalrecord.getNonRxTypeDisplay}</span></li>
                <li>OTC Notes / Instructions
                  {student.medicalrecord.nonRxNotes ? <div className="non-rx-notes">{student.medicalrecord.nonRxNotes}</div> : <span className="pull-right">None</span>}
                </li>
                <li>Last Tetanus <span className="pull-right"><Moment date={student.medicalrecord.lastTetanus} format="L" /></span></li>
                {parseInt(student.allergenCount, 10) > 0
                  ? <li>Allergies <span className="pull-right">{student.allergenCount}</span>

                    <ul className="allergy-list">
                      {_.map(JSON.parse(student.medicalrecord.allergies), allergy => (
                        <li key={this.getAllergy(allergy).id}>
                          {this.getAllergy(allergy).value}
                          {this.getAllergy(allergy).id === 1 && <div style={{ fontSize: '0.9em', color: '#717171', marginLeft: 10, fontWeight: 'bold' }}><i>{student.medicalrecord.getFoodAllergensDisplay}</i></div>}
                        </li>
                      ))}
                    </ul>

                    {student.medicalrecord.allergiesExpanded &&
                      <div className="allergies-expanded">{student.medicalrecord.allergiesExpanded}</div>
                    }
                  </li>
                  : <li>Allergies <span className="pull-right">None</span></li>
                }

                <li><Link to={`/app/student/${student.id}/waiver`}><FontAwesome name="print" fixedWidth /> Print Waiver</Link></li>

              </ul>
              : <ul className="display-list">
                <li><span style={{ color: '#d74026' }}>No Medical Record information on-file</span> <span className="pull-right"><FontAwesome name="exclamation-triangle" style={{ color: '#FECB2F' }} /></span></li>
              </ul>
            }

            <div className="display-list-header">
              Medications
            </div>

            <ul className="display-list">
              {student.medicalrecord && student.medicalrecord.medicationSet.length > 0
                ? _.map(student.medicalrecord.medicationSet, med => (
                  <li key={med.id} className="medication-item">

                    <span className="pull-right">
                      <FontAwesome name="angle-right" style={{ color: '#ababab', fontSize: '1.1em' }} />
                    </span>

                    {med.inPossession === true && <FontAwesome name="check-circle" fixedWidth style={{ color: '#62B664' }} />}{' '}
                    {med.medicationName}{' '}
                    {(_.isNil(med.getAdministrationTimesDisplay) || med.getAdministrationTimesDisplay !== 'Other...') &&
                      <span style={{ color: '#c1bdbd', fontSize: '0.87em', paddingLeft: 5 }}>{med.amount !== 0 && med.amount}{' '}{med.amount !== 0 && med.getAmountUnitDisplay} at {med.getAdministrationTimesDisplay && med.getAdministrationTimesDisplay !== 'Other...' && med.getAdministrationTimesDisplay}</span>
                    }

                  </li>
                ))
                : <li className="">No medications on-file</li>
              }
              <li><Link to={`/app/student/${student.id}/add-medication`} ><FontAwesome name="plus" fixedWidth /> Add New Medication</Link></li>
            </ul>

            {student && student.studentnoteSet.length > 0 &&
              <div style={{ marginTop: 20, marginLeft: 35, marginBottom: 20 }}>
                <strong style={{ marginBottom: 0, display: 'block', color: '#a8a795', textTransform: 'uppercase' }}>Notes / Indicent Response</strong>
                {_.map(student.studentnoteSet, note => (
                  <ul key={note.id} className="student-note">
                    <li>{note.staff.name} <span style={{ color: '#9d9d9d' }}><Moment date={note.created} fromNow /></span></li>
                    <li style={{ marginLeft: 15, marginTop: 10 }}>{note.note}</li>
                  </ul>
                ))}
              </div>
            }

          </span>
        }
      </div>
    );
  }
}

const STUDENT_DETAIL = gql`
  query StudentDetail($id: Int!) {
    student(id: $id) {
      id
      name
      lastName
      dob
      hasAllergies
      hasFoodAllergens
      allergenCount
      currentSchool {
        id
        name
      }
      medicalrecord {
        id
        getNonRxTypeDisplay
        nonRxNotes
        restrictions
        weight
        height
        getGenderDisplay
        allergies
        getAllergiesDisplay
        allergenCount
        foodAllergenCount
        allergiesExpanded
        foodAllergens
        getFoodAllergensDisplay
        dietaryNeeds
        recentTrauma
        guardianSuppliesFood
        medicationSet {
          id
          medicationName
          amount
          amountUnit
          getAmountUnitDisplay
          administrationTimes
          getAdministrationTimesDisplay
          administrationTimesOther
          inPossession
          notes
        }
      }
      guardianList {
        id
        name
        phone
        email
      }
      studentnoteSet {
        id
        note
        created
        modified
        staff {
          id
          name
        }
      }
    }
  }`;
const CHECK_IN_MEDICATION = gql`
  mutation CheckInMedication($id: Int!) {
    checkInMedication(id: $id) {
      success
    }
  }`;
const SAVE_MEDICATION = gql`
  mutation SaveMedication(
    $studentId: Int!
    $medicationName: String!
    $medicationId: Int
    $amount: Int!
    $amountUnit: Int!
    $administrationTimes: [Int]
    $administrationTimesOther: String
    $notes: String
  ) {
    saveMedication(
      studentId: $studentId
      medicationName: $medicationName
      medicationId: $medicationId
      amount: $amount
      amountUnit: $amountUnit
      administrationTimes: $administrationTimes
      administrationTimesOther: $administrationTimesOther
      notes: $notes
    ) {
      medication {
        id
        medicationName
        amount
        amountUnit
        administrationTimes
        administrationTimesOther
        getAmountUnitDisplay
        notes
        modified
      }
    }
  }`;

const NciAppStudentDetail = compose(
  graphql(STUDENT_DETAIL, {
    options: ownProps => ({
      pollInterval: 2000,
      variables: {
        id: ownProps.params.id
      }
    })
  }),
  graphql(CHECK_IN_MEDICATION, { name: 'checkInMedication' }),
  graphql(SAVE_MEDICATION, { name: 'saveMedication' }),
)(NciAppStudentDetailContainer);

export default NciAppStudentDetail;

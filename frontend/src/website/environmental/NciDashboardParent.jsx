import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import {
  Row, Col, Button, Modal, Table
} from 'react-bootstrap';

import FieldTripTable from './FieldTripTable';
import StudentForm from './StudentForm';

import NciDashboardModalAddStudent from './NciDashboardModalAddStudent';
import NciDashboardModalAddInsurance from './NciDashboardModalAddInsurance';

export default class NciDashboardParent extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      insuranceSet: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          companyName: PropTypes.string,
          modified: PropTypes.string,
          dependentsList: PropTypes.arrayOf(
            PropTypes.shape({
              firstName: PropTypes.string
            })
          )
        })
      ),
      studentSet: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          firstName: PropTypes.string,
          dob: PropTypes.string,
          getClassroomDisplay: PropTypes.string,
          hasAllergies: PropTypes.string,
          allergenCount: PropTypes.number,
          hasFoodAllergens: PropTypes.string,
          foodAllergenCount: PropTypes.number,
          medicalrecord: PropTypes.object
        })
      )
    }).isRequired,
    schoolList: PropTypes.shape({
      loading: PropTypes.bool,
      schools: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string
        })
      )
    }).isRequired
  }

  state = {
    showAddInsurance: false,
    showAddStudent: false,
    selectedstudentObj: null,
    selectedInsuranceObj: null
  };

  openStudentFormModal = studentObj => this.setState({
    showStudentFormModal: true,
    selectedstudentObj: studentObj
  });

  closeStudentFormModal = () => this.setState({
    showStudentFormModal: false,
    selectedstudentObj: null
  });

  openAddStudent = studentObj => this.setState({
    showAddStudent: true,
    selectedstudentObj: studentObj
  });

  closeAddStudent = () => this.setState({
    showAddStudent: false,
    selectedstudentObj: null
  });

  openAddInsurance = insuranceObj => this.setState({
    showAddInsurance: true,
    selectedInsuranceObj: insuranceObj
  });

  closeAddInsurance = () => this.setState({
    showAddInsurance: false,
    selectedInsuranceObj: null
  });

  render() {
    const studentSet = this.props.data && this.props.data.studentSet;

    return (
      <div>

        <h3>
          Upcoming Field Trips
        </h3>

        <FieldTripTable />

        <span>
          <h3 style={{ marginTop: 40, marginBottom: 15 }}>
            My {studentSet.length > 1 ? 'Children' : 'Child'}
            <Button bsStyle="default" onClick={() => this.openStudentFormModal()} style={{ marginLeft: 10, fontFamily: 'sans-serif' }}>
              <FontAwesome name="user-plus" fixedWidth /> Add Child
            </Button>
          </h3>

          <div style={{ margin: '15px 0', padding: 10, background: '#fff6b5' }}>
            If you have any specific questions about your child’s stay please contact their teacher directly.
          </div>

          {studentSet.length > 0 &&
            <ul className="parent-child-list">
              {_.map(studentSet, student => (
                student.isActive && (
                  <li key={student.id}>
                    <span className="avatar"><FontAwesome name="user-circle" /></span>
                    <span className="name">{student.firstName}</span>
                    <span className="subline">{moment().diff(student.dob, 'years')} y/o • <span className="classroom">{student.getClassroomDisplay}</span></span>
                    <ul style={{ marginTop: 15, display: 'block' }}>
                      {student.hasAllergies === 'true' && <li><strong>{student.allergenCount}</strong> Allergies</li>}
                      {(student.foodAllergenCount > 0) && <li><strong>{student.foodAllergenCount}</strong> Food Allergens</li>}
                      {student.medicalrecord.medicationSet.length > 0 && <li><strong>{student.medicalrecord.medicationSet.length}</strong> Medications</li>}
                    </ul>
                    <span className="foot">
                      <Button bsStyle="default" onClick={() => this.openStudentFormModal(student)}>
                        <FontAwesome name="pencil-square-o" fixedWidth /> Update
                      </Button>
                    </span>
                  </li>
                )
              ))}
            </ul>
          }
        </span>

        <NciDashboardModalAddStudent
          onHide={this.closeAddStudent}
          showAddStudent={this.state.showAddStudent}
          schoolList={this.props.schoolList}
          studentObj={this.state.selectedstudentObj ? this.state.selectedstudentObj : {}}
        />

        {this.state.showStudentFormModal &&
          <Modal
            show={this.state.showStudentFormModal}
            onHide={this.closeStudentFormModal}
            backdrop="static"
            className="student-form-modal"
            animation={false}
          >
            <Modal.Body>
              <StudentForm
                closeModal={this.closeStudentFormModal}
                schoolList={this.props.schoolList}
                selectedstudentObj={this.state.selectedstudentObj}
              />
            </Modal.Body>
          </Modal>
        }

        <Row>
          <Col md={12}>

            <h3 style={{ marginTop: 40, marginBottom: 15 }}>
              Health Insurance
            </h3>

            <Table striped hover>
              <thead>
                <tr>
                  <th>Insurance Provider</th>
                  <th>Who&apos;s Covered</th>
                  <th>Last updated</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {!_.isEmpty(this.props.data.insuranceSet)
                  && _.map(this.props.data.insuranceSet, insurance => (
                  <tr key={insurance.id}>
                    <td>
                      {insurance.companyName}
                    </td>
                    <td>
                      {insurance.dependentsList.length > 0 &&
                        _.map(insurance.dependentsList, (dependent, index) => {
                          const comma = insurance.dependentsList.length === (index + 1) ? '' : ',';
                          return `${dependent.firstName}${comma} `;
                        })
                      }
                    </td>
                    <td>
                      {moment(insurance.modified).fromNow()}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <Button
                        onClick={() => this.openAddInsurance(insurance)}
                        bsStyle="default"
                      >
                        <FontAwesome name="pencil-square-o" />
                        {' '}
                        Update
                      </Button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={3} />
                  <td style={{ textAlign: 'right' }}>
                    <Button bsStyle="default" onClick={() => this.openAddInsurance()} style={{ marginLeft: 10, fontFamily: 'sans-serif' }}>
                      <FontAwesome name="plus" fixedWidth />
                      {' '}
                      Add Insurance
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>

            <NciDashboardModalAddInsurance
              onHide={this.closeAddInsurance}
              showAddInsurance={this.state.showAddInsurance}
              dependentsList={this.props.data.studentSet}
              instanceObj={this.state.selectedInsuranceObj && this.state.selectedInsuranceObj}
            />
          </Col>

        </Row>
      </div>
    );
  }
}

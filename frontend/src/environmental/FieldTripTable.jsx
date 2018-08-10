import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import Moment from 'react-moment';
import moment from 'moment';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Table, Button, Label } from 'react-bootstrap';

class FieldTripTableContainer extends React.Component {

  static propTypes = {
    fieldTripRegistration: PropTypes.func.isRequired,
    myFieldTrips: PropTypes.shape({
      myFieldTrips: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
          regStartDate: PropTypes.string,
          regEndDate: PropTypes.string,
          startDate: PropTypes.string,
          endDate: PropTypes.string,
          location: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            address: PropTypes.string,
            factSheetFile: PropTypes.string,
            floorPlanFile: PropTypes.string,
            foodMenuFile: PropTypes.string
          })
        })
      )
    }).isRequired,
    myStudents: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
      })
    ).isRequired
  }

  state = {
    fieldTripId: null,
    showFieldTripDetail: false
  };

  handleRegisterStudent = bundle => {
    const i = this;
    this.props.fieldTripRegistration({
      variables: bundle
    })
      .then(({ data }) => {
        // console.log('handleSubmit addMedical data @@@@@@@@@@', data);
        i.setState({ success: data.success });
      }).catch((error) => {
        i.setState({ err: 'Unable to register student at this time. Try again later.' });
        // console.log('error @@@@@@@@@@', error);
      });
  }

  render() {
    // console.log('FieldTripTableContainer props @@@@', this.props);
    // console.log('FieldTripTableContainer state @@@@', this.state);

    // const todaysDate = moment(new Date());

    const myFieldTrips = this.props.myFieldTrips.myFieldTrips;
    const myStudents = this.props.myStudents;

    return (
      myFieldTrips && (myFieldTrips.length > 0)
        ? <div>

          <Table>
            <tbody>

              {myFieldTrips
                ? _.map(myFieldTrips, fieldtrip => (
                  <tr key={fieldtrip.id}>

                    <td>
                      <span className="caplabel">First Day</span>
                      <Moment date={fieldtrip.startDate} format="L" /> <i><Moment date={fieldtrip.startDate} format="(dddd)" /></i>
                      <span className="caplabel" style={{ marginTop: 10 }}>Duration</span>
                      {moment(fieldtrip.endDate).diff(fieldtrip.startDate, 'days') + 1} days / {moment(fieldtrip.endDate).diff(fieldtrip.startDate, 'days')} nights{' '}
                      {moment().isBetween(fieldtrip.startDate, fieldtrip.endDate, null, '[]') && <Label bsStyle="success">In-Progress</Label>}
                    </td>

                    <td>
                      <span className="caplabel">LAST DAY</span>
                      <Moment date={fieldtrip.endDate} format="L" /> <i><Moment date={fieldtrip.endDate} format="(dddd)" /></i>
                      <span className="caplabel" style={{ marginTop: 10 }}>Location</span>
                      {fieldtrip.location.name}
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      {moment(fieldtrip.startDate).isSameOrAfter() &&
                        <i><Moment date={fieldtrip.startDate} fromNow style={{ marginRight: 10, color: '#7d7d7d' }} /></i>
                      }
                      {myStudents.length > 0 &&
                        <table className="student-fieldtrip-register-table">
                          <tbody>
                            {_.map(myStudents, student => (
                              <tr key={student.id}>
                                <td style={{ textAlign: 'right' }}>
                                  {!_.find(fieldtrip.studentList, { id: student.id })
                                    ? <Button
                                      bsStyle="success"
                                      bsSize="xs"
                                      onClick={() => this.handleRegisterStudent({
                                        studentId: student.id,
                                        fieldTripId: fieldtrip.id,
                                        action: 'register'
                                      })}
                                    >
                                      <FontAwesome name="warning" fixedWidth /> Register {student.firstName}
                                    </Button>
                                    : /* <Button
                                      bsSize="sm"
                                      style={{ border: 'none' }}
                                      // onClick={() => this.handleRegisterStudent({
                                      //   studentId: student.id,
                                      //   fieldTripId: fieldtrip.id,
                                      //   action: 'deregister'
                                      // })}
                                    >
                                      <FontAwesome name="check-circle" style={{ color: '#5FB760' }} fixedWidth /> Im going!
                                  </Button> */
                                    <span><FontAwesome name="check-circle" style={{ color: '#5FB760' }} fixedWidth /> {student.firstName} is going!</span>
                                  }
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      }
                    </td>

                  </tr>

                ))
                : <tr>
                  <td colSpan={3}>
                    <span style={{ display: 'block', padding: 20 }}>No field trip information to display at this time.</span>
                  </td>
                </tr>
              }

              {/* <tr>
                <td colSpan={3}>
                  <Button onClick={this.openRequestFieldTrip} bsSize="sm" style={{ fontFamily: 'Helvetica, sans-serif' }}>
                    <FontAwesome name="plus" fixedWidth /> Book a Fieldtrip
                  </Button>
                </td>
              </tr> */}

            </tbody>

          </Table>

        </div>
        : <span>
            No upcoming field trips to display at this time.
          </span>
    );
  }
}

const MY_FIELD_TRIPS = gql`
  query MyFieldTrips($timeline: String) {
    myFieldTrips(timeline: $timeline) {
      id
      name
      regStartDate
      regEndDate
      startDate
      endDate
      modified
      schoolList {
        id
        name
      }
      studentList {
        id
      }
      location {
        id
        name
        slug
        address
        foodMenuFile
        factSheetFile
        floorPlanFile
      }
    }
  }`;
const FIELD_TRIP_REGISTRATION = gql`
  mutation FieldTripRegistration(
    $fieldTripId: Int!
    $studentId: Int!
    $action: String!
  ) {
    fieldTripRegistration(
      fieldTripId: $fieldTripId
      studentId: $studentId
      action: $action
    ) {
      success
    }
  }`;

const FieldTripTable = compose(
  graphql(MY_FIELD_TRIPS, {
    name: 'myFieldTrips',
    options: {
      pollInterval: 4000,
      variables: {
        timeline: 'now'
      }
    }
  }),
  graphql(FIELD_TRIP_REGISTRATION, { name: 'fieldTripRegistration' }),
)(FieldTripTableContainer);

export default FieldTripTable;

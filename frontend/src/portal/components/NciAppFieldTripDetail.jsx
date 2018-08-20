import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import gql from 'graphql-tag';
import SearchInput, { createFilter } from 'react-search-input';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router';

const KEYS_TO_FILTERS = ['name', 'currentSchool.name'];

class NciAppFieldTripDetailContainer extends React.Component {

  static propTypes = {
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }

  state = {
    searchTerms: ''
  }

  componentWillMount() {
    document.body.style.background = '#fff';
  }

  handleFilterList = (e) => {
    // console.log(e)
    this.setState({ searchTerms: e });
  }

  render() {
    const fieldtrip = this.props.data.fieldtrip &&
      this.props.data.fieldtrip;

    const filteredList = !_.isEmpty(fieldtrip) && fieldtrip.studentList.filter(createFilter(this.state.searchTerms, KEYS_TO_FILTERS));

    const studentListBySchool = fieldtrip &&
      _(filteredList).groupBy(e => e.currentSchool.name).map(
        (value, key) => ({ name: key, students: value })
      ).value();

    return (
      <div className="nciapp-fieldtrip-detail">

          {this.props.data.loading
            ? <span>Loading field trip details...</span>
            : <span>

              <div className="nci-navbar-header" style={{ position: 'sticky', top: 0, zIndex: 102 }}>
                <div className="nci-navbar-header-back">
                  <a href="/app"><FontAwesome name="chevron-left" fixedWidth /> Home</a>
                </div>
                <div className="nci-navbar-header-title">
                  <h2>Field Trip</h2>
                </div>
                <div className="nci-navbar-header-share">
                  {/* <a href=""><FontAwesome name="share-square-o" fixedWidth /></a> */}
                </div>
              </div>

              <div className="search-box" style={{ position: 'sticky', top: 50, zIndex: 102 }}>
                <FontAwesome name="search" />
                <SearchInput
                  className="search-input"
                  onChange={this.handleFilterList}
                  placeholder="Search this field trip..."
                  style={{ border: '1px solid #cccccc', padding: '5px 5px 5px 30px' }}
                />
              </div>

              <div className="fieldtrip-name-list-item" style={{ textAlign: 'center', color: '#5d5d5d' }}>
                {fieldtrip && fieldtrip.name}
                {/* <span className="pull-right">
                  <a href=""><FontAwesome name="sticky-note" /></a>
                  <FontAwesome name="chevron-right" style={{ color: '#cccccc' }} />
                </span> */}
              </div>

              <div className="fieldtrip-hud">
                <ul className="big-counts">
                  <li><span>{fieldtrip && fieldtrip.getTotalStudents}</span>Students</li>
                  <li><span>{fieldtrip && fieldtrip.getTotalAllergens}</span>Allergens</li>
                  <li><span>{fieldtrip && fieldtrip.getTotalDietaryRestrictions}</span>Dietary</li>
                  <li><span>{fieldtrip && fieldtrip.getTotalStudentNotes}</span>Notes</li>
                </ul>
              </div>

              {fieldtrip &&
                <div className="fieldtrip-menu-bar">
                  <ul>
                    <li>
                      <Link to={`/app/fieldtrip/${fieldtrip.id}/medlog`}>Med Log</Link>
                    </li>
                    <li>
                      <Link to={`/app/fieldtrip/${fieldtrip.id}/dietary`}>Dietary</Link>
                    </li>
                    <li style={{ opacity: 0.4 }}>
                      <a href="" style={{ cursor: 'not-allowed' }}>Housing</a>
                    </li>
                  </ul>
                </div>
              }

              <div className="student-list-by-school">
                <ul className="item-list">
                  {_.map(studentListBySchool, school => (
                    <ul key={school.name} className="item-list">
                      <li className="header" style={{ position: 'sticky', top: 102, zIndex: 101 }}>
                        {school.name}
                        <div className="pull-right">
                          <span className="header-badge"><FontAwesome name="user" />{school.students.length}</span>
                          {/* <FontAwesome name="chevron-right" style={{ marginLeft: 10, color: '#BDE5D2' }} /> */}
                        </div>
                      </li>
                      {_.map(school.students, student => (
                        <li key={student.id}>
                          <div className="pull-right">
                            {student.hasAllergies === 'true' && <FontAwesome name="exclamation-triangle" style={{ color: '#FECB2F', marginRight: 10 }} />}
                            <FontAwesome name="chevron-right" style={{ color: '#cccccc' }} />
                          </div>
                          <Link to={`/app/student/${student.id}`}>{student.name}</Link>
                          <div className=""></div>
                        </li>
                      ))}
                    </ul>
                  ))}
                  {this.state.searchTerms !== '' && <div className="center top-20"><a onClick={() => this.setState({ searchTerms: '' })}>Clear Search</a></div>}
                </ul>
              </div>


            </span>
          }
      </div>
    );
  }
}

const FIELD_TRIP_DETAIL = gql`
  query NciAppFieldTripDetail($id: Int!) {
    fieldtrip(id: $id) {
      id
      name
      regStartDate
      regEndDate
      startDate
      endDate
      getWeekName
      getTotalStudents
      getTotalAllergens
      getTotalStudentNotes
      getTotalDietaryRestrictions
      location {
        id
        name
        foodMenuFile
      }
      studentList {
        id
        name
        dob
        hasAllergies
        allergenCount
        currentSchool {
          id
          name
        }
      }
    }
  }`;

const NciAppFieldTripDetail = compose(
  graphql(FIELD_TRIP_DETAIL, {
    options: ownProps => ({
      variables: {
        id: ownProps.params.id
      }
    })
  }),
  // graphql(DELETE_INSURANCE, { name: 'deleteInsurance' }),
)(NciAppFieldTripDetailContainer);

export default NciAppFieldTripDetail;

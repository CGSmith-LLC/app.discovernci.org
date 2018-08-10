import _ from 'lodash';
import React from 'react';
// import PropTypes from 'prop-types';
// import FontAwesome from 'react-fontawesome';
// import gql from 'graphql-tag';
// import { graphql } from 'react-apollo';
import { Row, Col, Button } from 'react-bootstrap';

import { genRandId } from '../../utils';
import BasicContainer from '../../base/BasicContainer';
import ParentNightListForm from './ParentNightListForm';
import VolunteerLogListForm from './VolunteerLogListForm';

class VolunteerLogForm extends React.Component {
  state = {
    totalHours: 0,
    volunteerLogList: [
      {
        id: 1,
        date: '',
        topic: '',
        hours: 0,
        locked: true
      }
    ],
    parentNightList: [
      {
        id: 1,
        date: '',
        topic: '',
        hours: 0,
        locked: true
      }
    ]
  }

  /* Tution Calculator */
  calcTotal = () => {
    const volunteerHours = _.sumBy(this.state.volunteerLogList, 'hours');
    const totalHours = volunteerHours;
    this.setState({ totalHours });
  }

  /**
   * Volunteer Log Inline Formset
   */

  handleVolunteerLogAdd = () => {
    this.setState(
      state => ({
        volunteerLogList: state.volunteerLogList.concat({ id: genRandId() })
      }), this.calcTotal
    );
  }

  handleVolunteerLogRemove = (id) => {
    this.setState({
      volunteerLogList: this.state.volunteerLogList.filter(item => item.id !== id)
    }, () => {
      this.calcTotal();
    });
  }

  handleVolunteerLogDate = (id, date) => {
    const items = this.state.volunteerLogList.slice();
    const index = items.findIndex(x => x.id === id);
    items[index] = { ...items[index], date };
    this.setState({ volunteerLogList: items });
  }

  handleVolunteerLogTopic = (id, topic) => {
    const items = this.state.volunteerLogList.slice();
    const index = items.findIndex(x => x.id === id);
    items[index] = { ...items[index], topic };
    this.setState({ volunteerLogList: items });
  }

  handleVolunteerLogHours = (id, hours) => {
    const items = this.state.volunteerLogList.slice();
    const index = items.findIndex(x => x.id === id);
    const valAsInt = parseInt(hours, 10);
    items[index] = { ...items[index], valAsInt };
    this.setState({ volunteerLogList: items }, () => {
      this.calcTotal();
    });
  }

  /**
   * Parent Night Inline Formset
   */

   handleParentNightAdd = () => {
     this.setState(
       state => ({
         parentNightList: state.parentNightList.concat({ id: genRandId() })
       }), this.calcTotal
     );
   }

   handleParentNightRemove = (id) => {
     this.setState({
       parentNightList: this.state.parentNightList.filter(item => item.id !== id)
     }, () => {
       this.calcTotal();
     });
   }

   handleParentNightDate = (id, date) => {
     const items = this.state.parentNightList.slice();
     const index = items.findIndex(x => x.id === id);
     items[index] = { ...items[index], date };
     this.setState({ parentNightList: items });
   }

   handleParentNightTopic = (id, topic) => {
     const items = this.state.parentNightList.slice();
     const index = items.findIndex(x => x.id === id);
     items[index] = { ...items[index], topic };
     this.setState({ parentNightList: items });
   }

  render() {
    const { volunteerLogList, parentNightList, totalHours } = this.state;
    return (
      <BasicContainer>
        <Row>
          <Col md={10} mdOffset={1}>

            <h1 className="center">
              2018-2019 Volunteer Hour Log
            </h1>

            <span>As part of our ongoing mission of a partnership to build a community of invested, inspired learners, we request the following:</span>

            <ul>
              <li>that each family dedicate at least 20 hours of work for the school in a volunteer capacity. If this is a strain on your schedule, you may opt out of your volunteer obligation with a payment of $100.</li>
              <li>that each family participate in our yearly fundraisers as they happen – either through financial donations or in kind. You may opt out of your fundraiser commitment with a direct donation of $100.</li>
              <li>that each family commit to attend, over the year, at least two Home-School Connection Nights (Parent Nights) to extend and deepen our understanding of child development and Montessori philosophy.</li>
            </ul>

            <span>Please reach out to Carrie, our Office Manager (Office@nciw.org) if you have any general questions. Other contacts are:</span>

            <ul>
              <li>Development Committee- Geoffrey Bishop: info@nciw.org</li>
              <li>PABC (Parents Actively Building Community) for PABC Activities and Volunteer opportunities</li>
              <li>Classroom Parent Rep – for classroom activities and projects</li>
            </ul>

            <strong style={{ color: '#db3030' }}>
              Please have your total hours submitted by May 15, 2019.
            </strong>

            <VolunteerLogListForm
              items={volunteerLogList}
              handleAdd={this.handleVolunteerLogAdd}
              handleRemove={this.handleVolunteerLogRemove}
              handleDate={this.handleVolunteerLogDate}
              handleTopic={this.handleVolunteerLogTopic}
              handleHours={this.handleVolunteerLogHours}
            />

            <hr />

            <h4>
              Home – School Connection Nights (Parent Nights)
            </h4>

            <ParentNightListForm
              items={parentNightList}
              handleAdd={this.handleParentNightAdd}
              handleRemove={this.handleParentNightRemove}
              handleDate={this.handleParentNightDate}
              handleTopic={this.handleParentNightTopic}
            />

          </Col>
        </Row>
        <Row>
          <Col md={10} mdOffset={1}>

            <hr />

            <Button
              style={{ marginRight: 15 }}
              bsStyle="success"
              bsSize="lg"
            >
              Save
            </Button>

            Total Hours this Year: {totalHours}

          </Col>
        </Row>
      </BasicContainer>
    );
  }
}

export default VolunteerLogForm;

import _ from 'lodash';
import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {
  Row, Col, FormGroup, Checkbox, Radio, Button
} from 'react-bootstrap';

import BasicContainer from '../../base/BasicContainer';

class AdditionalPermissionsForm extends React.Component {
  state = {}

  render() {
    const { me } = this.props.data;
    console.log(this.props);
    return (
      <BasicContainer>
        <Row>
          <Col md={10} mdOffset={1}>

            <h1 className="center">
              Additional Permissions for Elementary & Adolescent Students
            </h1>

            <Row>
              <Col md={10} mdOffset={1}>

                <span>
                  Please check the box for each permission given.
                </span>

                <br />
                <br />

                <span>
                  All parents/guardians & students are required to check the bottom of this form for permissions to be in effect.
                </span>

                <h3>
                  Field Trips
                </h3>

                <span>Throughout the school year, students may leave the school for a variety of reasons. Some classes or small groups will go to the public library, see plays, or visit other areas of interest with their classmates and teachers. If a class plans a trip, it is expected that all students participate. We will always notify you well ahead of time with the details of a planned trip including costs involved, and give you the opportunity to provide us with any updated emergency contact numbers that might have changed since first filling this out. Tickets & arrangements are secured in advance for best seating so it is the family’s responsibility to pay for each trip when there are costs involved. Your child will not leave school without your permission, provided through this form, and only when accompanied by school personnel on a school-sponsored activity. Transportation will be via the Nature’s Classroom van or a staff appointed driver who has provided license and insurance information to the office.</span>

                <br />
                <br />

                <span>Teachers will keep library cards at school to insure the student has it on the day of the trip.</span>

                {me && _.map(me.studentSet, student => [
                  <Checkbox
                    // checked={wantsBusService}
                    // onClick={() => this.setState({
                    //   wantsBusService: !wantsBusService
                    // })}
                  >
                    I give permission for <strong>{student.name}</strong> to participate in school sponsored field trips with Nature’s Classroom Montessori School personnel.
                  </Checkbox>,
                  <Checkbox
                    // checked={wantsBusService}
                    // onClick={() => this.setState({
                    //   wantsBusService: !wantsBusService
                    // })}
                  >
                    <strong>{student.name}</strong> weighs less than 80 lbs. and needs a booster seat that I will provide for trips.
                  </Checkbox>
                ])}


                <h3>
                  Computer Agreement
                </h3>

                <Checkbox
                  // checked={wantsBusService}
                  // onClick={() => this.setState({
                  //   wantsBusService: !wantsBusService
                  // })}
                >
                  I understand that my child's use of computers and the Internet at Nature's Classroom Montessori School are an exceptional educational opportunity and privilege. Therefore, my child and I agree to the following expectations:
                </Checkbox>

                <ul>
                  <li>1. I understand that computers are available for educational use only. Though a filtering system has been placed on the student computers, my child will only be allowed to use educational sites approved by teachers.</li>
                  <li>2. I understand my child will not be allowed to use or access email before/after/or during school hours here at Nature's Classroom Montessori School.</li>
                  <li>3. My child will not reveal his/her home address, phone number, full name or other personal information over the internet.</li>
                  <li>4. When in doubt about permitted uses of school computers or other Internet tools, the child will ask a teacher.</li>
                  <li>5. I understand that misuse of Nature's Classroom Montessori School computers will result in suspension of computer privileges.</li>
                </ul>

                <h3>
                  Bug Spray & Sun Screen Permission
                </h3>

                <Checkbox
                  // checked={wantsBusService}
                  // onClick={() => this.setState({
                  //   wantsBusService: !wantsBusService
                  // })}
                >
                  I will supply (in the original container) and give permission for sun screen and bug spray to be self- applied by student as needed.
                </Checkbox>


                <h3>
                  Microwave Permission
                </h3>

                <span>We would like to allow elementary students to be able to use the microwave to warm food brought from home. Our teachers however are not always able to monitor the use of the microwave during the meal due to other responsibilities in the dining room and at the table. Overheated food or hot containers can be dangerous and we do not want anyone to suffer a burn through the incorrect use of the microwave. Please take a moment to consider whether or not your child can safely operate a microwave without full supervision and then check the options below.</span>

                {me && _.map(me.studentSet, student => [
                  <FormGroup>
                    Pick up time:
                    {' '}
                    <Radio name="radioGroup">
                       Yes, <strong>{student.name}</strong> can safely use a microwave without full adult supervision. My child has permission to use the school microwave.
                    </Radio>
                    {' '}
                    <Radio name="radioGroup">
                      No, <strong>{student.name}</strong> cannot use the school microwave.
                    </Radio>
                  </FormGroup>
                ])}

                <hr />

                <span>We have read and checked the permissions to be granted on this form. Expectations have been explained and discussed with my child and we all fully understand them without question.</span>

                {me && _.map(me.studentSet, student => [
                  <Checkbox
                    // checked={wantsBusService}
                    // onClick={() => this.setState({
                    //   wantsBusService: !wantsBusService
                    // })}
                  >
                    {student.name} has reviewed and agrees to these permissions.
                  </Checkbox>,
                  _.map(student.guardianList, guardian => [
                    <Checkbox
                      // checked={wantsBusService}
                      // onClick={() => this.setState({
                      //   wantsBusService: !wantsBusService
                      // })}
                    >
                      {guardian.name} has reviewed and agrees to these permissions.
                    </Checkbox>
                  ])
                ])}

              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={10} mdOffset={1}>
            <hr />
            <Button bsStyle="success" bsSize="lg">
              Agree & Save
            </Button>
          </Col>
        </Row>
      </BasicContainer>
    );
  }
}

const ME_QUERY = gql`
  query MeQuery {
    me {
      isNciMontessori
      studentSet {
        id
        name
        dob
        guardianList {
          id
          name
        }
      },
      assocSchoolList {
        id
      }
    }
  }
`;

export default graphql(ME_QUERY)(AdditionalPermissionsForm);

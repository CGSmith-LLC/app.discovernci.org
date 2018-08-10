// import _ from 'lodash';
import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Row, Col, Button } from 'react-bootstrap';

import BasicContainer from '../../base/BasicContainer';

class ApplicationForAdmissionsForm extends React.Component {
  state = {}

  render() {
    // const { me } = this.props.data;
    // console.log(this.props);
    return (
      <BasicContainer>
        <Row>
          <Col md={10} mdOffset={1}>

            <h1 className="center">
              Application for Admission
            </h1>

            <Row>
              <Col md={10} mdOffset={1}>




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

export default graphql(ME_QUERY)(ApplicationForAdmissionsForm);

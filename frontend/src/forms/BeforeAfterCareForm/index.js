// import _ from 'lodash';
import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {
  Row, Col, FormControl, FormGroup, Checkbox, Radio, Button
} from 'react-bootstrap';

import BasicContainer from '../../base/BasicContainer';

class BeforeAfterCare extends React.Component {
  state = {
    beforeCareNeeded: false,
    beforeCareDays: [],
    afterCareNeeded: false,
    afterCareDays: []
  }

  render() {
    const { beforeCareNeeded } = this.state;
    return (
      <BasicContainer>
        <Row>
          <Col md={10} mdOffset={1}>

            <h1 className="center">
              2018-2019 Before/After Childcare
            </h1>

            <Row>
              <Col md={10} mdOffset={1}>
                We will offer <strong>before school care</strong> from 7:30-8:30am. We are also offering after school care for the 2018-2019 school year until 5:00pm The fee for before school care is $8.00/day for a contracted schedule and $10.00/day for drop in.

                <ul style={{ marginTop: 15 }}>
                  <li>
                    The fee for <strong>after school care</strong> is 14.00/day for a contracted schedule and $16.00/day for drop in. In order to make this after school program happen, we would need a minimum of 4 students per day.
                  </li>
                  <li style={{ color: '#F91D2C', marginTop: 15  }}>
                    If you are late picking up or after care is needed between 5-6pm, this will result in an additional charge. The fee per family is $5.00 per 15 minutes on any given day.
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>
          <hr />
        </Row>
        <Row>
          <Col md={5} mdOffset={1}>

            <h3>
              Before School Care
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
              && [
                <FormGroup>
                  <FormControl
                    type="text"
                    placeholder="Participating Child(ren)s name"
                    // onChange={e => handleName(item.id, e.target.value)}
                    // value={item.name}
                    style={{ maxWidth: 240 }}
                  />
                </FormGroup>,
                <FormGroup style={{ marginLeft: 20 }}>
                  <Checkbox>Monday</Checkbox>
                  <Checkbox>Tuesday</Checkbox>
                  <Checkbox>Wednesday</Checkbox>
                  <Checkbox>Thursday</Checkbox>
                  <Checkbox>Friday</Checkbox>
                </FormGroup>,

                <FormGroup>
                  <FormControl
                    type="date"
                    placeholder="Permanent start date"
                    // onChange={e => handleName(item.id, e.target.value)}
                    // value={item.name}
                    style={{ maxWidth: 240 }}
                  />
                </FormGroup>,
                <FormGroup>
                  <FormControl
                    type="text"
                    placeholder="Drop in date(s) only"
                    // onChange={e => handleName(item.id, e.target.value)}
                    // value={item.name}
                    style={{ maxWidth: 240 }}
                  />
                </FormGroup>
              ]
            }

          </Col>
          <Col md={6}>

            <h3>
              After School Care
            </h3>

            <Checkbox
              checked={this.state.afterCareNeeded}
              onClick={() => this.setState({
                afterCareNeeded: !this.state.afterCareNeeded
              })}
            >
              After School Care Needed (This is for full day students only)
            </Checkbox>

            {this.state.afterCareNeeded
              && [
                <FormGroup>
                  <FormControl
                    type="text"
                    placeholder="Participating Child(ren)s name"
                    // onChange={e => handleName(item.id, e.target.value)}
                    // value={item.name}
                    style={{ maxWidth: 240 }}
                  />
                </FormGroup>,
                <FormGroup style={{ marginLeft: 20 }}>
                  <Checkbox>Monday</Checkbox>
                  <Checkbox>Tuesday</Checkbox>
                  <Checkbox>Wednesday</Checkbox>
                  <Checkbox>Thursday</Checkbox>
                  <Checkbox>Friday</Checkbox>
                </FormGroup>,
                <FormGroup style={{ marginLeft: 20 }}>
                  Pick up time:{' '}
                  <Radio name="radioGroup">
                    3:30 p.m.
                  </Radio>{' '}
                  <Radio name="radioGroup">
                    4:00 p.m.
                  </Radio>{' '}
                  <Radio name="radioGroup">
                    4:30 p.m.
                  </Radio>{' '}
                  <Radio name="radioGroup">
                    5:00 p.m
                  </Radio>
                </FormGroup>,
                <FormGroup>
                  <FormControl
                    type="date"
                    placeholder="Permanent start date"
                    // onChange={e => handleName(item.id, e.target.value)}
                    // value={item.name}
                    style={{ maxWidth: 240 }}
                  />
                </FormGroup>,
                <FormGroup>
                  <FormControl
                    type="text"
                    placeholder="Drop in date(s) only"
                    // onChange={e => handleName(item.id, e.target.value)}
                    // value={item.name}
                    style={{ maxWidth: 240 }}
                  />
                </FormGroup>
              ]
            }

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

const ME_QUERY = gql`
  query MeQuery {
    me {
      isNciMontessori
      studentSet {
        id
        name
      },
      assocSchoolList {
        id
      }
    }
  }
`;

export default graphql(ME_QUERY)(BeforeAfterCare);

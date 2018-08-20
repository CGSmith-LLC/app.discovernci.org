import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';
import moment from 'moment';
import Moment from 'react-moment';
import request from 'superagent';
import { Grid, Row, Col } from 'react-bootstrap';

export default class RoomAssignment extends React.Component {

  static propTypes = {
    location: PropTypes.shape({
      query: PropTypes.shape({
        guid: PropTypes.string
      })
    }).isRequired
  };

  state = {
    fieldtrip: null,
    success: null
  }

  componentWillMount() {
    request
      .get(`/api/v1/fieldtrips/?guid=${this.props.location.query.guid}&format=json`)
      .end((err, res) => this.setState({ fieldtrip: res.body[0], err }));
  }

  handleSubmit = ({ formData }) => {
    const that = this;
    request
      .post('/post/roomassignment/')
      .send({ pk: that.state.fieldtrip.pk, assignment: formData })
      .end((err, res) => {
        if (err || !res.ok) {
          that.setState({ error: err, success: false });
        } else {
          that.setState({ success: true });
        }
      });
  };

  render() {
    // const onChange = ({ formData }) => console.log(formData);
    // const onError = errors => console.log(`I have ${errors.length} errors to fix`);
    const HeaderInfo = (
      this.state.fieldtrip && this.state.fieldtrip.customer && <div>
        <h1>NCI Week Room Assignment</h1>
        <p className="n">
          {this.state.fieldtrip.customer.name}
          <br />
          <a href={`mailto:${this.state.fieldtrip.customer.email}`}>
            {this.state.fieldtrip.customer.email}
          </a>
          <br />
          <a href={`tel:${this.state.fieldtrip.customer.phone}`}>
            {this.state.fieldtrip.customer.phone}
          </a>
        </p>
        <hr style={{ margin: '10px 0', padding: 0 }} />
        <p className="n" style={{ marginBottom: 30 }}>
          Begins:{' '}
          <Moment format="MM/DD/YY (ddd) \@ h:mma">
            {this.state.fieldtrip.start_date}
          </Moment>
          <br />Ends:{' '}
          <Moment format="MM/DD/YY (ddd) \@ h:mma">
            {this.state.fieldtrip.end_date}
          </Moment>
          <br />
          Total: {moment(this.state.fieldtrip.end_date).diff(this.state.fieldtrip.start_date, 'days')} days
        </p>
      </div>
    );

    // Merge form schemas
    const buildingSchemas = this.state.fieldtrip && _.map(
      this.state.fieldtrip.building_list, building => building.schema
    );
    const combinedFormSchema = this.state.fieldtrip && _.merge(...buildingSchemas);

    // Merge form ui schemas
    const buildingUiSchemas = this.state.fieldtrip && _.map(
      this.state.fieldtrip.building_list, building => building.uischema
    );
    const combinedFormUiSchema = this.state.fieldtrip && _.merge(...buildingUiSchemas);

    const form = (
      this.state.fieldtrip && this.state.fieldtrip.building_list &&
        <div className="form-wrapper">
          <Form
            schema={combinedFormSchema}
            uiSchema={combinedFormUiSchema}
            formData={this.state.fieldtrip.assignment}
            onSubmit={this.handleSubmit}
            // onError={onError}
            // onChange={onChange}
          />
        </div>
    );

    return (
      <Grid className="grid-container">
        <div className="row-wrapper room-assignment">
          {this.state.fieldtrip
            ? <Row>
              <Col md={5} mdOffset={1}>
                {this.state.fieldtrip && HeaderInfo}
                {form}
              </Col>
              <Col md={6} style={{ position: 'relative' }}>
                {this.state.fieldtrip && _.map(this.state.fieldtrip.building_list, building => (
                  <img
                    src={building.location.floor_plan_file}
                    alt=""
                    className="img-responsive"
                    style={{ marginTop: 15 }}
                  />
                ))}
              </Col>
            </Row>
            : <p>Loading...</p>
          }
        </div>
      </Grid>
    );
  }
}

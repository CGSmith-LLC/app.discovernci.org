import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import Moment from 'react-moment';
import { Row, Col, Grid, Alert, Modal, Button } from 'react-bootstrap';
import Form from 'react-jsonschema-form';
import fields from 'react-jsonschema-form-extras';
import gql from 'graphql-tag';
import {graphql, compose} from 'react-apollo';


class NciAppFieldTripMedLogAdministerContainer extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      fieldtrip: PropTypes.object
    }).isRequired
  }

  state = {
    medLogInstance: {
      notes: this.props.administeredMed ? this.props.administeredMed.notes : '',
    },
    mutationSuccess: null,
    err: null,
    formData: {},
    showConfirm: false 
  }

  componentWillMount() {
    document.body.style.background = '#fff';
  }

  handleSubmit = ({ formData }) => {
    this.setState({ showConfirm: true, formData });
  }

  handleConfirm = () => {
    const i = this;
    this.props.updateAdministeredMed({ variables: this.state.formData })
    .then(({ data }) => {
      i.setState({
        mutationSuccess: true,
        medLogInstance: data.updateAdministeredMed.administeredMed
      });
    }).catch((error) => {
      i.setState({ err: 'Error adding insurance details. Try again.' });
    });
    this.setState({ showConfirm: false });
  }

  handleCancel = () => {
    this.setState({ showConfirm: false });
  }

  render() {
    const fieldtrip = this.props.data.fieldtrip &&
      this.props.data.fieldtrip;
    const { showConfirm } = this.state;

    const formSchema = {
      type: 'object',
      required: ['notes', 'id','token'],
      properties: {
        notes: {
          type: 'string',
          title: 'Note'
        },
        id: {
          type: 'integer',
          default: parseInt(this.props.params.med_id)
        },
        token: {
          type: 'string',
          default: localStorage.token
        }
      }
    };
    const UiSchema = {
      notes: {
        'ui:widget': 'textarea'
      },
      id: {
        'ui:widget': 'hidden'
      },
      token: {
        'ui:widget': 'hidden'
      }
    };

    return (
      <div className="nciapp-fieldtrip-detail">
      {this.props.data.loading
        ? <span>Loading field trip details...</span>
        : <span>
          <div className="nci-navbar-header" style={{zIndex: 999}}>
          <div className="nci-navbar-header-back">
            <button type="button" onClick={() => {
              window.history.back();
            }} className="btn-nostyle">
            <FontAwesome name="chevron-left" fixedWidth/>
              {' '}
              Back
            </button>
          </div>
          <div className="nci-navbar-header-title">
            <h2>Med Log Administer</h2>
            <p>{fieldtrip.getWeekName}(
            <span style={{textTransform: 'uppercase'}}>
              <Moment date={fieldtrip.startDate} format="MMM D"/>
            </span>
            -
            <Moment date={fieldtrip.endDate} format="Do\, YYYY"/>
            )
            </p>
          </div>
          <div className="nci-navbar-header-share">
            <a href={`/app/fieldtrip/${fieldtrip.id}/medlog/table`}>
              <FontAwesome name="book" fixedWidth />
            </a>
          </div>
          </div>

          <Grid className="grid-container">
            <Row>
              <Col md={6} mdOffset={3}>
                <p style={{ fontFamily: 'Helvetica, sans-serif', fontSize: '1em' }}>
                  Please explain about administer log.
                </p>
                {this.state.err &&
                  <Alert bsStyle="warning">{this.state.err}</Alert>
                }
                {this.state.mutationSuccess &&
                  <Alert bsStyle="success">Your profile has been updated.</Alert>
                }
                <Form
                  schema={formSchema}
                  uiSchema={UiSchema}
                  onSubmit={this.handleSubmit}
                  fields={fields}
                  formData={this.state.formData}
                />
              </Col>
            </Row>
          </Grid>
        </span>
      }
        <Modal
          aria-labelledby="contained-modal-title-vcenter"
          centered="true"
          show={showConfirm}
          onHide={this.handleCancel}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm</Modal.Title>
          </Modal.Header>
          <Modal.Body>We will send this notes to administrator. Are you sure?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCancel}>
              Cancel
            </Button>
            <Button onClick={this.handleConfirm}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const FIELD_TRIP_MED_LOG = gql`
  query FieldTripMedLog($id: Int!) {
  fieldtrip(id: $id) {
    id
    name
    getWeekName
    getTotalStudents
    getTotalAllergens
    studentList {
      id
      name
      firstName
      lastName
      dob
      hasAllergies
      hasFoodAllergens
      medicalrecord {
        id
        nonRxType
        nonRxNotes
        weight
        getNonRxTypeDisplay
        lastTetanus
        getGenderDisplay
        restrictions
        allergies
        getAllergiesDisplay
        allergiesExpanded
        foodAllergens
        getFoodAllergensDisplay
        allergenCount
        foodAllergenCount
        recentTrauma
        medicationSet {
          id
          medicationName
          amount
          amountUnit
          amountHuman
          inPossession
          getAmountUnitDisplay
          administrationTimes
          getAdministrationTimesDisplay
          administrationTimesOther
          administeredmedSet {
            id
            created
            medication {
              id
              administrationTimes
            }
          }
          notes
        }
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
    }
  }`;
const UPDATE_MED_LOG = gql`
  mutation   UpdateAdministeredMed(
    $id: Int!,
    $notes: String!
  ) {
    updateAdministeredMed(
      id: $id,
      notes: $notes
    ) {
      success,
      administeredMed {
        id
        notes
      }
    }
  }`;

const NciAppFieldTripMedLogAdminister = compose(
  graphql(FIELD_TRIP_MED_LOG, {
    options: ownProps => ({
      variables: {
        id: ownProps.params.id
      }
    })
  }),
  graphql(UPDATE_MED_LOG, {name: 'updateAdministeredMed'})
)(NciAppFieldTripMedLogAdministerContainer);

export default NciAppFieldTripMedLogAdminister;

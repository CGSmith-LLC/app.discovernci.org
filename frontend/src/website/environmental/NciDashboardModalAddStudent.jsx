import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import Moment from 'react-moment';
import Form from 'react-jsonschema-form';
import fields from 'react-jsonschema-form-extras';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Alert, Button, Modal } from 'react-bootstrap';

class ModalAddStudent extends React.Component {

  static propTypes = {
    createObject: PropTypes.func.isRequired,
    deleteObject: PropTypes.func.isRequired,
    showAddStudent: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    studentObj: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      dob: PropTypes.string,
      currentSchool: PropTypes.object,
      classroom: PropTypes.number,
      photoWaiver: PropTypes.bool,
      waiverAgreement: PropTypes.bool,
      modified: PropTypes.string
    }),
    schoolList: PropTypes.shape({
      schools: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string
        })
      )
    }).isRequired
  }

  static defaultProps = {
    studentObj: {}
  }

  state = {
    createObjectSuccess: null,
    formInstance: null,
    err: null,

    id: '',
    name: '',
    dob: '',
    currentSchool: [],
    classroom: '',
    photoWaiver: '',
    waiverAgreement: ''
  }

  componentWillReceiveProps = nextProps => {
    // console.log('AddStudent NextProps', nextProps);
    nextProps.studentObj.id &&
      this.setState({
        formInstance: {
          id: nextProps.studentObj.id,
          name: nextProps.studentObj.name,
          dob: nextProps.studentObj.dob,
          currentSchool: nextProps.studentObj.currentSchool,
          classroom: nextProps.studentObj.classroom,
          photoWaiver: nextProps.studentObj.photoWaiver,
          waiverAgreement: nextProps.studentObj.waiverAgreement,
          modified: nextProps.studentObj.modified
        }
      });
  };

  onHide = () => {
    this.setState({
      formInstance: null,
      createObjectSuccess: null,
      err: null
    });
    this.props.onHide();
  }

  handleSubmit = ({ formData }) => {
    const i = this;
    // console.log('formData @@@@@@@@@@', formData);
    this.props.createObject({
      variables: {
        ...formData,
        currentSchoolId: parseInt(formData.currentSchool.id, 10)
      }
    })
      .then(({ data }) => {
        // console.log('AddStudent data back from server @@@@@@@@@@', data);
        i.setState({
          createObjectSuccess: true
          // formInstance: data.addStudent.student
        });
        this.onHide();
      }).catch((error) => {
        const err = String(error).replace('Error: GraphQL error:', '')
        i.setState({ err: `Error adding Student. Try again. ${err}` });
      });
  }

  handleDelete = (objectId) => {
    const i = this;
    this.props.deleteObject({
      variables: { id: objectId, token: localStorage.token }
    }).then(({ data }) => {
      i.setState({
        createObjectSuccess: null,
        err: null,
        formInstance: null
      });
      this.onHide();
    }).catch((error) => {
      i.setState({ err: 'Error removing record' });
    });
  }

  render() {
    const { studentObj, showAddStudent, schoolList } = this.props;

    // console.log('ModalAddStudent props @@@@', this.props);
    // console.log('ModalAddStudent state @@@@', this.state);

    const options = _.map(schoolList.schools, school => (
      { id: school.id, name: school.name }
    ));

    const formSchema = {
      type: 'object',
      required: ['name', 'currentSchool', 'classroom', 'dob', 'waiverAgreement'],
      properties: {
        name: {
          type: 'string',
          title: 'Student\'s First and Last Name'
        },
        dob: {
          type: 'string',
          format: 'date',
          title: 'Date of Birth'
        },
        currentSchool: {
          title: 'School',
          default: studentObj.id && _.find(options, { id: studentObj.currentSchool.id })
        },
        classroom: {
          title: 'Classroom / Grade',
          type: 'number',
          enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],  // TODO: DRY
          enumNames: [
            '1st Grade',
            '2nd Grade',
            '3rd Grade',
            '4th Grade',
            '5th Grade',
            '6th Grade',
            '7th Grade',
            '8th Grade',
            'Children\'s House',
            'Lower Elementary',
            'Upper Elementary',
            'Adolescent'
          ]
        },
        photoWaiver: {
          type: 'boolean',
          title: 'Photo waiver',
          default: true
        },
        waiverAgreement: {
          type: 'boolean',
          title: 'Medical Authorization, Youth Waiver & Release of Liability',
          default: false
        },
        id: {
          type: 'number',
          default: !_.isNil(this.state.formInstance) ? this.state.formInstance.id : 0
        },
        token: {
          type: 'string',
          default: localStorage.token
        }
      }
    };
    const UiSchema = {
      name: {
        'ui:autofocus': true
      },
      dob: {
        'ui:help': 'Format: YYYY-MM-DD'
      },
      currentSchool: {
        'ui:title': 'School',
        'ui:field': 'typeahead',
        typeahead: {
          labelKey: 'name',
          placeholder: 'Search Schools...',
          minLength: 2,
          options
        }
      },
      photoWaiver: {
        'ui:help': 'We sometimes snap cool photos and use them for marketing material. Keep this checked if you\'re OK with your child(ren) being in these photos. We never cite your childs name.'
      },
      waiverAgreement: {
        'ui:help': 'I have read the medical authorization, waiver and release, and understand my rights by signing it and sign it voluntarily.'
      },
      id: {
        'ui:widget': 'hidden'
      },
      token: {
        'ui:widget': 'hidden'
      }
    };

    return (
      <Modal show={showAddStudent} onHide={this.onHide} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>
            {studentObj.name
              ? `${studentObj.name}'s Profile`
              : 'Add New Student'
            }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {this.state.err &&
            <Alert bsStyle="warning">{this.state.err}</Alert>
          }

          <Form
            schema={formSchema}
            uiSchema={UiSchema}
            onSubmit={this.handleSubmit}
            fields={fields}
            formData={!_.isNil(this.state.formInstance) && this.state.formInstance}
          >

            <p style={{ marginTop: 0, position: 'relative', top: -15, fontFamily: 'Helvetica, sans-serif', fontSize: '1em' }}>
              <a href="discovernci_media/waiver.pdf" target="_blank" rel="noopener noreferrer">View Waiver and Release of Liability Agreement <FontAwesome name="external-link-square" fixedWidth /></a>
            </p>

            <Button bsStyle="success" type="submit">Save Child</Button>
            {!_.isNil(this.state.formInstance) && this.state.formInstance.id &&
              <Button
                bsStyle="link"
                style={{ color: 'red' }}
                onClick={() => this.handleDelete(this.state.formInstance.id)}
              >
                Delete
              </Button>
            }
            {studentObj.id &&
              this.state.formInstance &&
                <span style={{ fontStyle: 'italic', paddingLeft: 10, fontSize: '0.9em', color: '#868686' }}>
                  Last saved <Moment date={this.state.formInstance.modified} fromNow ago /> ago
                </span>
            }
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

const SAVE_OBJECT = gql`
  mutation SaveObjectMutation(
    $id: Int
    $token: String!
    $name: String!
    $currentSchoolId: Int!
    $classroom: Int!
    $dob: String!
    $photoWaiver: Boolean
    $waiverAgreement: Boolean
  ) {
    addStudent(
      id: $id
      token: $token
      name: $name
      currentSchoolId: $currentSchoolId
      classroom: $classroom
      dob: $dob
      photoWaiver: $photoWaiver
      waiverAgreement: $waiverAgreement
    ) {
      student {
        id
        name
        dob
        created
        classroom
        currentSchool {
          id
          name
        }
      }
    }
  }`;
const DELETE_OBJECT = gql`
  mutation DeleteObjectMutation(
    $token: String!
    $id: Int!
  ) {
    deleteStudent(
      token: $token
      id: $id
    ) {
      success
      student {
        id
        name
      }
    }
  }`;

const NciDashboardModalAddStudent = compose(
  graphql(SAVE_OBJECT, { name: 'createObject' }),
  graphql(DELETE_OBJECT, { name: 'deleteObject' }),
)(ModalAddStudent);

export default NciDashboardModalAddStudent;

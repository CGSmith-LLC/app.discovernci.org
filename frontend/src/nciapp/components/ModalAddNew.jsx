// import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
// import FontAwesome from 'react-fontawesome';
import Form from 'react-jsonschema-form';
import fields from 'react-jsonschema-form-extras';
// import gql from 'graphql-tag';
// import { graphql } from 'react-apollo';
import { Modal, Button } from 'react-bootstrap';

class ModalAddNew extends React.Component {

  static propTypes = {
    handleHideModalAddNew: PropTypes.func.isRequired,
    showModalAddNew: PropTypes.bool.isRequired
  }

  render() {
    // const props = this.props;
    // console.log('props @@@@@@@@@@', props);

    const formSchema = {
      type: 'object',
      required: ['email', 'name', 'token'],
      properties: {
        email: {
          type: 'string',
          title: 'Your Email Address'
        },
        name: {
          type: 'string',
          title: 'Your Full Name'
        },
        phone: {
          type: 'string',
          title: 'Phone Number'
        },
        title: {
          type: 'string',
          title: 'Job Title'
        },
        bio: {
          type: 'string',
          title: 'Short bio'
        },
        token: {
          type: 'string',
          default: localStorage.token
        }
      }
    };
    const UiSchema = {
      bio: {
        'ui:widget': 'textarea'
      },
      token: {
        'ui:widget': 'hidden'
      }
    };

    return (
      <Modal show={this.props.showModalAddNew} onHide={this.props.handleHideModalAddNew}>
        <Modal.Header closeButton>
          <Modal.Title>NCI Add New</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <p>Add a new item. Be it a Student, Fieldtrip, School, EE Staff user, etc...</p>

          <Form
            schema={formSchema}
            uiSchema={UiSchema}
            // onSubmit={this.handleSubmit}
            fields={fields}
            // formData={this.state.profileInstance}
          />

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

// const FOOBAR_QUERY = gql`
//   query FoobarQuery($bar: String!) {
//     me(bar: $bar) {
//       id
//     }
//   }
// `;

// export default graphql(FOOBAR_QUERY, { name: 'foobarQuery' })(ModalMedical);
export default ModalAddNew;

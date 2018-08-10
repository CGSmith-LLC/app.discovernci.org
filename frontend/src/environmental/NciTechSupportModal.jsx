import React from 'react';
import PropTypes from 'prop-types';
// import FontAwesome from 'react-fontawesome';
import Form from 'react-jsonschema-form';
// import fields from 'react-jsonschema-form-extras';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Modal } from 'react-bootstrap';

class NciTechSupportModal extends React.Component {

  static propTypes = {
    submitTechSupportMessage: PropTypes.func.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
    showModal: PropTypes.bool.isRequired
  }

  handleSubmit = ({ formData }) => {
    const i = this;
    this.props.submitTechSupportMessage({ variables: formData })
      .then(({ data }) => {
        i.setState({ success: true });
      }).catch((error) => {
        i.setState({ err: 'Unable to send your message at this time. Try again later.' });
      });
  }

  render() {
    const formSchema = {
      type: 'object',
      required: ['message', 'token'],
      properties: {
        message: {
          type: 'string',
          title: 'Message'
        },
        token: {
          type: 'string',
          default: localStorage.token
        }
      }
    };
    const UiSchema = {
      message: {
        'ui:widget': 'textarea'
      },
      token: {
        'ui:widget': 'hidden'
      }
    };

    return (
      <Modal show={this.props.showModal} onHide={this.props.handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Help / Support</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <p style={{ marginBottom: 15, fontFamily: 'Helvetica, sans-serif', fontSize: '1em' }}>
            If our site isn't behaving for you, please fill out the following form and let us know what's going on. We're listening, and we're here to help.
          </p>

          <Form
            schema={formSchema}
            uiSchema={UiSchema}
            onSubmit={this.handleSubmit}
            // fields={fields}
            // formData={this.state.profileInstance}
          />

        </Modal.Body>
      </Modal>
    );
  }
}

const SUBMIT_TECH_SUPPORT_MESSAGE = gql`
  mutation SubmitTechSupportMessage($token: String!, $message: String!) {
    submitTechSupportMessage(message: $message, token: $token) {
      success
    }
  }
`;

export default graphql(SUBMIT_TECH_SUPPORT_MESSAGE, {
  name: 'submitTechSupportMessage',
  options: {
    variables: {
      token: localStorage.token
    }
  }
})(NciTechSupportModal);

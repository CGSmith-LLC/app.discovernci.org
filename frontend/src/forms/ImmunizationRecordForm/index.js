import React from 'react';
import { Row, Col } from 'react-bootstrap';

import BasicContainer from '../../base/BasicContainer';

export default class ImmunizationRecordForm extends React.Component {
  state = {}

  render() {
    return (
      <BasicContainer>
        <Row>
          <Col md={12} className="center">
            <h1>
              Immunization Record Form
            </h1>
            <span style={{ padding: '30px 0', display: 'block' }}>
              Please <a href="https://nciw.s3.amazonaws.com/discovernci_media/Immunizationform2014_beyond.pdf" className="btn btn-success">Download</a> and print the official government issued document and hand in to the front office.
            </span>
          </Col>
        </Row>
      </BasicContainer>
    );
  }
}

// import _ from 'lodash';
import React from 'react';
// import PropTypes from 'prop-types';
// import FontAwesome from 'react-fontawesome';
// import Form from 'react-jsonschema-form';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Row, Col } from 'react-bootstrap';

import genRandId from '../../common/utils';
import { PanelLinkList } from '../../common';
import BasicContainer from '../base/BasicContainer';

const formItems = [
  { rank: 0, title: 'Additional Permissions', to: '/forms/additional-permissions', faName: 'file-o' },
  { rank: 1, title: 'Application for Admission', to: '/forms/application-for-admission', faName: 'file-o' },
  // { rank: 2, title: 'Authorization for Medication', to: '/forms/childrens-house-medication-authorization', faName: 'file-o' },
  { rank: 3, title: 'Before/After Childcare', to: '/forms/before-after-care', faName: 'file-o' },
  { rank: 4, title: 'Immunization Record Form', to: '/forms/immunization-record', faName: 'file-pdf-o' },
  // { rank: 5, title: 'Medical Examination for Entrance into School', to: '/forms/medical-exam-for-entrance', faName: 'file-o' },
  // { rank: 6, title: 'Emergency Info and Medical Authorization', to: '/forms/emergency-info-medication-authorization', faName: 'file-o' },
  { rank: 7, title: 'Family Information Form', to: '/forms/family-information', faName: 'file-o' },
  { rank: 8, title: 'Volunteer Hour Log', to: '/forms/volunteer-log', faName: 'file-o' }
];

class ThisWeekAtNci extends React.Component {
  state = {}

  render() {
    const data = this.props.data && this.props.data;
    return (
      <BasicContainer>
        <Row>
          <Col md={12} className="center">

            <h1>
              This Week at NCIM
            </h1>

            <hr />

          </Col>
        </Row>
        <Row>
          <Col md={6} mdOffset={1}>

            {data.post
              && (
                <div dangerouslySetInnerHTML={{ __html: data.post.post }} />
              )
            }

          </Col>
          <Col md={4}>

            <PanelLinkList key={genRandId()} header="Related Forms" data={formItems} />

          </Col>
        </Row>
      </BasicContainer>
    );
  }
}

const THIS_WEEK_AT_NCI_QUERY = gql`
  query {
    post(category: "this-week-at-ncim") {
      id
      publishDate
      expireDate
      shortDescription
      featureImage
      post
      isPinned
      modified
    }
  }
`;

export default graphql(THIS_WEEK_AT_NCI_QUERY)(ThisWeekAtNci);

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Row, Col } from 'react-bootstrap';

import { getQueryParams, genRandId } from '../common/utils/index';
import { PanelLinkList, PanelMediaList } from '../common';

Page.propTypes = {
  pageTitle: PropTypes.string,
  bannerPhoto: PropTypes.node,
  bodyContent: PropTypes.string,
  sidebarList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      slug: PropTypes.string,
      type: PropTypes.string,
      rank: PropTypes.number,
      items: PropTypes.array
    })
  )
};

Page.defaultProps = {
  pageTitle: "Montessori School - Nature's Classroom Institute",
  bannerPhoto: null,
  bodyContent: '<p>No data found</p>',
  sidebarList: null
};

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

export default function Page(props) {
  const RenderSidebarList = (
    props.sidebarList && props.sidebarList.map((panel) => {
      let i = '';
      if (panel.type === 'link') {
        i = <PanelLinkList key={panel.rank} header={panel.title} data={panel.items} />;
      } else if (panel.type === 'media') {
        i = <PanelMediaList key={panel.rank} header={panel.title} data={panel.items} />;
      }
      return i;
    })
  );
  return (
    <div>
      <Helmet title={props.pageTitle} />

      <Row>
        <Col md={10} mdOffset={1}>

          <img src={props.bannerPhoto} className="img-responsive img-rounded" alt="presentation" />

        </Col>
      </Row>
      <Row className="top-30">
        <Col md={6} mdOffset={1}>

          <div dangerouslySetInnerHTML={{ __html: props.bodyContent }} />

        </Col>
        <Col md={4}>

          {getQueryParams().preview
            && (
              <a
                href="/forms/application-for-admission"
                className="btn btn-success"
                style={{ width: '100%', marginBottom: 20 }}
              >
                <span style={{ fontSize: '1.2em' }}>
                  Application for Admission
                </span>
              </a>
            )
          }

          {RenderSidebarList}

          {getQueryParams().preview
            && (
              <PanelLinkList key={genRandId()} header="Related Forms" data={formItems} />
            )
          }

        </Col>
      </Row>
    </div>
  );
}

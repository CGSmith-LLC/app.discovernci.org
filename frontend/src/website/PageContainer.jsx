import React from 'react';
import PropTypes from 'prop-types';

import Page from './Page';
import {
  childrensHouse, lowerEl, upperEl, adolescent
} from './montessori/montessoriClassroomData';

PageContainer.propTypes = {
  params: PropTypes.shape({ slug: PropTypes.string }).isRequired
};

export default function PageContainer({ params }) {
  const getPageData = type => ({
    'childrens-house': childrensHouse,
    'lower-elementary': lowerEl,
    'upper-elementary': upperEl,
    adolescent
  }[type]);

  const page = getPageData(params.slug);

  return (
    page
      ? (
        <Page
          pageTitle={page.pageTitle}
          bannerPhoto={page.bannerPhoto}
          bodyContent={page.bodyContent}
          sidebarList={page.sidebarList}
        />
      )
      : <span />
  );
}

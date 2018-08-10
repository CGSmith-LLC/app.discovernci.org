import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import Helmet from 'react-helmet';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';

import { PanelLinkList, PanelMediaList } from '../common';

import { locations } from '../db';

class LocationDetail extends React.Component {

  static propTypes = {
    params: PropTypes.shape({
      location: PropTypes.string
    }).isRequired,
    locationDetailQuery: PropTypes.shape({
      location: PropTypes.object
    })
  }

  static defaultProps = {
    locationDetailQuery: {
      location: []
    }
  }

  componentWillMount() {
    this.updateLocationBgImg();
  }

  componentWillUpdate(nextProps) {
    this.updateLocationBgImg(nextProps.params.location);
  }

  updateLocationBgImg = (slug = this.props.params.location) => {
    document.body.style.backgroundImage = `url(${_.find(locations, { slug }).bgImg})`;
  }

  render() {
    const location = this.props.locationDetailQuery.location
      ? this.props.locationDetailQuery.location
      : {};

    // console.log(this.props)

    return (
      /**
       * We add a key here so that it forces React to re-render the entire page.
       * It's not too costly, being that it's just a simple page and fixes the
       * issue where there is lag in images being swapped out across locations.
       */
      <div key={location && location.id}>

        <Helmet
          title={`Outdoor EE Program in ${location.name} - Nature's Classroom Institute`}
          link={[
              { rel: 'canonical', href: `https://discovernci.org/environmental/${location.slug}` }
          ]}
          meta={[
              { property: 'og:url', content: `https://discovernci.org/environmental/${location.slug}` },
              { property: 'og:title', content: `Outdoor Environmental Education in ${location.name}` },
              { property: 'og:image', content: location.ogImage },
              { property: 'og:description', content: location.ogDescription }
          ]}
        />

        <Row>
          <Col md={10} mdOffset={1}>

            {location.specialMsg &&
              <span dangerouslySetInnerHTML={{ __html: location.specialMsg }} />
            }

            {location.heroImage &&
              <img src={`/media/${location.heroImage}`} className="img-responsive img-rounded" alt="" />
            }

          </Col>
        </Row>

        <Row className="top-30">
          <Col md={6} mdOffset={1}>
            <h1 style={{ marginTop: 0 }} className="bottom-30">{location.name}</h1>
            <span dangerouslySetInnerHTML={{ __html: location.body }} />
          </Col>

          <Col md={4}>

            {location.openEnrollment &&
              <Link to="/dashboard" className="teacher-register-btn">
                <FontAwesome name="users" fixedWidth /> Parent / Teacher Access
                  {/* <span className="subline"></span> */}
              </Link>
            }

            {location.sidebarJson &&
              <PanelLinkList header="General Information" data={JSON.parse(location.sidebarJson).sidebarGeneralInfo} />
            }

            {location.primaryContact &&
              <PanelMediaList header="Contacts" data={[location.primaryContact]}>
                <span>
                  <hr />

                  <p style={{ fontFamily: 'helvetica, sans-serif' }}>Nature&apos;s Classroom Institute
                    <br />{location.addressUrl
                      ? <a href={location.addressUrl} target="_blank" rel="noopener noreferrer">{location.address }</a>
                      : <span>{location.address}</span>
                    }
                  </p>

                  <hr />

                  <ul className="nostyle" style={{ fontFamily: 'helvetica, sans-serif' }}>
                    <li><FontAwesome name="phone" fixedWidth /> <a href="tel:{location.primaryContact.phone}">{location.phone}</a></li>
                  </ul>
                </span>
              </PanelMediaList>
            }

            {/* <span dangerouslySetInnerHTML={{ __html: location.sidebarJson }} /> */}

          </Col>

        </Row>
      </div>
    );
  }
}

const LOCATION_DETAIL_QUERY = gql`
  query LocationDetailQuery($slug: String!) {
    location(slug: $slug) {
      id
      name
      shortName
      slug
      openGraphImage
      openGraphDesc
      sidebarJson
      address
      addressUrl
      openEnrollment
      phone
      body
      bgImage
      heroImage
      primaryContact {
        id
        name
        rank
        title
        phone
        profileIcon
      }
    }
  }
`;

export default graphql(LOCATION_DETAIL_QUERY, {
  name: 'locationDetailQuery',
  options: ownProps => ({ variables: { slug: ownProps.params.location } })
})(LocationDetail);

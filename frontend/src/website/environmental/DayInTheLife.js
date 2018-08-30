import React from 'react';
import Helmet from 'react-helmet';
import { Row, Col } from 'react-bootstrap';

export default class DayInTheLife extends React.Component {

  componentWillMount() {
    document.body.style.backgroundImage = 'url(/discovernci_media/NapaCaliforniaBg2.jpg)';
  }

  render() {
    return (
      <div>

        <Helmet
          title="A Day in the Life at Nature's Classroom Institute"
          link={[
              { rel: 'canonical', href: 'https://discovernci.org/environmental/a-day-in-the-life' }
          ]}
          meta={[
              { property: 'og:url', content: 'https://discovernci.org/environmental/a-day-in-the-life' },
              { property: 'og:title', content: "A Day in the Life at Nature's Classroom Institute" },
              { property: 'og:image', content: '/discovernci_media/nci-og-ee-ADayInTheLife-Environmental-Education.jpg' },
              { property: 'og:description', content: "A typical day at Nature's Classroom Institute is... not so typical. We take ordinary moments and transform them into highly engaging, highly educational, highly reflective experiences." }
          ]}
        />

        <Row className="top-40">
          <Col md={10} mdOffset={1}>
            <img
              src="/discovernci_media/ADayInTheLife.jpg"
              className="img-responsive img-rounded"
              alt="presentation"
            />
          </Col>
        </Row>

      </div>
    );
  }
}

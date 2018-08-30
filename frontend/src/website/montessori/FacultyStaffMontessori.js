import _ from 'lodash';
import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Helmet from 'react-helmet';

import { facultyStaffList } from '../db';

export default function MyComponent() {
  const filteredFacultyStaffList = _.orderBy(_.filter(facultyStaffList, { locations: [7] }), ['rank']);
  const showList = filteredFacultyStaffList.map(person => (
    <Row key={person.id}>
      <Col md={3} mdOffset={2}>
        {!!person.image
          ? <img
            src={person.image}
            className="img-responsive img-rounded bottom-30"
            alt="presentation"
          />
          : ''
        }
      </Col>
      <Col md={5}>
        <h2>{person.name}</h2>
        <h4>{person.title}</h4>
        <span dangerouslySetInnerHTML={{ __html: person.bio }} />
      </Col>
    </Row>
  ));

  return (
    <Grid className="grid-container">

      <Helmet title="Montessori School Staff and Faculty - Nature&apos;s Classroom Institute" />

      <Row>
        <Col md={10} mdOffset={1} className="center">
          <h3>Nature&apos;s Classroom Institute Faculty and Staff</h3>
          <h1>Montessori School Faculty and Staff</h1>

          <p>&ldquo;Our care of the child should be governed, not by the desire to make him learn
             things, but by the endeavor always to keep burning within him that light which is
             called intelligence.&rdquo;  Maria Montessori</p>

          <p>&ldquo;Montessori teachers are not servants of the child’s body…We must help the
            child to act for himself, will for himself, think for himself; this is the art of
            those who aspire to serve the spirit.&rdquo; Maria Montessori</p>
        </Col>
      </Row>

      {showList}


    </Grid>
  );
}

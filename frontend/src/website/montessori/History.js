import React from 'react';
import Helmet from 'react-helmet';
import { Grid, Row, Col } from 'react-bootstrap';

export default function Tuition() {
  return (
    <Grid className="grid-container">

      <Helmet title="History of Nature&apos;s Classroom Institute and Montessori School" />

      <Row className="top-30">
        <Col md={10} mdOffset={1} className="center bottom-30">

          <h1 className="center" style={{ marginTop: 13 }}>
            History of Nature&apos;s Classroom Institute
          </h1>

        </Col>
      </Row>

      <Row className="bottom-50">
        <Col md={6} mdOffset={3}>

          <h2>Purpose</h2>

          <p>Nature’s Classroom Institute Montessori is a private non-denominational school
            committed to providing excellent education for children from diverse backgrounds, ages
            3 to 15 years. Our child-centered school promotes joy in learning and positive
            character development. Professionally trained teachers, using a carefully prepared
            environment, guide each student through the natural stages of learning.The school
            curriculum of Nature’s Classroom Institute Montessori implements the Montessori
            philosophy and methodology. The environment stimulates intellectual, emotional, social,
            physical and cultural growth. The school promotes the development of self-motivation,
            independence, curiosity, cooperation, and concern for others within the framework of a
            strong academic program. Parents are encouraged to support and participate in school
            activities and to share in their children’s educational experience. Nature’s Classroom
            Institute Montessori does not discriminate on the basis of race/ethnicity, color,
            national origin, sex, disability, veteran status, sexual orientation, or age in the
            administration of any of its employment, educational programs, admissions policies,
            scholarship and loan programs, athletics, recreational, and other school-administered
            programs.</p>

          <h2>History</h2>

          <p>In 1995, Geoffrey Bishop established Nature’s Classroom Institute of Wisconsin, Inc.
            (NCI) in Spring Green, Wisconsin. It gave school students the opportunity to experience
            a hands-on, multidisciplinary curriculum with an emphasis on field study and community
            living. An environmental educator himself, Geoffrey believed that students needed more
            than what a typical classroom could offer them. Two years later Nature&apos;s Classroom
            Institute relocated to the Perlman Conference Center in Mukwonago, Wisconsin. In 2002,
            Geoffrey was honored for his personal commitment to the environment with the Wisconsin
            Environmental Education Award for Non-Formal Educator of the Year.He founded
            nature&apos;s Classroom Institute Montessori the same year beginning with a
            Children&apos;s House Calssroom and 10 students. Currently, the school serves over 60
            children ages 3 years through 9th grade.</p>

        </Col>
      </Row>

    </Grid>
  );
}

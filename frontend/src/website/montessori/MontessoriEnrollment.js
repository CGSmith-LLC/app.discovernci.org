import React from 'react';
import { Link } from 'react-router';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import Helmet from 'react-helmet';


export default function EventCalendar() {
  return (
    <Grid className="grid-container">

      <Helmet title="Enrollment Information - Nature&apos;s Classroom Institute and Montessori School" />

      <Row className="top-30">
        <Col xs={6} md={6} mdOffset={1}>

          <h4 style={{ marginBottom: 0 }}>Nature&apos;s Classroom Montessori in Mukwonago, WI</h4>
          <h1 style={{ marginTop: 0 }}>Procedure for Admissions</h1>

          <p>Nature&apos;s Classroom Montessori admits students of any economic and social class,
            racial and ethnic heritage, religious belief and family structure. In order to be
            considered for our Children&apos;s House, a child must be between 2 1/2 and 6 years of
            age and toileting independently, by September 1st of that school year. Children who are
            between 6 and 12 years by September 1st can be considered for our elementary program.
            The following is a listing of specific steps in our admissions process:</p>

          <ol>

            <li>We ask interested parents to observe at the school and participate in an
              informational meeting. Call for an appointment (262-363-2815) or send an email to
              {' '}<a href="mailto:office@nciw.org">office@nciw.org</a>. The Executive Director will be
              present to answer your questions.</li>

            <li>When the decision to apply is made, complete the application form and send it to
              the school with a non-refundable $50.00 application fee.
              <br /><br /><strong>Deadline: 5:00pm on April 1st prior to the school year.</strong>
              <br /> Applications received after that date will be considered after the first round
              of admissions decisions are made.</li>

            <li>If you applied for an Elementary position, the teachers will help you schedule a
              school visit day for your child.</li>

            <li>Admission decisions are made by administration and teaching staff. These decisions
              are based on an evaluation of the child&apos;s school visit, school transcripts, and
              the needs of existing classes with regard to balance of age, sex, and ethnic
              diversity. Parents will be contacted regarding our admission decision by
              <strong>April 15th</strong>. If a position is offered to your child at this time, you
              will receive an acceptance letter and an enrollment contract. The contract and a
              non-refundable $500.00 tuition deposit will be due by <strong>May 15th</strong>. Upon
              receipt of the contract and tuition deposit, we will hold a place for your child in
              our program and you will be contractually obligated for the year&apos;s tuition. (The
              school will forgive tuition after a withdrawal only if we are able to replace the
              student withdrawn with another child of the same age and sex
              from our waiting list.)</li>

            <li>If a place is not immediately available, you may wish to be placed in our wait
              group. You will receive notification of waiting list status by
              <strong>April 15th</strong>. We occasionally experience drops through the summer and
              urge parents to remain in the wait group.</li>

            <li>If it is our judgment that your Elementary child would have a difficult time in a
              Montessori environment, we will inform you immediately after the visit day. If in
              reviewing applications in early May, we feel that it is unlikely that we will find a
              place for your child, we will inform you at that time. In any case, you will know
              our decision by <strong>April 15th</strong>.</li>

            <li>Children on the waiting list for the current year must reapply for acceptance the
              following year. Application fees need to be paid only once.</li>

          </ol>

          <h4>Nature’s Classroom Student Placement Policy</h4>

          <p>Student Placement takes place after the school is in receipt of a signed contract with
            deposit from the family. In the event that there is more than one classroom for a
            Montessori level, many considerations are made for the placement of a student.
            Some of them are:</p>

          <ul>
            <li>Balancing age of children</li>
            <li>Balancing gender</li>
            <li>Sibling relationships</li>
            <li>Needs of the classroom environment</li>
          </ul>

          <p>Placement discussions occur between the administration and faculty in early August. A
            letter welcoming the family to a specific classroom is customarily sent by the school
            and teacher along with the registration and beginning of school information packet. If,
            after this placement letter has gone out, the family decides to delay enrollment for
            any reason (toilet training, readiness, etc.), the placement is withdrawn and the spot
            offered to the next child on the waiting list. When the family decided to re-enroll
            their child, the above considerations will be factored in again and the child placed
            accordingly.</p>

          <p>The School Administration appreciates and acknowledges the valuable inputs by a
            child&apos;s family regarding placement but has the final say as to which
            they will be in.</p>

        </Col>

        <Col md={4}>

          <Panel header="Additional Resources">
            <ul className="nostyle">
              <li style={{ listStyle: 'bullet' }}><Link to="/contact">Schedule an Observation</Link></li>
              <li style={{ display: 'block', borderBottom: '1px solid #e6e6e6', marginBottom: 10, paddingTop: 10 }} />
              <li>
                <a href="https://nciw.s3.amazonaws.com/discovernci_media/2018-2019-Admission-Applications.pdf" target="_blank" rel="noopener noreferrer">
                  <FontAwesome name="file-pdf-o" fixedWidth />{' '}
                  Application for Admission
                </a>
              </li>
            </ul>
          </Panel>

          <Panel header="Medical Information">
            <ul className="nostyle">
              <li>
                <a href="https://www.dhs.wisconsin.gov/forms/f0/f04020l.pdf" target="_blank" rel="noopener noreferrer">
                  <FontAwesome name="file-pdf-o" fixedWidth />{' '}
                  Immunization Record Form
                </a>
              </li>
              <li>
                <a href="https://www.dhs.wisconsin.gov/publications/p44021.pdf" target="_blank" rel="noopener noreferrer">
                  <FontAwesome name="file-pdf-o" fixedWidth />{' '}
                  Immunization Law Requirements
                </a>
              </li>
            </ul>
          </Panel>

        </Col>

      </Row>

    </Grid>
  );
}

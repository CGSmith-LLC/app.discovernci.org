import React from 'react';
import { Grid, Row, Col, Table } from 'react-bootstrap';
import Helmet from 'react-helmet';

import { PanelLinkList } from '../common';

const resources = [
  { rank: 0, title: 'Application for Admission', url: 'http://nciw.s3.amazonaws.com/discovernci_media/2017-2018-Admission-Applications.pdf', faName: 'file-pdf-o' },
  { rank: 1 },
  { rank: 2, title: 'Private School Tuition FAQ', url: 'https://www.revenue.wi.gov/Pages/faqs/ise-privscht.aspx' },
  { rank: 3, title: 'Private School Tax Form (PDF)', url: 'https://www.revenue.wi.gov/dorforms/2015SchedulePS.pdf' }
];

export default function Tuition() {
  return (
    <Grid className="grid-container">

      <Helmet title="Tuition - Nature&apos;s Classroom Institute and Montessori School" />

      <Row className="top-30">
        <Col md={10} mdOffset={1}>

          <h1 className="bottom">Tuition & Program Fees: 2018 - 2019</h1>

          <p className="bottom-30 top-10">Nature&apos;s Classroom Montessori tuition rates are
            based on the academic school year from September to June. Our childcare program is
            open only to students attending our Montessori school. Childcare is only available
            when school is in session full days.</p>

          <h2>Montessori Academic Program Tuition Fees</h2>

          <Table striped bordered>
            <thead style={{ background: '#3CB67B', color: 'white' }}>
              <tr>
                <th colSpan={3} />
                <th>Option A Full Amount <br />Due Aug 15</th>
                <th>Option B Semi-annual <br />Due Aug 15 & Jan 15</th>
                <th>Option C Monthly <br />Due Aug 15 - May 15</th>
              </tr>
              <tr style={{ background: '#EAFFF4', color: '#333333' }}>
                <td colSpan={6} style={{ textAlign: 'right', paddingRight: 50 }}>
                  <i>Less $500 enrollment deposit***</i>
                </td>
              </tr>
              <tr style={{ background: '#E9FFF4', color: '#333333' }}>
                <th>Programs</th>
                <th>Times (Mon-Fri)</th>
                <th>Tuition</th>
                <th>Full</th>
                <th>50/50</th>
                <th>10 monthly payments</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Children’s House - Half Day</td>
                <td>8:30am - 11:30am</td>
                <td>$6,500</td>
                <td>$6,000</td>
                <td>$3,000</td>
                <td>$600</td>
              </tr>
              <tr>
                <td>Children’s House - Full Day</td>
                <td>8:30am - 3pm</td>
                <td>$7,350</td>
                <td>$6,850</td>
                <td>$3,425</td>
                <td>$685</td>
              </tr>
              <tr>
                <td colSpan={2}>CH Full Day sibling discount</td>
                <td>$6,615</td>
                <td>$6,115</td>
                <td>$3,057.50</td>
                <td>$611.50</td>
              </tr>
              <tr>
                <td>Lower Elementary - 1st - 3rd grade</td>
                <td>8:15am - 3:20pm</td>
                <td>$8,100</td>
                <td>$7,600</td>
                <td>$3,800</td>
                <td>$760</td>
              </tr>
              <tr>
                <td>Upper Elementary - 4th - 6th grade</td>
                <td>8:15am - 3:20pm</td>
                <td>$8,100</td>
                <td>$7,600</td>
                <td>$3,800</td>
                <td>$760</td>
              </tr>
              <tr>
                <td>Adolescent Program</td>
                <td>8am - 3:20pm</td>
                <td>$8,100</td>
                <td>$7,600</td>
                <td>$3,800</td>
                <td>$760</td>
              </tr>
              <tr>
                <td colSpan={2}>LE/UE/AD sibling discount</td>
                <td>$7,290</td>
                <td>$6,790</td>
                <td>$3,395</td>
                <td>$679</td>
              </tr>
            </tbody>
          </Table>

          <h2>Before/After Care, Materials & Supply Fees</h2>

          <Table striped bordered>
            <thead style={{ background: '#3CB67B', color: 'white' }}>
              <tr>
                <th>Material & Supply Fees</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Consumable Supply Fee</strong></td>
                <td>Classroom supplies: pens, paper, pencils, paint, folders, etc</td>
                <td>$55</td>
              </tr>
              <tr>
                <td><strong>Educational Materials Fee</strong></td>
                <td>Applied to the purchase and maintenance of educational materials</td>
                <td>Children’s House - $190<br />LE/UE/AD - $440</td>
              </tr>
            </tbody>
            <thead>
              <tr>
                <th colSpan={3}>Childcare Rates**</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Before care 7:30 – 8:30am</strong></td>
                <td>Semester contract</td>
                <td>$8/day</td>
              </tr>
              <tr>
                <td></td>
                <td>Drop in</td>
                <td>$10/day</td>
              </tr>
              <tr>
                <td><strong>After care 3 – 5pm</strong></td>
                <td>Semester contract</td>
                <td>$14/day</td>
              </tr>
              <tr>
                <td></td>
                <td>Drop in</td>
                <td>$16/day</td>
              </tr>
              <tr>
                <td colSpan={2} style={{ textAlign: 'center' }}>Students staying after 5pm will be assessed additional charges</td>
                <td>$5/15 mins after 5pm per family</td>
              </tr>
              <tr style={{ background: '#e8fff4' }}>
                <td><strong>Pizza Fridays</strong></td>
                <td>Lunch fees billed every 3 months</td>
                <td>$3/meal</td>
              </tr>
              <tr style={{ background: '#e8fff4' }}>
                <td><strong>Field trips</strong></td>
                <td>Assessed and collected by teacher per event</td>
                <td>Varies on admission cost & location</td>
              </tr>
            </tbody>
          </Table>

          <p style={{ fontSize: '1em', fontFamily: 'Helvetica, sans-serif' }}>*Nature’s Classroom Montessori tuition rates are based on the academic school year from September 2018 to June 2019.</p>
          <p style={{ fontSize: '1em', fontFamily: 'Helvetica, sans-serif' }}>**Our childcare program is only available to students attending NCM and if there is a minimum of 2 children signed up per semester. Childcare is only offered when school is in session full days.</p>
          <p style={{ fontSize: '1em', fontFamily: 'Helvetica, sans-serif' }}>***Non-refundable enrollment deposit due with contract and applied against tuition. Valid for one year after date of receipt.</p>


        </Col>
      </Row>

      <Row>
        <Col md={6} mdOffset={1}>

          <h2>Payment Options</h2>

          <Table striped bordered>
            <thead style={{ background: '#3CB67B', color: 'white' }}>
              <tr>
                <th>Options</th>
                <th>Payment Plan for Tuition</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A - Full</td>
                <td>Full payment by August 15, 2017</td>
              </tr>
              <tr>
                <td>B - 50/50</td>
                <td>Payment due August 15,  2017 & January 15, 2018</td>
              </tr>
              <tr>
                <td>C - Monthly Montessori Program</td>
                <td>10 equal payments due August 15 - May 15</td>
              </tr>
            </tbody>
          </Table>

        </Col>
        <Col md={4} className="top-30">

          <PanelLinkList
            header="Additional Resources"
            data={resources}
          />

        </Col>
      </Row>

    </Grid>
  );
}

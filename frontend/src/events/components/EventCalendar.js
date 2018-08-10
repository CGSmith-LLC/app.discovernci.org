import React from 'react';
import Helmet from 'react-helmet';
import { Grid, Row, Col } from 'react-bootstrap';

export default function EventCalendar() {
  return (
    <Grid className="grid-container">
      <Helmet title="School Calendar - Nature&apos;s Classroom Institute and Montessori School" />

      <h1 className="center" style={{ fontSize: '2.4em' }}>Nature&apos;s Classroom Montessori School Calendar</h1>

      {/* <Row>
        <Col md={8} mdOffset={2}>

          <iframe
            src="//www.google.com/calendar/embed?showTitle=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;height=650&amp;wkst=1&amp;bgcolor=%23ffffff&amp;src=5srg9q0f9tt99a4eb9ehi3c0po%40group.calendar.google.com&amp;color=%23B1440E&amp;ctz=America%2FChicago"
            width="100%"
            height="550"
            frameBorder="0"
            scrolling="no"
            style={{
              borderWidth: 0,
              marginTop: 20,
              marginBottom: 20
            }}
          />

        </Col>
      </Row>

      <p className="center">
        <a
          href="https://calendar.google.com/calendar/ical/5srg9q0f9tt99a4eb9ehi3c0po%40group.calendar.google.com/public/basic.ics"
          target="_blank"
          rel="noopener noreferrer"
        >
          Subscribe to the Google Calendar
        </a>{' '}
        version of our Calendar so that NCI events show up along-side all your other calendars.
      </p> */}

      <Row className="top-30">
        <Col md={10} mdOffset={1} xs={12}>
          <img
            src="//nciw.s3.amazonaws.com/discovernci_media/calendar.jpg"
            className="img-responsive"
            alt=""
            style={{ marginBottom: 60 }}
          />
        </Col>
      </Row>

    </Grid>
  );
}

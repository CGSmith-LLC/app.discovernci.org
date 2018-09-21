import React from 'react';
import Helmet from 'react-helmet';
import { Grid, Row, Col } from 'react-bootstrap';

export default function EventCalendar() {
  return (
    <Grid className="grid-container">
      <Helmet title="School Calendar - Nature&apos;s Classroom Institute and Montessori School" />

      <h1 className="center" style={{ fontSize: '2.4em' }}>Nature&apos;s Classroom Montessori School Calendar</h1>

        <p className="center">
            <a href="/documents/calendar.pdf" className="btn btn-success"><span aria-hidden="true" className="fa fa-file-pdf-o fa-fw"></span>Calendar Download</a>
        </p>
      <Row>
        <Col md={8} mdOffset={2}>

          <iframe
            title="Nature's Classroom Montessori Google Calendar"
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
          rel="nofollow noopener noreferrer"
        >
          Subscribe to the Google Calendar
        </a>{' '}
        version of our Calendar so that NCM events show up along-side all your other calendars.
      </p>

      <Row className="top-30">
        <Col md={10} mdOffset={1} xs={12}>
          <img
            src="/discovernci_media/calendar.jpg"
            className="img-responsive"
            alt="Montessori Calendar"
            style={{ marginBottom: 60 }}
            height="1200"
            width="1566"
          />
        </Col>
      </Row>

    </Grid>
  );
}
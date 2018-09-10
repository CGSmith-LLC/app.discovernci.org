import React from 'react';
import Helmet from 'react-helmet';
import { Row, Col } from 'react-bootstrap';

export default class Locations extends React.Component {

  componentWillMount() {
    document.body.style.backgroundImage = 'url(//nciw.s3.amazonaws.com/discovernci_media/bg3.jpg)';
  }

  render() {
    return (
      <Row>

        <Helmet
          title="Outdoor Environmental Education Programs - Nature's Classroom Institute"
          link={[
              { rel: 'canonical', href: 'https://discovernci.org/environmental' }
          ]}
          meta={[
              { property: 'og:url', content: 'https://discovernci.org/environmental' },
              { property: 'og:title', content: "Outdoor Environmental Education Program - Nature's Classroom Institute" },
              { property: 'og:image', content: 'http://nciw.s3.amazonaws.com/discovernci_media/nci-og-ee-home.jpg' }
          ]}
        />

        <Col xs={6} md={6} mdOffset={1}>
          <p>Nature&apos;s Classroom Institute is the nation&apos;s premier environmental education program. We offer a fully customized, highly engaging 3, 4 or 5 day experience that has direct positive impacts on classroom community and academic performance. Our multi-disciplined, degreed educators integrate lessons with the curriculum of visiting schools in order to reinforce what is being taught in the classroom. With thousands of classes and activities to choose from, we create unique and individualized experiences for each and every student and teacher.</p>

          <h3>An Extension of the Classroom</h3>
          <p>Nature&apos;s Classroom Institute is a place where students begin to value their education. We broaden their perspectives to see that learning is not all textbooks, not all desk, but that school is where they obtain the skills necessary for other, more exciting things. Our goal is to motivate students to learn, to integrate social development with academic experiences, and to strengthen the link between school and the "real world."</p>


          <h3>A Student&apos;s Choice</h3>
          <p>We involve students in the learning process and allow them to choose which classes they take. By encouraging students to follow their interests we instill confidence, motivate them to seek out knowledge, and empower them develop new areas of interest.</p>

          <h3>More Than Just Science</h3>
          <p>Teachers at Nature&apos;s Classroom Institute incorporate the whole environment, teaching through the elements of the world around us, so that students can experience and truly understand not just science but all subjects, including mathematics, social studies, history, and language arts.</p>


          <h3>HOW DO STUDENTS BENEFIT?</h3>
          <ul>
            <li>An improved	self-concept</li>
            <li>A motivation to	learn</li>
            <li>An understanding of what education can offer</li>
            <li>An appreciation	for the individuality and uniqueness of each person</li>
            <li>An ability to work with others for the positive benefit of all community members</li>
            <li>A greater awareness of environment and their role within it</li>
            <li>An enhancement of the life skills to help them succeed, grow, and become the next generation’s leaders</li>
          </ul>

          <h3>WHAT DOES NATURE'S CLASSROOM INSTITUTE OFFER?</h3>

          <ul>
            <li>Free explanatory presentations to teacher, parents and school administrators</li>
            <li>Customized multi-disciplinary programming to correlate or expand on your classroom curriculum</li>
            <li>Degreed and experienced educators, including an Education Director</li>
            <li>1:12 teacher/student ratio</li>
            <li>Group and team-building field experience which improves peer bonding, self development, positive communication, leadership skills and the ability to problem solve</li>
            <li>Student choice and "hands-on" integrative approach to learning which awakens curiosity and elevates comprehension</li>
            <li>A tried and true environmental education residential program with nearly 20 years experience</li>
            <li>Lodging: comfortable air-conditioned and heated facilities; Handicap accessibility is site dependent</li>
            <li>Food: served family-style with the ability to accommodate special dietary needs</li>
            <li>Medical Response: medical staff on-call</li>
          </ul>

          <p>Nature&apos;s Classroom Institute offers students, teachers, and parents around the nation the ability to partake in a unique and individualized educational experience. Our program is growing quickly!</p>
          <p>Each of our locations offers:</p>
          <ul>
            <li>Weatherized, clean living quarters</li>
            <li>Overnight accommodations, meals and snacks</li>
            <li>1:12 student teacher ratio</li>
            <li>Custom-designed programming, day and evening</li>
            <li>All equipment and supplies</li>
            <li>24 hour supervision including overnight supervision of students</li>
          </ul>
          <p>Additionally, at each location we have a Education Director to help you walk through the process of bringing your class to Nature&apos;s Classroom Institute. We will organize a presentation for a school principal or school board, as well as one for parents and students, so that everyone is engaged, excited, and ready for an incredible educational experience!</p>
        </Col>
        <Col md={4}>

          <img src="//nciw.s3.amazonaws.com/discovernci_media/imgHappyTreeFriends.jpg" className="img-responsive img-rounded" alt="presentation" />

          <img src="//nciw.s3.amazonaws.com/discovernci_media/spring3.jpg" className="img-responsive img-rounded top-30" alt="presentation" />

          <img src="//nciw.s3.amazonaws.com/discovernci_media/helping.jpg" className="img-responsive img-rounded top-30" alt="presentation" />

          <img src="//nciw.s3.amazonaws.com/discovernci_media/ObservationDeck.jpg" className="img-responsive img-rounded top-30" alt="presentation" />

          <img src="//nciw.s3.amazonaws.com/discovernci_media/MeasuringOutside.jpg" className="img-responsive img-rounded top-30" alt="presentation" />

          <img src="//nciw.s3.amazonaws.com/discovernci_media/HappyCrew.jpg" className="img-responsive img-rounded top-30" alt="presentation" />

          <img src="//nciw.s3.amazonaws.com/discovernci_media/Feeding.jpg" className="img-responsive img-rounded top-30" alt="presentation" />

          <img src="//nciw.s3.amazonaws.com/discovernci_media/BoysInThaTrees.jpg" className="img-responsive img-rounded top-30" alt="presentation" />

        </Col>
      </Row>
    );
  }
}

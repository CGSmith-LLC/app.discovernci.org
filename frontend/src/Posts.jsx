import React from 'react';
import PropTypes from 'prop-types';
import renderHTML from 'react-render-html';
import Moment from 'react-moment';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';
import { Row, Col, Panel } from 'react-bootstrap';
import { Link } from 'react-router';

PostList.propTypes = {
  loading: PropTypes.bool,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      slug: PropTypes.string,
      publishDate: PropTypes.string,
      post: PropTypes.string,
      isPinned: PropTypes.bool,
      created: PropTypes.string,
      modified: PropTypes.string
    })
  )
};

PostList.defaultProps = {
  loading: true,
  posts: []
};

export default function PostList({ loading, posts }) {
  const getAbsoluteUrl = (post) => {
    const dateString = moment(post.publishDate).format('YYYY/MMM/').toLowerCase();
    return `/montessori/parents/${dateString}${post.slug}`;
  };

  return (
    <Row>
      <img
        src="//nciw.s3.amazonaws.com/discovernci_media/artwork-header-001.jpg"
        className="img-responsive img-rounded"
        style={{ marginBottom: 15, borderRadius: '4px 4px 0 0' }}
        alt=""
      />
      <Col md={6} mdOffset={1}>
        <h2>Parents Corner Homepage</h2>
        {posts.length > 0
          ? posts.map(post =>
            <div key={post.id} className="post-in-list">
              <h3><Link to={getAbsoluteUrl(post)}>{post.title}</Link></h3>
              <span className="dateline" title={post.publishDate}>Posted <Moment fromNow>{post.publishDate}</Moment></span>
              {post.post && renderHTML(post.post)}
              <hr />
            </div>
          )
          : loading
              ? 'Loading...'
              : 'Posts could not be loaded at this time'
        }
      </Col>
      <Col md={4}>

        <Panel header="General Resources" style={{ marginTop: 30 }}>
          <ul className="spaced-list">
            <li><a href="http://nciw.s3.amazonaws.com/documents/2017_yearly_calendar_updated.pdf" target="_blank" rel="noopener noreferrer"><FontAwesome name="calendar" fixedWidth /> 2017-2018 Yearly Calendar</a></li>
            <li><a href="https://www.facebook.com/NaturesClassroomMontessori/" target="_blank" rel="noopener noreferrer"><FontAwesome name="facebook-square" fixedWidth /> NCM Facebook Page</a></li>
            <li><a href="http://www.companycasuals.com/naturesclassroom/start.jsp" target="_blank" rel="noopener noreferrer"><FontAwesome name="shopping-basket" fixedWidth /> School Store</a></li>
            <li><a href="https://www.facebook.com/NaturesClassroomMontessori/" target="_blank" rel="noopener noreferrer"><FontAwesome name="facebook-official" fixedWidth /> NCM Facebook Page</a></li>
            <li><a href="https://www.tmj4.com/weather/school-closings-delays" target="_blank" rel="noopener noreferrer"><FontAwesome name="frown-o" fixedWidth /> School Closings Site</a></li>
            <li style={{ display: 'block', borderBottom: '1px solid #e6e6e6', marginBottom: 10, paddingTop: 10 }} />
            <li>
              <a href="http://nciw.s3.amazonaws.com/discovernci_media/2017-2018-Admission-Applications.pdf" target="_blank" rel="noopener noreferrer">
                <FontAwesome name="file-pdf-o" fixedWidth />{' '}Application for Admission
              </a>
            </li>
            <li style={{ display: 'block', borderBottom: '1px solid #e6e6e6', marginBottom: 10, paddingTop: 10 }} />
            <li><FontAwesome name="book" fixedWidth /> NCM Handbooks for 2017-2018
              <ul>
                <li><a href="https://nciw.s3.amazonaws.com/documents/handbooks/2017-2018_Children's_House_Handbook.pdf">Children's House</a></li>
                <li><a href="https://nciw.s3.amazonaws.com/documents/handbooks/2017-2018_Elementary_Handbook.pdf">Elementary</a></li>
                <li><a href="https://nciw.s3.amazonaws.com/documents/handbooks/2017-2018_Adolescent_Handbook.pdf">Adolescent</a></li>
              </ul>
            </li>
            <li><FontAwesome name="tumblr-square" fixedWidth /> NCM Tumblr Blogs
              <ul>
                <li><a href="http://www.nciwch.tumblr.com/">Children's House</a></li>
                <li><a href="http://www.ncilowerel.tumblr.com/">Lower Elementary</a></li>
                <li><a href="http://www.nciwue.tumblr.com/">Upper Elementary</a></li>
                <li><a href="http://www.nciwad.tumblr.com/">Adolescent</a></li>
              </ul>
            </li>
          </ul>
        </Panel>

        <Link to="/montessori/calendar" style={{ float: 'right' }}>View School Calendar</Link>

        <h3>Getting Involved</h3>
        <p style={{ fontSize: '1.1em' }}>When a child enrolls at NCI Montessori, we welcome the child and their family into our community. We request each of our families contribute 20 hours of involvement each year. When children see parents involved in their school, it reinforces in them the value placed on education. This in turn strengthens the home/school connection and enriches a child’s learning experience in a multitude of ways. Through our Parent Organization (PABC) we offer many and diverse ways for families to stay connected and up-to-date. Thank you for supporting NCI Montessori.</p>

      </Col>

    </Row>
  );
}

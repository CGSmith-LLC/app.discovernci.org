import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';
import { Panel } from 'react-bootstrap';

AdditionalResourcesPanel.propTypes = {};

AdditionalResourcesPanel.defaultProps = {};

export default function AdditionalResourcesPanel() {
  return (
    <Panel header="Additional Resources">
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li><Link to="/montessori/faculty-staff"><FontAwesome name="users" fixedWidth />{' '}Faculty and Staff</Link></li>
        <li><Link to="/montessori/calendar"><FontAwesome name="calendar-o" fixedWidth />{' '}School Calendar</Link></li>
        <li><Link to="/montessori/parents"><FontAwesome name="commenting" fixedWidth />{' '}Parent&apos;s Corner / PABC</Link></li>
        <li style={{ display: 'block', borderBottom: '1px solid #e6e6e6', marginBottom: 10, paddingTop: 10 }} />
        <li style={{ listStyle: 'bullet' }}><Link to="/contact">Schedule an Observation</Link></li>
        <li style={{ listStyle: 'bullet' }}><Link to="/montessori/tuition">Tuition and Fees</Link></li>
        <li style={{ listStyle: 'bullet' }}><Link to="/montessori/enrollment">Enrollment</Link></li>
        <li style={{ display: 'block', borderBottom: '1px solid #e6e6e6', marginBottom: 10, paddingTop: 10 }} />
        <li><a href="https://www.facebook.com/NaturesClassroomMontessori/" target="_blank" rel="noopener noreferrer">NCI Montesori Facebook page</a></li>
        <li><a href="https://www.facebook.com/groups/469365056553520/" target="_blank" rel="noopener noreferrer">Parents Corner Facebook Page</a></li>
        <li><a href="http://www.companycasuals.com/naturesclassroom/start.jsp" target="_blank" rel="noopener noreferrer">School Store</a></li>
        <li style={{ display: 'block', borderBottom: '1px solid #e6e6e6', marginBottom: 10, paddingTop: 10 }} />
        <li>
          <a href="//nciw.s3.amazonaws.com/discovernci_media/2017-2018-Admission-Applications.pdf" target="_blank" rel="noopener noreferrer">
            <FontAwesome name="file-pdf-o" fixedWidth />{' '}Application for Admission
          </a>
        </li>
        <li>
          <a href="//nciw.s3.amazonaws.com/documents/Immunization%20form.pdf" target="_blank" rel="noopener noreferrer">
            <FontAwesome name="file-pdf-o" fixedWidth />{' '}Immunization form
          </a>
        </li>
      </ul>
    </Panel>
  );
}

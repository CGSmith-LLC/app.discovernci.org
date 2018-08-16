import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
// import FontAwesome from 'react-fontawesome';
import { Panel, Media } from 'react-bootstrap';

import handleTeacherClick from './utils';

PanelMediaList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      rank: PropTypes.number,
      title: PropTypes.string,
      profileIcon: PropTypes.string
    })
  ),
  header: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

PanelMediaList.defaultProps = {
  data: [],
  header: 'Untitled Panel',
  children: []
};

export default function PanelMediaList(props) {
  return (
    <Panel>
      {props.header
        && (
          <Panel.Heading>
            <Panel.Title componentClass="h3">{props.header}</Panel.Title>
          </Panel.Heading>
        )
      }
      {_.map(props.data, obj => (
        <Media
          key={obj.rank}
          className="teacherBlock"
          onClick={() => handleTeacherClick}
          style={{ padding: '0 0 0 10px' }}
        >
          <Media.Left>
            {obj.profileIcon
              ? <img width={64} height={64} src={`/media/${obj.profileIcon}`} alt="presentation" className="img-circle" />
              : obj.image
                ? <img width={64} height={64} src={obj.image} alt="presentation" className="img-circle" />
                : <div style={{ width: 64, height: 64 }} />
            }
          </Media.Left>
          <Media.Body>
            <Media.Heading>{obj.name}</Media.Heading>
            <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
              <li>
                {obj.title}
              </li>
              <li>
                <a href={`mailto:${obj.email}`}>
                  {obj.email}
                </a>
              </li>
            </ul>
          </Media.Body>
        </Media>
      ))}
      {props.children}
    </Panel>
  );
}

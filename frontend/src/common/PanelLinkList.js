import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';
import { Panel } from 'react-bootstrap';

PanelLinkList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      rank: PropTypes.number,
      faName: PropTypes.string,
      title: PropTypes.string,
      url: PropTypes.string,
      to: PropTypes.string
    })
  ),
  header: PropTypes.string
};

PanelLinkList.defaultProps = {
  data: [],
  header: 'Untitled Panel'
};

export default function PanelLinkList(props) {
  function linkType(item) {
    // We start with a default of no-linking
    let r = <span>{item.faName && <FontAwesome name={item.faName} fixedWidth />}{' '}{item.title}</span>;
    if (item.to !== undefined) {
      // `to` prop means it's an internal link
      r = <Link to={item.to}>{item.faName && <FontAwesome name={item.faName} fixedWidth />}{' '}{item.title}</Link>;
    } else if (item.url !== undefined) {
      // `url` is to point to anything else
      r = <a href={item.url} target="_blank" rel="noopener noreferrer">{item.faName && <FontAwesome name={item.faName} fixedWidth />}{' '}{item.title}</a>;
    }
    return r;
  }

  return (
    <Panel header={props.header} className="panel-link-list">
      {props.header
        && (
          <Panel.Heading>
            <Panel.Title componentClass="h3">{props.header}</Panel.Title>
          </Panel.Heading>
        )
      }
      <ul>
        {_.sortBy(props.data, 'rank').map(item => (
          item.title == null
            ? <li key={item.rank} className="divider" />
            : <li key={item.rank}>{linkType(item)}</li>
        ))}
      </ul>
    </Panel>
  );
}

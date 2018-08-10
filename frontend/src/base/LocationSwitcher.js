import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

import { getTheme } from '../../utils';

export default class LocationSwitcher extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    showAllOption: PropTypes.bool
  };

  static defaultProps = {
    children: [],
    showAllOption: false
  };

  state = {
    id: this.props.showAllOption ? 0 : 1,
    buttonState: null
  };

  handleChangeLocation = (e) => {
    this.setState(getTheme(e.target.value));
  }

  render() {
    const showAllOption = this.props.showAllOption && true;
    const defaultIndex = showAllOption ? 0 : 1;
    const currentBgColor = this.state.bgColor || getTheme(defaultIndex).bgColor;
    const currentColor = this.state.color || getTheme(defaultIndex).color;

    return (
      <div className="events-filter" style={{ background: currentBgColor, color: currentColor }}>
        {this.props.children}
        <Form inline>
          {showAllOption
            ? 'Display'
            : 'Your Location'
          }:{' '}
          <select className="form-control inline" onChange={this.handleChangeLocation} value={this.state.id}>
            {showAllOption && <option value="0">All Locations</option>}
            <option value="1">Angelus Oaks, CA</option>
            <option value="2">Napa Valley/Sonoma, CA</option>
            <option value="3">New Ulm, TX</option>
            <option value="4">Bruceville, TX</option>
            <option value="5">Lake Geneva, WI</option>
            <option value="6">Mukwonago, WI (Montessori)</option>
          </select>
        </Form>
      </div>
    );
  }
}

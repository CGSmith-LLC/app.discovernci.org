import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class DateField extends React.Component {
  static propTypes = {
    handleMonth: PropTypes.func.isRequired,
    handleDay: PropTypes.func.isRequired,
    handleYear: PropTypes.func.isRequired,
    handleClear: PropTypes.func.isRequired,
    minYear: PropTypes.number, // Set minimum year allowed
    maxYear: PropTypes.number, // Set maximum year allowed
    displayAgeCalc: PropTypes.bool, // display the calculated age
    displayBirthdayMessage: PropTypes.bool, // display the calculated age
    displayClearBtn: PropTypes.bool, // display the 'clear' button
    disabled: PropTypes.bool,
    label: PropTypes.string,
    month: PropTypes.number,
    day: PropTypes.number,
    year: PropTypes.number
  };

  static defaultProps = {
    minYear: parseInt(moment().subtract(100, 'years').format('YYYY'), 10),
    maxYear: parseInt(moment().format('YYYY'), 10),
    displayAgeCalc: false,
    displayBirthdayMessage: false,
    displayClearBtn: true,
    disabled: false,
    label: 'Birth date',
    month: null,
    day: null,
    year: null
  };

  isValidDate = () => {
    const year = this.props.year ? this.props.year : null;
    const month = this.props.month ? this.props.month : null;
    const day = this.props.day ? this.props.day : null;

    return ((year >= this.props.minYear) && (year <= this.props.maxYear) &&
      (month >= 1) && (month <= 12) &&
        (day >= 1) && (day <= 31) &&
          true
    );
  };

  calcAge = () => {
    const year = this.props.year ? this.props.year : null;
    const month = this.props.month ? this.props.month : null;
    const day = this.props.day ? this.props.day : null;

    return (year >= this.props.minYear) && (year <= this.props.maxYear) &&
      (month >= 0) && (month <= 11) &&
        (day >= 1) && (day <= 31)
          ? moment().diff(
            moment([year, month, day], 'YYYY-MM-DD'), 'years')
          : null;
  };

  birthdayMessage = () => (
    this.isValidDate &&
      (moment([this.props.year, this.props.month - 1, this.props.day]).format('MM-DD') === moment().format('MM-DD')) &&
        <span>Hey, Happy Birthday! <span role="img" aria-label="Party Popper">🎉</span></span>
  );

  render() {
    return (
      <div className="rdf-wrapper">

        <label htmlFor="rdf-fieldset">{this.props.label}</label>

        <fieldset id="rdf-fieldset">

          <select
            className="rdf-input-month"
            onChange={this.props.handleMonth}
            value={this.props.month ? this.props.month : ''}
            disabled={this.props.disabled}
          >
            <option value={''} disabled>Month</option>
            {_.map(moment.months(), (month, index) => (
              <option key={index} value={index + 1}>{month}</option>
            ))}
          </select>

          <input
            className="rdf-input-day"
            type="number"
            placeholder="Day"
            onChange={this.props.handleDay}
            min="1"
            max="31" // TODO adjust to month currently selected
            maxLength="2"
            required
            value={this.props.day ? this.props.day : ''}
            disabled={this.props.disabled}
          />

          <input
            className="rdf-input-year"
            type="number"
            placeholder="Year"
            onChange={this.props.handleYear}
            min={this.props.minYear}
            max={this.props.maxYear}
            maxLength="4"
            required
            value={this.props.year ? this.props.year : ''}
            disabled={this.props.disabled}
          />

          {this.props.displayClearBtn && this.isValidDate() &&
            <button onClick={() => this.props.handleClear()} className="rdf-btn-clear">
              Clear
            </button>
          }

        </fieldset>

        {this.props.displayAgeCalc && this.isValidDate() &&
          <span className="rdf-age-display">
            {this.calcAge()} Years old {this.props.displayBirthdayMessage && this.birthdayMessage()}
          </span>
        }

      </div>
    );
  }
}

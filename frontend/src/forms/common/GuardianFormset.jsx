import React from 'react';
import FontAwesome from 'react-fontawesome';

import { genRandId } from '../../utils';
import GuardianFormsetItem from './GuardianFormsetItem';

const GuardianListForm = props => [
  props.items.map(item => (
    <GuardianFormsetItem
      key={item.id}
      item={item}
      handleRemove={props.handleRemove}
      handleName={props.handleName}
      handleRelationToChild={props.handleRelationToChild}
      handleEmail={props.handleEmail}
      handlePhone={props.handlePhone}
      handleStreetAddress={props.handleStreetAddress}
      handleDisplayInDirectory={props.handleDisplayInDirectory}
    />
  )),
  (
    <div
      key={genRandId()}
      style={{ marginTop: 15, marginBottom: 15 }}
    >
      <button
        type="button"
        onClick={props.handleAdd}
        style={{
          background: 'none',
          border: 'none',
          color: '#377BB5'
        }}
      >
        <FontAwesome name="user-plus" fixedWidth />
        {' '}
        Add another Parent/Guardian
      </button>
    </div>
  )
];

export default GuardianListForm;

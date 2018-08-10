import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router';

export default function ClassroomsMenu() {
  const menu = [
    { rank: 0, title: 'Overview', to: '/montessori' },
    { rank: 1, title: 'Children\'s House', to: '/montessori/childrens-house' },
    { rank: 2, title: 'Lower Elementary', to: '/montessori/lower-elementary' },
    { rank: 3, title: 'Upper Elementary', to: '/montessori/upper-elementary' },
    { rank: 4, title: 'Adolescent', to: '/montessori/adolescent' }
  ];
  return (
    <ul className="sub-menu">
      {_.sortBy(menu, 'rank').map(item => (
        <li key={item.rank}>
          <Link activeClassName="active" to={item.to} onlyActiveOnIndex>
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

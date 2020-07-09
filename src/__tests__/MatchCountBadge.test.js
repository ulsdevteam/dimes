import React from 'react';
import ReactDOM from 'react-dom';
import MatchCountBadge from '../components/MatchCountBadge';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MatchCountBadge onClick={function(){}} label="This is a badge" />, div);
});

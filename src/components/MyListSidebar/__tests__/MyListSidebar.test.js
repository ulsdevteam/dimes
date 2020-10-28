import React from 'react';
import {render} from 'react-dom';
import MyListSidebar from '..';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<MyListSidebar
            duplicationRequest={function(){}}
            readingRoomRequest={function(){}}
            sendEmail={function(){}}
            />, div);
});

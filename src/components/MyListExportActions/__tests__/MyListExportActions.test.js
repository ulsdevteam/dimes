import React from 'react';
import {render} from 'react-dom';
import MyListExportActions from '..';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<MyListExportActions
            confirmDeleteAll={function(){}}
            downloadCsv={function(){}}
            emailList={function(){}}
            />, div);
});

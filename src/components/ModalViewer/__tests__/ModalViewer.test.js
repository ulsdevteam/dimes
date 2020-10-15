import React from 'react';
import {render} from 'react-dom';
import ModalViewer from '..';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<ModalViewer
      appElement={div}
      isOpen={true}
      toggleModal={function(){}}
      manifestUri="foo" />, div);
});

import React from 'react';
import {render} from 'react-dom';
import ModalConfirm from '..';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<ModalConfirm
      appElement={div}
      isOpen={true}
      message="foo"
      title="Bar"
      toggleModal={function(){}} />, div);
});

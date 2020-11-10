import React from 'react';
import {render} from 'react-dom';
import { FacetModal } from '..';

import { facet } from '../../../__fixtures__/facet';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<FacetModal
      appElement={div}
      handleChange={function(){}}
      handleDateChange={function(){}}
      isOpen={true}
      params={{}}
      data={facet}
      toggleModal={function(){}} />, div);
});

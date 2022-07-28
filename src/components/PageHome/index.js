import React from 'react';
import { Helmet } from 'react-helmet';
import SearchForm from '../SearchForm';
import { firePageViewEvent } from '../Helpers';
import './styles.scss';

const PageHome = () => (
  <>
    <Helmet
      onChangeClientState={(newState) => firePageViewEvent(newState.title)} >
      <title>My Reading Room @ Archives & Special Collections</title>
    </Helmet>
  </>
)

export default PageHome

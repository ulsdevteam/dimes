import React from 'react';
import { Helmet } from 'react-helmet';
import SearchForm from '../SearchForm';
import { firePageViewEvent } from '../Helpers';
import './styles.scss';
import { Trans } from '@lingui/macro';

const PageHome = ({isMobile}) => (
  <Trans comment='Page Home'>
    <Helmet
      onChangeClientState={(newState) => firePageViewEvent(newState.title)} >
      <title>My Reading Room @ Archives & Special Collections</title>
    </Helmet>
    <main id='main' className='home'>
      <Hero />
      <SearchForm className='search search-form--home' isMobile={isMobile}/>
    </main>
  </Trans>
)

export default PageHome

import React from 'react';
import { Helmet } from 'react-helmet';
import Hero from '../Hero';
import SearchForm from '../SearchForm';
import { firePageViewEvent } from '../Helpers';
import './styles.scss';
import { Trans } from '@lingui/macro';

const PageHome = ({isMobile}) => (
  <Trans comment='Page Home'>
    <Helmet
      onChangeClientState={(newState) => firePageViewEvent(newState.title)} >
      <title>DIMES: Online Collections and Catalog of Rockefeller Archive Center</title>
    </Helmet>
    <div className='container--full-width home'>
      <Hero />
      <SearchForm className='search-form--home' isMobile={isMobile}/>
    </div>
  </Trans>
)

export default PageHome

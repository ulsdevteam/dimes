import React from 'react';
import { Helmet } from 'react-helmet';
import Hero from '../Hero';
import SearchForm from '../SearchForm';
import { firePageViewEvent } from '../Helpers';
import './styles.scss';

const PageHome = ({isMobile}) => (
  <>
    <Helmet
      onChangeClientState={(newState) => firePageViewEvent(newState.title)} >
      <title>DIMES: Online Collections and Catalog of Rockefeller Archive Center</title>
    </Helmet>
    <main id='main' className='home'>
      <Hero />
      <SearchForm className='search search-form--home' isMobile={isMobile}/>
    </main>
  </>
)

export default PageHome

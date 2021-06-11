import React from 'react';
import { Helmet } from 'react-helmet';
import SearchForm from '../SearchForm';
import { firePageViewEvent } from '../Helpers';
import './styles.scss';

const PageHome = () => (
  <>
    <Helmet
      onChangeClientState={(newState) => firePageViewEvent(newState.title)} >
      <title>Special Collections Requests @ Pitt</title>
    </Helmet>
    <div className='container--full-width home'>
      <SearchForm className='search-form--home'/>
    </div>
  </>
)

export default PageHome

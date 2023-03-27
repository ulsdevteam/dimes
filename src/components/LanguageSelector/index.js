import React from 'react';
import './styles.scss';

function LanguageSelector({ languages, locale, onLanguageChange }) {

  function handleChange(event) {
    onLanguageChange(event.target.value);
  }

  return (
    <div className="language-selector">
      <select className="language-selector__select" onChange={handleChange} value={locale} aria-label="english Select your language">
          {Object.values(languages).map(function (key) {
            return (
              <option className="language-selector__option" key={key.id} value={key.id}>{key.label}</option>
            )
          })}
        </select>
      </div>
  );
}

export default LanguageSelector;
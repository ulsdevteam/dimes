import React from 'react';
import MaterialIcon from "../MaterialIcon";
import "./styles.scss";

const PageNotFound = () => (
 <div className="not-found">
    <span className="not-found__icon"><MaterialIcon icon="help_outline" /></span>
    <h1 className="not-found__header">Sorry, the requested page was not found!</h1>
    <p className="not-found__text">Try <a href="/">a search</a> to find what you're looking for.</p>
</div>
)

export default PageNotFound;

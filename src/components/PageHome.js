import React, { Component } from "react";
import logo from "../assets/homepage_logo.png"
import TextInput from "./Inputs";

class PageHome extends Component {
    render() {
        // TODO: add onClick handler to Search button
        return (
            <div className="container">
                <div className="hero">
                    <div className="hero__logo">
                        <img alt={" "} src={logo} />
                    </div>
                    <h1 className="hero__text">
                        Search Our Collections.<br />Discover People and Organizations.<br />Access Digital Content
                    </h1>
                </div>

                <TextInput
                    //className=" "
                    label="Search Everything" />
            </div>
        )
    }
}

export default PageHome;

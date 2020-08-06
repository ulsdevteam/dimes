import React, { Component } from "react";
import Button from "./Button"
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
                    className="label-hidden" //
                    label="Enter a search term"
                    id="search"
                    placeholder="Start your search"
                    size="60"
                />
                <Button
                    //className=" "
                    type="submit"
                    aria-label="Search"
                    label="Search" //replace with icon
                />
            </div>
        )
    }
}

export default PageHome;

import React from "react";
import SubHeader from "./SubHeader";
import Footer from "./Footer";
import { Link, Outlet } from "react-router-dom"

function Layout ({filmTitle, handleFilmTitle}) {

    const handleSubmit = (event) => {
        event.preventDefault();
        handleFilmTitle(event.target.elements.title.value);
    }

    return(
        <>
            <header>
                <Link to="/">
                    <h1>Films... per New York Times</h1>
                </Link>
                <form id="search-bar" onSubmit={handleSubmit}>
                    <input  type="text"
                            name="title" 
                            placeholder="search Titles, Actors .etc"
                    />
                    <input type="image" src="/src/assets/search-icon.svg" alt="Submit"/>
                </form>
            </header>
            <SubHeader/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default Layout
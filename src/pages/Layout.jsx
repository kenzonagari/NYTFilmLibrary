import React from "react";
import SubHeader from "./SubHeader";
import Footer from "./Footer";
import { Link, Outlet } from "react-router-dom"

function Layout ({handleFilmTitle, handleYear}) {

    const handleSubmit = (event) => {
        event.preventDefault();
        handleFilmTitle(event.target.elements.title.value);
    }

    return(
        <>
            <header>
                <Link to="/" onClick={()=>handleFilmTitle(null)}>
                    <h1>Films... per New York Times!</h1>
                </Link>
                <form id="search-bar" onSubmit={handleSubmit}>
                    <input  type="text"
                            name="title" 
                            placeholder="search Titles, Actors .etc"
                    />
                    <input type="image" src="https://raw.githubusercontent.com/kenzonagari/NYTFilmLibrary/9ce2eafa75aa4c040822eb59cbbe82d914079e81/src/assets/search-icon.svg" alt="Submit"/>
                </form>
            </header>
            <SubHeader handleFilmTitle={handleFilmTitle} handleYear={handleYear}/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default Layout
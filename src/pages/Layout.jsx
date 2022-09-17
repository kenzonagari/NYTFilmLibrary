import React from "react";
import SubHeader from "./SubHeader";
import Footer from "./Footer";
import { Link, Outlet, useNavigate } from "react-router-dom"

function Layout ({handleFilmTitle, handleYear}) {

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        handleFilmTitle(event.target.elements.title.value);
        navigate("/search");
    }

    return(
        <>
            <header>
                <Link to="/" onClick={()=>handleFilmTitle(null)}>
                    <div id="navbar-homepage">
                        <img src="https://github.com/kenzonagari/NYTFilmLibrary/blob/main/src/assets/film-reel.png?raw=true"></img>
                        <h1>Films... per New York Times!</h1>
                    </div>
                </Link>
                <form id="search-bar" onSubmit={handleSubmit}>
                    <input  type="text"
                            name="title" 
                            placeholder="search Titles, Actors .etc"
                    />
                    <input  type="image" 
                            src="https://raw.githubusercontent.com/kenzonagari/NYTFilmLibrary/9ce2eafa75aa4c040822eb59cbbe82d914079e81/src/assets/search-icon.svg" 
                            alt="Submit"
                    />
                </form>
            </header>
            <SubHeader handleFilmTitle={handleFilmTitle} handleYear={handleYear}/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default Layout
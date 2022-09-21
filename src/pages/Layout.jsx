import React from "react";
import SubHeader from "./SubHeader";
import Footer from "./Footer";
import { Link, Outlet, useNavigate } from "react-router-dom"

function Layout ({handleFilmTitle, handleYear, theme, handleTheme}) {

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        handleFilmTitle(event.target.elements.title.value);
        navigate(`/search/${event.target.elements.title.value}`);
    }

    return(
        <>
            <header>
                <Link to="/" onClick={()=>handleFilmTitle(null)}>
                    <div id="navbar-homepage">
                        <img src={theme === "light" ? "https://github.com/kenzonagari/NYTFilmLibrary/blob/main/src/assets/film-reel.png?raw=true" : "https://github.com/kenzonagari/NYTFilmLibrary/blob/theme_branch/src/assets/film-reel_white.png?raw=true"}></img>
                        <h1>Films... per New York Times!</h1>
                    </div>
                </Link>
                <form id="search-bar" onSubmit={handleSubmit}>
                    <input  type="text"
                            name="title" 
                            placeholder="search Titles, Actors .etc"
                    />
                    <input  type="image" 
                            src={theme === "light" ? "https://raw.githubusercontent.com/kenzonagari/NYTFilmLibrary/9ce2eafa75aa4c040822eb59cbbe82d914079e81/src/assets/search-icon.svg" : "https://github.com/kenzonagari/NYTFilmLibrary/blob/theme_branch/src/assets/search-icon_white.png?raw=true"} 
                            alt="Submit"
                    />
                </form>
            </header>
            <div className="theme-switch-wrapper">
                <p>{theme === "light"? "Light Mode" : "Dark Mode"}</p>
                <label className="theme-switch" htmlFor="checkbox" >
                    <input type="checkbox" id="checkbox" onClick={handleTheme}/>
                    <div className="slider round"></div>
                </label>
            </div>
            <SubHeader handleFilmTitle={handleFilmTitle} handleYear={handleYear}/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default Layout
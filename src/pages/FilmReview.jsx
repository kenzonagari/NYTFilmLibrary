import { useState, useEffect, useContext } from "react";
import { FavContext } from "../App";
import splitTitle from "../splitTitle";

import {
    CircularProgressbar,
    buildStyles
  } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";


export default function FilmReview({infoNyt}){
    // console.log(infoNyt.multimedia); //if no multimedia, null is logged.
    const [filmTmdb, setFilmTmdb] = useState([]);
    const [isFav, setIsFav] = useState(null);
    const [startPopup, setStartPopup] = useState(false);

    let favContext = useContext(FavContext);
    
    let inputFilmTitleDashed = "";

    useEffect(()=>{

        inputFilmTitleDashed = splitTitle(infoNyt.display_title, "-");

        let inputFilmYear = "";

        if(infoNyt.opening_date){
            inputFilmYear = infoNyt.opening_date.substring(0,4);
        }

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=80eefdeb6196f43baf8b87b69ec4b47d&language=en-US&query=${inputFilmTitleDashed}&year=${inputFilmYear}`)
          .then((response) => response.json())
          .then((data) => {
            setFilmTmdb(data?.results[0]);
          }).catch((error) => {
          })
        
        for(const element of favContext){
            if(element.link.url === infoNyt.link.url){
                setIsFav(true);
            }
        }

    },[infoNyt])

    let filmURL = "";
    if(infoNyt?.multimedia){
        filmURL = infoNyt?.multimedia?.src;
    } else if (filmTmdb?.poster_path) {
        filmURL = `https://image.tmdb.org/t/p/original${filmTmdb?.poster_path}`;
    } else {
        filmURL = "https://github.com/kenzonagari/NYTFilmLibrary/blob/main/src/assets/imagenotfound.png?raw=true";
    }

    const userScore = filmTmdb?.vote_average ? (filmTmdb.vote_average*10) : 0;

    let ratingColor = {};
    if(userScore < 34){
        if(userScore === 0){
            ratingColor={
                path: "transparent",
                trail:"transparent"
            };
        } else {
            ratingColor={
                path: "#CE756A",
                trail:"#913B30"
            };
        }
    } else if (userScore < 67) {
        ratingColor={
            path: "#F5DC5D",
            trail:"#B0934B"
        };
    } else {
        ratingColor={
            path: "#71CE85",
            trail:"#437B4F"
        };
    }

    const handleFav = () => {

        setStartPopup(true);

        if((isFav === null || isFav === false)){
            setIsFav(true);
            favContext.push(infoNyt);
        } else {
            setIsFav(false);
            if(favContext.length > 0){
                let indexOfMovie = favContext.findIndex(element => element.link.url === infoNyt.link.url);
                favContext.splice(indexOfMovie, 1);
            } else {
                favContext.pop();
            }
        }
    }

    const favPopup = <div className="popup">Added to Favorites!</div>;
    const unfavPopup = <div className="popup">Removed from Favorites!</div>;

    return(
        <>
        {isFav === true && startPopup ? favPopup : ""}
        {isFav === false && startPopup ? unfavPopup : ""}
        <div className="card">
            
            <img src={filmURL} alt="NYT-movie-image"></img>
            <div className="text">
                <h1 className="card-title">{infoNyt.display_title}</h1>
                <h2>{infoNyt.headline}</h2>
                <p><b>Release Date:</b> {infoNyt.opening_date ? infoNyt.opening_date : "N/A"}</p>
                <p className="byline">{infoNyt.byline ? `Review by ${infoNyt.byline}` : ""}</p>
                <p>{infoNyt.summary_short ? infoNyt.summary_short : "No summary available"}</p>
                <a href={infoNyt.link.url} target="_blank"><button className="button">Read Full Review</button></a>
            </div>
            <div className="fav-icon" onClick={handleFav}>
                <span className="fav-icon-text">Add to Favorites</span>
                <img src={ isFav === true ? "https://raw.githubusercontent.com/kenzonagari/NYTFilmLibrary/c569249322ab9b4cb9f2aa9954169c7760b065ec/src/assets/star-fav.svg" : "https://raw.githubusercontent.com/kenzonagari/NYTFilmLibrary/c569249322ab9b4cb9f2aa9954169c7760b065ec/src/assets/star-nofav.svg" } alt="favorite" ></img>
            </div>
            <div className="circular-progress-bar">
                <a href={filmTmdb? `https://www.themoviedb.org/movie/${filmTmdb.id}-${inputFilmTitleDashed}` : "https://www.themoviedb.org/movie/"} target="_blank">
                    <CircularProgressbar
                        value={userScore? userScore : 0}
                        text={userScore? `${userScore}%` : "N.A"}
                        strokeWidth={10}
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                            width: "5px",
                            backgroundColor: "white",
                            textColor: "black",
                            pathColor: ratingColor.path,
                            trailColor: ratingColor.trail
                        })}
                    />
                </a>
            </div>
        </div>
        </>
    )
}
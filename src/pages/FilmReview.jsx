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
    const [isDuplicate, setIsDuplicate] = useState(null);
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
            // console.log(data?.results[0].poster_path);
            setFilmTmdb(data?.results[0]);
          }).catch((error) => {
          })

    },[infoNyt, isDuplicate])

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
        if(favContext.length > 0){
            let foundDuplicate = false;
            for(const element of favContext){
                if(element.link.url === infoNyt.link.url){
                    setIsDuplicate(true);
                    foundDuplicate = true;
                }
            }
            if(!foundDuplicate){
                setIsDuplicate(false);
                favContext.push(infoNyt);
                console.log(favContext);
            }
        } else {
            setIsDuplicate(false);
            favContext.push(infoNyt); //first push
            console.log(favContext);
        }
    }

    const favPopup = <div className="popup">{isDuplicate === false? "Added To Favorites!" : isDuplicate === true? "Movie already added!" : ""}</div>
    
    return(
        <>
        {isDuplicate === true || isDuplicate === false? favPopup : ""}
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
                <img src="https://raw.githubusercontent.com/kenzonagari/NYTFilmLibrary/64f888b42a7d910ecf718e62ac4ba06f8f8686a8/src/assets/add-icon.svg" alt="favorite" ></img>
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
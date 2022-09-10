import { useState, useEffect } from "react";

import {
    CircularProgressbar,
    buildStyles
  } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";


export default function FilmReview({infoNyt}){
    // console.log(infoNyt.multimedia); //if no multimedia, null is logged.
    const [filmTmdb, setFilmTmdb] = useState([]);
    let inputFilmTitleDashed = "";

    useEffect(()=>{

        const inputFilmTitleArr = infoNyt.display_title.split(" ");
        let wordCounter = 0;

        for(let word of inputFilmTitleArr){
            if(wordCounter === 0){
                inputFilmTitleDashed = word;
            } else {
                inputFilmTitleDashed += "-" + word;
            }
            wordCounter += 1;
        }

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
            setStatus("error");
          })

    },[])

    let filmURL = "";
    if(infoNyt?.multimedia){
        filmURL = infoNyt?.multimedia?.src;
    } else if (filmTmdb?.poster_path) {
        filmURL = `https://image.tmdb.org/t/p/original${filmTmdb?.poster_path}`;
    } else {
        filmURL = "src/assets/imagenotfound.png";
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
            path: "#DFD06F",
            trail:"#B0934B"
        };
    } else {
        ratingColor={
            path: "#71CE85",
            trail:"#437B4F"
        };
    }
    
    return(
        <>
        <div className="card">
            <img src={filmURL} alt="NYT-movie-image"></img>
            <div className="text">
                <h1>{infoNyt.display_title}</h1>
                <h2>{infoNyt.headline}</h2>
                <p><b>Release Date:</b> {infoNyt.opening_date ? infoNyt.opening_date : "N/A"}</p>
                <p className="byline">{infoNyt.byline ? `Review by ${infoNyt.byline}` : ""}</p>
                <p>{infoNyt.summary_short ? infoNyt.summary_short : "No summary available"}</p>
                <a href={infoNyt.link.url} target="_blank"><button className="button">Read Full Review</button></a>
            </div>
            <div className="circular-progress-bar">
                <a href={filmTmdb? `https://www.themoviedb.org/movie/${filmTmdb.id}-${inputFilmTitleDashed}` : "https://www.themoviedb.org/movie/"} target="_blank">
                    <CircularProgressbar
                        value={userScore? userScore : 0}
                        text={userScore? `${userScore}%` : "N.A"}
                        strokeWidth={8}
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
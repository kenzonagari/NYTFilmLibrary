import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import FilmReview from "./FilmReview";
import decadeWriteup from "../decadeWriteup";

export default function FilmListDecade({filmTitle}){
    let params = useParams();
    const [films, setFilms] = useState([]);
    const [searchingDecade, setSearchingDecade] = useState(false);
    const decade = parseInt(params.code);

    // console.log(params)

    useEffect(()=>{

        const inputFilmTitleArr = filmTitle.split(" ");
        let inputFilmTitleUnderscored = "";
        let wordCounter = 0;

        for(let word of inputFilmTitleArr){
            // inputFilmTitleUnderscored = word + `_`;
            if(wordCounter === 0){
                inputFilmTitleUnderscored = word;
            } else {
                inputFilmTitleUnderscored += "_" + word;
            }
            wordCounter += 1;
        }

        fetch(`https://api.nytimes.com/svc/movies/v2/reviews/search.json?opening-date=${decade}-01-01:${decade+10}-01-01&${searchingDecade ? `query=${inputFilmTitleUnderscored}` : ""}&api-key=FFdcrxBVM9NGYTUgp68jFWrzlhfYU2cY`)
          .then((response) => response.json())
          .then((data) => {
            // console.log(data?.results[0]);
            setFilms(data?.results);
          });

    },[decade])

    let filmReviewComp=[""];

    if (films){
        filmReviewComp = films.map((e, index) =>
            <FilmReview key={index} infoNyt={e}/>
        )
    }
    
    return(
        <>
            <div className="content">
                <h1>{decade}s</h1>
                <p>{decadeWriteup[`${decade}`]}</p> 
            </div>
            <div id="container">
                {filmReviewComp}
            </div>
        </>
    )
}
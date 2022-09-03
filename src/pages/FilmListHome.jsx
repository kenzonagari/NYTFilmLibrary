import { useState, useEffect } from "react";
import FilmReview from "./FilmReview";

function FilmListHome ({filmTitle}) {
    const [films, setFilms] = useState([]);

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

        fetch(`https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${inputFilmTitleUnderscored}&api-key=FFdcrxBVM9NGYTUgp68jFWrzlhfYU2cY`)
          .then((response) => response.json())
          .then((data) => {
            // console.log(data?.results[0]);
            setFilms(data?.results);
          });

    },[filmTitle])

    // const handleFetch = () => {
    //     setCount(count + 1);
    // }
    
    let filmReviewComp=[""];

    if (films){
        filmReviewComp = films.map((e, index) =>
            <FilmReview key={index} infoNyt={e}/>
        )
    }

    return(
        <>
            <div id="search-title">
                <p>{films? `${films.length} Results for:` : "0 Results for:"}</p>
                <h1>{filmTitle}</h1>
                {/* <button onClick={handleFetch}>Generate Films</button> */}
            </div>
            <div id="container">
                {filmReviewComp}
            </div>
        </>
    )
}

export default FilmListHome
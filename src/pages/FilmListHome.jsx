import { useState, useEffect } from "react";
import FilmReview from "./FilmReview";
import PaginationScrollbar from "./PaginationScrollbar";

function FilmListHome ({filmTitle, searching}) {
    const [films, setFilms] = useState([]);
    const [pageOffset, setPageOffset] = useState(1);
    const [status, setStatus] = useState("loading");

    useEffect(()=>{

        setStatus("loading");

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

        fetch(`https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${inputFilmTitleUnderscored}&offset=${(pageOffset-1)*20}&api-key=FFdcrxBVM9NGYTUgp68jFWrzlhfYU2cY`)
          .then((response) => response.json())
          .then((data) => {
            // console.log(data?.results[0]);
            setFilms(data?.results);
            setStatus(searching);
          }).catch((error) => {
            setStatus("error");
          })

    },[filmTitle, pageOffset])

    // const handleFetch = () => {
    //     setCount(count + 1);
    // }

    const handlePage = (num) => {
        setPageOffset(num);
    }

    
    let filmReviewComp=[""];
    if (films){
        filmReviewComp = films.map((e, index) =>
            <FilmReview key={index} infoNyt={e}/>
        )
    }

    return(
        <>
            <div className="title">
                <p> {status === "success" ? `${films? films.length: 0} Search Results for:` : ""}
                    {status === "loading" ? "loading..." : ""}
                    {status === "error"? "Something went wrong. Try again later!" : ""}
                </p>
                <h1>{status === "success" ? filmTitle : ""}</h1>
                <PaginationScrollbar handlePage={handlePage} pageOffset={pageOffset}/>
            </div>
            <div id="container">
                {filmReviewComp}
            </div>
        </>
    )
}

export default FilmListHome
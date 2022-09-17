import { useState, useEffect } from "react";
import FilmReview from "./FilmReview";
import PaginationScrollbar from "./PaginationScrollbar";
import splitTitle from "../splitTitle";

import ReactLoading from 'react-loading';

function FilmListHome ({filmTitle, searching}) {

    const [films, setFilms] = useState([]);
    const [pageOffset, setPageOffset] = useState(1);
    const [status, setStatus] = useState("loading");

    useEffect(()=>{

        setStatus("loading");

        let inputFilmTitleUnderscored = splitTitle(filmTitle, "_");

        fetch(`https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${inputFilmTitleUnderscored}&offset=${(pageOffset-1)*20}&api-key=FFdcrxBVM9NGYTUgp68jFWrzlhfYU2cY`)
            .then((response) => {
                // console.log(response.status);
                // if(response.status == 429){
                //     console.log("hello")
                //     setStatus("error429");
                // } else {
                    return response.json();   
                
            })
            .then((data) => {
                setFilms(data?.results);
                setStatus(searching);
            })  .catch((error) => {
                setStatus("error");
            })

    },[filmTitle, pageOffset])

    const handlePage = (num) => {
        setPageOffset(num);
    }

    let filmReviewComp=[""];
    if (films){
        filmReviewComp = films.map((e, index) =>
            <FilmReview key={index} infoNyt={e}/>
        )
    }

    const ReactLoadingComp = <ReactLoading type="bubbles" color="#393fa0" height={100} width={100} />;

    return(
        <>
            <div className="title">
                <PaginationScrollbar handlePage={handlePage} pageOffset={pageOffset}/>
                <p> {status === "success" ? `${films? films.length: 0} Search Results for:` : ""}
                    {status === "error"? "Something went wrong. Try again later!" : ""}
                    {status === "error429"? "Too many requests. Try again later!" : ""}
                </p>
                {status === "loading" ? ReactLoadingComp : ""}
                <h1>{status === "success" ? filmTitle : ""}</h1>
            </div>
            <div id="container">
                {filmReviewComp}
            </div>
            <div className="title">
                <PaginationScrollbar handlePage={handlePage} pageOffset={pageOffset}/>
            </div>
        </>
    )
}

export default FilmListHome
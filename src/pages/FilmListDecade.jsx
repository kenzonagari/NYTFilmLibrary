import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import FilmReview from "./FilmReview";
import decadeWriteup from "../decadeWriteup";
import PaginationScrollbar from "./PaginationScrollbar";
import splitTitle from "../splitTitle";

import ReactLoading from 'react-loading';

export default function FilmListDecade(){
    let params = useParams();
    const [searchTitle, setSearchTitle] = useState("");
    const [films, setFilms] = useState([]);
    const [pageOffset, setPageOffset] = useState(1);
    const [status, setStatus] = useState("loading");
    const decade = parseInt(params.code);

    useEffect(()=>{

        setStatus("loading");

        let inputFilmTitleUnderscored = splitTitle(searchTitle,"_");

        fetch(`https://api.nytimes.com/svc/movies/v2/reviews/search.json?opening-date=${decade}-01-01:${decade+9}-12-31&query=${inputFilmTitleUnderscored}&offset=${(pageOffset-1)*20}&api-key=FFdcrxBVM9NGYTUgp68jFWrzlhfYU2cY`)
          .then((response) => response.json())
          .then((data) => {
            // console.log(data?.results[0]);
            setFilms(data?.results);
            setStatus("success");
          })
          .catch((error) => {
            setStatus("error");
          })

    },[decade, searchTitle, pageOffset]);

    const handleFilter = (event) => {
        event.preventDefault(event);
        setSearchTitle(event.target[0].value);
    }

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
                <h1>{decade}s</h1>
                <p id="film-quote">{decadeWriteup[`${decade}`]}</p>
                <form onSubmit={handleFilter}>
                    <input 
                        type="text" 
                        name="title"
                        placeholder={`search for films made in the ${decade}s`}
                    />
                    <input type="submit" value="Filter" className="button"/>
                </form> 
                <PaginationScrollbar handlePage={handlePage} pageOffset={pageOffset}/>
                {status === "loading" ? ReactLoadingComp : ""}
                {status === "error" ? "Something went wrong. Try again later!" : ""}
            </div>
            <div id="container">
                {status === "success" ? filmReviewComp : ""}
            </div>
            <div className="title">
                <PaginationScrollbar handlePage={handlePage} pageOffset={pageOffset}/>
            </div>
        </>     
    )
}
import { useState, useEffect } from "react";
import FilmReview from "./FilmReview";
import PaginationScrollbar from "./PaginationScrollbar";

import ReactLoading from 'react-loading';

function FilmListHome () {

    const [films, setFilms] = useState([]);
    const [pageOffset, setPageOffset] = useState(1);
    const [status, setStatus] = useState("loading");

    useEffect(()=>{

        setStatus("loading");

        fetch(`https://api.nytimes.com/svc/movies/v2/reviews/search.json?offset=${(pageOffset-1)*20}&api-key=FFdcrxBVM9NGYTUgp68jFWrzlhfYU2cY`)
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
                setStatus("success");
            })  .catch((error) => {
                setStatus("error");
            })

    },[pageOffset])

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
            <h1>Home Page</h1> 
                <PaginationScrollbar handlePage={handlePage} pageOffset={pageOffset}/>
                {status === "loading" ? ReactLoadingComp : ""}
                {status === "error" ? "Something went wrong. Try again later!" : ""}
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
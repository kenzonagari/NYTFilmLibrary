import { useState, useEffect } from "react";
import FilmReview from "./FilmReview";
import PaginationScrollbar from "./PaginationScrollbar";

export default function CriticsPick(){
    
    const [picks, setPicks] = useState([]);
    const [pageOffset, setPageOffset] = useState(1);
    const [status, setStatus] = useState("loading");
    
    // useEffect(()=>{

    //     fetch(`https://api.nytimes.com/svc/movies/v2/reviews/picks.json?offset=${pageOffset}&api-key=FFdcrxBVM9NGYTUgp68jFWrzlhfYU2cY`)
    //       .then((response) => response.json())
    //       .then((data) => {
    //         setPicks(data?.results);
    //       });

    // },[pageOffset])

    useEffect(()=>{

        setStatus("loading");

        fetch(`https://api.nytimes.com/svc/movies/v2/reviews/picks.json?offset=${(pageOffset-1)*20}&api-key=FFdcrxBVM9NGYTUgp68jFWrzlhfYU2cY`)
        .then((response) => response.json())
        .then((data) => {
        // console.log(data?.results[0]);
            setPicks(data?.results);
            setStatus("success");
        }).catch((error) => {
            setStatus("error");
        })

    },[pageOffset])

    const handlePage = (num) => {
        setPageOffset(num);
    }

    let filmReviewComp=[""];
    if (picks){
        filmReviewComp = picks.map((e, index) =>
            <FilmReview key={index} infoNyt={e}/>
        )
    }
    
    return(
        <>
            <div className="title">
                <h1>Critics' Pick</h1>  
                <PaginationScrollbar handlePage={handlePage} pageOffset={pageOffset}/>
                {status === "loading" ? "loading..." : ""}
                {status === "error" ? "Something went wrong. Try again later!" : ""}
            </div>
            <div id="container">
                {status === "success" ? filmReviewComp : ""}
            </div>
        </>
    )
}
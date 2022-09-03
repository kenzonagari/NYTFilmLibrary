import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import FilmReview from "./FilmReview";

export default function CriticsPick(){

    const [picks, setPicks] = useState([]);
    
    useEffect(()=>{

        fetch(`https://api.nytimes.com/svc/movies/v2/reviews/picks.json?&api-key=FFdcrxBVM9NGYTUgp68jFWrzlhfYU2cY`)
          .then((response) => response.json())
          .then((data) => {
            setPicks(data?.results);
          });

    },[])

    let filmReviewComp=[""];

    if (picks){
        filmReviewComp = picks.map((e, index) =>
            <FilmReview key={index} infoNyt={e}/>
        )
    }
    
    return(
        <>
            <h2>Critics' Pick!!</h2>  
            <div id="container">
                {filmReviewComp}
            </div>
        </>
    )
}
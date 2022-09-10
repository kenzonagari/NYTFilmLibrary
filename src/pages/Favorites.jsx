import { useState, useContext } from "react";
import FilmReview from "./FilmReview";
import { FavContext } from "../App";

export default function Favorites () {
    const favContext = useContext(FavContext);

    console.log(favContext);

    let filmReviewComp=[""];
    if (favContext.length > 0){
        filmReviewComp = favContext.map((e, index) =>
            <FilmReview key={index} infoNyt={e}/>
        )
    }

    return(
        <>
            <div className="title">
            </div>
            <div id="container">
                {filmReviewComp}
            </div>
        </>
    )
}
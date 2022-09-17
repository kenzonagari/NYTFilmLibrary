import { useState, useContext } from "react";
import FilmReview from "./FilmReview";
import { FavContext } from "../App";
import { useEffect } from "react";

export default function Favorites () {
    let favContext = useContext(FavContext);
    const [clear, setClear] = useState(false)

    // console.log(favContext);
    useEffect(()=>{
        if(clear){
            favContext=[];
            console.log(clear);
            console.log(favContext);
        }
    },[clear])

    let filmReviewComp=[""];
    if (favContext.length > 0){
        filmReviewComp = favContext.map((e, index) =>
            <FilmReview key={index} infoNyt={e}/>
        )
    }

    const handleClearFav = () => {
        setClear(true);
    }

    return(
        <>
            <div className="title">
                <h1>Favorites</h1>
                {/* <button onClick={handleClearFav}>Clear Favorites</button> */}
            </div>
            <div id="container">
                {filmReviewComp}
            </div>
        </>
    )
}
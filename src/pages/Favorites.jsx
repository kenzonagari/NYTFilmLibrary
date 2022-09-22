import { useState, useContext } from "react";
import FilmReview from "./FilmReview";
import { FavContext } from "../App";
import { useEffect } from "react";

export default function Favorites () {
    let favContext = useContext(FavContext);
    const [favComp, setFavComp] = useState([]); 
    
    let filmReviewComp = [""];
    
    useEffect(()=>{
        
        if (favContext.length > 0){
            filmReviewComp = favContext.map((e, index) =>
                <FilmReview key={index} infoNyt={e}/>
            )
        }

        setFavComp(filmReviewComp);
                
    },[])
    
    const handleClearFav = () => {
        favContext.splice(0, favContext.length);
        setFavComp([]);
    }

    const favGuide = <p className="fav-guide">Click the star button at top left of each movie to add to Favorites!</p>

    return(
        <>
            <div className="title">
                <h1>Favorites</h1>
                <button className="button" onClick={handleClearFav}>Clear Favorites</button>
            </div>
            <div id="container">
                {favComp}
                {favContext.length === 0? favGuide : ""}
            </div>
        </>
    )
}
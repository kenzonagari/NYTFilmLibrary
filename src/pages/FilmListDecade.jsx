import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import FilmReview from "./FilmReview";
import decadeWriteup from "../decadeWriteup";

export default function FilmListDecade(){
    let params = useParams();
    const [searchTitle, setSearchTitle] = useState("");
    const [films, setFilms] = useState([]);
    const [status, setStatus] = useState("loading");
    const decade = parseInt(params.code);

    // setSearchTitle("");

    useEffect(()=>{

        setStatus("loading");

        const inputFilmTitleArr = searchTitle.split(" ");
        let inputFilmTitleUnderscored = "";
        let wordCounter = 0;

        for(let word of inputFilmTitleArr){
            if(wordCounter === 0){
                inputFilmTitleUnderscored = word;
            } else {
                inputFilmTitleUnderscored += "_" + word;
            }
            wordCounter += 1;
        }

        fetch(`https://api.nytimes.com/svc/movies/v2/reviews/search.json?opening-date=${decade}-01-01:${decade+9}-12-31&query=${inputFilmTitleUnderscored}&api-key=FFdcrxBVM9NGYTUgp68jFWrzlhfYU2cY`)
          .then((response) => response.json())
          .then((data) => {
            // console.log(data?.results[0]);
            setFilms(data?.results);
            setStatus("success");
          })
          .catch((error) => {
            setStatus("error");
          })

    },[decade, searchTitle]);

    const handleFilter = (event) => {
        event.preventDefault(event);
        console.log("filtering");
        setSearchTitle(event.target[0].value);
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
                {status === "loading" ? "loading..." : ""}
                {status === "error" ? "Something went wrong. Try again later!" : ""}
            </div>
            <div id="container">
                {status === "success" ? filmReviewComp : ""}
            </div>
        </>
    )
}
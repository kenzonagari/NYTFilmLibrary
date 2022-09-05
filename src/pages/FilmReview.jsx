export default function FilmReview({infoNyt}){
    // console.log(infoNyt);
    
    return(
        <>
        <div className="card">
            <h1>{infoNyt.display_title}</h1>
            <h2>{infoNyt.headline}</h2>
            <p><b>Release Date:</b> {infoNyt.opening_date ? infoNyt.opening_date : "N/A"}</p>
            <p>{infoNyt.summary_short ? infoNyt.summary_short : "No summary available"}</p>
            <a href={infoNyt.link.url}><button className="button">Read Full Review</button></a>

        </div>
        </>
    )
}
import { Link } from "react-router-dom"

export default function SubHeader ({handleFilmTitle, handleYear}) {
    const yearList = [];
    const decadeTotal = 12;

    for (let i = 0 ; i < decadeTotal ; i ++) {
        const year = 1910+(i*10);
        yearList.push(
            <Link to={`/${year}s`} key={i}>
                <li key={i} onClick={()=>handleYear(year)}>
                    {year}s
                </li>
            </Link>
        )
    }

    return(
        <>
            <ul id="subheader-list">
                <div id="subheader-tab">
                    <li><Link to ="/" onClick={()=>handleFilmTitle(null)}>Main Page</Link></li>
                    <li><Link to ="/critics-pick">Critics' Pick</Link></li>
                    <li><Link to ="/favorites">Favorites</Link></li>
                </div>
                <div id="subheader-decades">
                    {yearList}
                </div>
            </ul>
        </>
    )
}
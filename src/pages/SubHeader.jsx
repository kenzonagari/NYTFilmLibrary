import { Link } from "react-router-dom"

export default function SubHeader () {
    const yearList = [];
    const decadeTotal = 13;

    for (let i = 0 ; i < decadeTotal ; i ++) {
        yearList.push(
            <li key={i}>{1900+(i*10)}s</li>
        )
    }
    return(
        <>
            <ul id="subheader-list">
                <div id="subheader-tab">
                    <li><Link to ="/">Main Page</Link></li>
                    <li><Link to ="/favorites">Favorites</Link></li>
                </div>
                <div id="subheader-decades">
                    {yearList}
                </div>
            </ul>
        </>
    )
}
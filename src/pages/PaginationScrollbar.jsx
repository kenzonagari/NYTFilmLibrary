export default function PaginationScrollbar ({handlePage, pageOffset}) {
    
    const paginationNum = 25;
    const numberList = [];

    for (let i = 1 ; i <= paginationNum ; i++){
        numberList.push(
            <li onClick={()=>handlePage(i)} key={i} className={i === pageOffset ? "current-page" : ""}>{i}</li>
        )
    }

    return (
        <>
            <ul className="page-list">
                {numberList}
            </ul>
        </>
    )
}
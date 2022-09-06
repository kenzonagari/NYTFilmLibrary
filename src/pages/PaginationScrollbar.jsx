export default function PaginationScrollbar ({handlePage, pageOffset}) {

    const numberList = [];
    for (let i = 1 ; i <= 100 ; i++){
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
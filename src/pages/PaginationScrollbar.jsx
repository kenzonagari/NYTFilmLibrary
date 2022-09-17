export default function PaginationScrollbar ({handlePage, pageOffset}) {
    
    const paginationNum = 3;
    const numberList = [];

    for (let i = (pageOffset-paginationNum) ; i <= (pageOffset+paginationNum) ; i++){
        if(i > 0 && i < 101){
            numberList.push(
                <li onClick={()=>handlePage(i)} key={i} className={i === pageOffset ? "current-page" : ""}>{i}</li>
            )
        }
    }

    const prevArrow = <li onClick={()=>handlePage(pageOffset-1)}>{`<< Prev`}</li>;
    const listOne = <li onClick={()=>handlePage(1)} >1</li>;
    const firstDot = <li className="dot">...</li>;
    const listOneHundredth = <li onClick={()=>handlePage(100)} >100</li>;
    const lastDot = <li className="dot">...</li>;
    const nextArrow = <li onClick={()=>handlePage(pageOffset+1)}>{`Next >>`}</li>;
                        
                    
    return (
        <>
            <ul className="page-list">
                {pageOffset === 1 ? "" : prevArrow}
                {pageOffset > 4 ? listOne : ""}
                {pageOffset > 5 ? firstDot : ""}
                {numberList}
                {pageOffset < 96? lastDot : ""}
                {pageOffset < 97? listOneHundredth : ""}
                {pageOffset === 100 ? "" : nextArrow}
                
            </ul>
        </>
    )
}
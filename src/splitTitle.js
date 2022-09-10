export default function splitTitle(string, symbol){
    
    const inputFilmTitleArr = string.split(" ");
    let wordCounter = 0;
    let filmTitle = "";
    
    for(let word of inputFilmTitleArr){
        if(wordCounter === 0){
            filmTitle = word;
        } else {
            filmTitle += symbol + word;
        }
        wordCounter += 1;
    }

    return filmTitle;

}    
    
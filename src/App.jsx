import { useState, createContext } from 'react'
import Layout from './pages/Layout'
import FilmListHome from './pages/FilmListHome'
import FilmListDecade from './pages/FilmListDecade'
import CriticsPick from './pages/CriticsPick'
import Favorites from './pages/Favorites'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

export const FavContext = createContext();

function App() {
  const [filmTitle, setFilmTitle] = useState("");
  const [searching, setSearching] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [year, setYear] = useState(0);

  const handleFilmTitle = (inputFilmTitle) => {
    if(inputFilmTitle){
        setFilmTitle(inputFilmTitle);
        setSearching("success");
    } else {
      setFilmTitle("");
      setSearching(false);
    }
  }

  const handleYear = (inputYear) => {
    setYear(inputYear);
  }

  return (
    <div className="App">
      <FavContext.Provider value={favorites}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout handleFilmTitle={handleFilmTitle} handleYear={handleYear} />}>
            {/* <FavContext.Provider value={favorites}></FavContext.Provider> */}
            <Route index element={<FilmListHome filmTitle={filmTitle} searching={searching} />} />
            <Route path="critics-pick" element={<CriticsPick />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path=":code" element={<FilmListDecade />}/>
            <Route path="*" element={<h1>Not found</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
      </FavContext.Provider>
    </div>
  )
}

export default App

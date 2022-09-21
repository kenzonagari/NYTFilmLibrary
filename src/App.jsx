import { useState, createContext } from 'react'
import Layout from './pages/Layout'
import FilmListHome from './pages/FilmListHome'
import FilmListDecade from './pages/FilmListDecade'
import CriticsPick from './pages/CriticsPick'
import Favorites from './pages/Favorites'
import SearchPage from './pages/SearchPage'
import NotFound from './pages/NotFound'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

export const FavContext = createContext();

function App() {
  const [filmTitle, setFilmTitle] = useState("");
  const [searching, setSearching] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [theme, setTheme] = useState("light");
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

  const handleTheme = () => {
    setTheme((prev) => prev === "light" ? "dark" : "light");
  }

  return (
    <div className="App" id={theme}>
      <FavContext.Provider value={favorites}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout handleFilmTitle={handleFilmTitle} handleYear={handleYear} theme={theme} handleTheme={handleTheme}/>}>
              <Route index element={<FilmListHome filmTitle={filmTitle} searching={searching} />} />
              <Route path="critics-pick" element={<CriticsPick />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="decades/:code" element={<FilmListDecade />}/>
              <Route path="search/:code" element={<SearchPage filmTitle={filmTitle} searching={searching}/>}/>
              <Route path="*" element={<NotFound/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </FavContext.Provider>
    </div>
  )
}

export default App

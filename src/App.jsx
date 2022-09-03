import { useState, useEffect } from 'react'
import Layout from './pages/Layout'
import FilmListHome from './pages/FilmListHome'
import FilmListDecade from './pages/FilmListDecade'
import CriticsPick from './pages/CriticsPick'
import Favorites from './pages/Favorites'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0);
  const [filmTitle, setFilmTitle] = useState("");
  const [searching, setSearching] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [year, setYear] = useState(0);

  const handleFilmTitle = (inputFilmTitle) => {
    if(inputFilmTitle){
        setFilmTitle(inputFilmTitle);
        setSearching(true);
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout handleFilmTitle={handleFilmTitle} handleYear={handleYear} />}>
            <Route index element={<FilmListHome filmTitle={filmTitle} searching={searching} />} />
            <Route path="critics-pick" element={<CriticsPick />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path=":code" element={<FilmListDecade filmTitle={filmTitle} />}/>
            <Route path="*" element={<h1>Not found</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

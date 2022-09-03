import { useState, useEffect } from 'react'
import Layout from './pages/Layout'
import FilmListHome from './pages/FilmListHome'
import Favorites from './pages/Favorites'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0);
  const [filmTitle, setfilmTitle] = useState("");
  const [favorites, setFavorites] = useState([]);

  const handleFilmTitle = (inputFilmTitle) => {
    setfilmTitle(inputFilmTitle);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout filmTitle={filmTitle} handleFilmTitle={handleFilmTitle}/>}>
            <Route index element={<FilmListHome filmTitle={filmTitle}/>}/>
            <Route path="favorites" element={<Favorites/>}/>
            <Route path="*" element={<h1>Not found</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

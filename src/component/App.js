import React, { useState, useEffect } from "react";
import "../App.css";
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";

const MOVIE_API_URL = "https://zipcloud.ibsnet.co.jp/api/search?zipcode=1000000";


const App = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        setMovies(jsonResponse.results);
        setLoading(false);
      });
  }, []);

  const search = searchValue => {
    setLoading(true);
    setErrorMessage(null)

    fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${searchValue}`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.message === null && jsonResponse.results === !null) {
          setMovies(jsonResponse.results);
          setLoading(false);
        } else if (jsonResponse.results === null) {
          setErrorMessage("パラメータ「郵便番号」の桁数が不正です。")
          setLoading(false)
        } else {
          setErrorMessage(jsonResponse.message);
          setLoading(false);
        }
      })
  }


  return (
    <div className="App">
      <Header text="郵便検索" />
      <Search search={search} />
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};


export default App;
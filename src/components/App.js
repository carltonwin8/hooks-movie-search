import React, { useEffect, useState } from "react";

import "./App.css";
import Header from "./Header";
import Search from "./Search";
import Movie from "./Movie";

const getUrlFor = search =>
  `https://www.omdbapi.com/?s=${search}&apikey=75a38601`;

function App() {
  const [loading, loadingSet] = useState(true);
  const [movies, moviesSet] = useState([]);
  const [errMsg, errMsgSet] = useState(null);

  const fetchData = async url => {
    errMsgSet(null);
    loadingSet(true);
    let resp, json;
    try {
      resp = await fetch(url);
      json = await resp.json();
    } catch (e) {
      const msg = `Error, fetching movies: ${e.message}`;
      console.log(msg);
      errMsgSet(msg);
      json.Search = [];
    }
    if (json.Response === "True") moviesSet(json.Search);
    else errMsgSet(json.Error);
    loadingSet(false);
  };

  useEffect(() => fetchData(getUrlFor("man")) && undefined, []);

  return (
    <div className="App">
      <Header text="Movie Search" />
      <Search search={e => fetchData(getUrlFor(e))} />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errMsg ? (
          <span>loading...</span>
        ) : errMsg ? (
          <div className="errorMessage">{errMsg}</div>
        ) : (
          movies.map(movie => <Movie key={movie.imdbID} movie={movie} />)
        )}
      </div>
    </div>
  );
}

export default App;

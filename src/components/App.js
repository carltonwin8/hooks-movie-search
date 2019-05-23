import React, { useEffect, useReducer } from "react";

import "./App.css";
import Header from "./Header";
import Search from "./Search";
import Movie from "./Movie";

const getUrlFor = search =>
  `https://www.omdbapi.com/?s=${search}&apikey=75a38601`;

const INITIAL_STATE = {
  loading: true,
  movies: [],
  errMsg: null
};
const SEARCH_MOVIES_REQUEST = "SEARCH_MOVIES_REQUEST";
const SEARCH_MOVIES_SUCCESS = "SEARCH_MOVIES_SUCCESS";
const SEARCH_MOVIES_FAILURE = "SEARCH_MOVIES_FAILURE";

const reducer = (state, action) => {
  switch (action.type) {
    case SEARCH_MOVIES_REQUEST:
      return { ...state, loading: true, errMsg: null };
    case SEARCH_MOVIES_SUCCESS:
      return { ...state, loading: false, movies: action.movies };
    case SEARCH_MOVIES_FAILURE:
      return { ...state, loading: false, errMsg: action.errMsg };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { loading, movies, errMsg } = state;

  const fetchData = async url => {
    dispatch({ type: SEARCH_MOVIES_REQUEST, payload: url });
    let resp, json;
    try {
      resp = await fetch(url);
      json = await resp.json();
    } catch (e) {
      const msg = `Error, fetching movies: ${e.message}`;
      console.log(msg);
      dispatch({ type: SEARCH_MOVIES_FAILURE, errMsg: msg });
    }
    if (json.Response === "True")
      dispatch({ type: SEARCH_MOVIES_SUCCESS, movies: json.Search });
    else dispatch({ type: SEARCH_MOVIES_FAILURE, errMsg: json.Error });
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

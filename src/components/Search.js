import React, { useState } from "react";

const Search = props => {
  const [searchValue, searchValueSet] = useState("");

  return (
    <form action="" className="search">
      <input
        type="text"
        value={searchValue}
        onChange={e => searchValueSet(e.target.value)}
      />
      <input
        type="submit"
        value="SEARCH"
        onClick={e => {
          e.preventDefault();
          props.search(searchValue);
          searchValueSet("");
        }}
      />
    </form>
  );
};

export default Search;

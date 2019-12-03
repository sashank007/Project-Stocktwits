import React from "react";
import { getSymbols } from "../../Api";

import SearchBar from "../SearchBar/SearchBar";

export default function Search(props) {
  const toggleDrawer = open => {
    console.log("toggledrwaer in search");
    props.toggleDrawer(open);
  };

  const searchSymbols = inp => {
    if (inp !== null && inp !== "") {
      //call middleware
      getSymbols(inp)
        .then(res => res.json())
        //then set all symbol list items inside of the list container
        .then(res => {
          let { body } = res;

          let { results } = JSON.parse(body);
          props.populateContainer(results);
        });
    } else props.populateContainer([]);
  };
  return (
    <div>
      <SearchBar toggleDrawer={toggleDrawer} searchSymbols={searchSymbols} />
    </div>
  );
}

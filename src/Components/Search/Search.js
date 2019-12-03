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
      //then set all symbol list items inside of the list container
      getSymbols(inp)
        .then(res => res.json())
        .then(res => {
          let { body } = res;
          body = JSON.parse(body);
          let { results } = body;
          console.log("body: ", results);

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

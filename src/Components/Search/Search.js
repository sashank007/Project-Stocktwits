import React, { useState } from "react";
import { getSymbols } from "../../Api";

import SearchBar from "../SearchBar/SearchBar";

export default function Search(props) {
  const searchSymbols = inp => {
    console.log("inp : ", inp);
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
      <SearchBar searchSymbols={searchSymbols} />
    </div>
  );
}

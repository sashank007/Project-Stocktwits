import React from "react";
import { getSymbols } from "../../Api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchBar from "../SearchBar/SearchBar";

export default function Search(props) {
  const toggleDrawer = open => {
    props.toggleDrawer(open);
  };

  const notify = data => toast.error(`${data}`);

  //call middleware
  //then set all symbol list items inside of the list container
  const searchSymbols = inp => {
    if (inp !== null && inp !== "") {
      getSymbols(inp)
        .then(res => res.json())
        .then(res => {
          let { body } = res;

          body = JSON.parse(body);
          if (!body.hasOwnProperty("errors")) {
            let { results } = body;
            props.populateContainer(results);
          } else {
            notify(
              "Oops, looks like you made more than 200 requests in this hour. Please try after some time."
            );
          }
        });
    } else props.populateContainer([]);
  };
  return (
    <div>
      <SearchBar toggleDrawer={toggleDrawer} searchSymbols={searchSymbols} />
    </div>
  );
}

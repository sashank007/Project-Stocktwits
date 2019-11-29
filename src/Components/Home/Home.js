import React, { useEffect, useState } from "react";
import { getAllTweets } from "../../Api";
import TweetList from "../TweetList/TweetList";
import Search from "../Search/Search";
import SearchResults from "../SearchResults/SearchResults";
import { Chip } from "@material-ui/core";
import Chips from "../Chips/Chips";

export default function Home() {
  const [tweets, setTweets] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [chipData, setChipData] = useState([]);

  //get the tweets based on whichever search option given
  const getTweets = () => {
    //for each symbol, create a new section and get all tweets
    //loop through symbols array
    chipData.map(data => {
      getAllTweets(data.label)
        .then(res => res.json())
        .then(res => {
          let body = JSON.parse(res.body);
          console.log(body);
          let { messages } = body;
          setTweets(messages);
        });
      return null;
    });
  };

  const populateContainer = results => {
    console.log("results : ", results);

    setSearchResults(results);
  };
  //get all values inside of search bar

  const updateChip = symbol => {
    if (symbol !== "" && symbol !== undefined) {
      let chip = { label: symbol };
      setChipData(chipData => [...chipData, chip]);
    }
  };

  const handleDelete = chipToDelete => {
    setChipData(chips =>
      chips.filter(chip => chip.label !== chipToDelete.label)
    );
  };

  useEffect(() => {
    getTweets();

    return () => {};
  }, [chipData]);

  return (
    <div>
      <Search populateContainer={populateContainer} />
      <SearchResults results={searchResults} updateChip={updateChip} />
      <Chips chipData={chipData} handleDelete={handleDelete} />
      {<TweetList messages={tweets} />}
    </div>
  );
}

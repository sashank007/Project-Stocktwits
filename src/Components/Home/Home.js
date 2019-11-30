import React, { useEffect, useState } from "react";
import { getAllTweets } from "../../Api";
import TweetList from "../TweetList/TweetList";
import Search from "../Search/Search";
import SearchResults from "../SearchResults/SearchResults";
import { Chip } from "@material-ui/core";
import Chips from "../Chips/Chips";

export default function Home() {
  const [tweets, setTweets] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [chipData, setChipData] = useState([]);

  //get the tweets based on whichever search option given
  const getTweets = () => {
    //for each symbol, create a new section and get all tweets
    //loop through symbols array
    let active = 0;
    setTweets([]);
    chipData.map(data => {
      console.log("chip data: ", data);
      if (data.color === "red") {
        active++;
        getAllTweets(data.label)
          .then(res => res.json())
          .then(res => {
            let body = JSON.parse(res.body);

            let { messages } = body;
            console.log("tweets changed: ", messages);
            setTweets(tweets => [...tweets, ...messages]);
          });
      }
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
      let chip = { label: symbol, key: symbol, color: "red" };
      setChipData(chipData => [...chipData, chip]);
    }
  };

  const handleDelete = chipToDelete => {
    setChipData(chips =>
      chips.filter(chip => chip.label !== chipToDelete.label)
    );
  };

  const handleChipClick = chip => {
    let newChipData = [...chipData];
    for (let i = 0; i < newChipData.length; i++) {
      if (newChipData[i] === chip && newChipData[i].color === "grey")
        newChipData[i].color = "red";
      else if (newChipData[i] === chip && newChipData[i].color === "red")
        newChipData[i].color = "grey";
    }
    console.log("c  : ", newChipData);
    setChipData(newChipData);
    // let c = newChipData.pop(newChipData.indexOf(chip));
    // c.color = "red";
    // console.log("new chip dta: ", newChipData, c);
    // setChipData(chipData => [...chipData, c]);
  };

  useEffect(() => {
    getTweets();

    return () => {};
  }, [chipData]);

  return (
    <div>
      <Search populateContainer={populateContainer} />
      <SearchResults results={searchResults} updateChip={updateChip} />
      <Chips
        chipData={chipData}
        handleDelete={handleDelete}
        handleChipClick={handleChipClick}
      />
      {<TweetList messages={tweets} />}
    </div>
  );
}

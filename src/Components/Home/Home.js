import React, { useEffect, useState } from "react";
import { getAllTweets } from "../../Api";
import TweetList from "../TweetList/TweetList";
import Search from "../Search/Search";
import SearchResults from "../SearchResults/SearchResults";

export default function Home() {
  const [tweets, setTweets] = useState(null);
  const [searchResults, setSearchResults] = useState(null);

  //get the tweets based on whichever search option given
  const getTweets = () => {
    //for each symbol, create a new section and get all tweets
    //loop through symbols array
    getAllTweets("AAPL")
      .then(res => res.json())
      .then(res => {
        let body = JSON.parse(res.body);
        console.log(body);
        let { messages } = body;
        setTweets(messages);
      });
  };

  const populateContainer = results => {
    console.log("results : ", results);
    setSearchResults(results);
  };
  //get all values inside of search bar

  useEffect(() => {
    getTweets();
    return () => {};
  }, []);

  return (
    <div>
      <Search populateContainer={populateContainer} />
      <SearchResults results={searchResults} />
      {/* {<TweetList messages={tweets} />} */}
    </div>
  );
}

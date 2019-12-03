import React, { useEffect, useState, useRef } from "react";
import { getAllTweets } from "../../Api";
import TweetList from "../TweetList/TweetList";
import Search from "../Search/Search";
import SearchResults from "../SearchResults/SearchResults";
import Chips from "../Chips/Chips";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [tweets, setTweets] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [chipData, setChipData] = useState([]);
  const twitterBlue = "#1da1f2";

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    });

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }

      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }, [delay]);
  }
  const notify = chip => toast(`${chip} added`);

  useInterval(() => {
    console.log("use interval...");
    let chips = chipData.filter(chip => chip.color === twitterBlue);
    if (chips.length > 0) {
      let newTweets = [];

      let active = 0;
      chips.map(data => {
        if (data.color === twitterBlue) {
          getAllTweets(data.label)
            .then(res => res.json())
            .then(res => {
              let body = JSON.parse(res.body);
              active++;
              let { messages } = body;

              messages = messages.map(function(el) {
                var o = Object.assign({}, el);
                o.symbol = data.label;
                return o;
              });
              newTweets = newTweets.concat(messages);
              return newTweets;
            })
            .then(newTweets => {
              if (active === chips.length && newTweets !== tweets) {
                newTweets.sort((a, b) => {
                  let d1 = new Date(b.created_at);
                  let d2 = new Date(a.created_at);
                  return d1 - d2;
                });
                setTweets(newTweets);
              }
            });
        }
      });
    } else setTweets([]);
  }, 5000);

  //get the tweets based on whichever search option given
  const getTweets = () => {
    //for each symbol, create a new section and get all tweets
    //loop through symbols array
    console.log("getting tweets...");

    let chips = chipData.filter(chip => chip.color === twitterBlue);
    if (chips.length > 0) {
      let newTweets = [];

      let active = 0;
      chips.map(data => {
        if (data.color === twitterBlue) {
          getAllTweets(data.label)
            .then(res => res.json())
            .then(res => {
              let body = JSON.parse(res.body);
              active++;
              let { messages } = body;

              messages = messages.map(function(el) {
                var o = Object.assign({}, el);
                o.symbol = data.label;
                return o;
              });
              newTweets = newTweets.concat(messages);
              return newTweets;
            })
            .then(newTweets => {
              if (active === chips.length && newTweets !== tweets) {
                newTweets.sort((a, b) => {
                  let d1 = new Date(b.created_at);
                  let d2 = new Date(a.created_at);
                  return d1 - d2;
                });
                setTweets(newTweets);
              }
            });
        }
      });
    } else setTweets([]);
  };

  const populateContainer = results => {
    setSearchResults(results);
  };
  //get all values inside of search bar

  const updateChip = symbol => {
    if (symbol !== "" && symbol !== undefined) {
      let chip = { label: symbol, key: symbol, color: twitterBlue };
      setChipData(chipData => [...chipData, chip]);

      getTweets();
      notify(symbol);
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
        newChipData[i].color = twitterBlue;
      else if (newChipData[i] === chip && newChipData[i].color === twitterBlue)
        newChipData[i].color = "grey";
    }

    setChipData(newChipData);
  };

  useEffect(() => {
    getTweets();

    return () => {};
  }, []);

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
      <ToastContainer />
    </div>
  );
}

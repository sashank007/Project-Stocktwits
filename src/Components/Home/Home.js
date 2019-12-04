import React, { useEffect, useState, useRef } from "react";
import { getAllTweets } from "../../Api";
import TweetList from "../TweetList/TweetList";
import Search from "../Search/Search";
import SearchResults from "../SearchResults/SearchResults";
import Chips from "../Chips/Chips";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavDrawer from "../NavDrawer/NavDrawer";

export default function Home() {
  const [tweets, setTweets] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [chipData, setChipData] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);

  const twitterBlue = "#1da1f2";

  useEffect(() => {
    getTweets();

    return () => {};
  }, []);

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

  //when you want to notify if chip has been added
  const notify = chip => toast(`Getting tweets for ${chip}...`);

  //notify for errors
  const notifyError = data => toast.error(data);

  //run every 10 seconds to get latest tweets
  useInterval(() => {
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

              if (res.statusCode === 200) {
                active++;
                let { messages } = body;

                messages = messages.map(function(el) {
                  var o = Object.assign({}, el);
                  o.symbol = data.label;
                  return o;
                });
                newTweets = newTweets.concat(messages);
                return newTweets;
              } else {
                return tweets;
              }
            })
            .then(newTweets => {
              if (
                active === chips.length &&
                newTweets !== tweets &&
                newTweets.length > 0
              ) {
                newTweets.sort((a, b) => {
                  let d1 = new Date(b.created_at);
                  let d2 = new Date(a.created_at);
                  return d1 - d2;
                });

                setTweets(newTweets);
              }
            });
        } else {
          let newChipData = [...chipData];
          newChipData.map(chip => {
            if (chip === data) chip.count = 0;
          });

          setChipData(newChipData);
        }
        return null;
      });
    } else setTweets([]);
  }, 10000);

  //get the tweets based on whichever search option given
  //for each symbol, create a new section and get all tweets
  //loop through symbols array
  const getTweets = () => {
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
              if (res.statusCode === 200) {
                active++;
                let { messages } = body;
                messages = messages.map(function(el) {
                  var o = Object.assign({}, el);
                  o.symbol = data.label;
                  return o;
                });
                newTweets = newTweets.concat(messages);

                return newTweets;
              } else {
                notifyError(
                  "Oops, looks like you made more than 200 requests in this hour. Please try after some time."
                );

                return tweets;
              }
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
        return null;
      });
    } else setTweets([]);
  };

  const populateContainer = results => {
    setSearchResults(results);
  };

  //get all values inside of search bar
  const updateChip = symbol => {
    if (symbol !== "" && symbol !== undefined) {
      let chip = { label: symbol, key: symbol, color: twitterBlue, count: 30 };
      let isExists = false;

      for (var i = 0; i < chipData.length; i++) {
        if (JSON.stringify(chipData[i]) === JSON.stringify(chip)) {
          isExists = true;
          return;
        }
      }
      if (!isExists) {
        setChipData(chipData => [...chipData, chip]);
        getTweets();
        notify(symbol);
      }
    }
  };

  const handleDelete = chipToDelete => {
    setChipData(chips =>
      chips.filter(chip => chip.label !== chipToDelete.label)
    );
  };

  //when click on chip, only display that stock
  const handleChipClick = chip => {
    let newChipData = [...chipData];

    for (let i = 0; i < newChipData.length; i++) {
      if (newChipData[i] === chip && newChipData[i].color === "grey") {
        newChipData[i].color = twitterBlue;
        newChipData[i].count = 30;
      } else if (
        newChipData[i] === chip &&
        newChipData[i].color === twitterBlue
      ) {
        newChipData[i].color = "grey";
        newChipData[i].count = 0;
      }
    }

    setChipData(newChipData);
    getTweets();
  };

  //when you click on nav symbol, only display that stock
  const handleChipClickNav = chip => {
    let newChipData = [...chipData];

    for (let i = 0; i < newChipData.length; i++) {
      if (newChipData[i] === chip) {
        newChipData[i].color = twitterBlue;
        newChipData[i].count = 30;
      } else {
        newChipData[i].color = "grey";
        newChipData[i].count = 0;
      }
    }

    setChipData(newChipData);
    getTweets();
  };

  const toggleDrawer = open => {
    setShowDrawer(open);
  };

  return (
    <div>
      <Search
        populateContainer={populateContainer}
        toggleDrawer={toggleDrawer}
      />
      <SearchResults results={searchResults} updateChip={updateChip} />
      <Chips
        chipData={chipData}
        handleDelete={handleDelete}
        handleChipClick={handleChipClick}
      />
      {<TweetList messages={tweets} />}
      <ToastContainer />
      <NavDrawer
        symbolClick={handleChipClickNav}
        chips={chipData}
        toggleDrawer={toggleDrawer}
        showDrawer={showDrawer}
      />
    </div>
  );
}

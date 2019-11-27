import React, { useEffect, useState } from "react";
import getAllTweets from "../../Api";
import TweetList from "../TweetList/TweetList";

export default function Home() {
  const [tweets, setTweets] = useState(null);

  const getTweets = () => {
    getAllTweets("AAPL")
      .then(res => res.json())
      .then(res => {
        let body = JSON.parse(res.body);
        console.log(body);
        let { messages } = body;
        setTweets(messages);
      });
  };

  useEffect(() => {
    getTweets();
    return () => {};
  }, []);

  return <div>{<TweetList messages={tweets} />}</div>;
}

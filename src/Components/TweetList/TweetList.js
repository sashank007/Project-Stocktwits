import React, { useEffect } from "react";
import List from "@material-ui/core/List";
import TweetItem from "../TweetItem/TweetItem";
import { useStyles } from "./TweetList.Style";

export default function TweetList(props) {
  const classes = useStyles();
  const { messages } = props;

  useEffect(() => {
    TweetItems(messages);
    return () => {};
  }, []);

  const TweetItems = () => {
    if (messages && messages.length > 0) {
      return messages.map((val, index) => {
        let { body, created_at, symbol } = val;
        let { avatar_url, username } = val.user;

        return (
          <TweetItem
            key={index}
            name={username}
            createdAt={created_at}
            avatar={avatar_url}
            tweet={body}
            symbol={symbol}
          />
        );
      });
    } else
      return (
        <div>
          Get the latest tweets for stocks here! Go ahead and search for a
          stock...
        </div>
      );
  };

  return (
    <div>
      {messages ? (
        <List className={classes.root}>
          <TweetItems />
        </List>
      ) : (
        <div>No tweets to display</div>
      )}
    </div>
  );
}

import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import TweetItem from "../TweetItem/TweetItem";

const useStyles = makeStyles(theme => ({
  root: {
    width: "80%",
    maxWidth: "80vw",
    border: "0.5px solid grey",
    marginTop: "2vw",
    marginLeft: "auto",
    marginRight: "auto",

    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
}));

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
        // let { symbol } = val.symbols[0];

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

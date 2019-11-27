import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import TweetItem from "../TweetItem/TweetItem";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: "100vw",
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
    console.log("props in tweetlist: ", props);
    TweetItems(messages);
    return () => {};
  }, [props, messages]);

  const TweetItems = () => {
    console.log("messages: ", messages);
    if (messages && messages.length > 0) {
      return messages.map((val, index) => {
        console.log(val);
        let { body, created_at } = val;
        let { avatar_url, username } = val.user;
        return <TweetItem name={username} avatar={avatar_url} tweet={body} />;
      });
    }
  };

  return (
    <div>
      {messages ? (
        <List className={classes.root}>
          <TweetItems />
        </List>
      ) : (
        <div>hi</div>
      )}
    </div>
  );
}

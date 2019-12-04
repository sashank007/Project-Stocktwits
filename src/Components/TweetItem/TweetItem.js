import React from "react";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import { useStyles } from "./TweetItem.Style";

export default function TweetItem(props) {
  const classes = useStyles();
  const { name, avatar, tweet, createdAt, symbol } = props;
  let time = new Date(createdAt).toTimeString();
  let date = new Date(createdAt).toLocaleDateString();

  return (
    <div>
      <ListItem
        alignItems="flex-start"
        style={{ paddingLeft: "2vw", paddingRight: "2vw" }}
      >
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={avatar} />
        </ListItemAvatar>
        <ListItemText
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="h6"
                className={classes.inline}
                color="textPrimary"
              >
                <b> {name}</b>
              </Typography>
              <br />
              <Typography
                component="span"
                variant="body2"
                style={{ color: "rgb(20, 23, 26)", maxWidth: "80%" }}
                className={classes.inline}
                color="textPrimary"
              >
                {" "}
                {tweet}
              </Typography>
              <br />
              {date} {time}
              <Typography variant="body1" className={classes.symbol}>
                {" "}
                {symbol}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  );
}

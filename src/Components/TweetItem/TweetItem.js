import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 600,
    padding: "20px",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  },
  symbol: {
    float: "right",
    color: "#1da1f2"
  }
}));

export default function TweetItem(props) {
  const classes = useStyles();
  const { name, avatar, tweet, createdAt, symbol } = props;

  return (
    <div>
      <ListItem alignItems="flex-start">
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
                {name} -
              </Typography>
              <br />
              <Typography
                component="span"
                variant="body2"
                style={{ color: "rgb(20, 23, 26)" }}
                className={classes.inline}
                color="textPrimary"
              >
                {" "}
                {tweet}
              </Typography>
              <br />
              {new Date(createdAt).toDateString()}
              <Typography variant="body2" className={classes.symbol}>
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

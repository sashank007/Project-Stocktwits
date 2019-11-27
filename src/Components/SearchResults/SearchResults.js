/* eslint-disable no-restricted-globals */
import React, { useEffect } from "react";
import "./SearchResults.css";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

const SearchResults = props => {
  let { results } = props;

  const useStyles = makeStyles(theme => ({
    root: {
      width: "60%",
      maxWidth: "60vw",
      marginLeft: "10vw",
      maxHeight: "35vh",
      overflow: "auto",
      color: "#0000004a",
      display: "block",
      backgroundColor: "#fff",
      border: "0.4px solid black",
      fontFamily: "'PT Sans Narrow', sans-serif"
    },
    inline: {
      display: "inline"
    }
  }));
  useEffect(() => {}, [results]);
  const classes = useStyles();

  const AllResults = () => {
    console.log("all results: ", results);
    if (results) {
      return results.map((val, i) => (
        <ListItem alignItems="flex-start">
          <ListItemText
            primary={results[i].symbol}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                ></Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      ));
    } else return <div></div>;
    // let totalTracks = [];
    // if (tracks) {
    //   tracks.map((keyName, i) => {
    //     let currentTrack = tracks[i];
    //     if (
    //       currentTrack.hasOwnProperty("album") &&
    //       currentTrack.album.hasOwnProperty("images") &&
    //       currentTrack.album.images.length > 0
    //     ) {
    //       let trackItem = (
    //         <TrackItem
    //           key={i}
    //           id={i}
    //           trackImage={tracks[i].album.images[0].url}
    //           trackName={tracks[i].name}
    //         />
    //       );
    //       totalTracks.push(trackItem);
    //     }
    //   });
    //   return totalTracks;
    // }
  };

  return (
    <div className="search-container">
      <List className={classes.root}>
        <div>
          <AllResults />
        </div>
      </List>
    </div>
  );
};

export default SearchResults;
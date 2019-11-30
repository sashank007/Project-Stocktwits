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
      display: "block",
      width: "60%",
      maxWidth: "60vw",
      marginLeft: "10vw",
      maxHeight: "35vh",
      overflow: "auto",
      color: "#0000004a",

      backgroundColor: "#fff",
      border: "0.4px solid black",
      fontFamily: "'PT Sans Narrow', sans-serif"
    },
    inline: {
      display: "inline"
    }
  }));
  useEffect(() => {}, []);
  const classes = useStyles();

  const updateChip = symbol => {
    props.updateChip(symbol);
  };

  const AllResults = () => {
    console.log("all results: ", results);
    if (results !== null && results.length > 0) {
      return results.map((val, i) => (
        <ListItem
          alignItems="flex-start"
          onClick={() => updateChip(results[i].symbol)}
        >
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
  };

  return (
    <div>
      {results !== null ? (
        <div className="search-container">
          <List className={classes.root} style={{ padding: "0px" }}>
            <div>
              <AllResults />
            </div>
          </List>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default SearchResults;

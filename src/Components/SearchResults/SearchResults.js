/* eslint-disable no-restricted-globals */
import React, { useEffect } from "react";
import "./SearchResults.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

import { useStyles } from "./SearchResults.Style.js";
const SearchResults = props => {
  let { results } = props;

  useEffect(() => {}, []);
  const classes = useStyles();

  const updateChip = symbol => {
    props.updateChip(symbol);
  };

  const AllResults = () => {
    if (results && results !== null && results.length > 0) {
      return results.map((val, i) => (
        <ListItem
          alignItems="flex-start"
          key={i}
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
        <div className={classes.searchContainer}>
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

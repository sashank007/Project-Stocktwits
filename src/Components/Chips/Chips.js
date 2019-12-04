import React, { useEffect } from "react";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";

import { useStyles } from "./Chips.Style";
export default function Chips(props) {
  const classes = useStyles();
  const { chipData } = props;

  useEffect(() => {}, [chipData]);

  const handleDelete = chipToDelete => () => {
    props.handleDelete(chipToDelete);
  };

  const handleClick = chip => {
    props.handleChipClick(chip);
  };
  return (
    <Paper className={classes.root}>
      {chipData.map(data => {
        let icon;
        return (
          <Chip
            key={data.key}
            icon={icon}
            style={{ color: "white", background: data.color }}
            onClick={() => handleClick(data)}
            label={data.label}
            onDelete={handleDelete(data)}
            className={classes.chip}
          />
        );
      })}
    </Paper>
  );
}

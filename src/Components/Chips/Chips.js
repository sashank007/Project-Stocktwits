import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import TagFacesIcon from "@material-ui/icons/TagFaces";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: theme.spacing(0.5)
  },
  chip: {
    margin: theme.spacing(0.5)
  }
}));

export default function Chips(props) {
  const classes = useStyles();
  const { chipData } = props;

  useEffect(() => {}, []);

  const handleDelete = chipToDelete => () => {
    props.handleDelete(chipToDelete);
  };

  return (
    <Paper className={classes.root}>
      {chipData.map(data => {
        let icon;
        return (
          <Chip
            key={data.key}
            icon={icon}
            label={data.label}
            onDelete={handleDelete(data)}
            className={classes.chip}
          />
        );
      })}
    </Paper>
  );
}

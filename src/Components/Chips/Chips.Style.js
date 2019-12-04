import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
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

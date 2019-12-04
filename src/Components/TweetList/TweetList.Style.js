import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
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

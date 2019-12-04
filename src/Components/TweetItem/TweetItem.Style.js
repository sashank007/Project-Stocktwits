import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
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

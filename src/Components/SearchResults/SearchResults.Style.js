import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  root: {
    display: "block",
    width: "100%",
    maxWidth: "60vw",
    marginLeft: "15vw",
    maxHeight: "35vh",
    overflow: "auto",
    color: "#0000004a",
    boxShadow: " 0 3px 8px 0 rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.08)",
    borderRadius: "0 0 24px 24px",
    paddingBottom: "4px",
    backgroundColor: "#fff",
    fontFamily: "'PT Sans Narrow', sans-serif",
    [theme.breakpoints.up("md")]: {
      width: 200
    },
    [theme.breakpoints.up("md")]: {
      display: "flex"
    },
    [theme.breakpoints.down("1000")]: {
      marginLeft: "25vw"
    },
    [theme.breakpoints.down("600")]: {
      marginLeft: "15vw"
    },
    [theme.breakpoints.up("1439")]: {
      marginLeft: "5vw"
    }
  },
  inline: {
    display: "inline"
  },
  searchContainer: {
    background: "transparent",
    position: "absolute",
    top: "10",
    width: "30vw",
    left: 20,
    height: "80vh",
    zIndex: 50,
    fontFamily: " 'Alata', sans-serif",
    [theme.breakpoints.down("600")]: {
      width: "100vw"
    }
  }
}));

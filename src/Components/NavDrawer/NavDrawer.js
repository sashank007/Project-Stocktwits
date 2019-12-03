import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

export default function NavDrawer(props) {
  const classes = useStyles();
  const { chips, showDrawer } = props;

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    props.toggleDrawer(open);
  };

  const getAllSymbols = () => {
    let symbols = [];
    chips.map(data => {
      console.log(data.key);
      symbols.push(data.key);
    });
    return symbols;
  };

  const clickSymbol = chip => {
    console.log(chip);
    props.symbolClick(chip);
  };
  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {chips.map(data => (
          <ListItem button onClick={() => clickSymbol(data)} key={data.key}>
            <ListItemText primary={data.label} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <Drawer open={showDrawer} onClose={toggleDrawer(false)}>
        {sideList("left")}
      </Drawer>
    </div>
  );
}

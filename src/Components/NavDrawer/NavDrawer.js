import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useStyles } from "./NavDrawer.Style";

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

  const clickSymbol = chip => {
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

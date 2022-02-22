import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Context from "../Context";
import Navlink from "./Navlink";

const Sidebar = () => {
  const { globalState } = useContext(Context);
  return (
    <div
      style={{
        width: "255px",
        height: "100%",
        backgroundColor: "lightgray",
      }}
    >
      <nav>
        <Drawer
          variant="permanent"
          anchor="left"
          //   open={true}
          //   onClose={() => console.log("close")}
        >
          <Box
            sx={{
              width: 250,
            }}
            role="presentation"
            // onClick={toggleDrawer(anchor, false)}
            // onKeyDown={toggleDrawer(anchor, false)}
          >
            <List>
              {globalState.BoardList.map((board) => {
                return (
                  <Navlink key={board.id} to={`/board/${board.id}`}>
                    <ListItem button key={board.name}>
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText primary={board.name} />
                    </ListItem>
                  </Navlink>
                );
              })}
            </List>
            <Divider />
            <List>
              {["All mail", "Trash", "Spam"].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </nav>
    </div>
  );
};

export default Sidebar;

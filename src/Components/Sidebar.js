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
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import Context from "../Context";
import Navlink from "./Navlink";

const Sidebar = () => {
  const { globalState } = useContext(Context);
  return (
    <div
      style={{
        width: "20vw",
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
              width: "19vw",
              marginRight: "1rem",
            }}
            role="presentation"
            // onClick={toggleDrawer(anchor, false)}
            // onKeyDown={toggleDrawer(anchor, false)}
          >
            <List>
              <Navlink key={"home"} to="/">
                <ListItem button key={"home"}>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Home"} />
                </ListItem>
              </Navlink>
            </List>
            <Divider />
            <List>
              {globalState.boards
                .sort((a, b) => a.id - b.id)
                .map((board) => {
                  return (
                    <Navlink key={board.id} to={`/board/${board.id}`}>
                      <ListItem button key={board.name}>
                        <ListItemIcon>
                          <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary={board.name} />
                      </ListItem>
                    </Navlink>
                  );
                })}
            </List>
          </Box>
        </Drawer>
      </nav>
    </div>
  );
};

export default Sidebar;

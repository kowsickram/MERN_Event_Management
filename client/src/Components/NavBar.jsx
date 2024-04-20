import React, { useState } from "react";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function SideBar() {
  const user = JSON.parse(sessionStorage.getItem("student"));
  const admin = JSON.parse(sessionStorage.getItem("admin"));

  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(open);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("student");
    sessionStorage.removeItem("admin");
    setTimeout(() => {
      window.location.reload();
      window.location.href = "/";
    }, 1000);
  };

  return (
    <>
      {isMobile ? (
        <>
          <AppBar position="static">
            <Toolbar className=" bg-gray-800">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component={Link} to="/">
                <h1 className="text-lg">RVS Event</h1>
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
            <div
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <div style={{ width: "250px" }} className="p-2">
                {user || admin ? (
                  <>
                    <Button color="inherit" component={Link} to="/">
                      Home
                    </Button>
                    <br />
                    {user ? (
                      <>
                        <Button
                          color="inherit"
                          component={Link}
                          to="/all_events"
                        >
                          Events
                        </Button>
                        <br />
                        <Button
                          color="inherit"
                          component={Link}
                          to="/my-events"
                        >
                          My Events
                        </Button>
                        <br />
                        <Button
                          onClick={handleLogout}
                          variant="contained"
                          style={{ marginTop: "8px" }}
                        >
                          Log-out
                        </Button>
                        <br />
                        <Button color="inherit" component={Link} to="/contact">
                      Contact Us
                    </Button>
                    <br />
                      </>
                    ) : null}
                   
                    {admin ? (
                      <>
                        <Button color="inherit" component={Link} to="/admin">
                          Dashboard
                        </Button>
                        <br />
                        <Button
                          color="inherit"
                          component={Link}
                          to="/live_events"
                        >
                          Live Events
                        </Button>
                        <br />
                        <Button
                          color="inherit"
                          component={Link}
                          to="/event_form"
                        >
                          Event Form
                        </Button>
                        <br />
                        <Button
                          onClick={handleLogout}
                          variant="contained"
                          style={{ marginTop: "8px" }}
                        >
                          Log-out
                        </Button>
                      </>
                    ) : null}
                  </>
                ) : (
                  <>
                    <Button color="inherit" component={Link} to="/std-reg">
                      Register
                    </Button>
                    <br />
                    <Button color="inherit" component={Link} to="/login">
                      Login
                    </Button>
                    <br />
                    <Button color="inherit" component={Link} to="/contact">
                      Contact Us
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Drawer>
        </>
      ) : (
        <AppBar position="static">
          <Toolbar className="bg-gray-800 flex justify-between items-center">
            <Typography variant="h6" component={Link} to="/">
              <h1 className="text-lg">RVS Events</h1>
            </Typography>
            <div>
              {user || admin ? (
                <>
                  <Button color="inherit" component={Link} to="/">
                    Home
                  </Button>
                  {user ? (
                    <>
                      <Button color="inherit" component={Link} to="/all_events">
                        Events
                      </Button>
                      <Button color="inherit" component={Link} to="/my-events">
                        My Events
                      </Button>
                    </>
                  ) : null}
                  {admin ? (
                    <>
                      <Button color="inherit" component={Link} to="/admin">
                        Dashboard
                      </Button>
                      <Button
                        color="inherit"
                        component={Link}
                        to="/live_events"
                      >
                        Live Events
                      </Button>
                      <Button color="inherit" component={Link} to="/event_form">
                        Event Form
                      </Button>
                    </>
                  ) : null}
                  <Button
                    onClick={handleLogout}
                    variant="contained"
                    className="ml-2"
                  >
                    Log-out
                  </Button>
                </>
              ) : (
                <>
                  <Button color="inherit" component={Link} to="/std-reg">
                    Register
                  </Button>
                  <Button color="inherit" component={Link} to="/login">
                    Login
                  </Button>
                  <Button color="inherit" component={Link} to="/contact">
                    Contact Us
                  </Button>
                </>
              )}
            </div>
          </Toolbar>
        </AppBar>
      )}
    </>
  );
}

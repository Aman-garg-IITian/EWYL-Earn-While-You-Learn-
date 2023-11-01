import {
  Avatar,
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import isAuth, { userType } from "../lib/isAuth";

// Define your custom primary and secondary colors
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    height: "50px", // Change this to the desired height
  },
  title: {
    flexGrow: 1,
  },
  img: {
    marginRight: theme.spacing(1),
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
  },
  userName: {
    marginRight: theme.spacing(2),
  },
}));

const Navbar = (props) => {
  const classes = useStyles();
  let history = useHistory();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/user");
      const data = await response.json();
      setUser(data);
    };

    fetchUser();
  }, []);

  const handleClick = (location) => {
    console.log(location);
    history.push(location);
    window.location.reload();
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <img
            src="/logo.png"
            alt="logo"
            className={classes.img}
            style={{ maxHeight: "40px" }}
          />
        </Typography>
        {isAuth() ? (
          userType() === "recruiter" ? (
            <>
              <Button color="inherit" onClick={() => handleClick("/home")}>
                Jobs
              </Button>
              <Button color="inherit" onClick={() => handleClick("/addjob")}>
                Add Jobs
              </Button>
              <Button color="inherit" onClick={() => handleClick("/myjobs")}>
                My Jobs
              </Button>
              <Button color="inherit" onClick={() => handleClick("/employees")}>
                Employees
              </Button>
              {/* <Button color="inherit" onClick={() => handleClick("/profile")}>
                Profile
              </Button> */}
              {user && (
                <div className={classes.userInfo}>
                  <Typography variant="subtitle1" className={classes.userName}>
                    {user.name}
                  </Typography>
                  <Avatar alt={user.name} src={user.photo} />
                </div>
              )}
              <Button color="inherit" onClick={() => handleClick("/logout")}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => handleClick("/home")}>
                Jobs
              </Button>
              <Button
                color="inherit"
                onClick={() => handleClick("/applications")}
              >
                Applications
              </Button>
              <Button color="inherit" onClick={() => handleClick("/profile")}>
                Profile
              </Button>
              <Button color="inherit" onClick={() => handleClick("/logout")}>
                Logout
              </Button>
            </>
          )
        ) : (
          <>
            <Button color="inherit" onClick={() => handleClick("/login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => handleClick("/signup")}>
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

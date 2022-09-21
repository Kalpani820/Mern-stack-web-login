import React from "react";
import { Grid, Button, AppBar, Toolbar, Avatar } from "@material-ui/core"
import "./styles.css";
import { useNavigate } from 'react-router-dom';

//Header component
const Header = () => {

  const navigate = useNavigate();

  async function logOut(event) {
    event.preventDefault();
    try {
      localStorage.removeItem('token');
    } catch (err) {
      console.error(err);
    }
    navigate("/");
  }

  return (
    <div className="root">
      <AppBar position="static" color="default" className="AppBar">
        <Grid className="container">
          <Toolbar>
            <Grid className="grow">
              <Button className="mainLogo">
                <Avatar src="https://upload.wikimedia.org/wikipedia/commons/3/33/Hey_2018_logo.svg" className="avatar" />
              </Button>
            </Grid>
            <div className="links">
              {localStorage.getItem("token") === null
                ? <div><Button color="inherit" onClick={() => navigate("/login")} className="buttonFontSize loginButton">Login</Button>
                  <Button color="inherit" onClick={() => navigate("/register")} className="buttonFontSize loginButton">Sign up</Button></div>
                : <Button color="inherit" onClick={logOut} className="buttonFontSize loginButton">LogOut</Button>}
            </div>
          </Toolbar>
        </Grid>
      </AppBar>
    </div>
  )
}

export default Header;
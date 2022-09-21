import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { faFaceGrinBeamSweat } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './style.css';


function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


 //fetch data to database, check validation, direct to the role based paged
  async function loginUser(event) {

    event.preventDefault();

    const response = await fetch('http://localhost:1337/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      }),

    })
    const data = await response.json();
    console.log(data.user);

    if (data.user) {
      localStorage.setItem('token', data.user);

      if (data.role === "admin") {
        navigate("/admin");
      }
      else {
        navigate("/user");
      }
    }
    else {
      alert('Please check your Email and Password');
    }
  }

  return (
    <div >
      <div className="container-fluid">
        <div className="row main-content text-center">
          <div className="col-md-4 text-center company__info">
            <button className="companylogo"
              onClick={() => navigate("/")}>
              <FontAwesomeIcon icon={faFaceGrinBeamSweat} />
            </button>
            <h4 className="company_title">Welcome!</h4>
          </div>
          <div className="col-md-8 col-xs-12 col-sm-12 login_form ">
            <div className="container-fluid">
              <div className="row">
                <h2>Log In</h2>
              </div>
              <div className="row">
                <form className="form-group" onSubmit={loginUser}>
                  <div className="row">
                    <input name="username" id="username" className="form__input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="Email" />
                  </div>
                  <div className="row">
                    <input name="password" id="password" className="form__input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="Password" />
                  </div>
                  <div className="row">
                    <input type="submit" value="Login" className="btn" style={{ marginLeft: "15%" }} />
                  </div>
                </form>
              </div>
              <div className="row">
                <p>Don't have an account? <a href="/register">Register Here</a></p>
              </div>
            </div>
          </div>
        </div>
      </div >

    </div >
  );
}

export default Login;
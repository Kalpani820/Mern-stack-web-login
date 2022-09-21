import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faFaceGrinStars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './style.css'


function Register() {


  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const role = 'user';

 //fetch data to api, allows to register
  async function registerUser(event) {

    event.preventDefault();

    const response = await fetch('http://localhost:1337/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role
      })
    })

    const data = await response.json();

    if (data.status === 'ok') {
      navigate('/login');
    }
  }

  return (
    <div >
      <div className="container-fluid">
        <div className="row main-content text-center">
          <div className="col-md-4 text-center company__info">
          <button className="companylogo"
              onClick={() => navigate("/")}>
              <FontAwesomeIcon icon={faFaceGrinStars} />
            </button>
            <h4 className="company_title">Hello</h4>
          </div>
          <div className="col-md-8 col-xs-12 col-sm-12 login_form ">
            <div className="container-fluid">
              <div className="row">
                <h2>Sign Up</h2>
              </div>
              <div className="row">
                <form  className="form-group" onSubmit={registerUser}>
                  <div className="row">
                    <input  name="username" id="username" className="form__input" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Name" />
                  </div>
                  <div className="row">
                    <input  name="email" id="email" className="form__input" 
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
                    placeholder="Password"/>
                  </div>

                  <div className="row">
                    <input type="submit" value="Register" className="btn"/>
                  </div>
                </form>
              </div>
              <div className="row">
                <p>Already have an account? <a href="/login">Login Here</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
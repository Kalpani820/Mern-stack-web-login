import React from 'react';
import Header from '../component/Header/header';
import home from "../assests/home.png";
import './style.css';

const Home = () => {

    return (
        <div>
            <Header />
            <div className="container text-center">
                <div className="row">
                    <div className="col">
                        <p className="hometext1" style={{lineHeight: "1",marginTop:"6rem"}}>
                            Hello <span></span>
                            <span className="hometext2">
                                World!
                            </span>
                        </p>
                    </div>
                    <div className="col">
                        <img src={home} alt="IMG" style={{maxWidth:"100%",marginTop:"2rem"}} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
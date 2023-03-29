import React from "react";
import logo from "./natter_logo.png";
import video from "../video/vid-natter.mp4";
import 'react-toastify/dist/ReactToastify.css';

export default function LandingPage({ setName, name, socket }) {

  const handleKeydown = (event) => {
    if (event.key === 'Enter') {
      if (name === "") {
        return alert("Please enter a name.");
      }
      socket.emit("receive_name", name);
    };
  };
  const handleClick = () => {
    if (name === "") {
      return alert("Please enter a name.");
    }

    socket.emit("receive_name", name);
  };

  return (
    <body id="page-top">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top shadow-sm" id="mainNav">
        <div className="container px-5">
          <img src={logo} class="rounded mx-auto d-block mr-0" alt="Natter Logo" height="150" width="100%" />
          <div className="div-outline div-black text-center col-md-12 collapse navbar-collapse d-flex text-center justify-content-center">
            <input type="text" placeholder="Enter your name..." value={name} onChange={(event) => setName(event.target.value)} onKeyDown={handleKeydown} maxLength="50"></input>
            <button className="btn-lg btn-primary rounded-pill ml-3 mb-2" onClick={handleClick}>
              <span className="d-flex align-items-center">
                <i className="bi-chat-text-fill me-2 mr-2"></i>
                <span className="big">Click to Natter</span>
              </span>
            </button>
          </div>
        </div>
      </nav>
      <section>
        <video autoPlay loop muted plays-inline controls width="100%">
          <source src={video} type="video/mp4" />
          Sorry your browser doesn't support videos.
        </video>
      </section>
      <header className="masthead">
        <div className="container px-5">
          <div className="row gx-5 align-items-center">
            <div className="col-lg-6">
              <div className="mb-5 mb-lg-0 text-center text-lg-start">
                <p className="lead fw-normal mb-5">Simply enter your name, choose your interest group and you're ready to natter!</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="masthead-device-mockup">
                <div className="device-wrapper">
                  <div className="device" data-device="iPhoneX" data-orientation="portrait" data-color="black">
                    <div>
                      <img src="https://cdn-icons-png.flaticon.com/512/610/610413.png" alt="Speech bubbles" width="100%" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <aside className="text-center bg-gradient-primary-to-secondary">
        <div className="container px-5">
          <div className="row gx-5 justify-content-center">
            <div className="col-xl-8">
              <div className="h2 fs-1 text-white mb-4">"Good mental health starts with a good natter!"</div>
              <img src="https://cdn-icons-png.flaticon.com/512/3002/3002655.png" alt="Two people having a good natter" width="100%" />
            </div>
          </div>
        </div>
      </aside>
    </body>
  );
};
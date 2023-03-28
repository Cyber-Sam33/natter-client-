import "./App.css";
import Axios from "axios";
import io from "socket.io-client";
import Chat from "./components/Chat";
import { useEffect, useState } from "react";
import LandingPage from "./components/LandingPage";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const schedule = require('node-schedule');
const socket = io.connect("http://localhost:8080");

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [group, setGroup] = useState("Main");
  const [groupList, setGroupList] = useState([]);
  const [page, setPage] = useState("LandingPage");

  function createName(name) {
    setPage("Chat");
    toast.success(`Hi ${name}.  Welcome to Natter!`, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setName(name);
  }

  useEffect(() => {

    //strict mode off to get single render
    const rule = new schedule.RecurrenceRule();
    rule.minute = 30;
    const job = schedule.scheduleJob(rule, function() {
      toast.success(`Please take regular mental health breaks away from social media!`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    });

    Axios.get("/groups")
      .then((res) => {
        console.log("Axios res: ", res);
        // Do stuff with database response
        setGroupList(res.data);
        console.log("GROUP LIST ", groupList);
      })
      .catch(function(error) {
        console.log(error.toJSON());
      });

    socket.on("INITIAL_CONNECTION", (payload) => {
      console.log("Initial Connection");
      console.log(payload);
      setName(payload.name);
      setUsers(payload.users);
    });

    socket.on("NEW_USER_CONNECTED", (payload) => {
      toast.success(`${payload} has joined Natter!`, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    });

    socket.on("set_user_name", payload => {
      createName(payload);
    });

    socket.on("enter_unique_name", payload => {
      alert(payload);
    });

    socket.on("receive_chatgpt", payload => {
      setMessages((prev) => [...prev, payload]);
    });

    socket.on("receive_message", (payload) => {

      setMessages((prev) => [...prev, payload]);
    });

    socket.on("user-disconnected", (payload) => {
      console.log(`Disconnected ${payload} `);
    });

    return () => {
      console.log("Unmounting...");
      socket.off("INITIAL_CONNECTION");
      socket.off("send_message");
      socket.off("receive_message");
      socket.off("receive_chatgpt");
      socket.off("NEW_USER_CONNECTED");
      socket.off("set_user_name");
      socket.off("enter_unique_name");
    };
  }, []);

  return (
    <div className="App">
      {page === "Chat" && (
        <Chat
          socket={socket}
          setMessage={setMessage}
          setMessages={setMessages}
          message={message}
          name={name}
          users={users}
          messages={messages}
          setGroup={setGroup}
          group={group}
          groupList={groupList}
        />
      )}
      {page === "Chat" && (
        <ToastContainer
          position="top-center"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark" />
      )}
      {page === "LandingPage" && (<LandingPage setName={setName} name={name} socket={socket} setPage={setPage} />)}

    </div>
  );
}

export default App;

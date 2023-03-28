import React from "react";
import Axios from "axios";

export default function GroupListItem({
  arrayGroup,
  setGroup,
  socket,
  setMessages,
  messages,
  groupList,
}) {
  // console.log("Messages :", messages)
  const joinGroup = () => {
    socket.emit("join", arrayGroup.name);

    setMessages([]);
    Axios.get(`/groups/message/${arrayGroup.name}`).then((res) => {
      console.log("Axios Group Add: ", res.data);
      setMessages([...res.data]);
    });
  };

  return (
    <div>
      <a href="#" className="list-group-item list-group-item-action border-0">
        <div className="badge bg-success float-right"></div>
        <div className="d-flex align-items-start">
          <img
            src={arrayGroup.logo}
            className="mr-1"
            alt="No-Logo"
            width="40"
            height="40"
          />
          <button
            onClick={() => {
              setGroup(arrayGroup.name);
              joinGroup();
            }}
            className="btn btn-primary ml-3 btn-block"
          >
            {arrayGroup.name}
          </button>
          <div className="flex-grow-1 ml-3">
            <div className="small">
              <span className="fas fa-circle chat-online"></span>
            </div>
          </div>
        </div>
      </a>
      <hr />
    </div>
  );
}

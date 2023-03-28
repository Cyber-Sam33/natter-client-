import { React, useState } from "react";
import GroupListItem from "./GroupListItem";
import MessageItem from "./MessageItem";
import logo from "../components/natter_logo.png";
import Filter from 'bad-words';

export default function Chat({
  socket,
  name,
  setMessage,
  setMessages,
  message,
  messages,
  setGroup,
  group,
  groupList,
}) {
  const [searchInput, setSearchInput] = useState("");

  const filter = new Filter();
  filter.addWords("potato");

  const filteredItem = groupList.filter((groupItem) => {
    return groupItem.name.toLowerCase().includes(searchInput.toLowerCase());
  });

  const handleKeydown = (event) => {
    if (event.key == 'Enter') {
      sendMessage();
    }
  };

  const sendMessage = () => {
    setMessage("");

    const newMessage = filter.clean(message);

    if (message !== "" && group === "AI") {
      const date = new Date();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const current_time = `${hours}:${minutes}`;


      setMessages((prev) => [
        // This prev is the previous 20 messages from the GroupItemList Axios call
        ...prev,
        {
          message: newMessage,
          timestamp: current_time,
          group: group,
          sender: name,
          // id of AI group
          group_id: 1
        },
      ]);

      socket.emit("send_chatgpt", {
        message: newMessage,
        timestamp: current_time,
        group: group,
        sender: name,
        // id of AI group
        group_id: 1
      });
    }

    if (message !== "" && group !== "AI") {
      const date = new Date();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const current_time = `${hours}:${minutes}`;
      const filterId = groupList.filter((groupObj) => groupObj.name === group);



      setMessages((prev) => [
        // This prev is the previous 20 messages from the GroupItemList Axios call
        ...prev,
        {
          message: newMessage,
          timestamp: current_time,
          group: group,
          sender: name,
          group_id: filterId[0].id,
        },
      ]);


      //gettting group_id from groups - intial axios request

      socket.emit("send_message", {
        // name: name,
        message: newMessage,
        timestamp: current_time,
        group: group,
        sender: name,
        group_id: filterId[0].id,
      });
      console.log(message);
    }
  };

  const findGroupLogo = groupList.filter((groupListObj) => {
    if (groupListObj.name === group) {
      // console.log("grouplist OBJ ======", groupListObj, typeof groupListObj);
      return groupListObj.logo;
    }
  });
  console.log("LOGO jh iug iu- -  - ", findGroupLogo);

  return (
    <main className="content">
      <div className="container p-0">
        {/* <h1 className="h3 mb-3">Messages</h1> */}
        <img src={logo} class="h3 mb-3" alt="Natter Logo" height="150" />
        <div className="card">
          <div className="row g-0">
            <div className="col-12 col-lg-5 col-xl-3 border-right">
              <div className="px-4 d-none d-md-block">
                <div className="d-flex align-items-center">
                  {/* Search input area */}
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className="form-control my-3"
                      placeholder="Search..."
                      onChange={(event) => setSearchInput(event.target.value)}
                      value={searchInput}
                    />
                  </div>
                </div>
              </div>

              {/* Group list rendering */}
              {filteredItem.map((arrayGroup) => {
                return (
                  <GroupListItem
                    arrayGroup={arrayGroup}
                    setGroup={setGroup}
                    socket={socket}
                    key={arrayGroup.id}
                    setMessages={setMessages}
                    messages={messages}
                    groupList={groupList}
                  />
                );
              })}
              <hr className="d-block d-lg-none mt-1 mb-0" />
            </div>
            <div className="col-12 col-lg-7 col-xl-9">
              <div className="py-2 px-4 border-bottom d-none d-lg-block">
                <div className="d-flex align-items-center py-1">
                  <div className="position-relative">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/9946/9946992.png"
                      className="mr-1"
                      alt="Speech bubbles"
                      width="60"
                      height="60"
                    />
                  </div>
                  <div className="flex-grow-1 pl-3 fs-1">
                    <h3>{group}</h3>
                    <img src={findGroupLogo[0].logo} width="60" height="60" alt="amazing group logo" />
                    <div className="text-muted small"></div>
                  </div>
                  <div>
                    <div className="position-relative">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/9946/9946992.png"
                        className="mr-1"
                        alt="Speech bubbles"
                        width="60"
                        height="60"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="position-relative">
                <div className="chat-messages p-4">
                  {/* Individual chat messages */}

                  {/* List of messages which render in chat area */}

                  {messages.map((message) => {
                    return (
                      <MessageItem
                        key={message.name}
                        name={name}
                        message={message.message}
                        time={message.timestamp}
                        group={group}
                        groupList={groupList}
                        sender={message.sender}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Send button and message input field */}
              <div className="flex-grow-0 py-3 px-4 border-top">
                <div className="input-group">
                  <input
                    type="text"
                    name="message"
                    className="form-control"
                    placeholder="Type your message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onKeyDown={handleKeydown}
                  // maxLength="1000"
                  />
                  <button onClick={sendMessage} className="btn btn-primary rounded-pill ml-3">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

<input type="button" value="Clear form"></input>;

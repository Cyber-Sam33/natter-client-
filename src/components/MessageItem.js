import React from "react";

export default function MessageItem({ name, message, time, group, groupList, sender }) {

  const logoObj = groupList.find((object) => object.name === group);

  const left = "chat-message-left pb-4";
  const right = "chat-message-right pb-4";

  return (
    <div className={sender === name ? right : left}>
      <div>
        <img
          src={logoObj.logo}
          className="mr-1"
          alt={name} // dynamically add name
          width="40"
          height="40"
        />
        <div className="text-muted small text-nowrap mt-2">{time}</div>
      </div>
      <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
        <div className="font-weight-bold mb-1">
          {sender}
        </div>
        {message}
      </div>
    </div>
  );
}

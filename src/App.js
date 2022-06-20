import "./App.css";
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

function App() {
    const socket = io("http://localhost:3001");
    const [msg, setmsg] = useState("");
    const [username, setusername] = useState("");
    const [appendmsg, setappendmsg] = useState("");

    const onChange = (e) => {
        // console.log(e.target.value);
        setmsg(e.target.value);
    }

    const send = () => {
        socket.emit('send-msg', msg);
        appendMsg(`You: ${msg}`);
        setmsg("");
    }

    const connect = () => {
      usernamePrompt();
    }

    const appendMsg = (e) => {
        console.log(e);
        setappendmsg(e);
    }

    const usernamePrompt = () => {
        const val = prompt('what is your name?');
        // console.log(val);
        setusername(val);
        // appendMsg('You Joined');
        socket.emit('new-user', val);
    }

    socket.on('test', data => {
        // console.log(data);
        appendMsg(`${data}`);
    })

    socket.on('chat-msg', data => {
        // console.log(`${data.name}: ${data.msg}`);
        appendMsg(`${data.name}: ${data.msg}`);
    })
    
    socket.on('user-connected', name => {
        // console.log(`${name}: connected`);s
        appendMsg(`${name}: connected`);
    })
    
    socket.on('user-disconnected', name => {
        console.log(`${name}: disconnected`);
        appendMsg(`${name}: disconnected`);
    })

    useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
  return (
    <div className="container p-3">
      <div id="msg-container">{appendmsg}</div>
      <div className="form-row" id="form-container">
        <div className="input-group">
          <div className="input-group-prepend">
            <button type="button" id="connect" onClick={connect} className="btn btn-success">
              Connect
            </button>
          </div>
          <input type="text" id="msg" onChange={onChange} value={msg} className="form-control" />
          <div className="input-group-append">
            <button type="submit" id="send" onClick={send} className="btn btn-primary">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

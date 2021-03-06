import "./App.css";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
const socket = io("http://localhost:3001");

function App() {
    const [msg, setmsg] = useState("");
    const [username, setusername] = useState("");
    const [connectBtnFlag, setconnectBtnFlag] = useState(false);
    const [msgArr, setMsgArr] = useState([]);

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

    const appendMsg = (val) => {
        // console.log(val);
        // console.log(msgArr);
        setMsgArr((obj) => [...obj, val]);
    }

    const usernamePrompt = () => {
        const val = prompt('what is your name?');
        // console.log(val);
        setusername(val);
        // appendMsg('You Joined');
        socket.emit('new-user', val);
        setconnectBtnFlag(true);
    }

    useEffect(() => {
      socket.on('test', data => {
          // console.log(data);
          appendMsg(`${data}`);
      })
  
      socket.on('chat-msg', data => {
          // console.log(`${data.name}: ${data.msg}`);
          appendMsg(`${data.name}: ${data.msg}`);
      })
      
      socket.on('user-connected', name => {
          // console.log(`${name}: connected`);
          appendMsg(`${name}: connected`);
      })
      
      socket.on('user-disconnected', name => {
          // console.log(`${name}: disconnected`);
          appendMsg(`${name}: disconnected`);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket])
    
  return (
    <div className="container p-3">
      <h4>Hello, {username}</h4>
      <div id="msg-container">{msgArr.map((val,index)=>(
        <p key={index}>{val}</p>
      ))}</div>
      <div className="form-row" id="form-container">
        <div className="input-group">
          <div className="input-group-prepend">
            <button type="button" id="connect" disabled={connectBtnFlag} onClick={connect} className="btn btn-success">
              Connect
            </button>
          </div>
          <input type="text" id="msg" onChange={onChange} value={msg} className="form-control" />
          <div className="input-group-append">
            <button type="submit" id="send" disabled={!connectBtnFlag} onClick={send} className="btn btn-primary">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

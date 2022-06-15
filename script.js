const socket = io('http://localhost:3500');
const msgContainer = document.getElementById('msg-container');
const formContainer = document.getElementById('form-container');
const msgInput = document.getElementById('msg');

const username = prompt('what is your name?');
appendMsg('You Joined');
socket.emit('new-user', username);


socket.on('chat-msg', data => {
    console.log(data);
    appendMsg(`${data.name}: ${data.msg}`);
})

socket.on('user-connected', name => {
    appendMsg(`${name}: connected`);
})

socket.on('user-disconnected', name => {
    appendMsg(`${name}: disconnected`);
})

formContainer.addEventListener('submit', e => {
    e.preventDefault();
    const msg = msgInput.value;
    appendMsg(`You: ${msg}`);
    socket.emit('send-msg', msg);
    msgInput.value = '';
})


function appendMsg(msg){
    const msgEl = document.createElement('div');
    msgEl.innerText = msg;
    msgContainer.append(msgEl);
}
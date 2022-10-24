// Element
let showMessage = document.getElementById('messages');
let toast = document.getElementById('toast');

// Web socket server
let socket = new WebSocket("wss://javascript.info/article/websocket/chat/ws");

// Form
document.forms.publish.onsubmit = function() {
    // user message
    let msg = this.message.value;
    // send the message
    if(msg === ""){
        toast.classList.add('empty-data');
        toast.innerText = 'Please write something!';
        setTimeout(()=>{
            toast.classList.remove('empty-data');
        },2000);
    }else{
        socket.send(msg);
    }
    
    return false;
}

// Server open
socket.onopen = function() {
    toast.classList.add('connected');
    toast.innerText = 'server connection establish!';
    setTimeout(()=>{
        toast.classList.remove('connected');
    },2000);
}

// Server Error
socket.onerror = function() {
    toast.classList.add('failed');
    toast.innerText = 'server connection failed';
    setTimeout(()=>{
        toast.classList.remove('failed');
    },2000);
}
// Server message
socket.onmessage = function(event) {
    console.log(event);
    // recive message
    let msgReciver = event.data;

    // Create element
    let msgElement = document.createElement('li');
    msgElement.textContent = msgReciver;

    // show element
    showMessage.prepend(msgElement)
}

// Server Close
socket.onclose = function() {
    toast.classList.add('discounted');
    toast.innerText = 'server connection discounted!';
    setTimeout(()=>{
        toast.classList.remove('discounted');
    },2000);
}
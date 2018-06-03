// Make connection
var socket = io.connect('http://localhost:3000')

// Query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var sendButton = document.getElementById('send');
var output = document.getElementById('chat-output');
var feedback = document.getElementById('feedback');

var statusField = document.getElementById('status-field');
var sender = document.getElementById('sender');
var email = document.getElementById('email');
var phone = document.getElementById('phone');
var inboxMessage = document.getElementById('message-area');
var inboxSend = document.getElementById('inboxSend');

var receiver = document.getElementById('recevier');

// Emit Events
if (sendButton != null) {
    sendButton.addEventListener('click', () => {
        console.log("Click");
        socket.emit('chat', {
            message: message.value,
            handle: handle.value
        })
    })
}

if (message != null) {
    message.addEventListener('keypress', () => {
        socket.emit('typing', handle.value)
    })
}

if (inboxSend != null) {
    inboxSend.addEventListener('click', () => {
        socket.emit('sendToInbox', {
            sender: sender.value,
            email: email.value,
            phone: phone.value,
            message: inboxMessage.value,
            to: receiver.value
        })
    })
}

// Listen for Events
socket.on('chat', (data) => {
    output.innerHTML += "<p><strong><a href='http://localhost:3000/sitters/"+ data.handle + "'>"+ data.handle +"</a></strong>: " + data.message + "</p>"
    feedback.innerHTML = "";
})

socket.on('typing', (data) => {
    feedback.innerHTML = "<p><em>"+ data + " is typing a message...</em></p>";
})

socket.on('sendToInbox', (data) => {
    if (data.sender == "" || data.email == "" || 
        data.phone == "" || data.message == "") {
        statusField.innerHTML = "Please fill out all fields";
        $(statusField).css({'color': 'red'});
        return;
    } else {
        statusField.innerHTML = "Message sent.";
        $(statusField).css({'color': 'green'});
        inboxMessage.innerHTML = "";
        console.log("in else")
    }
})
// Make connection
var socket = io.connect('http://localhost:3000')

// Query DOM
var errorField = document.getElementById('error-field');
var sender = document.getElementById('sender');
var email = document.getElementById('email');
var phone = document.getElementById('phone');
var inboxMessage = document.getElementById('message-area');
var inboxSend = document.getElementById('inboxSend');

inboxSend.addEventListener('submit', () => {
    console.log("called click");
    socket.emit('sendToInbox', {
        sender: sender.value,
        email: email.value,
        phone: phone.value,
        message: inboxMessage.value
    })
})

socket.on('sendToInbox', (data) => {
    if (data.sender == "" || data.email == "" || 
        data.phone == "" || data.inboxMessage == "") {
    errorField.innerHTML += "<h5 style='color:red'>Please fill out all fields</h5>";
    console.log("in if");
    return;
}
})
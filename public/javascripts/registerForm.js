console.log("Called.");
var username = document.getElementById('username');
var password = document.getElementById('password');

module.exports.getUsername = function getUsername() {
    return String(username.value);
}

module.exports.getPassword = function getPassword() {
    return String(password.value);
} 
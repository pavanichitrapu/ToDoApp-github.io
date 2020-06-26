var loginForm = document.getElementById("login-form");
var loginbtn=document.getElementById("loginbtn");
var signupbtn=document.getElementById("signupbtn");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("Username -> ", e.target.username.value);//username field inside the form
  console.log("Password -> ", e.target.password.value);
// send data to backend
  var data = {
    username: e.target.username.value,
    password: e.target.password.value,
  };
  var http = new XMLHttpRequest();
  http.open("POST", "https://5ee9fc4aca5957001602a6b7.mockapi.io/user", true);
  http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  http.send(JSON.stringify(data));
  
  http.onreadystatechange = function () {
 
    if (http.readyState === 4) {
     localStorage.setItem("loginStatus", true);
      //alert("Login Successful!!");
      window.location.assign("./index.html");
    }
    else{
      
    }
  };
});
signupbtn.addEventListener('click', function(){
  window.location.assign("./signup.html");
});
